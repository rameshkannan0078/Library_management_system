import React, { useEffect, useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { MDBCard, MDBCardImage, MDBCardBody, MDBRow, MDBCol,MDBCardLink } from 'mdb-react-ui-kit';
import pdf_image from '../../Images/PDF.png';
import {useNavigate} from 'react-router';


async function loginUser(credentials) {
  return fetch(global.config.apisend.url+'api/addreport', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body:credentials
  })
    .then(data => data.json())
 }


function EbookList(){

  const navigate=useNavigate()

    const [pdfdata,Setpdfdata]=useState([]);

    useEffect(()=>{
        InitialPageLoader()
    }
    ,[]);


    const InitialPageLoader =  (e) =>{
        const obj = {
          subject_code:window.localStorage.getItem('subject_code'),
          materialtype:window.localStorage.getItem('material_type')
        };
        
        const data = Object.keys(obj)
          .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
          .join('&');
    
       
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data,
          url: global.config.apisend.url+'api/booklist',
        };
        
     axios(options).then((res)=>{
        Setpdfdata(res.data);
         console.log("This is "+JSON.stringify(res.data))
        }).catch((err)=>{
          console.log(err);
        })
      }


      const pdffileshower = (e) =>{
        const value1 = e.currentTarget.getAttribute("data-value1")
        const value2 = e.currentTarget.getAttribute("data-value2")
        localStorage.setItem('pdf_url',value1);
        localStorage.setItem('pdf_name',value2);
        UpdateStartTime();
      }


      const UpdateStartTime = async () =>{
        const obj = {
          email:window.localStorage.getItem('user'),
          department:window.localStorage.getItem('department'),
          material_type:window.localStorage.getItem('material_type'),
          pdf_name:window.localStorage.getItem('pdf_name'),
          start_time:new Date().toLocaleString(),
          end_time:new Date().toLocaleString(),
        };
        
        const data = Object.keys(obj)
          .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
          .join('&');
    
         const response = await loginUser(data);
         if(response.message){
          window.localStorage.setItem("id",JSON.stringify(response.message))
          navigate('/pdfviewer')
         }
          


        
  
      }

      const openPage = () =>{
        navigate('/ebook')
        
      }

    return(
        <div>
             <Navbar bg="dark" variant="dark">
                <div style={{ color:'white',fontSize:'18px',padding:'10px'}}>
                Mount Zion College Of Engineering And Technology 
                </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Button style={{marginRight:'10px'}} onClick={openPage}>Logout</Button>
        </Navbar.Collapse>
    </Navbar>

      <div className="container my-5">
    <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
           {
    pdfdata &&
pdfdata?.map((obj,i) => {
     return(

      
      <MDBCol>
      <MDBCard background='light' className='mb-3' style={{ maxWidth: '50rem',maxHeight:'20rem' }}>
        <MDBCardBody>
        <MDBCardImage
            src={pdf_image} 
            style={{ width:"80px",height:'80px' }}
            alt='...'
            position='top'
          /><br></br>
          <MDBCardLink style={{ fontSize:'15px',cursor:'pointer'}} key={i} data-value1={global.config.apisend.url+obj.pdf_file}  data-value2={obj.pdf_file} onClick={pdffileshower}>{obj.pdf_file}</MDBCardLink>
              </MDBCardBody>
      </MDBCard>
      </MDBCol>
    
     )
})  
}
          
</MDBRow>
    
      </div>
    </div>
  </div>
        </div>
    )
}
export default EbookList;