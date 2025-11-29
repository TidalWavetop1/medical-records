// File: server/cron/driveBackup.js
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadToDrive = async () => {
    try {
        console.log('☁️ Đang kết nối Google Drive (Gói 2TB)...');

        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
        const FOLDER_ID = process.env.FOLDER_ID;

        // Cấu hình xác thực
        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );
        oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        const drive = google.drive({ version: 'v3', auth: oauth2Client });

        // Đường dẫn file DB
        const dbPath = path.resolve(__dirname, '../medical.db'); 

        // Upload
        // 3. ĐẶT TÊN FILE KÈM TÊN MÁY TÍNH
        const hostname = os.hostname(); // Lấy tên máy tính (Ví dụ: DESKTOP-HUONG, ADMIN-PC...)
        // Xử lý tên máy cho sạch (bỏ ký tự lạ nếu có)
        const cleanHostname = hostname.replace(/[^a-zA-Z0-9-_]/g, '_'); 
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 16);
        
        // Tên file bây giờ sẽ là: [DESKTOP-ABC]_Backup_Medical_2025-11-29_14-30.db
        const fileName = `[${cleanHostname}]_Backup_Medical_${timestamp}.db`;

        const fileMetadata = {
            name: fileName, 
            parents: [process.env.FOLDER_ID],
        };
        const media = {
            mimeType: 'application/vnd.sqlite3',
            body: fs.createReadStream(dbPath),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        console.log('✅ Upload thành công! File ID:', response.data.id);

    } catch (error) {
        console.error('❌ Lỗi Upload:', error.message);
        // Mẹo debug: Nếu lỗi "invalid_grant", nghĩa là Refresh Token sai hoặc đã bị thu hồi -> Làm lại Bước 2
    }
};

export default uploadToDrive;