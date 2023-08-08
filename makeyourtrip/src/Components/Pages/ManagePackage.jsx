import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagePackage.css';
import GetDetailPacks from './GetDetailPacks';
import image1 from '../../images/logo1.png'
import flight from '../../images/flight.png'
import Navbar from '../Navbar/Navbar';
import videoFile from '../../images/wave_-_19368 (1080p).mp4'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'

const filterAll_One = 'https://localhost:7117/api/PackageOffering';
const ManagePackage = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [transport, setTransport] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    const delayFilterPackages = setTimeout(() => {
      filterPackages();
    }, 300);

    return () => {
      clearTimeout(delayFilterPackages);
    };
  }, [search, destination, transport]);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${filterAll_One}`);
      setPackages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleTransportChange = (event) => {
    setTransport(event.target.value);
  };

  const filterPackages = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7117/api/PackageOffering/GetAllIntrest?offertype=${search}&destination=${destination}&vehicletype=${transport}`
      );
      setPackages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (packageData) => {
    sessionStorage.setItem('PackageId', packageData.packageID);
    setSelectedPackage(packageData);
  };

  const closeModal = () => {
    setSelectedPackage(null);
  };



  const [showLink, setShowLink] = useState(false);

  const toggleLinks = () => {
    setShowLink(!showLink);
  };

  return (
    <div>
      <div>
        <nav className="navbar px-3 py-2">
          <div className="navbar-logo">
            <div className='combine'>
              <div><img src={image1} alt="" className='logo' /></div>
              <div className="brandname">MakeTrip</div>
            </div>
          </div>
          <div className={`navbar-toggle ${showLink ? 'active' : ''}`} onClick={toggleLinks}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`navbar-links ${showLink ? 'active' : ''}`}>
            <li>
              <Link to={'/'}><p className="fedbck" style={{ color: 'black' }}>Home</p></Link>
            </li>
            <li>
              <Link to={'/getallpacks'}><p className="fedbck" style={{ color: 'black' }}>Packages</p></Link>
            </li>
            <li>
              <Link to={'/feedback'}><p className="fedbck" style={{ color: 'black' }}>Feedback</p></Link>
            </li>
            <li>
              <Link to={'/login'}><button className='login'>Log-In</button></Link>
            </li>
          </ul>

        </nav>
      </div>
      <div className='video-container'>
      <video  className='fullscreen-video' autoPlay loop muted>
        <source src={videoFile} type="video/mp4" />
      </video>
    </div>
      <div className='container Package-whole-page' style={{ width: '100%' }}>
        
        <div style={{position: 'absolute' }}>
          <div className='search-container' style={{ marginTop: '20px',marginTop:'-50px' }}>
            <input
              type='text'
              placeholder='Search by package type'
              value={search}
              onChange={handleSearchChange}
            />
            <input
              type='text'
              placeholder='Search by destination'
              value={destination}
              onChange={handleDestinationChange}
            />
            <input
              type='text'
              placeholder='Transport Type'
              value={transport}
              onChange={handleTransportChange}
            />
          </div>
        </div>

        
      </div>
      <div className='container py-5' style={{marginTop:'100px'}}>
      <h2 >Check Package</h2>
        <div className='Package-list'>
          {packages.map((pkg, index) => (
            <div className='Package-card' key={index}>
              <h2>{pkg.offerType}</h2>
              <p>Destination: {pkg.destination}</p>
              <h5>Price Per Person : {pkg.pricePerPerson}</h5>
              <button onClick={() => openModal(pkg)}>View Details</button>
            </div>
          ))}
        </div>

        <GetDetailPacks
          isOpen={!!selectedPackage}
          closeModal={closeModal}
          packageData={selectedPackage || {}}
        />
      </div>

      <Footer/>
    </div>

  );
}

export default ManagePackage