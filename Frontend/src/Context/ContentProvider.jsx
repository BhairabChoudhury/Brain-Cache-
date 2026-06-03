import React , {useContext , createContext , useState , useEffect} from "react"  
import axios from "axios"
import { BACKEND_URL } from "../config"

const ContentContext  = createContext() ; 

const ContentProvider = ({children}) =>{
  const [notes , setNotes] = useState([]) 

  useEffect(() => { 
      const  fetchContent = async() => { 
        try{
            const  res =  await axios.get(`${BACKEND_URL}/api/content/get` , {
              headers :{
                Authorization : `Bearer ${localStorage.getItem("token")}`
              }
            })
            if (res.data && res.data.success) {
              setNotes(res.data.data);
            }
        }catch(error){
          console.error("Error fetching content", error)
        } 
      }    
      fetchContent();
  }, [])

   return  (<ContentContext.Provider value={{notes , setNotes}}>
     {children}  
   </ContentContext.Provider> 
   ) 
}
export const useContent = () => useContext(ContentContext)  
export default ContentProvider  
