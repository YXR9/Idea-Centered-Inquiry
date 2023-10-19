import React from 'react';
import Logo from "../assets/logo v4.png"

export default function ForumPage_Navbar() {
  return (
    <nav2>
        <div className='nav-logo-container'>
            <img alt='' src={Logo} width={85} height={85} />
        </div>
      <div className='menu'>
        <a href="/index">回首頁</a>
        {/* <a href="/forums">Forums</a> */}
      </div>
    </nav2>
  );
}