/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable linebreak-style */
'use strict';
require('dotenv').config();
const { hashString } = require('../api/helpers/encrypter');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'Johnny',
      firstname: 'John',
      lastname: 'Doe',
      description: 'Ceci est la description de John Doe',
      email: 'john@gmail.com',
      role: 'moderator',
      theme: 'light',
      avatar: 'http://localhost:3001/avatar/default-avatar.png',
      password: await hashString('moderator'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'Bron',
      firstname: 'Brian',
      lastname: 'Doe',
      description: 'Ceci est la description de Brian Doe',
      email: 'brian@gmail.com',
      role: 'user',
      theme: 'light',
      avatar: 'http://localhost:3001/avatar/default-avatar.png',
      password: await hashString('user'),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:

     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
