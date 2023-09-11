module.exports = (sequelize, DataTypes) => {
    const Part = sequelize.define('Part', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    Part.associate = (models) => {
      Part.belongsTo(models.Activity, {
        foreignKey: 'activityId'
      });
      Part.hasMany(models.SubPart, {
        foreignKey: 'partId'
      });
    };
    
    return Part;
};