"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { VisitData } from "@/types/WebsiteVisit";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";

const LandingPage = () => {
  // State for storing the visit data
  const [data, setData] = useState<VisitData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Fetch data on component mount using useEffect
  useEffect(() => {
    const fetchData = async () => {
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
        <div className="flex items-center justify-center flex-col text-center py-6">
          <h1 className="text-4xl font-extrabold my-4 text-gray-900">
            Welcome to the Dashboard
          </h1>
          <p className="mb-6 text-lg text-gray-600">
            Here is a summary of your website statistics and CRM data.
          </p>
        </div>

        {/* Show loading spinner while data is fetching */}
        {loading ? (
          <Loading />
        ) : (
          <div>
            {/* Cards Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {/* Loop over the paginated data and display each visit's details */}
              {paginatedData.map((visit) => (
                <div
                  key={visit.visit_id}
                  className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:bg-gradient-to-r from-blue-50 to-blue-100 transition-all transform hover:scale-105 duration-200 ease-in-out cursor-pointer"
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Visit Details
                  </h2>

                  {/* New 2-column grid for visit details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-md text-gray-600">
                        <strong>Date:</strong> {visit.Date}
                      </p>
                    </div>
                    <div>
                      <p className="text-md text-gray-600">
                        <strong>Visitors:</strong> {visit.unique_visitors}
                      </p>
                    </div>
                    <div>
                      <p className="text-md text-gray-600">
                        <strong>Bounce Rate:</strong> {visit.bounce_rate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-md text-gray-600">
                        <strong>Avg Session:</strong>{" "}
                        {visit.avg_session_duration} sec
                      </p>
                    </div>
                    <div>
                      <p className="text-md text-gray-600">
                        <strong>Device:</strong> {visit.device_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-md text-gray-600">
                        <strong>Browser:</strong> {visit.browser}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LandingPage;
