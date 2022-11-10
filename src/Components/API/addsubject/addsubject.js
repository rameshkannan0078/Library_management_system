
import {React,useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {Row,Alert} from 'react-bootstrap';
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";
import axios from "axios";
import '../../global/apiurl';

function AddSubject() {

    
const [inputs, setInputs] = useState({
    department:'',
    regulation:'',
    semester:'',
    subcode:'',
    subname:''

  })
 

  const changeHandle = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


 const  AddSubjectUsingApi = async (event) =>{

  event.preventDefault();

  const obj = {
    department:inputs.department,
    regulation:inputs.regulation,
    semester:inputs.semester,
    subcode:inputs.subcode,
    subname:inputs.subname
  };

  
  const data = Object.keys(obj)
    .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&');

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data,
    url: global.config.apisend.url+'api/addsubject',
  };
  
 await axios(options).then((res)=>{
    if(res.data.message===1){
      alert("Subject Added Successfully");
    }
    else{
      alert("Already subject Present");
    }
  }).catch((err)=>{
    console.log(err);
  })



    }


    useEffect (()=>{
      InstrcutionFinder();
    });
    const [instructData,setInstructData]=useState("");
    const InstrcutionFinder =()=>{
          
      const options = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: global.config.apisend.url+'api/getInstruction',
      };
      
    axios(options).then((res)=>{
     
      setInstructData(res.data.message[0][0]['instruction'])
      }).catch((err)=>{
        console.log(err);
      })
    }

    function AlertDismissibleMaterial() {
      const [show, setShow] = useState(true);
    
      if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Kindly Follow the Instruction</Alert.Heading>
            <p>
              {
                instructData
              }
         
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
          <h1 class="h2">Add Subjects</h1>
        </div>
        <AlertDismissibleMaterial/>
        <Form onSubmit={AddSubjectUsingApi}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Department</Form.Label>
            <Form.Select  name="department" value={inputs.department} onChange={changeHandle} >
            <option value="Choose anyone">Choose Any One</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </Form.Select>
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Regulation</Form.Label>
            <Form.Select name="regulation" value={inputs.regulation}  onChange={changeHandle} >
            <option value="Choose anyone">Choose Any One</option>
              <option  value="2017" >2017</option>
              <option   value="2021">2021</option>
            </Form.Select>
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Semester</Form.Label>
            <Form.Select name="semester" value={inputs.semester} onChange={changeHandle} >
            <option value="Choose anyone">Choose Any One</option>
              <option value="1">1 Semester</option>
              <option value="2">2 Semester</option>
              <option value="3">3 Semester</option>
              <option value="4">4 Semester</option>
              <option value="5">5 Semester</option>
              <option value="6">6 Semester</option>
              <option value="7">7 Semester</option>
              <option value="8">8 Semester</option>
            </Form.Select>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Subject Code</Form.Label>
          <Form.Control placeholder="subject_code" name="subcode"   value={inputs.subcode} onChange={changeHandle}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control placeholder="subject_Name" name="subname"   value={inputs.subname} onChange={changeHandle} />
        </Form.Group>
  
  
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h1>This is :{inputs.department+inputs.regulation}</h1>
      </main>
    
  
      </div>
     
    );
  }
  
  export default AddSubject;