import React, { useState, useEffect } from "react";
import './Cart.css';
import { motion } from 'framer-motion';
import v2 from '../../assets/v2.mp4'; // Background video
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success('Product removed from cart!');
  };

  // Ensure prices are treated as numbers and total is calculated correctly
  const totalPrice = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  return (
    <div className="cart-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src={v2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <h1 className="cart-heading">Your Cart</h1>

      {cart.length === 0 ? (
        <motion.p 
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your cart is empty!
        </motion.p>
      ) : (
        <>
          <motion.div
            className="cart-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {cart.map((item, index) => (
              <motion.div
                key={index}
                className="cart-item"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="item-image"
                />
                <p className="item-title">{item.title}</p>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                <button 
                  className="remove-button"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </motion.div>
          <div className="total-price-container">
            <h2 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h2>
          </div>
        </>
      )}
      <ToastContainer className="toast"/>
    </div>
  );
};

export default Cart;
