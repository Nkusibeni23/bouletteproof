"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { VisitData } from "@/types/WebsiteVisit";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";

const LandingPage = () => {
  // State for storing the visit data
  const [data, setData] = useState<VisitData[]>([]);
  // State for managing the current page in pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to show or hide the loading spinner
  const [loading, setLoading] = useState(true);

  // Number of items to show per page in pagination
  const itemsPerPage = 10;

  // Fetch data on component mount using useEffect
  useEffect(() => {
    const fetchData = async () => {
      // Start loading before fetching data
      setLoading(true);
      try {
        // Fetch data from the API
        const response = await fetch("/api/visit");
        if (!response.ok) {
          // Throw error if response is not okay
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        // Set fetched data into the state
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Stop loading once data fetching is done
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the total number of pages for pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Handle page change (pagination component will call this)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get the data to display for the current page
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div>
        {/* Page Header */}
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-3xl font-extrabold my-4">
            Welcome to the Dashboard
          </h1>
          <p className="mb-4">
            Here is a summary of your website statistics and CRM data.
          </p>
        </div>

        {/* Show loading spinner while data is fetching */}
        {loading ? (
          <Loading />
        ) : (
          <div>
            {/* Cards Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 cursor-pointer">
              {/* Loop over the paginated data and display each visit's details */}
              {paginatedData.map((visit) => (
                <div
                  key={visit.visit_id}
                  className="bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg rounded-xl p-6 border border-gray-300 transition transform hover:scale-105 hover:shadow-2xl"
                >
                  <h2 className="text-xl font-bold text-gray-600 mb-3">
                    Visit Details
                  </h2>
                  <p className="text-md">
                    <strong>Date:</strong> {visit.Date}
                  </p>
                  <p className="text-md">
                    <strong>Visitors:</strong> {visit.unique_visitors}
                  </p>
                  <p className="text-md">
                    <strong>Bounce Rate:</strong> {visit.bounce_rate}%
                  </p>
                  <p className="text-md">
                    <strong>Avg Session:</strong> {visit.avg_session_duration}{" "}
                    sec
                  </p>
                  <p className="text-md">
                    <strong>Device:</strong> {visit.device_type}
                  </p>
                  <p className="text-md">
                    <strong>Browser:</strong> {visit.browser}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;
