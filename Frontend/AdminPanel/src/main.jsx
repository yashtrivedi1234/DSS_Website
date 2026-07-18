import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './store/AuthContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthProvider>
    <BrowserRouter basename="/admin">
    <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
 </AuthProvider>
  </StrictMode>
)
