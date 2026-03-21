
import '../App.css'
 import { useEffect ,useState} from 'react'
import   { ShareIcon } from '../icons/ShareIcon'
import { PlusIcon } from '../icons/PlusIcon'
import { Button }  from '../components/ui/Button'
import {Card }   from '../components/ui/Card' 
import { CreateContentModel } from '../components/ui/CreateContentModel'
//import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar.tsx'
 import {useContent} from "../hooks/useContent.tsx"
  // import { title } from 'process'
 import axios from 'axios' 

function Dashboard() {
     const [modalOpen,setModalOpen] = useState(false)
     // costom hhoks to fetch contemnd and refresh contents
      const { contents , refresh} = useContent() ;  

      useEffect(()=>{
          refresh() ;
      } , [modalOpen]) ; 
      console.log("dnassdfdsfrew") 

  return (
    <> 
     <div>  
      
          <Sidebar /> {/* Sidebar component for navigation */}
      <div className='p-4 ml-72 min-h-screen bg-gray-300'>
      <CreateContentModel open={modalOpen} onClose={()=>{setModalOpen(false)}/*when cross sign has been clicked then set into false */}/>
      <div className='flex  justify-end items-center gap-4'>
       <Button variant='secondary' onClick={()=>setModalOpen(true)} startIcon={<PlusIcon  size={'md'}/>} size='lg' title='Add Content'></Button>
        <Button variant='primary' startIcon={ < ShareIcon size={'md'}/>} size='lg' title="Share"></Button>
        </div>
        <div className='flex gap-4 flex-wrap '>
          
             { contents?.map(({type ,link ,title}) => (  
              
              <Card    
              type = {type} 
              link = {link} 
              title=  {title}    
            />
              
            ))
            } 
          
         </div>
          </div>  
    </div>
    </>
  )
}
  
export default Dashboard 
