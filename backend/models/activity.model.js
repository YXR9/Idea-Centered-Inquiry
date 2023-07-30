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
      Activity.belongsTo(models.User, {
        foreignKey:'userId',
        as: 'user'
      });
    };

    Activity.associate = (models) => {
      Activity.hasMany(models.Level, {
        through: 'activityLevel',
        as: 'levels',
        foreignKey: 'activityId'
      });
    };

    Activity.associate = (models) => {
      Activity.hasMany(models.Group, {
        through: 'activityGroup',
        as: 'groups',
        foreignKey: 'activityId'
      });
    };

    return Activity;
};