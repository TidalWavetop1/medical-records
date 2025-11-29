// File: server/controllers/authController.js
import UserModel from '../models/user.js';
import bcrypt from 'bcryptjs'; // Cần cài: npm install bcryptjs
import jwt from 'jsonwebtoken'; // Cần cài: npm install jsonwebtoken

// Thay dòng const SECRET_KEY = '...' bằng dòng này:
const SECRET_KEY = process.env.SECRET_KEY;

const AuthController = {
    // API: POST /api/auth/register
    register: (req, res) => {
        try {
            const { username, password, fullName } = req.body;

            // 1. Kiểm tra username tồn tại chưa
            const existingUser = UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' });
            }

            // 2. Mã hóa mật khẩu
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);

            // 3. Tạo user mới
            UserModel.create(username, passwordHash, fullName);

            res.status(201).json({ message: 'Đăng ký thành công!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // API: POST /api/auth/login
    login: (req, res) => {
        try {
            const { username, password } = req.body;

            // 1. Tìm user
            const user = UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
            }

            // 2. So sánh mật khẩu (Hash)
            const isMatch = bcrypt.compareSync(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
            }

            // 3. Tạo Token (để frontend lưu giữ trạng thái đăng nhập)
            const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

            res.json({
                message: 'Đăng nhập thành công',
                token,
                user: { id: user.id, fullName: user.full_name, role: user.role }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default AuthController;