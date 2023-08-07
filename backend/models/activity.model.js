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
  }, { timestamps: true });

  Activity.associate = (models) => {
    // Associate with User
    Activity.belongsToMany(models.User, {
      through: 'ActivityUser', // Name of the intermediary table
      foreignKey: 'activityId'
    });

    // Associate with Level
    Activity.hasMany(models.Level, {
      through: 'activityLevel',
      as: 'levels',
      foreignKey: 'activityId',
      onDelete: 'CASCADE'
    });

    // Associate with Group
    Activity.hasMany(models.Group, {
      through: 'activityGroup',
      as: 'groups',
      foreignKey: 'activityId',
      onDelete: 'CASCADE'
    });
  };

  return Activity;
};