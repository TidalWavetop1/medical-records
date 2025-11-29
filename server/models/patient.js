// File: server/models/BenhNhan.js

// 1. Gọi thằng kết nối database vào (cái file config nãy mày làm á)
import db from '../config/database.js';
import { xoaDau } from '../utils/stringHelper.js'; // Nhớ import hàm xoaDau vào đây nữa để xử lý keyword

// 2. Viết các hàm tương tác với bảng Bệnh Nhân


    // Sửa hàm getAll thành getList có phân trang
    // page: trang hiện tại (1, 2, 3...)
    // limit: số lượng mỗi trang (ví dụ 20 dòng)
    // keyword: từ khóa tìm kiếm (nếu có)
    const BenhNhan = {
        getList: (page = 1, limit = 20, keyword = '') => {
        const offset = (page - 1) * limit;
        
        // Khai báo biến ở ngoài cùng để hứng dữ liệu
        let data = []; 
        let total = 0;

        if (keyword) {
            // ... (Đoạn code FTS5 của mày giữ nguyên) ...
            // Lưu ý: params cho countSql trong trường hợp FTS cũng phải khác
            // Nhưng để đơn giản, tao sửa đoạn logic if/else này cho chặt:
            
            const keywordSearch = xoaDau(keyword); 
            const ftsQuery = `"${keywordSearch}"*`; 

            // Query FTS
            const sql = `
                SELECT b.* FROM benh_nhan b
                JOIN benh_nhan_fts f ON b.id = f.rowid
                WHERE benh_nhan_fts MATCH ?
                ORDER BY rank
                LIMIT ? OFFSET ?
            `;
            data = db.prepare(sql).all(ftsQuery, limit, offset);
            
            // Đếm tổng số kết quả tìm được (Quan trọng để phân trang)
            const countSql = `
                SELECT COUNT(*) as total FROM benh_nhan_fts WHERE benh_nhan_fts MATCH ?
            `;
            total = db.prepare(countSql).get(ftsQuery).total;

        } else {
            // TRƯỜNG HỢP KHÔNG TÌM KIẾM (Lấy tất cả)
            const sql = 'SELECT * FROM benh_nhan ORDER BY id DESC LIMIT ? OFFSET ?';
            data = db.prepare(sql).all(limit, offset);
            
            const countSql = 'SELECT COUNT(*) as total FROM benh_nhan';
            total = db.prepare(countSql).get().total;
        }

        return {
            data,
            pagination: {
                page,
                limit,
                totalRecords: total,
                totalPages: Math.ceil(total / limit)
            }
        };
    },

        // Hàm 2: Tìm bệnh nhân theo Mã (Dùng khi nhập liệu để check cũ mới)
        getByMa: (maBenhNhan) => {
            const sql = 'SELECT * FROM benh_nhan WHERE ma_benh_nhan = ?';
            return db.prepare(sql).get(maBenhNhan); // .get() là chỉ lấy 1 dòng
        },

        // Hàm 3: Thêm mới bệnh nhân
        create: (data) => {
            const sql = `
                INSERT INTO benh_nhan (ma_benh_nhan, ho_ten, nam_sinh, gioi_tinh, ho_ten_search)
                VALUES (?, ?, ?, ?, ?)
            `;
            // Dữ liệu từ form gửi xuống
            const info = db.prepare(sql).run(
                data.maBenhNhan, 
                data.hoTen, 
                data.namSinh, 
                data.gioiTinh || 'Nữ',
                data.hoTenSearch // <--- Dữ liệu mới
            );
            return info; // Trả về kết quả (ví dụ: id vừa tạo)
        }
};

export default BenhNhan;