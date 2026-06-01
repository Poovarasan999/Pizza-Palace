import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2.5 text-sm font-medium transition-all md:px-4 md:py-2 ${
      isActive ? 'font-semibold text-primary' : 'text-neutral-dark hover:text-primary'
    }`;

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/menu', label: 'Menu' },
    ...(user ? [{ to: '/orders', label: 'Orders' }] : []),
    ...(isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
  ];

  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md ring-1 ring-gray-100 transition-transform group-hover:rotate-6 group-hover:scale-110">
            <Logo size={32} />
          </span>
          <div className="leading-tight">
            <span className="block text-lg font-bold gradient-text">Pizza Palace</span>
            <span className="hidden text-[10px] font-medium uppercase tracking-widest text-gray-400 sm:block">
              Fresh · Hot · Delivered
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all hover:bg-primary hover:text-white"
            aria-label={`Cart with ${count} items`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                Hi, {user.name.split(' ')[0]}
              </span>
              <button
                onClick={logout}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex">
              Login
            </Link>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          {!user && (
            <Link to="/auth" className="btn-primary mt-2 block text-center" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
          {user && (
            <button onClick={() => { logout(); setOpen(false); }} className="mt-2 w-full rounded-xl border py-2 text-sm">
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
