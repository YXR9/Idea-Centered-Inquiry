module.exports = (sequelize, DataTypes) => {
    const ActivityPart = sequelize.define("ActivityPart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    return ActivityPart;
};