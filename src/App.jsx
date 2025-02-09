import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./Components/authContext/AuthContext.jsx";
import ProtectedRoute from './ProtectedRoute.jsx';
import { useAuth } from "./Components/authContext/AuthContext.jsx";
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/hero/hero';
import CategoryItems from './Components/category/Category-items';
import Products from './Components/products/HomeProducts/products.jsx';
import SelfSection from './Components/shelfSection/selfSection';
import Footer from './Components/footer/footer';
import './App.css';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import NotFound from './Components/NotFound/Notfound';
import ProductShowing from './Components/products/ProductsShowing/productShowing.jsx';
import Checkout from './Components/checkout/checkout';
import FavItems from './Components/favItems/FavItems.jsx';
import Cart from './Components/cartItem/cart';
import ScrollToTopButton from './Components/scrollToTop/ScrollToTopButton';
import AuthS from './Components/authentation/authSingup';
import AuthL from './Components/authentation/authLogin';
import ForgotPassword from './Components/authentation/forgetPass';
import UserSettings from './Components/UserSettings/UserSettings.jsx';
import SearchProducts from './Components/products/SearchProducts/SearchProducts.jsx';
import productsItems from "./Components/products/productData/ProductData.jsx";
import { toast, Toaster } from "react-hot-toast";
import ProductList from "./Components/ProductList.jsx";
import RatingsAndReviews from "./Components/RatingsAndReviews/RatingsAndReviews.jsx";
import SuggestedProducts from "./Components/products/SuggestedProducts/SuggestedProducts.jsx";
import PaymentPage from "./Components/PaymentGateway/paymentGate.jsx";
import OrderTraking from "./Components/trackOrder/trackOrder.jsx";
import AddProduct from "./Components/AddProduct/AddProduct.jsx";
import TestApiProd from "./Components/testApiProd/testApiProd.jsx";
import SellerAC from "./Components/SellerAccount/SellerAC.jsx";
import SellerDash from "./Components/sellerDashboard/sellerDashboard.jsx";



