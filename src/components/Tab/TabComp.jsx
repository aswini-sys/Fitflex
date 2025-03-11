import React, { useState, useEffect } from "react";
import { ProductsData } from "../../mockData/data";
import { motion } from "framer-motion";
import v2 from "../../assets/v2.mp4"; // Ensure the video is imported
import { toast, ToastContainer } from 'react-toastify'; // Import toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import './TabComp.css';

const TabComp = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [cart, setCart] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const tabs = ["All", "Yoga", "Fitness", "Muscles"];

  // Fetch cart from localStorage on initial render
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Filter products based on active tab
  const filteredCards =
    activeTab === "All"
      ? ProductsData
      : ProductsData.filter((card) => card.category === activeTab);

  // Determine how many items to display
  const itemsToShow = showAll ? filteredCards : filteredCards.slice(0, 3);

  // Add product to cart
  const addToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);

    if (!isProductInCart) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      toast.success(`${product.title} added to cart!`); // Show success toast
    } else {
      toast.info(`${product.title} is already in your cart.`); // Show info toast if already in cart
    }
  };

  return (
    <>
      <div className="tab-comp-container">
        {/* Background Video */}
        <video autoPlay loop muted playsInline className="background-video">
          <source src={v2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div className="content-container">
          {/* Tabs button section */}
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowAll(false); // Reset to show only 3 items when switching tabs
                }}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Display Total Items in Cart */}
          <div className="cart-info">
            <p>Total Items in Cart: {cart.length}</p>
          </div>

          {/* Tab Cards section */}
          <div className="cards-container">
            {itemsToShow.map((card) => (
              <motion.div
                id={card.id}
                key={card.id}
                initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                whileHover={{ rotateY: 10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="product-card"
              >
                <motion.img
                  src={card.image}
                  alt={card.title}
                  className="product-image"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <p className="product-title">{card.title}</p>
                <p className="product-category">{card.category}</p>
                <p className="product-price">${card.price}</p>
                
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(card)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>

          {/* More Button */}
          {filteredCards.length > 3 && (
            <div className="show-more-container">
              <button
                onClick={() => setShowAll(!showAll)}
                className="show-more-button"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
};

export default TabComp;
