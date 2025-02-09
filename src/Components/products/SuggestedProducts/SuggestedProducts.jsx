import './SuggestedProducts.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SuggestedProducts = ({ handleAddToFavorites, handleAddToCart, cartItems, productsItems }) => {
  // Ensure cartItems and productsItems are arrays to avoid errors
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const safeProductsItems = Array.isArray(productsItems) ? productsItems : [];

  // Slice the array to show only the first 8 products
  const displayedProducts = safeProductsItems.slice(0, 8);

  // Function to check if the product is already in the cart
  const isInCart = (productId) => {
    return safeCartItems.some((item) => item.id === productId);
  };

  return (
    <div className="main-suggested-prod">
      <h2>Suggested Products</h2>
      {displayedProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="prod-Container">
          {displayedProducts.map((item) => (
            <div
              className={`products ${item.id === 4 ? "special-product" : ""}`}
              key={item.id}
            >
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
                    <p>₹{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
                  </div>
                  <div className="showProduct">
                    <Link to="/productShowing" state={{ product: item }}>
                      Show
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Prop validation
SuggestedProducts.propTypes = {
  handleAddToFavorites: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
  productsItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      descp: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
};

SuggestedProducts.defaultProps = {
  cartItems: [],
  productsItems: [],
};

export default SuggestedProducts;
