// models/dichvuModel.js
const db = require('../config/db');

const DichvuModel = {
  getAllDichvu: (callback) => {
    const query = 'SELECT * FROM dichvu';
    db.query(query, callback);
  },
  createDichvu: (dichvu, callback) => {
    const query = 'INSERT INTO dichvu (moTa, gia, tenDichVu , hinhanh) VALUES (?, ?, ? , ?)';
    db.query(query, [dichvu.moTa, dichvu.gia, dichvu.tenDichVu, dichvu.hinhanh], callback);
  },
  deleteDichvu: (id, callback) => {
    const query = 'DELETE FROM dichvu WHERE id = ?';
    db.query(query, [id], callback);
  },
  updateDichvu: (id, dichvu, callback) => {
    const query = 'UPDATE dichvu SET moTa = ?, gia = ?, tenDichVu = ? WHERE id = ?';
    db.query(query, [dichvu.moTa, dichvu.gia, dichvu.tenDichVu, id], callback);
  },





};

module.exports = DichvuModel;
