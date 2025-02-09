// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import './SearchProducts.css';
// import { Link, useLocation } from 'react-router-dom';
// import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";

// const SearchProducts = ({ products, handleAddToFavorites, showToast, cartItems = [], setCartCount }) => {
//     const [selectedColors, setSelectedColors] = useState([]);
//     const [selectedBrands, setSelectedBrands] = useState([]);
//     const [priceRange, setPriceRange] = useState([0, 10000]);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
//     const location = useLocation();
//     const [cartItemsState, setCartItemsState] = useState(cartItems); // Fix cartItems state initialization
//     const searchParams = new URLSearchParams(location.search);
//     const category = searchParams.get("category");
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     // If search results are passed via location.state
//     const locationFilteredProducts = location.state?.filteredProducts || products;

//     // Handle adding items to the cart
//     const handleAddToCart = (product) => {
//         if (!cartItemsState.some((item) => item.id === product.id)) {
//             const updatedCartItems = [...cartItemsState, product];
//             setCartItemsState(updatedCartItems); // Update cart state
//             setCartCount(updatedCartItems.length); // Update cart count
//             showToast(`${product.title} added to cart!`);
//         } else {
//             showToast(`${product.title} is already in the cart!`);
//         }
//         console.log(product.title)
//     };

//     // Check if a product is in the cart
//     const isInCart = (productId) => {
//         return cartItemsState.some((item) => item.id === productId);
//     };

//     // Handle color filter changes
//     const handleColorChange = (color) => {
//         setSelectedColors((prevColors) =>
//             prevColors.includes(color)
//                 ? prevColors.filter((c) => c !== color)
//                 : [...prevColors, color]
//         );
//     };

//     // Handle brand filter changes
//     const handleBrandChange = (brand) => {
//         setSelectedBrands((prevBrands) =>
//             prevBrands.includes(brand)
//                 ? prevBrands.filter((b) => b !== brand)
//                 : [...prevBrands, brand]
//         );
//     };
//     // Handle category selection
//     const handleCategoryChange = (category) => {
//         setSelectedCategories((prevCategories) =>
//             prevCategories.includes(category)
//                 ? prevCategories.filter((cat) => cat !== category)
//                 : [...prevCategories, category]
//         );
//     };

//     const filteredProducts = locationFilteredProducts.filter((product) => {
//         // Ensure product.category is treated as an array
//         const productCategories = Array.isArray(product.category) ? product.category : [product.category];

//         const matchesCategory = selectedCategories.length === 0 || productCategories.some(cat => selectedCategories.includes(cat));
//         const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
//         const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
//         const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

//         // Now, apply category filter only if it's selected
//         const matchesCategoryFilter = category ? productCategories.includes(category) : true;

//         return matchesCategory && matchesCategoryFilter && matchesColor && matchesBrand && matchesPrice;
//     });



//     return (
//         <div className="products-container">
//             {/* Sidebar Toggle Button */}
//             <button
//                 className="filter-toggle-btn"
//                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             >
//                 {isSidebarOpen ? <MdOutlineToggleOff /> : <MdOutlineToggleOn />}
//             </button>

//             {/* Filters Sidebar */}
//             <div className={`filter-sidebar ${isSidebarOpen ? "open" : ""}`}>
//                 <h2>Filters</h2>

