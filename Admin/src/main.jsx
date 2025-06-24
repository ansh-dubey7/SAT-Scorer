import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import { TestProvider } from './context/TestContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <NotificationProvider>
        <TestProvider>  
          <App />
        </TestProvider>
      </NotificationProvider>
    </AuthProvider>  
  </BrowserRouter>
)
