"use client";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface FAQ {
  question: string;
  answer: string;
}

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string;
  coverImage?: string;
  coverImageAlt?: string;
  schemaMarkup?: string[];
  faqs?: FAQ[];
}

const AddBlog = ({
  onClose,
  onSuccess,
  existingBlog = null,
}: {
  onClose: () => void;
  onSuccess: () => void;
  existingBlog?: BlogPost | null;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
    coverImageAlt: "",
    coverImage: null as File | null,
    schemaMarkup: [""],
    faqs: [{ question: "", answer: "" }],
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        author: existingBlog.author,
        tags: existingBlog.tags || "",
        coverImage: null,
        coverImageAlt: existingBlog.coverImageAlt || "",
        schemaMarkup:
          existingBlog.schemaMarkup && existingBlog.schemaMarkup.length > 0
            ? existingBlog.schemaMarkup
            : [""], // ✅ No `any` needed
        faqs:
          existingBlog.faqs && existingBlog.faqs.length > 0
            ? existingBlog.faqs
            : [{ question: "", answer: "" }],
      });
    }
  }, [existingBlog]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["link"],
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title" && !existingBlog) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: autoSlug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, coverImage: e.target.files![0] }));
    }
  };

  // FAQs Handlers
  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedFaqs = [...formData.faqs];
    updatedFaqs[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      faqs: updatedFaqs,
    }));
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index: number) => {
    const updatedFaqs = formData.faqs.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      faqs: updatedFaqs,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const blogData = new FormData();
      blogData.append("title", formData.title);
      blogData.append("slug", formData.slug);
      blogData.append("excerpt", formData.excerpt);
      blogData.append("content", formData.content);
      blogData.append("author", formData.author);
      blogData.append("tags", formData.tags);
      blogData.append("coverImageAlt", formData.coverImageAlt);

      blogData.append("faqs", JSON.stringify(formData.faqs));
      
      if (formData.coverImage) {
        blogData.append("coverImage", formData.coverImage);
      }
      formData.schemaMarkup.forEach((schema) => {
        blogData.append("schemaMarkup", schema);
      });

      const res = await fetch(
        existingBlog
          ? `${process.env.NEXT_PUBLIC_API_BASE}/blog/${existingBlog.slug}`
          : `${process.env.NEXT_PUBLIC_API_BASE}/blog/add`,
        {
          method: existingBlog ? "PUT" : "POST",
          body: blogData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert(existingBlog ? "Blog updated" : "Blog added");
        onSuccess();
        onClose();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Network or server error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 w-full max-w-2xl rounded-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {existingBlog ? "Edit Blog" : "Add New Blog"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 border"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            className="w-full p-2 border"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="excerpt"
            placeholder="Meta description"
            className="w-full p-2 border"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block font-medium mb-2">Blog Content</label>
            <div className="border rounded overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, content: value }))
                }
                modules={{ toolbar: toolbarOptions }}
                className="react-quill-editor"
              />
            </div>
          </div>

          <input
            type="text"
            name="author"
            placeholder="Author"
            className="w-full p-2 border"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full p-2 border"
            value={formData.tags}
            onChange={handleChange}
          />
          <input
            type="text"
            name="coverImageAlt"
            placeholder="Cover image alt text (SEO)"
            className="w-full p-2 border"
            value={formData.coverImageAlt}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                coverImageAlt: e.target.value,
              }))
            }
          />

          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleImageChange}
            required={!existingBlog}
          />


          <div>
            <label className="block font-medium mb-2">FAQs</label>

            {formData.faqs.map((faq, index) => (
              <div key={index} className="border p-3 mb-3 rounded bg-gray-50">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="w-full p-2 border mb-2"
                />

                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  rows={3}
                  className="w-full p-2 border"
                />

                <div className="mt-2 flex justify-end">
                  {formData.faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addFaq}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              + Add FAQ
            </button>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Schema Markup (JSON-LD)
            </label>
            {formData.schemaMarkup.map((markup, index) => (
              <textarea
                key={index}
                value={markup}
                onChange={(e) => {
                  const updated = [...formData.schemaMarkup];
                  updated[index] = e.target.value;
                  setFormData((prev) => ({ ...prev, schemaMarkup: updated }));
                }}
                placeholder={`Schema Markup ${index + 1}`}
                rows={3}
                className="w-full p-2 border mb-2"
              />
            ))}
            <div className="flex gap-4">
              <button
                type="button"
                className="px-3 py-1 bg-green-600 text-white rounded"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    schemaMarkup: [...prev.schemaMarkup, ""],
                  }))
                }
              >
                + Add Schema
              </button>
              {formData.schemaMarkup.length > 1 && (
                <button
                  type="button"
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      schemaMarkup: prev.schemaMarkup.slice(0, -1),
                    }))
                  }
                >
                  – Remove Last
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${submitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
              disabled={submitting}
            >
              {submitting
                ? existingBlog
                  ? "Updating..."
                  : "Adding..."
                : existingBlog
                  ? "Update"
                  : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
