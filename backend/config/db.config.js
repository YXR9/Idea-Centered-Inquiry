// First five parameters are for PostgreSQL connection.
// pool is optional, it will be used for Sequelize connection pool configuration:
    // max: maximum number of connection in pool
    // min: minimum number of connection in pool
    // idle: maximum time, in milliseconds, that a connection can be idle before being released
    // acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
module.exports = {
  HOST: process.env.DB_HOST, // Host Name: "db",
  USER: process.env.DB_USERNAME, // User Name: "postgres",
  PASSWORD: process.env.DB_USERPSW, // Password: "ytwu35415",
  DB: process.env.DB_TABLENAME, // Database Name: "IdeaCenteredInquiry",
    dialect: "postgres", // 資料庫類別
    pool: {
      max: 5, // 連結池中最大的 connection 數
      min: 0,
      acquire: 30000, //　連結 Timeout 時間(毫秒)
      idle: 10000 //　連結被釋放的 idle 時間(毫秒)
    }
  };