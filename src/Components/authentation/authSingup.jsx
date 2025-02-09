import { useState } from 'react';
import { FaFacebook, FaWhatsappSquare, FaGithub, FaLinkedin, FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { IoLogoInstagram, IoCall } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Banner from './assets/banner.svg';
import { useEffect } from 'react';
import { toast, Toaster } from "react-hot-toast";

const AuthSignup = () => { // Here we expect the `user` prop (optional for now)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    document.title = "Sign Up - Teriento";
  }, []);
  const provider = new GoogleAuthProvider();

  // Handle email and password signup
  const handleEmailSignup = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Signed up:', user);
        toast.success('Sign Up Successful with email !', {
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      })
      .catch((error) => {
        console.error('Sign Up Error:', error.code, error.message);
        toast.error(`Error during Sign Up: ${error.message}`, {
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('User Signed In:', user);
        toast.success('Sign Up successful with Google !', {
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error.code, error.message);
        toast.error(`Sign-in failed: ${error.message}`, {
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="skeleton">
        <div className="body">
          <div className="upper-body">
            <div className="logo-auth">
              <Link to="/"><h1>Teriento</h1></Link>
            </div>
            <div className="social-links-auth">
              <Link to="" className="social-link" aria-label="Facebook"><FaFacebook /></Link>
              <Link to="" className="social-link" aria-label="Instagram"><IoLogoInstagram /></Link>
              <Link to="" className="social-link" aria-label="Phone"><IoCall /></Link>
              <Link to="" className="social-link" aria-label="Whatsapp"><FaWhatsappSquare /></Link>
              <Link to="" className="social-link" aria-label="Linkedin"><FaLinkedin /></Link>
              <Link to="" className="social-link" aria-label="Github"><FaGithub /></Link>
            </div>
          </div>
          <div className="lower-body">
            <div className="rgt-content">
              <h2>Lets Start</h2>
              <p>Please Login or Sign up to continue.</p>
              <form className="fields" onSubmit={handleEmailSignup}>
                <div className="input-group">
                  <CiUser className="input-icon" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Full Name"
                    required
                  />
                </div>
                <div className="input-group">
                  <MdOutlineEmail className="input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="input-group">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                  />
                  <span onClick={togglePasswordVisibility} className="toggle-password">
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
                <input type="submit" value="Sign Up" className="submit-btn" />
              </form>
              <div className="google-btn">
                <button type="button" onClick={handleGoogleSignIn}>
                  <FcGoogle /> Sign Up with Google
                </button>
              </div>
              <div className="already-account">
                <p>
                  Already have an account? <Link to="/authl" className="link">Login</Link>
                </p>
              </div>
            </div>
            <div className="lgt-content">
              <img src={Banner} alt="Banner" />
            </div>
          </div>
        </div>
      </div>
      <Toaster position='top-right' />
    </div>
  );
};

export default AuthSignup;
