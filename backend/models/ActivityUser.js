module.exports = (sequelize, DataTypes) => {
    const ActivityUser = sequelize.define("ActivityUser", {
      activityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return ActivityUser;
};