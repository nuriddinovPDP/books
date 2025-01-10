import React, { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { image: "img.jpg", caption: "Temuriylar davri adabiyoti" },
    { image: "img.jpg", caption: "Asar va olimlar" },
    { image: "img.jpg", caption: "Ulug‘bek davri" },
    { image: "img.jpg", caption: "Boburiylar merosi" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-item" key={index}>
            <img
              src={slide.image}
              alt={slide.caption}
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h3 className="tit">{slide.caption}</h3>
            </div>
          </div>
        ))}
      </div>

      <button
        className="prev"
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
        }
      >
        &#10094;
      </button>
      <button
        className="next"
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
