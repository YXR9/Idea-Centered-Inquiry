module.exports = (sequelize, DataTypes, literal) => {
  const User = require("./user.model.js")(sequelize, DataTypes);
  const Activity = sequelize.define("Activity", {
    // owner: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // groups: {
    //   type: DataTypes.JSONB,
    //   allowNull: true
    // },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
    // activityKey: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  }, { timestamps: true });
  
  Activity.associate = (models) => {
    Activity.belongsTo(models.User
    //   , {
    //   foreignKey: 'owner'
    // }
    );
    Activity.hasMany(models.Part, {
      foreignKey: 'activityId'
    });
  };
  
  // Activity.hasMany(User);

  // Activity.hasMany(User, {
  //   as: 'member',
  //   through: models.ActivityUser,
  //   foreignKey: 'activityId'
  // });
  // Activity.associate = (models) => {
  //   // Associate with User
  //   Activity.hasMany(models.User, }{
  //     as: 'member',
  //     through: models.ActivityUser,
  //     foreignKey: 'activityId'
  //   );

  //   // Associate with Level (Many-to-Many)
  //   Activity.belongsToMany(models.Level, {
  //     through: 'activityLevel',
  //     as: 'levels',
  //     foreignKey: 'activityId',
  //     onDelete: 'CASCADE'
  //   });

  //   // Associate with Group (Many-to-Many)
  //   Activity.belongsToMany(models.Group, {
  //     through: 'activityGroup',
  //     as: 'groups',
  //     foreignKey: 'activityId',
  //     onDelete: 'CASCADE'
  //   });
  // };

  return Activity;
};