import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { PortfolioContext } from '../context/PortfolioContext';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { backendURL, setUser, setToken } = useContext(PortfolioContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Loading starts
    try {
      const response = await axios.post(backendURL + '/api/user/register', { name, email, password })
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        const decoded = jwtDecode(response.data.token);
        setUser(decoded.id);
        localStorage.setItem('user', decoded.id);
        navigate(`/initial`);
      } else {
        toast.error('Account Exists Already')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); //Loaded successfully
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4 md:px-0 py-10'>
      <div className='gradient-border rounded-md flex flex-col w-[80%] md:max-w-[25%] shadow-2xl'>
        <h1 className='text-2xl my-3 font-bold'>
          <span className='text-glow'> Become a </span><span className='text-primary'> Vagabond </span>
        </h1>
        <hr className='bg-primary mx-2 my-2 h-[2px]' />
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 items-start px-3 py-3'>
            <label htmlFor="name" className='text-lg px-2'>Your Username :- </label>
            <input type="text" name='name' id='name' onChange={(e) => setName(e.target.value)} placeholder='john@6996' className='bg-background rounded-md px-2 py-2 w-full' required />
          </div>
          <div className='flex flex-col gap-3 items-start px-3 py-3'>
            <label htmlFor="email" className='text-lg px-2'>Your Email :- </label>
            <input type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com' className='bg-background rounded-md px-2 py-2 w-full' required />
          </div>
          <div className='flex flex-col gap-3 items-start px-3 py-3'>
            <label htmlFor="password" className='text-lg px-2'>Your Password :- </label>
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='abc@123' className='bg-background rounded-md px-2 py-2 w-full' required />
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='cosmic-button rounded-md w-33 text-lg my-3 py-2 font-semibold'>
              {loading ? 'Initiating...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <NavLink to='/login'>
          <button className='my-3 underline underline-offset-2 cursor-pointer' > See Your Portfolio </button>
        </NavLink>
      </div>
    </div>
  )
}

export default Register
