import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PortfolioContextProvider from './context/PortfolioContext.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PortfolioContextProvider>
      <App />
    </PortfolioContextProvider>
  </BrowserRouter>
)