//                 {/* Color Filter */}
//                 <div className="filter-group color-filter">
//                     <h3>Colors</h3>
//                     <div className="items">
//                         {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].map((color) => (
//                             <label key={color}>
//                                 <input
//                                     type="checkbox"
//                                     value={color}
//                                     checked={selectedColors.includes(color)}
//                                     onChange={() => handleColorChange(color)}
//                                 />
//                                 {color}
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Brand Filter */}
//                 <div className="filter-group">
//                     <h3>Brands</h3>
//                     <div className="items">
//                         {['Nike', 'Adidas', 'Puma', 'Reebok', 'Gucci'].map((brand) => (
//                             <label key={brand}>
//                                 <input
//                                     type="checkbox"
//                                     value={brand}
//                                     checked={selectedBrands.includes(brand)}
//                                     onChange={() => handleBrandChange(brand)}
//                                 />
//                                 {brand}
//                             </label>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="filter-group">
//                     <h3>Categories</h3>
//                     <div className="items">
//                         {['Sports', 'Footwear', 'Clothing', 'Electronics', 'Home'].map((cat) => (
//                             <label key={cat}>
//                                 <input
//                                     type="checkbox"
//                                     value={cat}
//                                     checked={selectedCategories.includes(cat)}
//                                     onChange={() => handleCategoryChange(cat)}
//                                 />
//                                 {cat}
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Price Range */}
//                 <div className="filter-group">
//                     <h3>Price Range</h3>
//                     <input
//                         type="range"
//                         min="0"
//                         max="10000"
//                         value={priceRange[0]}
//                         onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
//                     />
//                     <input
//                         type="range"
//                         min="0"
//                         max="10000"
//                         value={priceRange[1]}
//                         onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
//                     />
//                     <p>
//                         ₹{priceRange[0]} - ₹{priceRange[1]}
//                     </p>
//                 </div>
//             </div>

