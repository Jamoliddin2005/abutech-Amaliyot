import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Auth/Register';

function App() {
  const [Auth, setAuth] = useState<boolean>(false)

  const GetToken = () => {
    if (sessionStorage.getItem("token")) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }

  useEffect(() => {
    GetToken()
  }, [])

  return (
    <div className="AbuTech">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path='/' element={Auth ? <Home /> : <Navigate to="/login" />} />
        <Route path='/*' element={Auth ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={Auth ? <Navigate to="/" /> : <Login GetToken={GetToken} />} />
        <Route path='/register' element={Auth ? <Navigate to="/" /> : <Register GetToken={GetToken} />} />
      </Routes>
    </div>
  );
}

export default App;
