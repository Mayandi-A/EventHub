import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";

function Navbar() {
  const {user} = useUserContext()
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
  
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 shadow-2xl flex justify-between items-center">
      <div className="text-2xl font-bold">
        <NavLink 
          to="/" 
          className="hover:text-white/80 transition-colors duration-300 inline-block"
        >
          EventHub
        </NavLink>
      </div>
      <div className="flex space-x-6 text-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-white/80 pb-1 inline-block"
                : "hover:text-white/80 transition-colors duration-300 px-3 py-1 rounded-lg inline-block"
            }
          >
            {item.label}
          </NavLink>
        ))}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "text-white border-b-2 border-white/80 pb-1 inline-block"
              : "hover:text-white/80 transition-colors duration-300 px-3 py-1 rounded-lg inline-block"
          }
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;