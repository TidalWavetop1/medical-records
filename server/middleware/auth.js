// File: server/middleware/auth.js
import jwt from 'jsonwebtoken';

// Mày nên chuyển cái này vào file .env sau này nha
// Thay dòng const SECRET_KEY = '...' bằng dòng này:
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {

    if (!SECRET_KEY) {
        return res.status(500).json({ message: "Lỗi Server: Chưa cấu hình Secret Key!" });
    }
    // 1. Lấy token từ header (Authorization: Bearer <token>)
    const tokenHeader = req.headers['authorization'];
    
    if (!tokenHeader) {
        return res.status(403).json({ message: 'Chưa đăng nhập! Không có quyền truy cập.' });
    }

    try {
        // Cắt bỏ chữ 'Bearer ' để lấy token
        const token = tokenHeader.split(' ')[1]; 
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // Lưu thông tin user vào req để dùng ở bước sau
        req.user = decoded; 
        next(); // Cho phép đi tiếp
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
};

export default verifyToken;