// File: server/controllers/benhNhanController.js
import BenhNhanModel from '../models/patient.js';
import { xoaDau } from '../utils/stringHelper.js'; // <--- Import vào

const BenhNhanController = {
    // API: GET /api/benh-nhan?page=1&limit=20&keyword=Nguyen
    getList: (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const keyword = req.query.keyword || '';

            const result = BenhNhanModel.getList(page, limit, keyword);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // API: GET /api/benh-nhan/:maBenhNhan
    // Dùng để check nhanh xem bệnh nhân có chưa
    getByMa: (req, res) => {
        try {
            const { maBenhNhan } = req.params;
            const patient = BenhNhanModel.getByMa(maBenhNhan);
            
            if (patient) {
                res.json({ found: true, data: patient });
            } else {
                res.json({ found: false, message: 'Không tìm thấy bệnh nhân' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // API: POST /api/benh-nhan
    create: (req, res) => {
        try {
            const { maBenhNhan, hoTen, namSinh, gioiTinh } = req.body;

            // Validate cơ bản
            if (!maBenhNhan || !hoTen) {
                return res.status(400).json({ message: 'Thiếu mã bệnh nhân hoặc họ tên' });
            }

            // Check trùng
            const existing = BenhNhanModel.getByMa(maBenhNhan);
            if (existing) {
                return res.status(400).json({ message: 'Mã bệnh nhân này đã tồn tại!' });
            }

            const hoTenSearch = xoaDau(req.body.hoTen); // Tạo thêm cột này để lưu

            const info = BenhNhanModel.create({ maBenhNhan, hoTen, namSinh, gioiTinh, hoTenSearch });
            res.status(201).json({ 
                message: 'Thêm bệnh nhân thành công', 
                id: info.lastInsertRowid // Trả về ID tự tăng của SQLite
            });
        
            

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default BenhNhanController;