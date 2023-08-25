const dbConfig = require("../config/db.config.js"); // 引入資料庫連結設定檔

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, { // 由資料庫連結設定檔的設定值來備置 Sequelize
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover~`)
}).catch((err) => {
    console.log(err)
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, DataTypes);
db.Activity = require("./activity.model.js")(sequelize, DataTypes);
db.Part = require("./part.model.js")(sequelize, DataTypes);
db.SubPart = require("./subPart.model.js")(sequelize, DataTypes);
db.Node = require("./node.model.js")(sequelize, DataTypes);

// Define associations
// db.users.associate = (models) => {
//   db.users.belongsToMany(models.activities, {
//     through: db.ActivityUsers,
//     foreignKey: 'userId'
//   });
// };

// db.activities.associate = (models) => {
//   db.activities.belongsToMany(models.users, {
//     through: db.ActivityUsers,
//     foreignKey: 'activityId'
//   });
// };
// db.users.hasMany(db.activities);
// db.activities.belongsToMany(db.users);

module.exports = db;