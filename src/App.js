import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pdfviewer from "./Components/pdf_viewer/pdf_viewer";
import Ebookpage from "./Components/e-book/e_book_homepage";
import EbookSelector from "./Components/e-book/e-book-page/e-book-selector";
import ApiHome from "./Components/API/homepage/api";
import AddMaterial from "./Components/API/addmaterial/addmaterial";
import AddSubject from "./Components/API/addsubject/addsubject";
import EbookMainPage from "./Components/e-book/e-book-pdf/e_book_main_page";
import AdminLogin from "./Components/API/adminlogin/adminlogin";
import EbookList from "./Components/e-book/e-book-list/e-book-list";
import Library from "./Components/librabry";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";
import AddEbook from "./Components/API/addEbook/addEbook";
import ShowMaterialPage from "./Components/API/showmaterial/showmaterial";
import DeleteMaterialPage from "./Components/API/deleteMaterial/deletematerial";
import ShowEbookPage from "./Components/API/showEbook/showebook";
import AddUser from "./Components/API/User/adduser";
import ShowUserPage from "./Components/API/User/showuser";
import AddInstruction from "./Components/API/addInstrction/addInstruction";

function App() {


  return(
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<Library/>}/>
      <Route path="/ebook" exact element={
      <PrivateRoute>
      <Ebookpage/>
      </PrivateRoute>
      }/>
      <Route path="/ebookselector" exact element={
       <PrivateRoute>
        <EbookSelector/>
       </PrivateRoute>
   }/>
      <Route path="/ebookmain" exact element={
      <PrivateRoute>
    <EbookMainPage/>
     </PrivateRoute>
    }/>
      <Route path="/ebooklist" exact element={
        <PrivateRoute>
  <EbookList/>
         </PrivateRoute>
      
    }/>
      <Route path="/pdfviewer" exact element={
        <Pdfviewer/>
   


    }/>
        <Route path='/adminlogin' exact element={<AdminLogin/>}/>
      <Route path="/apihome" exact element={
      <AdminRoute>
        <ApiHome/>
      </AdminRoute>
}/>
      <Route path="/apiaddmaterial" exact element={
      
      <AdminRoute>
        <AddMaterial/>
      </AdminRoute>}/>
      <Route path="/apiaddsubject" exact element={
      <AdminRoute>
        <AddSubject/>
      </AdminRoute>}/>

      <Route path="/apiaddebook" exact element={
      <AdminRoute>
        <AddEbook/>
      </AdminRoute>}/>
      <Route path="/apishowebook" exact element={
        <ShowEbookPage/>
     }/>

      <Route path="/showmaterial" exact element={
        <ShowMaterialPage/>
     }/>
        <Route path="/deletematerial" exact element={
        <DeleteMaterialPage/>
     }/>

<Route path="/apiadduser" exact element={
        <AddUser/>
     }/>



<Route path="/apishowalluser" exact element={
        <ShowUserPage/>
     }/>



      <Route path="/addInstruction" exact element={
        <AddInstruction/>
     }/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
