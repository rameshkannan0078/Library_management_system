import React, { useEffect,useState } from "react";
import axios  from "axios";
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";
import {Spinner,Button} from 'react-bootstrap';

function ShowEbookPage(){


    
  const [spinnerLoad,setspinnerLoad]=useState(true);
    const [tableData, setTableData] = useState([]);
    useEffect(()=>{
      TableDataLoader()
    },[])
  
    const TableDataLoader = () =>{
      axios.get(global.config.apisend.url+'api/getallebook').then((response) => {
        setTableData(response.data);
        setspinnerLoad(false)
      });
    }

    const [inputValue, setInputValue] = React.useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
        if(inputValue.length >=5){
            SendValue()
        }
    }

    const SendValue = (e) =>{
        const obj = {
            title:inputValue,
          };
          
          const data = Object.keys(obj)
            .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
            .join('&');
      
         
          const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data,
            url: global.config.apisend.url+'api/ebooklistsearch',
          };
          
       axios(options).then((res)=>{
           console.log(res.data.length);
           setTableData(res.data);
          }).catch((err)=>{
            console.log(err);
          })
    }


    const deleteThisFile = (title,author,bookfile) =>{
        setspinnerLoad(true);
         const obj = {
            deleteTitle:title,
            deleteAuthor:author,
            deleteBookFile:bookfile
           
         };
         
         const data = Object.keys(obj)
           .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
           .join('&');
       
        
         const options = {
           method: 'POST',
           headers: { 'content-type': 'application/x-www-form-urlencoded' },
           data,
           url: global.config.apisend.url+'api/deleteEbookupload',
         };
         
       axios(options).then((res)=>{
         setspinnerLoad(false)
         TableDataLoader()
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
        <form onClick={SendValue}>
        <input value={ inputValue } onChange={ handleInputChange } placeholder="Subject Code"></input>
        <button>Submit</button>   
        </form>
    
      </div>

      {
        spinnerLoad ?
        <Spinner animation={"border"}  variant="primary" /> 
    :

      <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Subject Name</th>
                    <th>Year</th>
                    <th>File Name</th>
                    {
                        window.localStorage.getItem("show_delete_option") && <th>Delete</th>
                    }
                </tr>
            </thead>
            <tbody>
            {
                tableData.map((data, index)=>{
                    return(
                        <tr key={index}>
                         
                         <td>{data.title}</td>
              <td>{data.author}</td>
              <td>{data.publisher}</td>
              <td>{data.Subject}</td>
              <td>{data.Year}</td>
              <td>{data.bookfile}</td>
              {
                        window.localStorage.getItem("show_delete_option") && 
                        <td>
                            <Button variant="danger" onClick={()=>deleteThisFile(data.title,data.author,data.bookfile)}>Delete</Button>
                        </td>
                    }
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

export default ShowEbookPage;