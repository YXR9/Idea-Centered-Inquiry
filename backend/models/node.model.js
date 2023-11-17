module.exports = (sequelize, DataTypes) => {
    const Node = sequelize.define('Node', {
      groupId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      tags: DataTypes.ARRAY(DataTypes.STRING),
      author: DataTypes.INTEGER,
    });
  
    return Node;
};  