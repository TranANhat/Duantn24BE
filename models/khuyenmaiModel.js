// models/khuyenmaiModel.js
const db = require('../config/db');

const KhuyenmaiModel = {
  getAllKhuyenmai: (callback) => {
    const query = 'SELECT * FROM khuyenmai';
    db.query(query, callback);
  },
  
  createKhuyenmai: (khuyenmai, callback) => {
    const query = 'INSERT INTO khuyenmai (moTa, giamGia, maKhuyenMai, ngayBatDau, ngayKetThuc) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [khuyenmai.moTa, khuyenmai.giamGia, khuyenmai.maKhuyenMai, khuyenmai.ngayBatDau, khuyenmai.ngayKetThuc], callback);
  },
  
  deleteKhuyenmai: (id, callback) => {
    const query = 'DELETE FROM khuyenmai WHERE id = ?';
    db.query(query, [id], callback);
  },
  
  updateKhuyenmai: (id, khuyenmai, callback) => {
    const query = 'UPDATE khuyenmai SET moTa = ?, giamGia = ?, maKhuyenMai = ?, ngayBatDau = ?, ngayKetThuc = ? WHERE id = ?';
    db.query(query, [khuyenmai.moTa, khuyenmai.giamGia, khuyenmai.maKhuyenMai, khuyenmai.ngayBatDau, khuyenmai.ngayKetThuc, id], callback);
  },
};

module.exports = KhuyenmaiModel;
