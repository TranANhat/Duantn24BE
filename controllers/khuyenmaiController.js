const KhuyenMai = require("../models/khuyenmaiModel");
const HoaDon = require("../models/hoadonModel");

// Lấy tất cả mã khuyến mãi
exports.getAllKhuyenMai = (req, res) => {
  KhuyenMai.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

// Tạo mới mã khuyến mãi
exports.createKhuyenMai = (req, res) => {
  const { moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram } = req.body;
  KhuyenMai.create({ moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Tạo mã khuyến mãi thành công", result });
  });
};

// Cập nhật mã khuyến mãi
exports.updateKhuyenMai = (req, res) => {
  const id = req.params.id;
  const { moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram } = req.body; // bỏ 'trangThai'
  KhuyenMai.update(id, { moTa, tenKhuyenMai, ngayBatDau, ngayKetThuc, phanTram }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Cập nhật mã khuyến mãi thành công", result });
  });
};

// Xóa mã khuyến mãi
exports.deleteKhuyenMai = (req, res) => {
  const id = req.params.id;
  KhuyenMai.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Xóa mã khuyến mãi thành công", result });
  });
};

// Áp dụng mã khuyến mãi vào hóa đơn
exports.applyKhuyenMai = (req, res) => {
  const { tenKhuyenMai, tongTien } = req.body;

  if (!tenKhuyenMai || !tongTien) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin mã khuyến mãi hoặc tổng tiền." });
  }

  KhuyenMai.getByCode(tenKhuyenMai, (err, results) => {
    if (err) {
      console.error("Lỗi khi kiểm tra mã khuyến mãi:", err);
      return res.status(500).json({ success: false, message: "Lỗi server." });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "Mã khuyến mãi không hợp lệ." });
    }

    const khuyenMai = results[0];
    const now = new Date();
    const ngayBatDau = new Date(khuyenMai.ngayBatDau);
    const ngayKetThuc = new Date(khuyenMai.ngayKetThuc);

    if (now < ngayBatDau || now > ngayKetThuc) {
      return res.status(400).json({ success: false, message: "Mã khuyến mãi đã hết hạn." });
    }

    const discount = (tongTien * khuyenMai.phanTram) / 100;
    const discountedTotal = tongTien - discount;

    res.json({
      success: true,
      message: "Mã khuyến mãi hợp lệ",
      discountedTotal,
      discountPercent: khuyenMai.phanTram,
    });
  });
};

exports.checkKhuyenMai = async (req, res) => {
  try {
    const saleCode = req.params.sale;
    // Kiểm tra mã khuyến mãi và xử lý
    const khuyenMai = await new Promise((resolve, reject) => {
      KhuyenMai.getByCode(saleCode, (err, results) => {
        if (err) {
          console.error("Lỗi khi kiểm tra má khuyến mái:", err);
          reject(err);
        }
        resolve(results[0]);
      });
    });

    if (!khuyenMai) {
      return res.status(404).json({ message: "Mã khuyến mãi không tồn tại" });
    }

    const now = new Date();
    const ngayBatDau = new Date(khuyenMai.ngayBatDau);
    const ngayKetThuc = new Date(khuyenMai.ngayKetThuc);

    if (now >= ngayBatDau && now <= ngayKetThuc) {
      return res.json(khuyenMai);
    } else {
      return res.status(400).json({ message: "Mã khuyến mãi đã hết hạn" });
    }
  } catch (error) {
    console.error("Lỗi khi xử lý mã khuyến mãi:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi áp dụng mã khuyến mãi." });
  }
};