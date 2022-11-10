import {React,useState} from "react";
import Button from 'react-bootstrap/Button';
import {Form,Alert} from 'react-bootstrap';
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";
import axios from 'axios';

function AddUser() {

  const [inputs, setInputs] = useState({
    sprno:'',
    Email:'',
    Password:'Null',
    username:'',
    department:'',
    type:'',
    designation:'',

  })
  const [usertype,setusertype]=useState("");


  const [validated, setValidated] = useState(false);
  const [alertforuser,setAlertforuser]=useState(false);
  const [varient,setVarient]=useState("");
  const [alertMessage,setalertMessage]=useState("")

  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

 

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if(inputs.Email!=null && 
      inputs.username !=null ){
     
        if(validateMountzionEmail(inputs.Email)){
          AddUserUsingApi();
          event.preventDefault();
          event.stopPropagation();
        }
        else{
          setAlertforuser(true);
          showAlertMessage("danger","Kindly,Enter Only Collage Mail Id. 😡");
          event.preventDefault();
          event.stopPropagation();
        }
    }
  };


  function showAlertMessage(messagetype,message){
    setVarient(messagetype)
    setalertMessage(message)
  }



 function validateMountzionEmail(txt){
    const checkEmail=txt.search("^[A-Za-z0-9._%+-]+@mountzion\.ac.in$");
    if(checkEmail===0){
      return true;
    }
    else{
      return false;
    }
  }




  async function  AddUserUsingApi(e){
    e.preventDefault();

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
      url: global.config.apisend.url+'api/addNewUser',
    };
    
   await axios(options).then((res)=>{
      if(res.data.message==='1'){
        setAlertforuser(true);
        showAlertMessage("success","User has been Added Successfully ✅");
      }
      else if(res.data.message==='2'){
        setAlertforuser(true);
          showAlertMessage("danger","Email is already Presented 🚫.");
      }
      else{
        setAlertforuser(true);
          showAlertMessage("danger","User was not added 🚫.");
      }
    }).catch((err)=>{
      console.log(err);
    })
  
      }
    

      const [file, setFile] = useState();
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        console.log(file);
      };


      const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

    
        try {
          await axios.post(
            global.config.apisend.url+'api/uploadStudentData',
            formData
          ).then((res)=>{
            if(res.data.code ==200){
alert("File Uploaded successfully");
            }
            else{
              alert("Not uploaded");
          
            }
       
          })
        
        } catch (ex) {
          console.log(ex.message);
        }
      };

      
    function AlertDismissibleMaterial() {
      const [show, setShow] = useState(true);
    
      if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Kindly Follow the Instruction</Alert.Heading>
            <p>
            The file name must be summa
            </p>
          </Alert>
        );
      }
      return <Button onClick={() => setShow(true)}>Show Instruction</Button>;
    }


  return (
    <div>
        <MzcetHeader/>
        <NavbarAPI/>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Add New User</h1>
    
      </div>

      {
        alertforuser && <Alert key={varient} variant={varient}>
        {alertMessage}
      </Alert>
      }
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    <AlertDismissibleMaterial/>

    <Form onSubmit={uploadFile}>
    <Form.Control type="file" onChange={saveFile} accept=".csv" required/>
    <br></br>
    <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>


    </main>
    


    </div>
   
  );
}

export default AddUser;