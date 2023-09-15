module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        userId: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        className: {    // 班級
          type: DataTypes.STRING,
          allowNull: false
        },
        studentId: {    // 學號
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {   // 入學年度
          type: DataTypes.STRING,
          allowNull: false
        },
        sex: {  // 性別
          type: DataTypes.STRING,
          allowNull: false
        }
    }, {timestamps: true}, );

    return Profile;
};