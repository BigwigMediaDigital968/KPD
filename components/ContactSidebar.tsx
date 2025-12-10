"use client";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaArrowRight,
  FaArrowLeft,
  FaPhoneAlt,
} from "react-icons/fa";

const ContactSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
      {isOpen ? (
        <div className="flex flex-col items-center rounded-l-xl overflow-hidden shadow-lg transition-all duration-300">
          {/* Collapse Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-12 h-14 bg-black flex items-center justify-center text-white cursor-pointer"
          >
            <FaArrowRight />
          </button>

          {/* Contact Options */}
          <a
            href="/contact"
            className="w-12 h-24 bg-[var(--primary-color)] flex items-center justify-center text-white cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-xs rotate-180 writing-vertical">
                Contact Us
              </span>
            </div>
          </a>

          <a
            href="https://wa.me/+919212717362"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-14 bg-green-500 flex items-center justify-center text-white cursor-pointer"
          >
            <FaWhatsapp />
          </a>

          <a
            href="tel:+919212717362"
            className="w-12 h-14 bg-black flex items-center justify-center text-white cursor-pointer"
          >
            <FaPhoneAlt />
          </a>
        </div>
      ) : (
        // Minimized version with only left-arrow
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-14 bg-black rounded-l-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
        >
          <FaArrowLeft />
        </button>
      )}
    </div>
  );
};

export default ContactSidebar;
