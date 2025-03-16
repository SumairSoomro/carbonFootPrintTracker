import React, { createContext, useState } from "react";

export interface Activity {
  activity: string;
  category: string;
  carbonValue: number;
}

interface CarbonContextType {
  goal: number | null;
  setGoal: (goal: number | null) => void;
  totalCarbonValue: number;
  setTotalCarbonValue: (value: number) => void;
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

export const CarbonContext = createContext<CarbonContextType | undefined>(undefined);

export const CarbonProvider = ({ children }: { children: React.ReactNode }) => {
  const [goal, setGoal] = useState<number | null>(null);
  const [totalCarbonValue, setTotalCarbonValue] = useState(0);
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <CarbonContext.Provider
      value={{ goal, setGoal, totalCarbonValue, setTotalCarbonValue, activities, setActivities }}
    >
      {children}
    </CarbonContext.Provider>
  );
};