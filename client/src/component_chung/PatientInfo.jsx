import React, { useState, useEffect } from 'react';
import './PatientInfo.css';

const PatientInfo = ({ onDataChange }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthYear: '',
    gender: 'Nữ', // Cố định
    patientId: '',
    labId: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    // Gửi dữ liệu lên cha
    if (onDataChange) onDataChange(newData);
  };

  return (
    <div className="patient-info-container">
      <div className="form-row">
        <div className="form-group">
          <label>Họ và tên:</label>
          <input type="text" name="fullName" className="form-input w-large" value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Năm sinh:</label>
          <input type="number" name="birthYear" className="form-input w-small" value={formData.birthYear} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Giới tính:</label>
          <select name="gender" className="form-select w-small" value={formData.gender} disabled style={{ backgroundColor: '#f0f0f0' }}>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Mã số bệnh nhân:</label>
          <input type="text" name="patientId" className="form-input w-medium" value={formData.patientId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mã số lam:</label>
          <input type="text" name="labId" className="form-input w-medium" value={formData.labId} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;