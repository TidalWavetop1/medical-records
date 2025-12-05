import React, { useState } from 'react';
import './patientReport.css'; // Dùng chung CSS

const PatientReport2 = ({ onDataChange }) => {
    const [reportData, setReportData] = useState({
        specimenType: [], specimenOther: '',
        tumorLocations: [], locationOther: '',
        tumorSize: '', histologyType: '', depthInvasion: '', invasionPattern: '',
        otherOrganInvasion: '', vascularInvasion: '',
        marginInvasive: '', marginHSIL: '', marginPaget: '',
        lymphNodeSurvey: 'none', totalNodesSurvey: '', locationNodesSurvey: '',
        nodesNegative: false, nodesPositive: false,
        nodesGt5mm: '', nodes2to5mm: '', nodes02to2mm: '', nodesItc: '',
        positiveNodeLocation: '', largestNodeSize: '', otherNodeFeatures: '',
        lymphNodeOther: '', lymphNodeUnknown: '',
        distantMetastasis: '', pTNM: '', figoStage: '', conclusion: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let val = type === 'checkbox' && (name === 'tumorLocations' || name === 'specimenType')
            ? (checked ? [...(reportData[name] || []), value] : (reportData[name] || []).filter(i => i !== value))
            : (type === 'checkbox' ? checked : value);

        const updatedData = { ...reportData, [name]: val };
        setReportData(updatedData);
        if (onDataChange) onDataChange(updatedData);
    };

    return (
        <div className="report-template-container">
            <h3 className="section-title">PHIẾU MÔ TẢ GIẢI PHẪU BỆNH (MẪU 2 - ÂM HỘ)</h3>

            {/* BỆNH PHẨM */}
            <div className="report-row">
                <label className="bold-label">Bệnh phẩm:</label>
                <div className="checkbox-group">
                    <label><input type="checkbox" name="specimenType" value="CatAmHo" onChange={handleChange} /> Cắt âm hộ</label>
                    <label><input type="checkbox" name="specimenType" value="Khac" onChange={handleChange} /> Khác (cụ thể): <input type="text" className="dotted-input" name="specimenOther" onChange={handleChange} style={{ width: '150px' }} /></label>
                </div>
            </div>

            <h4 className="section-header">II. NỘI DUNG BÁO CÁO</h4>

            {/* 1. VỊ TRÍ U - Layout đặc biệt */}
            <div className="report-item" style={{ alignItems: 'flex-start' }}>
                <span className="item-number">1.</span>
                <div style={{ flex: 1 }}>
                    <label className="bold-label">Vị trí u:</label>
                    <span style={{ fontStyle: 'italic', fontSize: '14px' }}>(chọn tất cả các lựa chọn liên quan)</span>
                    <div style={{ display: 'flex', gap: '40px', marginTop: '10px', marginLeft: '10px' }}>
                        <div>
                            <label><input type="checkbox" name="tumorLocations" value="AmHoTrai" onChange={handleChange} /> <b>Âm hộ trái:</b></label>
                            <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                                <label><input type="checkbox" name="tumorLocations" value="Trai_MoiLon" onChange={handleChange} /> Môi lớn</label>
                                <label><input type="checkbox" name="tumorLocations" value="Trai_MoiBe" onChange={handleChange} /> Môi bé</label>
                                <label><input type="checkbox" name="tumorLocations" value="Trai_Bartholin" onChange={handleChange} /> Tuyến Bartholin</label>
                            </div>
                        </div>
                        <div>
                            <label><input type="checkbox" name="tumorLocations" value="AmHoPhai" onChange={handleChange} /> <b>Âm hộ phải:</b></label>
                            <div style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                                <label><input type="checkbox" name="tumorLocations" value="Phai_MoiLon" onChange={handleChange} /> Môi lớn</label>
                                <label><input type="checkbox" name="tumorLocations" value="Phai_MoiBe" onChange={handleChange} /> Môi bé</label>
                                <label><input type="checkbox" name="tumorLocations" value="Phai_Bartholin" onChange={handleChange} /> Tuyến Bartholin</label>
                            </div>
                        </div>
                    </div>
                    <div className="checkbox-group" style={{ marginTop: '10px', marginLeft: '10px' }}>
                        <label><input type="checkbox" name="tumorLocations" value="AmVat" onChange={handleChange} /> Âm vật</label>
                        <label><input type="checkbox" name="tumorLocations" value="KhongXacDinh" onChange={handleChange} /> Không xác định</label>
                        <label>Khác: <input type="text" className="dotted-input" name="locationOther" onChange={handleChange} /></label>
                    </div>
                </div>
            </div>

            {/* CÁC TRƯỜNG TEXT */}
            <div className="report-item"><span className="item-number">2.</span> <label>+Kích thước u:</label> <input type="text" className="dotted-input full-width" name="tumorSize" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">3.</span> <label>Loại mô học:</label> <input type="text" className="dotted-input full-width" name="histologyType" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">4.</span> <label>Độ sâu xâm lấn (FIGO 2021):</label> <input type="text" className="dotted-input" name="depthInvasion" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">5.</span> <label>+Kiểu hình xâm lấn:</label> <input type="text" className="dotted-input" name="invasionPattern" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">6.</span> <label>Xâm nhập mô khác:</label> <input type="text" className="dotted-input" name="otherOrganInvasion" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">7.</span> <label>Xâm nhập mạch:</label> <input type="text" className="dotted-input" name="vascularInvasion" onChange={handleChange} /></div>

            {/* 8. RÌA DIỆN CẮT */}
            <div className="report-item" style={{ alignItems: 'flex-start' }}>
                <span className="item-number">8.</span>
                <div style={{ flex: 1 }}>
                    <label className="bold-label">Đánh giá rìa diện cắt (nếu có):</label>
                    <div className="sub-line">- Đối với ung thư xâm lấn: <input type="text" className="dotted-input" name="marginInvasive" onChange={handleChange} /></div>
                    <div className="sub-line">- Đối với tổn thương tiền ung thư (HSIL, dVIN): <input type="text" className="dotted-input" name="marginHSIL" onChange={handleChange} /></div>
                    <div className="sub-line">- Đối với bệnh Paget: <input type="text" className="dotted-input" name="marginPaget" onChange={handleChange} /></div>
                </div>
            </div>

            {/* 9. HẠCH VÙNG */}
            <div className="report-item" style={{ alignItems: 'flex-start' }}>
                <span className="item-number">9.</span>
                <div style={{ flex: 1 }}>
                    <label className="bold-label">Đánh giá hạch vùng (nếu có):</label>
                    <div><label><input type="radio" name="lymphNodeSurvey" value="none" checked={reportData.lymphNodeSurvey === 'none'} onChange={handleChange} /> Không áp dụng</label></div>
                    <div><label><input type="radio" name="lymphNodeSurvey" value="survey" checked={reportData.lymphNodeSurvey === 'survey'} onChange={handleChange} /> Có khảo sát hạch vùng:</label></div>

                    {reportData.lymphNodeSurvey === 'survey' && (
                        <div className="nested-block">
                            <div className="sub-line">- Tổng số hạch khảo sát: <input type="text" className="dotted-input small" name="totalNodesSurvey" onChange={handleChange} /> ; Vị trí: <input type="text" className="dotted-input" name="locationNodesSurvey" onChange={handleChange} /></div>
                            <div><label><input type="checkbox" name="nodesNegative" onChange={handleChange} /> Tất cả hạch vùng KHÔNG có tế bào ác tính</label></div>
                            <div><label><input type="checkbox" name="nodesPositive" onChange={handleChange} /> Hạch vùng CÓ tế bào ác tính</label></div>

                            <div style={{ marginLeft: '20px' }}>
                                <div className="sub-line">- Số hạch di căn &gt; 5 mm: <input type="text" className="dotted-input small" name="nodesGt5mm" onChange={handleChange} /></div>
                                <div className="sub-line">- Số hạch di căn 2-5 mm: <input type="text" className="dotted-input small" name="nodes2to5mm" onChange={handleChange} /></div>
                                <div className="sub-line">- Số hạch vi di căn (0.2-2 mm): <input type="text" className="dotted-input small" name="nodes02to2mm" onChange={handleChange} /></div>
                                <div className="sub-line">- Số hạch di căn đơn lẻ (ITC/&le;0.2mm): <input type="text" className="dotted-input small" name="nodesItc" onChange={handleChange} /></div>
                                <div className="sub-line">- Vị trí hạch có u: <input type="text" className="dotted-input" name="positiveNodeLocation" onChange={handleChange} /></div>
                                <div className="sub-line">- +Kích thước ổ di căn lớn nhất: <input type="text" className="dotted-input" name="largestNodeSize" onChange={handleChange} /></div>
                                <div className="sub-line">- Đặc điểm khác: <input type="text" className="dotted-input" name="otherNodeFeatures" onChange={handleChange} /></div>
                            </div>
                            <div className="sub-line"><input type="checkbox" /> Khác (cụ thể): <input type="text" className="dotted-input" name="lymphNodeOther" onChange={handleChange} /></div>
                            <div className="sub-line"><input type="checkbox" /> Không thể xác định (giải thích): <input type="text" className="dotted-input" name="lymphNodeUnknown" onChange={handleChange} /></div>
                        </div>
                    )}
                </div>
            </div>

            {/* KẾT LUẬN */}
            <div className="report-item"><span className="item-number">10.</span> <label>Di căn xa:</label> <input type="text" className="dotted-input" name="distantMetastasis" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">11.</span> <label>pTNM (AJCC 9):</label> <input type="text" className="dotted-input" name="pTNM" onChange={handleChange} /></div>
            <div className="report-item"><span className="item-number">12.</span> <label>FIGO (2021):</label> <input type="text" className="dotted-input" name="figoStage" onChange={handleChange} /></div>
            <h4 className="section-header">III. KẾT LUẬN MÔ BỆNH HỌC</h4>
            <textarea className="conclusion-area" rows="5" name="conclusion" onChange={handleChange}></textarea>
        </div>
    );
};
export default PatientReport2;