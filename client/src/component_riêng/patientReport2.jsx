import React, { useState, useEffect } from 'react';
import './ReportTemplate.css'; // Vẫn dùng chung file CSS cũ

const ReportTemplate2 = ({ onDataChange }) => {
    // State lưu trữ dữ liệu cho Mẫu 2
    const [reportData, setReportData] = useState({
        specimenType: [], // Cắt âm hộ, Khác...
        specimenOther: '',

        // 1. Vị trí u (Dạng mảng chứa các value được check)
        tumorLocations: [],
        locationOther: '',

        // Các chỉ số đo đạc
        tumorSize: '',
        histologyType: '',
        depthInvasion: '', // Độ sâu xâm lấn (FIGO 2021)
        invasionPattern: '', // Kiểu hình xâm lấn
        otherOrganInvasion: '',
        vascularInvasion: '',

        // 8. Rìa diện cắt
        marginInvasive: '',
        marginHSIL: '',
        marginPaget: '',

        // 9. Hạch vùng (Chi tiết hơn mẫu 1)
        lymphNodeSurvey: 'none',
        totalNodesSurvey: '',
        locationNodesSurvey: '',
        nodesNegative: false,
        nodesPositive: false,

        // Chi tiết hạch dương tính
        nodesGt5mm: '',      // > 5mm
        nodes2to5mm: '',     // 2-5mm
        nodes02to2mm: '',    // 0.2 - 2mm
        nodesItc: '',        // < 0.2mm (ITC)
        positiveNodeLocation: '',
        largestNodeSize: '',
        otherNodeFeatures: '',

        lymphNodeOther: '',
        lymphNodeUnknown: '',

        distantMetastasis: '',
        pTNM: '', // AJCC phiên bản 9
        figoStage: '', // FIGO 2021
        conclusion: ''
    });

    // Hàm xử lý chung (giống Mẫu 1)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === 'checkbox' ? checked : value;

        // Xử lý riêng cho checkbox nhóm (Vị trí u, Bệnh phẩm)
        if (name === 'tumorLocations' || name === 'specimenType') {
            const currentList = reportData[name] || [];
            if (checked) {
                newValue = [...currentList, value];
            } else {
                newValue = currentList.filter(item => item !== value);
            }
        }

        const updatedData = { ...reportData, [name]: newValue };
        setReportData(updatedData);

        // Gửi dữ liệu lên Component Cha
        if (onDataChange) onDataChange(updatedData);
    };

    return (
        <div className="report-template-container">
            <h3 className="section-title">PHIẾU MÔ TẢ GIẢI PHẪU BỆNH (MẪU 2 - ÂM HỘ)</h3>

            {/* --- Bệnh phẩm --- */}
            <div className="report-row">
                <label className="bold-label">Bệnh phẩm:</label>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="specimenType" value="CatAmHo" onChange={handleChange} /> Cắt âm hộ</label>
                    <label>
                        <input type="checkbox" name="specimenType" value="Khac" onChange={handleChange} /> Khác (cụ thể):
                    </label>
                    <input type="text" className="dotted-input" name="specimenOther" onChange={handleChange} style={{ width: '200px' }} />
                </div>
            </div>

            <h4 className="section-header">II. Nội dung báo cáo</h4>

            {/* 1. Vị trí u (Layout chia cột đặc biệt) */}
            <div className="report-item" style={{ alignItems: 'flex-start' }}>
                <span className="item-number">1.</span>
                <div style={{ flex: 1 }}>
                    <label className="bold-label">Vị trí u:</label>
                    <span style={{ fontStyle: 'italic', fontSize: '14px' }}>(chọn tất cả các lựa chọn có liên quan)</span>

                    <div style={{ display: 'flex', gap: '40px', marginTop: '10px', marginLeft: '10px' }}>
                        {/* Cột Trái */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label><input type="checkbox" name="tumorLocations" value="AmHoTrai" onChange={handleChange} /> <b>Âm hộ trái:</b></label>
                            <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                                <label><input type="checkbox" name="tumorLocations" value="Trai_MoiLon" onChange={handleChange} /> Môi lớn</label>
                                <label><input type="checkbox" name="tumorLocations" value="Trai_MoiBe" onChange={handleChange} /> Môi bé</label>
                                <label><input type="checkbox" name="tumorLocations" value="Trai_Bartholin" onChange={handleChange} /> Tuyến Bartholin</label>
                            </div>
                        </div>

                        {/* Cột Phải */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label><input type="checkbox" name="tumorLocations" value="AmHoPhai" onChange={handleChange} /> <b>Âm hộ phải:</b></label>
                            <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                                <label><input type="checkbox" name="tumorLocations" value="Phai_MoiLon" onChange={handleChange} /> Môi lớn</label>
                                <label><input type="checkbox" name="tumorLocations" value="Phai_MoiBe" onChange={handleChange} /> Môi bé</label>
                                <label><input type="checkbox" name="tumorLocations" value="Phai_Bartholin" onChange={handleChange} /> Tuyến Bartholin</label>
                            </div>
                        </div>
                    </div>

                    {/* Dòng dưới */}
                    <div className="checkbox-group" style={{ marginTop: '10px', marginLeft: '10px' }}>
                        <label><input type="checkbox" name="tumorLocations" value="AmVat" onChange={handleChange} /> Âm vật</label>
                        <label><input type="checkbox" name="tumorLocations" value="KhongXacDinh" onChange={handleChange} /> Không xác định</label>
                        <label>
                            <input type="checkbox" name="tumorLocations" value="Khac" onChange={handleChange} /> Khác (cụ thể):
                            <input type="text" className="dotted-input" name="locationOther" onChange={handleChange} style={{ width: '150px' }} />
                        </label>
                    </div>
                </div>
            </div>

            {/* 2 -> 7: Các trường Text cơ bản */}
            <div className="report-item"><span className="item-number">2.</span> <label>+Kích thước u:</label> <input type="text" className="dotted-input full-width" name="tumorSize" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">3.</span> <label>Loại mô học:</label> <input type="text" className="dotted-input full-width" name="histologyType" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">4.</span> <label>Độ sâu xâm lấn (theo FIGO 2021):</label> <input type="text" className="dotted-input" name="depthInvasion" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">5.</span> <label>+Kiểu hình xâm lấn:</label> <input type="text" className="dotted-input" name="invasionPattern" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">6.</span> <label>Xâm nhập mô/cơ quan khác (nếu có):</label> <input type="text" className="dotted-input" name="otherOrganInvasion" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">7.</span> <label>Xâm nhập mạch máu – mạch bạch huyết:</label> <input type="text" className="dotted-input" name="vascularInvasion" onChange={handleChange} /></div>

            {/* 8. Rìa diện cắt */}
            <div className="report-item" style={{ alignItems: 'flex-start' }}>
                <span className="item-number">8.</span>
                <div style={{ flex: 1 }}>
                    <label className="bold-label">Đánh giá rìa diện cắt (nếu có):</label>
                    <div className="sub-line">- Tình trạng rìa diện cắt đối với ung thư xâm lấn: <input type="text" className="dotted-input" name="marginInvasive" onChange={handleChange} /></div>
                    <div className="sub-line">- Tình trạng rìa diện cắt đối với các tổn thương tiền ung thư tế bào gai (gồm cả HSIL, dVIN): <input type="text" className="dotted-input" name="marginHSIL" onChange={handleChange} /></div>
                    <div className="sub-line">- Tình trạng rìa diện cắt đối với bệnh Paget: <input type="text" className="dotted-input" name="marginPaget" onChange={handleChange} /></div>
                </div>
            </div>

            {/* 9. Hạch vùng (Rất chi tiết) */}
            <div className="report-item" style={{ alignItems: 'flex-start' }}>
                <span className="item-number">9.</span>
                <div style={{ flex: 1 }}>
                    <label className="bold-label">Đánh giá hạch vùng (nếu có):</label>

                    <div className="radio-line">
                        <input type="radio" name="lymphNodeSurvey" value="none" checked={reportData.lymphNodeSurvey === 'none'} onChange={handleChange} />
                        <label>Không áp dụng (không lấy hoặc không thấy hạch vùng)</label>
                    </div>

                    <div className="radio-line">
                        <input type="radio" name="lymphNodeSurvey" value="survey" checked={reportData.lymphNodeSurvey === 'survey'} onChange={handleChange} />
                        <label>Có khảo sát hạch vùng:</label>
                    </div>

                    {/* Block chi tiết hạch */}
                    {reportData.lymphNodeSurvey === 'survey' && (
                        <div className="nested-block">
                            <div className="sub-line">- Tổng số hạch khảo sát: <input type="text" className="dotted-input small" name="totalNodesSurvey" onChange={handleChange} /></div>
                            <div className="sub-line">- Vị trí hạch khảo sát: <input type="text" className="dotted-input" name="locationNodesSurvey" onChange={handleChange} /></div>

                            <label className="check-line"><input type="checkbox" name="nodesNegative" onChange={handleChange} /> Tất cả hạch vùng không có tế bào ác tính</label>
                            <label className="check-line"><input type="checkbox" name="nodesPositive" onChange={handleChange} /> Hạch vùng có tế bào ác tính</label>

                            {/* Block chi tiết kích thước di căn */}
                            <div className="deep-nested">
                                <div className="sub-line">- Số hạch vùng có ổ di căn lớn hơn 5 mm: <input type="text" className="dotted-input small" name="nodesGt5mm" onChange={handleChange} /></div>
                                <div className="sub-line">- Số hạch vùng có ổ di căn từ trên 2 mm đến 5 mm: <input type="text" className="dotted-input small" name="nodes2to5mm" onChange={handleChange} /></div>
                                <div className="sub-line">- Số hạch vùng có ổ vi di căn (từ trên 0,2 mm đến 2 mm): <input type="text" className="dotted-input small" name="nodes02to2mm" onChange={handleChange} /></div>
                                <div className="sub-line">- Số hạch vùng có tế bào u di căn đơn lẻ (không quá 0,2 mm...): <input type="text" className="dotted-input small" name="nodesItc" onChange={handleChange} /></div>
                                <div className="sub-line">- Vị trí hạch có tế bào u: <input type="text" className="dotted-input" name="positiveNodeLocation" onChange={handleChange} /></div>
                                <div className="sub-line">- +Kích thước ổ di căn hạch lớn nhất: <input type="text" className="dotted-input" name="largestNodeSize" onChange={handleChange} /></div>
                                <div className="sub-line">- Các đặc điểm khác: <input type="text" className="dotted-input" name="otherNodeFeatures" onChange={handleChange} /></div>
                            </div>

                            <div className="sub-line">
                                <input type="checkbox" /> Khác (cụ thể): <input type="text" className="dotted-input" name="lymphNodeOther" onChange={handleChange} />
                            </div>
                            <div className="sub-line">
                                <input type="checkbox" /> Không thể xác định (giải thích): <input type="text" className="dotted-input" name="lymphNodeUnknown" onChange={handleChange} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 10, 11, 12 */}
            <div className="report-item"><span className="item-number">10.</span> <label>Đánh giá di căn xa (nếu có):</label> <input type="text" className="dotted-input" name="distantMetastasis" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">11.</span> <label>Đánh giá phân loại pTNM (theo AJCC, phiên bản 9):</label> <input type="text" className="dotted-input" name="pTNM" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">12.</span> <label>+Đánh giá phân giai đoạn FIGO (2021):</label> <input type="text" className="dotted-input" name="figoStage" onChange={handleChange} /></div>

            <h4 className="section-header">III. Kết luận mô bệnh học</h4>
            <textarea
                className="conclusion-area"
                rows="5"
                name="conclusion"
                placeholder="Ghi kết luận..."
                onChange={handleChange}
            ></textarea>
        </div>
    );
};

export default ReportTemplate2;