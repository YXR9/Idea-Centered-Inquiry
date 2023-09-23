module.exports = (sequelize, DataTypes) => {
    const Part = sequelize.define('Part', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activityId: DataTypes.INTEGER
    });
    
    return Part;
};