import React, { useState, useEffect } from 'react';
import './patientReport.css';

const PatientReport1 = ({ onDataChange }) => {
    const [data, setData] = useState({
        specimen: [], tumorPos: [], size: '', histology: '', grade: '', conclusion: ''
        // ... thêm các trường khác nếu cần
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let val = value;
        if (type === 'checkbox') {
            // Logic xử lý mảng checkbox đơn giản
            const list = data[name] || [];
            val = checked ? [...list, value] : list.filter(i => i !== value);
        }
        const newData = { ...data, [name]: val };
        setData(newData);
        if (onDataChange) onDataChange(newData);
    };

    return (
        <div className="report-template-container">
            <h3 className="section-title">MẪU 1: CỔ TỬ CUNG / ÂM ĐẠO</h3>
            {/* Nội dung Mẫu 1 rút gọn để tiết kiệm chỗ, bạn có thể copy nội dung chi tiết từ các câu trả lời trước */}
            <div className="report-row">
                <label className="bold-label">Bệnh phẩm:</label>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="specimen" value="CTC" onChange={handleChange} /> Cổ tử cung</label>
                    <label><input type="checkbox" name="specimen" value="AD" onChange={handleChange} /> Âm đạo</label>
                </div>
            </div>
            <div className="report-item">
                <span className="item-number">1.</span> <label>Vị trí u:</label>
                <input type="text" className="dotted-input" name="tumorPos" onChange={handleChange} />
            </div>
            <div className="report-item">
                <span className="item-number">2.</span> <label>Kích thước u:</label>
                <input type="text" className="dotted-input" name="size" onChange={handleChange} />
            </div>
            {/* ... Các trường còn lại của Mẫu 1 ... */}
            <h4 className="section-header">III. KẾT LUẬN</h4>
            <textarea className="conclusion-area" rows="4" name="conclusion" onChange={handleChange}></textarea>
        </div>
    );
};
export default PatientReport1;