//             {/* Product List */}
//             <div className="prod-Container search-prod-container">
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((item) => (
//                         <div className="products search-products" key={item.id}>
//                             <div className="prod-Items">
//                                 <div className="prod-Img-box">
//                                     <img src={item.icon} alt={item.title} />
//                                     <div className="hover-actions">
//                                         <button
//                                             className="fav-btn"
//                                             onClick={() => handleAddToFavorites(item)}
//                                         >❤️
//                                         </button>
//                                         <button
//                                             className="cart-btn"
//                                             onClick={() => handleAddToCart(item)}
//                                             disabled={isInCart(item.id)}
//                                         >
//                                             🛒
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className={`titleProducts ${item.id === 4 ? "special-title" : ""}`}>
//                                     <p>{item.title}</p>
//                                 </div>
//                                 <div className="descpProducts">
//                                     <p>{item.descp}</p>
//                                 </div>
//                                 <div className="price">
//                                     <p>₹{item.price}</p>
//                                 </div>
//                                 <div className="showProduct">
//                                     <Link to="/productShowing" state={{ product: item }}>Show . </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No products found</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// SearchProducts.propTypes = {
//     products: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             title: PropTypes.string.isRequired,
//             descp: PropTypes.string.isRequired,
//             icon: PropTypes.string.isRequired,
//             price: PropTypes.number.isRequired,
//             color: PropTypes.string.isRequired,
//             brand: PropTypes.string.isRequired,
//         })
//     ).isRequired,
//     handleAddToFavorites: PropTypes.func.isRequired,
//     showToast: PropTypes.func.isRequired,
//     cartItems: PropTypes.array,
//     setCartCount: PropTypes.func.isRequired,
// };

// export default SearchProducts;

































import { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchProducts.css';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import AOS from "aos";
import { useEffect } from "react";

const SearchProducts = ({ products, handleAddToFavorites, showToast, cartItems = [], setCartCount, setCartItems }) => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
    const location = useLocation();
    // const [cartItemsState, setCartItemsState] = useState(cartItems); // Fix cartItems state initialization
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    const [selectedCategories, setSelectedCategories] = useState([]);

    // If search results are passed via location.state
    const locationFilteredProducts = location.state?.filteredProducts || products;

    const handleAddToCart = (product) => {
        console.log("Adding product:", product);

        const existingProductIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {
            // If the product exists, update its quantity
            setCartItems(prevItems => {
                const updatedItems = [...prevItems];
                updatedItems[existingProductIndex].quantity += 1;
                console.log("Updated Items in Cart:", updatedItems);
                return updatedItems;
            });

            showToast(`${product.title} quantity increased in cart!`);
        } else {
            // If the product doesn't exist, add it to the cart
            const newProduct = {
                ...product,
                quantity: 1,
            };

            setCartItems(prevItems => {
                const updatedItems = [...prevItems, newProduct];
                console.log("New Product Added. Updated Items in Cart:", updatedItems);
                return updatedItems;
            });

            showToast(`${product.title} added to cart!`);
        }

        setCartCount(cartItems.length + 1);
    };



    const isInCart = (productId) => {
        return cartItems.some((item) => Number(item.id) === Number(productId));
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease",
            once: true,
        });
    }, []);

    // Check if a product is in the cart
    // const isInCart = (productId) => {
    //     return cartItemsState.some((item) => item.id === productId);
    // };

    // Handle color filter changes
    const handleColorChange = (color) => {
        setSelectedColors((prevColors) =>
            prevColors.includes(color)
                ? prevColors.filter((c) => c !== color)
                : [...prevColors, color]
        );
    };

    // Handle brand filter changes
    const handleBrandChange = (brand) => {
        setSelectedBrands((prevBrands) =>
            prevBrands.includes(brand)
                ? prevBrands.filter((b) => b !== brand)
                : [...prevBrands, brand]
        );
    };

    // Handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((cat) => cat !== category)
                : [...prevCategories, category]
        );
    };

    // Filter products based on selected filters
    const filteredProducts = locationFilteredProducts.filter((product) => {
        const productCategories = Array.isArray(product.category) ? product.category : [product.category];

        const matchesCategory = selectedCategories.length === 0 || productCategories.some(cat => selectedCategories.includes(cat));
        const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

        const matchesCategoryFilter = category ? productCategories.includes(category) : true;

        return matchesCategory && matchesCategoryFilter && matchesColor && matchesBrand && matchesPrice;
    });

    // Add a check for setCartItems to ensure it's defined
    if (typeof setCartItems !== 'function') {
        console.error('setCartItems is not a function');
    }
    return (
        <div className="products-container">
            {/* Sidebar Toggle Button */}
            <button
                className="filter-toggle-btn"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <MdOutlineToggleOff /> : <MdOutlineToggleOn />}
            </button>

            {/* Filters Sidebar */}
            <div className={`filter-sidebar ${isSidebarOpen ? "open" : ""}`}>
                <h2>Filters</h2>

                {/* Color Filter */}
                <div className="filter-group color-filter">
                    <h3>Colors</h3>
                    <div className="items">
                        {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'].map((color) => (
                            <label key={color}>
                                <input
                                    type="checkbox"
                                    value={color}
                                    checked={selectedColors.includes(color)}
                                    onChange={() => handleColorChange(color)}
                                />
                                {color}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Brand Filter */}
                <div className="filter-group">
                    <h3>Brands</h3>
                    <div className="items">
                        {['Nike', 'Adidas', 'Puma', 'Reebok', 'Gucci'].map((brand) => (
                            <label key={brand}>
                                <input
                                    type="checkbox"
                                    value={brand}
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                />
                                {brand}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="filter-group">
                    <h3>Categories</h3>
                    <div className="items">
                        {['Sports', 'Footwear', 'Clothing', 'Electronics', 'Home'].map((cat) => (
                            <label key={cat}>
                                <input
                                    type="checkbox"
                                    value={cat}
                                    checked={selectedCategories.includes(cat)}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                {cat}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="filter-group">
                    <h3>Price Range</h3>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    />
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                    <p>
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                    </p>
                </div>
            </div>

            {/* Product List  {isInCart(item.id) ? "Add More" : "Add to Cart"}*/}
            <div className="prod-Container search-prod-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                        <div className="products search-products" key={item.id}>
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
                                <div className={`titleProducts ${item.id === 4 ? "special-title" : ""}`}>
                                    <p>{item.title}</p>
                                </div>
                                <div className="descpProducts">
                                    <p>{item.descp}</p>
                                </div>
                                <div className="price">
                                    <p>₹{item.price}</p>
                                </div>
                                <div className="showProduct">
                                    <Link to="/productShowing" state={{ product: item }}>Show . </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

SearchProducts.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            descp: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            color: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleAddToFavorites: PropTypes.func.isRequired,
    showToast: PropTypes.func.isRequired,
    cartItems: PropTypes.array,
    setCartItems: PropTypes.func.isRequired,
    setCartCount: PropTypes.func.isRequired,
};

export default SearchProducts;
