"use client" // remove this in the future

import React, { useEffect, useState } from 'react'
import { me, User } from '../service/AuthService'

const ClientDashboard = () => {

  const [user, setUser] = useState<User | null>(null);

  // useEffect(() => {
  //   me().then(user => setUser(user));
  // }, []);

  return (
    <div>
    </div>
  )
}

export default ClientDashboard