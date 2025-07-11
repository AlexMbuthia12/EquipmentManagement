// auth/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/auth/me');
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    await fetchUser(); // useful after login
  };

  const logout = async () => {
    try {
      await axios.get('/auth/logout', { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);







// // auth/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from '../axios'; // Your axios config with baseURL

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Holds logged-in user data
//   const [loading, setLoading] = useState(true); // For loading states

//   // Optional: Fetch current user on mount (e.g., from cookie/session)
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('/auth/me'); // your backend /me route
//         setUser(res.data);
//       } catch (err) {
//         console.log('Not logged in');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const login = (userData) => {
//     setUser(userData); // set after successful login
//   };

//   const logout = () => {
//     axios.post('/auth/logout'); // optional: clear cookie from backend
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook to use the context
// export const useAuth = () => useContext(AuthContext);
