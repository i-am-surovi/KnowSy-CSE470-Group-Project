import React from "react";
import Footer from "../../components/student/Footer";
import DevelopersCard from "../../components/DevelopersCard";
import asifSirImage from "../../assets/Asif-Sir.png";
import suroviImage from "../../assets/Surovi.png";
import fairuzImage from "../../assets/Fairuz.png";
import farihaImage from "../../assets/Fariha.png";
import deeanatImage from "../../assets/Deeanat.png";

const asifSir = {
  name: "Md. Asif Haider",
  title: "Lecturer",
  email: "asif.haider@bracu.ac.bd",
  image: asifSirImage,
  profileLink: "https://cse.sds.bracu.ac.bd/faculty_profile/342/md_asif_haider",
};

const developers = [
  {
    name: "Sumaiya Hossain Surovi",
    title: "Project Leader",
    email: "sumaiya.hossain.surovi1@g.bracu.ac.bd",
    image: suroviImage,
    profileLink: "https://github.com/i-am-surovi",
  },
  {
    name: "Fairuz Suhala Reza",
    title: "Database Administrator",
    email: "fairuz.suhala.reza@g.bracu.ac.bd",
    image: fairuzImage,
    profileLink: "https://github.com/fairuz04",
  },
  {
    name: "Deeanat Rahman",
    title: "Frontend Developer",
    email: "deeanat.rahman@g.bracu.ac.bd",
    image: deeanatImage,
    profileLink: "https://github.com/deeanatrahman",
  },
  {
    name: "Fariha Binta Salim",
    title: "Backend Developer",
    email: "fariha.binta.salim@g.bracu.ac.bd",
    image: farihaImage,
    profileLink: "https://github.com/chimmysaan",
  },
];

const AboutUs = () => {
  return (
    <>
      <div className="relative md:px-36 px-8 py-20 text-left">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">About Us</h1>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </span>{" "}
            / <span>About Us</span>
          </p>
        </div>

        {/* Top-centered Professor card */}
        <div className="flex justify-center mb-10">
          <DevelopersCard {...asifSir} />
        </div>

        {/* Grid for the rest of the developers */}
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {developers.map((dev, index) => (
            <DevelopersCard key={index} {...dev} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
