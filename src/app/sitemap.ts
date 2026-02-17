import { MetadataRoute } from "next";

interface BlogType {
  slug: string;
  datePublished: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.khalsapropertydealers.com";

  let blogs: BlogType[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/blog/viewblog`,
      { next: { revalidate: 3600 } },
    );

    if (res.ok) {
      blogs = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/blogs",
    "/contact",
    "/buy-properties",
    "/sell-properties",
    "/offplan-properties",
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
