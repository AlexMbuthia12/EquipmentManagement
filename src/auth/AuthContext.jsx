// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios'; // Your axios config with baseURL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds logged-in user data
  const [loading, setLoading] = useState(true); // For loading states

  // Optional: Fetch current user on mount (e.g., from cookie/session)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/auth/me'); // your backend /me route
        setUser(res.data);
      } catch (err) {
        console.log('Not logged in');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData); // set after successful login
  };

  const logout = () => {
    axios.post('/auth/logout'); // optional: clear cookie from backend
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the context
export const useAuth = () => useContext(AuthContext);
