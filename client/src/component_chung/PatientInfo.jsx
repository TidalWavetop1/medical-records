import React, { useState } from 'react';
import './PatientInfo.css'; // Import file CSS ở trên

const PatientInfo = ({ onDataChange }) => {
  // Khởi tạo state
  const [formData, setFormData] = useState({
    fullName: '',
    birthYear: '',
    gender: 'Nữ', // Mặc định là Nữ
    patientId: '',
    labId: ''
  });

  // Hàm xử lý nhập liệu      
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
  };

  if (onDataChange) {
    onDataChange(newData);
  }

  return (
    <div className="patient-info-container">
      {/* --- DÒNG 1 --- */}
      <div className="form-row">
        {/* 1. Họ và tên */}
        <div className="form-group">
          <label>Họ và tên:</label>
          <input
            type="text"
            name="fullName"
            className="form-input w-large"
            placeholder="Nhập họ tên..."
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        {/* 2. Năm sinh */}
        <div className="form-group">
          <label>Năm sinh:</label>
          <input
            type="number"
            name="birthYear"
            className="form-input w-small"
            placeholder="YYYY"
            value={formData.birthYear}
            onChange={handleChange}
          />
        </div>

        {/* 3. Giới tính (Đã khóa cứng là Nữ) */}
        <div className="form-group">
          <label>Giới tính:</label>
          <select
            name="gender"
            className="form-select w-small"
            value={formData.gender}
            disabled={true} // Khóa không cho sửa
            style={{
              backgroundColor: '#f0f0f0',
              cursor: 'not-allowed',
              color: '#555'
            }}
          >
            <option value="Nữ">Nữ</option>
          </select>
        </div>
      </div>

      {/* --- DÒNG 2 --- */}
      <div className="form-row">
        {/* 4. Mã số bệnh nhân */}
        <div className="form-group">
          <label>Mã số bệnh nhân:</label>
          <input
            type="text"
            name="patientId"
            className="form-input w-medium"
            placeholder="Mã BN..."
            value={formData.patientId}
            onChange={handleChange}
          />
        </div>

        {/* 5. Mã số lam */}
        <div className="form-group">
          <label>Mã số lam:</label>
          <input
            type="text"
            name="labId"
            className="form-input w-medium"
            placeholder="Mã lam..."
            value={formData.labId}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;