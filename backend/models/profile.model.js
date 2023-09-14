module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        className: {    // 班級
          type: DataTypes.VARCHAR(10),
          allowNull: false
        },
        studentId: {    // 學號
            type: DataTypes.CHAR(10),
            allowNull: false
        },
        name: {    // 姓名
            type: DataTypes.CHAR(10),
            allowNull: false
        },
        year: {   // 入學年度
          type: DataTypes.VARCHAR(10),
          allowNull: false
        },
        sex: {  // 性別
          type: DataTypes.VARCHAR(5),
          allowNull: false
        }
    }, {timestamps: true}, );

    return Profile;
};