import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import "./Cart.css";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from 'react';

const Cart = ({ cartItems, handleRemoveFromCart, setCartCount, setCartItems }) => {
  const navigate = useNavigate();
    useEffect(() => {
      document.title = "Cart - Teriento";
    }, []);

  const handleImageClick = (product) => {
    navigate("/productShowing", { state: { product } });
  };
  const handleAddAgain = (product) => {
    const newProduct = { ...product }; // Create a new product object
    setCartItems((prevItems) => [...prevItems, newProduct]); // Add a new row
    setCartCount((prevCount) => prevCount + 1); // Increment cart count
    toast.success(`Added another ${product.title} to the cart!`);
  };
  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("Proceeding to checkout...", {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => {
      navigate("/checkout", { state: { cartItems } });
    }, 2000);
  };

  const handleRemove = (id) => {
    handleRemoveFromCart(id);
    toast.error("Item removed from cart!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="main">
      <Toaster position="top-right" />
      <div className="cart-container-cart-section">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span> › </span>
          <span>Cart</span>
        </div>
        <div className="upper-part">
          <h1>Your Cart</h1>
          <div className="upper-btn">
            <p>Checkout All Cart Items.</p>
            <button onClick={handleBuyNow} className="buy-now-btn">
              Checkout
            </button>
          </div>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="cart-table-cart-sec">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={`${item.id}-${index}`}>
                  <td className="remove-item" onClick={() => handleRemove(item.id)} style={{ cursor: "pointer" }}>
                    <MdOutlineDelete />
                  </td>
                  <td className="product-info-cart">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="cart-product-image"
                      onClick={() => handleImageClick(item)}
                    />
                    <span>{item.title}</span>
                  </td>
                  <td className="unit-price">₹{item.price}</td>
                  <td>
                    {/* <span>Quantity: {item.quantity}</span> Ensure quantity is displayed */}
                    <button className="buy-now-btn" onClick={() => handleAddAgain(item)}>
                      Add Again
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
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
  handleRemoveFromCart: PropTypes.func.isRequired,
  setCartCount: PropTypes.func.isRequired,
  setCartItems: PropTypes.func.isRequired, // Update cartItems state
};

export default Cart;
































// first

// import PropTypes from "prop-types";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineDelete } from "react-icons/md";
// import "./Cart.css";
// import { toast, Toaster } from "react-hot-toast";

// const Cart = ({ cartItems, handleRemoveFromCart, setCartCount, setCartItems }) => {
//   const navigate = useNavigate();

//   const handleImageClick = (product) => {
//     navigate("/productShowing", { state: { product } });
//   };

//   const handleAddAgain = (product) => {
//     // Add a new instance of the same product to the cart
//     const updatedCart = [...cartItems, { ...product }];
//     setCartItems(updatedCart); // Update the cartItems state
//     setCartCount(updatedCart.length); // Update the cart count
//     toast.success(`Added another ${product.title} to the cart!`);
//   };

//   const handleBuyNow = () => {
//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }

//     toast.success("Proceeding to checkout...", {
//       position: "top-right",
//       autoClose: 2000,
//     });

//     setTimeout(() => {
//       navigate("/checkout", { state: { cartItems } });
//     }, 2000);
//   };

//   const handleRemove = (id) => {
//     handleRemoveFromCart(id);
//     toast.error("Item removed from cart!", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   return (
//     <div className="main">
//       <Toaster position="top-right" />
//       <div className="cart-container-cart-section">
//         <div className="breadcrumb">
//           <Link to="/">Home</Link>
//           <span> › </span>
//           <span>Cart</span>
//         </div>
//         <div className="upper-part">
//           <h1>Your Cart</h1>
//           <div className="upper-btn">
//             <p>Checkout All Cart Items.</p>
//             <button onClick={handleBuyNow} className="buy-now-btn">
//               Checkout
//             </button>
//           </div>
//         </div>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <table className="cart-table-cart-sec">
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Product Name</th>
//                 <th>Unit Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item, index) => (
//                 <tr key={`${item.id}-${index}`}>
//                   <td
//                     className="remove-item"
//                     onClick={() => handleRemove(item.id)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <MdOutlineDelete />
//                   </td>
//                   <td className="product-info-cart">
//                     <img
//                       src={item.icon}
//                       alt={item.title}
//                       className="cart-product-image"
//                       onClick={() => handleImageClick(item)}
//                     />
//                     <span>{item.title}</span>
//                   </td>
//                   <td className="unit-price">{item.price}</td>
//                   <td>
//                     <button
//                       className="buy-now-btn"
//                       onClick={() => handleAddAgain(item)}
//                     >
//                       Add Again
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// Cart.propTypes = {
//   cartItems: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       icon: PropTypes.string.isRequired,
//       price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
//         .isRequired,
//       quantity: PropTypes.number, // Keep quantity for each product in cart
//     })
//   ).isRequired,
//   handleRemoveFromCart: PropTypes.func.isRequired,
//   setCartCount: PropTypes.func.isRequired,
//   setCartItems: PropTypes.func.isRequired, // Add this prop
// };

// export default Cart;



// second

// import PropTypes from "prop-types";
// import { Link, useNavigate } from "react-router-dom";
// import { MdOutlineDelete } from "react-icons/md";
// import "./Cart.css";
// import { toast, Toaster } from "react-hot-toast";

// const Cart = ({ cartItems, handleRemoveFromCart, setCartCount, setCartItems }) => {
//   const navigate = useNavigate();

//   const handleImageClick = (product) => {
//     navigate("/productShowing", { state: { product } });
//   };

//   // const handleAddAgain = (product) => {
//   //   const updatedCart = cartItems.map(item => {
//   //     if (String(item.id) === String(product.id)) {
//   //       return { ...item, quantity: item.quantity + 1 }; // Increment quantity
//   //     }
//   //     return item;
//   //   });

//   //   if (!updatedCart.some(item => String(item.id) === String(product.id))) {
//   //     updatedCart.push({ ...product, quantity: 1 }); // Add new product if not found
//   //   }

//   //   setCartItems(updatedCart);
//   //   setCartCount(updatedCart.length);
//   //   toast.success(`Added another ${product.title} to the cart!`);
//   // };


//   const handleAddAgain = (product) => {
//     const newProduct = { ...product }; // Create a new product object
//     setCartItems((prevItems) => [...prevItems, newProduct]); // Add a new row
//     setCartCount((prevCount) => prevCount + 1); // Increment cart count
//     toast.success(`Added another ${product.title} to the cart!`);
//   };















//   const handleBuyNow = () => {
//     if (cartItems.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }

//     toast.success("Proceeding to checkout...", {
//       position: "top-right",
//       autoClose: 2000,
//     });

//     setTimeout(() => {
//       navigate("/checkout", { state: { cartItems } });
//     }, 2000);
//   };

//   const handleRemove = (id) => {
//     handleRemoveFromCart(id);
//     toast.error("Item removed from cart!", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   return (
//     <div className="main">
//       <Toaster position="top-right" />
//       <div className="cart-container-cart-section">
//         <div className="breadcrumb">
//           <Link to="/">Home</Link>
//           <span> › </span>
//           <span>Cart</span>
//         </div>
//         <div className="upper-part">
//           <h1>Your Cart</h1>
//           <div className="upper-btn">
//             <p>Checkout All Cart Items.</p>
//             <button onClick={handleBuyNow} className="buy-now-btn">
//               Checkout
//             </button>
//           </div>
//         </div>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <table className="cart-table-cart-sec">
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Product Name</th>
//                 <th>Unit Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             {/* <tbody>
//               {cartItems.map((item, index) => (
//                 <tr key={`${item.id}-${index}`}>
//                   <td
//                     className="remove-item"
//                     onClick={() => handleRemove(item.id)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <MdOutlineDelete />
//                   </td>
//                   <td className="product-info-cart">
//                     <img
//                       src={item.icon}
//                       alt={item.title}
//                       className="cart-product-image"
//                       onClick={() => handleImageClick(item)}
//                     />
//                     <span>{item.title}</span>
//                   </td>
//                   <td className="unit-price">₹{item.price}</td>
//                   <td>
//                     <button
//                       className="buy-now-btn"
//                       onClick={() => handleAddAgain(item)}
//                     >
//                       Add Again
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody> */}





//             <tbody>
//               {cartItems.map((item, index) => (
//                 <tr key={`${item.id}-${index}`}>
//                   <td className="remove-item" onClick={() => handleRemove(item.id)} style={{ cursor: "pointer" }}>
//                     <MdOutlineDelete />
//                   </td>
//                   <td className="product-info-cart">
//                     <img
//                       src={item.icon}
//                       alt={item.title}
//                       className="cart-product-image"
//                       onClick={() => handleImageClick(item)}
//                     />
//                     <span>{item.title}</span>
//                   </td>
//                   <td className="unit-price">₹{item.price}</td>
//                   <td>
//                     <span>Quantity: {item.quantity}</span> {/* Ensure quantity is displayed */}
//                     <button className="buy-now-btn" onClick={() => handleAddAgain(item)}>
//                       Add Again
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>









//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// Cart.propTypes = {
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
//   handleRemoveFromCart: PropTypes.func.isRequired,
//   setCartCount: PropTypes.func.isRequired,
//   setCartItems: PropTypes.func.isRequired, // Update cartItems state
// };

// export default Cart;
