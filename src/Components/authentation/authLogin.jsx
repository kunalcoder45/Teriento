// import { useState } from 'react';
// import './auth.css';
// import { FaFacebook, FaWhatsappSquare, FaGithub, FaLinkedin } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { IoLogoInstagram, IoCall } from "react-icons/io5";
// import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
// import { FiLock } from "react-icons/fi";
// import { FcGoogle } from "react-icons/fc";
// import { Link } from 'react-router-dom';
// import Banner from './assets/banner.svg';
// import { toast, Toaster } from "react-hot-toast";
// import { useEffect } from 'react';


// // Firebase imports
// import { initializeApp, getApps } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

// // Firebase Configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyD1NPchD4nwBv09JJ9a0Mf5GDMhMV9__1o",
//     authDomain: "teriento.firebaseapp.com",
//     projectId: "teriento",
//     storageBucket: "teriento.appspot.com",
//     messagingSenderId: "956625193039",
//     appId: "1:956625193039:web:6fe783f9777486c3adc23a",
//     measurementId: "G-2FJJ94NR2C",
// };

// // Initialize Firebase only if it hasn't been initialized yet
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const auth = getAuth(app);
// auth.languageCode = 'en'; // Set default language
// const provider = new GoogleAuthProvider();

// const AuthLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     useEffect(() => {
//         document.title = "Login - Teriento";
//       }, []);

//     const handleEmailLogin = (event) => {
//         event.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 const user = userCredential.user;
//                 console.log('Logged in:', user);
//                 toast.success("Email Login Successful!", {
//                 });
//                 // Redirect after successful login
//                 setTimeout(() => {
//                     window.location.href = "/";
//                 }, 3000);
//             })
//             .catch((error) => {
//                 console.error('Login Error:', error.code, error.message);
//                 toast.error(`Error during Login: ${error.message}`, {
//                 });
//             });
//     };

//     const handleGoogleSignIn = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const user = result.user;
//                 console.log('User Signed In:', user);
//                 toast.success("Google Login Successful!", {
//                 });
//                 setTimeout(() => {
//                     window.location.href = "/";
//                 }, 3000);
//             })
//             .catch((error) => {
//                 console.error("Error during sign-in:", error.code, error.message);
//                 toast.error(`Sign-in failed: ${error.message}`, {
//                 });
//             });
//     };

//     return (
//         <div>
//             <div className="skeleton">
//                 <div className="body">
//                     <div className="upper-body">
//                         <div className="logo-auth"><Link to="/"><h1>Teriento</h1></Link></div>
//                         <div className="social-links-auth">
//                             <Link to="" className="social-link" aria-label="Facebook"><FaFacebook /></Link>
//                             <Link to="" className="social-link" aria-label="Twitter"><FaXTwitter /></Link>
//                             <Link to="" className="social-link" aria-label="GitHub"><FaGithub /></Link>
//                             <Link to="" className="social-link" aria-label="Instagram"><IoLogoInstagram /></Link>
//                             <Link to="" className="social-link" aria-label="Phone"><IoCall /></Link>
//                             <Link to="" className="social-link" aria-label="Whatsapp"><FaWhatsappSquare /></Link>
//                             <Link to="" className="social-link" aria-label="Linkedin"><FaLinkedin /></Link>
//                         </div>
//                     </div>
//                     <div className="lower-body">
//                         <div className="rgt-content">
//                             <h2>Welcome Back!</h2>
//                             <p>Login to continue.</p>
//                             <form className="fields" onSubmit={handleEmailLogin}>
//                                 <div className="input-group">
//                                     <MdOutlineEmail className="input-icon" />
//                                     <input
//                                         type="email"
//                                         placeholder="Enter Email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="input-group">
//                                     <FiLock className="input-icon" />
//                                     <input
//                                         type={showPassword ? "text" : "password"} // Toggle visibility
//                                         placeholder="Enter Password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                     <span
//                                         className="toggle-password"
//                                         onClick={() => setShowPassword(!showPassword)} // Toggle state
//                                         style={{ cursor: 'pointer', marginLeft: '8px' }}
//                                     >
//                                         {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
//                                     </span>
//                                 </div>
//                                 <Link to="/forgotPassword" className="forget-pass">Forget Password</Link>
//                                 <input type="submit" value="Login" className="submit-btn" />
//                             </form>
//                             <div className="google-btn">
//                                 <button type="button" onClick={handleGoogleSignIn}>
//                                     <FcGoogle /> Sign In with Google
//                                 </button>
//                             </div>
//                             <div className="already-account">
//                                 <p>Dont have an account? <Link to="/auths" className="link">Sign Up</Link></p>
//                             </div>
//                         </div>
//                         <div className="lgt-content">
//                             <img src={Banner} alt="Banner" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Toaster position='top-right' />
//         </div>
//     );
// };

