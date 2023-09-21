import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure, userProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import cookie from "cookie";
import { getJwtSecretKey } from "~/lib/auth";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { Prisma } from "@prisma/client";
import { Address } from "~/config/type";

export const userRouter = createTRPCRouter({
  // getAllUsers: adminProcedure.query(async ({ ctx, input }) => {
  //   return await ctx.prisma.user.findMany();
  // }),
  signupUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password, name } = input;
      if (!email || !password || !name) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Missing Information",
        });
      }
      const hasedPassword = await bcrypt.hash(password, 10);

      const user_exist = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (user_exist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const user = await ctx.prisma.user.create({
        data: {
          name,
          email,
          password: hasedPassword,
        },
      });

      await ctx.prisma.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "next-auth-credentials",
          providerAccountId: process.env.JWT_SECRET!,
        },
      });

      return { success: true };
    }),

  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { res } = ctx;
      const { email, password } = input;

      const user = await ctx.prisma.user.findUnique({
        where: { email: email },
      });

      const passwordMatch =
        user?.password && (await bcrypt.compare(password, user?.password));

      const adminAccess =
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD;

      if (!adminAccess) {
        if (!user || !passwordMatch || !email || !password) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }
      }

      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(getJwtSecretKey()));

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("user-token", token, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
        }),
      );

      await ctx.prisma.session.create({
        data: {
          sessionToken: token,
          userId: user!.id,
          expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        },
      });

      return { success: true };
    }),

  findUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;
      const token =
        ctx.req.cookies["next-auth.session-token"] ??
        ctx.req.cookies["__Secure-next-auth.session-token"];

      if (!token) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Token does not exist. User may not loggedin",
        });
      }

      const user = await ctx.prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user found",
        });
      }

      const {
        id,
        name,
        emailVerified,
        image,
        cart,
        email: userEmail,
        watchlist,
        purchase,
        address,
        role,
        createdAt,
      } = user;

      return {
        id,
        name,
        email: userEmail,
        emailVerified,
        image,
        cart,
        watchlist,
        purchase,
        address,
        role,
        createdAt,
      };
    }),
  findManyUsers: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      const users = input.map(
        async (id) => await ctx.prisma.user.findFirst({ where: { id } }),
      );

      return users;
    }),
  logout: publicProcedure.mutation(({ ctx }) => {
    const { res } = ctx;

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("user-token", "", {
        httpOnly: true,
        path: "/",
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
      }),
    );

    return { success: true };
  }),
  getSession: publicProcedure.query(async ({ ctx }) => {
    const session = await getServerSession(authOptions);

    return { session };
  }),
  addressRegister: userProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        address: z.string(),
        city: z.string(),
        code: z.string(),
        country: z.string(),
        contact: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, address, city, code, country, contact } = input;
      if (!id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User id is missing",
        });
      }
      if (!name || !address || !city || !code || !country || !contact) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Missing Delivery information",
        });
      }

      const newAddress = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          address: {
            push: {
              name,
              address,
              city,
              code,
              country,
              contact,
            },
          },
        },
      });
      if (!newAddress) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Failed create new Address",
        });
      }

      return newAddress;
    }),
  // deleteUser: adminProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { id } = input;
  //     return await ctx.prisma.user.delete({
  //       where: {
  //         id,
  //       },
  //     });
  //   }),
  // updateUser: adminProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //       email: z.string(),
  //       name: z.string(),
  //       verified: z.boolean(),
  //       role: z.enum(["staff", "manager", "admin", "superadmin"]),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { id, email, name, verified, role } = input;

  //     if (!email || !name || !role) {
  //       throw new TRPCError({
  //         code: "CONFLICT",
  //         message: "Missing Information",
  //       });
  //     }

  //     return await ctx.prisma.user.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         email,
  //         name,
  //         verified,
  //         role,
  //       },
  //     });
  //   }),
});
