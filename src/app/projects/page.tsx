"use client";
import { useState } from "react";
import ContactSidebar from "../../../components/ContactSidebar";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Nav";
import PopupForm from "../../../components/PopUpForm";
import img1 from "../../../assets/IMG-20211025-WA0004 (1).jpg";
import img2 from "../../../assets/IMG-20211025-WA0005.jpg";
import img3 from "../../../assets/IMG-20211025-WA0006 (1).jpg";
import img4 from "../../../assets/J-3-10_Elevation_View_2nd_Option (1).jpg";
import sushant from "../../../assets/sushant lok.jpg";

import Image from "next/image";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const projects = [
  {
    img: sushant,
    title: "B Block, Sushant Lok, Gurugram",
  },
  {
    img: img1,
    title: "3, Sanjay Nagar, Gulabi Bagh, Delhi",
  },
  {
    img: img2,
    title: "4, Sanjay Nagar, Gulabi Bagh, Delhi",
  },
  {
    img: img3,
    title: "P-3/15, DLF-II, Gurugram",
  },
  {
    img: img4,
    title: "J-3/10, DLF-II, Gurugram",
  },
];

function Projects() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div>
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Top Residential & Commercial Projects in Delhi"
      />
      <meta
        property="og:description"
        content="Explore a range of verified residential and
commercial projects with top builders in Delhi NCR. Get complete property details and
expert advice."
      />
      <meta
        property="og:image"
        content="https://www.khalsapropertydealers.com/_next/image?url=%2F_next%2Fstatic%2F
media%2Flogo.258c394f.png&w=256&q=75"
      />
      <meta
        property="og:url"
        content="https://www.khalsapropertydealers.com/projects"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Khalsa Property Dealers" />
      <meta property="og:locale" content="en_IN" />

      <title>Top Residential & Commercial Projects in Delhi & Dubai</title>

      <meta
        name="title"
        content="Top Residential & Commercial Projects in Delhi"
      />

      <meta
        name="description"
        content="Explore a range of verified residential and commercial projects with top builders in Delhi NCR. Get complete property details and expert advice."
      />
      <link
        rel="canonical"
        href="https://www.khalsapropertydealers.com/projects"
      />
      <Navbar />

      {/* Page Header */}
      <section className=" py-12 mt-28 text-center text-black">
        <h1 className="text-2xl md:text-3xl text-center font-semibold text-[var(--primary-color)] mt-2 mb-5 tracking-widest">
          Our Projects
        </h1>
        <p className="mt-2 text-lg">Explore our exclusive developments</p>
      </section>

      {/* Projects Grid */}
      <section className="w-11/12 md:w-5/6 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className=" overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.title}
                  className="w-full h-[380px] object-fill hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-md ">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-[var(--primary-color)] text-white text-center py-10 px-4 mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Dream Project?
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Let’s bring your vision to life with our expert team. Get in touch
          today and take the first step toward your future.
        </p>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="bg-white text-[var(--primary-color)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Enquire Now
        </button>
      </div>
      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}
      <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
        <div className="w-1/2 bg-[var(--primary-color)] text-white text-center py-3">
          <a
            href="tel:+919212717362"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaPhoneAlt size={18} />
            Call Us
          </a>
        </div>
        <div className="w-1/2 bg-white text-green-500 text-center py-3 border-l border-white">
          <a
            href="https://wa.me/+919212717362"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="hidden md:block">
        <ContactSidebar />
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
