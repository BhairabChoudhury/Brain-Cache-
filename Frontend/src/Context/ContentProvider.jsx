import React , {useContext , createContext , useState , useEffect} from "react"  
import axios from "axios"
import { BACKEND_URL } from "../config"

const ContentContext  = createContext() ; 

const ContentProvider = ({children}) =>{
  const [notes , setNotes] = useState([]) 

  const fetchContent = async() => { 
    const token = localStorage.getItem("token");
    if (!token) return;
    try{
        const res = await axios.get(`${BACKEND_URL}/api/content/get` , {
          headers :{
            Authorization : `Bearer ${token}`
          }
        })
        if (res.data && res.data.success) {
          setNotes(res.data.data);
        }
    }catch(error){
      console.error("Error fetching content", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
      }
    } 
  }

  useEffect(() => { 
      fetchContent();
  }, [])

   return  (<ContentContext.Provider value={{notes , setNotes, fetchContent}}>
     {children}  
   </ContentContext.Provider> 
   ) 
}
export const useContent = () => useContext(ContentContext)  
export default ContentProvider  
