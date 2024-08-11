import React, { useState, useEffect } from "react";

const slides = [
  {
    author: "Employers",
    quote:
      "Streamline your recruitment process with AI-driven tools for efficient hiring.",
  },
  {
    author: "Students",
    quote:
      "Unlock your potential with personalised job matches and seamless application tracking.",
  },
  {
    author: "Universities",
    quote:
      "Connect your students with top employers and track engagement effortlessly.",
  },
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(2);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const setSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="container flex justify-center flex-col items-center mx-auto mt-5 p-5">
      <div className="relative overflow-hidden w-[70%]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`mySlides ${
              index === currentSlide ? "block" : "hidden"
            }`}
          >
            <p className="author text-xl md:text-3xl font-medium text-[#0a294f] text-center mb-3">{slide.author}</p>
            <q className=" italic w-[70%] font-bold text-[#2f2f2f]">{slide.quote}</q>
          </div>
        ))}
        <button
          className="prev absolute left-0 top-1/2 transform -translate-y-1/2"
          onClick={prevSlide}
        >
          
        </button>
        <button
          className="next absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={nextSlide}
        >
          
        </button>
      </div>
      <div className="dot-container flex justify-center mt-7">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot w-3 h-3 mx-1 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-gray-400" : "bg-gray-300"
            }`}
            onClick={() => setSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
