// BookMarks.jsx
import React from 'react';
import './BookMarks.css'; // Create a separate CSS file for bookmark styling

const BookMarks = ({ bookmarkedProducts, products, setBookmarkedProducts, url}) => {
  const removeFromBookmarks = (productId) => {
    const updatedBookmarks = bookmarkedProducts.filter((id) => id !== productId); // Remove bookmark by ID
    setBookmarkedProducts(updatedBookmarks); // Update the bookmark state
  };

  // Filter the products to show only bookmarked items
  const bookmarkedItems = products.filter((product) =>
    bookmarkedProducts.includes(product._id)
  );

  return (
    <div className="bookmark-container">
      <h2>Bookmarked Products</h2>
      {bookmarkedItems.length === 0 ? (
        <p>No products bookmarked.</p>
      ) : (
        <div className="bookmark-items">
          {bookmarkedItems.map((product) => (
            <div className="bookmark-item" key={product._id}>
              <img
                src={product.image || 'placeholder.jpg'}
                alt={product.name}
                className="bookmark-item-image"
              />
              <div className="bookmark-item-details">
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
              </div>
              <button
                className="remove-bookmark"
                onClick={() => removeFromBookmarks(product._id)}
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

export default BookMarks;
