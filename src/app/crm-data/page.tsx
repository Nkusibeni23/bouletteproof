"use client";
import { useState, useEffect } from "react";
import { CustomerData } from "@/types/CustomerDataType";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format, isValid } from "date-fns";

const CRMDataList = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [sortCriteria, setSortCriteria] = useState<"name" | "birthday">("name");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
        console.log(data);
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  // Apply filters
  const filteredCustomers = customers.filter((customer) => {
    const firstName = customer.first_name?.toLowerCase() || "";
    const lastName = customer.last_name?.toLowerCase() || "";
    const email = customer.email?.toLowerCase() || "";

    // Date range filter
    const signupDate = new Date(customer.signup_date);
    const isWithinDateRange =
      (!startDate || signupDate >= new Date(startDate)) &&
      (!endDate || signupDate <= new Date(endDate));

    return (
      (firstName.includes(searchQuery.toLowerCase()) ||
        lastName.includes(searchQuery.toLowerCase()) ||
        email.includes(searchQuery.toLowerCase())) &&
      isWithinDateRange
    );
  });

  // Sorting logic
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    let comparison = 0;

    // Determine comparison based on sort criteria
    if (sortCriteria === "name") {
      comparison = a.first_name.localeCompare(b.first_name);
    } else if (sortCriteria === "birthday") {
      comparison =
        new Date(a.birthdate).getTime() - new Date(b.birthdate).getTime();
    }

    // Reverse the order if the sort direction is descending
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const paginatedCustomers = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleSortChange = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Implement the onSortChange function
  const handleSortOptionChange = (
    sortDirection: "asc" | "desc",
    criteria: "name" | "birthday"
  ) => {
    setSortDirection(sortDirection);
    setSortCriteria(criteria);
    setIsDropdownOpen(false);
  };

  // Download CSV
  const csvHeaders = [
    { label: "No", key: "no" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Birthday", key: "signup_date" },
    { label: "Address", key: "address" },
    { label: "City", key: "city" },
    { label: "Country", key: "country" },
    { label: "City", key: "city" },
    { label: "Signup_date", key: "signup_date" },
  ];

  // Download PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Customer Data List", 14, 22);
    autoTable(doc, {
      head: [
        [
          "No",
          "Name",
          "Email",
          "Phone",
          "Birthday",
          "Address",
          "City",
          "Country",
        ],
      ],
      body: sortedCustomers.map((customer, index) => [
        index + 1,
        `${customer.first_name} ${customer.last_name}`,
        customer.email || "Not Found",
        customer.phone_number || "Not Found",
        isValid(new Date(customer.birthdate))
          ? format(new Date(customer.birthdate), "yyyy-MM-dd")
          : "Invalid Date",
        customer.address || "Not Found",
        customer.city || "Not Found",
        customer.country || "Not Found",
      ]),
    });
    doc.save("customer_data.pdf");
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-center my-6 text-gray-700">
          Customer Data List
        </h1>

        <div className="flex items-center justify-between gap-6 w-full">
          {/* Search bar */}
          <div className="mb-6 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email"
              className="p-3 border border-gray-300 rounded-lg w-full shadow-sm outline-none"
            />
          </div>

          {/* Sort options button */}
          <div className="relative">
            <button onClick={handleSortChange} className="text-black mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute z-50 mt-0 w-32 bg-gray-100 border rounded-lg shadow-lg right-0 overflow-hidden">
                <div
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-300 hover:font-semibold duration-300 transition-all ease-out"
                  onClick={() => handleSortOptionChange("asc", "name")}
                >
                  Sort by Name (A-Z)
                </div>
                <div
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-300 hover:font-semibold duration-300 transition-all ease-out"
                  onClick={() => handleSortOptionChange("desc", "name")}
                >
                  Sort by Name (Z-A)
                </div>
                <div
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-300 hover:font-semibold duration-300 transition-all ease-out"
                  onClick={() => handleSortOptionChange("asc", "birthday")}
                >
                  Sort by Birthday (A-Z)
                </div>
                <div
                  className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-300 hover:font-semibold duration-300 transition-all ease-out"
                  onClick={() => handleSortOptionChange("desc", "birthday")}
                >
                  Sort by Birthday (Z-A)
                </div>
              </div>
            )}
          </div>
          {/* PDF download */}
          <div className="flex items-center space-x-2 w-[200px] mb-6">
            <button
              onClick={handleDownloadPDF}
              className=" border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:text-white duration-300 transition-all ease-out"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Loading and table */}
        {loading ? (
          <Loading />
        ) : sortedCustomers.length === 0 ? (
          <p className="text-center text-gray-500">No customers found</p>
        ) : (
          <>
            {/* Updated table to include all fields from CustomerData */}
            <div className="table-container overflow-x-auto">
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
            <div className=" mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CRMDataList;
