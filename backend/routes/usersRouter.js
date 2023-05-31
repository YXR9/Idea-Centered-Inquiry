// 引用 passport
const passport = require('passport')
const bodyParser = require('body-parser');

module.exports = (app) => {
    const App = require("../controllers/userController");
    const { authenticator } = require('../middleware/auth')
    app.post("/register", bodyParser.json(), App.register);
    app.get("/login", App.getLogin);
    // 加入 middleware，驗證 request 登入狀態
    app.post("/login",  bodyParser.json(), App.postLogin, passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
    );
    app.get("/user", authenticator, App.getProfile);
    app.get("/logout", App.logout);
    app.get("/getforgetpass", App.getforgetpass);
    app.post("/getforgetpass", App.postforgetpass);
}