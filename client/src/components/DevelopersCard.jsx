import React from "react";

const DevelopersCard = ({ name, title, email, image, profileLink }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden p-4 text-center fac-card">
      <a href={profileLink} target="_blank" rel="noopener noreferrer">
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute border border-sky-300 w-24 h-24 md:w-40 md:h-40 rounded-full transition-transform hover:scale-105"></div>
          <div className="relative z-10 w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </a>
      <a
        className="px-1 mt-3 block"
        href={profileLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="text-sm font-semibold text-center text-black normal-case md:text-[1rem]">
          {name}
        </p>
      </a>
      <p className="text-xs font-medium text-center md:text-sm text-slate-700">
        {title}
      </p>
      <p className="text-xs text-center md:text-sm text-slate-500">{email}</p>
    </div>
  );
};

export default DevelopersCard;
