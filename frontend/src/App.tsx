
import ActivityLogger from "./components/ActivityLogger";
import GoalTracker from "./components/GoalTracker"
import CarbonChart from "./components/CarbonChart";
import Resources from "./components/Resources";
import { CarbonProvider } from "./components/CarbonContext";
import Navbar from './components/Navbar';
import './App.css'


function App() {

  return (
    <>
      <CarbonProvider>
        <Navbar/>
        <ActivityLogger/>
        <GoalTracker/>
        <CarbonChart />  
        <Resources />
      </CarbonProvider>
    </>
  )
}

export default App
