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
import ManagementG1Vehicle from './views/managements/g1vehicles/G1Vehicle'
import ManagementG1VehicleForm from './views/managements/g1vehicles/G1VehicleForm'
import ManagementG2Vehicle from './views/managements/g2vehicles/G2Vehicle'
import ManagementG2VehicleForm from './views/managements/g2vehicles/G2VehicleForm'

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
        <Route path='/management/g1Vehicle' element={<ManagementG1Vehicle></ManagementG1Vehicle>}></Route>
        <Route path='/management/g1Vehicle/:gid' element={<ManagementG1VehicleForm></ManagementG1VehicleForm>}></Route>
        <Route path='/management/g2Vehicle' element={<ManagementG2Vehicle></ManagementG2Vehicle>}></Route>
        <Route path='/management/g2Vehicle/:gid' element={<ManagementG2VehicleForm></ManagementG2VehicleForm>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  )
}

export default App
