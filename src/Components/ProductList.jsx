import { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);  // State to hold products
    const [loading, setLoading] = useState(true);  // State to handle loading state
    const [error, setError] = useState(null);      // State to handle error

    // Use VITE_API_URL environment variable
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/products';

    // Fetch products from the backend using useEffect
    useEffect(() => {
        axios.get(apiUrl)
            .then((response) => {
                setProducts(response.data);  // Set fetched data into state
                setLoading(false);            // Set loading to false once data is fetched
            })
            .catch((err) => {
                setError(err.message);       // Handle any error
                setLoading(false);            // Set loading to false in case of error
            });
    }, [apiUrl]);  // Dependency on apiUrl so the effect runs when it changes

    if (loading) {
        return <div className='loading'><div className='spinner'></div></div>;  // Show loading message while data is being fetched
    }

    if (error) {
        return <div>Error: {error}</div>;  // Show error message if fetching fails
    }
    return (
        <div>
            <h2>Product List</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Quantity:</strong> {product.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
