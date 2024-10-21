import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { VisitTrendsChartProps } from "@/types/VisitTrendsChart";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const VisitTrendsChart: React.FC<VisitTrendsChartProps> = ({
  visitData,
  days,
}) => {
  // Sort data by date
  const sortedData = visitData
    .slice() // Copy to avoid mutating original array
    .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

  // Extract data for the selected number of days (30 or 60)
  const filteredData = sortedData.slice(-days);
  const labels = filteredData.map((visit) => visit.Date);
  const visitors = filteredData.map((visit) => visit.unique_visitors);

  const data = {
    labels,
    datasets: [
      {
        label: "Unique Visitors",
        data: visitors,
        borderColor: "#161717",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Website Visits Over the Last ${days} Days`,
      },
    },
  };

  return (
    <div className="w-full min-h-screen sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <div className="overflow-x-auto">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default VisitTrendsChart;
