// controllers/khuyenmaiController.js
const KhuyenmaiModel = require('../models/khuyenmaiModel');

const KhuyenmaiController = {
  getAllKhuyenmai: (req, res) => {
    KhuyenmaiModel.getAllKhuyenmai((err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  },

  createKhuyenmai: (req, res) => {
    const khuyenmai = {
      moTa: req.body.moTa,
      giamGia: req.body.giamGia,
      maKhuyenMai: req.body.maKhuyenMai,
      ngayBatDau: req.body.ngayBatDau,
      ngayKetThuc: req.body.ngayKetThuc
    };
    KhuyenmaiModel.getKtraKhuyenMai(maKhuyenMai, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results) {
        return res.status(400).send({ message: 'Khuyến mãi đã tồn tại' })
      }
      KhuyenmaiModel.createKhuyenmai(khuyenmai, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Khuyến mãi đã được tạo thành công', khuyenmaiId: results.insertId });
      });
    })


  },



  deleteKhuyenmai: (req, res) => {
    const khuyenmaiID = req.params.id;
    KhuyenmaiModel.deleteKhuyenmai(khuyenmaiID, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Khuyến mãi không tồn tại' });
      }
      res.json({ message: 'Khuyến mãi đã được xóa thành công' });
    });
  },

  updateKhuyenmai: (req, res) => {
    const khuyenmaiID = req.params.id;
    const khuyenmai = {
      moTa: req.body.moTa,
      giamGia: req.body.giamGia,
      maKhuyenMai: req.body.maKhuyenMai,
      ngayBatDau: req.body.ngayBatDau,
      ngayKetThuc: req.body.ngayKetThuc
    };

    KhuyenmaiModel.updateKhuyenmai(khuyenmaiID, khuyenmai, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Khuyến mãi không tồn tại' });
      }
      res.json({ message: 'Khuyến mãi đã được cập nhật thành công' });
    });
  }
};

module.exports = KhuyenmaiController;
