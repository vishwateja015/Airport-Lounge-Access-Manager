import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Users, MapPin, Calendar, CreditCard, Award, Bell, BarChart3,
  Settings, Shield, Database, Plus, Edit, Trash2, Eye, Search,
  Download, Filter, TrendingUp, DollarSign, Activity, CheckCircle,
  XCircle, AlertCircle, Send
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'lounges', label: 'Lounge Management', icon: MapPin },
    { id: 'bookings', label: 'Booking Management', icon: Calendar },
    { id: 'memberships', label: 'Memberships', icon: Award },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { label: 'Total Bookings', value: '3,847', change: '+8%', icon: Calendar, color: 'bg-green-500' },
    { label: 'Revenue (Monthly)', value: '$48,920', change: '+24%', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Active Lounges', value: '156', change: '+5%', icon: MapPin, color: 'bg-amber-500' },
    { label: 'Occupancy Rate', value: '78%', change: '+3%', icon: Activity, color: 'bg-red-500' },
    { label: 'Avg Rating', value: '4.8', change: '+0.2', icon: Award, color: 'bg-pink-500' }
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', tier: 'Gold', status: 'active', joined: '2026-06-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', tier: 'Platinum', status: 'active', joined: '2026-06-02' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', tier: 'Silver', status: 'active', joined: '2026-06-03' }
  ];

  const recentBookings = [
    { id: 1, user: 'John Doe', lounge: 'Emirates First Class', date: '2026-06-15', amount: '$85', status: 'confirmed' },
    { id: 2, user: 'Jane Smith', lounge: 'Singapore Airlines', date: '2026-06-16', amount: '$95', status: 'confirmed' },
    { id: 3, user: 'Bob Johnson', lounge: 'Qatar Airways', date: '2026-06-17', amount: '$75', status: 'pending' }
  ];

  const loungeData = [
    { id: 1, name: 'Emirates First Class Lounge', airport: 'DXB', capacity: 150, occupancy: 82, status: 'active', rating: 4.9 },
    { id: 2, name: 'Singapore Airlines SilverKris', airport: 'SIN', capacity: 120, occupancy: 95, status: 'active', rating: 4.8 },
    { id: 3, name: 'Qatar Airways Al Mourjan', airport: 'DOH', capacity: 200, occupancy: 156, status: 'active', rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Shield className="w-8 h-8 mr-3" />
                Admin Portal
              </h1>
              <p className="text-amber-100 mt-1">Complete system control and management</p>
            </div>
            <button onClick={() => toast.success('Report exported successfully!')} className="px-6 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Recent Bookings</h2>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{booking.user}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{booking.lounge}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900 dark:text-white">{booking.amount}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Lounge Performance</h2>
                <div className="space-y-4">
                  {loungeData.map((lounge) => (
                    <div key={lounge.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{lounge.name}</h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{lounge.airport}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">Occupancy: {lounge.occupancy}/{lounge.capacity}</span>
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">★ {lounge.rating}</span>
                      </div>
                      <div className="mt-2 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (lounge.occupancy / lounge.capacity) > 0.8 ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${(lounge.occupancy / lounge.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">User Management</h2>
                <button onClick={() => toast.success('Add User form opening…')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
              </div>
              <div className="mt-4 flex space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
                <button onClick={() => toast.info('Filter options coming soon')} className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">
                          {user.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">{user.joined}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button onClick={() => toast.info(`Viewing profile: ${user.name}`)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button onClick={() => toast.success(`Editing: ${user.name}`)} className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded transition">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => toast.error(`Deleted: ${user.name}`)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'lounges' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lounge Management</h2>
              <button onClick={() => toast.success('Add Lounge form opening…')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add New Lounge</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loungeData.map((lounge) => (
                <div key={lounge.id} className="p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{lounge.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{lounge.airport}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      lounge.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    }`}>
                      {lounge.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Capacity:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{lounge.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{lounge.occupancy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">★ {lounge.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button onClick={() => toast.success(`Editing ${lounge.name}`)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">
                      Edit
                    </button>
                    <button onClick={() => toast.info(`Managing ${lounge.name}`)} className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition text-sm">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Booking Management</h2>
              <button
                onClick={() => toast.success('Report exported!')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900">
                  <tr>
                    {['Booking ID', 'User', 'Lounge', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {[
                    { id: 'BK-001', user: 'John Doe', lounge: 'Emirates First Class', date: '2026-06-15', amount: '$85', status: 'confirmed' },
                    { id: 'BK-002', user: 'Jane Smith', lounge: 'Singapore SilverKris', date: '2026-06-16', amount: '$95', status: 'confirmed' },
                    { id: 'BK-003', user: 'Bob Johnson', lounge: 'Qatar Al Mourjan', date: '2026-06-17', amount: '$75', status: 'pending' },
                    { id: 'BK-004', user: 'Alice Brown', lounge: 'Lufthansa Business', date: '2026-06-18', amount: '$70', status: 'cancelled' },
                    { id: 'BK-005', user: 'Charlie Davis', lounge: 'Plaza Premium LHR', date: '2026-06-19', amount: '$65', status: 'confirmed' },
                  ].map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-slate-900 dark:text-white">{b.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-900 dark:text-white">{b.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">{b.lounge}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-600 dark:text-slate-400">{b.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900 dark:text-white">{b.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          b.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : b.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        }`}>{b.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-1">
                          <button onClick={() => toast.success(`Viewing ${b.id}`)} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition"><Eye className="w-4 h-4" /></button>
                          {b.status === 'pending' && <button onClick={() => toast.success(`Approved ${b.id}`)} className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded transition"><CheckCircle className="w-4 h-4" /></button>}
                          <button onClick={() => toast.error(`Cancelled ${b.id}`)} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition"><XCircle className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'memberships' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { tier: 'Silver', count: 4820, color: 'bg-slate-400', revenue: '$0', growth: '+5%' },
                { tier: 'Gold', count: 5890, color: 'bg-amber-500', revenue: '$199/mo', growth: '+18%' },
                { tier: 'Platinum', count: 1748, color: 'bg-purple-500', revenue: '$399/mo', growth: '+32%' },
              ].map((m) => (
                <div key={m.tier} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className={`w-12 h-12 ${m.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{m.tier}</h3>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white my-2">{m.count.toLocaleString()}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">members · {m.revenue}</p>
                  <p className="text-green-600 dark:text-green-400 text-sm font-semibold mt-2">{m.growth} this month</p>
                  <button onClick={() => toast.success(`Managing ${m.tier} members`)} className="mt-4 w-full py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm text-slate-700 dark:text-slate-300">Manage Members</button>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Membership Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { month: 'Jan', silver: 400, gold: 300, platinum: 100 },
                  { month: 'Feb', silver: 420, gold: 350, platinum: 120 },
                  { month: 'Mar', silver: 380, gold: 400, platinum: 150 },
                  { month: 'Apr', silver: 450, gold: 420, platinum: 180 },
                  { month: 'May', silver: 500, gold: 480, platinum: 200 },
                  { month: 'Jun', silver: 480, gold: 520, platinum: 230 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="silver" fill="#94a3b8" name="Silver" />
                  <Bar dataKey="gold" fill="#f59e0b" name="Gold" />
                  <Bar dataKey="platinum" fill="#a855f7" name="Platinum" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Revenue (MTD)', value: '$48,920', icon: DollarSign, color: 'bg-green-500', change: '+24%' },
                { label: 'Pending Payouts', value: '$3,240', icon: CreditCard, color: 'bg-amber-500', change: '-8%' },
                { label: 'Refunds Issued', value: '$1,180', icon: AlertCircle, color: 'bg-red-500', change: '+2%' },
              ].map((s) => (
                <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${s.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      <s.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-semibold ${s.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{s.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h3>
                <button onClick={() => toast.success('Transactions exported!')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-900">
                    <tr>
                      {['TXN ID', 'User', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {[
                      { id: 'TXN-8821', user: 'John Doe', amount: '$85.00', method: 'Visa ****4242', date: '2026-06-12', status: 'success' },
                      { id: 'TXN-8820', user: 'Jane Smith', amount: '$398.00', method: 'Mastercard ****8888', date: '2026-06-12', status: 'success' },
                      { id: 'TXN-8819', user: 'Bob Johnson', amount: '$75.00', method: 'Amex ****3737', date: '2026-06-11', status: 'pending' },
                      { id: 'TXN-8818', user: 'Alice Brown', amount: '$65.00', method: 'PayPal', date: '2026-06-11', status: 'refunded' },
                    ].map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                        <td className="px-4 py-3 font-mono text-sm text-slate-900 dark:text-white">{t.id}</td>
                        <td className="px-4 py-3 text-slate-900 dark:text-white">{t.user}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">{t.amount}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-sm">{t.method}</td>
                        <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-sm">{t.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            t.status === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                            : t.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
                            : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                          }`}>{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Monthly Revenue</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={[
                    { month: 'Jan', revenue: 32000 }, { month: 'Feb', revenue: 38000 },
                    { month: 'Mar', revenue: 35000 }, { month: 'Apr', revenue: 42000 },
                    { month: 'May', revenue: 45000 }, { month: 'Jun', revenue: 48920 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Bookings by Region</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={[
                      { name: 'Middle East', value: 35 }, { name: 'Asia Pacific', value: 28 },
                      { name: 'Europe', value: 22 }, { name: 'Americas', value: 15 },
                    ]} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                      {['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'].map((color, i) => (
                        <Cell key={i} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Daily Bookings (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  { day: 'Mon', bookings: 48 }, { day: 'Tue', bookings: 62 },
                  { day: 'Wed', bookings: 55 }, { day: 'Thu', bookings: 71 },
                  { day: 'Fri', bookings: 89 }, { day: 'Sat', bookings: 95 },
                  { day: 'Sun', bookings: 78 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Send Notification</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Target Audience</label>
                  <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                    <option>All Users</option>
                    <option>Silver Members</option>
                    <option>Gold Members</option>
                    <option>Platinum Members</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input type="text" placeholder="Notification title" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                  <textarea rows={3} placeholder="Enter your message..." className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none" />
                </div>
                <button onClick={() => toast.success('Notification sent to all users!')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Notification
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Notification History</h3>
              <div className="space-y-3">
                {[
                  { title: 'Summer Promo: 20% off Gold', sent: '2026-06-10', audience: 'All Users', status: 'sent' },
                  { title: 'New Lounge Opening — Narita', sent: '2026-06-08', audience: 'Gold + Platinum', status: 'sent' },
                  { title: 'Maintenance Window Saturday', sent: '2026-06-06', audience: 'All Users', status: 'sent' },
                  { title: 'Exclusive Platinum Event', sent: '2026-06-04', audience: 'Platinum', status: 'sent' },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{n.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{n.audience} · {n.sent}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">{n.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">System Settings</h2>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Database Management</h3>
                <div className="flex space-x-4">
                  <button onClick={() => toast.success('Database backup started!')} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Backup Database</span>
                  </button>
                  <button onClick={() => toast.info('Restore process initiated')} className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition">
                    Restore Database
                  </button>
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Access Control</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Allow new registrations</span>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Require email verification</span>
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Enable two-factor authentication</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
