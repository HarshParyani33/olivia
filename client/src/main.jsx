import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GlobalStyles from './styles/GlobalStyles.jsx' // Import GlobalStyles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles /> {/* Add GlobalStyles here */}
    <App />
  </StrictMode>,
)