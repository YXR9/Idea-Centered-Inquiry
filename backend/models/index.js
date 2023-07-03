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

db.users = require("./user.model.js")(sequelize, DataTypes);
db.activities = require("./activity.model.js")(sequelize, DataTypes);
db.groups = require("./group.model.js")(sequelize, DataTypes);
db.levels = require("./level.model.js")(sequelize, DataTypes);

// db.users.hasMany(db.activities, { as: "activities" });
// db.activities.belongsTo(db.users, {
//   foreignKey: "owner",
//   as: "user",
// });

module.exports = db;