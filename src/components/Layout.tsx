"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeLink, setActiveLink] = useState("landing-page");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col fixed inset-y-0">
        <div className="p-4 text-2xl font-bold mt-4">Dashboard</div>
        <nav className="flex-1 p-6 space-y-4 mt-20">
          <Link href="/landing-page">
            <span
              onClick={() => handleLinkClick("landing-page")}
              className={`block text-lg p-3 mb-2 rounded-md ${
                activeLink === "landing-page"
                  ? "bg-gray-700 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Landing Page
            </span>
          </Link>
          <Link href="/detail-visit-analysis">
            <span
              onClick={() => handleLinkClick("detail-visit-analysis")}
              className={`block text-lg p-3 rounded-md ${
                activeLink === "detail-visit-analysis"
                  ? "bg-gray-700 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              Detail Visit Analysis
            </span>
          </Link>
        </nav>
        <div className="p-4">
          <Link href="/">
            <span
              onClick={() => handleLinkClick("logout")}
              className={`block text-lg p-2 rounded-md ${
                activeLink === "logout" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              Logout
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Top bar */}
        <header
          className={`bg-gray-200 p-4 flex justify-between items-center fixed w-full top-0 left-64 z-10 transition-shadow duration-300 ${
            isScrolled ? "shadow-md" : ""
          }`}
        >
          <div className="text-xl font-semibold">MX</div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-lg w-72"
          />
          <div className="bg-gray-300 rounded-full w-10 h-10"></div>
        </header>

        {/* Scrollable content */}
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto mt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
