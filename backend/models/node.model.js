module.exports = (sequelize, DataTypes) => {
    const Node = sequelize.define('Node', {
      subPartId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      x: DataTypes.FLOAT,
      y: DataTypes.FLOAT
    });
  
    return Node;
};  