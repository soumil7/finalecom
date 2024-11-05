import React, { useState, useEffect } from 'react';
import './Orders.css'; // Optional for styling
import axios from 'axios';
import { toast } from 'react-toastify';

const RegistrationList = ({ url }) => {
  const [registrations, setRegistrations] = useState([]);

  // Fetch the registration list from the API
  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(`${url}/api/registrations/`);
      if (response.data) {
        setRegistrations(response.data);
      } else {
        // toast.error('Error fetching registrations');
      }
    } catch (error) {
      // toast.error('Error fetching registrations');
      console.error(error);
    }
  };

  // Remove a registration
  const removeRegistration = async (registrationId) => {
    try {
      console.log('Removing registration ' + registrationId);
      const response = await axios.delete(`${url}/api/registrations/${registrationId}`);
      if (response.data) {
        // toast.success(response.data.message);
        fetchRegistrations(); // Refresh the list after removing an entry
      } else {
        // toast.error('Error removing registration');
      }
    } catch (error) {
      // toast.error('Error removing registration');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRegistrations(); // Fetch the registration list when the component mounts
  }, []);

  return (
    <div className='registration-list flex-col'>
      <p>All Registrations</p>
      <div className="registration-table">
        <div className="registration-table-format title">
          <b>Name</b>
          <b>Phone Number</b>
          <b>Email</b>
          <b>Event Name</b>
          <b>WhatsApp Number</b>
          <b>Action</b>
        </div>
        {registrations.map((registration, index) => (
          <div key={index} className="registration-table-format">
            <p>{registration.name}</p>
            <p>{registration.phonenumber}</p>
            <p>{registration.email}</p>
            <p>{registration.eventName}</p>
            <p>{registration.whatsappNumber}</p>
            <p onClick={() => removeRegistration(registration._id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationList;
