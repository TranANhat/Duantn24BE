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
      tenDichVu: req.body.tenDichVu 
    };
    DichvuModel.createDichvu(dichvu, (err, results) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Dịch vụ đã được tạo thành công', dichvuId: results.insertId });
    });
  },
  deleteDichvu: (req, res) => {
    const dichvuID = req.params.id;
    DichvuModel.deleteDichvu(dichvuID, (err, results) => {
      if (err) return res.status(500).send(err);
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
      tenDichVu: req.body.tenDichVu 
    };
    DichvuModel.updateDichvu(dichvuID, dichvu, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Dịch vụ không tồn tại' });
      }
      res.json({ message: 'Dịch vụ đã được cập nhật thành công' });
    });
  }
};

module.exports = DichvuController;
