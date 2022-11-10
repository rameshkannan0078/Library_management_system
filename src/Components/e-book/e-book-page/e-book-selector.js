import {React,useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardFooter } from 'mdb-react-ui-kit';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function EbookSelector(){

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    department:'',
    regulation:'',
    semester:'',
    subcode:'',
    subname:'',
    materialtype:''

  })

  const [colorsData,setColorsData]=useState([]);
  const [validated, setValidated] = useState(false);
  const [subject, setSubject] = useState('Subject Name will be Displayed');


  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    checker();
     // eslint-disable-next-line react-hooks/exhaustive-deps
 },[inputs.semester])

 useEffect(()=>{
  SubjectNameGeter();
   // eslint-disable-next-line react-hooks/exhaustive-deps
 },[inputs.subcode])

  const checker =  (e) =>{
    const obj = {
      dep_code:inputs.department+inputs.regulation,
      sem_code:inputs.semester,
    };
    
    const data = Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');

   
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: global.config.apisend.url+'api/subjectlist',
    };
    
 axios(options).then((res)=>{
     console.log(res.data.length);
     setColorsData(res.data);
     console.log("This is "+res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }

  const SubjectNameGeter = async (e)=>{

    const obj = {
      subject_code:inputs.subcode
    };
    
    const data = Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');

   
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: global.config.apisend.url+'api/subjectNamelist',
    };
    
await  axios(options).then((res)=>{
     setSubject(res.data[0]['subject_name']);
    }).catch((err)=>{
      console.log(err);
    })

  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  
    setValidated(true);
    window.localStorage.setItem('subject_code',inputs.subcode);
    window.localStorage.setItem('semester',inputs.semester);
    window.localStorage.setItem('regulation',inputs.department+inputs.regulation);
    window.localStorage.setItem('department',inputs.department);
      window.localStorage.setItem('material_type',inputs.materialtype); 
    navigate('/ebooklist')
  
    pagesender();
  
  };


  const pagesender = ( e) =>{
    if(validated){
      window.localStorage.setItem('subject_code',inputs.subcode);
      window.localStorage.setItem('material_type',inputs.materialtype); 
      navigate('/ebooklist')
    }
   
  }


  const Movebackpage = (e) =>{
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
            <Button style={{marginRight:'10px'}} onClick={Movebackpage}>Go Back</Button>
        </Navbar.Collapse>
    </Navbar>

  <MDBCard  style={{ maxWidth: '35rem',margin:'auto',marginTop:'30px' }}>
  <MDBCardHeader style={{ fontSize: '25px' }}>Kindly Fill Details</MDBCardHeader>
      <MDBCardBody>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Department</Form.Label>
        <Form.Select  name="department" value={inputs.department} onChange={changeHandle} required>
          <option value="">Choose Any One</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label>Regulations</Form.Label>
        <Form.Select name="regulation" value={inputs.regulation}  onChange={changeHandle} required>
               <option value="">Choose Any One</option>
              <option  value="2017" >2017</option>
              <option   value="2021">2021</option>
          </Form.Select >
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" >
      <Form.Label>Semester</Form.Label>
      <Form.Select name="semester" value={inputs.semester} onChange={changeHandle} required >
              <option value="">Select Any One</option>
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

      
      <Form.Group className="mb-3" >
      <Form.Label>Subject Code</Form.Label>
      <Form.Select name="subcode" value={inputs.subcode} onChange={changeHandle} required>
          <option value="">Choose Any One</option>
          {
colorsData &&
colorsData?.map((obj,i) => {
     return <option team={obj.subject_code} key={i}>{obj.subject_code}</option>
})  
}
          </Form.Select>
      </Form.Group>
     

      <Form.Group className="mb-3">
        <Form.Label>Subject Name</Form.Label>
        <Form.Control value={subject} disabled />
      </Form.Group>


      <Form.Group className="mb-3">
      <Form.Label>Material Type</Form.Label>
      <Form.Select name="materialtype" value={inputs.materialtype} onChange={changeHandle} required>
          <option value="">Choose Any One</option>
              <option value="books">Books</option>
              <option value="ppt">PowerPointPresentation - PPT</option>
              <option value="questions">Questions</option>
              <option value="syllabus">Syllabus</option>
              <option value="materials">Materials</option>
          </Form.Select>
      </Form.Group>

      <Button variant="primary" style={{ width:'150px'}} type="submit" onClick={pagesender}>
        Submit
      </Button>
    </Form>
      </MDBCardBody>
      <MDBCardFooter className='text-muted'></MDBCardFooter>
    </MDBCard>

      </div>
    
      


    );
}

export default EbookSelector;