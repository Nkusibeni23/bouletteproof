"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { VisitData } from "@/types/WebsiteVisit";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import VisitCard from "@/components/VisitCard";

const LandingPage = () => {
  const [data, setData] = useState<VisitData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10;

  // Fetch data on component mount using useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/visit");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="flex items-center justify-center flex-col text-center py-6">
        <h1 className="text-4xl font-extrabold my-4 text-gray-900">
          Welcome to the Dashboard
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Here is a summary of your website statistics and CRM data.
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {paginatedData.map((visit) => (
              <VisitCard key={visit.visit_id} visit={visit} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default LandingPage;
