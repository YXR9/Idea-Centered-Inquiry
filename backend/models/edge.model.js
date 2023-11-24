module.exports = (sequelize, DataTypes) => {
    const Edge = sequelize.define('Edge', {
      groupId: DataTypes.INTEGER,
      from: DataTypes.INTEGER,  // A nodeId
      to: DataTypes.INTEGER,    // B nodeId
    }, { timestamps: true });
  
    return Edge;
};  