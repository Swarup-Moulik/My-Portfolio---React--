import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { Toaster } from '@/components/ui/toaster';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import Initial from './pages/Initial';
import Edit from './pages/Edit';
import ThemeToggle from './components/ThemeToggle';
import StarBackground from './components/StarBackground';
import { PortfolioContext } from './context/PortfolioContext';
import { Navigate } from 'react-router-dom';
import EditVerify from './pages/EditVerify';

const App = () => {
  const { user } = useContext(PortfolioContext);
  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <Toaster />
      <ThemeToggle />
      <StarBackground />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/editVerify' element={<EditVerify />} />
        <Route path="/" element={
          user ? <Navigate to={`/${user}`} replace /> : <Navigate to="/login" replace />
        } />
        <Route path='/initial' element={<Initial />} />
        <Route path='/edit/:user' element={<Edit />} />
        <Route path="/:user" element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
