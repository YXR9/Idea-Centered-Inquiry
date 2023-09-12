module.exports = (sequelize, DataTypes) => {
    const ActivityPartSubPart = sequelize.define("ActivityPartSubPart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    return ActivityPartSubPart;
  };