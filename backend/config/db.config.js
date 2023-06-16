// First five parameters are for PostgreSQL connection.
// pool is optional, it will be used for Sequelize connection pool configuration:
    // max: maximum number of connection in pool
    // min: minimum number of connection in pool
    // idle: maximum time, in milliseconds, that a connection can be idle before being released
    // acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
module.exports = {
    HOST: process.env.DB_HOST, //"db",
    USER: process.env.DB_USERNAME,//"postgres",
    PASSWORD: process.env.DB_USERPSW,//"ytwu35415",
    USER_EMAIL: process.env.USER_EMAIL,
    DB: process.env.DB_TABLENAME,//"IdeaCenteredInquiry",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };