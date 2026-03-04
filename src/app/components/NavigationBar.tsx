"use client"

import Image from 'next/image';
import mapuaLogo from '@/images/mapua_logo2.png'
import { me, logout } from '../service/AuthService';
import { useEffect, useState } from 'react';

const NavigationBar = () => {

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(()=>{
    me().then((user) => setLoggedIn(!!user)).catch(() => setLoggedIn(false));
  },[]);

  function handleLogout() {
    logout().then(() => {
      alert("Logged out successfully");
      window.location.reload();
    });
  }

  return (
    <div className='bg-primary flex justify-between px-8 py-4 text-white'>
      <Image 
        src={mapuaLogo}
        alt="Mapua University logo"
        className='h-16 w-auto'
      />
      {isLoggedIn && (<button className="px-8 cursor-pointer hover:scale-110 transition-all" onClick={handleLogout}>Logout</button>)}
    </div>
  )
}

export default NavigationBar