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
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-center my-6 text-gray-700">
          Customer Data List
        </h1>

        {/* Search bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email"
            className="p-3 border border-gray-300 rounded-lg w-full shadow-sm outline-none"
          />
        </div>

        {loading ? (
          <Loading />
        ) : filteredCustomers.length === 0 ? (
          <p className="text-center text-gray-500">No customers found</p>
        ) : (
          <>
            {/* CRM Data Table */}
            <div className=" table-container overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse border border-gray-200 cursor-pointer">
                <thead>
                  <tr className="bg-gray-300 text-gray-700">
                    <th className="border px-4 py-2">No</th>
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
                  {paginatedCustomers.map((customer, index) => (
                    <tr
                      key={customer.customer_id}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-400"
                    >
                      <td className="border px-4 py-2">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.first_name} {customer.last_name}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.email || "Not Found"}
                      </td>
                      <td className="border px-4 py-2">
                        {customer.phone_number || "Not Found"}
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
            </div>

            {/* Pagination */}
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CRMDataList;
