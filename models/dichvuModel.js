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
    const query = 'UPDATE dichvu SET moTa = ?, gia = ?, tenDichVu = ?, anhDichVu = ? WHERE id = ?';
    db.query(query, [dichvu.moTa, dichvu.gia, dichvu.tenDichVu, dichvu.anhDichVu, id], callback);
  },
  searchDichvu: (name, callback) => {
    const query = 'SELECT * FROM dichvu WHERE tenDichVu LIKE ?';
    const searchName = `%${name}%`;
    db.query(query, [searchName], callback);
  }




};

module.exports = DichvuModel;
