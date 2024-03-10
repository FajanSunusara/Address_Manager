import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("/api/todos");
        const address = await res.json();
        setData(address);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const deleteAddress = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        setData(data.filter((address) => address._id !== id));
      } else {
        console.error("Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex justify-center items-center h-screen">
      <div className="w-full max-w-2xl mx-auto border border-white-500 p-5 rounded-lg">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Address Manager
          </h1>
          <Link to="/addressManager">
            <button className="bg-blue-500 text-white rounded-md p-2 mb-3my-2 ">
              Add Address
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((address) => (
            <div
              key={address._id}
              className="relative border border-gray-300 rounded-lg p-4 bg-gray-200 overflow-hidden transition duration-300 transform hover:scale-105"
            >
              <p className="text-lg font-semibold mb-2">{address.streetAddress}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 py-2 px-4 flex justify-end gap-2 items-center transition duration-300 opacity-0 hover:opacity-100">
                <Link to={`/edit/${address._id}`}>
                  <button className="bg-yellow-500 text-white rounded-md px-4 py-1 hover:bg-yellow-600">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    const confirmation = window.confirm(
                      "Are you sure you want to delete this address?"
                    );
                    if (confirmation) {
                      deleteAddress(address._id);
                    }
                  }}
                  className="bg-red-500 text-white rounded-md px-4 py-1 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
