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
    Activity.hasMany(models.User, {
      as: 'member',
      through: models.ActivityUser,
      foreignKey: 'activityId'
    });

    // Associate with Level (Many-to-Many)
    Activity.belongsToMany(models.Level, {
      through: 'activityLevel',
      as: 'levels',
      foreignKey: 'activityId',
      onDelete: 'CASCADE'
    });

    // Associate with Group (Many-to-Many)
    Activity.belongsToMany(models.Group, {
      through: 'activityGroup',
      as: 'groups',
      foreignKey: 'activityId',
      onDelete: 'CASCADE'
    });
  };

  return Activity;
};