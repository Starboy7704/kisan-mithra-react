import AnimateNumber from "./ui/AnimateNumber";


const StatCard = ({ title, value, color }) => (
  <div className="p-5 bg-white rounded-xl shadow-sm border">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-3xl font-bold mt-2 ${color}`}><AnimateNumber value={value} /></p>
  </div>
);

export default StatCard;
