import React, { createContext, useContext, useState } from 'react';

// Create a context
const CalendarContext = createContext();

// Create a provider
export const CalendarProvider = ({ children }) => {
  const [calendarData, setCalendarData] = useState({
    providerCurrentDay: '', // Initialize with appropriate initial values
    providerCurrentDate: '',
    providerWeatherIcon: '',
    providerWeatherInfo: ''
  });

  return (
    <CalendarContext.Provider value={{ calendarData, setCalendarData }}>
      {children}
    </CalendarContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCalendarContext = () => useContext(CalendarContext);
