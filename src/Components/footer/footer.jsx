import { FaFacebook, FaWhatsappSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram, IoCall } from "react-icons/io5";
import { Link } from 'react-router-dom';
import SupportedCards from './assets/payment-method-c454fb.svg'
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="">Mens Clothing</Link></li>
                            <li><Link to="">Womens Clothing</Link></li>
                            <li><Link to="">Electronics</Link></li>
                            <li><Link to="">Home & Furniture</Link></li>
                            <li><Link to="">Beauty & Personal Care</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Help</h3>
                        <ul>
                            <li><Link to="">Customer Service</Link></li>
                            <li><Link to="">Track Order</Link></li>
                            <li><Link to="">Returns & Refunds</Link></li>
                            <li><Link to="">Shipping Information</Link></li>
                            <li><Link to="">FAQs</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>About Us</h3>
                        <ul>
                            <li><Link to="">Our Story</Link></li>
                            <li><Link to="">Careers</Link></li>
                            <li><Link to="">Sustainability</Link></li>
                            <li><Link to="">Press</Link></li>
                            <li><Link to="">Investor Relations</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Connect</h3>
                        <ul>
                            <li><Link to="">Contact Us</Link></li>
                            <li><Link to="/seller-account-active">Become a Seller Account</Link></li>
                            <li><Link to="/seller-dashboard">Seller Dashboard</Link></li>
                            <li><Link to="">Store Locator</Link></li>
                            <li><Link to="">Download App</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Follow us . .</h3>
                        <div className="social-links">
                            <Link to="https://www.facebook.com/profile.php?id=100053514034271&mibextid=rS40aB7S9Ucbxw6v" className="social-link" target="_blank" aria-label="Facebook">
                                <FaFacebook />
                            </Link>
                            <Link to="https://x.com/kunalsharma45_" className="social-link" target="_blank" aria-label="Twitter">
                                <FaXTwitter />
                            </Link>
                            <Link to="https://github.com/kunalcoder45" className="social-link" target="_blank" aria-label="GitHub">
                                <FaGithub />
                            </Link>
                            <Link to="https://www.instagram.com/kunal_sharma_45__/profilecard/?igsh=ZDNrdXVhcjA0YmNs" className="social-link" target="_blank" aria-label="Instagram">
                                <IoLogoInstagram />
                            </Link>
                            <Link to="tel:+919507966158" className="social-link" target="_blank" aria-label="Phone">
                                <IoCall />
                            </Link>
                            <Link to="https://wa.me/+919507966158" className="social-link" target="_blank" aria-label="Whatsapp">
                                <FaWhatsappSquare />
                            </Link>
                            <Link to="https://www.linkedin.com/in/kunal-sharma-cse-student/" target="_blank" className="social-link" aria-label="Linkedin">
                                <FaLinkedin />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="dev">
                        &copy; {currentYear} All Rights Reserved | Developer <Link
                        href="https://kunalportfolio45.netlify.app/" target="_blank">
                            Kunal Sharma
                        </Link>
                    </div>
                    <div className="footer-bottom-links">
                        <Link to="">Privacy Policy |</Link>
                        <Link to="">Terms of Use |</Link>
                        <Link to="">Sales and Refunds |</Link>
                        <Link to="">Legal</Link>
                    </div>
                </div>
                <div className="supportedCards">
                    <img src={SupportedCards} alt="" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;

