import { useState, useEffect } from "react";
import "./hero.css";
import Slide1 from "./assets/banner-1.jpg";
import Slide2 from "./assets/banner-2.jpg";
import Slide3 from "./assets/banner-3.jpg";

const Hero = () => {
  const slides = [
    {
      image: Slide1,
      text1: "Trending Item",
      text2: "Women's Latest",
      text3: "Fashion Sale",
      text4: "starting at $20.00",
    },
    {
      image: Slide2,
      text5: "Trending accessories",
      text6: "Modern sunglasses",
      text7: "starting at $15.00",
    },
    {
      image: Slide3,
      text8: "Sale Offer",
      text9: "New fashion summer sale",
      text10: "starting at $29.99",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3500);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-wrapper">
      <div
        className="slider-container2"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide2">
            <img src={slide.image} alt={`Slide ${index + 1}`} />
            <div className="slide-text">
              {slide.text1 && <div className="text1">{slide.text1}</div>}
              {slide.text2 && <div className="text2">{slide.text2}</div>}
              {slide.text3 && <div className="text3">{slide.text3}</div>}
              {slide.text4 && <div className="text4">{slide.text4}</div>}
              {slide.text5 && <div className="text5">{slide.text5}</div>}
              {slide.text6 && <div className="text6">{slide.text6}</div>}
              {slide.text7 && <div className="text7">{slide.text7}</div>}
              {slide.text8 && <div className="text8">{slide.text8}</div>}
              {slide.text9 && <div className="text9">{slide.text9}</div>}
              {slide.text10 && <div className="text10">{slide.text10}</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="dots-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Hero;