import { Metadata } from "next";
import Navbar from "../../../../components/Nav";
import Footer from "../../../../components/Footer";
import PopupForm from "../../../../components/PopUpForm";
import Image from "next/image";
import ContactSidebar from "../../../../components/ContactSidebar";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

interface BlogType {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  content: string;
  slug: string;
  category?: string;
  schemaMarkup?: string[];
}

interface RelatedBlogType {
  title: string;
  slug: string;
  coverImage: string;
  excerpt: string;
  datePublished: string;
}

async function getBlog(slug: string): Promise<BlogType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch blog");

  const blogs: BlogType[] = await res.json();
  const found = blogs.find((b) => b.slug === slug);

  if (!found) throw new Error("Blog not found");

  return found;
}

async function getRelatedBlogs(slug: string): Promise<RelatedBlogType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/blog/related/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  return res.json();
}

// ✅ Proper type for dynamic route metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: `https://www.khalsapropertydealers.com/blogs/${blog.slug}`,
    },
  };
}

// ✅ Proper page function type
export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  const relatedBlogs = await getRelatedBlogs(slug);

  return (
    <div className="bg-white text-black min-h-screen">
      {/* <!-- Open Graph Meta Tags --> */}
      <meta property="og:title" content={blog.title} />
      <meta property="og:description" content={blog.excerpt} />
      <meta property="og:image" content={blog.coverImage} />
      <meta
        property="og:url"
        content={`https://www.khalsapropertydealers.com/blogs/${blog.slug}`}
      />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Khalsa Property Dealers" />
      <meta property="og:locale" content="en_IN" />

      {/* ================== AUTO BREADCRUMB SCHEMA ================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.khalsapropertydealers.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: "https://www.khalsapropertydealers.com/blogs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: `https://www.khalsapropertydealers.com/blogs/${blog.slug}`,
              },
            ],
          }),
        }}
      />

      {/* ================== AUTO ARTICLE SCHEMA ================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.khalsapropertydealers.com/blogs/${blog.slug}`,
            },
            headline: blog.title,
            description: blog.excerpt,
            image: [blog.coverImage],
            author: {
              "@type": "Person",
              name: blog.author || "Team KPD",
            },
            publisher: {
              "@type": "Organization",
              name: "Khalsa Property Dealers",
              logo: {
                "@type": "ImageObject",
                url: "https://www.khalsapropertydealers.com/logo.png",
              },
            },
            url: `https://www.khalsapropertydealers.com/blogs/${blog.slug}`,
            datePublished: blog.datePublished,
            dateModified: blog.datePublished,
          }),
        }}
      />

      {/* Schema Markup */}
      {/* {Array.isArray(blog.schemaMarkup) &&
        blog.schemaMarkup.map((markup, idx) => {
          // 🧹 Clean out any <script> wrappers if present
          const cleanMarkup = markup
            .replace(/<\/?script[^>]*>/gi, "") // remove <script> and </script>
            .trim();

          try {
            // ✅ Validate JSON structure before rendering
            JSON.parse(cleanMarkup);
            return (
              <script
                key={idx}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: cleanMarkup }}
              />
            );
          } catch {
            console.warn(`Invalid JSON-LD skipped at index ${idx}`);
            return null;
          }
        })} */}

      <Navbar />

      <section className="w-11/12 md:w-5/6 mx-auto pt-[100px] md:pt-[140px] text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-3">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm md:text-base mb-6">
          By <span className="font-semibold text-gray-800">{blog.author}</span>{" "}
          • {new Date(blog.datePublished).toLocaleDateString()}
        </p>
      </section>

      {blog.coverImage && (
        <div className="relative w-11/12 md:w-5/6 mx-auto h-[60vh] md:h-[100vh] overflow-hidden rounded-xl">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="w-11/12 md:w-5/6 mx-auto my-10">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {relatedBlogs.length > 0 && (
        <section className="w-11/12 md:w-5/6 mx-auto mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Blogs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBlogs.map((rel) => (
              <a
                key={rel.slug}
                href={`/blogs/${rel.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={rel.coverImage}
                    alt={rel.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                    {rel.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {rel.excerpt}
                  </p>

                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(rel.datePublished).toLocaleDateString()}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="bg-[var(--primary-color)] text-white text-center py-16 px-6 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Your Dream Project?
        </h2>
        <button className="bg-white text-[var(--primary-color)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Enquire Now
        </button>
      </section>

      <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
        <div className="w-1/2 bg-[var(--primary-color)] text-white text-center py-3">
          <a
            href="tel:+919212717362"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaPhoneAlt size={18} />
            Call Us
          </a>
        </div>
        <div className="w-1/2 bg-white text-green-500 text-center py-3 border-l border-white">
          <a
            href="https://wa.me/+919212717362"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={18} />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="hidden md:block">
        <ContactSidebar />
      </div>

      <Footer />
    </div>
  );
}
