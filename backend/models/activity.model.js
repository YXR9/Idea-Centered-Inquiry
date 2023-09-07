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

  return Activity;
};