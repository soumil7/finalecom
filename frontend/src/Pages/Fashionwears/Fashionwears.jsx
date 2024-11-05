import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Fashionwears.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import FilterButton from '../../Components/FilterButton/FilterButton';

const FashionWears = ({
  cart,
  setCart,
  bookmarkedProducts,
  setBookmarkedProducts,
  url,
  recentlyViewed,
  setRecentlyViewed,
}) => {
  const [products, setProducts] = useState([]);

  // Fetch Fashion Wear products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/item/items`);
        console.log('API Response:', response.data);

        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          console.error('Expected an array, but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [url]);

  // Add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Toggle bookmark for a product
  const toggleBookmark = (productId) => {
    if (bookmarkedProducts.includes(productId)) {
      setBookmarkedProducts(bookmarkedProducts.filter((id) => id !== productId));
    } else {
      setBookmarkedProducts([...bookmarkedProducts, productId]);
    }
  };

  // Handle viewing a product
  const handleViewProduct = (product) => {
    if (!recentlyViewed.some((viewed) => viewed._id === product._id)) {
      if (recentlyViewed.length >= 9) {
        setRecentlyViewed((prev) => [...prev.slice(1), product]);
      } else {
        setRecentlyViewed([...recentlyViewed, product]);
      }
    }
  };

  return (
    <div className="fashion-wears-container">
      <FilterButton />
      <h2>Fashion Wears</h2>
      <div className="product-grid">
        {Array.isArray(products) &&
          products
            .filter((product) => product.product === 'Fashion Wears')
            .map((product) => (
              <div
                className="product-card"
                key={product._id}
                onClick={() => handleViewProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₹{product.price}</p>
                <div className="action-buttons">
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering handleViewProduct
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bookmark-button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering handleViewProduct
                      toggleBookmark(product._id);
                    }}
                  >
                    {bookmarkedProducts.includes(product._id) ? (
                      <FaBookmark className="bookmarked-icon" />
                    ) : (
                      <FaRegBookmark className="bookmark-icon" />
                    )}
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* Recently Viewed Section */}
      <div className="recently-viewed-container">
        <h2>Recently Viewed Products</h2>
        <div className="recently-viewed-grid">
          {recentlyViewed.map((viewedProduct) => (
            <div className="recently-viewed-card" key={viewedProduct._id}>
              <img
                src={viewedProduct.image}
                alt={viewedProduct.name}
                className="recently-viewed-image"
              />
              <h3 className="recently-viewed-name">{viewedProduct.name}</h3>
              <p className="recently-viewed-price">₹{viewedProduct.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionWears;
