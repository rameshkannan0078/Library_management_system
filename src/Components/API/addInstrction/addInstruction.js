import axios from "axios";
import {React,useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row,Col} from 'react-bootstrap';
import MzcetHeader from "../homepage/ApiComponents/headermzcet";
import NavbarAPI from "../homepage/ApiComponents/navbar/navbar";


function AddInstruction() {

  const [inputs, setInputs] = useState({
    title:'',
    text:''

  })


  const [validated, setValidated] = useState(false);
  const [file, setFile] = useState();




  const changeHandle = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

 




  const  AddInstructionUsingApi =() =>{

    

    const obj = {
     type:inputs.title,
     instruction:inputs.text
    };
  
    
    const data = Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&');
  
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: global.config.apisend.url+'api/addInstruction',
    };
    
  axios(options).then((res)=>{
      if(res.data.message===1){
        alert(" Added Successfully");
      }
      else{
        alert("Instruction Not added");
      }
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
    if(inputs.text!=null && 
      inputs.title !=null ){
        AddInstructionUsingApi() 
    }
  };



  return (
    <div>
        <MzcetHeader/>
        <NavbarAPI/>

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Add Instruction</h1>
      </div>
      <Form  noValidate validated={validated} onSubmit={handleSubmit}>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Department</Form.Label>
        <Form.Select  name="title" value={inputs.title} onChange={changeHandle} >
          <option value="">Choose Any One</option>
              <option value="Add Material">Add Material</option>
              <option value="Add Subject">Add Subject</option>
              <option value="Add Ebook">Add Ebook</option>
          </Form.Select>
        </Form.Group>
      </Row>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Instruction</Form.Label>
          <Form.Control placeholder="Instruction" name="text"   value={inputs.text} onChange={changeHandle} />
        </Form.Group>
        
  

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

    </main>


    </div>
   
  );
}

export default AddInstruction;