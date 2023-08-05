import React,{useState} from 'react'
import './Navbar.css'
import image1 from '../../images/logo1.png'
import { Link } from 'react-router-dom';

const Navbar =() => {
    const [showbar, setShowbar] = useState(false);

    const toggleLinks = () => {
        setShowbar(!showbar);
    };
  return (
    <div>
        <nav className="navbar">
            <div className="navbar-logo">
                <div className='combine'>
                    <div><img src={image1} alt="" className='logo' /></div>
                    <div className="brandname">MakeTrip</div>
                </div> 
            </div>
            <div className={`navbar-toggle ${showbar ? 'active' : ''}`} onClick={toggleLinks}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={`navbar-links ${showbar ? 'active' : ''}`}>
                <li>
                    Home
                </li>
                <li>
                    Services
                </li>
                <li>
                    Packages
                </li>
                <li>
                    <Link to={'/feedback'}>Feedback</Link>
                </li>
                <li>
                <Link to={'/login'}><button className='login'>Log-In</button></Link>
                </li>
            </ul>
            
        </nav>
    </div>
  )
}

export default Navbar