import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DltAppBar from './components/DltAppBar'
import Login from './views/Login'
import Home from './views/Home'
import Query from './views/Query'
import Profile from './views/Profile'
import ManagementUser from './views/managements/users/User'
import ManagementCompany from './views/managements/companies/Company'
import ManagementUserForm from './views/managements/users/UserForm'
import ManagementCompanyForm from './views/managements/companies/CompanyForm'

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
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/management/user' element={<ManagementUser></ManagementUser>}></Route>
        <Route path='/management/user/:uid' element={<ManagementUserForm></ManagementUserForm>}></Route>
        <Route path='/management/company' element={<ManagementCompany></ManagementCompany>}></Route>
        <Route path='/management/company/:companyId' element={<ManagementCompanyForm></ManagementCompanyForm>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  )
}

export default App
