import React from 'react'
import './Home.css'
import image1 from '../../images/banner.png'
const Home =() =>{
  return (
    <div>
        <div className='combine'>
            <div>
                <p className='mainhead'>Explore the world!</p>
                <p>"Welcome to our travel website, your gateway to unforgettable adventures and remarkable destinations worldwide."</p>
            </div>
            <div className='Circle1'>
                <img src={image1} alt="" className='image1' />
            </div>
        </div>
    </div>
  )
}

export default Home