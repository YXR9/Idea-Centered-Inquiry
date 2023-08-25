module.exports = (sequelize, DataTypes) => {
    const Node = sequelize.define('Node', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      tags: DataTypes.JSON,
      x: DataTypes.FLOAT,
      y: DataTypes.FLOAT
    });
  
    Node.associate = (models) => {
      Node.belongsTo(models.SubPart, {
        foreignKey: 'subPartId'
      });
      Node.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    };
  
    return Node;
  };  