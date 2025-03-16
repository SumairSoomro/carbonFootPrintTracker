import { useContext, useState } from "react";
import { CarbonContext, Activity } from "./CarbonContext";

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
    <>
      <h2>Activity Logger</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          required
        />

        <button type="submit">Log Activity</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Logged Activities</h3>
      <ul>
        {activities.map((act: Activity, index: number) => (
          <li key={index}>
            {act.activity} - {act.category} - {act.carbonValue} CO₂
          </li>
        ))}
      </ul>
    </>
  );
}