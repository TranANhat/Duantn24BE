// const db = require("../config/db");

// const feedbackModel = {
//     // Thêm đánh giá vào hóa đơn
//     createFeedback: (hoadonId, username, rating, comment) => {
//         const query = `
//             INSERT INTO feedback (hoadon_id, username, rating, comment) 
//             VALUES (?, ?, ?, ?)
//         `;

//         return new Promise((resolve, reject) => {
//             if (!hoadonId || !username || !rating || !comment) {
//                 return reject(new Error("Missing required fields"));
//             }

//             db.query(query, [hoadonId, username, rating, comment], (err, results) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve(results); // Trả về kết quả nếu không có lỗi
//             });
//         });
//     },

//     // Lấy đánh giá của hóa đơn
//     getFeedbackByHoadonId: (hoadonId) => {
//         const query = `
//             SELECT * FROM feedback
//             WHERE hoadon_id = ?
//         `;

//         return new Promise((resolve, reject) => {
//             if (!hoadonId) {
//                 return reject(new Error("Missing hoadonId"));
//             }

//             db.query(query, [hoadonId], (err, results) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve(results); // Trả về kết quả nếu không có lỗi
//             });
//         });
//     }
// };

// module.exports = feedbackModel;
