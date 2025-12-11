"use client";

import React, { useState } from "react";
import axios from "axios";
import type { AxiosError } from "axios";
import { FiX, FiMail, FiUser, FiPhone, FiCheckCircle } from "react-icons/fi";

interface PopupFormProps {
  onClose: () => void;
}

export default function PopupFormModern({ onClose }: PopupFormProps) {
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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        formData
      );
      setStatusMessage("OTP sent! Check your email — expires in 10 minutes.");
      setOtpSentAt(Date.now());
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
      setStatusMessage("Lead saved successfully! 👌");
      // show success then close
      setTimeout(onClose, 1300);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setStatusMessage(axiosError.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const canResend = otpSentAt ? Date.now() - otpSentAt > 30000 : true; // 30s
  const resendOtp = async () => {
    if (!canResend) return;
    setLoading(true);
    setStatusMessage("");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/lead/send-otp`,
        formData
      );
      setStatusMessage("OTP resent. Check your email.");
      setOtpSentAt(Date.now());
      setStep("otp");
    } catch (err) {
      setStatusMessage("Unable to resend OTP. Try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50">
      <div className="relative w-full max-w-lg">
        {/* Card */}
        <div className="rounded-2xl backdrop-blur-lg bg-gradient-to-br from-white/6 to-white/3 border border-white/6 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-tr from-[#14469d] to-[#2260cc] text-white shadow-md">
                <FiCheckCircle className="text-xl" />
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold">
                  Let's Grow Together
                </h3>
                <p className="text-sm text-white/80">
                  Quick connect — premium support
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="p-2 rounded-md hover:bg-white/6 text-white/90"
            >
              <FiX className="text-lg" />
            </button>
          </div>

          <div className="px-6 pb-6">
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`flex-1 h-1 rounded-full ${step === "form" ? "bg-gradient-to-r from-[#14469d] to-[#2260cc]" : "bg-white/10"}`}
              />
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${step === "otp" ? "bg-gradient-to-r from-[#14469d] to-[#2260cc] text-white" : "bg-white/6 text-white/80"}`}
              >
                {step === "form" ? "Step 1: Details" : "Step 2: Verify"}
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 gap-3">
              {step === "form" ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="col-span-2">
                      <div className="relative">
                        <FiUser className="absolute left-3 top-3 text-white/70" />
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full name"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/4 border border-white/6 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#DA4D42]/30"
                          required
                        />
                      </div>
                    </label>

                    <label className="col-span-2 md:col-span-1">
                      <div className="relative">
                        <FiMail className="absolute left-3 top-3 text-white/70" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email ID"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/4 border border-white/6 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#DA4D42]/30"
                          required
                        />
                      </div>
                    </label>

                    <label className="col-span-2 md:col-span-1">
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-3 text-white/70" />
                        <input
                          type="tel"
                          name="phone"
                          pattern="\d{10}"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Mobile no"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/4 border border-white/6 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#DA4D42]/30"
                          required
                        />
                      </div>
                    </label>

                    <label className="col-span-2">
                      <select
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="w-full py-3 pl-4 pr-8 rounded-xl bg-white/4 border border-white/6 text-white outline-none 
               focus:ring-2 focus:ring-[#DA4D42]/30 appearance-none"
                        required
                      >
                        <option value="" className="text-black bg-white">
                          Select purpose
                        </option>
                        <option value="buy" className="text-black bg-white">
                          Buy Property
                        </option>
                        <option value="sell" className="text-black bg-white">
                          Sell Property
                        </option>
                      </select>
                    </label>

                    <label className="col-span-2">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Explain your requirements (min 50 chars)"
                        className="w-full p-3 rounded-xl bg-white/4 border border-white/6 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#DA4D42]/30 resize-none"
                        rows={4}
                        required
                      />
                    </label>

                    <div className="col-span-2 flex gap-3 items-center">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3 rounded-full bg-gradient-to-r from-[#14469d] to-[#2260cc] text-white font-semibold shadow-lg hover:scale-[1.01] transition-transform disabled:opacity-60"
                      >
                        {loading ? "Sending..." : "Send OTP & Connect"}
                      </button>
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-full border border-white/8 text-white/90 hover:bg-white/3"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <div>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="w-full pl-4 pr-4 py-3 rounded-xl bg-white/4 border border-white/6 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#22c55e]/20"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 rounded-full bg-green-600 text-white font-semibold shadow hover:scale-[1.01] transition-transform disabled:opacity-60"
                    >
                      {loading ? "Verifying..." : "Verify & Finish"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep("form")}
                      className="px-4 py-3 rounded-full border border-white/8 text-white/90 hover:bg-white/3"
                    >
                      Edit Details
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm text-white/70">
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={!canResend || loading}
                      className="underline"
                    >
                      {canResend ? "Resend OTP" : "Resend in 30s"}
                    </button>

                    <div className="text-right text-xs">
                      OTP will expire in 10 minutes
                    </div>
                  </div>
                </form>
              )}

              {statusMessage && (
                <div className="mt-2 px-4 py-2 rounded-lg bg-white/6 text-white text-sm">
                  {statusMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Accent blur ring */}
        <div className="pointer-events-none absolute -bottom-6 right-6 w-36 h-36 rounded-full opacity-30 bg-gradient-to-br from-[#DA4D42] to-[#FF7A66] blur-3xl" />
      </div>
    </div>
  );
}
