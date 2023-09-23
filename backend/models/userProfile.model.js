module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define("UserProfile", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    return UserProfile;
};