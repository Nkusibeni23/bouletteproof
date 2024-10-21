import { CustomerSearchProps } from "@/types/CustomerSearchProps";

const CustomerSearch: React.FC<CustomerSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="mb-6 w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or email"
        className="p-3 border border-gray-300 rounded-lg w-full shadow-sm outline-none"
      />
    </div>
  );
};

export default CustomerSearch;
