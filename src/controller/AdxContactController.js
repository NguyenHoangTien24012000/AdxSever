const connection = require('../services/connectDB');
class AdxContactController {
    getAllAdxContact = async (req, res) => {
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM contact_link');
            // res.send(rows);
            return res.status(200).json({
                message: 'ok',
                data: rows
            })
        } catch (error) {
            return res.status(401).json({
                message: error
            })
        }
    }
    editAdxContact = async (req, res) => {
        let { number_phone1, number_phone2, email, link_facebook, link_skype, link_zalo, link_signin, link_signup } = req.body;
        // console.log( req.body )
        if (!number_phone1 || !number_phone2 || !email || !link_facebook || !link_skype || !link_zalo || !link_signin || !link_signup) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        await connection.execute('UPDATE contact_link SET number_phone1 = ?, number_phone2 = ?, email = ?, link_facebook = ?, link_skype = ?, link_zalo = ?, link_signin = ?, link_signup = ? WHERE id_contact = 1', [number_phone1, number_phone2, email, link_facebook, link_skype, link_zalo, link_signin, link_signup]);

        return res.status(200).json({
            message: 'ok'
        })
    }
}

module.exports = new AdxContactController;