"use strict";const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          handle: 'mercadodoze',
          email: 'mercadodoze@gmail.com',
          document: '000000000000000',
          password_hash: bcrypt.hashSync('12345678', 8),
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
