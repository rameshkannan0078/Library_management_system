import axios from "axios";
import {React,useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {Row,Alert,Modal} from 'react-bootstrap';
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";
import fileuploadedpng from "../../Images/fileuploaded.png";
function AddMaterial() {

  const [inputs, setInputs] = useState({
    department:'',
    regulation:'',
    semester:'',
    subcode:'',
    subname:'',
    file_upload:'',
    materialtype:''

  })

  const [colorsData,setColorsData]=useState([]);
  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [subject, setSubject] = useState('Subject Name will be Displayed');
  const [fileuploadstatus,setFileuploadstatus]=useState(false);
  const [filepresentstatus,setFilepresentstatus]=useState(false);


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
 
  setInstructData(res.data.message[0][2]['instruction'])
  }).catch((err)=>{
    console.log(err);
  })
}




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
  

 



  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append('dep_type',inputs.department+inputs.regulation);
    formData.append('sub_code',inputs.subcode);    
    formData.append('semester',inputs.semester);
    formData.append('materialtype',inputs.materialtype);
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      await axios.post(
        global.config.apisend.url+'api/upload',
        formData
      ).then((res)=>{
        if(res.data.message==="1"){
setFilepresentstatus(true)
        }
        else{
          setFileuploadstatus(true);
        }
   
      })
    
    } catch (ex) {
      console.log(ex.message);
    }
  };

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
    setFileuploadstatus(false);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    }
    setValidated(true);
    if(inputs.department!=null && 
      inputs.subname !=null &&
      inputs.file_upload!=null &&
      inputs.materialtype!=null &&
      inputs.regulation !=null &&
      inputs.semester !=null &&
      inputs.subcode){
      uploadFile()
    }
  };


  function FilePresentAlert() {

    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
  
    return (
      <>  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>File Exisiting!</Modal.Title>
          </Modal.Header>
          <Modal.Body>File Name Was Already Presented . Kindly,Change that file Name.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <div>
        <MzcetHeader/>
        <NavbarAPI/>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Add Materials</h1>
      </div>
      <AlertDismissibleMaterial/>
     
      
      <Form  noValidate validated={validated} onSubmit={handleSubmit}>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Department</Form.Label>
        <Form.Select  name="department" value={inputs.department} onChange={changeHandle} >
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

      <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Semester</Form.Label>
      <Form.Select name="semester" value={inputs.semester} onChange={changeHandle} required>
          <option value="">Choose Any One</option>
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


      <Row className="mb-3">
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" onChange={saveFile} accept="application/pdf" required/>
      </Form.Group>

      </Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      {
        fileuploadstatus && 
        <Alert key={'success'} variant={'success'}>
        File Uploaded Successfully  <img src={fileuploadedpng} alt="uploaded" style={{height:"20px",width:"20px"}}></img>
       </Alert>
      }

      {
        filepresentstatus && <FilePresentAlert/>
      }
         
    </Form>

    </main>


    </div>
   
  );
}

export default AddMaterial;