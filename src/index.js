const express = require('express');
const app = express();
const port = 5000;
const initWebRoute = require('./routes/index.route')
const authMiddleWare = require('./services/authMiddleWare');
const userLoginRouter = require('./routes/loginIndex.route');
const multer = require('multer');
// const { path } = require('express/lib/application');




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control_Allow_Methods", "GET, POST, DELETE, PUT");
    next();
});
app.use(express.static('uploads'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

app.post('/profile', upload.single('image'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
})


//init web route

//Access token;
userLoginRouter(app);

app.use(authMiddleWare)


initWebRoute(app);
//handle 404 not found
app.use((req, res) => {
    return res.status(404).send('<h2>Page Not Found</h2>')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

