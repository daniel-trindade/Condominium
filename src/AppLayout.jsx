import { Routes, Route, useLocation } from 'react-router-dom';  

import NavbarLoginPage from './components/navbar/navbar_login_page';
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
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