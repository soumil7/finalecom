import React, { useState, useEffect } from 'react';
import Header from './Pages/Header/Header';
import { Route, Routes } from 'react-router-dom';
import MobileSidebar from './Components/MobileSidebar/MobileSidebar';
import Kitchen from './Pages/Kitchen/Kitchen';
import PoojaProducts from './Pages/PoojaProducts/PoojaProducts';
import HomeDecorations from './Pages/HomeDecorations/HomeDecorations';
import Fashionwears from './Pages/Fashionwears/Fashionwears';
import Footer from './Components/Footer/Footer';
import Cart from './Pages/Cart/Cart';
import Profile from './Pages/Profile/Profile';
import BookMarks from './Pages/BookMarks/BookMarks';
import axios from 'axios';
import './App.css';
//import Login from './Pages/Login/Login'; // Import the Login component
import Registration from './Pages/Registration/Registration';
import LoginPopup from './Components/LoginPopup/LoginPopup';

const App = () => {
  const url = "http://localhost:4000";

  // New state to track if user is logged in
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [cart, setCart] = useState([]); // Shared cart state
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]); // Shared bookmark state
  const [products, setProducts] = useState([]); // State to hold the products
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  

  // Fetch products using Axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/item/items`);
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data); // Set the products state with the fetched data
        } else {
          console.error('Expected an array, but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]); // Add product to the cart
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product._id !== id)); // Remove product from the cart
  };

  const addToBookmarks = (productId) => {
    // Add product to bookmarks if not already added
    if (!bookmarkedProducts.includes(productId)) {
      setBookmarkedProducts([...bookmarkedProducts, productId]);
    }
  };

  const removeFromBookmarks = (productId) => {
    // Remove product from bookmarks
    setBookmarkedProducts(bookmarkedProducts.filter((id) => id !== productId));
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed((prevViewed) => {
      // Create a new array without the clicked product if it already exists
      const newViewed = prevViewed.filter((item) => item._id !== product._id);
      
      // If the array exceeds 15 items, remove the first one
      if (newViewed.length >= 15) {
        newViewed.shift(); // Remove the oldest viewed product
      }
      console.log(product);

      // Add the newly viewed product to the end of the array
      return [...newViewed, product];
    });
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false); // Close the sidebar when a category is selected
  };

  // Function to handle successful login
  // const handleLogin = () => {
  //   setIsLoggedIn(true); // Set isLoggedIn to true on successful login
  // };

  // // Function to handle logout (optional)
  // const handleLogout = () => {
  //   setIsLoggedIn(false); // Set isLoggedIn to false on logout
  // };

  // // Render the Login component if the user is not logged in
  // if (!isLoggedIn) {
  //   return <Login onLogin={handleLogin} />;
  // }


  // Render the main app if the user is logged in
  return (
    <div>
      <Header onMenuClick={handleSidebarToggle} onCategorySelect={handleCategorySelect} />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <Kitchen
                products={products}
                cart={cart}
                setCart={setCart}
                bookmarkedProducts={bookmarkedProducts}
                setBookmarkedProducts={setBookmarkedProducts}
                url={url}
                recentlyViewed={recentlyViewed}
                setRecentlyViewed={setRecentlyViewed}
              />
            }
          />
          <Route
            path="/pooja"
            element={
              <PoojaProducts
                products={products}
                cart={cart}
                setCart={setCart}
                bookmarkedProducts={bookmarkedProducts}
                setBookmarkedProducts={setBookmarkedProducts}
                url={url}
                recentlyViewed={recentlyViewed}
                setRecentlyViewed={setRecentlyViewed}
              />
            }
          />
          <Route
            path="/home"
            element={
              <HomeDecorations
                products={products}
                cart={cart}
                setCart={setCart}
                bookmarkedProducts={bookmarkedProducts}
                setBookmarkedProducts={setBookmarkedProducts}
                url={url}
                recentlyViewed={recentlyViewed}
                setRecentlyViewed={setRecentlyViewed}
              />
            }
          />
          <Route
            path="/fashion"
            element={
              <Fashionwears
                products={products}
                cart={cart}
                setCart={setCart}
                bookmarkedProducts={bookmarkedProducts}
                setBookmarkedProducts={setBookmarkedProducts}
                recentlyViewed={recentlyViewed}
                setRecentlyViewed={setRecentlyViewed}
                url={url}
              />
            }
          />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} url={url} />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/bookmark"
            element={
              <BookMarks
                bookmarkedProducts={bookmarkedProducts}
                products={products}
                setBookmarkedProducts={setBookmarkedProducts}
                url={url}
              />
            }
          />
          <Route path = "/register" element={<Registration url = {url}/>}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
