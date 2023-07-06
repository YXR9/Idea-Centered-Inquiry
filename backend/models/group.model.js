module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('group', {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    });

    Group.associate = (models) => {
        Group.belongsTo(models.Activity, {
        foreignKey: 'activityId',
        onDelete: 'CASCADE',
      });
    };
    
    return Group;
};