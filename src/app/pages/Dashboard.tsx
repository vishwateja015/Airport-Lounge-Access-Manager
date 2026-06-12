import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Star, Award, Clock, Ticket, CreditCard } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { bookings } = useBookings();

  const today = new Date().toISOString().split('T')[0];
  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed' && b.date >= today).slice(0, 3);

  const totalSpent = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.amount : sum, 0);
  const thisMonth = bookings.filter((b) => {
    const bMonth = b.date.slice(0, 7);
    const curMonth = new Date().toISOString().slice(0, 7);
    return bMonth === curMonth && b.status !== 'cancelled';
  }).length;

  const stats = [
    { label: 'Reward Points', value: user?.rewardPoints || 0, icon: Award, color: 'bg-amber-500' },
    { label: 'Total Bookings', value: bookings.filter(b => b.status !== 'cancelled').length, icon: Ticket, color: 'bg-indigo-500' },
    { label: 'This Month', value: thisMonth, icon: Calendar, color: 'bg-emerald-500' },
    { label: 'Total Spent', value: `$${totalSpent}`, icon: CreditCard, color: 'bg-violet-500' }
  ];

  const recommendedLounges = [
    { id: 1, name: 'Plaza Premium Lounge', airport: 'London Heathrow', rating: 4.8, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400' },
    { id: 2, name: 'Lufthansa Business Lounge', airport: 'Frankfurt', rating: 4.9, image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400' },
    { id: 3, name: 'Qantas First Lounge', airport: 'Sydney', rating: 4.7, image: 'https://images.unsplash.com/photo-1583196443328-f08a7da7a3c1?w=400' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Here's what's happening with your lounge access</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Membership Status: {user?.membershipTier?.toUpperCase() || 'SILVER'}</h3>
              <p className="text-amber-100">You're {500 - (user?.rewardPoints || 0) % 500} points away from the next tier!</p>
            </div>
            <Award className="w-16 h-16 text-amber-200" />
          </div>
          <div className="mt-4 bg-amber-400 rounded-full h-2">
            <div className="bg-white rounded-full h-2" style={{ width: `${((user?.rewardPoints || 0) % 500) / 5}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Bookings</h2>
              <Link to="/bookings" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">View all</Link>
            </div>
            <div className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  <Calendar className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No upcoming bookings</p>
                  <Link to="/lounges" className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline mt-1 inline-block">Browse lounges →</Link>
                </div>
              ) : upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{booking.loungeName}</h3>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs rounded-full font-semibold">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      {booking.airport}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                      {booking.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {booking.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recommended for You</h2>
              <Link to="/lounges" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Explore more</Link>
            </div>
            <div className="space-y-4">
              {recommendedLounges.map((lounge) => (
                <div key={lounge.id} className="flex items-center space-x-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 transition cursor-pointer">
                  <img src={lounge.image} alt={lounge.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{lounge.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{lounge.airport}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="ml-1 text-sm text-slate-700 dark:text-slate-300">{lounge.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
