"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "PULKIT",
    message:
      "Khalsa Property Dealers helped me find the right residential property after months of searching. Truly the best property dealer in Delhi when it comes to genuine listings and honest advice.",
  },
  {
    name: "KIRTI BEDI",
    message:
      "I had been looking for reliable property dealers in Delhi to purchase a family home, and their team guided me perfectly. Very professional and patient throughout the entire process.",
  },
  {
    name: "SAURAV SHARMA",
    message:
      " One of the most trustworthy real estate dealers in Delhi. They showed only verified homes and made sure I understood all the details before finalizing anything.",
  },
  {
    name: "ANITA DESAI",
    message:
      "Their team acted as a genuine real estate consultant in Delhi and helped me choose the right builder floor. I really appreciate their transparent approach.",
  },
  {
    name: "RAHUL VERMA",
    message:
      " Khalsa Property Dealers is definitely the best property dealer in Delhi. They helped me buy my first home and made the entire experience easy and comfortable.",
  },
  {
    name: "PRIYA KAPOOR",
    message:
      " I contacted several property dealers in Delhi, but none were as helpful as Khalsa Property Dealers. They understood exactly what I needed and suggested the perfect residential options.",
  },
  {
    name: "RAJ SINGH",
    message:
      " What I liked most is that they worked like a dedicated real estate consultant in Delhi. They guided me on area advantages, pricing, and future value without any pressure.",
  },
  {
    name: "NEHA GUPTA",
    message:
      "Highly recommended for anyone buying a home. These are truly reliable real estate dealers in Delhi who focus on customer needs rather than just closing a deal.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-16 font-raleway bg-gray-50 text-black relative">
      <div className="w-11/12 md:w-5/6 mx-auto">
        {/* Section Label */}
        <p className="uppercase tracking-widest text-gray-500 text-sm mb-2">
          Testimonials
        </p>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mt-2 text-start mb-8 tracking-widest">
          WHAT PEOPLE SAY
        </h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop
          centeredSlides
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-md h-72 flex flex-col justify-between hover:shadow-lg transition duration-300 relative">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-[var(--primary-color)] text-3xl opacity-30 mb-3" />

                {/* Message */}
                <p className="text-base leading-relaxed text-gray-700 font-annie line-clamp-5">
                  {testimonial.message}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--primary-color)]">
                    — {testimonial.name}
                  </h3>

                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-sm font-bold uppercase">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
