import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hotels from './Hotels';
import image1 from '../../images/logo1.png'
import { FaUnlock } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import './Hotel.css'
import Footer from '../Footer/Footer';
import { FaBox, FaHome, FaHotel, FaMap, FaPlaceOfWorship } from 'react-icons/fa'


const DisplayHotel = () => {

    const [hotellist, sethotellist] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);

    useEffect(() => {
        refreshhotellist();
    }, []);

    const hotelapi = (url = 'https://localhost:7117/api/Hotel/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        };
    };

    function refreshhotellist() {
        hotelapi()
            .fetchAll()
            .then(res => {
                sethotellist(res.data);
            })
            .catch(err => console.log(err));
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('hotelId') == '0') {
            hotelapi()
                .create(formData)
                .then(res => {
                    onSuccess();
                    refreshhotellist();
                })
                .catch(err => console.log(err));
        } else {
            hotelapi()
                .update(formData.get('hotelId'), formData)
                .then(res => {
                    onSuccess();
                    refreshhotellist();
                })
                .catch(err => console.log(err));
        }
    };

    const showRecordDetails = data => {
        setRecordForEdit(data);
    };

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?')) {
            hotelapi()
                .delete(id)
                .then(res => refreshhotellist())
                .catch(err => console.log(err));
        }
    };

    const imageCard = data => (
        <div className="card getimg" onClick={() => showRecordDetails(data)}>
            <img src={data.imageSrc} className="card-img-top" alt="default images" style={{ height: '400px' }} />
            <div className="card-body">
                <h5>{data.hotelName}</h5>
                <p>Id:{data.hotelId}</p>
                <span className="locationdesc">{data.hotelDescription}</span> <br />
                <p>Ratings:{data.ratings}</p>
                <p>Per Person:₹{data.pricePerPerson}</p>
                <p>Total rooms:{data.hotelRoomsAvailable}</p>
                <p>Food Type:{data.foodType}</p>
                <p>Location:{data.hotelLocation}</p>
                <button
                    className="btn btn-danger"
                    onClick={e => onDelete(e, parseInt(data.hotelId))}
                >
                    <i className="far fa-trash-alt" style={{ color: 'white' }}></i>
                </button>
            </div>
        </div>
    );


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
            <div className='container-fluid'>
                <div className=' container-fluid containersrr'>
                    <div className="rect2" >
                        <nav className="container-fluid navbar position-fixed px-5" style={{ width: '100%' }}>
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
                        <p className='mainhoteltext'>Add Hotel!</p>
                        <div className="breadcrumbs-container ">
                            <div className='bg-light py-2' style={{ display: 'flex', justifyContent: 'center', width: '200px', height: '40px', borderRadius: '10px' }}>
                                <Link to="/agentmainpage" className="breadcrumb">Home/</Link>
                                <span className="breadcrumb">Add Hotel</span>
                            </div>


                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="centralized">
                    <div className="addfetch">
                        <Hotels addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
                    </div>
                    <div className="editupdate">
                        <table>
                            <tbody>
                                {hotellist.map((data, i) => (
                                    <tr key={i}>
                                        <td>{imageCard(data)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <Footer />

        </div>


    );
}

export default DisplayHotel