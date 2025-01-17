import React, { useState, useEffect, useContext } from "react";
import "./Carousel.css";
import img from "../../../public/img.png";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang, setLang } = useContext(LangContext);

  const slides = [
    { image: img, caption: language[lang].carousel.text },
    { image: img, caption: language[lang].carousel.text2 },
    { image: img, caption: language[lang].carousel.text3 },
    { image: img, caption: language[lang].carousel.text4 },
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
