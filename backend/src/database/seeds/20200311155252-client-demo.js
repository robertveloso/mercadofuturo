const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

faker.locale = 'pt_BR';

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'clients',
      [
        {
          first_name: 'Robert',
          last_name: 'Luiz Veloso',
          // document: '12775086667',
          // email: 'robertluizveloso@gmail.com',
          phone: '+5538999880075',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('clients', null, {});
  },
};
