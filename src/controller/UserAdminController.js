// const { type, json } = require('express/lib/response');
// const { type } = require('express/lib/response');
const connection = require('../services/connectDB')
const { make } = require('../services/JWT')
class UserAdminController {
    checkLogin = async (req, res) => {
        // let {data} = req.body;
        // console.log("data", req.body);
        let data = req.body;
        let {user, password} = data;
        // console.log(email, password)
      
        if (!user || !password) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        const [rows, fields] = await connection.execute('SELECT * FROM user_admin WHERE email = ? AND password_login = ?', [user, password]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Login failed'
            })
        }

        if(rows.length > 0){
            const _token = await make(data);
            return res.status(200).send({
                token: _token,
                message: 'ok'
            })
        }
    }
}

module.exports = new UserAdminController;
