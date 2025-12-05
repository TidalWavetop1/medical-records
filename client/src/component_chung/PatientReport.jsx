import React, { useState } from 'react';
import PatientInfo from './componet_chung/PatientInfo';
import patientReport1 from './componet_riêng/patientReport1';
import patientReport2 from './componet_riêng/patientReport2';

const CreateReportPage = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(1); // Mặc định chọn mẫu 1
    const [fullReport, setFullReport] = useState({
        patientInfo: {},
        clinicalData: {}
    });

    // Reset clinicalData khi đổi mẫu báo cáo để tránh trộn lẫn dữ liệu
    const handleTemplateChange = (e) => {
        setSelectedTemplate(Number(e.target.value));
        setFullReport(prev => ({ ...prev, clinicalData: {} }));
    };

    const handlePatientInfoChange = (data) => setFullReport(prev => ({ ...prev, patientInfo: data }));
    const handleReportDataChange = (data) => setFullReport(prev => ({ ...prev, clinicalData: data }));

    const handleSubmit = () => {
        // Thêm trường templateId để backend biết đây là mẫu nào
        const finalData = { ...fullReport, templateId: selectedTemplate };
        console.log("SENDING TO SERVER:", finalData);
        alert(`Đã lưu báo cáo Mẫu số ${selectedTemplate}`);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1>TẠO BÁO CÁO GIẢI PHẪU BỆNH</h1>

            <PatientInfo onDataChange={handlePatientInfoChange} />

            <div style={{ margin: '20px 0', padding: '15px', background: '#e9ecef', borderRadius: '5px' }}>
                <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Chọn loại mẫu báo cáo:</label>
                <select
                    value={selectedTemplate}
                    onChange={handleTemplateChange}
                    style={{ padding: '8px', fontSize: '16px' }}
                >
                    <option value={1}>Mẫu 1: Cổ tử cung / Âm đạo</option>
                    <option value={2}>Mẫu 2: Ung thư Âm hộ (FIGO 2021)</option>
                    {/* Sau này thêm Mẫu 3, 4, 5 vào đây */}
                </select>
            </div>

            {/* Render có điều kiện */}
            <div style={{ border: '1px solid #ccc' }}>
                {selectedTemplate === 1 && <ReportTemplate1 onDataChange={handleReportDataChange} />}
                {selectedTemplate === 2 && <ReportTemplate2 onDataChange={handleReportDataChange} />}
            </div>

            <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px', background: 'blue', color: 'white' }}>
                LƯU BÁO CÁO
            </button>
        </div>
    );
};

export default CreateReportPage;