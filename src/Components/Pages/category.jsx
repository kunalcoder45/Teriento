import { useState, useEffect } from 'react'; // Import useState and useEffect from React
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const Category = ({ products }) => {
  const { category } = useParams(); // Get the category from the URL
  const [filteredProducts, setFilteredProducts] = useState([]); // Use useState to store filtered products

  useEffect(() => {
    if (category) {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered); // Set filtered products to state
    }
  }, [category, products]);

  return (
    <div className="category-container">
      <h1>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}</h1>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.icon} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.descp}</p>
              <p>{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

// Prop validation
Category.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      descp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Category;
