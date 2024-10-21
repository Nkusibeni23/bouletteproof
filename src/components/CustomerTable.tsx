import { CustomerTableProps } from "@/types/CustomerTableProps";

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  currentPage,
  itemsPerPage,
}) => {
  return (
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
          {customers.map((customer, index) => (
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
  );
};

export default CustomerTable;
