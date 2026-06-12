import React, { createContext, useContext, useState, useCallback } from 'react';

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  loungeId: number;
  loungeName: string;
  airport: string;
  code: string;
  image: string;
  date: string;
  time: string;
  guests: number;
  amount: number;
  status: BookingStatus;
  bookedAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookedAt' | 'status'>) => Booking;
  cancelBooking: (id: string) => void;
  getBookingsByStatus: (status: BookingStatus) => Booking[];
}

const STORAGE_KEY = 'lounge_bookings';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const persist = (updated: Booking[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setBookings(updated);
  };

  const addBooking = useCallback((data: Omit<Booking, 'id' | 'bookedAt' | 'status'>): Booking => {
    const booking: Booking = {
      ...data,
      id: `BK-${Date.now()}`,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    };
    setBookings((prev) => {
      const updated = [booking, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return booking;
  }, []);

  const cancelBooking = useCallback((id: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) => b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getBookingsByStatus = useCallback((status: BookingStatus) => {
    return bookings.filter((b) => b.status === status);
  }, [bookings]);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getBookingsByStatus }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = (): BookingContextType => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings must be used within BookingProvider');
  return ctx;
};
