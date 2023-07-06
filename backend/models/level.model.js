module.exports = (sequelize, DataTypes) => {
    const Level = sequelize.define('level', {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    });

    Level.associate = (models) => {
        Level.belongsTo(models.Activity, {
        foreignKey: 'activityId',
        onDelete: 'CASCADE',
      });
    };
    
    return Level;
};