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
import logo from "../../../assets/logo.png";

const About: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  return (
    <div>
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Know More About Khalsa Property Dealers"
      />
      <meta
        property="og:description"
        content="Trusted real estate consultants in Delhi NCR
offering transparent property solutions, expert guidance, and reliable market insights."
      />
      <meta
        property="og:image"
        content="https://www.khalsapropertydealers.com/_next/image?url=%2F_next%2Fstatic%2F
media%2Flogo.258c394f.png&w=256&q=75"
      />
      <meta
        property="og:url"
        content="https://www.khalsapropertydealers.com/about"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Khalsa Property Dealers" />
      <meta property="og:locale" content="en_IN" />

      <title>Know more about Khalsa Property Dealers</title>

      <meta name="title" content="Know more about Khalsa Property Dealers" />
      <meta
        name="description"
        content="Trusted Real Estate Consultants in Delhi NCR"
      />
      <link
        rel="canonical"
        href="https://www.khalsapropertydealers.com/about"
      />
      <Navbar />
      <div className="pt-[80px] md:pt-[128px]  text-[#04365b] bg-white">
        {/* About Section */}
        <section className=" w-11/12 md:w-5/6 mx-auto flex flex-col md:flex-row items-center gap-8 py-12">
          {/* Left Text */}
          <div className="md:w-1/2 space-y-4 ">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mt-2 text-start mb-8 tracking-widest">
              About Us
            </h2>
            <p className="text-md leading-relaxed mb-6 text-gray-700  text-justify">
              Khalsa Property Dealers has been a trusted name in Delhi’s Real
              Estate market since 2001, delivering homes that combine value,
              vision, and reliability. With 24+ years of industry expertise and
              a strong presence through 3 offices, we have completed 65
              successful projects and proudly served more than 2,000 clients.
              From Gulabi Bagh, Delhi, to emerging markets in Goa and Gurugram,
              we continue to expand our footprint while helping families and
              investors discover properties that truly match their goals.
            </p>
            <p className=" text-md leading-relaxed mb-6 text-gray-700  text-justify">
              For us, real estate is not just about property dealing - it’s
              about creating meaningful spaces and high-value investment
              opportunities that deliver maximum returns in minimum time.
            </p>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center">
            <Image src={logo} alt="About Us" className=" w-3/4 object-cover" />
          </div>
        </section>

        {/* Our Founder */}
        <section className="py-12 w-11/12 md:w-5/6 mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mt-2 text-start mb-8 tracking-widest">
            Our Founder
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Founder Card */}
            <div className="rounded-xl col-span-1 overflow-hidden  transition duration-300">
              <Image
                src={owner}
                alt="Founder"
                className="w-full h-[330px] object-contain"
              />
            </div>

            {/* Founder Statement */}
            <div className="flex flex-col col-span-2 justify-center text-gray-800">
              <p className="text-xl  leading-relaxed italic font-light text-gray-800 text-justify">
                “At <strong>Khalsa Property Dealers</strong>, my vision has
                always been simple: to bring honesty, transparency, and
                commitment back into real estate. Since the day we began, I’ve
                believed that a home is more than four walls - it’s a foundation
                for dreams, memories, and financial growth. Every client who
                walks through our doors becomes a part of our extended family,
                and their trust drives us to deliver nothing but the best. As we
                continue to grow across India, our promise remains unchanged: to
                provide dependable guidance, timely delivery, and investments
                that secure a brighter future for you and your family.”
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
          Enquire Now
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
