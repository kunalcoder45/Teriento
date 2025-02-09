import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './testApiProd.css';

const TestApiProd = ({ cartItems = [], handleAddToCart }) => {
    // State to hold products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

    // Function to check if the product is already in the cart
    const isInCart = (productId) => {
        return safeCartItems.some((item) => item.id === productId);
    };

    // Fetch products on component mount
    useEffect(() => {
        axios
            .get('http://localhost:3001/api/products') // URL of your backend API
            .then((response) => {
                setProducts(response.data.products); // Assuming your API returns products in 'products' field
                setLoading(false); // Stop the loading spinner once data is fetched
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Failed to fetch products'); // Handling actual error message
                setLoading(false); // Stop loading if there's an error
            });
    }, []);

    // Handle loading and error states
    if (loading) return <div className="loading"><div className="spinner"></div></div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Products</h1>
            <div className="products">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.iconUrl ? `http://localhost:3001/${product.iconUrl}` : '/path/to/default-image.jpg'}
                            alt={product.title}
                            className="product-image"
                        />
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>₹{product.price}</p>
                        <p>{product.category}</p>
                        <button
                            className="cart-btn"
                            onClick={() => handleAddToCart(product)} // Pass the correct product object
                            disabled={isInCart(product._id)} // Check against product._id
                        >
                            🛒
                        </button>
                        <p>Quantity: {product.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Prop validation
TestApiProd.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired, // Cart item ID
        })
    ),
    handleAddToCart: PropTypes.func.isRequired, // Must be a function
};

export default TestApiProd;
