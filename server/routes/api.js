// File: server/routes/api.js
import express from 'express';
const router = express.Router();

// Import Controllers
import AuthController from '../controllers/authController.js';
import BenhNhanController from '../controllers/patientController.js';
import KetQuaController from '../controllers/ketQuaController.js';

// Import Middleware
import verifyToken from '../middleware/auth.js'; // <--- Import hàng nóng

// --- ROUTES AUTH (Bác sĩ) ---
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// --- ROUTES BỆNH NHÂN ---
router.get('/benh-nhan', BenhNhanController.getList);       // Lấy danh sách + tìm kiếm
router.get('/benh-nhan/:maBenhNhan', BenhNhanController.getByMa); // Tìm 1 người
// Cần đăng nhập mới được tạo bệnh nhân (Thêm verifyToken vào giữa)
router.post('/benh-nhan', verifyToken, BenhNhanController.create);

// --- ROUTES KẾT QUẢ (Form khám) ---
// Cần đăng nhập mới được lưu phiếu khám
router.post('/ket-qua', verifyToken, KetQuaController.luuKetQua);        // Lưu form
router.get('/ket-qua/lich-su/:maBenhNhan', KetQuaController.layLichSu); // Xem lịch sử
// Route Thống kê mới (Ai xem cũng được hoặc chặn tùy mày)
router.get('/thong-ke/loai-benh', verifyToken, KetQuaController.thongKeLoaiBenh);
// Xuất default
export default router;