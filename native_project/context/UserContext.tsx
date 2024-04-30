// Assuming UserContext or a similar file
import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserUnits(user.userId);
    }
  }, [user]);

  const fetchUserUnits = async (userId) => {
    try {
      const response = await fetch('/api/getUnitsWithDetailsByUserId', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await response.json();
      if (response.ok) {
        setUnits(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Failed to load user's units:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, units }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
