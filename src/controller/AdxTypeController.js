const connection = require('../services/connectDB')
const DOMAIN = require('../services/constant');

class AdxTypeController {
    getAdxType = async(req,res) =>{
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
        let {id_adx, name_adx,name_demo, size, posti, detail,type_screen } = req.body;
        let image;
        if(!req.file){
            image = req.body.image
        }else{
            const a = (req.file.path.split('\\').splice(2).toString())
            image = `${DOMAIN.DOMAINIMG}/${a}`;
        }

        if (!id_adx || !name_adx || !size || !posti || !detail || !name_adx || !name_demo || !type_screen) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }

   

        await connection.execute('UPDATE adx_type SET name_adx = ?, image = ?, size = ?, posti = ?, detail = ?, name_demo = ?, type_screen = ? WHERE id_adx = ?', [name_adx, image, size, posti, detail, name_demo,type_screen, id_adx]);

        return res.status(200).json({
            message : 'ok'
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
 
}

module.exports = new AdxTypeController;