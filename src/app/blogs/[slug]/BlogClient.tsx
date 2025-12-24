"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import PopupForm from "../../../../components/PopUpForm";
import Image from "next/image";
import ContactSidebar from "../../../../components/ContactSidebar";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function BlogClient({
  blog,
  relatedBlogs,
}: {
  blog: any;
  relatedBlogs: any[];
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ Listen for popup buttons inside blog HTML
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-open-popup='true']")) {
        setIsPopupOpen(true);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* ======= BLOG HEADER ======= */}
      <section className="w-11/12 md:w-5/6 mx-auto pt-[100px] md:pt-[140px]">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">{blog.title}</h1>
        <p className="text-gray-500 mb-6">
          By <span className="font-semibold">{blog.author}</span> •{" "}
          {new Date(blog.datePublished).toLocaleDateString()}
        </p>
      </section>

      {blog.coverImage && (
        <div className="relative w-11/12 md:w-5/6 mx-auto h-[60vh] md:h-[100vh] rounded-xl overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ======= BLOG CONTENT ======= */}
      <div className="w-11/12 md:w-5/6 mx-auto my-10">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* ======= RELATED BLOGS ======= */}
      {relatedBlogs.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8">Related Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBlogs.map((rel) => (
              <a
                key={rel.slug}
                href={`/blogs/${rel.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="relative h-48">
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ======= POPUP ======= */}
      {isPopupOpen && <PopupForm onClose={() => setIsPopupOpen(false)} />}

      <div className="hidden md:block">
        <ContactSidebar />
      </div>

      <Footer />

      {/* ======= MOBILE CTA ======= */}
      <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
        <a
          href="tel:+919212717362"
          className="w-1/2 bg-[var(--primary-color)] text-white py-3 flex justify-center gap-2"
        >
          <FaPhoneAlt /> Call Us
        </a>
        <a
          href="https://wa.me/+919212717362"
          className="w-1/2 bg-white text-green-500 py-3 flex justify-center gap-2"
        >
          <FaWhatsapp /> WhatsApp
        </a>
      </div>
    </div>
  );
}
