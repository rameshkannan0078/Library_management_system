import React, { useEffect,useState } from "react";
import axios  from "axios";
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";
import { Button} from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

function DeleteMaterialPage(){


    
  const [spinnerLoad,setspinnerLoad]=useState(true);
    const [tableData, setTableData] = useState([]);
    useEffect(()=>{
      TableDataLoader()
    },[])
  
    const TableDataLoader = () =>{
      axios.get(global.config.apisend.url+'api/getmaterials').then((response) => {
        setTableData(response.data);
        setspinnerLoad(false)
      });
    }

    const [inputValue, setInputValue] = React.useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }



const deleteThisFile = (dep_code,sub_code,file,sem) =>{



 setspinnerLoad(true);
  const obj = {
    deptype:dep_code,
    subcode:sub_code,
    semester:sem,
    filename:file
  };
  
  const data = Object.keys(obj)
    .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');

 
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data,
    url: global.config.apisend.url+'api/deleteupload',
  };
  
axios(options).then((res)=>{
  setspinnerLoad(false)
  TableDataLoader()
  alert("The File deleted Successfully")

  }).catch((err)=>{
    alert(err)
    console.log(err);
  })
}

    
return(
    <div>
        <MzcetHeader/>
<NavbarAPI/>
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Avilable Materials (Don't Refresh ! It will Load)</h1>
        <form>
        <input value={ inputValue } onChange={ handleInputChange } placeholder="Subject Code"></input>
        </form>
    
      </div>

      {
        spinnerLoad ?
        <Spinner animation={"border"}  variant="primary" /> 
    :

      <table className="table">
            <thead>
                <tr>
                    <th>Department Code</th>
                    <th>Department Type</th>
                    <th>Subject Code</th>
                    <th>Semester</th>
                    <th>Material Type</th>
                    <th>Pdf File</th>
                    <th>Delete</th>
           
                </tr>
            </thead>
            <tbody>
            {
                tableData.filter((data)=>{
                  if(inputValue === ""){
                    return data;
                  }
                  else if(data.sub_code.toLowerCase().includes(inputValue.toLowerCase())){
                    return data;
                  }
                })
                
                .map((data, index)=>{
                    return(
                        <tr key={index}>
                         
                            <td>{data.dep_code}</td>
                            <td>{data.dep_type}</td>
                            <td>{data.sub_code}</td>
                            <td>{data.semester}</td>
                            <td>{data.materialtype}</td>
                            <td>{data.pdf_file}</td>
                            <td key={data.pdf_file}><Button variant="danger" onClick={()=>deleteThisFile(data.dep_code,data.sub_code,data.pdf_file,data.semester)}>Delete</Button></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
}
    </main>

    </div>
);
}

export default DeleteMaterialPage;