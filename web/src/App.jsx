import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import './App.css'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar></Navbar> */}
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  )
}

export default App
