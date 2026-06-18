import './App.css'
import { Layout } from './components/Layout';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Notes } from './Pages/Notes';
import AiChat from './Pages/AiChat';
import Upload from './Pages/Upload';
import { Signin } from './Pages/Signin';
import { Signup } from './Pages/Signup';
import {  Routes, Route } from 'react-router-dom';

function App() { 
  return (

        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<Layout />}> 
            <Route path="/" element={<Dashboard />} />
            <Route path="/notes" element={<Notes />}/>
            <Route path="/aichat" element={<AiChat />}/>
            <Route path="/upload" element={<Upload/>} />
          </Route>
        </Routes>

  )
} 


export default App 