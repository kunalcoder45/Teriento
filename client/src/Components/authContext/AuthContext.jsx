import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './loder.css'

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false once we have the user data
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  // While loading, you can return a loading indicator or null
  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure 'children' is passed and is a valid React node
};

// useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};