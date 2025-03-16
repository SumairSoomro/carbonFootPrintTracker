import { useContext, useState } from "react";
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

  let feedback = "";
  if (goal === null) {
    feedback = "Set a goal to track your progress.";
  } else if (totalCarbonValue === 0) {
    feedback = "Start logging activities to see your progress!";
  } else if (progress < 50) {
    feedback = "Great job! You're under your target.";
  } else if (progress < 80) {
    feedback = "You're getting awfuly close!";
  } else if (progress < 100) {
    feedback = "Almost there, try to reduce your carbon footprint further!";
  } else {
    feedback = "You've exceeded your target! Consider reducing your activities.";
  }

  return (
    <>
      <h2>Goal Tracker</h2>
      <form onSubmit={handleSubmit}>
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
        />
        <button type="submit">Set Goal</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {goal !== null && <p>Your Goal: {goal} kg CO₂</p>}
      <p>Total Emissions: {totalCarbonValue} kg CO₂</p>
      {goal !== null && <p>Progress: {progress.toFixed(2)}%</p>}
      <p>{feedback}</p>
    </>
  );
}