import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Lấy đường dẫn thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Xác định đường dẫn file .db
const dbPath = path.resolve(__dirname, '../medical.db');

// 3. Mở kết nối
const db = new Database(dbPath, { verbose: console.log });

// 4. Tối ưu hiệu suất cho SQLite
db.pragma('journal_mode = WAL');

console.log(`✅ Đã kết nối đến Database tại: ${dbPath}`);

// 5. Xuất ra để các file khác dùng
export default db;
