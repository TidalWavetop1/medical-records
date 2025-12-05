import React, { useState, useEffect } from 'react';
import './patientReport.css'; // File CSS chung cho các mẫu báo cáo

const ReportTemplate1 = ({ onDataChange }) => {
    // State lưu trữ toàn bộ dữ liệu của mẫu báo cáo này
    const [reportData, setReportData] = useState({
        specimenType: [], // Bệnh phẩm (checkbox)
        specimenOther: '',
        tumorPosition: [], // Vị trí u (checkbox)
        tumorSize: '',
        histologyType: '', // Loại mô học
        histologyGrade: '', // Độ mô học
        tumorSpreadBiopsy: '',
        tumorSpreadSurgery: '',
        vascularInvasion: '',
        marginStatusCarcinoma: '',
        marginStatusHSIL: '',

        // Mục 8: Hạch vùng
        lymphNodeSurvey: 'none', // 'none' (Ko áp dụng) hoặc 'survey' (Có khảo sát)
        totalNodes: '',
        nodesNegative: false,
        nodesPositive: false,
        totalPositiveNodes: '',
        singlePositiveNode: '',
        positiveNodeLocation: '',
        nodeDescription: '',
        lymphNodeOther: '',
        lymphNodeUnknown: false,

        distantMetastasis: '', // Di căn xa
        pTNM: '',
        figoStage: '',
        conclusion: '' // Kết luận
    });

    // Hàm xử lý thay đổi input text/radio
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === 'checkbox' ? checked : value;

        // Logic riêng cho checkbox nhóm (Ví dụ: Vị trí u chọn nhiều cái)
        if (name === 'specimenType' || name === 'tumorPosition') {
            const currentList = reportData[name];
            if (checked) {
                newValue = [...currentList, value];
            } else {
                newValue = currentList.filter(item => item !== value);
            }
        }

        const updatedData = { ...reportData, [name]: newValue };
        setReportData(updatedData);

        // Gửi dữ liệu ra ngoài cho Component Cha mỗi khi có thay đổi
        onDataChange(updatedData);
    };

    return (
        <div className="report-template-container">
            <h3 className="section-title">PHIẾU MÔ TẢ ĐẠI THỂ & VI THỂ (Mẫu 1)</h3>

            {/* --- Bệnh phẩm --- */}
            <div className="report-row">
                <label className="bold-label">Bệnh phẩm:</label>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="specimenType" value="AmDao" onChange={handleChange} /> Âm đạo</label>
                    <input type="text" className="inline-input" placeholder="Chi tiết..." name="specimenDetail" onChange={handleChange} />

                    <label><input type="checkbox" name="specimenType" value="CoTuCung" onChange={handleChange} /> Cổ tử cung</label>

                    <label><input type="checkbox" name="specimenType" value="Khac" onChange={handleChange} /> Khác:</label>
                    <input type="text" className="inline-input" name="specimenOther" onChange={handleChange} />
                </div>
            </div>

            <h4 className="section-header">II. Nội dung báo cáo</h4>

            {/* 1. Vị trí u */}
            <div className="report-item">
                <span className="item-number">1.</span>
                <label className="bold-label">Vị trí u:</label>
                <div className="checkbox-group wrap-group">
                    <label><input type="checkbox" name="tumorPosition" value="1/3tren" onChange={handleChange} /> 1/3 trên âm đạo</label>
                    <label><input type="checkbox" name="tumorPosition" value="1/3giua" onChange={handleChange} /> 1/3 giữa âm đạo</label>
                    <label><input type="checkbox" name="tumorPosition" value="1/3duoi" onChange={handleChange} /> 1/3 dưới âm đạo</label>
                    <label><input type="checkbox" name="tumorPosition" value="KhongRo" onChange={handleChange} /> Âm đạo, không rõ vị trí</label>
                </div>
            </div>

            {/* 2. Kích thước u */}
            <div className="report-item">
                <span className="item-number">2.</span>
                <label>Kích thước u:</label>
                <input type="text" className="dotted-input" name="tumorSize" onChange={handleChange} placeholder="... x ... cm" />
            </div>

            {/* 3, 4, 6... Các trường Text đơn giản */}
            {[
                { id: 3, label: 'Loại mô học', name: 'histologyType' },
                { id: 4, label: 'Độ mô học', name: 'histologyGrade' },
            ].map(field => (
                <div className="report-item" key={field.id}>
                    <span className="item-number">{field.id}.</span>
                    <label>{field.label}:</label>
                    <input type="text" className="dotted-input full-width" name={field.name} onChange={handleChange} />
                </div>
            ))}

            {/* 5. Mức độ lan rộng */}
            <div className="report-item">
                <span className="item-number">5.</span>
                <label>Mức độ lan rộng u:</label>
                <div className="sub-item">
                    <span>- Đối với mẫu sinh thiết:</span>
                    <input type="text" className="dotted-input" name="tumorSpreadBiopsy" onChange={handleChange} />
                </div>
                <div className="sub-item">
                    <span>- Đối với mẫu phẫu thuật:</span>
                    <input type="text" className="dotted-input" name="tumorSpreadSurgery" onChange={handleChange} />
                </div>
            </div>

            {/* 6. Xâm nhập mạch */}
            <div className="report-item">
                <span className="item-number">6.</span>
                <label>Xâm nhập mạch máu – mạch bạch huyết:</label>
                <input type="text" className="dotted-input" name="vascularInvasion" onChange={handleChange} />
            </div>

            {/* 7. Rìa diện cắt */}
            <div className="report-item">
                <span className="item-number">7.</span>
                <label>Tình trạng rìa diện cắt:</label>
                <div className="sub-item">
                    <span>- Đối với carcinoma xâm nhập:</span>
                    <input type="text" className="dotted-input" name="marginStatusCarcinoma" onChange={handleChange} />
                </div>
                <div className="sub-item">
                    <span>- Đối với HSIL hoặc AIS:</span>
                    <input type="text" className="dotted-input" name="marginStatusHSIL" onChange={handleChange} />
                </div>
            </div>

            {/* 8. Đánh giá hạch vùng (Phức tạp) */}
            <div className="report-item">
                <span className="item-number">8.</span>
                <label className="bold-label">Đánh giá hạch vùng (nếu có):</label>

                <div className="indent-block">
                    {/* Radio toggle chính */}
                    <div className="radio-line">
                        <input type="radio" name="lymphNodeSurvey" value="none" checked={reportData.lymphNodeSurvey === 'none'} onChange={handleChange} />
                        <label>Không áp dụng (không lấy hoặc không thấy hạch vùng)</label>
                    </div>

                    <div className="radio-line">
                        <input type="radio" name="lymphNodeSurvey" value="survey" checked={reportData.lymphNodeSurvey === 'survey'} onChange={handleChange} />
                        <label>Có khảo sát hạch vùng:</label>
                    </div>

                    {/* Nội dung con - chỉ hiện/enable khi chọn Có khảo sát */}
                    {reportData.lymphNodeSurvey === 'survey' && (
                        <div className="nested-block">
                            <div className="sub-line">
                                <span>- Tổng số hạch vùng khảo sát:</span>
                                <input type="text" className="dotted-input small" name="totalNodes" onChange={handleChange} />
                            </div>

                            <label className="check-line"><input type="checkbox" name="nodesNegative" onChange={handleChange} /> Tất cả hạch vùng không có tế bào ác tính</label>
                            <label className="check-line"><input type="checkbox" name="nodesPositive" onChange={handleChange} /> Hạch vùng có tế bào ác tính</label>

                            <div className="deep-nested">
                                <div className="sub-line">- Tổng số hạch có tế bào u: <input type="text" className="dotted-input small" name="totalPositiveNodes" onChange={handleChange} /></div>
                                <div className="sub-line">- Số hạch có tế bào u đơn lẻ (≤ 0.2 mm): <input type="text" className="dotted-input small" name="singlePositiveNode" onChange={handleChange} /></div>
                                <div className="sub-line">- Vị trí hạch vùng có tế bào u: <input type="text" className="dotted-input" name="positiveNodeLocation" onChange={handleChange} /></div>
                                <div className="sub-line">- Mô tả thêm chi tiết hạch: <input type="text" className="dotted-input" name="nodeDescription" onChange={handleChange} /></div>
                            </div>

                            <div className="sub-line">
                                <input type="checkbox" /> Khác (cụ thể): <input type="text" className="dotted-input" name="lymphNodeOther" onChange={handleChange} />
                            </div>
                            <div className="sub-line">
                                <input type="checkbox" name="lymphNodeUnknown" onChange={handleChange} /> Không thể xác định (giải thích): ...
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 9, 10, 11 */}
            {[
                { id: 9, label: 'Đánh giá di căn xa (nếu có)', name: 'distantMetastasis' },
                { id: 10, label: 'Đánh giá phân loại pTNM (AJCC 8)', name: 'pTNM' },
                { id: 11, label: '+ Đánh giá phân giai đoạn FIGO (2018)', name: 'figoStage' },
            ].map(field => (
                <div className="report-item" key={field.id}>
                    <span className="item-number">{field.id}.</span>
                    <label>{field.label}:</label>
                    <input type="text" className="dotted-input full-width" name={field.name} onChange={handleChange} />
                </div>
            ))}

            <h4 className="section-header">III. Kết luận mô bệnh học</h4>
            <textarea
                className="conclusion-area"
                rows="4"
                placeholder="Nhập kết luận..."
                name="conclusion"
                onChange={handleChange}
            ></textarea>

        </div>
    );
};

export default ReportTemplate1;