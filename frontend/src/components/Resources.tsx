import { useReducer } from "react";

const startState = { isOpen: false };

function reducer(state: typeof startState, action: { type: "TOGGLE" }) {
  switch (action.type) {
    case "TOGGLE":
      return { isOpen: !state.isOpen };
    default:
      return state;
  }
}

export default function Resources() {
  const [state, dispatch] = useReducer(reducer, startState);

  const tips = [
    "Switch to reusable alternatives like bags, bottles, and containers to minimize waste",
    "Conserve energy by turning off unused lights and electronic devices",
    "Opt for public transport, biking, or carpooling to reduce emissions",
    "Adopt water-saving habits by fixing leaks and using efficient appliances",
    "Incorporate more plant-based meals to lower your carbon footprint",
  ];

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-6 border border-gray-400">
      <button
        onClick={() => dispatch({ type: "TOGGLE" })}
        className="flex items-center justify-between w-full text-lg font-semibold bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition"
      >
        Click here to see Some Tips and Resources!
        <span className={`transform transition-transform ${state.isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </button>

      {state.isOpen && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Resources</h2>
          
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <hr className="my-6 border-gray-300" />

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Some Helpful Links!</h3>
          <ul className="space-y-2">
            <li>
              <a 
                href="https://www.nyserda.ny.gov/Featured-Stories/Steps-to-Lower-Your-Carbon-Footprint" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                https://www.nyserda.ny.gov/Featured-Stories/Steps-to-Lower-Your-Carbon-Footprint
              </a>
            </li>
            <li>
              <a 
                href="https://explore.panda.org/climate/how-to-reduce-your-carbon-footprint" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 underline hover:text-blue-700"
              >
                https://explore.panda.org/climate/how-to-reduce-your-carbon-footprint
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}