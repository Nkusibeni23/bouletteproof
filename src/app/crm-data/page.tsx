"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import CustomerTable from "@/components/CustomerTable";
import CustomerSearch from "@/components/SearchBar";
import DownloadPDF from "@/components/PDFDownloadButton";
import { CustomerData } from "@/types/CustomerDataType";
import SortButton from "@/components/SortButton";

const CRMDataList = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortCriteria, setSortCriteria] = useState<"name" | "birthday">("name");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) throw new Error("Failed to fetch customer data");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  // Apply search and filtering logic here
  const filteredCustomers = customers.filter((customer) =>
    customer.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // **Apply sorting here**
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    let comparison = 0;
    if (sortCriteria === "name") {
      comparison = a.first_name.localeCompare(b.first_name);
    } else if (sortCriteria === "birthday") {
      const dateA = new Date(a.birthdate).getTime();
      const dateB = new Date(b.birthdate).getTime();
      comparison = dateA - dateB;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSortOptionChange = (
    direction: "asc" | "desc",
    criteria: "name" | "birthday"
  ) => {
    setSortDirection(direction);
    setSortCriteria(criteria);
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-center my-6 text-gray-700">
          Customer Data List
        </h1>

        <div className=" flex items-center justify-between gap-6">
          {/* Search */}
          <CustomerSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Sort options using SortButton component */}
          <SortButton
            sortDirection={sortDirection}
            onSortChange={handleSortOptionChange}
          />

          {/* PDF Download */}
          <div className=" w-[220px] mb-6">
            <DownloadPDF customers={sortedCustomers} />
          </div>
        </div>
        {/* Table */}
        {loading ? (
          <Loading />
        ) : sortedCustomers.length === 0 ? (
          <p className="text-center text-gray-500">No customers found</p>
        ) : (
          <CustomerTable
            customers={paginatedCustomers}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        )}

        {/* Pagination */}
        <div className=" mt-10">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CRMDataList;
