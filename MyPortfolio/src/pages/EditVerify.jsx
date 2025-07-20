import React, { useState, useEffect, useContext } from 'react'
import { PortfolioContext } from '../context/PortfolioContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const EditVerify = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, backendURL, navigate, setUser } = useContext(PortfolioContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post(backendURL + '/api/user/login', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        const decoded = jwtDecode(response.data.token);
        setUser(decoded.id);
        localStorage.setItem('user', decoded.id);
        navigate(`/edit/${decoded.id}`);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center px-4 md:px-0 py-10'>
      <div className='gradient-border rounded-md flex flex-col w-[80%] md:max-w-[25%] shadow-2xl'>
        <h1 className='text-2xl my-3 font-bold'>
          <span className='text-glow'> Edit Your</span><span className='text-primary'> Portfolio </span>
        </h1>
        <hr className='bg-primary mx-2 my-2 h-[2px]' />
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 items-start px-3 py-3'>
            <label htmlFor="email" className='text-lg px-2'>Your Email :- </label>
            <input type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} placeholder='john@gmail.com' className='bg-background rounded-md px-2 py-2 w-full' required />
          </div>
          <div className='flex flex-col gap-3 items-start px-3 py-3'>
            <label htmlFor="password" className='text-lg px-2'>Your Password :- </label>
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='abc@123' className='bg-background rounded-md px-2 py-2 w-full' required />
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='cosmic-button rounded-md text-lg my-2 py-2 font-semibold'>
              {loading ? "Let's Go" : 'Edit Profile'}
            </button>
          </div>
          <NavLink to='/'>
            <button className='mb-5 underline underline-offset-2 cursor-pointer' > Home </button>
          </NavLink>
        </form>
      </div>
    </div>
  )
}

export default EditVerify
