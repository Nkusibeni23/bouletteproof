import React from "react";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (
    sortOption: "asc" | "desc",
    criteria: "name" | "birthday"
  ) => void;
}

const SortModal: React.FC<SortModalProps> = ({
  isOpen,
  onClose,
  onSortChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Sort Options</h2>

        <div className="flex flex-col space-y-2">
          <div>
            <label className="mr-2">Sort by Name:</label>
            <select
              onChange={(e) =>
                onSortChange(e.target.value as "asc" | "desc", "name")
              }
              defaultValue="asc"
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Sort by Birthday:</label>
            <select
              onChange={(e) =>
                onSortChange(e.target.value as "asc" | "desc", "birthday")
              }
              defaultValue="asc"
            >
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
