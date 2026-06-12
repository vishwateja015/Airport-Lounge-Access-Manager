import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, Plane, Shield } from 'lucide-react';
import { toast } from 'sonner';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please enter your email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (type: 'user' | 'admin') => {
    setEmail(type === 'admin' ? 'admin@airport.com' : 'user@airport.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] dark:bg-[#0a0f1e] px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-indigo-100 dark:border-indigo-900/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-8 py-8 text-white text-center">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Welcome Back</h2>
            <p className="text-indigo-100 text-sm mt-1">Sign in to access your lounge pass</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
                  <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-violet-700 transition shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  Sign up free
                </Link>
              </p>
            </div>

            {/* Quick demo */}
            <div className="mt-5 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 mb-2">Quick Demo Access</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('user')}
                  className="flex-1 py-2 text-sm bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                >
                  👤 User
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('admin')}
                  className="flex-1 py-2 text-sm bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/40 transition"
                >
                  🛡️ Admin
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 text-center">Click to fill, then Sign In</p>
            </div>

            {/* Admin portal link */}
            <div className="mt-4">
              <Link
                to="/admin-login"
                className="flex items-center justify-center gap-2 w-full py-2.5 border-2 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition"
              >
                <Shield className="w-4 h-4" />
                Admin Portal Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
