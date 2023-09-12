module.exports = (sequelize, DataTypes) => {
    const SubPartNode = sequelize.define("SubPartNode", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });
    return SubPartNode;
};