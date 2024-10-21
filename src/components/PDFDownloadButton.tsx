import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format, isValid } from "date-fns";
import { DownloadPDFProps } from "@/types/DownloadPDFProps";

const DownloadPDF: React.FC<DownloadPDFProps> = ({ customers }) => {
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
      body: customers.map((customer, index) => [
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
    <button
      onClick={handleDownloadPDF}
      className="border border-red-600 text-red-600 px-4 py-2 rounded-lg shadow hover:bg-red-600 hover:text-white duration-300 transition-all ease-out"
    >
      Download PDF
    </button>
  );
};

export default DownloadPDF;
