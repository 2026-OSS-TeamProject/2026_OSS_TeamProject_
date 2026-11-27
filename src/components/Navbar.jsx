import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { IoClose  } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { ThemeContext } from "../themeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="text-white p-3 shadow-lg top-0 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 w-full fixed z-40 dark:bg-cadetblue dark:bg-none">
        <motion.div
          className="left-0 top-0 w-full h-1 bg-blue-500 fixed z-50"
          style={{ scaleX: scrollYProgress }}
        />
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/home" className="flex items-center">
                <img src={logo} alt="Logo" className="h-12" />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-16 flex gap-4 items-baseline space-x-2">
                <NavItem to="/home" onClick={toggleMenu}>
                  <IconHome /> Home
                </NavItem>
                <NavItem to="/about" onClick={toggleMenu}>
                  <IconAbout /> About
                </NavItem>
                <NavItem to="/news" onClick={toggleMenu}>
                  <IconNews /> News
                </NavItem>
                <NavItem to="/rateus" onClick={toggleMenu}>
                  <IconRateUs /> RateUs
                </NavItem>
                <NavItem to="/contributors" onClick={toggleMenu}>
                  <>
                 <img src="https://cdn-icons-png.freepik.com/256/12210/12210006.png?ga=GA1.2.1168591914.1718009553&semt=ais_hybrid" className="w-5 h-5  mt-5"/><sapn className="mt-5">Contributors</sapn></>
                </NavItem>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded focus:outline-none text-4xl border-none outline-none"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </button>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded focus:outline-none text-2xl border-none outline-none"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </button>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <IoClose className="text-white" />
                ) : (
                  <GiHamburgerMenu className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="md:hidden absolute left-0 w-full flex flex-col items-center justify-center"
            >
              <div className="w-[100%] bg-[#152146] px-[20%] pt-2 pb-3 space-y-1 mt-1 dark:bg-teal-900">
                <MobileNavItem to="/home" onClick={toggleMenu}>
                  Home
                </MobileNavItem>
                <MobileNavItem to="/about" onClick={toggleMenu}>
                  About us
                </MobileNavItem>
                <MobileNavItem to="/news" onClick={toggleMenu}>
                  News
                </MobileNavItem>
                <MobileNavItem to="/contact" onClick={toggleMenu}>
                  Contact
                </MobileNavItem>
                <MobileNavItem to="/rateus" onClick={toggleMenu}>
                  RateUs
                </MobileNavItem>
                <MobileNavItem to="/contributors" onClick={toggleMenu}>
                  Contributors
                </MobileNavItem>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const NavItem = ({ to, children, onClick }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 w-full h-auto relative z-0 rounded-lg transition-all duration-200 hover:scale-125 text-xl hover:bg-opacity-50"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const MobileNavItem = ({ to, children, onClick }) => {
  const className =
    "z-[2] text-gray-300 text-center hover:text-white block px-3 py-2 rounded-md text-xl font-medium";
  return (
    <Link to={to} className={className + " hover:bg-gray-700"} onClick={onClick}>
      {children}
    </Link>
  );
};

const IconHome = () => <span>🏠</span>;
const IconAbout = () => <span>ℹ️</span>;
const IconNews = () => <span>📰</span>;
const IconRateUs = () => <span>⭐</span>;

export default Navbar;
