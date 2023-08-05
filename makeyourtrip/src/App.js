// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Pages/Home';
import Userregister from './Components/UserRegister/Userregister';
import Login from './Components/Login/Login';
import AdminIndex from './Components/AdminPage/AdminIndex';
import Agentregister from './Components/AgentRegister/Agentregister';
import FeedbackForm from './Components/Pages/FeedbackForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/login' Component={Login}/>
        <Route path='/register' Component={Userregister} />
        <Route path='/adminpage' Component={AdminIndex}/>
        <Route path='/agentregister' Component={Agentregister}/>
        <Route path='/feedback' Component={FeedbackForm}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
