// importing modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const usePassport = require('./config/passport');
const db = require("./models");
require('dotenv').config();

global.__basedir = __dirname;

// assigning the variable app to express
const app = express();

const corseOptions = {
  origin: "*",
  credentials: true,
};

// 呼叫 sync function 將會依 model 定義內容産生資料表，force 參數值為 true 將會重建已存在的資料表
db.sequelize
  .sync()
  .then(() => {
    console.log('Initialing...');
    //initial();  // 産生資料表後，呼叫 initial function 為 roles table 新增三筆初始資料
    console.log('Initialing... done');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

app.use(cors(corseOptions));

// session middleware
app.use(session({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',    // 用來簽名存放在cookie的sessionID
  saveUninitialized: false,    // 設定為false可以避免存放太多空的session進入session store, session在還沒被修改前也不會被存入cookie
  resave: false,    // 因為每個session store會有不一樣的配置，有些會定期去清理session，如果不想要session被清理掉的話，就要把這個設定為true
}))

// 呼叫 Passport 函式並傳入 app
usePassport(app);

// Parse the HTML form
// parsing the incoming data
app.use(express.json());
// Data parsing
app.use(express.urlencoded({ 
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
})); 

app.use(bodyParser.json({limit: "50mb"}));

// view engine setup
// 使用 app 來設置視圖（模板）引擎。引擎的設置有兩個部分。首先我們設置 'views' 值，來指定模板將被存儲的文件夾（在這種情況下是子文件夾 /views）。然後我們設置 'view engine' 的值，來指定模板庫（在此為 “pug” ）。
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 用 require()導入來自我們的路由目錄的模塊。這些模塊/文件包含用於處理特定的相關“路由”集合（URL 路徑）的代碼。當我們擴展骨架應用程序，我們將添加一個新文件，來處理與書籍相關的路由。
// 掛載 middleware
require("./routes/user.routes")(app);
require("./routes/profile.routes")(app);
require("./routes/activity.routes")(app);
require("./routes/group.routes")(app);
require("./routes/part.routes")(app);
require("./routes/subPart.routes")(app);
require("./routes/node.routes")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;