import React from "react";
import { Link } from "react-router-dom";

const CourseSection = () => {
  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-center text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="text-sm md:text-center text-gray-500 mt-3">
        Discover our top-rated courses across various categories. From coding
        and design to business and wellness, our courses are crafted to deliver
        results.
      </p>

      <div className='mt-6 flex justify-center'>
        <Link
          to={"/course-list"}
          onClick={() => scrollTo(0, 0)}
          className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;
