module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      owner: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activityTitle: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false
      },
      activityInfo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activityKey: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activityParts: {
        type: DataTypes.STRING,
        allowNull: false
      },
      groups: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {timestamps: true}, );
  
    return User;
};