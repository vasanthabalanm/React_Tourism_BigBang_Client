// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Pages/Home';
import Userregister from './Components/UserRegister/Userregister';
import Login from './Components/Login/Login';
import AdminIndex from './Components/AdminPage/AdminIndex';
import Agentregister from './Components/AgentRegister/Agentregister';
import FeedbackForm from './Components/Pages/FeedbackForm';
import DisplayHotel from './Components/AgentPages/DisplayHotel';
import AllPlaes from './Components/AgentPages/AllPlaes';
import Allspots from './Components/AgentPages/Allspots';
import PackageDetails from './Components/AgentPages/PackageDetails';
import ManagePackage from './Components/Pages/ManagePackage';
import UserBooking from './Components/Booking/UserBooking';
import NotFoundPage from './Components/Notfound/NotFoundPage';
import AgentMain from './Components/AgentPages/AgentMain';
import AdminRouting from './Components/ProtectedRouting/AdminRouting';
import UserRouting from './Components/ProtectedRouting/UserRouting';
import TravelAgentRouting from './Components/ProtectedRouting/TravelAgentRouting';
import DisplyRouting from './Components/ProtectedRouting/DisplyRouting';
import AllPlacesRouting from './Components/ProtectedRouting/AllPlacesRouting';
import ViewallPlacesRouting from './Components/ProtectedRouting/ViewallPlacesRouting';
import PackageDetailsRouting from './Components/ProtectedRouting/PackageDetailsRouting';


function App() {

  const roles = sessionStorage.getItem('role')
  var accessToken;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Userregister} />
          {/* <Route path='/adminpage' element={roles === "Admin" ?  <NotFoundPage /> : <AdminIndex />} /> */}
          <Route path='/agentregister' Component={Agentregister} />
          <Route path='/feedback' Component={FeedbackForm} />
          {/* <Route path='/agentmainpage' element={roles === "TravelAgent" ? (<AgentMain />) : (<NotFoundPage />)} /> */}
          {/* <Route path='/addhotels' element={roles === "TravelAgent" ? (<DisplayHotel />) : (<NotFoundPage />)} /> */}
          {/* <Route path='/agentaddplaces' element={roles === "TravelAgent" ? (<AllPlaes />) : (<NotFoundPage />)} /> */}
          {/* <Route path='/viewallspots' element={roles === "TravelAgent" ? (<Allspots />) : (<NotFoundPage />)} /> */}
          {/* <Route path='/packagedetails' element={roles === "TravelAgent" ? (<PackageDetails />) : (<NotFoundPage />)} /> */}
          <Route path='/getallpacks' Component={ManagePackage} />
          <Route path='/*' element={<NotFoundPage />} />

          <Route path='/adminpage' element={
            <AdminRouting token={accessToken}>
              <AdminIndex />
            </AdminRouting>
          }
          />
          <Route path='/userbooking' element={
            <UserRouting token={accessToken}>
              <UserBooking />
            </UserRouting>
          } />

          <Route path='/agentmainpage' element={
            <TravelAgentRouting token={accessToken}>
              <AgentMain />
            </TravelAgentRouting>
          }
          />

          <Route path='/addhotels' element={
            <DisplyRouting token={accessToken}>
              <DisplayHotel />
            </DisplyRouting>
          }
          />

          <Route path='/agentaddplaces' element={
            <AllPlacesRouting token={accessToken}>
              <AllPlaes />
            </AllPlacesRouting>
          }
          />

<Route path='/viewallspots' element={
            <ViewallPlacesRouting token={accessToken}>
              <Allspots />
            </ViewallPlacesRouting>
          }
          />

          <Route path='/packagedetails' element={
            <PackageDetailsRouting token={accessToken}>
              <PackageDetails />
            </PackageDetailsRouting>
          }
          />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
