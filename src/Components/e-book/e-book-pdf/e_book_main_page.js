
import {Navbar,Nav,Table,Button} from 'react-bootstrap';
import React, { useEffect,useState } from "react";
import axios  from "axios";

function EbookMainPage(){

    
  const [tableData, setTableData] = useState([]);
  const [EsourceData, setEsourceData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);


  useEffect(()=>{
    TableDataLoader()
  },[])

  const TableDataLoader = () =>{
    setIsShown2(false);
    axios.get(global.config.apisend.url+'api/getallebook').then((response) => {
        setTableData(response.data);
        setIsShown(true)
      });
  }

  const LoadTheEsources = () =>{
    setIsShown(false)
    axios.get(global.config.apisend.url+'api/getallesources').then((response) => {
        setEsourceData(response.data);
        setIsShown2(true)
      });
  }

 


    return(
        <>
          <Navbar bg="dark" variant="dark" style={{ width:'100%'}}>
                <div style={{ color:'white',fontSize:'18px',padding:'10px'}}>
                Mount Zion College Of Engineering And Technology 
                </div>
        <Navbar.Toggle />
    </Navbar>
    
    <Nav variant="tabs" defaultActiveKey="/home" style={{padding:'10px'}}>
      <Nav.Item>
        <Nav.Link onClick={TableDataLoader}>E-book</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={LoadTheEsources}>E-Sources</Nav.Link>
      </Nav.Item>

    </Nav>
 
        {
            isShown && 
            <Table striped style={{ border:'4px solid black',padding:'10px'  }}>
              <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Subject</th>
              <th>Year</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
          {
                    tableData.map((data, index)=>{
                        const view=data.bookfile
                        return(
                            <tr key={index}>
              <td>{data.title}</td>
              <td>{data.author}</td>
              <td>{data.publisher}</td>
              <td>{data.Subject}</td>
              <td>{data.Year}</td>
              <td> <Button href={global.config.apisend.url+'ebook/'+view}>View Book</Button></td>
                      
                      </tr>
                      )
                  })
              }
          </tbody>
          </Table>
        }


{
            isShown2 && 
            <Table striped style={{ border:'4px solid black',padding:'10px'  }}>
              <thead>
            <tr>
              <th>#</th>
              <th>Sources</th>
              <th>Name Of Provider</th>
              <th>Access URL</th>
            </tr>
          </thead>
          <tbody>
          {
                    EsourceData.map((data, index)=>{
                        const view=data.source
                        const url=data.Access
                        return(
                            <tr key={index}>
              <td>{data.id}</td>
              <td><img style={{width:"250px",height:"100px"}} src={global.config.apisend.url+view} alt='search'/></td>
              <td>{data.Name}</td>
              <td><a href={url}>{data.Access}</a></td>
        
                      
                      </tr>
                      )
                  })
              }
          </tbody>
          </Table>
        }
    

    



            </>
    );

}

export default EbookMainPage;