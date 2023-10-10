import { faker } from '@faker-js/faker';

export default function createRandomUser():User {
  const sex = faker.name.sexType();
  const firstName = faker.name.firstName(sex);
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);

  return {
    //@ts-ignore
    birthMonth: faker.date.month(),
    //@ts-ignore
    birthDay: faker.date.weekday(),
    email,
    name:`${firstName} ${lastName}`,
    chirality: faker.helpers.arrayElement(['left handed', 'right handed']),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
    buildingNumber: faker.helpers.arrayElement(['bld_1', 'bld_2', 'bld_3', 'bld_4', 'bld_5'])
  };
}