
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import {Button} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import computer from '../Images/computer.png';
import civil from '../Images/civil.png';
import ece from '../Images/ece.png';
import eee from '../Images/eee.png';
import mechanical from '../Images/mechanical.png';
import syllabus from '../Images/syllabus.jpg';
import ebook from '../Images/ebook.png';
import './e_book_homepage.css';
import annauniversity from '../Images/anna.png';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import {Nav,Navbar} from 'react-bootstrap';

function Ebookpage(){


  const navigate = useNavigate();


    const sendpage = (q) =>{
      navigate('/ebookselector')
    }


    const sendme = (q) =>{
      navigate('/ebookmain');
    }


    const clearUser = () =>{
      window.localStorage.removeItem("user");
      window.localStorage.removeItem('IsAuth')
      navigate('/')
    }


    return(
        <div>




        <nav className="navbar navbar-light bg-dark">
<div className='appbar_name'>
Mount Zion College Of Engineering And Technology
</div>
</nav>

<Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" className='ms-auto'>
<Navbar.Toggle aria-controls= "navbarScroll" data-bs-target="#navbarScroll" />
<Navbar.Collapse id="navbarScroll ">
<Nav className="ms-auto">
<Nav.Link href='#ebook'>E-Book</Nav.Link>
<Nav.Link  href="#syllabus">SYLLABUS</Nav.Link>
<Nav.Link href='#questions'>PRE-YR QP</Nav.Link>
<Nav.Link href='#contact'>CONTACT US</Nav.Link>
<Button onClick={clearUser} className="btn btn-dark"  style={{ marginRight:'30px'}}>Logout</Button>
</Nav>
</Navbar.Collapse>
</Navbar>

   <Row xs={1} md={2} className="g-4">

       <Col>
          <Card>
            <Card.Img variant="top" src={ebook} />
            <Card.Body>
              <Card.Title>Digital - Book</Card.Title>
              <Card.Text>
           Sources
              </Card.Text>
              <ListGroup variant="flush">
        <ListGroup.Item onClick={()=>sendme('/2017cse')}>E-Book</ListGroup.Item>
        <ListGroup.Item onClick={()=>sendme('/2021cse')}>E-Resources</ListGroup.Item>
      </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={computer} />
            <Card.Body>
              <Card.Title>Computer Science And Engineering</Card.Title>
              <Card.Text>
              Regulations
              </Card.Text>
              <ListGroup variant="flush">
        <ListGroup.Item onClick={()=>sendpage('/2017cse')}>2017</ListGroup.Item>
        <ListGroup.Item onClick={()=>sendpage('/2021cse')}>2021</ListGroup.Item>
      </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={ece} />
            <Card.Body>
              <Card.Title>Electronics And Communication Engineering</Card.Title>
              <Card.Text>
              Regulations
              </Card.Text>
              <ListGroup variant="flush">
        <ListGroup.Item onClick={()=>sendpage('/2017ece')}>2017</ListGroup.Item>
        <ListGroup.Item onClick={()=>sendpage('/2021ece')}>2021</ListGroup.Item>
      </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={eee} />
            <Card.Body>
              <Card.Title>Electrical And Electronics Engineering</Card.Title>
              <Card.Text>
              Regulations
              </Card.Text>
              <ListGroup variant="flush">
        <ListGroup.Item onClick={()=>sendpage('/2017eee')}>2017</ListGroup.Item>
        <ListGroup.Item onClick={()=>sendpage('/2021eee')}>2021</ListGroup.Item>
      </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={mechanical} />
            <Card.Body>
              <Card.Title>Mechanical Engineering</Card.Title>
              <Card.Text>
              Regulations
              </Card.Text>
              <ListGroup variant="flush">
        <ListGroup.Item onClick={()=>sendpage('/2017mech')}>2017</ListGroup.Item>
        <ListGroup.Item onClick={()=>sendpage('/2021mech')}>2021</ListGroup.Item>
      </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={civil} />
            <Card.Body>
              <Card.Title>Civil Engineering</Card.Title>
              <Card.Text>
              Regulations
              </Card.Text>
              <ListGroup variant="flush">
        <ListGroup.Item onClick={()=>sendpage('/2017civil')}>2017</ListGroup.Item>
        <ListGroup.Item onClick={()=>sendpage('/2021civil')}>2021</ListGroup.Item>
      </ListGroup>
            </Card.Body>
          </Card>
        </Col>
    </Row>

    <hr className="featurette-divider"/>

    <div className="row featurette" id="syllabus">
      <div className="col-md-7">
        <h2 className="featurette-heading fw-normal lh-1" style={{ padding:"20px"}}>SYLLABUS</h2>
        <p className="lead" style={{ padding:"20px"}}>
          Regulation - 2017 <br></br>

          Regulation - 2021 <br></br>

            </p>
      </div>
      <div className="col-md-5">
      <img  src={syllabus} style={{ width:"510px",height:"340px"}} alt="syllabus"></img>

      </div>
    </div>
    <hr className="featurette-divider"/>

    
    <div className="row featurette">
      <div className="col-md-7" id="questions">
        <h2 className="featurette-heading fw-normal lh-1" style={{ padding:"20px"}}>Previous Year Questions</h2>
        <p className="lead" style={{ padding:"20px"}}>
          Regulation - 2017 <br></br>

          Regulation - 2021 <br></br>

            </p>
      </div>
      <div className="col-md-5">
      <img src={annauniversity} alt="syllabus" style={{ width:"510px",height:"340px"}}></img>

      </div>
    </div>
    <hr className="featurette-divider"/>
    <footer class="container" id="contact">
    <p class="float-end"><a href="#top">Back to top</a></p>
    <p>© 2017–2022 Mount Zion College Of Engineering And Technology<br>
</br>
<a href="#summa1">Privacy</a><br>
</br><a href="#summa2">Terms</a></p>
  </footer>
   
</div>
    );
}

export default Ebookpage;