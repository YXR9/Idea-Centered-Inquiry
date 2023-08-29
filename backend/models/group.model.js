module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
      joinCode: {
          type: DataTypes.STRING,
          allowNull: false,
      },
  });

  Group.associate = (models) => {
      Group.belongsToMany(models.User, {
          through: 'GroupMember', // Assuming you have an association table for group members
          foreignKey: 'GroupId',
          as: 'members',
      });

      Group.belongsTo(models.Activity, {
          foreignKey: 'ActivityId',
          onDelete: 'CASCADE',
      });
  };

  return Group;
};