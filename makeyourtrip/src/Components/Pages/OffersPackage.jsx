import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Offerpackage.css'
import Carousel from 'react-bootstrap/Carousel';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import accom1 from '../../images/accomodations.png'
import axios from 'axios';


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const OffersPackage = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [galleryList, setgalleryList] = useState([]);

    useEffect(() => {
        refreshgalleryList();
    }, []);

    const crudgalleryapi = (url = 'https://localhost:7117/api/AdminGallery/') => {
        return {
            fetchAll: () => axios.get(url),
        };
    };

    function refreshgalleryList() {
        crudgalleryapi()
            .fetchAll()
            .then(res => {
                setgalleryList(res.data);
            })
            .catch(err => console.log(err));
    }


    return (
        <div className='container packs'>
            <div className='cks'>
                <p className='packhead'>Popular offers!</p>
                <p className='subheadingpackage'>"Book a refreshing trip <span className='clrdente'>and</span> GET SET GO!"</p>
            </div>
            <div className='allpacks'>
                {/* <Box sx={{ width: '40vw',height:'60vh', background: 'green' }}> */}
                <Box sx={{ width: '45vw', height: '60vh' }}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Holiday" {...a11yProps(0)} />
                            <Tab label="Devotional" {...a11yProps(1)} />
                            <Tab label="Adventure" {...a11yProps(2)} />
                            <Tab label="WildLife" {...a11yProps(3)} />
                            <Tab label="Culture" {...a11yProps(4)} />
                            <Tab label="Family" {...a11yProps(5)} />


                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Carousel fade className='caroslheight'>
                            {galleryList.map((data, i) => (
                                <Carousel.Item >
                                    <img src={data.imageSrc} className="card-img-top" alt="default images" style={{ borderRadius: '30px' }} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Carousel fade className='caroslheight'>
                            {galleryList.map((data, i) => (
                                <Carousel.Item >
                                    <img src={data.imageSrc} className="card-img-top" alt="default images" style={{ borderRadius: '30px' }} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <Carousel fade className='caroslheight'>
                            {galleryList.map((data, i) => (
                                <Carousel.Item >
                                    <img src={data.imageSrc} className="card-img-top" alt="default images" style={{ borderRadius: '30px' }} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3}>
                        <Carousel fade className='caroslheight'>
                            {galleryList.map((data, i) => (
                                <Carousel.Item >
                                    <img src={data.imageSrc} className="card-img-top" alt="default images" style={{ borderRadius: '30px' }} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4}>
                        <Carousel fade className='caroslheight'>
                            {galleryList.map((data, i) => (
                                <Carousel.Item >
                                    <img src={data.imageSrc} className="card-img-top" alt="default images" style={{ borderRadius: '30px' }} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={5}>
                        <Carousel fade className='caroslheight'>
                            {galleryList.map((data, i) => (
                                <Carousel.Item >
                                    <img src={data.imageSrc} className="card-img-top" alt="default images" style={{ borderRadius: '30px' }} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </CustomTabPanel>

                </Box>
            </div>
        </div>
    );
}

export default OffersPackage