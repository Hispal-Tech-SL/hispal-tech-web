import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingContextType {
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<string>("");

  return (
    <BookingContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
