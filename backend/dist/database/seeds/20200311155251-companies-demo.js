"use strict";const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

faker.locale = 'pt_BR';

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'companies',
      [
        {
          name: 'Mercado do Zé', // faker.name.findName()',
          // email: 'mercadodoze@gmail.com',
          // slug: 'mercado-do-ze',
          // document: '000000000000000',
          description: faker.lorem.lines(2),
          address: faker.address.streetAddress(),
          site: faker.internet.domainName(),
          phone: faker.phone.phoneNumber(),
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('companies', null, {});
  },
};
