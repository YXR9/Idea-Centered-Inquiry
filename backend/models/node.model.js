module.exports = (sequelize, DataTypes) => {
    const Node = sequelize.define('Node', {
      groupId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      tags: DataTypes.STRING,
      author: DataTypes.STRING,
    });
  
    return Node;
};  