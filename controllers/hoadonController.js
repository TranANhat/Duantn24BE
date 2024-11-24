const hoadonModel = require("../models/hoadonModel")
const userModel = require("../models/userModel")
const chitiethdModel = require("../models/chitiethdModel")
const hoadonController = {
    getHoadon: (req, res) => {
        hoadonModel.getHoadon((err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result)
            //
        });
    },



    createHoadon: (req, res) => {
        const { username, phone, email, diaChi, tongTien, phuongThucThanhToan, dichVu_id, soLuong = 1, ngayHen } = req.body;


        userModel.checkPhone(phone, (err, existingUser) => {
            if (err) return res.status(500).send(err);
            const user = existingUser[0];
            if (user) {

                const userid = user.id;

                hoadonModel.createHoadon(userid, phuongThucThanhToan, ngayHen, tongTien, (err, result) => {
                    if (err) return res.status(500).send(err)

                    const hoadonID = result.insertId;
                    chitiethdModel.createCTHD(hoadonID, dichVu_id, soLuong, (err, result) => {
                        if (err) return res.status(500).send(err)

                        res.status(200).send({ message: 'Đơn hàng đã được tạo' })
                    })

                })
            } else {
                userModel.createUser({ username, phone, email, diaChi }, (err, result) => {
                    if (err) return res.status(500).send(err);

                    const userid = result.insertId;

                    hoadonModel.createHoadon(userid, phuongThucThanhToan, ngayHen, tongTien, (err, result) => {
                        if (err) return res.status(500).send(err)

                        const hoadonID = result.insertId;
                        chitiethdModel.createCTHD(hoadonID, dichVu_id, soLuong, (err, result) => {
                            if (err) return res.status(500).send(err)

                            res.status(200).send({ message: 'Đơn hàng đã được tạo' })
                        })

                    })
                })

            }

        })

    },

    deleteHoaDon: (req, res) => {
        const { id } = req.params;
        hoadonModel.deleteHoaDon(id, (err, result) => {
            if (err) return res.status(500).send(err)
            res.status(200).send({ message: 'Đơn hàng đã được xóa thành công' });
        });
    },

    updateHoadonStatus: (req, res) => {
        const { id } = req.params;
        const { trangThai } = req.body; // Trạng thái mới (Đã xác nhận, Đã thanh toán, Đã hủy)

        hoadonModel.updateHoadonStatus(id, trangThai, (err, result) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: `Trạng thái hóa đơn đã được cập nhật thành ${trangThai}` });
        });
    }

}

module.exports = hoadonController;