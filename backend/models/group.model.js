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
    
  // Group.associate = (models) => {
  //   console.log("Group.associate✨")
  //   Group.belongsTo(models.User, {
  //     through: models.UserGroup,
  //     foreignKey: 'groupId'
  //   });
  // }

  // Group.associate = (models) => {
  //     Group.belongsTo(models.User, {
  //       foreignKey: 'userId',
  //       as: 'member'
  //     });

  //     Group.belongsTo(models.Activity, {
  //         foreignKey: 'activityId',
  //         as: 'activity',
  //         onDelete: 'CASCADE',
  //     });
  // };

  return Group;
};