import { useState, useEffect } from "react";
import "./ScrollToTopButton.css";
import { MdOutlineArrowUpward } from "react-icons/md";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);  // Show button after scrolling 300px
    } else {
      setIsVisible(false);  // Hide button when scrolled to top
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Add scroll event listener to toggle visibility of the button
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup listener when component is unmounted
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    isVisible && (
      <button className="scroll-to-top-btn" onClick={scrollToTop}>
        <MdOutlineArrowUpward />
      </button>
    )
  );
};

export default ScrollToTopButton;
