module.exports = (sequelize, DataTypes) => {
  const Group = require("./group.model.js")(sequelize, DataTypes);
  const Activity = sequelize.define("Activity", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: DataTypes.BIGINT
  }, { timestamps: true });
    
  // Activity.associate = (models) => {
  //   console.log("Activity.associate✨")
  //   Activity.belongsTo(models.User, {
  //     through: models.UserActivity,
  //     foreignKey: 'activityId'
  //   });
  // }
  
  // Activity.associate = (models) => {
  //   // associations can be defined here
  //   Activity.hasMany(models.Group, {
  //     foreignKey: 'postId',
  //     as: 'groups',
  //     onDelete: 'CASCADE',
  //   });

  //   Activity.belongsTo(models.User, {
  //     foreignKey: 'userId',
  //     as: 'author',
  //     onDelete: 'CASCADE',
  //   });
  // };
  
  Activity.hasMany(Group);

  return Activity;
};