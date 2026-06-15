import logo from "../assets/file.jpeg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Vision & Mission", path: "/vision" },
    { label: "Officials", path: "/officials" },
    { label: "Achievements", path: "/achievements" },
    { label: "Administrators", path: "/adminlogin" },
  ];

  return (
    <nav className="fixed top-0 w-full h-fit p-3 flex items-center justify-between bg-[#020617]/70 backdrop-blur-xl border-b border-sky-400/30 z-50">

      {/* LEFT */}
      <div className="flex items-center gap-3 lg:px-10">
        <img src={logo} alt="logo" className="h-[42px]" />
        <span className="text-lg font-bold text-blue-400">
          Coders Club
        </span>
      </div>

      {/* DESKTOP NAV */}
      <ul className="hidden lg:flex text-md absolute lg:right-15 gap-6">
        {navItems.map((item, i) => (
          <li key={i}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `relative text-indigo-200 font-medium transition 
                 ${isActive ? "text-sky-600" : ""}`
              }
            >
              {item.label}

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-sky-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* HAMBURGER */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden absolute right-3 text-2xl text-blue-400 z-[2000]"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* MOBILE MENU */}
      <div
        className={`absolute top-[70px] left-0 w-full flex flex-col items-center gap-6 py-8
        bg-gradient-to-b from-[#020617]/95 to-[#020617]/90 backdrop-blur-2xl border-t border-sky-400/30
        shadow-[0_20px_40px_rgba(0,0,0,0.6)]
        transition-all duration-300
        ${menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"}`}
      >
        {navItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `px-6 py-2 rounded-xl text-lg tracking-wide transition-all
              ${
                isActive
                  ? "text-sky-400 bg-sky-400/20 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  : "text-indigo-200 hover:text-sky-400 hover:bg-sky-400/10 hover:shadow-[0_0_10px_rgba(56,189,248,0.3)]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}