import { PaginationProps } from "@/types/PaginationTypes";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center my-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 mx-1 ${
            currentPage === index + 1
              ? "bg-gray-500 text-white font-bold"
              : "bg-gray-200"
          } rounded`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
