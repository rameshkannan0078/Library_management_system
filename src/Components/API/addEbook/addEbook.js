import axios from "axios";
import {React,useState,useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row,Alert} from 'react-bootstrap';
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";


function AddEbook() {

  const [inputs, setInputs] = useState({
    title:'',
    author:'',
    publisher:'',
    subject:'',
    year:'2019'

  })


  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState();




  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

 

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append('title',inputs.title);
    formData.append('author',inputs.author);    
    formData.append('publisher',inputs.publisher);
    formData.append('Subject',inputs.subject);
    formData.append('Year',inputs.year)
    formData.append("bookfile", file);

    try {
      await axios.post(
        global.config.apisend.url+'api/uploadEbook',
        formData
      );
      alert("File Uploaded Successfully");
    } catch (ex) {
      alert(ex)
    }
  };

 

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    }
    setValidated(true);
    if(inputs.author!=null && 
      inputs.title !=null &&
      inputs.publisher!=null &&
      inputs.year!=null &&
      inputs.subject !=null &&
      file !=null ){
      uploadFile()
    }
  };

  
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
   
    setInstructData(res.data.message[0][1]['instruction'])
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
        <h1 class="h2">Add EBOOK</h1>
      </div>
      <AlertDismissibleMaterial/>

      <Form  noValidate validated={validated} onSubmit={handleSubmit}>

    
      <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="Title" name="title"   value={inputs.title} onChange={changeHandle}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Author</Form.Label>
          <Form.Control placeholder="author" name="author"   value={inputs.author} onChange={changeHandle} />
        </Form.Group>
        
  
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Publisher</Form.Label>
          <Form.Control placeholder="Publisher" name="publisher"   value={inputs.publisher} onChange={changeHandle}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control placeholder="subject" name="subject"   value={inputs.subject} onChange={changeHandle} />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Year</Form.Label>
          <Form.Control type="number" placeholder="Year" name="year" min="1900" max="2099" step="1"   value={inputs.year} onChange={changeHandle} />
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
    </Form>

    </main>


    </div>
   
  );
}

export default AddEbook;