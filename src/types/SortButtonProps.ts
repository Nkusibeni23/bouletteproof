export interface SortButtonProps {
  sortDirection: "asc" | "desc";
  onSortChange: (
    sortDirection: "asc" | "desc",
    criteria: "name" | "birthday"
  ) => void;
}
