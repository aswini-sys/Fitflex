import React, { useState, useEffect } from "react";
import { NavbarMenu } from "../../mockData/data";
import { FaDumbbell } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { PiShoppingCartThin } from "react-icons/pi";
import ResponsiveMenu from "./ResponsiveMenu";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase"; // ✅ Ensure correct path

// Styled-components for transparency and layout
const NavbarContainer = styled.nav`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavbarContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: #fff;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/home"); // ✅ Redirect to home after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <NavbarContainer>
        <NavbarContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Logo */}
          <div className="text-2xl flex items-center gap-2 font-bold uppercase">
            <FaDumbbell />
            <p>Coders</p>
            <p className="text-secondary">Gym</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className="inline-block py-1 px-3 hover:text-primary font-semibold"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
              <CiSearch />
            </button>
            <Link to="/cart">
              <button className="text-2xl hover:bg-primary hover:text-white rounded-full p-2 duration-200">
                <PiShoppingCartThin />
              </button>
            </Link>

            {/* ✅ Show User Name & Logout Button */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-white font-semibold">
                  {user.displayName || "User"} {/* Shows Name or Default */}
                </span>
                <button
                  className="hover:bg-primary text-white font-semibold rounded-md border-2 border-white px-6 py-2 duration-200 hidden md:block"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* ✅ Register Button */}
                <button className="hover:bg-green-500 text-white font-semibold rounded-md border-2 border-white px-6 py-2 duration-200 hidden md:block">
                  <Link to="/register">Register</Link>
                </button>

                {/* ✅ Login Button */}
                <button className="hover:bg-primary text-white font-semibold rounded-md border-2 border-white px-6 py-2 duration-200 hidden md:block">
                  <Link to="/login">Login</Link>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
            <MdMenu className="text-4xl cursor-pointer" />
          </div>
        </NavbarContent>
      </NavbarContainer>

      {/* Mobile Menu Component */}
      <ResponsiveMenu open={open} />
    </>
  );
};

export default Navbar;
