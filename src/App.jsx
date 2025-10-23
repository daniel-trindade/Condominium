import { BrowserRouter, Routes, Route } from 'react-router-dom';  

import Header from './components/header/header'
import Footer from './components/footer/footer'
import Container from './components/container/container';
import Home from './pages/home/home'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Container>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
      </Container> 
      <Footer />
    </>
  )
} 

export default App

/*         





*/