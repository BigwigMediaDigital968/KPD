"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "Who is the best property dealer in Delhi for buying a home?",
      a: "Khalsa Property Dealers is widely recognized as one of the best property dealers in Delhi for buying residential properties. We provide verified listings, transparent pricing, and expert guidance.",
    },
    {
      q: "How can property dealers in Delhi help me find the right residential property?",
      a: "Professional property dealers in Delhi understand the local market, verify properties, negotiate prices, and guide you through the entire buying process to ensure a safe and smooth experience.",
    },
    {
      q: "Why should I choose Khalsa Property Dealers over other real estate dealers in Delhi?",
      a: "We are known for honest advice, genuine properties, and customer-focused service. As trusted real estate dealers in Delhi, we show only verified residential options without pushing unnecessary choices.",
    },
    {
      q: "What services does your real estate consultant in Delhi provide?",
      a: "As an experienced real estate consultant in Delhi, we help buyers with property search, market insights, area comparison, legal guidance, and support until the deal is finalized.",
    },
    {
      q: "How do I know if the property I’m buying is legally safe?",
      a: "Our team ensures that every listing is verified. We check documentation, ownership details, and approvals before presenting any property.",
    },
    {
      q: "How much does it cost to hire a property dealer in Delhi?",
      a: "Charges may vary from property to property, but our fees are transparent and discussed clearly during consultation.",
    },
    {
      q: "Can you help me compare different areas in Delhi based on my budget?",
      a: "Yes. We help you compare locations, pricing trends, connectivity, and future value to choose the best area for your home.",
    },
    {
      q: "How quickly can you help me find a suitable home in Delhi?",
      a: "Most buyers find a property within a few days to a few weeks depending on requirements.",
    },
    {
      q: "Do you assist with negotiation and paperwork?",
      a: "Absolutely. We assist with negotiation, verification, documentation, and smooth finalization of the property deal.",
    },
    {
      q: "How do I get started with Khalsa Property Dealers?",
      a: "Simply contact our team with your requirements. We'll schedule a consultation and show you verified residential listings.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white">
      <div className="w-11/12 md:w-5/6 mx-auto">
        <h2 className="uppercase tracking-widest text-gray-500 text-sm mb-2">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <h2 className="uppercase text-2xl md:text-3xl font-semibold text-[var(--primary-color)] mb-6 tracking-widest">
          Everything You Need to Know
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer with smooth transition */}
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-40 p-5 pt-0" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
