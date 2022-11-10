import React from 'react'
import { Navigate } from 'react-router-dom'


export default function AdminRoute({ children }) {
  const currentUser  =window.localStorage.getItem('admin');

  if (!currentUser) {
    return <Navigate to='/adminlogin' />
  }

  return children;
}
