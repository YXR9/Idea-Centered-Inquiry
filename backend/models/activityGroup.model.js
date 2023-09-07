module.exports = (sequelize, DataTypes) => {
    const ActivityGroup = sequelize.define("ActivityGroup", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    return ActivityGroup;
  };