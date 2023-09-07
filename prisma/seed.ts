import { PrismaClient, RoleEnumType } from "@prisma/client";
import bcrypt from "bcryptjs";
// import { faker } from "@faker-js/faker";
import faker from "faker";
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: "superadmin@email.com",
      password: "superadmin",
      name: "superadmin",
      role: "superadmin",
    },
    {
      email: "admin@email.com",
      password: "admin",
      name: "admin",
      role: "admin",
    },
  ];

  await Promise.all(
    users.map(async (user) => {
      const hasedPassword = await bcrypt.hash(user.password, 10);
      await prisma.admin.create({
        data: {
          email: user.email,
          password: hasedPassword,
          name: user.name,
        },
      });
    }),
  );

  const categories = [
    {
      id: "clhkg2ksn000o035oyriu3u9y",
      name: "Electronics",
      product: [],
    },
    {
      id: "clhkg2ksn000o035oyriu2u9y",
      name: "Clothing",
      product: [],
    },
    {
      id: "clhkg2ksn000o035oyriu2u9z",
      name: "Home and Garden",
      product: [],
    },
    {
      id: "clhkg2ksn000o035oyriu2v00",
      name: "Sports and Outdoors",
      product: [],
    },
  ];

  const subcategories = [
    {
      id: "clhkg2ksn000o135oyriu2u9y",
      name: "Smartphones",
      categoryId: categories[0]?.id,
    },
    {
      id: "clhkg2ksn000o135oyriu2u9p",
      name: "Laptops",
      categoryId: categories[0]?.id,
    },
    {
      id: "clhkg2ksn000o135oyriu2u9z",
      name: "T-shirts",
      categoryId: categories[1]?.id,
    },
    {
      id: "clhkg2ksn000o135oyriu2v00",
      name: "Dresses",
      categoryId: categories[1]?.id,
    },
    {
      id: "clhkg2ksn000o135oyriu2v01",
      name: "Furniture",
      categoryId: categories[2]?.id,
    },
    {
      id: "clhkg2ksn000o135oyriu2v02",
      name: "Gardening Tools",
      categoryId: categories[2]?.id,
    },
    {
      id: "clhkg2ksn000o135oyriu2v03",
      name: "Hiking Gear",
      categoryId: categories[3]?.id,
    },
    {
      id: "clhkg2ksn000o135oyriu2v04",
      name: "Camping Equipment",
      categoryId: categories[3]?.id,
    },
  ];

  await Promise.all(
    categories.map(
      async (category) =>
        await prisma.category.create({
          data: {
            id: category.id,
            name: category.name,
          },
        }),
    ),
  );

  await Promise.all(
    subcategories.map(
      async (category) =>
        await prisma.subcategory.create({
          data: {
            id: category.id,
            name: category.name,
            categoryId: category.categoryId!,
          },
        }),
    ),
  );

  const products = [];

  for (const subcategory of subcategories) {
    for (let i = 0; i < 15; i++) {
      const product = {
        title: faker.commerce.productName(),
        type: subcategory.name,
        description: faker.lorem.sentence(),
        rrp: faker.commerce.price(),
        price: faker.commerce.price(),
        imgUrl: [faker.image.imageUrl()],
        attributes: {
          color: faker.commerce.color(),
          size: faker.random.arrayElement(["S", "M", "L", "XL"]),
        },
        review: [...Array(faker.datatype.number({ min: 20, max: 98 }))].map(
          () => faker.lorem.sentence(),
        ),
        star: [...Array(faker.datatype.number({ min: 20, max: 98 }))].map(() =>
          faker.datatype.number({ min: 1, max: 5 }),
        ),
        delivery: faker.datatype.number({ min: 1, max: 7 }),
        stock: faker.datatype.number({ min: 1, max: 100 }),
        categoryId: subcategory.categoryId,
        subcategoryId: subcategory.id,
      };

      products.push(product);
    }
  }

  // Insert mock products into the database
  await Promise.all(
    products.map(
      async (product) =>
        await prisma.product.create({
          data: {
            title: product.title,
            type: product.type,
            description: product.description,
            rrp: product.rrp,
            price: product.price,
            imgUrl: { set: product.imgUrl },
            attributes: { set: product.attributes },
            review: product.review,
            star: product.star,
            delivery: product.delivery,
            stock: product.stock,
            categoryId: product.categoryId,
            subcategoryId: product.subcategoryId,
          },
        }),
    ),
  );

  await prisma.$disconnect();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
