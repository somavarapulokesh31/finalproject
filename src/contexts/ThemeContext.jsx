import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('synctrack_theme') || 'system');

  useEffect(() => {
    localStorage.setItem('synctrack_theme', theme);
    const root = document.documentElement;
    // Clear old theme classes
    root.classList.remove('theme-dark', 'theme-midnight', 'theme-system');
    
    // Apply selected theme
    if (theme === 'midnight') {
      root.classList.add('theme-midnight');
    } else {
      root.classList.add('theme-dark'); // default mapping since it's a dark app
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
