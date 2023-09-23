module.exports = (sequelize, DataTypes) => {
    const SubPart = sequelize.define('SubPart', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      partId: DataTypes.INTEGER,
      typeTags: DataTypes.ARRAY(DataTypes.STRING)
    });
  
    return SubPart;
};