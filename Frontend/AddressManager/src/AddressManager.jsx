import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const AddressManager = () => {
  const [formData, setFormData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleConfirmation = () => {
    // Clear form fields
    setFormData({
      streetAddress: '',
      city: '',
      state: '',
      zipCode: ''
    });

    // Redirect to Home
    window.location.href = "/"; // Or use Link with onClick
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.streetAddress || !formData.city || !formData.state || !formData.zipCode) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Send form data to backend
      const response = await axios.post('/api/todos', formData);
      console.log(response.data);

      // Assuming the response contains some data
      const confirmation = window.confirm(
        "Address added successfully. Do you want to go back to Home?"
      );

      if (confirmation) {
        handleConfirmation();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 border border-white-700 ">
        <h1 className="text-3xl font-bold mb-4 text-white">Address Manager</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Street Address"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Add Address
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default AddressManager;
