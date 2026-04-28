import React , {useContext , createContext , useState , useEffect} from "react"  
import axios from "axios"

const ContentContext  = createContext() ; 

const ContentProvider = ({children}) =>{
  const [notes , setNotes] = useState([]) 

  useEffect(() => { 
      const  fetchContent = async() => { 
        try{
            const  res =  await axios.get(`http://localhost:8000/api/content/get` , {
              headers :{
                Authorization : `Bearer ${localStorage.getItem("token")}`
              }
            })
            setNotes(res.data) 
        }catch(error){
          console.error("Error fetching content", error)
        } 
      }    

  }, [])

   return  (<ContentContext.Provider value={{notes , setNotes}}>
     {children}  
   </ContentContext.Provider> 
   ) 
}

export const useContent = () => useContext(ContentContext)  
export default ContentProvider  
