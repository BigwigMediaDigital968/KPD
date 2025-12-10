"use client";
import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  startCounting: boolean;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  startCounting,
}) => {
  const [count, setCount] = useState(0);
  const startTimestamp = useRef<number | null>(null);

  useEffect(() => {
    if (!startCounting) {
      setCount(0);
      startTimestamp.current = null;
      return;
    }

    const step = (timestamp: number) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = timestamp - startTimestamp.current;
      const progressRatio = Math.min(progress / duration, 1);
      setCount(Math.floor(progressRatio * end));
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);

    return () => {
      startTimestamp.current = null;
    };
  }, [startCounting, end, duration]);

  return <>{count.toLocaleString()}</>;
};

const About: React.FC = () => {
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (!metricsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartCount(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  const metrics = [
    { label: "Properties Sold", value: 1000 },
    { label: "Khalsa Team Members", value: 20 },
    { label: "Happy Customers", value: 2000 },
    { label: "Projects Completed", value: 65 },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-r from-gray-50 via-white to-gray-100">
      <div className="w-11/12 md:w-5/6 mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="uppercase tracking-widest text-gray-500 text-sm mb-2">
            About Us
          </h2>
          <h2 className="uppercase text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 tracking-widest">
            Khalsa Property Dealers
          </h2>

          <p className="text-md leading-relaxed mb-6 text-gray-700  text-justify">
            At Khalsa Property Dealers, we take pride in being recognized as
            reliable Real Estate Dealers in Delhi with a strong reputation for
            professional guidance and honest transactions. Our deep
            understanding of the Delhi property market allows us to offer
            unmatched expertise. As your dedicated Real Estate Consultant in
            Delhi, we help you choose the right property based on your budget,
            location preference, and long-term goals.
          </p>
          <p className="text-md leading-relaxed mb-6 text-gray-700  text-justify">
            Whether you want to buy your dream home, invest in commercial space,
            or sell your property at the best market price, our team is here to
            assist you every step of the way.
          </p>

          <a
            href="/about"
            className="inline-block bg-[var(--primary-color)] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:scale-105 transition"
          >
            Know More
          </a>
        </div>

        {/* Right Metrics */}
        <div ref={metricsRef} className="grid grid-cols-2 gap-6">
          {metrics.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md p-8 text-center transition"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2">
                <CountUp end={item.value} startCounting={startCount} />
                {item.value > 1000 ? "+" : "+"}
              </h3>
              <p className="text-base md:text-lg font-semibold text-gray-600 font-annie">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
