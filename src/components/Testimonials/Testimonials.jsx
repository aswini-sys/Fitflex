import React from "react";
import { TestimonialsData } from "../../mockData/data";
import Slider from "react-slick";

const Testimonials = () => {
  const settings = {
    dots: true,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-14 mb-10 bg-transparent">
      <div className="container mx-auto">
        {/* Header section */}
        <div className="text-left mb-10 max-w-[500px] space-y-2 mr-auto">
          <h1 className="text-4xl font-bold text-white">
            What Are The Customers Saying About Us
          </h1>
        </div>

        {/* Testimonials Cards */}
        <div>
          <Slider {...settings}>
            {TestimonialsData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl bg-white/10 backdrop-blur-lg">
                  {/* Upper section */}
                  <div className="flex justify-start items-center gap-5">
                    <img
                      src={data.img}
                      alt=""
                      className="rounded-full w-16 h-16 border border-gray-300"
                    />
                    <div>
                      <p className="text-xl font-bold text-white">{data.name}</p>
                      <p className="text-gray-400">{data.position}</p>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="py-6 space-y-4">
                    <p className="text-sm text-gray-300">{data.text}</p>
                    <p className="text-yellow-500">⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
