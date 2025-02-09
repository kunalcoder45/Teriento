import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import "./sellerDashboard.css";
import axios from 'axios';
import { useAuth } from "../authContext/AuthContext";
import { useEffect, useState } from 'react';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/products')  // URL of your backend API
      .then((response) => {
        setProducts(response.data.products);  // Assuming your API returns products in 'products' field
        setLoading(false);  // Stop the loading spinner once data is fetched
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Failed to fetch products'); // Handling actual error message
        setLoading(false);  // Stop loading if there's an error
      });
  }, []);
  if (loading) return <div className='loading'><div className='spinner'></div></div>;
  if (error) return <div>{error}</div>;


  // Sample data for Sales Over Time (Line Chart)
  const salesOverTimeData = [
    { month: "Jan", sales: 1200 },
    { month: "Feb", sales: 1900 },
    { month: "Mar", sales: 3000 },
    { month: "Apr", sales: 5000 },
    { month: "May", sales: 2300 },
    { month: "Jun", sales: 3400 },
    { month: "Jul", sales: 4500 },
    { month: "Aug", sales: 3200 },
    { month: "Sep", sales: 4000 },
  ];

  // Sample data for Top Selling Products (Bar Chart)
  const topProductsData = [
    { name: "Product A", sales: 12425 },
    { name: "Product B", sales: 1543 },
    { name: "Product C", sales: 7223 },
  ];

  const updateStatus = (productId, newStatus) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, status: newStatus } : product
      )
    );
  };  

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <h1>
          Welcome back, <span className="green-txt">{user.displayName || "Seller"}!</span>
        </h1>
        <p>Here`s Your Current Sales Overview</p>
      </div>

      {/* Statistics Section */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>AVG. Order Value</h2>
          <p className="stat-value">$ 77.21</p>
          <p className="stat-change positive">+3.1% From last month</p>
        </div>
        <div className="stat-card">
          <h2>Total Orders</h2>
          <p className="stat-value">2,107</p>
          <p className="stat-change negative">-1.89% From last month</p>
        </div>
        <div className="stat-card">
          <h2>Lifetime Value</h2>
          <p className="stat-value">$ 653</p>
          <p className="stat-change positive">+2.24% From last month</p>
        </div>
      </div>

      {/* Graph and Product Section */}
      <div className="dashboard-graphs">
        <div className="sales-overtime">
          <h3>Sales Over Time</h3>
          <LineChart
            width={500}
            height={300}
            data={salesOverTimeData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4caf50"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="top-selling-products">
          <h3>Top Selling Products</h3>
          <BarChart
            width={500}
            height={300}
            data={topProductsData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#2196f3" />
          </BarChart>
        </div>
      </div>

      {/* Latest Orders Section */}
      <div className="latest-orders">
        <h3>Latest Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="prod-id">{product._id}</td>
                <td>{product.title}</td>
                <td>{new Date(product.createdAt).toLocaleString()}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>UPI</td>
                <td className={`status-${product.status?.toLowerCase() || "default"}`}>
                  {product.status || "Pending"}
                </td>
                <td>
                  <div className="sellerDashdropdown">
                    <button className="dropdown-btn-seller-dash">...</button>
                    <div className="dropdown-content-seller-Dash">
                      <button onClick={() => updateStatus(product._id, "Shipping")}>Shipping</button>
                      <button onClick={() => updateStatus(product._id, "Delivery")}>Delivery</button>
                      <button onClick={() => updateStatus(product._id, "Complete")}>Complete</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerDashboard;
