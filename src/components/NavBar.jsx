import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";
import { useState } from "react";

function Navbar() {
  const { user } = useUserContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems =
    user.role === "organizer"
      ? [
          { to: "/", label: "All Events" },
          { to: "/my-events", label: "My Events" },
          { to: "/my-tickets", label: "My Tickets" },
        ]
      : [
          { to: "/", label: "Events" },
          { to: "/my-tickets", label: "My Tickets" },
        ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 shadow-2xl relative overflow-visible z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold z-10 relative">
          <NavLink
            to="/"
            className="hover:text-white/80 transition-all duration-300 ease-in-out hover:scale-105 transform inline-block"
            onClick={closeMobileMenu}
          >
            EventHub
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-lg z-10 relative">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white/80 pb-1 inline-block transform transition-all duration-300 ease-in-out"
                  : "hover:text-white/80 hover:bg-white/10 transition-all duration-300 ease-in-out px-3 py-1 rounded-lg inline-block transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg"
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-white/80 pb-1 inline-block transform transition-all duration-300 ease-in-out"
                : "hover:text-white/80 hover:bg-white/10 transition-all duration-300 ease-in-out px-3 py-1 rounded-lg inline-block transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg"
            }
          >
            Profile
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group transition-all duration-300 ease-in-out z-20 relative"
          aria-label="Toggle mobile menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : "group-hover:w-7"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "opacity-0" : "group-hover:w-5"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : "group-hover:w-7"
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 shadow-2xl transition-all duration-500 ease-in-out transform origin-top z-40 ${
          isMobileMenuOpen
            ? "opacity-100 scale-y-100 translate-y-0 visible"
            : "opacity-0 scale-y-0 -translate-y-4 invisible"
        }`}
      >
        <div className="px-6 py-6 space-y-3">
          {navItems.map((item, index) => (
            <div
              key={item.to}
              className={`transform transition-all duration-500 ease-out ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
              }}
            >
              <NavLink
                to={item.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ease-in-out transform ${
                    isActive
                      ? "bg-white/25 text-white border-l-4 border-white shadow-lg scale-105"
                      : "hover:bg-white/15 hover:text-white hover:translate-x-2 hover:shadow-md active:scale-95"
                  }`
                }
              >
                <span className="flex items-center space-x-2">
                  <span>{item.label}</span>
                </span>
              </NavLink>
            </div>
          ))}
          
          {/* Profile Link */}
          <div
            className={`transform transition-all duration-500 ease-out ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? `${navItems.length * 100}ms` : "0ms",
            }}
          >
            <NavLink
              to="/profile"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 ease-in-out transform ${
                  isActive
                    ? "bg-white/25 text-white border-l-4 border-white shadow-lg scale-105"
                    : "hover:bg-white/15 hover:text-white hover:translate-x-2 hover:shadow-md active:scale-95"
                }`
              }
            >
              <span className="flex items-center space-x-2">
                <span>Profile</span>
              </span>
            </NavLink>
          </div>

          {/* Mobile Menu Footer */}
          <div
            className={`pt-4 mt-4 border-t border-white/20 transition-all duration-500 ease-out ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? `${(navItems.length + 1) * 100}ms` : "0ms",
            }}
          >
            <p className="text-white/70 text-sm text-center">
              {user.role === "organizer" ? "Organizer Dashboard" : "Event Explorer"}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 transition-all duration-500 ease-in-out z-30"
          onClick={closeMobileMenu}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;