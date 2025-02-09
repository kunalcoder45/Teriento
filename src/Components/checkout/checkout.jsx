// import { useLocation, useNavigate, Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { MdOutlineDelete } from "react-icons/md";
// import { useState, useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import AOS from "aos";
// import { FaLongArrowAltLeft } from "react-icons/fa";
// import "./checkout.css";

// const Checkout = ({ handleRemoveFromCart }) => {
//   const location = useLocation();
//   const cartItems = location.state?.cartItems || [];
//   const product = location.state?.product;
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "Checkout - Teriento";
//     AOS.init({
//       duration: 1000,
//       easing: "ease",
//       once: true,
//     });
//   }, []);

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

//   const itemsToCheckout = cartItems.length > 0 ? cartItems : product ? [product] : [];

//   const totalPrice = itemsToCheckout.reduce((sum, item) => {
//     const cleanPrice =
//       typeof item.price === "string" ? parseFloat(item.price.replace(/[^\d.-]/g, "")) : item.price;
//     return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
//   }, 0);

//   const handleSaveAddress = () => {
//     const isValidPhone = /^[6-9]\d{9}$/.test(address.phone);
//     const isValidZip = /^\d{6}$/.test(address.zipCode);

//     if (!address.firstName || !address.lastName || !address.address || !address.state || !address.district) {
//       toast.error("All address fields are required.");
//       return;
//     }

//     if (!isValidPhone) {
//       toast.error("Invalid Phone Number. Must be 10 digits starting with 6-9.");
//       return;
//     }

//     if (!isValidZip) {
//       toast.error("Invalid ZIP Code. Must be 6 digits.");
//       return;
//     }

//     setAddressSaved(true);
//     toast.success("Address saved successfully!");
//   };

//   const handlePayment = () => {
//     if (itemsToCheckout.length === 0) {
//       toast.error("Your cart is empty. Please add items before checking out.");
//     } else if (!addressSaved) {
//       toast.error("Please save your delivery address before proceeding.");
//     } else {
//       toast.success("Proceeding to payment...");
//       setTimeout(() => {
//         navigate("/payment", { state: { totalPrice } });
//       }, 2000);
//     }
//   };

//   const handleBackToCart = () => {
//     navigate("/cart");
//   };

//   if (itemsToCheckout.length === 0) {
//     return (
//       <div style={{ textAlign: "center", margin: "50px" }}>
//         <p>Your cart is empty. Add products to proceed to checkout.</p>
//         <Link to="/">Go back to the shop</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-main">
//       <div className="checkout-container">
//         <div className="checkout-left" data-aos="zoom-out-right">
//           <h1>Checkout Your Products</h1>
//           <div className="checkout-table">
//             {itemsToCheckout.map((item) => (
//               <div className="product-row" key={item.id}>
//                 <td
//                   className="remove-item-checkout"
//                   onClick={() => handleRemoveFromCart(item.id)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <MdOutlineDelete />
//                 </td>
//                 <div className="check-prod-img">
//                   <img src={item.icon} alt={item.title} />
//                 </div>
//                 <div className="product-info">
//                   <h3>{item.title}</h3>
//                   <h4>{item.descp}</h4>
//                 </div>
//                 <div className="product-price">₹{item.price}</div>
//               </div>
//             ))}
//           </div>
//           <div className="total-price-summary">
//             <div className="back-to-cart">
//               <button className="add-to-cart-btn" onClick={handleBackToCart}>
//                 <FaLongArrowAltLeft /> Back to Cart
//               </button>
//             </div>
//             <div className="price-details">
//               <p>Total Products: {itemsToCheckout.length} items</p>
//               <h5>Delivery Charges: ₹0.0</h5>
//               <h3>Total Price: ₹{totalPrice}</h3>
//             </div>
//           </div>
//         </div>

//         <div className="checkout-right" data-aos="zoom-out-left">
//           <div className="address-section">
//             {!addressSaved ? (
//               <div className="address-form">
//                 <h2>Delivery Address</h2>
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   value={address.firstName}
//                   onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   value={address.lastName}
//                   onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   value={address.address}
//                   onChange={(e) => setAddress({ ...address, address: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone Number"
//                   value={address.phone}
//                   onChange={(e) => setAddress({ ...address, phone: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="State"
//                   value={address.state}
//                   onChange={(e) => setAddress({ ...address, state: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="District"
//                   value={address.district}
//                   onChange={(e) => setAddress({ ...address, district: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Zip Code"
//                   value={address.zipCode}
//                   onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
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
//           <button className="proceed-payment-btn" onClick={handlePayment} disabled={!addressSaved}>
//             Proceed to Payment
//           </button>
//           <canvas id="qr-code" style={{ marginTop: "20px" }}></canvas>
//         </div>
//       </div>
//       <Toaster position="top-right" />
//     </div>
//   );
// };

