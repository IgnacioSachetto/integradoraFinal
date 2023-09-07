import { faker } from "@faker-js/faker";

export const generateUser = () => {
  const numOfProducts = parseInt(
    faker.random.numeric(1, { bannedDigits: ["0"] })
  );
  const products = [];

  for (let i = 0; i < numOfProducts; i++) {
    products.push(generateProduct());
  }

  return {
    name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    birthgDate: faker.date.birthdate(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    sex: faker.name.sex(),
    products,
  };
};

export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.random.numeric(1),
    image: faker.image.image(),
  };
};