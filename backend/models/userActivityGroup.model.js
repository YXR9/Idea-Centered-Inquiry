module.exports = (sequelize, DataTypes) => {
    const UserActivityGroup = sequelize.define("UserActivityGroup", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    return UserActivityGroup;
};