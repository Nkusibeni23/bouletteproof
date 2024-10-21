"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeLink, setActiveLink] = useState("landing-page");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      <aside
        className={`bg-gray-800 text-white flex flex-col fixed inset-y-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64`}
      >
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
          <Link href="/crm-data">
            <span
              onClick={() => handleLinkClick("crm-data")}
              className={`block text-lg p-3 rounded-md ${
                activeLink === "crm-data"
                  ? "bg-gray-700 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              CRM Data
            </span>
          </Link>
        </nav>
        <div className="p-4 relative">
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
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-all duration-300`}
      >
        {/* Top bar */}
        <header
          className={`bg-gray-200 p-4 flex justify-between items-center fixed w-full ${
            isSidebarOpen ? "left-64" : "left-0"
          } z-10 transition-all duration-300 shadow-md`}
        >
          <div className="text-xl font-semibold">Dashboard</div>
        </header>

        {/* Scrollable content */}
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto mt-16">
          {children}
          <button
            onClick={toggleSidebar}
            className="flex items-center  focus:outline-none mb-6 absolute bottom-20 left-8"
          >
            {isSidebarOpen ? (
              <div className=" py-2 px-4 bg-gray-600 flex items-center space-x-2 rounded-r-full">
                <FiEyeOff className="mr-2 text-gray-200" />
                <span className=" text-gray-200 font-semibold">Hide</span>
              </div>
            ) : (
              <div className=" py-2 px-4 bg-gray-600 flex items-center space-x-2 rounded-r-full">
                <FiEye className="mr-2 text-gray-100" />
                <span className=" font-semibold text-gray-100">Show</span>
              </div>
            )}
          </button>
        </main>
        {/* Toggle button */}
      </div>
    </div>
  );
};

export default Layout;
