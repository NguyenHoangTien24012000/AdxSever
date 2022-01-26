const connection = require('../services/connectDB')
const DOMAIN = require('../services/constant');

class AdxTypeController {
    getAdxType = async (req, res) => {
        let { id_adx } = req.params;
        const [rows, fields] = await connection.execute('SELECT * FROM adx_type WHERE id_adx = ?', [id_adx]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    }
    getAllAdxType = async (req, res) => {
        const [rows, fields] = await connection.execute('SELECT * FROM adx_type');
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    }
    updateAdxType = async (req, res) => {
        let { id_adx, name_adx, name_demo, size, posti, detail, type_screen } = req.body;
        let image='default';
        if (!req.file) {
            image = req.body.image
        } else {
            const a = (req.file.path.split('\\').splice(2).toString())
            image = `${DOMAIN.DOMAINIMG}/${a}`;
        }

        if (!id_adx || !name_adx || !size || !posti || !detail || !name_adx || !name_demo || !type_screen) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }



        await connection.execute('UPDATE adx_type SET name_adx = ?, image = ?, size = ?, posti = ?, detail = ?, name_demo = ?, type_screen = ? WHERE id_adx = ?', [name_adx, image, size, posti, detail, name_demo, type_screen, id_adx]);

        return res.status(200).json({
            message: 'ok'
        })
    }
    getGroupAdxType = async (req, res) => {
        let { groupType } = req.params;
        const [rows, fields] = await connection.execute('SELECT * FROM adx_type WHERE type_adx = ?', [groupType]);
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        return res.status(200).json({
            message: 'ok',
            data: rows
        })
    }
    getAllGroupAdxType = async (req, res) => {
        const [rows, fields] = await connection.execute('SELECT type_adx, COUNT(*) FROM adx_type GROUP BY type_adx');
        if (rows.length === 0) {
            return res.status(401).json({
                message: 'data does not exist'
            })
        }
        const data = rows.map((item) => {
            const number = item['COUNT(*)'];
            return { type_adx: item.type_adx, number: number };
        })
        return res.status(200).json({
            message: 'ok',
            data: data
        })
    }

    addAdxType = async (req, res) => {
        let {  name_adx, name_demo, size, posti, detail, type_screen, type_adx } = req.body;
        // console.log(req.body)
        let image;
        // if()
        if (!req.file) {
            image = req.body.image
        } else {
            const a = (req.file.path.split('\\').splice(2).toString())
            image = `${DOMAIN.DOMAINIMG}/${a}`;
        }

        if (!name_adx || !size || !posti || !detail || !name_demo || !type_screen || ! type_adx || !image) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }

        const [rows, fields] = await connection.execute('INSERT INTO adx_type (image, name_adx, name_demo, posti, size, detail, type_adx, type_screen) VALUES (?,?,?,?,?,?,?,?)', [image, name_adx, name_demo, posti, size, detail, type_adx, type_screen]);

        // console.log(rows.insertId)
        let id_type_adx = rows.insertId

        for(let i = 0; i < 3; i++){
            await connection.execute('INSERT INTO demo_adx(id_type_adx) VALUES (?)', [id_type_adx]);
        }

        return res.status(200).json({
            message: 'ok'
        })
    }

    deleteAdxType = async(req,res) =>{
        let {id_adx} = req.params;
        const [rows, fields] = await connection.execute('DELETE FROM adx_type WHERE id_adx = ?', [id_adx]);
        // console.log(rows)
        if(rows.affectedRows === 0){
            return res.status(400).json({
                message: 'delete failed'
            })
        }
        return res.status(200).json({
            message: 'ok'
        })
        
    }

}

module.exports = new AdxTypeController;