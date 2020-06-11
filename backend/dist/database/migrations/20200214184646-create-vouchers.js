"use strict";const Sequelize = require('sequelize');

module.exports = {
  up: queryInterface => {
    return queryInterface.createTable('vouchers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      value: {
        // Valor do produto
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      bonus: {
        // Bonus do produto
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      month: {
        // Mês do produto
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmation_code: {
        // codigo para retirada
        type: Sequelize.STRING,
        allowNull: true,
      },
      order_id: {
        // Referência ao pedido
        type: Sequelize.INTEGER,
        references: { model: 'orders', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      client_id: {
        // Referência ao usuário
        type: Sequelize.INTEGER,
        references: { model: 'clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      company_id: {
        // Referência ao entregador
        type: Sequelize.INTEGER,
        references: { model: 'companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      signature_id: {
        // Referência à uma assinatura de compra da picpay
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      start_date: {
        // Data de retirada
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        // Data de entrega ao destinatário
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('vouchers');
  },
};
