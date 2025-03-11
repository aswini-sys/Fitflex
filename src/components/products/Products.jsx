import React, { useState, useEffect } from 'react';
import { ProductsData } from '../../mockData/data';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Product.css';
import { motion } from 'framer-motion';
import v2 from '../../assets/v2.mp4';
import { BsArrowLeft } from 'react-icons/bs';
import payImage from '../../assets/pay.jpg'; // Import your payment image

const Products = () => {
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentImage, setShowPaymentImage] = useState(false);

  const handleAddToCart = (product) => {
    toast.success(`${product.title} added to cart!`);
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = currentCart.some(item => item.id === product.id);
    if (!isProductInCart) {
      const updatedCart = [...currentCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      toast.info(`${product.title} is already in your cart.`);
    }
  };

  const handleBuyProduct = (product) => {
    setSelectedProduct(product);
    setShowPaymentImage(true);
  };

  const handlePayNow = () => {
    if (!selectedProduct) return;
    
    const amountInRupees = (selectedProduct.price * 83).toFixed(2); // Convert USD to INR; replace 83 with the current conversion rate
    const paymentUrl = `https://pay.google.com/gp/p/js/pay?amount=${amountInRupees}&currency=INR`;

    window.location.href = paymentUrl; // Redirect to Google Pay
  };

  return (
    <div className="products-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src={v2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content */}
      <h1 className="products-heading">Our Products</h1>
      <motion.div
        className="products-grid"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {ProductsData.map(product => (
          <motion.div
            key={product.id}
            className={`product-card ${flippedCardId === product.id ? 'flipped' : ''}`}
            onClick={() => setFlippedCardId(flippedCardId === product.id ? null : product.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
          >
            <div className="product-front">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-info">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
                <button className="product-details-link">See Details</button>

                <button className="buy-products" onClick={(e) => { e.stopPropagation(); handleBuyProduct(product); }}>
                  Buy Now
                </button>
                <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="product-back">
              <div className="flip-back-arrow" onClick={() => setFlippedCardId(product.id)}>
                <BsArrowLeft />
              </div>
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{typeof product.info === 'string' ? product.info : JSON.stringify(product.info)}</p>
              <p className="product-price-back">${product.price}</p>
              <button className="add-to-cart" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Add to Cart</button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Payment Image and Button */}
      {showPaymentImage && (
        <div className="payment-overlay">
          <img src={payImage} alt="Pay" className="payment-image" />
          <p className="payment-amount">Amount: ₹{(selectedProduct.price * 83).toFixed(2)}</p>
          <button className="pay-now-button" onClick={handlePayNow}>
            Pay Now
          </button>
        </div>
      )}

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Products;
