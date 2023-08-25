module.exports = (sequelize, DataTypes) => {
    const Part = sequelize.define('Part', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // complete: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: false,
      // }
    });

    Part.associate = (models) => {
      Part.belongsTo(models.Activity, {
        foreignKey: 'activityId'
      });
      Part.hasMany(models.SubPart, {
        foreignKey: 'partId'
      });
    };
    
    // Level.associate = (models) => {
    //     Level.belongsTo(models.Activity, {
    //     foreignKey: 'activityId',
    //     onDelete: 'CASCADE',
    //   });
    // };
    
    return Part;
};