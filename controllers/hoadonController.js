const hoadonModel = require("../models/hoadonModel");
const userModel = require("../models/userModel");
const chitiethdModel = require("../models/chitiethdModel");

const hoadonController = {
    // Lấy danh sách hóa đơn
    getHoadon: (req, res) => {
        hoadonModel.getHoadon((err, result) => {
            if (err) return res.status(500).send(err);
            res.json(result);
        });
    },

    // Tạo hóa đơn mới
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
                    const thanhTien = tongTien / soLuong;
                    chitiethdModel.createCTHD(hoadonID, dichVu_id, soLuong, thanhTien, (err, result) => {
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
                        const thanhTien = tongTien / soLuong;
                        chitiethdModel.createCTHD(hoadonID, dichVu_id, soLuong, thanhTien, (err, result) => {
                            if (err) return res.status(500).send(err)

                            res.status(200).send({ message: 'Đơn hàng đã được tạo' })
                        })

                    })
                })

            }

        })

    },

    // Xóa hóa đơn
    deleteHoaDon: (req, res) => {
        const { id } = req.params;
        hoadonModel.deleteHoaDon(id, (err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: "Đơn hàng đã được xóa thành công" });
        });
    },

    // Cập nhật trạng thái hóa đơn
    updateHoadonStatus: (req, res) => {
        const { id } = req.params;
        const { trangThai } = req.body;

        hoadonModel.updateHoadonStatus(id, trangThai, (err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ message: `Trạng thái hóa đơn đã được cập nhật thành ${trangThai}` });
        });
    },

    // Lấy hóa đơn theo số điện thoại
    PhoneHoadon: (req, res) => {
        const phone = req.params.phone;
        hoadonModel.PhoneHoadon(phone, (err, results) => {
            if (err) return res.status(500).json({ message: "Đã xảy ra lỗi khi kiểm tra số điện thoại." });
            if (results.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy hóa đơn nào liên quan đến số điện thoại này." });
            }
            res.status(200).json({
                message: "Thông tin chi tiết hóa đơn liên quan đến số điện thoại.",
                data: results,
            });
        });
    },

    // Thêm phản hồi vào hóa đơn
    addFeedback: (req, res) => {
        const hoadonId = req.params.id;
        const { comment } = req.body;
        console.log("Params:", req.params);
        console.log("Body:", req.body);

        console.log(`hoadonId: ${hoadonId}, comment: ${comment}`);  // Log đầu vào để kiểm tra

        if (!comment) {
            return res.status(400).json({
                message: 'Nội dung phản hồi không được để trống.'
            });
        }

        hoadonModel.createFeedback(hoadonId, comment, (err, result) => {
            if (err) {
                console.log(err); // Log lỗi để dễ dàng debug
                return res.status(500).json({
                    message: 'Lỗi khi tạo phản hồi.',
                    error: err
                });

            }
            hoadonModel.getHoadonById(hoadonId, (err, hoadon) => {
                if (err) {
                    console.log(err); // Log lỗi khi không tìm thấy hóa đơn
                    return res.status(500).json({
                        message: 'Lỗi khi lấy hóa đơn sau khi thêm phản hồi.',
                        error: err
                    });
                }

                return res.status(200).json({
                    message: 'Phản hồi đã được gửi thành công.',

                    data: hoadon
                });
            });
        });
    },

    getFeedbackByHoadonId: (req, res) => {
        const hoadonId = req.params.id;

        hoadonModel.getFeedbackByHoadonId(hoadonId, (err, feedback) => {
            if (err) {
                console.error("Lỗi khi lấy phản hồi:", err);
                return res.status(500).json({
                    message: "Lỗi khi lấy phản hồi.",
                    error: err,
                });
            }

            if (!feedback || feedback.length === 0) {
                return res.status(404).json({
                    message: "Không tìm thấy phản hồi nào cho hóa đơn này.",
                });
            }

            // Lấy phần comment và created_at từ phản hồi
            const { id, hoadon_id, comment, created_at } = feedback[0];

            return res.status(200).json({
                message: "Phản hồi đã được lấy thành công.",
                feedback: {
                    id,
                    hoadon_id,
                    comment,
                    created_at
                }
            });
        });
    },

    getAllFeedback: (req, res) => {
        hoadonModel.getAllFeedback((err, feedback) => {
            if (err) {
                return res.status(500).send(err); // Trả về lỗi cho client
            }
            res.json(feedback); // Trả về dữ liệu JSON cho client
        });
    },
    // Controller để xóa đánh giá theo hoadonId
    deleteFeedbackById: (req, res) => {
        const feedbackID = req.params.id;

        hoadonModel.deleteFeedback(feedbackID, (err, results) => {
            if (err) {
                if (err.code === 'ER_ROW_IS_REFERENCED_2') {
                    return res.status(400).json({
                        message: 'Không thể xóa dịch vụ vì đang có hóa đơn liên kết với đánh giá này.'
                    })
                }
                return res.status(500).send(err);

            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'đánh giá không tồn tại' });
            }
            res.json({ message: 'đánh giá đã được xóa thành công' });
        });

    },

    searchHoadonByUsername: (req, res) => {
        const { username } = req.query; // Nhận tên khách hàng từ query string

        hoadonModel.SearchHoadonByUsername(username, (err, results) => {
            if (err) {
                console.error('Lỗi khi tìm kiếm hóa đơn:', err);
                return res.status(500).send('Lỗi khi tìm kiếm hóa đơn');
            }

            if (results.length === 0) {
                return res.status(404).send('Không tìm thấy hóa đơn cho khách hàng này');
            }

            res.json(results); // Trả về kết quả tìm kiếm
        });
    },
};

module.exports = hoadonController;
