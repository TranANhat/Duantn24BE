// controllers/dichvuController.js
const DichvuModel = require('../models/dichvuModel');

const DichvuController = {
  getAllDichvu: (req, res) => {
    DichvuModel.getAllDichvu((err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  },


  createDichvu: (req, res) => {
    const dichvu = {
      moTa: req.body.moTa,
      gia: req.body.gia,
      tenDichVu: req.body.tenDichVu,
      hinhanh: req.file ? `/uploads/${req.file.filename}` : null,
    };
    console.log(req.file)
    DichvuModel.createDichvu(dichvu, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Dịch vụ đã được tạo thành công', dichvuId: results.insertId });
    });
  },


  deleteDichvu: (req, res) => {
    const dichvuID = req.params.id;
    DichvuModel.deleteDichvu(dichvuID, (err, results) => {
      if (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
          return res.status(400).json({
            message: 'Không thể xóa dịch vụ vì đang có hóa đơn liên kết với dịch vụ này.'
          })
        }
        return res.status(500).send(err);

      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Dịch vụ không tồn tại' });
      }
      res.json({ message: 'Dịch vụ đã được xóa thành công' });
    });
  },



  updateDichvu: (req, res) => {
    const dichvuID = req.params.id;
    const dichvu = {
      moTa: req.body.moTa,
      gia: req.body.gia,
      tenDichVu: req.body.tenDichVu,
      hinhanh: req.body.hinhanh
    };
    DichvuModel.updateDichvu(dichvuID, dichvu, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Dịch vụ không tồn tại' });
      }
      res.json({ message: 'Dịch vụ đã được cập nhật thành công' });
    });
  },
  searchDichvuByName: (req, res) => {
    const tenDichVu = req.query.tenDichVu || '';
    DichvuModel.searchDichvu(tenDichVu, (err, results) => {
      if (err) {
        console.error('Chi tiết lỗi:', err.sqlMessage || err.message || err);
        res.status(500).json({
          error: 'Lỗi khi tìm kiếm dịch vụ theo tên',
          details: err.sqlMessage || err.message || err
        });
      } else {
        res.json(results);
      }
    });
  }

};

module.exports = DichvuController;
