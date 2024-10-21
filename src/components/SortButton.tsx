import { SortButtonProps } from "@/types/SortButtonProps";
import { useState } from "react";

const SortButton: React.FC<SortButtonProps> = ({
  sortDirection,
  onSortChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortChange = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleSortChange}
        className="text-black mb-6 flex items-center space-x-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
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
            onClick={() => {
              onSortChange("asc", "name");
              setIsDropdownOpen(false);
            }}
          >
            Sort by Name (A-Z)
          </div>
          <div
            className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-300 hover:font-semibold duration-300 transition-all ease-out"
            onClick={() => {
              onSortChange("desc", "name");
              setIsDropdownOpen(false);
            }}
          >
            Sort by Name (Z-A)
          </div>
          <div
            className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-300 hover:font-semibold duration-300 transition-all ease-out"
            onClick={() => {
              onSortChange("asc", "birthday");
              setIsDropdownOpen(false);
            }}
          >
            Sort by Birthday (A-Z)
          </div>
          <div
            className="px-4 py-2 cursor-pointer text-sm hover:bg-gray-300 hover:font-semibold duration-300 transition-all ease-out"
            onClick={() => {
              onSortChange("desc", "birthday");
              setIsDropdownOpen(false);
            }}
          >
            Sort by Birthday (Z-A)
          </div>
        </div>
      )}
    </div>
  );
};

export default SortButton;
