import { useState } from 'react';
import ProductShowing from './productShowing';


const ParentComponent = () => {
    const [cartItems, setCartItems] = useState([]);

    // Function to handle adding products to the cart
    const handleAddToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <p>Items in Cart: {cartItems.length}</p> {/* Display the number of items in the cart */}
            
            {/* Passing handleAddToCart as a prop to ProductShowing */}
            <ProductShowing handleAddToCart={handleAddToCart} />
        </div>
    );
};

export default ParentComponent;
