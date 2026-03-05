"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import PopupForm from "../../../../components/PopUpForm";
import Image from "next/image";
import ContactSidebar from "../../../../components/ContactSidebar";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import BlogSidebar from "../../../../components/BlogSidebar";

export default function BlogClient({
  blog,
  relatedBlogs,
}: {
  blog: any;
  relatedBlogs: any[];
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  console.log(blog);

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
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{blog.title}</h1>
        <p className="text-gray-500 mb-6">
          By <span className="font-semibold">{blog.author}</span> •{" "}
          {new Date(blog.datePublished).toLocaleDateString()}
        </p>
      </section>

      {blog.coverImage && (
        <div className="relative w-11/12 md:w-5/6 mx-auto h-[40vh] md:h-[60vh] lg:h-[100vh] rounded-xl overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.coverImageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* ======= BLOG CONTENT ======= */}
      <section className="w-11/12 md:w-5/6 mx-auto my-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT – BLOG */}
        <article className="lg:col-span-8">
          <div
            className="blog-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* ===== FAQ SECTION ===== */}
          {blog.faqs && blog.faqs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {blog.faqs.map((faq: any, index: number) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* QUESTION */}
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left px-5 py-4 flex justify-between items-center font-semibold text-lg bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
                    >
                      {faq.question}

                      <span className="text-xl">
                        {openFaq === index ? "−" : "+"}
                      </span>
                    </button>

                    {/* ANSWER */}
                    <div
                      className={`px-5 overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? "max-h-[500px] py-4" : "max-h-0"
                        }`}
                    >
                      <p className="text-black leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* RIGHT – SIDEBAR */}
        <div className="lg:col-span-4">
          <BlogSidebar relatedBlogs={relatedBlogs} />
        </div>
      </section>

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
