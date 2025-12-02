"use client";
import { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import grass from "../assets/afgsg.jpg";
import Image from "next/image";
interface PopupFormProps {
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onClose }) => {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        formData
      );
      setStatusMessage("OTP sent! Please check your email.");
      setStep("otp");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      if (axiosError.response?.status === 400) {
        setStatusMessage(
          axiosError.response.data?.message || "Email already used."
        );
      } else {
        setStatusMessage("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/verify-otp`,
        {
          email: formData.email,
          otp,
        }
      );
      setStatusMessage("Lead saved successfully!");
      setTimeout(onClose, 2000);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setStatusMessage(axiosError.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
      {/* POPUP CARD */}
      <div className="bg-white max-w-sm w-full rounded-xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-black"
        >
          ✕
        </button>

        {/* Header Image */}
        <div className="w-full h-32">
          <Image
            src={grass} // ← Replace with your own greenery image
            className="w-full h-full object-cover"
            alt="Header"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto bg-[var(--color1)]">
          {/* Title */}
          <h2 className="text-xl font-semibold text-green-700 text-center mb-1">
            Let's Connect!
          </h2>
          {/* FORM LOGIC */}
          {step === "form" ? (
            <form className="space-y-4" onSubmit={handleSendOtp}>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 ">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* --- Styled divider with plus icon --- */}
              <div className="flex items-center justify-center my-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-2 text-green-700 text-lg font-bold">+</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Purpose
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-400"
                  required
                >
                  <option value="">Select Purpose</option>
                  <option value="buy">Buy Property</option>
                  <option value="sell">Sell Property</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-400"
                  placeholder="Explain your requirements (minimum 50 characters)"
                  required
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                {loading ? "Sending OTP..." : "Sign Up"}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              <label className="text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* Status Message */}
          {statusMessage && (
            <p className="text-sm text-center mt-3 text-gray-700">
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
