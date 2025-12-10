"use client";
import React, { useState } from "react";
// import aboutImg from "../assets/logo-inner.png"; // Replace with actual image
import Navbar from "../../../components/Nav";
import Footer from "../../../components/Footer";
import ContactSidebar from "../../../components/ContactSidebar";
import PopupForm from "../../../components/PopUpForm";
import Image from "next/image";
import owner from "../../../assets/owner.png";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const About: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div>
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Know more about Khalsa Property Dealers"
      />
      <meta
        property="og:description"
        content="Trusted Real Estate Consultants in Delhi NCR"
      />
      <meta
        property="og:image"
        content="https://www.khalsapropertydealers.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.87c58a64.png&w=256&q=75&dpl=dpl_GkcBtjPsnWVhNpEhUKxk34bPodaq"
      />
      <meta
        property="og:url"
        content="https://www.khalsapropertydealers.com/about"
      />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Khalsa Property Dealers" />
      <meta property="og:locale" content="en_US" />

      <title>Know more about Khalsa Property Dealers</title>
      <meta
        name="description"
        content="Trusted Real Estate Consultants in Delhi NCR"
      />
      <link
        rel="canonical"
        href="https://www.khalsapropertydealers.com/about"
      />
      <Navbar />
      <div className="pt-[80px] md:pt-[128px]  text-[#04365b] font-[Raleway] bg-white">
        {/* About Section */}
        <section className=" w-11/12 md:w-5/6 mx-auto flex flex-col md:flex-row items-center gap-8 py-12">
          {/* Left Text */}
          <div className="md:w-1/2 space-y-4 ">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mt-2 text-start mb-8 tracking-widest">
              About Us
            </h2>
            <p className="md:text-lg text-justify">
              With our area ability and accomplished professionals, we are able
              to accommodate our clients Construction and Architectural
              Services. We take affairs for accomplishment residential
              apartments, Kothis, Villas & barrio as per the claim of customer.
            </p>
            <p className="md:text-lg text-justify">
              Also we are in Real Estate Consultancy Services like Industrial
              Property, Warehouse Services, and Commercial Property in
              Delhi/NCR. Our aggregation of adolescent, acute and professionals
              is competent and self-assured to appease our clients optimally.
            </p>
            <p className="md:text-lg text-justify">
              These Services have won accolades all over the area due to their
              acquiescence with industry specific standards. In addition, we
              also ensure that the endered Services accommodate optimum
              achievement to our clients as per their diversified demands.
            </p>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2">
            <Image
              src="https://khalsaproperty.in/image/home-bg.jpg"
              alt="About Us"
              className="rounded-xl shadow-lg w-full object-cover"
              width={200}
              height={200}
            />
          </div>
        </section>

        {/* Our Founder */}
        <section className="py-12 w-11/12 md:w-5/6 mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mt-2 text-start mb-8 tracking-widest">
            Our Founder
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Founder Card */}
            <div className="rounded-xl col-span-1 overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white">
              <Image
                src={owner}
                alt="Founder"
                className="w-full h-[530px] object-cover"
              />
            </div>

            {/* Founder Statement */}
            <div className="flex flex-col col-span-2 justify-center text-gray-800">
              <p className="text-xl  leading-relaxed italic font-light text-gray-800">
                “At <strong>Khalsa Property Dealers</strong>, our mission has
                always been to deliver homes that bring happiness, security, and
                trust to every family. Since 2007, we’ve dedicated ourselves to
                making real estate simple, transparent, and reliable for all our
                clients.”
              </p>
              <span className="mt-6 block font-semibold text-[var(--primary-color)] text-lg md:text-xl">
                — Mr. Amandeep Singh, Founder
              </span>
            </div>
          </div>
        </section>
      </div>

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
          Get Started
        </button>
      </div>
      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}
      <Footer />
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
    </div>
  );
};

export default About;
