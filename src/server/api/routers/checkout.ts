import _stripe from "stripe";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { getTotalPrice } from "~/lib/helper";

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export const checkoutRouter = createTRPCRouter({
  /* eslint-disable */
  checkoutSession: publicProcedure
    .input(
      z.object({
        email: z.string(),
        products: z.array(z.any()),
        address: z.object({
          name: z.string(),
          address: z.string(),
          city: z.string(),
          code: z.string(),
          country: z.string(),
          contact: z.string(),
        }),
        url: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.products.length) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Must be at least 1 product",
          });
        }

        if (
          !input.address.name ||
          !input.address.address ||
          !input.address.city ||
          !input.address.city ||
          !input.address.code ||
          !input.address.country ||
          !input.address.contact
        ) {
          console.log(input.address);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Missing Delivery information",
          });
        }

        const stocks = input.products.every((product) => product.stock);

        if (!stocks) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Some of products are not available",
          });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: input.products.map((product) => ({
            price_data: {
              currency: "nzd",
              product_data: {
                name: product.title,
              },
              unit_amount: Number(product.price) * 100,
            },
            quantity: product.quantity,
          })),
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount:
                    Number(getTotalPrice(input.products).totalDelivery) * 100 ||
                    0,
                  currency: "nzd",
                },
                display_name: "Pickup in store",
              },
            },
          ],
          customer_email: input.email,
          client_reference_id: input.address.contact,
          metadata: {
            name: input.address.name,
            address: input.address.address,
            city: input.address.city,
            postcode: input.address.code,
            country: input.address.country,
            contact: input.address.contact,
          },
          success_url: `${input.url}/success`,
          cancel_url: `${input.url}/`,
        });



        console.log(session);
        return {
          url: session.url || "",
          // bookingAndPreorder: await ctx.prisma.booking
          //   .create({
          //     data: {
          //       ...input.customerDetail,
          //     },
          //   })
          //   .then((res) =>
          //     ctx.prisma.preorder.createMany({
          //       data: productsInCart.map((product) => ({
          //         bookingId: res.id,
          //         item: product.name,
          //         quantity: product.quantity,
          //         price: product.price
          //       })),
          //     })
          //   ),
        };
      } catch (error) {
        let msg = "";
        if (error instanceof Error) {
          msg = error.message;
        }
        throw new TRPCError({
          message: msg || "Payment failed",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
