import React, { useState, useEffect } from 'react'
import axios from "axios";
import AddPlace from './AddPlace';
import { FaBox, FaHome, FaHotel, FaMap, FaPlaceOfWorship,FaUnlock } from 'react-icons/fa'
import image1 from '../../images/logo1.png'
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';


const AllPlaes =() => {

    const [employeeList, setEmployeeList] = useState([])
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {
        refreshEmployeeList();
    }, [])

    const employeeAPI = (url = 'https://localhost:7117/api/SpecialPlace/') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    function refreshEmployeeList() {
        employeeAPI().fetchAll()
            .then(res => {
                setEmployeeList(res.data)
            })
            .catch(err => console.log(err))
    }

    const addOrEdit = (formData, onSuccess) => {
        if (formData.get('specialtyId') == '0') {
            employeeAPI()
            .create(formData)
            .then(res => {
              onSuccess();
              refreshEmployeeList();
            })
            .catch(err => console.log(err));
        } else {
            employeeAPI()
            .update(formData.get('specialtyId'), formData)
            .then(res => {
              onSuccess();
              refreshEmployeeList();
            })
            .catch(err => console.log(err));
        }
      };

    const showRecordDetails = data => {
        setRecordForEdit(data)
    }

    const onDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Are you sure to delete this record?'))
            employeeAPI().delete(id)
                .then(res => refreshEmployeeList())
                .catch(err => console.log(err))
    }

    const imageCard = data => (
        <div className="card" style={{margin:'10px'}} onClick={() => { showRecordDetails(data) }}>
            <img src={data.imageSrc} className="card-img-top " style={{width:'100%',height:'400px'}} />
            <div className="card-body">
                <h5>{data.specialtyLocation}</h5>
                <p>placeId:{data.specialtyId}</p>
                <span>{data.whatSpecial}</span> <br />
                <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.specialtyId))}>
                    <i className="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
    )

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
    // <div>
    //     <div className="row">
    //         <div className="col-md-12">
    //             <div className="jumbotron jumbotron-fluid py-4">
    //                 <div className="container text-center">
    //                     <h1 className="display-4">Employee Register</h1>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="col-md-4">
    //             <AddPlace
    //                 addOrEdit={addOrEdit}
    //                 recordForEdit={recordForEdit}
    //             />
    //         </div>
    //         <div className="col-md-8">
    //             <table>
    //                 <tbody>
    //                     {
    //                         //tr > 3 td
    //                         [...Array(Math.ceil(employeeList.length / 3))].map((e, i) =>
    //                             <tr key={i}>
    //                                 <td>{imageCard(employeeList[3 * i])}</td>
    //                                 <td>{employeeList[3 * i + 1] ? imageCard(employeeList[3 * i + 1]) : null}</td>
    //                                 <td>{employeeList[3 * i + 2] ? imageCard(employeeList[3 * i + 2]) : null}</td>
    //                             </tr>
    //                         )
    //                     }
    //                 </tbody>
    //             </table>
    //         </div>
    //     </div>
    // </div>
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
                 <p className='mainhoteltext'>Add Place!</p>
                 <div className="breadcrumbs-container ">
                     <div className='bg-light py-2' style={{ display: 'flex', justifyContent: 'center', width: '200px', height: '40px', borderRadius: '10px' }}>
                         <Link to="/agentmainpage" className="breadcrumb">Home/</Link>
                         <span className="breadcrumb">Add Place</span>
                     </div>


                 </div>
             </div>
         </div>
         <br />
         <br />
         <div className="centralized">
             <div className="addfetch">
                 <AddPlace addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
             </div>
             <div className="editupdate">
                 <table>
                     <tbody>
                         {employeeList.map((data, i) => (
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
  )
}

export default AllPlaes