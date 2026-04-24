import './App.css'
import { Layout } from './components/Layout';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Notes } from './Pages/Notes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
} 


  
export default App 