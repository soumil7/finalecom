// Cart.jsx
import React from 'react';
import './Cart.css'; // Ensure you have your styles if needed

const Cart = ({ cart, setCart, url}) => {
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index); // Remove item by index
    setCart(updatedCart); // Update the cart state
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {/* Add column headers */}
          <div className="cart-header">
            <div className='cart-header-item'>Image</div>
            <div className="cart-header-item">Product</div>
            <div className="cart-header-item">Price</div>
            <div className="cart-header-item">Actions</div>
          </div>
          {cart.map((product, index) => (
            <div className="cart-item" key={index}>
              <img
                src={product.image || 'placeholder.jpg'}
                alt={product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{product.name}</h3>
              </div>
              <div className="cart-item-price">₹{product.price}</div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
