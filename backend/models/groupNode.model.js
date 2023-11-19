module.exports = (sequelize, DataTypes) => {
    const GroupNode = sequelize.define("GroupNode", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    return GroupNode;
};