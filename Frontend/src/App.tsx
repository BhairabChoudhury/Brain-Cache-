import './App.css'
//import Dashboard from "./pages/Dashboard";; // Importing the Dashboard page component 
import { Signup } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import { BrowserRouter ,Routes ,Route  } from 'react-router-dom';
 function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
 } 



  
export default App 