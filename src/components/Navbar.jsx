import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Home, Menu, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  ["/", "Home"],
  ["/properties", "Properties"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const cls = ({ isActive }) =>
    `py-5 font-medium border-b-2 ${isActive ? "text-brand border-brand" : "border-transparent hover:text-brand"}`;
  const out = () => {
    logout();
    setOpen(false);
    nav("/");
  };
  const mobile = user
    ? [...links, ["/profile", "My Profile"]]
    : [...links, ["/login", "Login"], ["/signup", "Sign Up"]];

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-brand"
        >
          <Home className="fill-brand" size={28} />
          Kireeye
        </Link>
        <div className="hidden md:flex gap-8 mr-auto ml-12">
          {links.map(([to, l]) => (
            <NavLink key={to} to={to} end={to === "/"} className={cls}>
              {l}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 font-semibold hover:text-brand"
              >
                <span className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center">
                  {user.name[0].toUpperCase()}
                </span>
                {user.name.split(" ")[0]}
              </Link>
              <button
                onClick={out}
                className="px-5 py-2 rounded-md border border-brand text-brand font-semibold hover:bg-brand/5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-md border border-brand text-brand font-semibold hover:bg-brand/5"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-md bg-brand text-white font-semibold hover:bg-brand/90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {user ? <User /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-3 border-t">
          {mobile.map(([to, l]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="pt-3 font-medium"
            >
              {l}
            </NavLink>
          ))}
          {user && (
            <button
              onClick={out}
              className="pt-3 font-medium text-left text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
