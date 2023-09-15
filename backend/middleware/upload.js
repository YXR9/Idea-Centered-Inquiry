const multer = require("multer");


const excelFilter = (req, file, cb) => {
    console.log("😳");
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
        cb(new Error('Please upload an Excel'))
    }
    cb(null, true)
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/uploads/");
        console.log(__basedir + "/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname + '-' + Date.now());
        console.log("👍");
    },
});

const upload = multer({ 
    storage: storage,
    // limits : {
    //     fileSize : 1000000
    // },
    fileFilter: excelFilter 
});

module.exports = upload;