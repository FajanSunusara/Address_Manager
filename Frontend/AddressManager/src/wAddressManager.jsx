import React, { useState, useEffect } from 'react';

const wAddressManager = () => {
  const [addresses, setAddresses] = useState([]);
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [editingAddressId, setEditingAddressId] = useState(null);

  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(storedAddresses);
  }, []);

  const addAddress = (newAddress) => {
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const updateAddress = (updatedAddress) => {
    const updatedAddresses = addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr));
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    setEditingAddressId(null); // Reset editing state after update
  };

  const deleteAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAddressId !== null) {
      const updatedAddress = { id: editingAddressId, streetAddress, city, state, zipCode };
      updateAddress(updatedAddress);
    } else {
      const newAddress = { id: Date.now(), streetAddress, city, state, zipCode };
      addAddress(newAddress);
    }
    // Reset form fields after submission
    setStreetAddress('');
    setCity('');
    setState('');
    setZipCode('');
  };

  const handleEdit = (address) => {
    setEditingAddressId(address.id);
    setStreetAddress(address.streetAddress);
    setCity(address.city);
    setState(address.state);
    setZipCode(address.zipCode);
  };

  return (
    
    <div className="max-w-md  w-full  mx-auto shadow-md rounded-lg px-4 py-3  border border-white-500">
      <h1 className="text-3xl font-bold mb-4 text-white" >Address Manager</h1>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          placeholder="Street Address"
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Zip Code"
          className="border border-gray-300 rounded-md p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
          {editingAddressId !== null ? 'Update Address' : 'Add Address'}
        </button>
      </form>
      <ul className="mt-4">
        {addresses.map((address) => (
          <li key={address.id} className="border border-gray-300 rounded-md p-2 mb-2 text-white">
            <p>{address.streetAddress},{address.city}, {address.state} {address.zipCode}</p>
            <p></p>
            <button
              onClick={() => handleEdit(address)}
              className="bg-yellow-500 text-white rounded-md px-4 py-1 mt-2 mr-2"
            >
              Edit
            </button>
            <button
            //   onClick={() => deleteAddress(address.id)}
            onClick={() => {
                const confirmation = window.confirm('Are you sure you want to delete this address?');
                if (confirmation) {
                  deleteAddress(address.id);
                }
              }}
              className="bg-red-500 text-white rounded-md px-4 py-1 mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default wAddressManager;
