import { Card, CardContent } from '@mui/material'
import trvlr from '../../images/trvr.png'
import './Showcase.css'
import React from 'react'

const Showcase = () => {
  return (
    <div className='container' style={{ height: '80vh' }}>
      <p className='packhead'>Testimonals</p>
      <div style={{display:'flex',justifyContent:'space-evenly'}}>
      <div className='Circle2'>
        <img src={trvlr} alt="" className='image2' />
      </div>
      <div>
        <Card sx={{width:'500px',margin:'10px'}}>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores voluptates tenetur expedita facere ratione quia praesentium reprehenderit pariatur ut harum molestiae odit nostrum facilis autem voluptatibus, ipsum accusantium! Enim, mollitia.
          </CardContent>
        </Card>
        <Card sx={{width:'500px'}}>
          <CardContent>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores voluptates tenetur expedita facere ratione quia praesentium reprehenderit pariatur ut harum molestiae odit nostrum facilis autem voluptatibus, ipsum accusantium! Enim, mollitia.
          </CardContent>
        </Card>
      </div>
      </div>
      
    </div>
  )
}

export default Showcase