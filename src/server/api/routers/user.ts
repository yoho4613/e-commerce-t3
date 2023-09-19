import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
// import { getJwtSecretKey } from "~/lib/auth";
import cookie from "cookie";
import { getJwtSecretKey } from "~/lib/auth";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

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
      const token = ctx.req.cookies["next-auth.session-token"] ?? ctx.req.cookies["__Secure-next-auth.session-token"];

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
      };
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
