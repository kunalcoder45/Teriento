import PropTypes from 'prop-types'; // Import PropTypes for validation
import './Navbar.css'; // Import CSS for the avatar styling

const Avatar = ({ name }) => {
  // Validate if 'name' exists and get the first letter
  const firstLetter = name?.charAt(0).toUpperCase() || '?'; // Default to '?' if no name is provided

  return (
    <div className="avatar">
      {firstLetter}
    </div>
  );
};

// Prop validation for the 'name' prop
Avatar.propTypes = {
  name: PropTypes.string.isRequired, // Ensure 'name' is a required string
};

export default Avatar;
