const connection = require('../services/connectDB')
const { make } = require('../services/JWT')
class UserAdminController {
    checkLogin = async (req, res) => {
        let user = req.body;
        if (!user.email || !user.password) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        const [rows, fields] = await connection.execute('SELECT * FROM user_admin WHERE email = ? AND passWord = ?', [user.email, user.password]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Login failed'
            })
        }

        if(rows.length > 0){
            const _token = await make(user);
            return res.status(200).send({
                token: _token,
                message: 'ok'
            })
        }
    }
}

module.exports = new UserAdminController;