import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = ({url}) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    eventName: '',
    whatsappNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.eventName) newErrors.eventName = 'Event Name is required';
    if (!formData.whatsappNumber) newErrors.whatsappNumber = 'WhatsApp Number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${url}/api/registrations`, formData);
      setSuccessMessage('Registration successful!'); // Handle success message
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
        eventName: '',
        whatsappNumber: ''
      }); // Reset form after submission
    } catch (error) {
      console.error('Error submitting registration:', error);
      setSuccessMessage('Registration failed. Please try again.'); // Handle error message
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
          />
          {errors.eventName && <p className="error-text">{errors.eventName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="whatsappNumber">WhatsApp Number</label>
          <input
            type="text"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
          />
          {errors.whatsappNumber && <p className="error-text">{errors.whatsappNumber}</p>}
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
      {successMessage && <p className="success-text">{successMessage}</p>}
    </div>
  );
};

export default Registration;
