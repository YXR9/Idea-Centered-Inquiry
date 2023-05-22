const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    email: {
        type: String,
        unique: true,
        // required: true,
        dropDups: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Compile Schema 變成 Model，如此可以透過這個 Model 建立和儲存 document
// 會在 mongo 中建立名為 userprofile 的 collection
module.exports = mongoose.model('User',userSchema);