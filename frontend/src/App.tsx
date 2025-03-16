
import ActivityLogger from "./components/ActivityLogger";
import GoalTracker from "./components/GoalTracker"
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
      </CarbonProvider>
    </>
  )
}

export default App
