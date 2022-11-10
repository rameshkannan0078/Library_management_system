import React, { useEffect,useState } from "react";
import MzcetHeader from "./ApiComponents/headermzcet";
import NavbarAPI from "./ApiComponents/navbar/navbar";
import Spinner from 'react-bootstrap/Spinner';
import './apihome.css';
import axios  from "axios";
function ApiHome(){

  const [tableData, setTableData] = useState([]);
  const [spinnerLoad,setspinnerLoad]=useState(true);
  useEffect(()=>{
    TableDataLoader()
  },[])

  const TableDataLoader = () =>{
    axios.get(global.config.apisend.url+'api/getreport').then((response) => {
      setTableData(response.data);
      setspinnerLoad(false)
    });
  }



    

    return(
        <div>
            
           <MzcetHeader/>
<NavbarAPI>
  </NavbarAPI>

  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
      </div>
      {
        spinnerLoad ?
        <Spinner animation={"border"}  variant="primary" /> 
    :
    <table className="table">
    <thead>
        <tr>
            <th>Username</th>
            <th>Type</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Purpose</th>
        </tr>
    </thead>
    <tbody>
    {
        tableData.map((data, index)=>{
            return(
                <tr key={index}>
                 
                    <td>{data.username}</td>
                    <td>{data.type}</td>
                    <td>{data.department}</td>
                    <td>{data.designation}</td>
                    <td>{data.timein}</td>
                    <td>{data.timeout}</td>
                    <td>{data.materialtype}</td>
                    
                </tr>
            )
        })
    }
    </tbody>
</table>}

    
    </main>

        </div>
    );
}

export default ApiHome;