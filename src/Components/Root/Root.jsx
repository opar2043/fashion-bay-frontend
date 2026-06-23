import React from 'react'
 import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import ScrolltoTop from './ScrolltoTop';
const Root = () => {
  return (
    <div>
        <ScrolltoTop></ScrolltoTop>
          <ToastContainer />
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
    </div>
  )
}

export default Root