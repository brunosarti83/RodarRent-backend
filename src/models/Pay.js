/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Pay',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      idMP: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The idMP field cannot be empty',
          },
        },
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The amount field cannot be empty',
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The date field cannot be empty',
          },
          isAfter: {
            args: '2023-08-01',
            msg: 'The date must be after August 1st, 2023',
          },
        },
      },
      method: {
        type: DataTypes.ENUM('credit_card', 'account_money', 'ticket'),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'The method field cannot be empty',
          },
        },
      },
      status: {
        type: DataTypes.ENUM(
          'pending',
          'approved',
          'rejected',
          'cancelled',
          'in process',
          'refunded',
          'money in account',
          'error',
        ),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
          notEmpty: {
            msg: 'The status field cannot be empty',
          },
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false },
  );
};
