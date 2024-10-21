"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import VisitTrendsChart from "@/components/VisitTrendsChart";
import { VisitData } from "@/types/WebsiteVisit";
import Loading from "@/components/Loading";

export default function DetailVisitAnalysis() {
  const [data, setData] = useState<VisitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

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

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-2">Detail Visit Analysis</h1>
        <p>Here you will see detailed graphs of your website visits.</p>

        {/* Dropdown to select 30 or 60 days */}
        <div className="my-4">
          <label htmlFor="days-select" className="mr-2">
            Show data for:{" "}
          </label>

          <select
            id="days-select"
            value={days}
            // Update the days state
            onChange={(e) => setDays(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value={30}>Last 30 days</option>
            <option value={60}>Last 60 days</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center my-8">
            <Loading />
          </div>
        ) : (
          <div className="my-8">
            <VisitTrendsChart visitData={data} days={days} />
          </div>
        )}
      </div>
    </Layout>
  );
}
