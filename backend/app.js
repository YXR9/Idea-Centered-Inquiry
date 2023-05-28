// Import the contents of our .env file in the script file.
require('dotenv').config();

// 使用 require()將一些有用的 node 庫導入到文件中，其中包括我們先前使用 NPM 為應用程序下載的 express，serve-favicon，morgan，cookie-parser 和 body-parser；和 path 庫，它是解析文件和目錄路徑的核心 node 庫。
var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// 載入設定檔，引用 passport 模組
const usePassport = require('./config/passport')

// Connect the database to our server using Mongoose.
mongoose.connect(mongoString);
const database = mongoose.connection

// Throw a success or an error message depending on whether our database connection is successful or fails.
// 'database.on' means it will connect to the database, and throws any error if the connection fails.
database.on('error', (error) => {
  console.log(error)
})

// 'database.once' means it will run only one time. If it is successful, it will show a message that says Database Connected.
database.once('connected', () => {
  console.log('Database Connected');
})

// 創建一個 express 應用程序對象（按傳統命名為 app），使用各種設置和中間件，以設置應用程序，然後從模塊導出應用程序。
var app = express();

var corseOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corseOptions));

// session middleware
app.use(session({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',    // 用來簽名存放在cookie的sessionID
  saveUninitialized: false,    // 設定為false可以避免存放太多空的session進入session store, session在還沒被修改前也不會被存入cookie
  resave: false,    // 因為每個session store會有不一樣的配置，有些會定期去清理session，如果不想要session被清理掉的話，就要把這個設定為true
}))

// 用 require()導入來自我們的路由目錄的模塊。這些模塊/文件包含用於處理特定的相關“路由”集合（URL 路徑）的代碼。當我們擴展骨架應用程序，我們將添加一個新文件，來處理與書籍相關的路由。
// 掛載 middleware
const { authenticator } = require('./middleware/auth');
require("./routes/usersRouter")(app, authenticator);

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

// app.use()，將中間件的庫，添加到請求處理鏈中。除了我們之前導入的第三方庫之外，我們還使用 express.static 中間件，來使 Express 提供在項目根目錄下，/public 目錄中的所有靜態文件。
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// Express 應用程序對象（app）現已完全完成配置。最後一步，是將其添加到模塊導出（這允許它通過 /bin/www 導入）
module.exports = app;