import React, { useState } from 'react';
import { Search, MapPin, Star, Users, Wifi, Coffee, Bed, Briefcase, Filter, SlidersHorizontal, X, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useBookings } from '../contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

type Lounge = {
  id: number;
  name: string;
  airport: string;
  code: string;
  city: string;
  country: string;
  rating: number;
  reviews: number;
  price: number;
  capacity: number;
  available: number;
  image: string;
  amenities: string[];
  memberships: string[];
};

export const Lounges: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedLounge, setSelectedLounge] = useState<Lounge | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [guests, setGuests] = useState(1);
  const { addBooking } = useBookings();
  const navigate = useNavigate();

  const lounges = [
    {
      id: 1,
      name: 'Emirates First Class Lounge',
      airport: 'Dubai International Airport',
      code: 'DXB',
      city: 'Dubai',
      country: 'UAE',
      rating: 4.9,
      reviews: 1245,
      price: 85,
      capacity: 150,
      available: 45,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600',
      amenities: ['Wi-Fi', 'Showers', 'Dining', 'Bar', 'Business Center', 'Sleeping Pods'],
      memberships: ['Priority Pass', 'LoungeKey', 'Emirates Skywards']
    },
    {
      id: 2,
      name: 'Singapore Airlines SilverKris Lounge',
      airport: 'Singapore Changi Airport',
      code: 'SIN',
      city: 'Singapore',
      country: 'Singapore',
      rating: 4.8,
      reviews: 982,
      price: 95,
      capacity: 120,
      available: 32,
      image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600',
      amenities: ['Wi-Fi', 'Dining', 'Bar', 'Entertainment', 'Showers'],
      memberships: ['Priority Pass', 'Star Alliance Gold']
    },
    {
      id: 3,
      name: 'Qatar Airways Al Mourjan Business Lounge',
      airport: 'Hamad International Airport',
      code: 'DOH',
      city: 'Doha',
      country: 'Qatar',
      rating: 4.7,
      reviews: 856,
      price: 75,
      capacity: 200,
      available: 78,
      image: 'https://images.unsplash.com/photo-1583196443328-f08a7da7a3c1?w=600',
      amenities: ['Wi-Fi', 'Dining', 'Showers', 'Spa', 'Sleeping Areas'],
      memberships: ['Priority Pass', 'Oneworld Emerald']
    },
    {
      id: 4,
      name: 'Lufthansa Business Lounge',
      airport: 'Frankfurt Airport',
      code: 'FRA',
      city: 'Frankfurt',
      country: 'Germany',
      rating: 4.6,
      reviews: 723,
      price: 70,
      capacity: 100,
      available: 18,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600',
      amenities: ['Wi-Fi', 'Dining', 'Bar', 'Business Center'],
      memberships: ['Star Alliance Gold', 'Lufthansa Miles & More']
    },
    {
      id: 5,
      name: 'Plaza Premium Lounge',
      airport: 'London Heathrow Airport',
      code: 'LHR',
      city: 'London',
      country: 'United Kingdom',
      rating: 4.5,
      reviews: 1534,
      price: 65,
      capacity: 80,
      available: 25,
      image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600',
      amenities: ['Wi-Fi', 'Dining', 'Showers', 'Quiet Zones'],
      memberships: ['Priority Pass', 'LoungeKey', 'DragonPass']
    },
    {
      id: 6,
      name: 'Qantas First Lounge',
      airport: 'Sydney Airport',
      code: 'SYD',
      city: 'Sydney',
      country: 'Australia',
      rating: 4.9,
      reviews: 634,
      price: 100,
      capacity: 90,
      available: 12,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      amenities: ['Wi-Fi', 'Fine Dining', 'Bar', 'Spa', 'Showers', 'Business Center'],
      memberships: ['Qantas Platinum', 'Oneworld Emerald']
    }
  ];

  const amenityIcons: { [key: string]: any } = {
    'Wi-Fi': Wifi,
    'Dining': Coffee,
    'Showers': Bed,
    'Business Center': Briefcase
  };

  const filteredLounges = lounges.filter((l) =>
    !searchTerm ||
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.airport.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBook = () => {
    if (!bookingDate || !bookingTime) {
      toast.error('Please select a date and time');
      return;
    }
    if (!selectedLounge) return;
    addBooking({
      loungeId: selectedLounge.id,
      loungeName: selectedLounge.name,
      airport: `${selectedLounge.airport} (${selectedLounge.code})`,
      code: selectedLounge.code,
      image: selectedLounge.image,
      date: bookingDate,
      time: bookingTime,
      guests,
      amount: selectedLounge.price * guests,
      status: 'confirmed',
    });
    toast.success(`Booking confirmed at ${selectedLounge.name}!`);
    setSelectedLounge(null);
    setBookingDate('');
    setBookingTime('');
    setGuests(1);
    setTimeout(() => navigate('/bookings'), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Discover Airport Lounges</h1>
          <p className="text-slate-600 dark:text-slate-400">Find and book premium lounge access worldwide</p>
        </div>

        <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by airport, city, or lounge name..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {filterOpen && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Price Range</label>
                <select className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  <option>Any Price</option>
                  <option>$0 - $50</option>
                  <option>$50 - $100</option>
                  <option>$100+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Rating</label>
                <select className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  <option>Any Rating</option>
                  <option>4.5+ Stars</option>
                  <option>4.0+ Stars</option>
                  <option>3.5+ Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Availability</label>
                <select className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  <option>Any Availability</option>
                  <option>Available Now</option>
                  <option>Limited Availability</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Amenities</label>
                <select className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white">
                  <option>All Amenities</option>
                  <option>Wi-Fi</option>
                  <option>Showers</option>
                  <option>Dining</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-slate-600 dark:text-slate-400">
            Showing <span className="font-semibold">{filteredLounges.length}</span> lounges
          </p>
          <select className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
            <option>Sort by: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
            <option>Availability</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLounges.map((lounge) => (
            <div
              key={lounge.id}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48">
                <img src={lounge.image} alt={lounge.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white dark:bg-slate-800 rounded-full font-semibold text-slate-900 dark:text-white shadow-lg">
                  ${lounge.price}
                </div>
                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                  lounge.available > 30
                    ? 'bg-green-500 text-white'
                    : lounge.available > 10
                    ? 'bg-amber-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {lounge.available} seats available
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{lounge.name}</h3>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{lounge.airport} ({lounge.code})</span>
                </div>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="ml-1 font-semibold text-slate-900 dark:text-white">{lounge.rating}</span>
                  </div>
                  <span className="mx-2 text-slate-400">•</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{lounge.reviews} reviews</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Capacity: {lounge.capacity}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {lounge.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {lounge.amenities.length > 4 && (
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full">
                      +{lounge.amenities.length - 4} more
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedLounge(lounge)}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  View Details & Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLounge && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelectedLounge(null)}>
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56">
              <img src={selectedLounge.image} alt={selectedLounge.name} className="w-full h-full object-cover rounded-t-2xl" />
              <button
                onClick={() => setSelectedLounge(null)}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5 text-slate-900 dark:text-white" />
              </button>
              <div className="absolute bottom-4 left-4 px-3 py-1 bg-white dark:bg-slate-800 rounded-full font-bold text-slate-900 dark:text-white shadow-lg text-lg">
                ${selectedLounge.price} / person
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{selectedLounge.name}</h2>
              <div className="flex items-center text-slate-600 dark:text-slate-400 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{selectedLounge.airport} ({selectedLounge.code}), {selectedLounge.country}</span>
              </div>
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-amber-500 fill-current mr-1" />
                <span className="font-semibold text-slate-900 dark:text-white mr-1">{selectedLounge.rating}</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm">({selectedLounge.reviews} reviews)</span>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLounge.amenities.map((a) => (
                    <span key={a} className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">{a}</span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Accepted Memberships</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLounge.memberships.map((m) => (
                    <span key={m} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-full">{m}</span>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Book Your Visit</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Date
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Time
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select time</option>
                      {['06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3" /> Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-600 dark:text-slate-400">Total</span>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">${selectedLounge.price * guests}</span>
                </div>
                <button
                  onClick={handleBook}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-bold hover:from-blue-700 hover:to-blue-900 transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
