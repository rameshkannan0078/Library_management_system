
import {Button} from 'react-bootstrap';
import { useNavigate } from "react-router";
import React from "react";
function NavbarAPI(){
 
  const navigate=useNavigate()
  

const logoutAdmin = (e) =>{
  window.localStorage.removeItem('admin');
  window.localStorage.removeItem('show_delete_option');
  navigate('/')
}



const naviagteThisPage=(q)=>{
  navigate(q);
}

    return(
        <div>
            <div className="container-fluid">
  <div className="row">
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#As" onClick={()=>naviagteThisPage("/apihome")}>
              <span data-feather="home" className="align-text-bottom"></span>
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="#Bs" onClick={()=>naviagteThisPage("/apiaddmaterial")}>
              <span data-feather="file" className="align-text-bottom"></span>
             Add Materials
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="#As1" onClick={()=>naviagteThisPage("/apiaddsubject")}>
              <span data-feather="shopping-cart" className="align-text-bottom"></span>
             Add Subjects
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="#As2" onClick={()=>naviagteThisPage("/showmaterial")}>
              <span data-feather="shopping-cart" className="align-text-bottom"></span>
          Show Book Details
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link"  href="#Bs" onClick={()=>naviagteThisPage("/apiaddebook")}>
              <span data-feather="file" className="align-text-bottom"></span>
             Add Ebook
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link"  href="#Bs" onClick={()=>naviagteThisPage("/apishowebook")}>
              <span data-feather="file" className="align-text-bottom"></span>
             Show Ebook
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link"  href="#Bs" onClick={()=>naviagteThisPage("/apiadduser")}>
              <span data-feather="file" className="align-text-bottom"></span>
             Add User
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link"  href="#Bs" onClick={()=>naviagteThisPage("/apishowalluser")}>
              <span data-feather="file" className="align-text-bottom"></span>
            User Details
            </a>
          </li>

    
     
   
{
window.localStorage.getItem("show_delete_option")
  &&
  <>
   <li className="nav-item">
 <a className="nav-link"  href="#As2" onClick={()=>naviagteThisPage("/deletematerial")}>
   <span data-feather="shopping-cart" className="align-text-bottom"></span>
Delete Book
 </a>
</li>
 <li className="nav-item">
 <a className="nav-link"  href="#As2" onClick={()=>naviagteThisPage("/addInstruction")}>
   <span data-feather="shopping-cart" className="align-text-bottom"></span>
Add Instruction
 </a>
</li>
  
  </>
}
     

          <li className="nav-item" style={{ padding:"10px"}}>
           <Button onClick={logoutAdmin}>Log out</Button>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</div>
        </div>
    );
}

export default NavbarAPI;