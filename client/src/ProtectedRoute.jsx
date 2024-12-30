import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from './Components/authContext/AuthContext'; // Make sure this import path is correct

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Use the useAuth hook to access the user

  if (!user) {
    return <Navigate to="/authl" />; // Redirect to login if the user is not authenticated
  }

  return children; // Render children if user is authenticated
};

// Prop validation for children
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // children should be a React node and is required
};

export default ProtectedRoute;
