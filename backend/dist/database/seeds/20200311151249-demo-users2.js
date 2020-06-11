"use strict";const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          handle: 'robertveloso',
          email: 'robertluizveloso@gmail.com',
          document: '12775086667',
          password_hash: bcrypt.hashSync('12345678', 8),
          avatar_id: 2,
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