function App() {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [favItems, setFavItems] = useState([]);
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const handleRightClick = (event) => {
      event.preventDefault();
    };
    document.addEventListener('contextmenu', handleRightClick);
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
    };
  }, []);

  // Function to show toast messages
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else {
      toast(message); // Default toast
    }
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cartItems.some(item => String(item.id) === String(product.id));
    if (!isProductInCart) {
      const updatedProduct = { ...product, id: String(product.id), quantity: 1 };
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems, updatedProduct];
        setCartCount(updatedItems.length);
        return updatedItems;
      });
      showToast(`${product.title} added to cart!`);
    } else {
      showToast(`${product.title} is already in the cart!`, 'error');
    }
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => String(item.id) !== String(productId));
    if (updatedCart.length < cartItems.length) {
      setCartItems(updatedCart);
      setCartCount(updatedCart.length);
      showToast(`Product removed from cart.`);
    }
  };

  const handleAddToFavorites = (product) => {
    const isProductInFavorites = favItems.some(item => String(item.id) === String(product.id));
    if (!isProductInFavorites) {
      setFavItems((prevItems) => {
        const updatedItems = [...prevItems, product];
        setFavoritesCount(updatedItems.length);
        return updatedItems;
      });
      showToast(`${product.title} added to favorites!`);
    } else {
      showToast(`${product.title} is already in the favorites!`, 'error');
    }
  };

  const handleRemoveFromFavorites = (productId) => {
    const updatedFavorites = favItems.filter((item) => String(item.id) !== String(productId));
    if (updatedFavorites.length < favItems.length) {
      setFavItems(updatedFavorites);
      setFavoritesCount(updatedFavorites.length);
      showToast(`Product removed from favorites.`);
    }
  };

  const handleSetCartItems = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };

  // Router setup
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary>
          <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
          <Hero />
          <CategoryItems />
          <Products
            setFavoritesCount={setFavoritesCount}
            setCartCount={setCartCount}
            favoritesCount={favoritesCount}
            cartCount={cartCount}
            showToast={showToast}
            handleAddToCart={handleAddToCart}
            handleAddToFavorites={handleAddToFavorites}
            cartItems={cartItems}
          />
          <SelfSection />
          <ScrollToTopButton />
          <Footer />
        </ErrorBoundary>
      ),
    },
    {
      path: "/search-products",
      element: (
        <ErrorBoundary>
          <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
          <SearchProducts
            products={productsItems}
            setFavoritesCount={setFavoritesCount}
            setCartCount={setCartCount}
            favoritesCount={favoritesCount}
            cartCount={cartCount}
            showToast={showToast}
            handleAddToCart={handleAddToCart}
            handleAddToFavorites={handleAddToFavorites}
            setCartItems={handleSetCartItems}
          />
          <ScrollToTopButton />
          <Footer />
        </ErrorBoundary>
      ),
    },
    {
      path: "/productShowing",
      element: (
        <ErrorBoundary>
          <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
          <ProductShowing
            setCartCount={setCartCount}
            cartCount={cartCount}
            handleAddToCart={handleAddToCart}
            cartItems={cartItems}
          />
          <RatingsAndReviews />
          <ScrollToTopButton />
          <SuggestedProducts
            handleAddToFavorites={handleAddToFavorites}
            handleAddToCart={handleAddToCart}
            cartItems={cartItems}
            productsItems={productsItems} />
          <Footer />
        </ErrorBoundary>
      ),
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
            {cartItems.length > 0 ? (
              <Checkout cartItems={cartItems.map(item => ({ ...item, id: String(item.id) }))}
                handleRemoveFromCart={handleRemoveFromCart} />
            ) : (
              <div style={{ textAlign: "center", margin: "50px" }}>
                <p>Your cart is empty. Add products to proceed to checkout.</p>
              </div>
            )}
            <ScrollToTopButton />
            <Footer />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: "/favItems",
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
            <FavItems
              favItems={favItems}
              handleAddToCart={handleAddToCart}
              handleRemoveFromFavorites={handleRemoveFromFavorites}
              cartItems={cartItems}
            />
            <ScrollToTopButton />
            <Footer />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: "/cart",
      element: (
        <ErrorBoundary>
          <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
          <Cart
            cartItems={cartItems}
            handleRemoveFromCart={handleRemoveFromCart}
            setCartItems={setCartItems}
            setCartCount={setCartCount}
          />
          <ScrollToTopButton />
          <Footer />
        </ErrorBoundary>
      ),
    },
    {
      path: '/payment',
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <PaymentPage />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: '/track-Order',
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <OrderTraking />
            <ScrollToTopButton />
            <Footer />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: '/add-products',
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <AddProduct />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: '/test-api-products',
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
            <TestApiProd 
            setCartItems={handleSetCartItems}
            cartItems={cartItems}
            setCartCount={setCartCount}
            handleAddToCart={handleAddToCart}/>
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: '/seller-account-active',
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <SellerAC />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: '/seller-dashboard',
      element: (
        <ProtectedRoute>
          <ErrorBoundary>
            <Navbar favoritesCount={favoritesCount} cartCount={cartCount} />
            <SellerDash />
            <Footer />
          </ErrorBoundary>
        </ProtectedRoute>
      ),
    },
    {
      path: "/auths",
      element: !isLoggedIn ? <AuthS /> : <Navigate to="/user-settings" />
    },
    {
      path: "/authl",
      element: !isLoggedIn ? <AuthL /> : <Navigate to="/user-settings" />
    },
    {
      path: "/forgotPassword",
      element: <ForgotPassword />,
    },
    {
      path: "/user-settings",
      element: isLoggedIn ? <UserSettings user={user} /> : <Navigate to="/auths" />,
    },
    {
      path: '/ProductList',
      element: <ProductList />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
