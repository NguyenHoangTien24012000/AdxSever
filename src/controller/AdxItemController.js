const connection = require('../services/connectDB');

class AdxItemController {
    getItemGroup = async (req, res) => {
        let {idGroup} = req.params;
        // console.log(req.params)
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM item_detail WHERE group_item = ?', [idGroup] );
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
    getItemDetail = async(req, res) =>{
        let {idItem} = req.params;
        try {
            const [rows, fields] = await connection.execute('SELECT * FROM item_detail WHERE id_item = ?', [idItem] );
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
        let idItem = Number(req.params.idItem);
        let {img_item, description_item} = req.body;
        if (!img_item || !description_item) {
            return res.status(401).json({
                message: 'missing required params',
            })
        }
        try {
            await connection.execute('UPDATE item_detail set img_item = ?, description_item = ? WHERE id_item = ?', [img_item, description_item, idItem]);
            return res.status(200).json({
                message: 'Update success'
            })
        } catch (error) {
            return res.status(401).json({
                message : error
            })
        }
    }
}

module.exports = new AdxItemController;