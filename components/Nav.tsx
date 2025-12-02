"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { usePathname } from "next/navigation"; // ✅ Fix SSR-safe pathname
import Link from "next/link";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertyOpen, setPropertyOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "HOME", href: "/" },
    { label: "ABOUT US", href: "/about" },
    {
      label: "PROPERTY",
      dropdown: [
        { label: "BUY", href: "/buy-properties" },
        { label: "SELL", href: "/sell-properties" },
        { label: "OFF-PLAN", href: "/offplan-properties" },
      ],
    },
    { label: "PROJECTS", href: "/projects" },
    { label: "BLOGS", href: "/blogs" },
    { label: "CONTACT US", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-br from-[var(--color5)] via-[var(--color1)] to-[var(--color3)] shadow-md">
      {/* Main Header ONLY */}
      <div className="flex items-center justify-between w-11/12 md:w-5/6 mx-auto py-2">
        {/* Logo */}
        <div className="flex items-center py-2">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Khalsa Property Dealers"
              width={100}
              height={50}
              className="h-14 w-auto object-contain"
              draggable="false"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-[#04365b] font-medium text-sm">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group">
                <button className="flex items-center space-x-1 hover:text-[var(--primary-color)]">
                  <span>{link.label}</span>
                  <ChevronDown size={16} />
                </button>

                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {link.dropdown.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      className={`block px-4 py-2 whitespace-nowrap ${
                        pathname === sublink.href
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? "border-b-2 border-[var(--secondary-color)] pb-1"
                    : "hover:text-[var(--primary-color)]"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {menuOpen ? (
            <X
              onClick={() => setMenuOpen(false)}
              className="w-6 h-6 text-[#04365b]"
            />
          ) : (
            <Menu
              onClick={() => setMenuOpen(true)}
              className="w-6 h-6 text-[#04365b]"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-[#04365b] font-medium">
          {links.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setPropertyOpen(!propertyOpen)}
                  className="flex justify-between w-full items-center"
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${propertyOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {propertyOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    {link.dropdown.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block ${
                          pathname === sublink.href
                            ? "text-[var(--secondary-color)] font-bold"
                            : "hover:text-[#c9a368]"
                        }`}
                      >
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block ${
                  pathname === link.href
                    ? "text-[var(--secondary-color)] font-bold"
                    : "hover:text-[#c9a368]"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
