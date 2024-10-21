"use client";
import { useState, useEffect } from "react";
import { CustomerData } from "@/types/CustomerDataType";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";

const CRMDataList = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
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

  // Filter customers by search query (name or email)
  const filteredCustomers = customers.filter((customer) => {
    const firstName = customer.first_name?.toLowerCase() || "";
    const lastName = customer.last_name?.toLowerCase() || "";
    const email = customer.email?.toLowerCase() || "";

    return (
      firstName.includes(searchQuery.toLowerCase()) ||
      lastName.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center">
          Customer Data List
        </h1>

        {/* Search bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or email"
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />

        {loading ? (
          <Loading />
        ) : filteredCustomers.length === 0 ? (
          <p className="text-center text-gray-500">No customers found</p>
        ) : (
          <>
            {/* CRM Data Table */}
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Birthday</th>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">City</th>
                  <th className="border px-4 py-2">Country</th>
                  <th className="border px-4 py-2">Postal Code</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td className="border px-4 py-2">{customer.customer_id}</td>
                    <td className="border px-4 py-2">
                      {customer.first_name} {customer.last_name}
                    </td>
                    <td className="border px-4 py-2">
                      {customer.email || "Not Found"}
                    </td>
                    <td className="border px-4 py-2">
                      {customer.phone_number}
                    </td>
                    <td className="border px-4 py-2">
                      {customer.birthdate || "Not Found"}
                    </td>
                    <td className="border px-4 py-2">
                      {customer.address || "Not Found"}
                    </td>
                    <td className="border px-4 py-2">
                      {customer.city || "Not Found"}
                    </td>
                    <td className="border px-4 py-2">
                      {customer.country || "Not Found"}
                    </td>
                    <td className="border px-4 py-2">
                      {customer.postal_code || "Not Found"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default CRMDataList;
