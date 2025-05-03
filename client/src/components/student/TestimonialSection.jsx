import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialSection = () => {
  return (
    <div className="relative md:px-36 px-8 py-20 text-center">
      <div className="mb-12">
        <h2 className="text-4xl font-semibold text-gray-800">Testimonials</h2>
        <p className="text-gray-500 mt-3">
          Hear from our learners as they share their journeys of transformation,
          success, and how our platform has made a difference in their lives.
        </p>
      </div>

      {/* Grid layout */}
      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-left">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full border border-gray-500/30 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <h1 className="text-lg font-medium text-gray-800">
                    {testimonial.name}
                  </h1>
                  <p className="text-gray-800/80">{testimonial.role}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <img
                      className="h-5"
                      key={i}
                      src={
                        i < Math.floor(testimonial.rating)
                          ? assets.star
                          : assets.star_blank
                      }
                      alt="star"
                    />
                  ))}
                </div>
                <p className="text-gray-500 mt-5">{testimonial.feedback}</p>
              </div>
            </div>

            {/* Fixed Button at Bottom */}
            <div className="mt-auto px-5 pb-5">
              <a href="#" className="text-blue-500 underline">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
