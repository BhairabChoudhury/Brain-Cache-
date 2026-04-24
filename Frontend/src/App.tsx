import './App.css'
//import Dashboard from "./pages/Dashboard";; // Importing the Dashboard page component 
// import { Signup } from './Pages/Signup';
// import { Signin } from './Pages/Signin';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Notes } from './Pages/Notes';
import { BrowserRouter ,Routes ,Route  } from 'react-router-dom';
 function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  )
 } 


  
export default App 