import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../authContext/AuthContext"; // Importing the useAuth hook
import mensbanner from './assets/mens-banner.jpg';
import whomensbanner from './assets/womens-banner.jpg';
import electronicsbanner from './assets/electronics-banner-1.jpg';
import './Navbar.css';
import PropTypes from "prop-types";
import Avatar from './Avatar';
import productsItems from '../products/productData/ProductData';

const Navbar = ({ favoritesCount, cartCount }) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Get user from context
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsItems);
  const searchRef = useRef(null);
  // Toggle functions for dropdowns and slider
  const toggleSlider = () => setIsSliderOpen(!isSliderOpen);
  const toggleDropdown2 = () => setIsDropdownOpen2(!isDropdownOpen2);
  const toggleDropdown3 = () => setIsDropdownOpen3(!isDropdownOpen3);
  const toggleDropdown4 = () => setIsDropdownOpen4(!isDropdownOpen4);

  // Redirect user based on login status
  const handleUserIconClick = () => {
    if (user) {
      navigate("/user-settings"); // If user is logged in, navigate to the settings page
    } else {
      navigate("/auths"); // If not logged in, navigate to the authentication page
    }
  };
  // Handle "Enter" key press for search
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && filteredProducts.length > 0) {
      navigate("/search-products", { state: { filteredProducts } }); // Navigate to search page
      setSearchQuery(""); // Clear search query
      setFilteredProducts([]); // Clear filtered products
    }
  };

  // Handle search query and filter products
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredProducts([]); // Don't show any products when search is empty
    } else {
      const filtered = productsItems.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.descp.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      // if (filtered.length > 0) {
      //   navigate("/search-products", { state: { filteredProducts: filtered } });
      // }
    }
  };
  const handleProductClick = (product) => {
    navigate("/productShowing", { state: { product } }, { state: { filteredProducts } });
    setSearchQuery(""); // Clear the search query
    setFilteredProducts([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredProducts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className='upperNav'>
        <div className="logo">
          <Link to="/"><h1>Teriento</h1></Link>
        </div>
        <div className="search" ref={searchRef}>
          <input
            type="text"
            placeholder="Search Products . . ."
            value={searchQuery}
            onChange={handleSearch}
            className='search-input'
            onKeyDown={handleSearchKeyPress}
          />

          {searchQuery && filteredProducts.length > 0 ? (
            <div className='search-box-main'>
              {filteredProducts.map(product => (
                <div key={product.id} className='search-box'>
                  <div onClick={() => handleProductClick(product)} className="search-box-img">
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: "100px", height: "100px", cursor: "pointer" }}
                    />
                  </div>
                  <div onClick={() => handleProductClick(product)} className="search-box-title">
                    <h4>{product.title}</h4>
                  </div>
                </div>
              ))}

            </div>
          ) : searchQuery && filteredProducts.length === 0 ? (
            <p>No products found</p>
          ) : null}
        </div>
        <div className="container">
          <nav>
            <ul>
              <li>
                {/* Show the profile icon or Google profile image */}
                <Link to="/authl" onClick={handleUserIconClick}>
                  {loading ? (
                    <span>Loading...</span> // Show loading text or spinner while fetching user
                  ) : user ? (
                    user.photoURL ? (
                      // Show Google profile image if available
                      <img
                        src={user.photoURL}
                        className="user-icon"
                        alt="User Icon"
                      />
                    ) : (
                      // If there's no photoURL, generate avatar with the first letter of name
                      <Avatar name={user.displayName || user.email} />
                    )
                  ) : (
                    <ion-icon size={30} name="person-outline"></ion-icon> // Default icon if user is not logged in
                  )}
                </Link>
              </li>
              <li>
                <Link to="/favItems">
                  <span className="fav-count">{favoritesCount}</span>
                  <ion-icon name="heart-circle-outline"></ion-icon>
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <span className="cart-count">{cartCount}</span>
                  <ion-icon name="cart-outline"></ion-icon>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>

      {/* Lower navigation (for categories) */}
      <nav className='lowerNav'>
        <div className="navlinks">
          <ul>
            <li><Link className='hover-effect' to="/">Home</Link></li>
            <div className="menu">
              <Link to="#" className='menu-item hover-effect'>Categories</Link>
              <div className="dropdown">
                <div className="box">
                  <div className="column">
                    <h2>Mens</h2>
                    <ul>
                      <li><Link to="/search-products?category=casual">Casual</Link></li>
                      <li><Link to="/search-products?category=formal">Formal</Link></li>
                      <li><Link to="/search-products?category=jacket">Jacket</Link></li>
                      <li><Link to="/search-products?category=perse">Perse</Link></li>
                      <li><Link to="/search-products?category=sunglasses">Sunglasses</Link></li>
                    </ul>
                    <img src={mensbanner} alt="" />
                  </div>
                  <div className="column">
                    <h2>Whomens</h2>
                    <ul>
                      <li><Link to="/search-products?category=bags">Bags</Link></li>
                      <li><Link to="/search-products?category=cosmetics">Cosmetics</Link></li>
                      <li><Link to="/search-products?category=handbags">Handbags</Link></li>
                      <li><Link to="/search-products?category=modern">Modern</Link></li>
                      <li><Link to="/search-products?category=traditional">Traditional</Link></li>
                    </ul>
                    <img src={whomensbanner} alt="" />
                  </div>
                  <div className="column">
                    <h2>Electronics</h2>
                    <ul>
                      <li><Link to="/search-products?category=camera">Camera</Link></li>
                      <li><Link to="/search-products?category=desktop">Desktop</Link></li>
                      <li><Link to="/search-products?category=headphone">Headphone</Link></li>
                      <li><Link to="/search-products?category=laptop">Laptop</Link></li>
                      <li><Link to="/search-products?category=tablet">Tablet</Link></li>
                    </ul>
                    <img src={electronicsbanner} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="menu">
              <Link to="#" className='menu-item hover-effect'>Jewelry</Link>
              <div className="dropdown dropSecond">
                <div className="box">
                  <ul>
                    <li><Link to="/search-products?category=bracelet">Bracelet</Link></li>
                    <li><Link to="/search-products?category=earrings">Earrings</Link></li>
                    <li><Link to="/search-products?category=necklace">Necklace</Link></li>
                    <li><Link to="/search-products?category=wedding-rings">Wedding Rings</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="menu">
              <Link to="#" className='menu-item hover-effect'>Perfumes</Link>
              <div className="dropdown dropThird">
                <div className="box">
                  <ul>
                    <li><Link to="/search-products?category=air-freshner">Air Freshner</Link></li>
                    <li><Link to="/search-products?category=cloth-perfume">Cloths Perfumes</Link></li>
                    <li><Link to="/search-products?category=deodorant">Deodorant</Link></li>
                    <li><Link to="/search-products?category=whomen-perfume">Whomen Perfumes</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </nav>

      {/* Mobile View */}
      <div className="mobileView">
        <div className="app">
          <div className="bottom-nav">
            <Link to="/" className='hover-effect'><ion-icon name="home-outline"></ion-icon></Link>
            <Link to="/authl" onClick={handleUserIconClick}>
              {loading ? (
                <span>Loading...</span>
              ) : user ? (
                user.photoURL ? (
                  <img src={user.photoURL} className="user-icon" alt="User Icon" />
                ) : (
                  <Avatar name={user.displayName || user.email} />
                )
              ) : (
                <ion-icon size={30} name="person-outline"></ion-icon>
              )}
            </Link>
            <Link to="/favItems" className='hover-effect'>
              <span className="fav-count">{favoritesCount}</span>
              <ion-icon name="heart-circle-outline"></ion-icon>
            </Link>
            <Link to="/cart" className='hover-effect'>
              <span className="cart-count">{cartCount}</span>
              <ion-icon name="cart-outline"></ion-icon>
            </Link>
            <button onClick={toggleSlider} className='hover-effect'>
              <ion-icon name="grid-outline"></ion-icon>
            </button>
          </div>
          {isSliderOpen && (
            <div className="slider">
              <div className="sliderLinks">
                <Link to="#" className='menu-itemMobile hover-effect2' onClick={toggleDropdown2}>Categories</Link>
                <Link to="#" className='menu-itemMobile hover-effect2' onClick={toggleDropdown3}>Jewelry</Link>
                <Link to="#" className='menu-itemMobile hover-effect2' onClick={toggleDropdown4}>Perfumes</Link>
              </div>
              {isDropdownOpen2 && (
                <div className="dropdownMobile">
                  <div className="boxMobile">
                    <div className="column1">
                      <h2>Mens</h2>
                      <ul>
                        <li><Link to="/search-products?category=casual">Casual</Link></li>
                        <li><Link to="/search-products?category=formal">Formal</Link></li>
                        <li><Link to="/search-products?category=jacket">Jacket</Link></li>
                        <li><Link to="/search-products?category=perse">Perse</Link></li>
                        <li><Link to="/search-products?category=sunglasses">Sunglasses</Link></li>
                      </ul>
                      <img src={mensbanner} alt="" />
                    </div>
                    <div className="column2">
                      <h2>Whomens</h2>
                      <ul>
                        <li><Link to="/search-products?category=bags">Bags</Link></li>
                        <li><Link to="/search-products?category=cosmetics">Cosmetics</Link></li>
                        <li><Link to="/search-products?category=handbags">Handbags</Link></li>
                        <li><Link to="/search-products?category=modern">Modern</Link></li>
                        <li><Link to="/search-products?category=traditional">Traditional</Link></li>
                      </ul>
                      <img src={whomensbanner} alt="" />
                    </div>
                    <div className="column3">
                      <h2>Electronics</h2>
                      <ul>
                        <li><Link to="/search-products?category=camera">Camera</Link></li>
                        <li><Link to="/search-products?category=desktop">Desktop</Link></li>
                        <li><Link to="/search-products?category=headphone">Headphone</Link></li>
                        <li><Link to="/search-products?category=laptop">Laptop</Link></li>
                        <li><Link to="/search-products?category=tablet">Tablet</Link></li>
                      </ul>
                      <img src={electronicsbanner} alt="" />
                    </div>
                  </div>
                </div>
              )}
              {isDropdownOpen3 && (
                <div className="dropdownMobile2">
                  <div className="column4">
                    <ul>
                      <li><Link to="/search-products?category=bracelet">Bracelet</Link></li>
                      <li><Link to="/search-products?category=earrings">Earrings</Link></li>
                      <li><Link to="/search-products?category=necklace">Necklace</Link></li>
                      <li><Link to="/search-products?category=wedding-rings">Wedding Rings</Link></li>
                    </ul>
                  </div>
                </div>
              )}
              {isDropdownOpen4 && (
                <div className="dropdownMobile3">
                  <div className="column4">
                    <ul>
                      <li><Link to="/search-products?category=air-freshner">Air Freshner</Link></li>
                      <li><Link to="/search-products?category=cloth-perfume">Cloths Perfumes</Link></li>
                      <li><Link to="/search-products?category=deodorant">Deodorant</Link></li>
                      <li><Link to="/search-products?category=whomen-perfume">Whomen Perfumes</Link></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  favoritesCount: PropTypes.number.isRequired,
  cartCount: PropTypes.number.isRequired,
};

export default Navbar;
