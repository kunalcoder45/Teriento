import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from './Components/authContext/AuthContext'; // Ensure the path is correct

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Use the useAuth hook to get the current authenticated user

  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/authl" />;
  }

  // If user is authenticated, render the children (protected route content)
  return children;
};

// Prop validation to ensure that 'children' is passed as a React node
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
