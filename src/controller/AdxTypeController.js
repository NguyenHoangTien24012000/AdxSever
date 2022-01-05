const connection = require('../services/connectDB')

class AdxTypeController {
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
    // createAdxType = async (req, res) => {
    //     let { name_adx, img_adx, adx_size, adx_position, adx_detail, group_type } = req.body;

    //     if (!name_adx || !img_adx, !adx_size, !adx_position, !adx_detail, !group_type) {
    //         return res.status(401).json({
    //             message: 'missing required params'
    //         })
    //     }
    //     await connection.execute('INSERT INTO adx_type ( name_adx, img_adx, adx_size, adx_position, adx_detail, group_type) VALUES (?, ?, ?, ?, ?, ?)', [name_adx, img_adx, adx_size, adx_position, adx_detail, group_type]);
    //     return res.status(200).json({
    //         message: 'ok',
    //     })
    // }
    updateAdxType = async (req, res) => {
        let id = Number(req.params.id);
        // console.log(typeof id)
        let { name_adx, img_adx, adx_size, adx_position, adx_detail } = req.body;

        if (!name_adx || !img_adx, !adx_size, !adx_position, !adx_detail) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        await connection.execute('UPDATE adx_type set name_adx = ?, img_adx = ?, adx_size = ?, adx_position = ?, adx_detail = ? WHERE id_adx = ?', [name_adx, img_adx, adx_size, adx_position, adx_detail, id]);
        return res.send('Update success')
    }
    getGroupAdxType = async (req, res) => {
        let { groupType } = req.params;
        const [rows, fields] = await connection.execute('SELECT * FROM adx_type WHERE group_type = ?', [groupType]);
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
}

module.exports = new AdxTypeController;