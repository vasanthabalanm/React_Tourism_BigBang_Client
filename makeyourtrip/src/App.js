// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Pages/Home';
import Userregister from './Components/UserRegister/Userregister';
import Login from './Components/Login/Login';
import AdminIndex from './Components/AdminPage/AdminIndex';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Userregister} />
        <Route path='/adminpage' Component={AdminIndex}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
