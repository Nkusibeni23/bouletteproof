import { VisitCardProps } from "@/types/VisitCardProps";

const VisitCard: React.FC<VisitCardProps> = ({ visit }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:bg-gradient-to-r from-gray-50 to-gray-200 transition-all transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Visit Details</h2>

      {/* 2-column grid for visit details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-md text-gray-600">
            <strong>Date:</strong> {visit.Date}
          </p>
        </div>
        <div>
          <p className="text-md text-gray-600">
            <strong>Visitors:</strong> {visit.unique_visitors}
          </p>
        </div>
        <div>
          <p className="text-md text-gray-600">
            <strong>Bounce Rate:</strong> {visit.bounce_rate}%
          </p>
        </div>
        <div>
          <p className="text-md text-gray-600">
            <strong>Avg Session:</strong> {visit.avg_session_duration} sec
          </p>
        </div>
        <div>
          <p className="text-md text-gray-600">
            <strong>Device:</strong> {visit.device_type}
          </p>
        </div>
        <div>
          <p className="text-md text-gray-600">
            <strong>Browser:</strong> {visit.browser}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitCard;
