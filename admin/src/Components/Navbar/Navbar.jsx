import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
        {/* <img className = 'logo' src={assets.logo} alt="" /> */}
        <div className="logo"><h1>ECommerce</h1><h6>Admin</h6></div>
        <img className = 'profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navbar
