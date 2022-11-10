import React, { useEffect,useState } from "react";
import axios  from "axios";
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";
import {Spinner,Button,Table,Modal,Form,Alert} from 'react-bootstrap';
import { CSVLink, CSVDownload } from "react-csv";


function ShowUserPage(){


    
  const [spinnerLoad,setspinnerLoad]=useState(true);
    const [tableData, setTableData] = useState([]);
    useEffect(()=>{
      TableDataLoader()
    },[])
  
    const TableDataLoader = () =>{
      axios.get(global.config.apisend.url+'api/showalluserdata').then((response) => {
        setTableData(response.data);
        setspinnerLoad(false)
      });
    }

    const [inputValue, setInputValue] = React.useState("");

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }





    const deleteThisUser = (sprno1,email1) =>{
      const obj = {
        sprno:sprno1,
          email:email1
        };
        
        const data = Object.keys(obj)
          .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
          .join('&');
    
       
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data,
          url: global.config.apisend.url+'api/deletetheuser',
        };
        
     axios(options).then((res)=>{
         console.log(res.data.length);
         alert("Data Deleted Successfully")
         TableDataLoader()
        }).catch((err)=>{
          alert(err);
          console.log(err);
        })
  }

    
return(
    <div>
        <MzcetHeader/>
<NavbarAPI/>
<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">All The Users Details</h1>
        <CSVLink data={tableData}>Download me</CSVLink>;
        <form>
        <input value={ inputValue } onChange={ handleInputChange } placeholder="Email id"></input>
        <button type="submit">Submit</button>   
        </form>
    
      </div>

      {
        spinnerLoad ?
        <Spinner animation={"border"}  variant="primary" /> 
    :

      <Table className="table" >
            <thead>
                <tr>
                    <th>Spr Number</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Username</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th>Designation</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                tableData.filter((data)=>{
                    if(inputValue===""){
                        return data
                    }
                    else if(data.email.toLowerCase().includes(inputValue.toLowerCase())){
                        return data
                    }

                })
                
                .map((data, index)=>{
                    return(
                        <tr>
                         
                            <td>{data.spr_no}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                            <td>{data.username}</td>
                            <td>{data.department}</td>
                            <td>{data.type}</td>
                            <td>{data.designation}</td>
                            
                            <td key={data.spr_no}><EditableWindow
                       spr_no1={data.spr_no}
                       email1={data.email}
                       password1={data.password}
                       username1={data.username}
                       department1={data.department}
                       type1={data.type}
                       designation1={data.designation}
                       usertype1={data.user_type}
                            /></td>
                            <td> <Button variant="danger" onClick={()=>deleteThisUser(data.spr_no,data.email)}>Delete</Button></td>
       
                      
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
}
    </main>

    </div>
);
}


function EditableWindow({spr_no1,email1,password1,username1,department1,type1,designation1,usertype1}) {

  

    const changeHandle = (e) => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value
        })
      
      }

    const [inputs, setInputs] = useState({
        sprno:spr_no1,
        Email:email1,
        Password:password1,
        username:username1,
        department:department1,
        type:type1,
        designation:designation1,

    
      })

    const[usertype,setusertype]=useState(usertype1)
    
      const [validated, setValidated] = useState(false);
      const [alertforuser,setAlertforuser]=useState(false);
      const [varient,setVarient]=useState("");
      const [alertMessage,setalertMessage]=useState("")



    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
        if(inputs.Email!=null && 
          inputs.username !=null ){
            if(validateMountzionEmail(inputs.Email)){
         updateUserDetails();
              }
              else{
                setAlertforuser(true);
                showAlertMessage("danger","Kindly,Enter Only Collage Mail Id. 😡");
               
              }
        }
      };

      function validateMountzionEmail(txt){
        const checkEmail=txt.search("^[A-Za-z0-9._%+-]+@mountzion\.ac.in$");
        if(checkEmail===0){
          return true;
        }
        else{
          return false;
        }
      }

      
function showAlertMessage(messagetype,message){
setVarient(messagetype)
setalertMessage(message)
}


const  updateUserDetails = async () =>{


    if(inputs.designation === "Student"){
      setusertype(0)
    }
    else{
      setusertype(1)
    }

    const obj = {
      email: inputs.Email,
      password: inputs.Password,
      sprno:inputs.sprno,
      username:inputs.username,
      department:inputs.department,
      type:inputs.type,
      designation:inputs.designation,
      usertype:usertype
    };
  
    
    const data = Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: global.config.apisend.url+'api/updatetheUser',
    };
    
   await axios(options).then((res)=>{
    console.log(res.data)
      if(res.data.message==="1"){
        setAlertforuser(true);
        showAlertMessage("success","User has been Edited Successfully ✅");
      }
      else{
        setAlertforuser(true);
          showAlertMessage("danger","User was not Edited🚫.");
      }
    }).catch((err)=>{
      console.log(err);
    })
  
      }
    


    
  
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
     Edit
        </Button>

        <Modal
         size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit The User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
            <Form  noValidate validated={validated} onSubmit={handleSubmit}>


<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Spr Number</Form.Label>
<Form.Control placeholder="sprno" name="sprno"  type={"number"} value={inputs.sprno} onChange={changeHandle} required  />
</Form.Group>



<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Email</Form.Label>
<Form.Control placeholder="Email" name="Email" type={"email"}  value={inputs.Email} onChange={changeHandle} required  />
</Form.Group>


<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Password</Form.Label>
<Form.Control value={"Reset the password using reset password"} disabled />
</Form.Group>

<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Username</Form.Label>
<Form.Control placeholder="username" name="username" type={"text"}  value={inputs.username} onChange={changeHandle} required />
</Form.Group>

<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Department</Form.Label>
<Form.Select  name="department" value={inputs.department} onChange={changeHandle} required  >
<option value="">Choose Any One</option>
    <option value="CSE">CSE</option>
    <option value="ECE">ECE</option>
    <option value="EEE">EEE</option>
    <option value="MECH">MECH</option>
    <option value="CIVIL">CIVIL</option>
</Form.Select>
</Form.Group>

<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Type</Form.Label>
<Form.Select  name="type" value={inputs.type} onChange={changeHandle} required  >
<option value="">Choose Any One</option>
    <option value="Staff">Staff </option>
    <option value="Student">Student</option>
</Form.Select>
</Form.Group>

<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>Designation</Form.Label>
<Form.Select  name="designation" value={inputs.designation} onChange={changeHandle} required  >
<option value="">Choose Any One</option>
    <option value="Assistant Professor">Assistant Professor</option>
    <option value="Student">Student</option>
</Form.Select>
</Form.Group>
<br></br>

<Form.Group className="mb-3" controlId="formGridAddress2">
<Form.Label>User Type</Form.Label>
<Form.Control value={usertype1} disabled />
</Form.Group>
<br></br>

<Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">Update</Button>

            {
    alertforuser && <Alert key={varient} variant={varient}>
    {alertMessage}
  </Alert>
  }
          </Modal.Footer>
</Form>


          </Modal.Body>
       
        </Modal>
      </>
    );
  }


export default ShowUserPage;