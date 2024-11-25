// const feedbackModel = require('../models/feedbackModel');

// exports.createFeedback = async (req, res) => {
//     try {
//         const { hoadonId, username, rating, comment } = req.body;

//         if (!hoadonId || !username || !rating || !comment) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         const result = await feedbackModel.createFeedback(hoadonId, username, rating, comment);
//         res.status(201).json({ message: "Feedback added successfully", result });
//     } catch (err) {
//         res.status(500).json({ message: "Error adding feedback", error: err.message });
//     }
// };
