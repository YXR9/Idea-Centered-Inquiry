module.exports = (sequelize, DataTypes) => {
    const Activity = require("./activity.model.js")(sequelize, DataTypes);
    const User = sequelize.define("User", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      school: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // activityId: {
      //   allowNull: true,   
      //   type: DataTypes.BIGINT
      // },
    }, {timestamps: true}, );

    return User;
};