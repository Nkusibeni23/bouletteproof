"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLogOut } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiFileList2Line } from "react-icons/ri";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeLink, setActiveLink] = useState("landing-page");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white flex flex-col fixed inset-y-0 transform ${
          isSidebarOpen ? "translate-x-0 w-24 md:w-64" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 text-2xl font-bold mt-4 hidden md:block">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-4 mt-20">
          <Link href="/landing-page">
            <span
              onClick={() => handleLinkClick("landing-page")}
              className={`block text-lg p-3 mb-2 rounded-md flex items-center ${
                activeLink === "landing-page"
                  ? "bg-gray-700 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              <AiOutlineDashboard className="mr-2" />
              <span
                className={`hidden md:inline ${!isSidebarOpen ? "hidden" : ""}`}
              >
                Landing Page
              </span>
            </span>
          </Link>
          <Link href="/detail-visit-analysis">
            <span
              onClick={() => handleLinkClick("detail-visit-analysis")}
              className={`block text-lg p-3 rounded-md flex items-center ${
                activeLink === "detail-visit-analysis"
                  ? "bg-gray-700 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              <RiFileList2Line className="mr-2" />
              <span
                className={`hidden md:inline ${!isSidebarOpen ? "hidden" : ""}`}
              >
                Detail Visit Analysis
              </span>
            </span>
          </Link>
          <Link href="/crm-data">
            <span
              onClick={() => handleLinkClick("crm-data")}
              className={`block text-lg p-3 rounded-md flex items-center ${
                activeLink === "crm-data"
                  ? "bg-gray-700 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              <RiFileList2Line className="mr-2" />
              <span
                className={`hidden md:inline ${!isSidebarOpen ? "hidden" : ""}`}
              >
                CRM Data
              </span>
            </span>
          </Link>
        </nav>
        <div className="p-4 mb-10">
          <Link href="/">
            <p
              onClick={() => handleLinkClick("logout")}
              className={`block text-lg p-2 rounded-md ${
                activeLink === "logout" ? "bg-red-200" : "hover:bg-red-400"
              }`}
            >
              <button className="flex items-center space-x-2 px-4 py-1">
                <FiLogOut className="mr-2 text-gray-50" />
                <span
                  className={`hidden md:inline ${
                    !isSidebarOpen ? "hidden" : ""
                  } text-gray-50 font-medium`}
                >
                  Logout
                </span>
              </button>
            </p>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col ${
          isSidebarOpen ? "ml-24 md:ml-64" : "ml-16"
        } transition-all duration-300`}
      >
        {/* Top bar */}
        <header
          className={`bg-gray-200 p-4 flex justify-between items-center fixed w-full ${
            isSidebarOpen ? "left-24 md:left-64" : "left-0"
          } z-10 transition-all duration-300 shadow-md`}
        >
          <div className="text-xl font-semibold">Dashboard</div>
        </header>

        {/* Scrollable content */}
        <main className="p-6 bg-gray-50 flex-1 overflow-y-auto mt-16">
          {children}
          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="flex items-center focus:outline-none mb-6 bottom-32 left-8 fixed"
          >
            {isSidebarOpen ? (
              <div className="py-2 px-4 bg-gray-600 flex items-center space-x-2 rounded-r-full">
                <FiEyeOff className="mr-2 text-gray-200" />
                <span className="text-gray-200 font-semibold hidden md:block">
                  Hide
                </span>
              </div>
            ) : (
              <div className="py-2 px-4 bg-gray-600 flex items-center space-x-2 rounded-r-full">
                <FiEye className="mr-2 text-gray-100" />
                <span className="font-semibold text-gray-100 hidden md:block">
                  Show
                </span>
              </div>
            )}
          </button>
        </main>
      </div>
    </div>
  );
};

export default Layout;
