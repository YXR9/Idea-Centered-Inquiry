module.exports = (sequelize, DataTypes) => {
    const SubPart = sequelize.define('SubPart', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    });
  
    SubPart.associate = (models) => {
      SubPart.belongsTo(models.Part, {
        foreignKey: 'partId'
      });
      SubPart.hasMany(models.Node, {
        foreignKey: 'subPartId'
      });
    };
  
    return SubPart;
  };