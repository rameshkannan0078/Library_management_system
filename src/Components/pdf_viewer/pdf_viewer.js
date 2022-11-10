import React, {useEffect, useState} from 'react'
import axios from 'axios';
// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import {Navbar,Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const Pdfviewer = ({name}) =>{

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const navigate=useNavigate();

  useEffect(()=>{
    setPdfFile(localStorage.getItem('pdf_url'));
    let isAuth = window.localStorage.getItem('pdf_url');
    if(isAuth && isAuth !== null) {
        navigate("/pdfviewer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

 



  
  // pdf file onChange state
  const [pdfFile, setPdfFile]=useState(null);



const updateTheEndTime = () =>{
  window.localStorage.removeItem('pdf_url');

    const obj = {
      id:window.localStorage.getItem('id'),
      end_time:new Date().toLocaleString(),
    };
    
    const data = Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');

   
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: global.config.apisend.url+'api/updatereport',
    };
    
 axios(options).then((res)=>{
  navigate('/ebooklist')
    }).catch((err)=>{
      console.log(err);
    })

 

}









  return (
    <div className="container">
       <Navbar bg="dark" variant="dark">
                <div style={{ color:'white',fontSize:'18px',padding:'10px'}}>
                Mount Zion College Of Engineering And Technology 
                </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Button style={{marginRight:'10px'}} onClick={updateTheEndTime}>Go Back</Button>
        </Navbar.Collapse>
    </Navbar>
      
      <h5 style={{ padding:'20px' }}>Take the Notes CareFully!</h5>
      <div className="viewer">

        {/* render this if we have a pdf file */}
        {pdfFile&&(
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!pdfFile&&<>No file is selected yet</>}

      </div>
      

    </div>
  );
}

export default Pdfviewer;