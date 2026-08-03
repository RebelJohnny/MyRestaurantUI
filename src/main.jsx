import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { MaterialUIControllerProvider } from "@/context";
// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
)
