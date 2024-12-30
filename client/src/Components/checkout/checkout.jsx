
import { useLocation, useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "./checkout.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useEffect } from 'react';

const Checkout = ({ handleRemoveFromCart }) => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const product = location.state?.product;
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Checkout - Teriento";
  }, []);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    state: "",
    district: "",
    zipCode: "",
  });

  const [addressSaved, setAddressSaved] = useState(false);

  // Combine cartItems and single product into a unified list
  const itemsToCheckout = cartItems.length > 0 ? cartItems : product ? [product] : [];

  // Calculate total price
  const totalPrice = itemsToCheckout.reduce((sum, item) => {
    const cleanPrice =
      typeof item.price === "string" ? parseFloat(item.price.replace(/[^\d.-]/g, "")) : item.price;
    return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
  }, 0);

  // Handle Save Address
  const handleSaveAddress = () => {
    const isValidPhone = /^[6-9]\d{9}$/.test(address.phone); // Validate phone number
    const isValidZip = /^\d{6}$/.test(address.zipCode); // Validate ZIP code

    // Check if all required fields are filled and valid
    if (!address.firstName) {
      toast.error("First Name is required.");
      return;
    }
    if (!address.lastName) {
      toast.error("Last Name is required.");
      return;
    }
    if (!address.address) {
      toast.error("Address is required.");
      return;
    }
    if (!isValidPhone) {
      toast.error("Invalid Phone Number. Must be 10 digits starting with 6-9.");
      return;
    }
    if (!address.state) {
      toast.error("State is required.");
      return;
    }
    if (!address.district) {
      toast.error("District is required.");
      return;
    }
    if (!isValidZip) {
      toast.error("Invalid ZIP Code. Must be 6 digits.");
      return;
    }

    setAddressSaved(true);
    toast.success("Address saved successfully!");
  };

  // Handle Payment
  const handlePayment = () => {
    if (itemsToCheckout.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
    } else if (!addressSaved) {
      toast.error("Please save your delivery address before proceeding.");
    } else {
      toast.success("Proceeding to payment...");
      setTimeout(() => {
        navigate("/payment");
      }, 2000);
    }
  };

  // Handle Back to Cart
  const handleBackToCart = () => {
    navigate("/cart");
  };

  // Conditional rendering for empty cart or product
  if (itemsToCheckout.length === 0) {
    return (
      <div style={{ textAlign: "center", margin: "50px" }}>
        <p>Your cart is empty. Add products to proceed to checkout.</p>
        <Link to="/">Go back to the shop</Link>
      </div>
    );
  }

  const handleRemove = (id) => {
    handleRemoveFromCart(id);
    toast.error("Item removed from cart!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="checkout-main">
      <div className="checkout-container">
        <div className="checkout-left">
          <h1>Checkout Your Products</h1>
          <div className="checkout-table">
            {itemsToCheckout.map((item) => (
              <div className="product-row" key={item.id}>
                <td className="remove-item-checkout" onClick={() => handleRemove(item.id)} style={{ cursor: "pointer" }}>
                  <MdOutlineDelete />
                </td>
                <div className="check-prod-img">
                  <img src={item.icon} alt={item.title} />
                </div>
                <div className="product-info">
                  <h3>{item.title}</h3>
                  <h4>{item.descp}</h4>
                </div>
                <div className="product-price">₹{item.price}</div>
              </div>
            ))}
          </div>
          <div className="total-price-summary">
            <div className="back-to-cart">
              <button className="add-to-cart-btn" onClick={handleBackToCart}>
                <FaLongArrowAltLeft /> Back to Cart
              </button>
            </div>
            <div className="price-details">
              <p>Total Products: {itemsToCheckout.length} items</p>
              <h5>Delivery Charges: ₹0.0</h5>
              <h3>Total Price: ₹{totalPrice}</h3>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="address-section">
            {!addressSaved ? (
              <div className="address-form">
                <h2>Delivery Address</h2>
                <input
                  type="text"
                  placeholder="First Name"
                  value={address.firstName}
                  onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={address.lastName}
                  onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="District"
                  value={address.district}
                  onChange={(e) => setAddress({ ...address, district: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                />
                <button onClick={handleSaveAddress}>Save Address</button>
              </div>
            ) : (
              <div className="address-display">
                <h2>Delivery Address</h2>
                <p>Name: {`${address.firstName} ${address.lastName}`}</p>
                <p>State: {address.state}</p>
                <p>District: {address.district}</p>
                <p>Address: {address.address}</p>
                <p>ZIP Code: {address.zipCode}</p>
              </div>
            )}
          </div>
          <button
            className="proceed-payment-btn"
            onClick={handlePayment}
            disabled={!addressSaved}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default Checkout;










































// import { useLocation, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import "./checkout.css";
// import { FaLongArrowAltLeft } from "react-icons/fa";

// const Checkout = () => {
//   const location = useLocation();
//   const cartItems = location.state?.cartItems || [];
//   const navigate = useNavigate();

//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     phone: "",
//     state: "",
//     district: "",
//     zipCode: "",
//   });

//   const [addressSaved, setAddressSaved] = useState(false);

//   // const totalPrice = cartItems.reduce((sum, product) => {
//   //   const price = parseFloat(product.price.replace(/[^\d.-]/g, ""));
//   //   return isNaN(price) ? sum : sum + price;
//   // }, 0);
//   const totalPrice = cartItems.reduce((sum, product) => {
//     const cleanPrice = typeof product.price === "string"
//       ? parseFloat(product.price.replace(/[^\d.-]/g, ""))
//       : product.price;

//     return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
//   }, 0);



//   const handleSaveAddress = () => {
//     if (
//       address.firstName &&
//       address.lastName &&
//       address.address &&
//       address.phone &&
//       address.state &&
//       address.district &&
//       address.zipCode
//     ) {
//       setAddressSaved(true);
//       toast.success("Address saved successfully!");
//     } else {
//       toast.error("Please fill all the fields!");
//     }
//   };

//   const handleBacktoCart = () => {
//     navigate("/cart")
//   }

//   const handlePayment = () => {
//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty. Please add items before checking out.");
//     } else {
//       toast.success("Proceeding to checkout...");
//       setTimeout(() => {
//         navigate("/orderConfirmation");
//       }, 2000);
//     }
//   };

//   return (
//     <div className="checkout-main">
//       <div className="checkout-container">
//         <div className="checkout-left">
//           <h1>Checkout Your Products</h1>
//           <div className="checkout-table">
//             {/* {cartItems.map((product) => (
//               <div className="product-row" key={product.id}>
//                 <div className="check-prod-img">
//                   <img src={product.icon} alt={product.title} />
//                 </div>
//                 <div className="product-info">
//                   <h3>{product.title}</h3>
//                   <h4>{product.descp}</h4>
//                 </div>
//                 <div className="product-price">₹{product.price}</div>
//               </div>
//             ))} */}
//             {cartItems.map((product, index) => (
//               <div className="product-row" key={`${product.id}-${index}`}> {/* Ensure this is unique */}
//                 <div className="check-prod-img">
//                   <img src={product.icon} alt={product.title} />
//                 </div>
//                 <div className="product-info">
//                   <h3>{product.title}</h3>
//                   <h4>{product.descp}</h4>
//                 </div>
//                 <div className="product-price">₹{product.price}</div>
//               </div>
//             ))}

//           </div>
//           <div className="total-price-summary">
//             <div className="back-to-cart">
//               <button className="add-to-cart-btn" onClick={handleBacktoCart}><FaLongArrowAltLeft /> Back to Cart</button>
//             </div>
//             <div className="price-details">
//               <p>Total Products: {cartItems.length} items</p>
//               <h5>Delivery Charges: ₹0.0</h5>
//               <h3>Total Price: ₹{totalPrice}</h3>
//             </div>
//           </div>
//         </div>
//         <div className="checkout-right">
//           <div className="address-section">
//             {!addressSaved ? (
//               <div className="address-form">
//                 <h2>Delivery Address</h2>
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   value={address.firstName}
//                   onChange={(e) =>
//                     setAddress({ ...address, firstName: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   value={address.lastName}
//                   onChange={(e) =>
//                     setAddress({ ...address, lastName: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   value={address.address}
//                   onChange={(e) =>
//                     setAddress({ ...address, address: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   value={address.phone}
//                   onChange={(e) =>
//                     setAddress({ ...address, phone: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="State"
//                   value={address.state}
//                   onChange={(e) =>
//                     setAddress({ ...address, state: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="District"
//                   value={address.district}
//                   onChange={(e) =>
//                     setAddress({ ...address, district: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   placeholder="Zip Code"
//                   value={address.zipCode}
//                   onChange={(e) =>
//                     setAddress({ ...address, zipCode: e.target.value })
//                   }
//                 />
//                 <button onClick={handleSaveAddress}>Save Address</button>
//               </div>
//             ) : (
//               <div className="address-display">
//                 <h2>Delivery Address</h2>
//                 <p>Name: {`${address.firstName} ${address.lastName}`}</p>
//                 <p>State: {address.state}</p>
//                 <p>District: {address.district}</p>
//                 <p>Address: {address.address}</p>
//                 <p>ZIP Code: {address.zipCode}</p>
//               </div>
//             )}
//           </div>
//           <button className="proceed-payment-btn" onClick={handlePayment}>
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//       <Toaster position="top-right" />
//     </div>
//   );
// };

// Checkout.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       description: PropTypes.string,
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//         .isRequired,
//       icon: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default Checkout;























// first

// import { useLocation, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import './checkout.css';
// import { toast, ToastContainer } from 'react-toastify';

// const Checkout = () => {
//   const location = useLocation();
//   const cartItems = location.state?.cartItems || [];
//   const navigate = useNavigate();

//   // Debugging - log the cartItems to see the structure
//   console.log("Cart Items:", cartItems);

//   // Calculate total price of all products in the cart with more checks
//   const totalPrice = cartItems.reduce((sum, product) => {
//     // Log the product and its price
//     console.log(`Product: ${product.title}, Price: ${product.price}`);

//     // Remove ₹ and any non-numeric characters
//     const priceString = product.price.replace(/[^\d.-]/g, ''); // Remove ₹ and other non-numeric characters
//     const price = parseFloat(priceString); // Parse the remaining string to a float

//     // Check if the parsed price is a valid number
//     if (isNaN(price)) {
//       console.log(`Invalid price for ${product.title}. Using 0.`);
//       return sum; // If price is invalid, return the sum without adding anything
//     }

//     // Add the valid price to the sum
//     return sum + price;
//   }, 0);

//   const handleBuyNow = () => {
//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty. Please add items before checking out.", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "light",
//       });
//     } else {
//       toast.success("Proceeding to checkout...", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "light",
//       });
//       setTimeout(() => {
//         navigate("/orderConfirmation");
//       }, 2000);
//     }
//   };

//   if (!cartItems.length) {
//     return <p>Your cart is empty.</p>;
//   }

//   return (
//     <div className="main">
//       <div className="checkout-container">
//         <h1>Shopping Cart</h1>
//         <table className="checkout-table">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Unit Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((product) => (
//               <tr key={product.id}>
//                 <td><img src={product.icon} alt="" /></td>
//                 <td>{product.title}</td>
//                 <td>₹{product.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="total-price-summary">
//           <h3>Total Price: ₹{totalPrice}</h3>
//         </div>
//         <button className="checkout-btn" onClick={handleBuyNow}>
//           Checkout
//         </button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// // PropTypes for validation
// Checkout.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     })
//   ).isRequired,
// };

// export default Checkout;



// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import './checkout.css';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Checkout = () => {
//   const location = useLocation();
//   const cartItems = location.state?.cartItems || [];
//   const [address, setAddress] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     phone: '',
//     state: '',
//     district: '',
//     zipCode: ''
//   });
//   const [isAddressSaved, setIsAddressSaved] = useState(false);

//   const totalPrice = cartItems.reduce((sum, product) => {
//     const priceString = product.price.replace(/[^\d.-]/g, '');
//     const price = parseFloat(priceString);
//     return isNaN(price) ? sum : sum + price;
//   }, 0);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress({ ...address, [name]: value });
//   };

//   const handleSaveAddress = () => {
//     if (!address.firstName || !address.lastName || !address.address || !address.phone || !address.state || !address.district || !address.zipCode) {
//       toast.error("Please fill all the address fields.", {
//         position: "top-right",
//         autoClose: 2000,
//         theme: "light",
//       });
//       return;
//     }
//     setIsAddressSaved(true);
//     toast.success("Address saved successfully!", {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "light",
//     });
//   };

//   return (
//     <div className="main">
//       <div className="checkout-container">
//         <h1>Shopping Cart</h1>
//         <table className="checkout-table">
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Unit Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((product) => (
//               <tr key={product.id}>
//                 <td>{product.title}</td>
//                 <td>₹{product.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="total-price-summary">
//           <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
//         </div>

//         <div className="address-section">
//           {!isAddressSaved ? (
//             <div className="address-form">
//               <h2>Delivery Address</h2>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={address.firstName}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={address.lastName}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={address.address}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={address.phone}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 value={address.state}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="district"
//                 placeholder="District"
//                 value={address.district}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="zipCode"
//                 placeholder="ZIP Code"
//                 value={address.zipCode}
//                 onChange={handleInputChange}
//               />
//               <button className="save-address-btn" onClick={handleSaveAddress}>
//                 Save Address
//               </button>
//             </div>
//           ) : (
//             <div className="address-display">
//               <h2>Delivery Address</h2>
//               <p>Name: {`${address.firstName} ${address.lastName}`}</p>
//               <p>State: {address.state}</p>
//               <p>District: {address.district}</p>
//               <p>Address: {address.address}</p>
//               <p>ZIP Code: {address.zipCode}</p>
//             </div>
//           )}
//         </div>

//         <button className="proceed-payment-btn">Proceed to Payment</button>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// Checkout.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     })
//   ).isRequired,
// };

// export default Checkout;



// second


// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { increaseQuantity, decreaseQuantity, removeFromCart } from '../../redux/actions';
// import { toast, ToastContainer } from 'react-toastify';
// import PropTypes from 'prop-types';
// import './checkout.css';
// import { MdOutlineDelete } from 'react-icons/md';

// const Checkout = () => {
//   const location = useLocation();  // Get location data passed from Cart
//   const cartItems = location.state?.cartItems || [];  // Access cartItems from location state
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Define the totalPrice state
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Calculate initial total price
//   useState(() => {
//     const initialTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     setTotalPrice(initialTotal);
//   }, [cartItems]);

//   const handleIncrease = (id, price) => {
//     dispatch(increaseQuantity(id));
//     setTotalPrice(prevTotal => prevTotal + price);
//   };

//   const handleDecrease = (id, price) => {
//     dispatch(decreaseQuantity(id));
//     setTotalPrice(prevTotal => prevTotal - price);
//   };

//   const handleRemove = (id) => {
//     dispatch(removeFromCart(id));
//     toast.error("Item removed from cart!", {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "light",
//     });
//   };

//   const handleSaveAddress = () => {
//     toast.success("Address saved successfully!", {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "light",
//     });
//   };

//   const handleBuyNow = () => {
//     toast.success("Proceeding to checkout...", {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "light",
//     });

//     setTimeout(() => {
//       navigate("/orderConfirmation");
//     }, 2000);
//   };

//   if (!cartItems.length) {
//     return <p>Your cart is empty.</p>;  // Handle empty cart
//   }

//   return (
//     <div className="main">
//       <div className="checkout-container">
//         <h1>Shopping Cart</h1>
//         <div className="cart-and-address">
//           <table className="checkout-table">
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Product Name</th>
//                 <th>Unit Price</th>
//                 <th>Quantity</th>
//                 <th>Total Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => {
//                 const price = Number(item.price) || 0;
//                 const totalPriceForItem = (price * item.quantity).toFixed(2);

//                 return (
//                   <tr key={item.id}>
//                     <td
//                       className="remove-item"
//                       onClick={() => handleRemove(item.id)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <MdOutlineDelete />
//                     </td>
//                     <td className="product-info">
//                       <img
//                         src={item.icon}
//                         alt={item.title}
//                         style={{ cursor: "pointer" }}
//                       />
//                       <span>{item.title}</span>
//                     </td>
//                     <td className="unit-price">₹{item.price}</td>
//                     <td className="quantity-control">
//                       <button
//                         onClick={() => handleDecrease(item.id, price)}
//                         style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
//                       >
//                         -
//                       </button>
//                       {item.quantity}
//                       <button
//                         onClick={() => handleIncrease(item.id, price)}
//                         style={{ margin: "5px", padding: "10px", fontSize: "16px" }}
//                       >
//                         +
//                       </button>
//                     </td>
//                     <td className="total-price">₹{totalPriceForItem}</td>
//                     <td>
//                       <button className="buy-now-btn" onClick={handleBuyNow}>
//                         Proceed to Payment
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           <div className="address-section">
//             <h2>Delivery Address</h2>
//             <form>
//               <input type="text" placeholder="First Name" required />
//               <input type="text" placeholder="Last Name" required />
//               <input type="text" placeholder="Address" required />
//               <input type="text" placeholder="Zipcode" required />
//               <input type="text" placeholder="State" required />
//               <input type="text" placeholder="Area" required />
//               <button type="button" onClick={handleSaveAddress}>
//                 Save the Address
//               </button>
//             </form>
//             <button className="checkout-btn" onClick={handleBuyNow}>
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="total-price-summary">
//         Total Price: ₹{totalPrice.toFixed(2)}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// // PropTypes for validation
// Checkout.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       price: PropTypes.number.isRequired,
//       icon: PropTypes.string.isRequired,
//       quantity: PropTypes.number,
//     })
//   ).isRequired,
// };

// export default Checkout;
