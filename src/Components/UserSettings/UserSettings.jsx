import { Link } from "react-router-dom"; // For navigation
import { useAuth } from "../authContext/AuthContext"; // Assuming you have this custom hook for auth
import { signOut } from "firebase/auth"; // Firebase signOut function
import { auth } from "../../firebase/firebase"; // Import your firebase config
import Avatar from "../Navbar/Avatar"; // Avatar component for user initials
import "./UserSetting.css";
import { useEffect, useState, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import "aos/dist/aos.css";
import AOS from "aos";

const UserSettings = () => {
  const { user, loading } = useAuth();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  const formRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 250,
      easing: "ease",
      once: true,
    });
  }, []);
  
  useEffect(() => {
    document.title = "User Settings - Teriento";
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Log out Successful!");
      setTimeout(() => {
        window.location.href = "/authl"; // Redirect to login page
      }, 3000);
    } catch (error) {
      toast.error("Error during logout: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Changes saved successfully!");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxs5d-lSh1eLHiChh0sL2LtUNWtZ8LwXRUGmqA2JR7uR_Pyvxztv0L9aPKztSfXljje/exec';
    const form = formRef.current;

    // Send form data to Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        if (response.ok) {
          // Success: Show success toast notification
          toast.success("Thanks for contacting us! We will get back to you soon.");
        } else {
          // Error: Show error toast notification
          toast.error("There was an issue submitting the form. Please try again.");
        }
      })
      .catch(error => {
        console.error('Error!', error.message);
        // Handle network or other errors
        toast.error("Error submitting form: " + error.message);
      });
  };

  return (
    <div className="head-user">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/user-settings">User Setting</Link>
      </div>
      <div className="main-for-user-setting">
        {user ? (
          <div className="user-data">
            <div>
              {loading ? (
                <span>Loading...</span>
              ) : user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Icon"
                  className="user-img"
                />
              ) : (
                <Avatar name={user.displayName || user.email} />
              )}
            </div>
            <p>Welcome, {user.displayName || "User"}!</p>
            <form 
              ref={formRef}
              onSubmit={handleFormSubmit}
              className="settings-form"
            >
              <div className="form-group">
                <label htmlFor="name">Change Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                ></textarea>
              </div>
              <button onClick={handleSave} type="submit" name="submit" className="save-btn">
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setConfirmLogout(true)}
              className="log-out-btn"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Please log in to access your settings.</p>
        )}
      </div>
      {confirmLogout && (
        <div className="popup">
          <div className="popup-content" data-aos="zoom-in">
            <h2>Are you sure you want to logout?</h2>
            <div className="popup-buttons">
              <button
                className="cancel-btn"
                onClick={() => setConfirmLogout(false)}
              >
                Cancel
              </button>
              <button
                className="logout-confirm-btn"
                onClick={() => {
                  setConfirmLogout(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default UserSettings;
