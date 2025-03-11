import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Equipments from './components/Equipments/Equipments';
import Banner from './components/Banner/Banner';
import Banner2 from './components/Banner/Banner2';
import TabComp from './components/Tab/TabComp';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import Cart from './components/cart/Cart';
import Trainer from './components/trainer/Trainer';
import Products from './components/products/Products';
import Pricing from './components/pricing/Pricing';
import Login from './components/login/Login';
import Register from './components/register/Register'; // ✅ Import Register Component
import BgImage from './assets/bg.png';
import Img1 from './assets/2.png';
import Img2 from './assets/3.png';

// Inline CSS for the ripple loader
const loaderStyles = `
.loading {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
}

.lds-ripple {
  display: inline-block;
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.lds-ripple div {
  position: absolute;
  border: 4px solid orange;
  opacity: 0;
  border-radius: 50%;
  animation: lds-ripple 2s linear infinite;
  animation-direction: reverse;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -1s;
}

@keyframes lds-ripple {
  100% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  95% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  0% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
`;

// Inject styles into the document
const injectStyles = () => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = loaderStyles;
  document.head.appendChild(styleTag);
};

// Call the function to inject styles on load
injectStyles();

// Banner data
const BannerData = {
  image: Img1,
  title: "The Importance of Taking Care of Yourself",
  subtitle:
    "The importance of taking care of yourself cannot be overstated. " +
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. " +
    "Id nam obcaecati sequi odio dolore officia magni reiciendis. " +
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
  link: "#",
};

const Banner2Data = {
  image: Img2,
  title: "Prioritize Your Well-being",
  subtitle:
    "Caring for yourself is essential for a happy life. " +
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. " +
    "Id nam obcaecati sequi odio dolore officia magni reiciendis.",
  link: "#",
};

// Background style for the hero section
const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading delay (replace with actual data fetching if needed)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Check if the user is on login or register page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (loading) {
    return (
      <div className="loading">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {!isAuthPage && <Navbar />}
      {!isAuthPage &&
        location.pathname !== '/trainer' &&
        location.pathname !== '/cart' &&
        location.pathname !== '/products' &&
        location.pathname !== '/pricing' && (
          <div style={bgStyle}>
            <Hero />
          </div>
        )}

      {!isAuthPage &&
        location.pathname !== '/trainer' &&
        location.pathname !== '/cart' &&
        location.pathname !== '/products' &&
        location.pathname !== '/pricing' && (
          <>
            <Equipments />
            <Banner {...BannerData} />
            <TabComp />
            <Testimonials />
            <Banner2 {...Banner2Data} />
          </>
        )}

      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/trainer" element={<Trainer />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Added Register Route */}
      </Routes>

      {!isAuthPage &&
        location.pathname !== '/trainer' &&
        location.pathname !== '/cart' &&
        location.pathname !== '/products' &&
        location.pathname !== '/pricing' && <Footer />}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;
