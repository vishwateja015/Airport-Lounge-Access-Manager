import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useBookings } from '../contexts/BookingContext';
import { Moon, Sun, User, LogOut, Shield, Bell, Menu, X, Plane } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { bookings } = useBookings();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const upcomingCount = bookings.filter((b) => b.status === 'confirmed' && b.date >= today).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)}
      className={`relative text-sm font-medium transition-colors ${
        isActive(to)
          ? 'text-indigo-600 dark:text-indigo-400'
          : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
      }`}
    >
      {label}
      {isActive(to) && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full" />
      )}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-indigo-900/40">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              LoungePass
            </span>
          </Link>

          {/* Desktop nav */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-7">
              {navLink('/dashboard', 'Dashboard')}
              {navLink('/lounges', 'Lounges')}
              <Link
                to="/bookings"
                onClick={() => setMobileOpen(false)}
                className={`relative text-sm font-medium transition-colors ${
                  isActive('/bookings')
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                My Bookings
                {upcomingCount > 0 && (
                  <span className="absolute -top-2 -right-4 w-4 h-4 bg-indigo-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    {upcomingCount}
                  </span>
                )}
                {isActive('/bookings') && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full" />
                )}
              </Link>
              {navLink('/memberships', 'Memberships')}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notification bell */}
                <button className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                  <Bell className="w-4.5 h-4.5" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                </button>

                {/* User menu */}
                <div className="relative group">
                  <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                    <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#111827] rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                      <span className="inline-flex items-center mt-1 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs rounded-full font-medium capitalize">
                        {user?.membershipTier} · {user?.role}
                      </span>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition">
                        <Shield className="w-4 h-4" />
                        Admin Portal
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/admin-login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 dark:border-slate-700 space-y-1">
            {isAuthenticated ? (
              <>
                {[
                  { to: '/dashboard', label: 'Dashboard' },
                  { to: '/lounges', label: 'Lounges' },
                  { to: '/bookings', label: `My Bookings${upcomingCount > 0 ? ` (${upcomingCount})` : ''}` },
                  { to: '/memberships', label: 'Memberships' },
                  ...(isAdmin ? [{ to: '/admin', label: '🛡️ Admin Portal' }] : []),
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive(item.to)
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">Register</Link>
                <Link to="/admin-login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-xl text-sm font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20">🛡️ Admin Portal</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
