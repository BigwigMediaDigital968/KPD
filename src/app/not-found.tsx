"use client";

import Link from "next/link";
import { Home, ArrowRight, Phone, Mail } from "lucide-react";
import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";

const quickLinks = [
  { label: "Buy Property", href: "/buy-properties" },
  { label: "Sell Property", href: "/sell-properties" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 pt-50"
        style={{ backgroundColor: "var(--color1)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          {[20, 40, 60, 80].map((y) => (
            <div
              key={y}
              className="absolute w-full h-px"
              style={{
                top: `${y}%`,
                background:
                  "linear-gradient(90deg, transparent, rgba(20,70,157,0.1), transparent)",
              }}
            />
          ))}
          {[20, 50, 80].map((x) => (
            <div
              key={x}
              className="absolute h-full w-px"
              style={{
                left: `${x}%`,
                background:
                  "linear-gradient(180deg, transparent, rgba(20,70,157,0.1), transparent)",
              }}
            />
          ))}

          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center font-bold"
            style={{
              fontSize: "clamp(160px, 30vw, 360px)",
              color: "rgba(20,70,157,0.05)",
            }}
          >
            404
          </div>
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 w-11/12 md:w-5/6 grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <div>
            {/* Heading Tag */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-[2px]"
                style={{ backgroundColor: "var(--primary-color)" }}
              />
              <span
                className="uppercase text-xs tracking-widest font-semibold"
                style={{ color: "var(--primary-color)" }}
              >
                Page Not Found
              </span>
            </div>

            {/* 404 */}
            <h1
              className="font-bold leading-none mb-3"
              style={{
                fontSize: "clamp(80px, 12vw, 140px)",
                color: "transparent",
                WebkitTextStroke: "2px var(--primary-color)",
              }}
            >
              404
            </h1>

            {/* Title */}
            <h2
              className="mb-4 font-bold"
              style={{
                fontSize: "clamp(22px, 3vw, 34px)",
                color: "var(--primary-color)",
                fontFamily: "var(--font-raleway)",
              }}
            >
              Property Not Found
            </h2>

            {/* Desc */}
            <p
              className="text-sm md:text-base mb-8 max-w-md"
              style={{ color: "#555" }}
            >
              The property or page you're looking for might have been removed,
              renamed, or is temporarily unavailable. Let us help you find the
              perfect property.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition hover:scale-105"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                }}
              >
                <Home size={16} />
                Home
              </Link>

              <a
                href="tel:+919212717362"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border transition hover:bg-[var(--secondary-color)] hover:text-white"
                style={{
                  borderColor: "var(--secondary-color)",
                  color: "var(--secondary-color)",
                }}
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div>
            <div
              className="rounded-2xl overflow-hidden shadow-lg"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              {/* Header */}
              <div
                className="px-6 py-5"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                }}
              >
                <p className="text-xs uppercase tracking-widest opacity-80">
                  Explore
                </p>
                <p className="font-semibold text-lg">Khalsa Property Dealers</p>
              </div>

              {/* Links */}
              <div className="divide-y">
                {quickLinks.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between px-6 py-4 group transition hover:bg-[var(--color2)]"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {label}
                    </span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition"
                      style={{ color: "var(--primary-color)" }}
                    />
                  </Link>
                ))}
              </div>

              {/* Contact Section */}
              <div
                className="px-6 py-5 flex flex-col gap-2"
                style={{
                  backgroundColor: "var(--color2)",
                }}
              >
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Need Help?
                </p>

                <a
                  href="tel:+919212717362"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "var(--primary-color)" }}
                >
                  <Phone size={14} /> +91 9212717362
                </a>

                <a
                  href="mailto:info@khalsaproperty.in"
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "var(--secondary-color)" }}
                >
                  <Mail size={14} /> info@khalsaproperty.in
                </a>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-center mt-5 text-xs text-gray-500">
              Khalsa Property Dealers · Trusted Real Estate Partner
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
