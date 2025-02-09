import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";


const FavItems = ({ favItems, handleRemoveFromFavorites, cartItems, handleAddToCart }) => {
  const navigate = useNavigate();
    useEffect(() => {
      document.title = "Favourite - Teriento";
    }, []);
  // Track whether a product is in the cart
  const [isProductAddedToCart, setIsProductAddedToCart] = useState(false);

  // Navigate to product detail page
  const handleImageClick = (product) => {
    navigate('/productShowing', { state: { product } }); // Navigate with product data
  };

  // Check if a product is in the cart
  useEffect(() => {
    // Check if any of the favItems are in the cart
    setIsProductAddedToCart(favItems.some(item => cartItems.some(cartItem => cartItem.id === item.id)));
  }, [favItems, cartItems]);

  // Handle Buy Now functionality with redirect and delay
  const handleBuyNow = () => {
    if (!isProductAddedToCart) {
      toast.error("Please add the product to your cart before proceeding to checkout!");
    } else {
      toast.success("Proceeding to checkout...", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/checkout", { state: { cartItems } });
      }, 2000);
    }
  };

  const handleAddToCartClick = (item) => {
    handleAddToCart(item);
    setIsProductAddedToCart(true); // Mark as added to cart
    toast.success(`${item.title} added to your cart!`);
  };

  return (
    <div>
      <div className="main">
        <div className="cart-container-cart-section">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span> › </span>
            <span>Favorites</span>
          </div>
          <h1>Your Favorites</h1>
          {favItems?.length === 0 ? (
            <p>Your favorites list is empty.</p>
          ) : (
            <table className="cart-table-cart-sec">
              <thead>
                <tr>
                  <th></th>
                  <th>Product Name</th>
                  <th>Unit Price</th>
                  <th>Stock Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {favItems?.map((item, index) => (
                  <tr key={index}>
                    <td className="remove-item" onClick={() => handleRemoveFromFavorites(item.id)} style={{ cursor: 'pointer' }}>
                      <MdOutlineDelete />
                    </td>
                    <td className="product-info-cart">
                      <img
                        src={item.icon}
                        alt={item.title}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleImageClick(item)} // Navigate to detail page on image click
                      />
                      <span>{item.title}</span>
                    </td>
                    <td className="unit-price">₹{item.price}</td>
                    <td className="stock-status">In Stock</td>
                    <td>
                      {/* Check if product is in cart, if not show "Add to Cart" */}
                      {isProductAddedToCart ? (
                        <button className="buy-now-btn" onClick={handleBuyNow}>
                          Buy Now
                        </button>
                      ) : (
                        <button className="add-to-cart-btn" onClick={() => handleAddToCartClick(item)}>
                          Add to Cart
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Toaster position='top-right'/>
        </div>
      </div>
    </div>
  );
};

// Prop validation
FavItems.propTypes = {
  favItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      quantity: PropTypes.number, // Track quantity in cart
    })
  ).isRequired,
  handleRemoveFromFavorites: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default FavItems;
