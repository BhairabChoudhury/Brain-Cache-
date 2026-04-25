import './App.css'
import { Layout } from './components/Layout';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Notes } from './Pages/Notes';
import AiChat from './Pages/AiChat';
import Upload from './Pages/Upload';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/aichat" element={<AiChat />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
} 


  
export default App 