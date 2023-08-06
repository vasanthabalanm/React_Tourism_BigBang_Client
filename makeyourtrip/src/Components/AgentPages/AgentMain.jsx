import React from 'react'
import ag1 from '../../images/ag1.png'
import ag2 from '../../images/ag2.png'
import ag3 from '../../images/ag3.png'
import ag4 from '../../images/ag4.png'
import './AgentMain.css'
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom'

const Hotels = () => {
    return (
        <div>
            <div className='containers'>
                <div className="rect1">
                    <p className='mainhoteltext'>Welcome!</p>
                    <p className='subhotl'>"Adventure awaits! Let us be your guide to a world of unforgettable experiences and breathtaking destinations." <br />-MakeTrip</p>
                </div>
            </div>
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
    )
}

export default Hotels