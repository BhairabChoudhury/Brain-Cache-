import React , { useState } from 'react' 
import { useNavigate } from 'react-router-dom' 
import  axios from 'axios' 
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg' 
const Signup = () => {  
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
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
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
   <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4'>
      <div className='bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center text-white mb-2'>Create Account</h1>
        <p className='text-center text-white/80 mb-8'>Join  <span className='text-white font-semibold'>Brain Cache</span> today</p>

        {error && (
          <div className='bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-lg mb-6 text-sm text-center'>
            {error}      
          </div>
        )}

        <form onSubmit={handleSignup} className='flex flex-col gap-5'>
          <div className='relative'>
            <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-white/60' />
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder='Full Name'
              className='w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all'
            />
          </div>

          <div className='relative'>
            <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-white/60' />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder='Email Address'
              className='w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all'
            />
          </div>

          <div className='relative'>
            <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-white/60' />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder='Password'
              className='w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='mt-2 w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading ? (
              <>
                <CgSpinner className='animate-spin text-xl' />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </button>  

          <div className='flex items-center justify-between mt-4 text-sm text-white/80'>
            <span>Already have an account?</span>
            <a href="http://localhost:5173/signin" className='text-white font-semibold hover:underline'>Log In</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export {Signup} 
