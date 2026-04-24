import React , { useState} from "react"; 
import  { useNavigate} from "react-router-dom" ; 
import axios  from "axios" ; 
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'

const Signin  = () =>{
     const  navigate = useNavigate(); 
     const [email , setEmail] = useState() ; 
     const [password , setPassword] = useState() ; 
     const [loading , setLoading] = useState(false) ; 
     const [error , setError] = useState('') ;  
      const handleSignin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await axios.post("https://ai-node-g548.onrender.com/api/user/signin", {
                email,
                password
            });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
      }

       return (
       <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4'>
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md'>
                <h1 className='text-3xl font-bold text-center text-white mb-2'>Sign In</h1>
                <p className='text-center text-white/80 mb-8'>Welcome back</p>

                {error && (
                    <div className='bg-red-500/20 border border-red-500/50 text-red-100 p-3 rounded-lg mb-6 text-sm text-center'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignin} className='flex flex-col gap-5'>
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
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                </form>
            </div>
        </div>
    )
   
}

export {Signin} 