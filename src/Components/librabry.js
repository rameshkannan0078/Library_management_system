
import library from './Images/library.jpg';
import CountUp from 'react-countup';
import {React,useEffect,useState} from "react";
import {Navbar,Button,Alert} from 'react-bootstrap';
import library2 from './Images/library2.jpg';
import library3 from './Images/library3.jpg';
import { useNavigate} from 'react-router';
import './homepage/homepage.css'
import axios from 'axios';

async function loginUser(credentials) {
    return fetch(global.config.apisend.url+'api/allUsers', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body:credentials
    })
      .then(data => data.json())
   }
  

function Library(){

  const navigate = useNavigate();
const [inputs, setInputs] = useState({
    email: "",
    password:""
  })

  useEffect(() => {
    let isAuth = window.localStorage.getItem('user');
    if(isAuth && isAuth !== null) {
        navigate("/ebook");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
 

  const changeHandle = e => {

    e.preventDefault();  

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }


  const [MessageSend,SetMessageSend]=useState(false);
    
  const [FailUser,setFailUser]=useState(false);

const CreatePost = async (e) =>  {

  const obj = {
    user: inputs.email,
    pass: inputs.password
  };

  const data = Object.keys(obj)
    .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')

  e.preventDefault();
  const response = await loginUser(data);
  if (response===1) {
    window.localStorage.setItem("user",inputs.email)
    navigate('/ebook')
  } else {
    alert("Invalid Username /Password , Kindly Ensure that details");
    navigate("/");
  }

  
}



const adminlogin = (e) =>{
  navigate('/adminlogin');
}

const ForgetPassword = async (e) =>{
   
  e.preventDefault();
  var userName = prompt('Please, Enter Your Email');
  if( userName && userName !== null){
    if (userName.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) !== -1){

      const obj = {
        user: userName,
      };
    
      const data = Object.keys(obj)
        .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
        .join('&')
    
      const response = await AllUser(data);
      console.log(response)
      if (response===1) {
      
        const randompassword=Math.floor(100000 + Math.random() * 900000);

        ResetPasswordForAll(userName,randompassword);

        let formData = new FormData();
        formData.append('email',userName);
        formData.append('password',randompassword);

    axios({
            method: 'post',
            url: '',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(data => {
        if(data.status===200){
         SetMessageSend(true)
        }
      }).catch(err => {
        alert(err)
      });
       
      } else {
        setFailUser(true)
      }

    }
    else{
      alert("Please , Enter the Valid Email Address!")
    }
    
  }

  else{
    alert("Input Field is not Empty")
  }


}

const ResetPasswordForAll = async (email1,password1) =>{
    
  const obj = {
    user: email1,
    pass:password1
  };

  const data = Object.keys(obj)
    .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')

  await fetch(global.config.apisend.url+'api/updatestaffpassword', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body:data
})
  .then(data => data.json());

 }

 async function AllUser(credentials) {
  return fetch(global.config.apisend.url+'api/passwordchange', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body:credentials
  })
    .then(data => data.json())
 }





    return(
        <div>
         <Navbar bg="dark" variant="dark">
                <div style={{ color:'white',fontSize:'18px',padding:'10px'}}>
                Mount Zion College Of Engineering And Technology 
                </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Button style={{marginRight:'10px'}} onClick={adminlogin}>Admin Login</Button>
        </Navbar.Collapse>
    </Navbar>
    {
      MessageSend &&  <Alert key={'success'} variant={'success'}>
      Reset Email Has Been Send Successfully ! &#128524;
    </Alert>
    }

{
      FailUser &&  <Alert key={'danger'} variant={'danger'}>
      User details are not Avilabale
    </Alert>
    }

<div style={{ backgroundImage:`linear-gradient(to top, #3204fdba, #9907facc), url(${library})  no-repeat top center`,backgroundSize:'cover'}}>
<div className="container col-xl-10 col-xxl-8 px-4 py-5">
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-lg-7 text-center text-lg-start">
        <h1 className="display-4 fw-bold lh-1 mb-3">Welcome To MZCET! <br></br>
        Totally <CountUp end={36000} duration={5} /> Books
        </h1>
      </div>
      <div className="col-md-10 mx-auto col-lg-5">
        <form className="p-4 p-md-5 border rounded-3 bg-light" onSubmit={CreatePost}>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com"  
          value={inputs.email} onChange={changeHandle} required />
            <label >Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" name="password" id="floatingPassword" placeholder="Password"  
  value={inputs.password} onChange={changeHandle} required/>
            <label >Password</label>
          </div>
        
          <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
          <hr className="my-4"></hr>
          <button className="w-100 btn btn-lg btn-danger" onClick={ForgetPassword} >Forget Password</button>
          <br></br>

          <small className="text-muted">By clicking Log in, you agree to the terms of use.</small>

         
        </form>
   
      </div>
    </div>
  </div>
</div>

<div className="container marketing">
  
    <hr className="featurette-divider"/>

    <div className="row featurette">
      <div className="col-md-7">
        <h2 className="featurette-heading fw-normal lh-1">First featurette heading. <span className="text-muted">It’ll blow your mind.</span></h2>
        <p className="lead"> Totally <CountUp end={5000} duration={5} /> Books</p>
      </div>
      <div className="col-md-5">
      <img src={library} alt='library'></img>
      </div>
    </div>

    <hr className="featurette-divider"/>

    <div className="row featurette">
      <div className="col-md-7 order-md-2">
        <h2 className="featurette-heading fw-normal lh-1">Oh yeah, it’s that good. <span className="text-muted">See for yourself.</span></h2>
        <p className="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
      </div>
      <div className="col-md-5 order-md-1">
         <img src={library2} alt='library'></img>

      </div>
    </div>

    <hr className="featurette-divider"/>

    <div className="row featurette">
      <div className="col-md-7">
        <h2 className="featurette-heading fw-normal lh-1">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
        <p className="lead">And yes, this is the last block of representative placeholder content. Again, not really intended to be actually read, simply here to give you a better view of what this would look like with some actual content. Your content.</p>
      </div>
      <div className="col-md-5">
      <img src={library3} alt='library'></img>

      </div>
    </div>

    <hr className="featurette-divider"/>

  </div>

<div>
  
</div>
        </div>
    );
}

export default Library;
