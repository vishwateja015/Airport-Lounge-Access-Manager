import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@airport.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('admin')) {
      toast.error('This portal is for admin accounts only.');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success('Welcome, Administrator!');
      navigate('/admin');
    } catch {
      toast.error('Admin login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] dark:bg-[#0a0f1e] px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-amber-200 dark:border-amber-900/50 overflow-hidden">
          {/* Header stripe */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-6 text-white text-center">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Admin Portal</h2>
            <p className="text-amber-100 text-sm mt-1">Restricted access — authorized personnel only</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="admin@airport.com"
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
                    className="w-full pl-10 pr-12 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="Enter admin password"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-bold hover:from-amber-600 hover:to-orange-700 transition shadow-lg shadow-amber-200 dark:shadow-amber-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Authenticating…' : 'Access Admin Portal'}
              </button>
            </form>

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">Demo Credentials</p>
              <p className="text-xs text-amber-700 dark:text-amber-400">Email: admin@airport.com</p>
              <p className="text-xs text-amber-700 dark:text-amber-400">Password: any password</p>
            </div>

            <div className="mt-6 text-center space-y-2">
              <Link to="/login" className="block text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                ← Back to User Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
