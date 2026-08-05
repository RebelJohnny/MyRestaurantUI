import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { MaterialUIControllerProvider } from "@/context";
// import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './app/store.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
)
