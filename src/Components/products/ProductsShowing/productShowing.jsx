// import { useLocation, Navigate , useNavigate} from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import './productShowing.css';
// import PropTypes from 'prop-types';
// import { toast, Toaster } from "react-hot-toast";

// const ProductShowing = ({ handleAddToCart, cartItems }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const product = location.state?.product;
//     const stock = 3; // Assuming stock is hardcoded as 3 for this example
//     console.log('Product passed to checkout:', product);

//     if (!product) {
//         return <Navigate to="/" />;
//     }

//     const handleAddToCartClick = () => {
//         if (typeof handleAddToCart === 'function') {
//             handleAddToCart(product); 
//             toast.success(`${product.title} added to your cart!`);
//         } else {
//             console.error('handleAddToCart is not a function');
//         }
//     };
//     // Track whether the product is in the cart
//     const isProductInCart = cartItems.some(item => item.id === product.id);

//     const handleBuyNow = () => {
//         if (!isProductInCart) {
//             toast.error("Please add the product to your cart before proceeding to checkout!");
//         } else {
//             toast.success("Proceeding to checkout...", {
//                 position: "top-right",
//                 autoClose: 2000,
//             });

//             setTimeout(() => {
//                 navigate("/checkout", { state: { product } }); // Pass product data to checkout
//             }, 2000);
//         }
//     };

//     return (
//         <div className="container2">
//             <div className="breadcrumb">
//                 <Link to="/">Home</Link>
//                 <span>›</span>
//                 <span>{product.title}</span>
//             </div>

//             <div className="product-grid">
//                 <div className="product-images">
//                     <div className="main-image">
//                         <img src={product.icon} alt={product.title} />
//                         <div className="show-img">
//                             <img src={product.icon} alt={product.title} />
//                             <img src={product.icon} alt={product.title} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="prod-show-product-info">
//                     <h1>{product.title}</h1>
//                     <div className="description">{product.descp}</div>
//                     <div className="price">
//                         <span className="sale-price">{product.price}</span>
//                     </div>
//                     <div className="quantity">
//                         <label htmlFor="quantity">Quantity: </label>
//                         <select id="quantity">
//                             {[1, 2, 3, 4, 5].map((qty) => (
//                                 <option key={qty} value={qty} disabled={qty > stock}>
//                                     {qty} {qty > stock && '(Out of Stock)'}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="prod-show-buttons">
//                         <button className="add-to-cart2" onClick={handleAddToCartClick}>
//                             Add to Cart
//                         </button>
//                         <button className="prod-show-buy-now" onClick={handleBuyNow}>
//                             Buy Now
//                         </button>
//                         <Toaster position="top-right" />
//                     </div>
//                     <div className="demo-notice">
//                         <strong>Note:</strong> This is a demo site. <Link to="/">Learn more</Link>.
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Define prop types for the component
// ProductShowing.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       icon: PropTypes.string.isRequired,
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//         .isRequired,
//       quantity: PropTypes.number, // Track quantity in cart
//     })
//   ).isRequired,
//     handleAddToCart: PropTypes.func.isRequired,
// };

// export default ProductShowing;











import { useState } from "react";
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './productShowing.css';
import PropTypes from 'prop-types';
import { toast } from "react-hot-toast";
import AOS from "aos";
import { useEffect } from "react";

const ProductShowing = ({ handleAddToCart, cartItems }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state?.product;
    const stock = 3; // Assuming stock is hardcoded as 3 for this example
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease",
            once: true,
        });
    }, []);
    // Track whether the product is in the cart (useState is called unconditionally here)
    const [isProductAddedToCart, setIsProductAddedToCart] = useState(
        cartItems.some(item => item.id === product?.id) // Initial state based on whether the product is already in cart
    );

    // Early return should come after hook call
    if (!product) {
        return <Navigate to="/" />;
    }

    const handleAddToCartClick = () => {
        if (typeof handleAddToCart === 'function') {
            handleAddToCart(product);
            setIsProductAddedToCart(true);  // Update the state to indicate product has been added to cart
            // toast.success(`${product.title} added to your cart!`);
        } else {
            console.error('handleAddToCart is not a function');
        }
    };

    const handleBuyNow = () => {
        if (!isProductAddedToCart) {
            toast.error("Please add the product to your cart before proceeding to checkout!");
        } else {
            toast.success("Proceeding to checkout...", {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate("/checkout", { state: { product } }); // Pass product data to checkout
            }, 2000);
        }
    };

    return (
        <div className="container2">
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span>›</span>
                <span>{product.title}</span>
            </div>

            <div className="product-grid">
                <div className="product-images" data-aos="zoom-in-right">
                    <div className="main-image">
                        <img src={product.icon} alt={product.title} />
                        <div className="show-img">
                            <img src={product.icon} alt={product.title} />
                            <img src={product.icon} alt={product.title} />
                        </div>
                    </div>
                </div>

                <div className="prod-show-product-info" data-aos="zoom-in-left">
                    <h1>{product.title}</h1>
                    <div className="description">{product.descp}</div>
                    <div className="price">
                        <span className="sale-price">{product.price}</span>
                    </div>
                    <div className="quantity">
                        <label htmlFor="quantity">Quantity: </label>
                        <select id="quantity">
                            {[1, 2, 3, 4, 5].map((qty) => (
                                <option key={qty} value={qty} disabled={qty > stock}>
                                    {qty} {qty > stock && '(Out of Stock)'}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="prod-show-buttons">
                        <button className="add-to-cart2" onClick={handleAddToCartClick}>
                            Add to Cart
                        </button>
                        <button className="prod-show-buy-now" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                    </div>

                    <div className="demo-notice">
                        <strong>Note:</strong> This is a demo site. <Link to="/">Learn more</Link>.
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define prop types for the component
ProductShowing.propTypes = {
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
    handleAddToCart: PropTypes.func.isRequired,
};

export default ProductShowing;
