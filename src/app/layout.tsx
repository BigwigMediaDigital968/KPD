import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ScrollToTopButton from "../../components/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Site Verification */}
        <meta
          name="google-site-verification"
          content="01qxqZ3EUKX959czFvlJ3xKEGPFDCcGL1y1ZFj8dWKM"
        />

        {/* ✅ Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N9CHCS7D6P"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N9CHCS7D6P');
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* ✅ RealEstateAgent Schema */}
        <Script
          id="realestate-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "@id": "https://www.khalsapropertydealers.com/#localbusiness",
            name: "Khalsa Property Dealers",
            image:
              "https://www.khalsapropertydealers.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.87c58a64.png&w=256&q=75&dpl=dpl_5eZJcmVLYCpq9A5GQYo989anqtNM",
            url: "https://www.khalsapropertydealers.com/",
            telephone: "+91 9212717362",
            priceRange: "₹₹₹",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Plot 2, Sanjay Nagar, Gulabi Bagh",
              addressLocality: "Delhi",
              addressRegion: "Delhi",
              postalCode: "110007",
              addressCountry: "IN",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "10:00",
                closes: "19:45",
              },
            ],
            sameAs: [
              "https://www.facebook.com/khalsaproperties",
              "https://www.instagram.com/kpd_developers?igsh=MXV5bzI4bjZwczR2bA==",
            ],
            description:
              "With our area ability and accomplished professionals, we are able to accommodate our clients Construction and Architectural Services. We provide residential apartments, Kothis, Villas, and Real Estate Consultancy Services like Industrial Property, Warehouse Services, Commercial Property Services, and Property Renting Services in Delhi/NCR.",
          })}
        </Script>

        {/* ✅ FAQ Schema */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What services does Khalsa Property Dealers offer in Delhi NCR?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Khalsa Property Dealers specializes exclusively in property sale and purchase services across Delhi, Gurgaon, and NCR, dealing in residential, commercial, and luxury real estate.",
                },
              },
              {
                "@type": "Question",
                name: "Why choose Khalsa Property Dealers over other real estate companies in Delhi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Khalsa Property Dealers stands out for its trust, transparency, and ethical property dealings. The team provides end-to-end support for buying and selling properties, ensuring clients make secure and profitable investments.",
                },
              },
              {
                "@type": "Question",
                name: "Does Khalsa Property Dealers deal in both residential and commercial properties?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Khalsa Property Dealers deals in residential and commercial sale and purchase properties, offering premium options in Delhi NCR and Dubai.",
                },
              },
              {
                "@type": "Question",
                name: "Are Khalsa Property Dealers RERA registered?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Khalsa Property Dealers is a RERA-registered real estate company, ensuring legal, transparent, and verified property transactions for every client.",
                },
              },
              {
                "@type": "Question",
                name: "How can I contact Khalsa Property Dealers for property consultation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can contact Khalsa Property Dealers at +91 9212717362, visit the office at Plot 2, Sanjay Nagar, Gulabi Bagh, Delhi, or reach out through the official website www.khalsapropertydealers.com.",
                },
              },
              {
                "@type": "Question",
                name: "Does Khalsa Property Dealers assist with property documentation and registration?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Khalsa Property Dealers provides complete assistance for property documentation, registration, and legal verification, ensuring a smooth and secure transaction process.",
                },
              },
              {
                "@type": "Question",
                name: "Can Khalsa Property Dealers help me sell my property quickly in Delhi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. Khalsa Property Dealers leverages strong market networks and verified buyer databases to help you sell your property faster and at the best market price.",
                },
              },
              {
                "@type": "Question",
                name: "Do Khalsa Property Dealers offer property investment advice?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, the team offers expert property investment guidance to help clients choose high-value and growth-oriented properties in Delhi NCR and Dubai.",
                },
              },
              {
                "@type": "Question",
                name: "What areas does Khalsa Property Dealers cover in Delhi NCR?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Khalsa Property Dealers operates in key locations like Gurgaon, Rohini, Pitampura, Model Town, Dwarka, and Saket, along with other prime real estate zones across Delhi NCR.",
                },
              },
              {
                "@type": "Question",
                name: "Does Khalsa Property Dealers offer luxury property options in Gurgaon and Dubai?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Khalsa Property Dealers specializes in premium and luxury property sales in Gurgaon’s upscale sectors and Dubai’s elite developments.",
                },
              },
              {
                "@type": "Question",
                name: "How long has Khalsa Property Dealers been in the real estate industry?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Khalsa Property Dealers has over a decade of experience in the real estate sector, earning a reputation for trust, transparency, and client satisfaction.",
                },
              },
              {
                "@type": "Question",
                name: "Can Khalsa Property Dealers help NRI clients buy or sell property in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Khalsa Property Dealers provides NRI property assistance for buying and selling properties in India, managing documentation, legalities, and coordination seamlessly.",
                },
              },
              {
                "@type": "Question",
                name: "Does Khalsa Property Dealers charge a commission?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Khalsa Property Dealers charges a standard and transparent service commission, clearly discussed before finalizing any deal.",
                },
              },
              {
                "@type": "Question",
                name: "What makes Khalsa Property Dealers a trusted real estate company in Delhi?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Their honest consultation, verified listings, and RERA-compliant services make Khalsa Property Dealers one of the most trusted property dealers in Delhi.",
                },
              },
              {
                "@type": "Question",
                name: "Can I visit Khalsa Property Dealers’ office for property consultation?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can visit Khalsa Property Dealers at Plot 2, Sanjay Nagar, Gulabi Bagh, Delhi, for free property consultation and verified property options.",
                },
              },
            ],
          })}
        </Script>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
