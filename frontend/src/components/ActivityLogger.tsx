import { useContext, useState } from "react";
import { CarbonContext } from "./CarbonContext";

export default function ActivityLogger() {
  const context = useContext(CarbonContext);
  if (!context) {
    throw new Error("err");
  }
  const { totalCarbonValue, setTotalCarbonValue, activities, setActivities } = context;
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("");
  const [carbonValue, setCarbonValue] = useState<number | "">("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity || !category || carbonValue === "") {
      setError("All fields are required.");
      return;
    }

    const numCarbonVal = Number(carbonValue);
    setActivities([...activities, { activity, category, carbonValue: numCarbonVal }]);
    setTotalCarbonValue(totalCarbonValue + numCarbonVal);
    setActivity("");
    setCategory("");
    setCarbonValue("");
    setError("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6 border border-gray-400">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Activity Logger</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-3"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none mb-3"
          required
        >
          <option value="" disabled hidden>
            Select Category
          </option>
          <option value="Transportation">Transportation</option>
          <option value="Home Energy Use">Home Energy Use</option>
          <option value="Food Consumption">Food Consumption</option>
          <option value="Shopping">Shopping</option>
          <option value="Waste Management">Waste Management</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Carbon Value"
          value={carbonValue}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^\d*\.?\d*$/.test(value)) {
              setCarbonValue(value === "" ? "" : Number(value));
              setError("");
            } else {
              setError("Please enter a valid number.");
            }
          }}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full mt-2">
          Log Activity
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <h3 className="mt-4 text-lg font-semibold text-gray-800">Logged Activities</h3>
      <ul>
        {activities.map((act, index) => (
          <li key={index}>
            {act.activity} - {act.category} - {act.carbonValue} CO₂
          </li>
        ))}
      </ul>
    </div>
  );
}