import { useContext, useState, useEffect } from "react";
import { CarbonContext } from "./CarbonContext";

export default function GoalTracker() {
  const context = useContext(CarbonContext);
  if (!context) {
    throw new Error("GoalTracker must have carbProvider");
  }
  const { goal, setGoal, totalCarbonValue } = context;
  const [inputGoal, setInputGoal] = useState<number | "">("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputGoal === "") {
      setError("Please enter a valid goal.");
      return;
    }
    setGoal(inputGoal as number);
    setError("");
  };

  const progress = goal ? (totalCarbonValue / goal) * 100 : 0;

  const [achievement, setAchievement] = useState<string | null>(null);

  useEffect(() => {
    if (progress >= 100) {
      setAchievement("🏆 Achievement Unlocked: Goal Surpassed, uh oh");
    } else if (progress >= 75) {
      setAchievement("🎯 Achievement Unlocked: 75% of limit has been reached");
    } else if (progress >= 50) {
      setAchievement("💪 Achievement Unlocked: Halfway there!");
    } else {
      setAchievement(null); 
    }
  }, [progress]);

  let feedback = "";
  if (goal === null) {
    feedback = "Set a goal to track your progress.";
  } else if (totalCarbonValue === 0) {
    feedback = "Start logging activities to see your progress!";
  } else if (progress < 50) {
    feedback = "Great job! You're under your target.";
  } else if (progress < 80) {
    feedback = "You're getting awfully close!";
  } else if (progress < 100) {
    feedback = "Almost there, try to reduce your carbon footprint further!";
  } else {
    feedback = "You've exceeded your target! Consider reducing your activities.";
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6 border border-gray-400">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Goal Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Set your carbon footprint goal"
          value={inputGoal}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^\d*\.?\d*$/.test(value)) {
              setInputGoal(value === "" ? "" : Number(value));
              setError("");
            } else {
              setError("Invalid input. Please enter a number.");
            }
          }}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full mt-2">
          Set Goal
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {goal !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="font-semibold text-gray-700">Your Goal: {goal} kg CO₂</p>
          <p className="font-semibold text-gray-700">Total Emissions: {totalCarbonValue} kg CO₂</p>
          <p className="font-semibold text-gray-700">Progress: {progress.toFixed(2)}%</p>
        </div>
      )}
      <p className="mt-4 text-lg font-medium text-gray-700">{feedback}</p>
     {achievement && (
       <p
         className={`mt-2 font-semibold text-center ${
           progress >= 100 ? "text-red-600" : "text-green-600"
         }`}
       >
         {achievement}
       </p>
     )}
    </div>
  );
}