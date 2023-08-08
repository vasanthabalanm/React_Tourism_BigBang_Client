import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spots from './Spots';
import Footer from '../Footer/Footer';
import { FaBox, FaHome, FaHotel, FaMap, FaPlaceOfWorship, FaUnlock } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import image1 from '../../images/logo1.png'

const Allspots = () => {

    const [spotlist, setspotlist] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState(null);

    useEffect(() => {
        refreshspotlist();
    }, []);

    const spotapi = (url = 'https://localhost:7117/api/VisitingSpots/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        };
    };

    function refreshspotlist() {
        spotapi()
            .fetchAll()
            .then(res => {
                setspotlist(res.data);
            })
            .catch(err => console.log(err));
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('spotId') == '0') {
            spotapi()
                .create(formData)
                .then(res => {
                    onSuccess();
                    refreshspotlist();
                })
                .catch(err => console.log(err));
        } else {
            spotapi()
                .update(formData.get('spotId'), formData)
                .then(res => {
                    onSuccess();
                    refreshspotlist();
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
            spotapi()
                .delete(id)
                .then(res => refreshspotlist())
                .catch(err => console.log(err));
        }
    };

    const imageCard = data => (
        <div className="card getimg" onClick={() => showRecordDetails(data)}>
            <img src={data.imageSrc} className="card-img-top" alt="default images" style={{width:'100%',height:'500px'}} />
            <div className="card-body">
                <h5>{data.spotLocation}</h5>
                <p>Id:{data.spotId}</p>
                <p>siutable Places:{data.specialtyId}</p>
                <button
                    className="btn btn-danger"
                    onClick={e => onDelete(e, parseInt(data.spotId))}
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
                        <p className='mainhoteltext'>Add Spot!</p>
                        <div className="breadcrumbs-container ">
                            <div className='bg-light py-2' style={{ display: 'flex', justifyContent: 'center', width: '200px', height: '40px', borderRadius: '10px' }}>
                                <Link to="/agentmainpage" className="breadcrumb">Home/</Link>
                                <span className="breadcrumb">Add Spot</span>
                            </div>


                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
            <div className="centralized py-4">
                <div className="addfetch">
                    <Spots addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
                </div>
                <div className="editupdate">
                    <table>
                        <tbody>
                            {spotlist.map((data, i) => (
                                <tr key={i}>
                                    <td>{imageCard(data)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>

    );
}

export default Allspots