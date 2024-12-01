const db = require('../config/db');

const KhuyenMai = {
  // Lấy tất cả mã khuyến mãi
  getAll: (callback) => {
    const query = 'SELECT * FROM khuyenmai';
    db.query(query, callback);
  },

  // Lấy mã khuyến mãi theo tên mã
  getByCode: (tenKhuyenMai, callback) => {
    const query = 'SELECT * FROM khuyenmai WHERE tenKhuyenMai = ?';
    db.query(query, [tenKhuyenMai], callback);
  },

  // Tạo mã khuyến mãi mới
  create: ({ moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram }, callback) => {
    const query = `
      INSERT INTO khuyenmai (moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram], callback);
  },

  // Cập nhật mã khuyến mãi
  update: (id, { moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram }, callback) => {
    const query = `
      UPDATE khuyenmai
      SET moTa = ?, tenKhuyenMai = ?, ngayBatDau = ?, ngayKetThuc = ?, phanTram = ?
      WHERE id = ?
    `;
    db.query(query, [moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram, id], callback);
  },

  // Xóa mã khuyến mãi
  delete: (id, callback) => {
    const query = 'DELETE FROM khuyenmai WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = KhuyenMai;