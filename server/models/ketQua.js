import db from'../config/database.js';

const KetQua = {
    // Lưu form mới
    create: (data) => {
        const sql = `
            INSERT INTO ket_qua_xet_nghiem (benh_nhan_id, bac_si_thuc_hien_id, ma_bieu_mau, du_lieu_kham)
            VALUES (?, ?, ?, ?)
        `;
        // Biến object thành chuỗi JSON để lưu vào SQLite
        const jsonString = JSON.stringify(data.duLieuKham);
        
        return db.prepare(sql).run(data.benhNhanId, data.bacSiId, data.maBieuMau, jsonString);
    },

    // Lấy lịch sử khám của 1 bệnh nhân
    getByBenhNhanId: (benhNhanId) => {
        const sql = `
            SELECT k.*, u.full_name as ten_bac_si 
            FROM ket_qua_xet_nghiem k
            LEFT JOIN users u ON k.bac_si_thuc_hien_id = u.id
            WHERE benh_nhan_id = ?
            ORDER BY ngay_nhap DESC
        `;
        const results = db.prepare(sql).all(benhNhanId);
        
        // Lấy ra xong phải parse từ Chuỗi -> Object JSON lại để Frontend dùng
        return results.map(row => ({
            ...row,
            du_lieu_kham: JSON.parse(row.du_lieu_kham) 
        }));
    },

    // --- HÀM MỚI: Thống kê ---
    // Nhiệm vụ: Chỉ chạy SQL và trả về mảng dữ liệu raw
    thongKeTheoLoaiBenh: (month, year) => {
        const sql = `
            SELECT 
                json_extract(du_lieu_kham, '$.loaiMoHoc') as LoaiBenh, 
                COUNT(*) as SoLuong
            FROM ket_qua_xet_nghiem
            WHERE strftime('%m', ngay_nhap) = ? 
              AND strftime('%Y', ngay_nhap) = ?
            GROUP BY json_extract(du_lieu_kham, '$.loaiMoHoc')
        `;
        
        // Trả về danh sách kết quả luôn
        return db.prepare(sql).all(month, year);
    }
};

export default KetQua;