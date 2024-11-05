import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Kitchen.css";
import { FaRegBookmark, FaBookmark } from "react-icons/fa"; // Font Awesome icons for bookmark
import FilterButton from "../../Components/FilterButton/FilterButton";

const Kitchen = ({
  cart,
  setCart,
  bookmarkedProducts,
  setBookmarkedProducts,
  url,
  recentlyViewed,
  setRecentlyViewed,
}) => {
  const [products, setProducts] = useState([]);

  // Fetch products using Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/item/items`);
        console.log("API Response:", response.data); // Log the entire response data

        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data); // Set the products state with the fetched data
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [url]);

  const addToCart = (product) => {
    setCart([...cart, product]); // Add the selected product to the cart
    alert(`${product.name} added to cart!`);
  };

  const handleBookmarkToggle = (productId) => {
    if (bookmarkedProducts.includes(productId)) {
      setBookmarkedProducts(
        bookmarkedProducts.filter((id) => id !== productId)
      ); // Remove bookmark
    } else {
      setBookmarkedProducts([...bookmarkedProducts, productId]); // Add bookmark
    }
  };

  const handleViewProduct = (product) => {
    // Check if the product is already in the recently viewed
    if (!recentlyViewed.some((viewed) => viewed._id === product._id)) {
      // Limit the number of recently viewed products to 5
      if (recentlyViewed.length >= 9) {
        setRecentlyViewed((prev) => [...prev.slice(1), product]); // Remove the oldest viewed product
      } else {
        setRecentlyViewed([...recentlyViewed, product]); // Add the product to recently viewed
      }
    }
  };

  return (
    <div className="kitchen-container">
      <FilterButton />
      <h2>Kitchen Appliances</h2>
      <div className="product-grid">
        {Array.isArray(products) &&
          products
            .filter((product) => product.product === "Kitchen Products") // Ensure this category exists in your data
            .map((product) => (
              <div
                className="product-card"
                key={product._id}
                onClick={() => handleViewProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image" // Add this line to track the product
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₹{product.price}</p>
                <div className="action-buttons">
                  <button
                    className="add-to-cart"
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="bookmark-button"
                    onClick={() => handleBookmarkToggle(product._id)}
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

export default Kitchen;
