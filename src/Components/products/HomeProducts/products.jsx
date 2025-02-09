import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./products.css";
import { useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

// Product images and details
import belt from "../assets/belt.jpg";
import cloth1 from "../assets/clothes-1.jpg";
import cloth2 from "../assets/clothes-2.jpg";
import cloth3 from "../assets/clothes-3.jpg";
import cloth4 from "../assets/clothes-4.jpg";
import jacket1 from "../assets/jacket-1.jpg";
import jacket2 from "../assets/jacket-2.jpg";
import jacket3 from "../assets/jacket-3.jpg";
import jacket4 from "../assets/jacket-4.jpg";
import jacket5 from "../assets/jacket-5.jpg";
import jacket6 from "../assets/jacket-6.jpg";
import jewellery1 from "../assets/jewellery-1.jpg";
import jewellery2 from "../assets/jewellery-2.jpg";
import VD1 from "../assets/vd1.mp4";
import VD2 from "../assets/vd2.mp4";
import VD3 from "../assets/vd3.mp4";
import shirt1 from "../assets/shirt-1.jpg";
import shirt2 from "../assets/shirt-2.jpg";
import shoe1 from "../assets/shoe-1.jpg";
import shoe2 from "../assets/shoe-2.jpg";
import shoe3 from "../assets/shoe-3.jpg";
import shoe4 from "../assets/shoe-4.jpg";
import shorts1 from "../assets/shorts-1.jpg";
import shorts2 from "../assets/shorts-2.jpg";
import jewellery3 from "../assets/jewellery-3.jpg";
import partyWear from "../assets/party-wear-1.jpg";
import shampoo from "../assets/shampoo.jpg";
import watch1 from "../assets/watch-1.jpg";
import watch2 from "../assets/watch-2.jpg";
import sports2 from "../assets/sports-2.jpg";
import sports3 from "../assets/sports-3.jpg";

const productsItems = [
  { id: 4, title: "Belt", descp: "A durable and sleek belt to complete your look.", category: 'belt', icon: belt, price: "₹800", link: "./productShowing.jsx" },
  { id: 5, title: "Cloth", category: 'whomen', descp: "Lightweight fabric, ideal for summer wear.", icon: cloth1, price: "₹600", link: "./productShowing.jsx" },
  { id: 6, title: "Cloth", category: 'whomen', descp: "Premium quality fabric for everyday comfort.", icon: cloth2, price: "₹650", link: "./productShowing.jsx" },
  { id: 7, title: "Cloth", category: 'whomen', descp: "A versatile fabric for creating stylish outfits.", icon: cloth3, price: "₹700", link: "./productShowing.jsx" },
  { id: 8, title: "Cloth", category: 'whomen', descp: "High-quality material for elegant designs.", icon: cloth4, price: "₹750", link: "./productShowing.jsx" },
  { id: 9, title: "Jacket", category: 'Men', descp: "A fashionable jacket for chilly weather.", icon: jacket1, price: "₹2000", link: "./productShowing.jsx" },
  { id: 10, title: "Jacket", category: 'Men', descp: "A rugged jacket, perfect for outdoor adventures.", icon: jacket2, price: "₹2200", link: "./productShowing.jsx" },
  { id: 11, title: "Jacket", category: 'Men', descp: "A lightweight jacket for all-season wear.", icon: jacket3, price: "₹2100", link: "./productShowing.jsx" },
  { id: 12, title: "Jacket", category: 'Men', descp: "A classic jacket with a modern twist.", icon: jacket4, price: "₹2300", link: "./productShowing.jsx" },
  { id: 13, title: "Jacket", category: 'whomen', descp: "A stylish addition to any wardrobe.", icon: jacket5, price: "₹2400", link: "./productShowing.jsx" },
  { id: 14, title: "Jacket", category: 'whomen', descp: "Warm and durable for winter days.", icon: jacket6, price: "₹2500", link: "./productShowing.jsx" },
  { id: 15, title: "Jewellery", category: 'jewellery', descp: "Elegant earrings to enhance your outfit.", icon: jewellery1, price: "₹1500", link: "./productShowing.jsx" },
  { id: 16, title: "Jewellery", category: 'jewellery', descp: "A delicate necklace for any occasion.", icon: jewellery2, price: "₹1800", link: "./productShowing.jsx" },
  { id: 17, title: "Jewellery", category: 'jewellery', descp: "A timeless bracelet for everyday wear.", icon: jewellery3, price: "₹2000", link: "./productShowing.jsx" },
  { id: 18, title: "Party Wear", category: 'shoe', descp: "A glamorous outfit for special occasions.", icon: partyWear, price: "₹3000", link: "./productShowing.jsx" },
  { id: 20, title: "Shampoo", category: 'shampoo', descp: "Nourishing shampoo for healthy, shiny hair.", icon: shampoo, price: "₹300", link: "./productShowing.jsx" },
  { id: 21, title: "Shirt", category: 'Men', descp: "A classic button-up shirt for all settings.", icon: shirt1, price: "₹1200", link: "./productShowing.jsx" },
  { id: 22, title: "Shirt", category: 'Men', descp: "A stylish shirt with a comfortable fit.", icon: shirt2, price: "₹1250", link: "./productShowing.jsx" },
  { id: 23, title: "Shoe", category: 'shoe', descp: "Sleek sneakers for active lifestyles.", icon: shoe1, price: "₹2500", link: "./productShowing.jsx" },
  { id: 24, title: "Shoe", category: 'shoe', descp: "Trendy shoes for everyday wear.", icon: shoe2, price: "₹2300", link: "./productShowing.jsx" },
  { id: 25, title: "Shoe", category: 'shoe', descp: "Durable and comfortable sports shoes.", icon: shoe3, price: "₹2400", link: "./productShowing.jsx" },
  { id: 26, title: "Shoe", descp: "Lightweight shoes for effortless walking.", icon: shoe4, category: 'shoe', price: "₹2200", link: "./productShowing.jsx" },
  { id: 27, title: "Shorts", category: 'short', descp: "Casual shorts for relaxed summer vibes.", icon: shorts1, price: "₹700", link: "./productShowing.jsx" },
  { id: 28, title: "Shorts", category: 'short', descp: "Stylish shorts for sports and leisure.", icon: shorts2, price: "₹750", link: "./productShowing.jsx" },
  { id: 33, title: "Watch", category: 'watch', descp: "A classic timepiece for everyday use.", icon: watch1, price: "₹3000", link: "./productShowing.jsx" },
  { id: 34, title: "Watch", category: 'watch', descp: "A stylish watch to complement outfits.", icon: watch2, price: "₹3200", link: "./productShowing.jsx" },
  { id: 29, title: "Sportswear", category: 'sports-shoe', descp: "High-performance sportswear for routines.", icon: sports2, price: "₹2000", link: "./productShowing.jsx" },
  { id: 30, title: "Sportswear", category: 'sports-shoe', descp: "Comfortable sports attire for workouts.", icon: sports3, price: "₹1900", link: "./productShowing.jsx" },
];

const slides = [
  { video: VD1, title: "Air Jordan", price: "$600.00" },
  { video: VD2, title: "Casual Watch", price: "$350.00" },
  { video: VD3, title: "Stylish Shoe", price: "$999.00" },
];

const Products = ({ handleAddToFavorites, showToast, cartItems, setCartCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,  
    });
  }, []);

  // Check if cartItems is an array and if it's empty, initialize it
  cartItems = Array.isArray(cartItems) ? cartItems : [];

  // Function to handle adding items to the cart
  const handleAddToCart = (product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      cartItems.push(product);
      setCartCount((prevCount) => prevCount + 1);  // Update cartCount state
      showToast(`${product.title} added to cart!`);
    } else {
      showToast(`${product.title} is already in the cart!`);
    }
  };

  // Function to check if the product is already in the cart
  const isInCart = (productId) => {
    return Array.isArray(cartItems) && cartItems.some((item) => item.id === productId);
  };



  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));


  return (
    <div>
      <h2 className="head">Featured</h2>
      <div className="main">
        <div className="prod-Container">
          {productsItems.map((item) => (
            <div className={`products ${item.id === 4 ? "special-product" : ""}`} key={item.id}>
              <div data-aos="fade-up" className="prod-Items">
                <div className="prod-Img-box">
                  <img src={item.icon} alt={item.title} />
                  <div className="hover-actions">
                    <button
                      className="fav-btn"
                      onClick={() => handleAddToFavorites(item)}
                    >
                      ❤️
                    </button>
                    <button
                      className="cart-btn"
                      onClick={() => handleAddToCart(item)}
                      disabled={isInCart(item.id)}
                    >
                      🛒
                    </button>
                  </div>
                </div>
                <div className="prod-content">
                  <div className={`titleProducts ${item.id === 4 ? "special-title" : ""}`}>
                    <p>{item.title}</p>
                  </div>
                  <div className="descpProducts">
                    <p>{item.descp}</p>
                  </div>
                  <div className="price">
                    <p>{item.price}</p>
                  </div>
                  <div className="showProduct">
                    <Link to="/productShowing" state={{ product: item }}>Show . </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sidebar" data-aos="zoom-in">
          <div className="center">
            <p>Hot Deals. 🚀</p>
            <div className="slider-container">
              <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                  <div className="slide" key={index}>
                    <video autoPlay muted loop>
                      <source src={slide.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="details">
                      <h3>{slide.title}</h3>
                      <p>{slide.price}</p>
                      <div className="add-to-cart-side">
                        <button onClick={() => handleAddToCart(slide)}>
                          <ion-icon name="cart-outline"></ion-icon> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="navigation">
                <button className="nav-btn" onClick={prevSlide}>❮</button>
                <button className="nav-btn" onClick={nextSlide}>❯</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Products.propTypes = {
  handleAddToFavorites: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  setCartCount: PropTypes.func.isRequired,  // Adding the setter function for cartCount
};

export default Products;
