import { Component } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, redirect: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    }

    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>Something went wrong.</h1>
          <p style={styles.message}>{this.state.error?.toString()}</p>
          <button style={styles.button} onClick={this.handleRedirect}>
            Go to Home Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    color: "#333",
  },
  heading: {
    fontSize: "2em",
    marginBottom: "20px",
  },
  message: {
    fontSize: "1.2em",
    marginBottom: "30px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
