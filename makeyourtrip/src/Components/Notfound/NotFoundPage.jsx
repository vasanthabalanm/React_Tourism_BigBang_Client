import React from 'react'
import error from '../../images/404.png'
import './NotFoundPage.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
const NotFoundPage =() => {
  return (
    <div className=' container-fluid erormsg'>
        <div className='chkimg'>
           <img src={error} alt="" className='img404' />
        </div>
        <p style={{display:'flex',justifyContent:'center'}}><Link to={'/'}><Button className='btnerror'>Go Home</Button></Link></p>

    </div>
  )
}

export default NotFoundPage