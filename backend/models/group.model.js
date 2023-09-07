module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
      groupName: DataTypes.STRING,
      joinCode: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      activityId: DataTypes.INTEGER,
      userId: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});

  return Group;
};