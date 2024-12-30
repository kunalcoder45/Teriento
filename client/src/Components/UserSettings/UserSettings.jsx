import { Link } from 'react-router-dom'; // For navigation
import { useAuth } from '../authContext/AuthContext'; // Assuming you have this custom hook for auth
import { signOut } from 'firebase/auth'; // Firebase signOut function
import { auth } from '../../firebase'; // Import your firebase config
import Avatar from '../Navbar/Avatar';
import './UserSetting.css'
import { useEffect } from 'react';
import { toast, Toaster } from "react-hot-toast";


const UserSettings = () => {
  const { user, loading } = useAuth(); // Get current user from context
  //const navigate = useNavigate();
  // Handle logout
  useEffect(() => {
    document.title = "User Settings - Teriento";
  }, []);
  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase
      await signOut(auth);
      toast.success("Log out Successful!", {
      });
      // Redirect after successful login
      setTimeout(() => {
          window.location.href = "/authl";
      }, 3000); // Adjust the path as needed (e.g., '/auths' for login page)
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <div className="head-user">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/user-settings">User Setting</Link>
      </div>
      <div className='main-for-user-setting'>
        {user ? (
          <div className="user-data">
            <div>
              {loading ? (
                <span>Loading...</span> // Show loading text or spinner while fetching user
              ) : user ? (
                user.photoURL ? (
                  // Show Google profile image if available
                  <img
                    src={user.photoURL}
                    // alt="User Icon"
                    className="user-img"
                  />
                ) : (
                  // If there's no photoURL, generate avatar with the first letter of name
                  <Avatar name={user.displayName || user.email} />
                )
              ) : (
                <ion-icon size={30} name="person-outline"></ion-icon> // Default icon if user is not logged in
              )}
            </div>
            <p>Welcome, {user.displayName || 'User'}!</p>
            <button onClick={handleLogout} className='log-out-btn'>Logout</button>
          </div>
        ) : (
          <p>Please log in to access your settings.</p>
        )}
      </div>
      <Toaster position='top-right' />
    </div>
  );
};

export default UserSettings;
