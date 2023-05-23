const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    email: {
        type: String,
        required: true,
    	match: /.+\@.+\..+/,
    	unique: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    },
	school: {
		type: String,
        required: true
	},
	city: [{
        type: String,
        enum: ["臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市", "宜蘭縣", "新竹縣", "苗栗縣", "彰化縣", "南投縣", "雲林縣", "嘉義縣", "屏東縣", "花蓮縣", "臺東縣", "澎湖縣", "基隆市", "新竹市", "嘉義市"],
        default: "桃園市",
        required: true
    }],
    date: {
        type: String,
        default: new Date()
    }
});

// userSchema.pre('save', async function(next) {
//     if(!this.isModified('password')) {
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     this.passwordConf = await bcrypt.hash(this.passwordConf, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// Compile Schema 變成 Model，如此可以透過這個 Model 建立和儲存 document
// 會在 mongo 中建立名為 userprofile 的 collection
module.exports = mongoose.model('User',userSchema);