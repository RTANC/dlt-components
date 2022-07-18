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
import ManagementG2VehicleRule from './views/managements/g2vehiclerules/G2VehicleRule'
import ManagementG2VehicleRuleForm from './views/managements/g2vehiclerules/G2VehicleRuleForm'
import ManagementIncident from './views/managements/incidents/Incident'
import ManagementIncidentForm from './views/managements/incidents/IncidentForm'
import ReportGCS01 from './views/reports/GCS01'
import ReportGCS02 from './views/reports/GCS02'
import ReportGCS03 from './views/reports/GCS03'
import ReportGCS04 from './views/reports/GCS04'
import ReportGCS05 from './views/reports/GCS05'
import ReportGCS06 from './views/reports/GCS06'
import ReportGCS07 from './views/reports/GCS07'
import ReportGCS08 from './views/reports/GCS08'
import ReportGCS09 from './views/reports/GCS09'
import ReportGCS10 from './views/reports/GCS10'
import ReportGCS11 from './views/reports/GCS11'
import ReportGCS12 from './views/reports/GCS12'
import ReportGCS13 from './views/reports/GCS13'
import ReportGCS14 from './views/reports/GCS14'
import ReportGCS15 from './views/reports/GCS15'
import ReportGCS16 from './views/reports/GCS16'
import ReportGCS17 from './views/reports/GCS17'
import ReportGCS18 from './views/reports/GCS18'


// import './App.css'
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
        <Route path='/management/g2Vehiclerule' element={<ManagementG2VehicleRule></ManagementG2VehicleRule>}></Route>
        <Route path='/management/g2Vehiclerule/:stationId' element={<ManagementG2VehicleRuleForm></ManagementG2VehicleRuleForm>}></Route>
        <Route path='/management/incidents' element={<ManagementIncident></ManagementIncident>}></Route>
        <Route path='/management/incidents/:incidentId' element={<ManagementIncidentForm></ManagementIncidentForm>}></Route>
        <Route path='/report/GCS01' element={<ReportGCS01></ReportGCS01>}></Route>
        <Route path='/report/GCS02' element={<ReportGCS02></ReportGCS02>}></Route>
        <Route path='/report/GCS03' element={<ReportGCS03></ReportGCS03>}></Route>
        <Route path='/report/GCS04' element={<ReportGCS04></ReportGCS04>}></Route>
        <Route path='/report/GCS05' element={<ReportGCS05></ReportGCS05>}></Route>
        <Route path='/report/GCS06' element={<ReportGCS06></ReportGCS06>}></Route>
        <Route path='/report/GCS07' element={<ReportGCS07></ReportGCS07>}></Route>
        <Route path='/report/GCS08' element={<ReportGCS08></ReportGCS08>}></Route>
        <Route path='/report/GCS09' element={<ReportGCS09></ReportGCS09>}></Route>
        <Route path='/report/GCS10' element={<ReportGCS10></ReportGCS10>}></Route>
        <Route path='/report/GCS11' element={<ReportGCS11></ReportGCS11>}></Route>
        <Route path='/report/GCS12' element={<ReportGCS12></ReportGCS12>}></Route>
        <Route path='/report/GCS13' element={<ReportGCS13></ReportGCS13>}></Route>
        <Route path='/report/GCS14' element={<ReportGCS14></ReportGCS14>}></Route>
        <Route path='/report/GCS15' element={<ReportGCS15></ReportGCS15>}></Route>
        <Route path='/report/GCS16' element={<ReportGCS16></ReportGCS16>}></Route>
        <Route path='/report/GCS17' element={<ReportGCS17></ReportGCS17>}></Route>
        <Route path='/report/GCS18' element={<ReportGCS18></ReportGCS18>}></Route>
      </Routes>
      {/* <Footer></Footer> */}
      </BrowserRouter>
    </div>
  )
}

export default App
