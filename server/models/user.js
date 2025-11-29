import db from '../config/database.js';

const User = {
    // Tìm user để đăng nhập
    findByUsername: (username) => {
        return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    },

    // Tạo bác sĩ mới (nếu cần trang Admin)
    create: (username, passwordHash, fullName) => {
        const sql = 'INSERT INTO users (username, password_hash, full_name) VALUES (?, ?, ?)';
        return db.prepare(sql).run(username, passwordHash, fullName);
    }
};

export default User;