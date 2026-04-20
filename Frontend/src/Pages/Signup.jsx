import React , { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import  axios from 'axios' 
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg' 
const SignUp = () => {  
    const [ name , setName] = useState('') ; 
    const [email , setEmail] = useState('') ; 
    const [ password , setPassword] = useState('');
    const [ loading , setLoading] = useState(false) ; 
    const [ error , setError] = useState('') ; 
     const navigate = useNavigate() ;
     
     const handleSignup = async(e) =>{
       e.preventDefault() ; 
       setError('') ; 
        if( ! name || !email || !password) {
            setError('All  fields  required') 
        }

        setLoading(true) ; 
        try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        name: name,
        email: email,
        password: password
      })
      console.log(response.data)
      navigate('/signin')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Signup failed. Please try again.")
    } finally {
      setLoading(false) 
      setName("")
      setEmail("")
      setPassword("") 
    }
     }
  return (
    <div>
        
    </div>
  )
}

export default SignUp 