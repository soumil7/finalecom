import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // Fetch the product list from the API
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/item/items`);
      if (response.data.success) {
        setList(response.data.data); // Set the fetched products to the state
      } else {
        toast.error('Error fetching products');
      }
    } catch (error) {
      toast.error('Error while fetching products');
      console.error('Fetch error:', error.message);
    }
  };

  // Remove a product
  const removeItem = async (productId) => {
    try {
      const response = await axios.delete(`${url}/item/items/${productId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // Refresh the list after removing an entry
      } else {
        toast.error('Error removing product');
      }
    } catch (error) {
      toast.error('Error while removing product');
      console.error('Remove error:', error.message);
    }
  };

  useEffect(() => {
    fetchList(); // Fetch the product list when the component mounts
  }, []);

  return (
    <div className='list flex-col'>
      <h2>All Products</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              {/* Display the image */}
              <img 
                src={`${item.image}`} // Adjust this if your image data field is different
                alt={item.name} 
                className='product-image' 
                style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
              />
              <p>{item.name}</p>
              <p>{item.product}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeItem(item._id)} className='cursor'>
                X
              </p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
