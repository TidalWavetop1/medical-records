// File: server/controllers/ketQuaController.js
import KetQuaModel from'../models/ketQua.js';
import BenhNhanModel from'../models/patient.js';


const KetQuaController = {
    // API: POST /api/ket-qua
    // Body nhận vào: { maBenhNhan, bacSiId, maBieuMau, duLieuKham: {...} }
    luuKetQua: (req, res) => {
        try {
            const { maBenhNhan, bacSiId, maBieuMau, duLieuKham } = req.body;

            // 1. Phải tìm ID của bệnh nhân từ Mã Bệnh Nhân trước
            // (Vì bảng ket_qua liên kết bằng ID chứ không phải Mã String)
            const benhNhan = BenhNhanModel.getByMa(maBenhNhan);
            
            if (!benhNhan) {
                return res.status(404).json({ message: 'Bệnh nhân chưa tồn tại trong hệ thống!' });
            }

            // 2. Lưu kết quả
            const dataToSave = {
                benhNhanId: benhNhan.id,
                bacSiId: bacSiId,
                maBieuMau: maBieuMau,
                duLieuKham: duLieuKham // Cái này là Object, Model sẽ tự stringify
            };

            const info = KetQuaModel.create(dataToSave);

            res.status(201).json({ 
                message: 'Lưu phiếu khám thành công!', 
                id: info.lastInsertRowid 
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },

    // API: GET /api/ket-qua/lich-su/:maBenhNhan
    // Lấy lịch sử khám dựa trên Mã Bệnh Nhân
    layLichSu: (req, res) => {
        try {
            const { maBenhNhan } = req.params;

            // 1. Tìm ID bệnh nhân
            const benhNhan = BenhNhanModel.getByMa(maBenhNhan);
            if (!benhNhan) {
                return res.status(404).json({ message: 'Không tìm thấy bệnh nhân' });
            }

            // 2. Lấy danh sách kết quả
            const lichSu = KetQuaModel.getByBenhNhanId(benhNhan.id);
            
            res.json({
                benhNhan: benhNhan,
                lichSuKham: lichSu
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // --- THÊM HÀM NÀY VÀO ---
    // API: GET /api/thong-ke/loai-benh?month=11&year=2025
    thongKeLoaiBenh: (req, res) => {
        try {
            const { month, year } = req.query;

            // 1. Validate (Kiểm tra đầu vào cho chắc ăn)
            if (!month || !year) {
                return res.status(400).json({ message: "Vui lòng cung cấp tháng và năm!" });
            }

            // 2. Chuẩn hóa dữ liệu (Business Logic)
            // Format tháng thành 2 chữ số (ví dụ: '1' -> '01') để khớp với SQLite
            const formattedMonth = month.toString().padStart(2, '0');

            // 3. Gọi Model xử lý
            const data = KetQuaModel.thongKeTheoLoaiBenh(formattedMonth, year);

            // 4. Trả kết quả
            res.json({
                thoiGian: `${formattedMonth}/${year}`,
                tongSoCa: data.reduce((sum, item) => sum + item.SoLuong, 0), // Tính tổng luôn cho ngầu
                chiTiet: data
            });

        } catch (error) {
            console.error("Lỗi thống kê:", error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default KetQuaController;