import { CustomerData } from "./CustomerDataType";

export interface CustomerTableProps {
  customers: CustomerData[];
  currentPage: number;
  itemsPerPage: number;
}
