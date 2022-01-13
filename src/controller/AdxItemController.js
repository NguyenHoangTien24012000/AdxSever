const connection = require('../services/connectDB');
const DOMAIN = require('../services/constant');

class AdxItemController {
    getItemGroup = async (req, res) => {
        let { idGroup } = req.params;
        // console.log(req.params)
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM demo_adx WHERE id_type_adx = ?', [idGroup]);
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
    getItemDetail = async (req, res) => {
        let { idItem } = req.params;
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM demo_adx WHERE id_item = ?', [idItem]);
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
    updateItemDetail = async (req, res) => {
        let { link_button1, link_button2, name_demo, id_demo } = req.body;
        let image;
        if (!req.file) {
            image = req.body.image
        } else {
            const a = (req.file.path.split('\\').splice(2).toString())
            image = `${DOMAIN.DOMAINIMG}/${a}`;
        }

        if (!link_button1 || !link_button2 || !name_demo || !id_demo) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }

        await connection.execute('UPDATE demo_adx SET name_demo = ?, image = ?, link_button1 = ?, link_button2 = ? WHERE id_demo = ?', [name_demo, image, link_button1, link_button2, id_demo]);

        return res.status(200).json({
            message: 'ok'
        })
    }

}

module.exports = new AdxItemController;