// Checkout.propTypes = {
//   handleRemoveFromCart: PropTypes.func.isRequired,
// };

// export default Checkout;

















import { useLocation, useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import AOS from "aos";
import { FaLongArrowAltLeft } from "react-icons/fa";
import "./checkout.css";
import axios from "axios";

const Checkout = ({ handleRemoveFromCart }) => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  const product = location.state?.product;
  const navigate = useNavigate();

  // Initialize AOS animation
  useEffect(() => {
    document.title = "Checkout - Teriento";
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  // State for delivery address
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

  // Determine items to checkout
  const itemsToCheckout = cartItems.length > 0 ? cartItems : product ? [product] : [];

  // Calculate total price
  const totalPrice = itemsToCheckout.reduce((sum, item) => {
    const cleanPrice =
      typeof item.price === "string" ? parseFloat(item.price.replace(/[^\d.-]/g, "")) : item.price;
    return sum + (isNaN(cleanPrice) ? 0 : cleanPrice);
  }, 0);

  // Save address with validation
  const handleSaveAddress = () => {
    const isValidPhone = /^[6-9]\d{9}$/.test(address.phone);
    const isValidZip = /^\d{6}$/.test(address.zipCode);

    if (!address.firstName || !address.lastName || !address.address || !address.state || !address.district) {
      toast.error("All address fields are required.");
      return;
    }

    if (!isValidPhone) {
      toast.error("Invalid Phone Number. Must be 10 digits starting with 6-9.");
      return;
    }

    if (!isValidZip) {
      toast.error("Invalid ZIP Code. Must be 6 digits.");
      return;
    }

    setAddressSaved(true);
    toast.success("Address saved successfully!");
  };

  // Send order details to the seller dashboard
  const sendOrderToSeller = async (orderDetails) => {
    try {
      const response = await axios.post("http://localhost:3001/api/orders", orderDetails);
      if (response.status === 200) {
        toast.success("Order sent to seller dashboard successfully!");
      }
    } catch (error) {
      console.error("Failed to send order to seller:", error.response?.data || error.message);
      toast.error("Failed to send order to seller.");
    }
  };
  

  // Proceed to payment
  const handlePayment = () => {
    if (itemsToCheckout.length === 0) {
      toast.error("Your cart is empty. Please add items before checking out.");
    } else if (!addressSaved) {
      toast.error("Please save your delivery address before proceeding.");
    } else {
      const orderDetails = {
        orderId: `ORD-${Date.now()}`, // Generate unique order ID
        items: itemsToCheckout.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        totalPrice,
        address,
        createdAt: new Date().toISOString(),
      };

      sendOrderToSeller(orderDetails);

      toast.success("Proceeding to payment...");
      setTimeout(() => {
        navigate("/payment", { state: { totalPrice } });
      }, 2000);
    }
  };

  // Navigate back to the cart
  const handleBackToCart = () => {
    navigate("/cart");
  };

  // If no items are present in the cart
  if (itemsToCheckout.length === 0) {
    return (
      <div style={{ textAlign: "center", margin: "50px" }}>
        <p>Your cart is empty. Add products to proceed to checkout.</p>
        <Link to="/">Go back to the shop</Link>
      </div>
    );
  }

  const handleSubmitOrder = async () => {
    const orderDetails = {
      items: itemsToCheckout.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      totalPrice,
      address: address, // Use address instead of userData
    };
  };
  

  return (
    <div className="checkout-main">
      <div className="checkout-container">
        {/* Left Section: Items */}
        <div className="checkout-left" data-aos="zoom-out-right">
          <h1>Checkout Your Products</h1>
          <div className="checkout-table">
            {itemsToCheckout.map((item) => (
              <div className="product-row" key={item.id}>
                <td
                  className="remove-item-checkout"
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={{ cursor: "pointer" }}
                >
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

        {/* Right Section: Address */}
        <div className="checkout-right" data-aos="zoom-out-left">
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
                <button onClick={handleSubmitOrder}>submit</button>
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
          <button className="proceed-payment-btn" onClick={handlePayment} disabled={!addressSaved}>
            Proceed to Payment
          </button>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

Checkout.propTypes = {
  handleRemoveFromCart: PropTypes.func.isRequired,
};

export default Checkout;
