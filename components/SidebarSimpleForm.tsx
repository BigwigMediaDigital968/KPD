"use client";

import React, { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";

export default function SidebarSimpleForm() {
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
  const [otpSentAt, setOtpSentAt] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== SEND OTP =====
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        formData
      );
      setStatusMessage("OTP sent to your email.");
      setOtpSentAt(Date.now());
      setStep("otp");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setStatusMessage(
        axiosError.response?.data?.message || "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===== VERIFY OTP =====
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
      setStatusMessage("Thank you! Our team will contact you soon.");

      setTimeout(() => {
        setStep("form");
        setFormData({
          name: "",
          email: "",
          phone: "",
          purpose: "",
          message: "",
        });
        setOtp("");
      }, 1500);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setStatusMessage(axiosError.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const canResend = otpSentAt ? Date.now() - otpSentAt > 30000 : true;

  const resendOtp = async () => {
    if (!canResend) return;

    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        formData
      );
      setStatusMessage("OTP resent.");
      setOtpSentAt(Date.now());
    } catch {
      setStatusMessage("Unable to resend OTP. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <p className="text-sm text-gray-500 mb-4">
        Fill the form & verify via OTP
      </p>

      {step === "form" ? (
        <form onSubmit={handleSendOtp} className="space-y-3">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />

          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          >
            <option value="">Select Purpose</option>
            <option value="buy">Buy Property</option>
            <option value="sell">Sell Property</option>
          </select>

          <textarea
            name="message"
            placeholder="Your requirement"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary-color)] text-white py-2 rounded-md font-semibold text-sm"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-3">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border rounded-md px-3 py-2 text-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold text-sm"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={resendOtp}
            disabled={!canResend || loading}
            className="text-xs underline text-gray-600"
          >
            {canResend ? "Resend OTP" : "Resend in 30s"}
          </button>
        </form>
      )}

      {statusMessage && (
        <p className="mt-3 text-center text-sm text-gray-600">
          {statusMessage}
        </p>
      )}
    </div>
  );
}
