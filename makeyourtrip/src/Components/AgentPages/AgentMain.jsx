import React, { useState, useEffect } from 'react'
import ag1 from '../../images/ag1.png'
import ag2 from '../../images/ag2.png'
import ag3 from '../../images/ag3.png'
import ag4 from '../../images/ag4.png'
import './AgentMain.css'
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom'
import images11 from '../../images/agentmainpage.jpg'
import { CardContent } from '@mui/material'
import Footer from '../Footer/Footer'
import image1 from '../../images/logo1.png'
import { FaBox, FaHome, FaHotel, FaMap, FaPlaceOfWorship, FaUnlock } from 'react-icons/fa'


const AgentMain = () => {

    const Logout = () => {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('id')

    }

    const [showLink, setShowLink] = useState(false);

    const toggleLinks = () => {
        setShowLink(!showLink);
    };


    return (
        <div>
            <div className='containers'>
                <div className="rect1">
                    <nav className="navbar position-fixed px-3" style={{ width: '100%' }}>
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
                        <ul className= {`navbar-links ${showLink ? 'active' : ''}`}>
                            <li>
                                <Link to={'/agentmainpage'}><p className="fedbck" style={{ color: 'black' }}><FaHome /> Home</p></Link>
                            </li>
                            <li>
                                <Link to={'/agentmainpage'}><p className="fedbck" style={{ color: 'black' }}><FaHotel /> Hotel</p></Link>
                            </li>
                            <li>
                                <Link to={'/agentmainpage'}><p className="fedbck" style={{ color: 'black' }}><FaPlaceOfWorship /> Place</p></Link>
                            </li>
                            <li>
                                <Link to={'/agentmainpage'}><p className="fedbck" style={{ color: 'black' }}><FaMap /> Spot</p></Link>
                            </li>
                            <li>
                                <Link to={'/agentmainpage'}><p className="fedbck" style={{ color: 'black' }}><FaBox /> Package</p></Link>
                            </li>

                            <li>
                                <Link to={'/login'}><button className='login' onClick={Logout}><FaUnlock /> Logout</button></Link>
                            </li>
                        </ul>

                    </nav>
                    <p className='mainhoteltext'>Welcome!</p>
                    <p className='subhotl'>"Adventure awaits! Let us be your guide to a world of unforgettable experiences and breathtaking destinations." <br />-MakeTrip</p>
                </div>
            </div>

            <div className='container'>
                <Card className="container outterbox boxs" sx={{ borderRadius: '20px', boxShadow: '0px 10px 4px 10px rgba(0, 0, 0, 0.25)' }}>
                    <div className='seprte'>
                        <Link to={'/addhotels'}>
                            <Card sx={{ width: '150px', borderStyle: 'none' }}>
                                <img src={ag1} alt="" width={'80px'} height={'80px'} className='optns' />
                                <p className='linknames'>Hotels</p>
                            </Card>
                        </Link>
                    </div>
                    <div className='seprte'>
                        <Link to={'/agentaddplaces'}>
                            <Card sx={{ width: '150px' }}>
                                <img src={ag2} alt="" width={'80px'} height={'80px'} className='optns' />
                                <p className='linknames'>Place</p>
                            </Card>
                        </Link>
                    </div>
                    <div className='seprte'>
                        <Link to={'/viewallspots'}>
                            <Card sx={{ width: '150px' }}>
                                <img src={ag3} alt="" width={'80px'} height={'80px'} className='optns' />
                                <p className='linknames'>Spot</p>
                            </Card>
                        </Link>
                    </div>
                    <div className='seprte'>
                        <Link to={'/packagedetails'}>
                            <Card sx={{ width: '150px' }}>
                                <img src={ag4} alt="" width={'80px'} height={'80px'} className='optns' />
                                <p className='linknames'>Package</p>
                            </Card>
                        </Link>
                    </div>
                </Card>
            </div>

            <div className='imgcontnt'>
                <div>
                    <img src={images11} alt="" style={{ width: '800px', height: '800px', marginTop: '50px' }} />
                </div>
                <div >
                    <Card sx={{ width: '500px', borderRadius: '20px', boxShadow: '0px 0px 6px 10px rgba(0, 0, 0, 0.25)', marginTop: '300px' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            "Adventure awaits! Let our travel expertise guide you to new horizons. Discover extraordinary destinations, create cherished memories, and embark on unforgettable journeys. With us, your travel dreams become reality. Let's explore together!"
                            <div class="heart-emoji"></div>

                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />

        </div>
    )
}

export default AgentMain