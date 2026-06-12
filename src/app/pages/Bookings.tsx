import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Download, QrCode, Star, Users, CreditCard, X, CheckCircle, Link as LinkIcon } from 'lucide-react';
import QRCodeLib from 'qrcode';
import { toast } from 'sonner';
import { useBookings, Booking } from '../contexts/BookingContext';
import { Link } from 'react-router-dom';

type Tab = 'upcoming' | 'past' | 'cancelled';

export const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [qrModal, setQrModal] = useState<string | null>(null);
  const [qrBookingId, setQrBookingId] = useState<string>('');
  const { bookings, cancelBooking } = useBookings();

  const today = new Date().toISOString().split('T')[0];

  const grouped: Record<Tab, Booking[]> = {
    upcoming: bookings.filter((b) => b.status === 'confirmed' && b.date >= today),
    past: bookings.filter((b) => b.status === 'confirmed' && b.date < today),
    cancelled: bookings.filter((b) => b.status === 'cancelled'),
  };

  const generateQR = async (booking: Booking) => {
    try {
      const data = JSON.stringify({ id: booking.id, lounge: booking.loungeName, date: booking.date, time: booking.time });
      const qr = await QRCodeLib.toDataURL(data, { width: 300, margin: 2 });
      setQrModal(qr);
      setQrBookingId(booking.id);
    } catch {
      toast.error('QR generation failed');
    }
  };

  const handleCancel = (id: string) => {
    cancelBooking(id);
    toast.success('Booking cancelled successfully');
  };

  const tabLabels: Record<Tab, string> = {
    upcoming: 'Upcoming',
    past: 'Past',
    cancelled: 'Cancelled',
  };

  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0a0f1e] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">My Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your lounge access reservations</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {(['upcoming', 'past', 'cancelled'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`p-4 rounded-2xl border-2 transition text-left ${
                activeTab === t
                  ? t === 'upcoming'
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : t === 'past'
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
                    : 'border-red-400 bg-red-50 dark:bg-red-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111827] hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div className={`text-2xl font-bold ${
                activeTab === t
                  ? t === 'upcoming' ? 'text-indigo-600 dark:text-indigo-400'
                    : t === 'past' ? 'text-violet-600 dark:text-violet-400'
                    : 'text-red-500 dark:text-red-400'
                  : 'text-slate-900 dark:text-white'
              }`}>
                {grouped[t].length}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 capitalize">{tabLabels[t]}</div>
            </button>
          ))}
        </div>

        {/* Tab strip */}
        <div className="flex space-x-1 mb-6 bg-white dark:bg-[#111827] rounded-xl p-1 border border-slate-200 dark:border-slate-700 w-fit">
          {(['upcoming', 'past', 'cancelled'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tabLabels[tab]} ({grouped[tab].length})
            </button>
          ))}
        </div>

        {/* Booking cards */}
        <div className="space-y-5">
          {grouped[activeTab].length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-700">
              <Calendar className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                No {tabLabels[activeTab].toLowerCase()} bookings
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                {activeTab === 'upcoming' ? "Ready to book your next lounge visit?" : `You have no ${tabLabels[activeTab].toLowerCase()} bookings yet.`}
              </p>
              {activeTab === 'upcoming' && (
                <Link
                  to="/lounges"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-violet-700 transition shadow-lg"
                >
                  Browse Lounges
                </Link>
              )}
            </div>
          ) : (
            grouped[activeTab].map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-[#111827] rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-56 h-44 md:h-auto flex-shrink-0 relative">
                    <img src={booking.image} alt={booking.loungeName} className="w-full h-full object-cover" />
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'confirmed' && booking.date >= today
                        ? 'bg-emerald-500 text-white'
                        : booking.status === 'cancelled'
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-500 text-white'
                    }`}>
                      {booking.status === 'confirmed' && booking.date >= today ? 'Confirmed' : booking.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                    </div>
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{booking.loungeName}</h3>
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-1">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {booking.airport}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-slate-900 dark:text-white">${booking.amount}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Calendar className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Clock className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Users className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <span>{booking.guests} person{booking.guests > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Booking ID */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-xs text-indigo-700 dark:text-indigo-300 font-mono mb-4">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {booking.id}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                      {booking.status === 'confirmed' && booking.date >= today && (
                        <>
                          <button
                            onClick={() => generateQR(booking)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-violet-700 transition shadow-md"
                          >
                            <QrCode className="w-4 h-4" />
                            QR Pass
                          </button>
                          <button
                            onClick={() => toast.success('Invoice downloaded!')}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                          >
                            <Download className="w-4 h-4" />
                            Invoice
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </button>
                        </>
                      )}
                      {(booking.status === 'confirmed' && booking.date < today) && (
                        <>
                          <button
                            onClick={() => toast.success('Review submitted! Thank you.')}
                            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-semibold hover:bg-amber-600 transition"
                          >
                            <Star className="w-4 h-4" />
                            Write Review
                          </button>
                          <button
                            onClick={() => toast.success('Invoice downloaded!')}
                            className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                          >
                            <Download className="w-4 h-4" />
                            Invoice
                          </button>
                        </>
                      )}
                      {booking.status === 'cancelled' && (
                        <Link
                          to="/lounges"
                          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-violet-700 transition"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Book Again
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* QR Modal */}
      {qrModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setQrModal(null)}
        >
          <div
            className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your QR Pass</h3>
              <button
                onClick={() => setQrModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">{qrBookingId}</p>
            <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4">
              <img src={qrModal} alt="QR Code" className="w-full" />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-5">
              Show this QR code at the lounge entrance for instant access
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = `lounge-pass-${qrBookingId}.png`;
                  link.href = qrModal;
                  link.click();
                  toast.success('QR pass downloaded!');
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-violet-700 transition text-sm"
              >
                Download
              </button>
              <button
                onClick={() => setQrModal(null)}
                className="flex-1 py-2.5 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
