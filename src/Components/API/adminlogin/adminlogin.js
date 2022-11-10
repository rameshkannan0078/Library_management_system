import {React,useEffect,useState} from "react";
import {useNavigate} from'react-router-dom';
import axios from 'axios';
import mzceticon from '../../Images/mzcet.png';
import { Alert,Navbar} from 'react-bootstrap';
async function loginUser(credentials) {
  return fetch(global.config.apisend.url+'api/adminlogin', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body:credentials
  })
    .then(data => data.json())
 }



function AdminLogin(){


  const navigate = useNavigate();

  useEffect(() => {
    let isAuth = window.localStorage.getItem('admin');
    if(isAuth && isAuth !== null) {
        navigate("/apihome");
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

    const [inputs, setInputs] = useState({
        email: "",
        password:""
      })
     
      const [MessageSend,SetMessageSend]=useState(false);
    
      const changeHandle = e => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value
        })
      }
    
    
    
    const CreatePost =async (e) =>  {


   

    const obj = {
      user: inputs.email,
      pass: inputs.password
    };
  
    const data = Object.keys(obj)
      .map((key, index) => `${key}=${encodeURIComponent(obj[key])}`)
      .join('&')
  
    e.preventDefault();
    const response = await loginUser(data);
    console.log(response)
    if (response[0]['user_type']===1) {
      window.localStorage.setItem('admin',inputs.email)
      navigate('/apihome');
    }
    else if (response[0]['user_type']===2) {
      window.localStorage.setItem('admin',inputs.email)
      window.localStorage.setItem('show_delete_option','2')
      navigate('/apihome');
    }
     else {
      alert("Invalid Username /Password , Kindly Ensure that details");
      navigate("/");
    }
  
  
      
    }

    
  useEffect(()=>{
    let isAuthAvilable = localStorage.getItem('admin');
    if(isAuthAvilable && isAuthAvilable !== null) {
        navigate("/apihome");
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const [FailUser,setFailUser]=useState(false);

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
          
            const response = await staffUser(data);
            console.log(response)
            if (response===1) {
            
              const randompassword=Math.floor(100000 + Math.random() * 900000);

              ResetPasswordForStaff(userName,randompassword);

              let formData = new FormData();
              formData.append('email',userName);
              formData.append('password',randompassword);
      
          axios({
                  method: 'post',
                  url: 'http://103.207.1.92:5001/index.php',
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


  async function staffUser(credentials) {
    return fetch(global.config.apisend.url+'api/checkstaff', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body:credentials
    })
      .then(data => data.json())
   }

   const ResetPasswordForStaff = async (email1,password1) =>{
    
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


  
    

  const variant='success';

  useEffect(() => {
    const timer = setTimeout(() => {
      SetMessageSend(false);
      setFailUser(false);
    }, 3000);
    
    
    return () => clearTimeout(timer);
  }, []);    

    return (
      <div>

<Navbar bg="dark" variant="dark">
                <div style={{ color:'white',fontSize:'18px',padding:'10px'}}>
                Mount Zion College Of Engineering And Technology 
                </div>
    </Navbar>
    {
        MessageSend &&   <Alert key={variant} variant={variant}>
        Reset Email Has Been Send Successfully ! &#128524;
      </Alert>
       }

{
        FailUser &&   <Alert key="danger" variant="danger">
        You Are Not A Valid User &#x26A0;
      </Alert>
       }

    <div className="d-flex align-items-center justify-content-center text-center not-found-container">
    <form className="p-4 p-md-5 border rounded-3 bg-light">
            
            <img alt="mzcet" src={mzceticon} style={{ width:"200px",height:"150px",margin:'auto'}}></img>
          
      <div className="form-floating mb-3">
         
        <input type="email" className="form-control" id="floatingInput" name="email" placeholder="name@example.com"  
      value={inputs.email} onChange={changeHandle}  />
        <label >Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input type="password" className="form-control" name="password" id="floatingPassword" placeholder="Password"  
value={inputs.password} onChange={changeHandle} />
        <label >Password</label>
      </div>
    
      <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={CreatePost}>Login</button>
      <hr className="my-4"></hr>
      <button className="w-100 btn btn-lg btn-secondary"  onClick={ForgetPassword}>Forget Password</button>
      
      <small className="text-muted">By clicking Log in, you agree to the terms of use.</small>
    </form>
    </div>
       
      </div>
   
);


}

export default AdminLogin;