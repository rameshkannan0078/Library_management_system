import React from 'react'
import { Navigate } from 'react-router-dom'


export default function PrivateRoute({ children }) {
  const currentUser  =window.localStorage.getItem('user');

  if (!currentUser) {
    return <Navigate to='/' />
  }

  return children;
}

