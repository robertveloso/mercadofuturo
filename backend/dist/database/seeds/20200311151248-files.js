"use strict";const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'files',
      [
        {
          name: 'mercado-do-ze.png',
          path: 'mercado-do-ze.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('files', null, {});
  },
};
