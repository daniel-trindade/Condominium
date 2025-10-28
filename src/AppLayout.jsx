import { Routes, Route, useLocation } from 'react-router-dom';  

import NavbarLoginPage from './components/login_navbar/Navbar_login_page';
import Navbar from './components/login_navbar/Navbar'
import Footer from './components/footer/Footer'
import Login from './pages/login/login'
import Home from './pages/home/home'

import './App.css'

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {isLoginPage ? <NavbarLoginPage /> : <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Footer />
    </>
  );
}

export default AppLayout