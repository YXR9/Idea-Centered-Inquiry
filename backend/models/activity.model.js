module.exports = (sequelize, DataTypes, literal) => {
    const Activity = sequelize.define("activity", {
      owner: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activityTitle: {
        type: DataTypes.STRING,
        allowNull: false
      },
      activityKey: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {timestamps: true}, );

    Activity.associate = (models) => {
      Activity.hasMany(models.User, {
        foreignKey:'activityId',
        as: 'activity',
        onDelete: 'CASCADE'
      });
    };

    Activity.associate = (models) => {
      Activity.hasMany(models.Level, {
        through: 'activityLevel',
        as: 'levels',
        foreignKey: 'activityId',
        onDelete: 'CASCADE'
      });
    };

    Activity.associate = (models) => {
      Activity.hasMany(models.Group, {
        through: 'activityGroup',
        as: 'groups',
        foreignKey: 'activityId',
        onDelete: 'CASCADE'
      });
    };

    return Activity;
};