const express = require('express');
const app = express();
const port = 5000;
const initWebRoute = require('./routes/index.route')
const authMiddleWare = require('./services/authMiddleWare');
const userLoginRouter = require('./routes/loginIndex.route');
// const router = express.Router();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

//init web route

//Access token;
userLoginRouter(app);

app.use(authMiddleWare)

initWebRoute(app);
//handle 404 not found
app.use((req, res) =>{
    return res.status(404).send('<h2>Page Not Found</h2>')
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})

