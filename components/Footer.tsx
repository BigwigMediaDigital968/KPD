"use client";
import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setMessage("🎉 Subscription successful!");
      setEmail("");
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0f0f0f] text-white px-6 py-10 md:px-16 lg:px-24">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
        {/* Left Column */}
        <div className="flex-1">
          <Image
            src={logo}
            alt="KHALSA PROPERTY DEALERS Properties"
            draggable="false"
            width={100}
            height={50}
          />
          <p className="text-sm leading-relaxed text-gray-300 text-justify mt-3">
            Khalsa Property Dealers, operating in Gulabi Bagh, Sanjay Nagar
            since 2007, is a trusted real estate firm with 18+ years of
            experience and 3+ offices across Delhi NCR. With 65+ projects and
            2,000+ clients, we now also serve Goa and Dubai, delivering dream
            homes and high-value investment opportunities on time.
          </p>
        </div>

        {/* Center Columns */}
        <div className="flex flex-row gap-10 flex-wrap flex-1">
          {/* Quick Links */}
          <div className="min-w-[150px]">
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="text-gray-300 space-y-1">
              <li>
                <Link href="/about">› About Us</Link>
              </li>
              <li>
                <Link href="/projects">› Projects</Link>
              </li>
              <li>
                <Link href="/blogs">› Blog</Link>
              </li>
              <li>
                <Link href="/contact">› Contact</Link>
              </li>
            </ul>
          </div>

          {/* Property Type */}
          <div className="min-w-[150px]">
            <h3 className="font-semibold text-lg mb-3">Property Type</h3>
            <ul className="text-gray-300 space-y-1">
              <li>› Commercial</li>
              <li>› Residential</li>
              <li>› Builder Floor</li>
              <li>› Plots</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-3">Contact Info</h3>
          <div className="text-sm space-y-3 text-gray-300">
            <p className="flex items-start">
              <MapPin className="w-5 h-5 mt-1 mr-2" />
              Plot 2, Sanjay Nagar, Gulabi Bagh, Delhi - 110007
            </p>
            <p className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <a href="mailto:info@khalsaproperty.in">info@khalsaproperty.in</a>
            </p>
            <p className="flex items-center">
              <Phone className="w-5 h-5 mr-2" /> +91 9212717362
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <Link
              href="https://www.facebook.com/khalsaproperties"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-6 h-6 text-white hover:text-[#4267B2]" />
            </Link>
            <Link
              href="https://www.instagram.com/khalshapropertydealers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-6 h-6 text-white hover:text-[#C13584]" />
            </Link>
          </div>

          {/* Subscription */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Unlock the vault of deals</p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email Address"
                className="px-3 py-2 bg-transparent text-white text-sm flex-grow mb-2 sm:mb-0 sm:mr-2 border border-gray-500 rounded-md placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)]"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-[var(--primary-color)] text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50 hover:bg-blue-800 transition-all"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {message && <p className="mt-2 text-sm">{message}</p>}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
        {/* Left: Copyright */}
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">
            Khalsa Property Dealers
          </span>
          . All rights reserved.
        </p>

        {/* Center: Terms and Privacy */}
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <Link
            href="/terms"
            className="hover:text-[var(--primary-color)] transition-colors"
          >
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link
            href="/privacy"
            className="hover:text-[var(--primary-color)] transition-colors"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Right: Bigwig Media */}
        <div className="mt-2 sm:mt-0 text-center sm:text-right">
          Made & Marketed by{" "}
          <Link
            href="https://www.bigwigmediadigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary-color)] hover:underline transition-colors"
          >
            Bigwig Media Digital
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
