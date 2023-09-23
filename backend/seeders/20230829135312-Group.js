'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert(
    "Groups",
    [
      {
        userId: 1,
        activityId: 1,
        joinCode: "i4mIG",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        userId: 2,
        activityId: 1,
        joinCode: "i4mIG",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Groups", null, {})
};