// export default AuthLogin;








import { useState } from 'react';
import './auth.css';
import { FaFacebook, FaWhatsappSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram, IoCall } from "react-icons/io5";
import { MdOutlineEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';
import Banner from './assets/banner.svg';
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from 'react';


// Firebase imports
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1NPchD4nwBv09JJ9a0Mf5GDMhMV9__1o",
    authDomain: "teriento.firebaseapp.com",
    projectId: "teriento",
    storageBucket: "teriento.appspot.com",
    messagingSenderId: "956625193039",
    appId: "1:956625193039:web:6fe783f9777486c3adc23a",
    measurementId: "G-2FJJ94NR2C",
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
auth.languageCode = 'en'; // Set default language
const provider = new GoogleAuthProvider();

const AuthLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        document.title = "Login - Teriento";
      }, []);

      const handleEmailLogin = (event) => {
        event.preventDefault();
    
        // Firebase se login
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                console.log('Logged in:', user);
    
                // Firebase ID Token Generate Karna
                const idToken = await user.getIdToken();
                console.log('Generated ID Token:', idToken);
    
                // Backend ko ID Token bhejna
                fetch('http://localhost:5454/api/verifyToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idToken: idToken }), // ID Token ko backend par bhejte hain
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Backend Response:', data);
                    toast.success("Email Login Successful!", {});
                    // Redirect after successful login
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error sending token to backend:', error);
                    toast.error(`Error during Login: ${error.message}`, {});
                });
            })
            .catch((error) => {
                console.error('Login Error:', error.code, error.message);
                toast.error(`Error during Login: ${error.message}`, {});
            });
    };
    

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                console.log('User Signed In:', user);
    
                // Firebase ID Token Generate Karna
                const idToken = await user.getIdToken();
                console.log('Generated ID Token:', idToken);
    
                // Backend ko ID Token bhejna (example mein fetch method se)
                fetch('http://localhost:5454/api/verifyToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ idToken: idToken }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Backend Response:', data);
                    toast.success("Google Login Successful!", {});
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3000);
                })
                .catch(error => {
                    console.error("Error sending token to backend:", error);
                    toast.error(`Token sending failed: ${error.message}`, {});
                });
    
            })
            .catch((error) => {
                console.error("Error during sign-in:", error.code, error.message);
                toast.error(`Sign-in failed: ${error.message}`, {});
            });
    };
    

    return (
        <div>
            <div className="skeleton">
                <div className="body">
                    <div className="upper-body">
                        <div className="logo-auth"><Link to="/"><h1>Teriento</h1></Link></div>
                        <div className="social-links-auth">
                            <Link to="" className="social-link" aria-label="Facebook"><FaFacebook /></Link>
                            <Link to="" className="social-link" aria-label="Twitter"><FaXTwitter /></Link>
                            <Link to="" className="social-link" aria-label="GitHub"><FaGithub /></Link>
                            <Link to="" className="social-link" aria-label="Instagram"><IoLogoInstagram /></Link>
                            <Link to="" className="social-link" aria-label="Phone"><IoCall /></Link>
                            <Link to="" className="social-link" aria-label="Whatsapp"><FaWhatsappSquare /></Link>
                            <Link to="" className="social-link" aria-label="Linkedin"><FaLinkedin /></Link>
                        </div>
                    </div>
                    <div className="lower-body">
                        <div className="rgt-content">
                            <h2>Welcome Back!</h2>
                            <p>Login to continue.</p>
                            <form className="fields" onSubmit={handleEmailLogin}>
                                <div className="input-group">
                                    <MdOutlineEmail className="input-icon" />
                                    <input
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <FiLock className="input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"} // Toggle visibility
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)} // Toggle state
                                        style={{ cursor: 'pointer', marginLeft: '8px' }}
                                    >
                                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </span>
                                </div>
                                <Link to="/forgotPassword" className="forget-pass">Forget Password</Link>
                                <input type="submit" value="Login" className="submit-btn" />
                            </form>
                            <div className="google-btn">
                                <button type="button" onClick={handleGoogleSignIn}>
                                    <FcGoogle /> Sign In with Google
                                </button>
                            </div>
                            <div className="already-account">
                                <p>Dont have an account? <Link to="/auths" className="link">Sign Up</Link></p>
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

export default AuthLogin;
