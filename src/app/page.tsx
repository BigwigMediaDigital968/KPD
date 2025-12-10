"use client";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import About from "../../components/About";
import FeaturedProjects from "../../components/FeaturedProjects";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import LatestLaunches from "../../components/LatestLaunches";
import Nav from "../../components/Nav";
import Testimonials from "../../components/Testimonial";
import ContactSidebar from "../../components/ContactSidebar";
import PopupForm from "../../components/PopUpForm";
import { useEffect, useState } from "react";
import kpd from "../../assets/grasss.jpg";
import Image from "next/image";
import FAQSection from "../../components/Faq";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer); // Cleanup
  }, []);
  return (
    <div>
      {/* <!-- Open Graph Meta Tags --> */}
      <meta
        property="og:title"
        content="Buy & Sell Real Estate in Delhi NCR & Dubai"
      />
      <meta
        property="og:description"
        content="Looking to buy or sell property in Delhi NCR or Dubai? Khalsa Property Dealers helps you discover verified homes and commercial spaces with complete transparency, expert support, and trusted real estate experience."
      />
      <meta
        property="og:image"
        content="https://www.khalsapropertydealers.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.87c58a64.png&w=256&q=75&dpl=dpl_GkcBtjPsnWVhNpEhUKxk34bPodaq"
      />
      <meta
        property="og:url"
        content="https://www.khalsapropertydealers.com/"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Khalsa Property Dealers" />
      <meta property="og:locale" content="en_US" />

      <title>Buy & Sell Real Estate in Delhi NCR & Dubai</title>
      <meta
        name="description"
        content="Looking to buy or sell property in Delhi NCR or Dubai? Khalsa Property Dealers helps you discover verified homes and commercial spaces with complete transparency, expert support, and trusted real estate experience."
      />
      <link rel="canonical" href="https://www.khalsapropertydealers.com/" />
      <Nav />
      <Hero />
      <section className="py-12 bg-white">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT — IMAGE */}
          <div className="w-full">
            <Image
              src="https://res.cloudinary.com/dqrlkbsdq/image/upload/v1764847004/KPD_Blog_Featured_Image_2_euerkl.png"
              alt="Real Estate Consultant Delhi"
              className="rounded-xl shadow-lg w-full object-cover"
              width={400}
              height={400}
            />
          </div>

          {/* RIGHT — CONTENT */}
          <div>
            <h2 className="uppercase text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 tracking-widest ">
              Your Trusted Real Estate Consultant in Delhi
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              When it comes to finding the perfect home or commercial property,
              you need expert guidance you can trust. As leading Real Estate
              Dealers in Delhi, we specialize in:
            </p>

            <ul className="text-gray-700 space-y-2">
              <li>● Residential Properties (Flats, Builder Floors, Plots)</li>
              <li>● Commercial Properties (Shops, Offices, Showrooms)</li>
              <li>● Real Estate Investment Consultation</li>
            </ul>

            <p className="text-gray-600 leading-relaxed mt-5">
              Whether you are a first-time buyer or a seasoned investor, we make
              the entire process seamless, transparent, and profitable.
            </p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="w-11/12 md:w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT — CONTENT */}
          <div>
            <h2 className="uppercase text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 tracking-widest">
              Why Choose Khalsa Property Dealers?
            </h2>

            <p className="text-gray-600 leading-relaxed mb-5">
              Reliable, Professional & Customer-Focused
              <br />
              We’re known among the top Property Dealers in Delhi for our
              commitment to quality service and genuine dealings. Here’s why
              clients trust us:
            </p>

            <ul className="text-gray-700 space-y-2">
              <li>✔ 15+ Years of Real Estate Experience</li>
              <li>✔ Verified & Updated Property Listings</li>
              <li>✔ Honest Pricing with No Hidden Charges</li>
              <li>✔ Complete Assistance from Site Visit to Documentation</li>
              <li>✔ Expertise in Both Residential & Commercial Deals</li>
              <li>✔ Personalized Consultation for Every Client</li>
            </ul>

            <p className="text-gray-600 leading-relaxed mt-5">
              Our goal is simple – to help you buy or sell property with
              confidence.
            </p>
          </div>

          {/* RIGHT — IMAGE */}
          <div className="w-full">
            <Image
              src="https://res.cloudinary.com/dcq2oziz4/image/upload/v1764236089/WhatsApp_Image_2025-11-27_at_1.50.03_PM_1_hbxcts.jpg"
              alt="Real Estate Consultant Delhi"
              className="rounded-xl shadow-lg w-full object-cover"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      <About />
      <LatestLaunches />
      <Testimonials />
      <FeaturedProjects />
      <FAQSection />
      <Footer />
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
    </div>
  );
}
