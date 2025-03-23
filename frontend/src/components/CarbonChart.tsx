import { useContext } from "react";
import { CarbonContext } from "./CarbonContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function CarbonChart() {
  const context = useContext(CarbonContext);
  if (!context) {
    throw new Error("CarbonProv is needed");
  }

  const { activities } = context;

  const categoryData = activities.reduce((acc, activity) => {
    const existingCategory = acc.find((item) => item.category === activity.category);
    if (existingCategory) {
      existingCategory.carbonValue += activity.carbonValue;
    } else {
      acc.push({ category: activity.category, carbonValue: activity.carbonValue });
    }
    return acc;
  }, [] as { category: string; carbonValue: number }[]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6 border border-gray-400">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Carbon Footprint Breakdown</h2>
      {activities.length === 0 ? (
        <p className="text-gray-600 text-center">No activities logged yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} kg carbon`, "Emissions"]} />
            <Bar dataKey="carbonValue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}