// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './Components/Pages/Home';


function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter> */}
      {/* <Home/> */}
      <BrowserRouter>
      {/* <Navbar/> */}
      <Home/>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
