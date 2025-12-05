import React, { useState } from 'react';

// Import component chung
import PatientInfo from './PatientInfo';

// Import các component riêng (Lưu ý đường dẫn lùi về ../component_riêng)
import PatientReport1 from '../component_riêng/patientReport1'; // Mẫu Cổ tử cung
import PatientReport2 from '../component_riêng/patientReport2'; // Mẫu Âm hộ

const PatientReport = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(1);
    const [fullData, setFullData] = useState({
        patientInfo: {},
        clinicalData: {},
        templateId: 1
    });

    // Nhận data từ PatientInfo
    const handlePatientInfoChange = (data) => {
        setFullData(prev => ({ ...prev, patientInfo: data }));
    };

    // Nhận data từ các mẫu báo cáo (Report1, Report2...)
    const handleClinicalDataChange = (data) => {
        setFullData(prev => ({ ...prev, clinicalData: data }));
    };

    // Xử lý đổi mẫu
    const handleTemplateSwitch = (e) => {
        const newId = Number(e.target.value);
        setSelectedTemplate(newId);
        // Reset data lâm sàng cũ khi đổi mẫu
        setFullData(prev => ({ ...prev, templateId: newId, clinicalData: {} }));
    };

    const handleSave = () => {
        console.log(">>> DỮ LIỆU CUỐI CÙNG GỬI API:", fullData);
        alert("Đã lưu dữ liệu! (Xem F12 Console)");
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', background: '#f8f9fa' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50', textTransform: 'uppercase' }}>Hồ sơ Bệnh Án Giải Phẫu Bệnh</h2>

            {/* 1. THÔNG TIN BỆNH NHÂN */}
            <PatientInfo onDataChange={handlePatientInfoChange} />

            {/* 2. CHỌN MẪU BÁO CÁO */}
            <div style={{ padding: '15px', background: '#e9ecef', borderRadius: '5px', marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Chọn loại báo cáo:</label>
                <select value={selectedTemplate} onChange={handleTemplateSwitch} style={{ padding: '5px', fontSize: '15px' }}>
                    <option value={1}>Mẫu 1: Cổ tử cung / Âm đạo</option>
                    <option value={2}>Mẫu 2: Ung thư Âm hộ (FIGO 2021)</option>
                    <option value={3}>Mẫu 3: Buồng trứng (Đang cập nhật)</option>
                </select>
            </div>

            {/* 3. HIỂN THỊ MẪU TƯƠNG ỨNG */}
            <div style={{ border: '1px solid #ccc', background: '#fff' }}>
                {selectedTemplate === 1 && <PatientReport1 onDataChange={handleClinicalDataChange} />}
                {selectedTemplate === 2 && <PatientReport2 onDataChange={handleClinicalDataChange} />}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button onClick={handleSave} style={{ padding: '12px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    LƯU HỒ SƠ
                </button>
            </div>
        </div>
    );
};

export default PatientReport;