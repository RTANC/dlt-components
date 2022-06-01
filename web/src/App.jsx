import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DltAppBar from './components/DltAppBar'
import Login from './views/Login'
import Home from './views/Home'
import Query from './views/Query'
import './App.css'
import { useSelector } from 'react-redux'


function App() {
  const showAppBar = useSelector((state) => state.login.isLogin)

  return (
    <div className="App">
      <BrowserRouter>
      {showAppBar && <DltAppBar></DltAppBar>}
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/query' element={<Query></Query>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  )
}

export default App