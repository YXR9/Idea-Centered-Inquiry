module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define("Activity", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
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