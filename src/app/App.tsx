import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { AdminLogin } from './pages/AdminLogin';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Lounges } from './pages/Lounges';
import { Bookings } from './pages/Bookings';
import { Memberships } from './pages/Memberships';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { Mail, Plane } from 'lucide-react';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const ForgotPassword: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] dark:bg-[#0a0f1e] px-4">
    <div className="max-w-md w-full bg-white dark:bg-[#111827] rounded-2xl shadow-2xl p-8 text-center border border-indigo-100 dark:border-indigo-900">
      <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6">Enter your email and we'll send a reset link.</p>
      <input
        type="email"
        placeholder="your@email.com"
        className="w-full px-4 py-3 mb-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
      />
      <button
        onClick={() => toast.success('Reset link sent! Check your inbox.')}
        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-violet-700 transition shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
      >
        Send Reset Link
      </button>
      <Link to="/login" className="block mt-4 text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
        Back to Sign In
      </Link>
    </div>
  </div>
);

const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] dark:bg-[#0a0f1e]">
    <div className="text-center">
      <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
        <Plane className="w-12 h-12 text-indigo-500" />
      </div>
      <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-3">404</h1>
      <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">Page Not Found</p>
      <p className="text-slate-500 dark:text-slate-500 mb-8">This gate doesn't exist.</p>
      <Link
        to="/"
        className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-violet-700 transition shadow-lg"
      >
        Go Home
      </Link>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a0f1e]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-violet-500/5 to-transparent dark:from-indigo-900/40 dark:via-violet-900/20 dark:to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 border border-indigo-200 dark:border-indigo-700">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span>300+ Premium Lounges Worldwide</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Travel in{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Pure Luxury
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience premium comfort at the world's finest airport lounges. Book in seconds, enjoy instantly.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-violet-700 transition shadow-xl shadow-indigo-200 dark:shadow-indigo-900/40 transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 border-2 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 rounded-xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { val: '300+', label: 'Lounges' },
              { val: '50K+', label: 'Travelers' },
              { val: '4.8★', label: 'Rating' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{s.val}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose LoungePass?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Everything you need for a premium pre-flight experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              emoji: '🌍',
              title: 'Global Access',
              desc: 'Access 300+ premium lounges across all major airports worldwide',
              color: 'from-indigo-500 to-indigo-600',
              bg: 'bg-indigo-50 dark:bg-indigo-900/20',
              border: 'border-indigo-100 dark:border-indigo-800',
            },
            {
              emoji: '⚡',
              title: 'Instant Booking',
              desc: 'Book your lounge access in seconds with real-time seat availability',
              color: 'from-violet-500 to-violet-600',
              bg: 'bg-violet-50 dark:bg-violet-900/20',
              border: 'border-violet-100 dark:border-violet-800',
            },
            {
              emoji: '🏆',
              title: 'Rewards Program',
              desc: 'Earn points on every visit and unlock exclusive elite benefits',
              color: 'from-amber-500 to-amber-600',
              bg: 'bg-amber-50 dark:bg-amber-900/20',
              border: 'border-amber-100 dark:border-amber-800',
            },
          ].map((f) => (
            <div
              key={f.title}
              className={`p-8 rounded-2xl border ${f.bg} ${f.border} hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-12 text-white text-center shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready for Premium Travel?</h2>
            <p className="text-indigo-100 mb-8 text-lg max-w-xl mx-auto">
              Join thousands of travelers who transform their airport experience with LoungePass.
            </p>
            <Link
              to="/register"
              className="inline-block px-10 py-4 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition transform hover:scale-105 shadow-xl"
            >
              Start Your Journey →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a0f1e] transition-colors">
              <Navbar />
              <Toaster position="top-right" richColors />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lounges"
                  element={
                    <ProtectedRoute>
                      <Lounges />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute>
                      <Bookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/memberships"
                  element={
                    <ProtectedRoute>
                      <Memberships />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
