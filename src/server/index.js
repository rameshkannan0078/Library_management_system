const express = require('express')
const bodyParser = require('body-parser')
const fileupload = require("express-fileupload");
const cors = require('cors')
const app = express()
const apiPort = 3001
const pool=require('./config/config')
const api=require('./components/addsubject/addsubject.js')
var http = require('http');
var httpServer = http.createServer(app);
const fs = require('fs');
app.use(cors())
app.use(fileupload())

var path = require('path');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('uploads')); 
app.use('/uploads', express.static('uploads'));

app.use('/api',api)



app.get('/', (req, res) => {
    res.send('Hello World!')
})






  app.post("/api/upload/", (req, res) => {
    const file = req.files.file;
    const filename = file.name;

    pool.query(`SELECT * FROM [materials] where pdf_file='${filename}' `,function(error,results){
      if(error){
        console.info(error)
      }
      console.info(results)
      if(results.rowsAffected[0]===1){
        res.status(200).send({
          message:"1"
        })
      }
      else{
        pool.query(`SELECT dep_code FROM [departments] WHERE dep_type='${req.body.dep_type}'`,function(error,results){
          if(error){
              console.log(error);
            }
            let res1 = JSON.parse(JSON.stringify(results.recordset));
            console.log("query response is ",res1[0]['dep_code']);
            const newpath = __dirname + "/uploads/";
        
           
            file.mv(`${newpath}${filename}`, (err) => {
              if (err) {
             
                res.status(500).send({ message: "File upload failed", code: 200 });
              }
              pool.query(`INSERT INTO [materials](dep_code, dep_type,sub_code, semester,materialtype, pdf_file) VALUES ('${res1[0]['dep_code']}','${req.body.dep_type}','${req.body.sub_code}','${req.body.semester}','${req.body.materialtype}','${filename}') `,function(err,res){
                  if(err){
                    console.log(err);
                  }
                  console.log(res);
              })
              res.status(200).send({ message: "2", code: 200 });
            });
    
    
      })
      }
    })   




  });

  app.post("/api/deleteupload/", (req, res) => {
    console.log(__dirname);
        const newpath = __dirname + "\\uploads\\";

        fs.unlink(newpath+req.body.filename, function(err) {
          if(err && err.code == 'ENOENT') {
              // file doens't exist
              console.info("File doesn't exist, won't remove it.");
              res.sendStatus(404)
          } else if (err) {
              // other errors, e.g. maybe we don't have enough permission
              console.error("Error occurred while trying to remove file");
          } else {
              console.info(`removed`);
              console.info(req.body.subcode,req.body.filename)
              pool.query(`Delete from [materials] where sub_code='${req.body.subcode}' and
                pdf_file='${req.body.filename}';`,function(error,results){
                  if(error){
                    console.log(error)
                  }
                  console.log(results)
                  res.send(results.rowsAffected)
                })
          }
      });

          // fs.unlinkSync(newpath+req.body.filename,(error)=>{
         
          //   if(error){
          //     console.log(error);
          //   }
          //   console.log("hello")
          //   pool.query(`Delete from [materials] where sub_code='${req.body.subcode}' and
          //   pdf_file='${req.body.filename}' and semester='${req.body.semester}' 
          //   and dep_type='${req.body.deptype}'`,function(error,results){
          //     if(error){
          //       console.log(error)
          //     }
          //     console.log(results)
          //   })
          // });
    

   
  });



  app.post("/api/uploadEbook/", (req, res) => {

        const newpath = __dirname + "/uploads/ebook/";
        const file = req.files.bookfile;
        const filename = file.name;
       console.log("helllllllllll")
        file.mv(`${newpath}${filename}`, (err) => {
          if (err) {
         
            res.status(500).send({ message: "File upload failed", code: 200 });
          }
          pool.query(`INSERT INTO [ebook](id,title, author,publisher,Subject,Year,bookfile) VALUES ('0','${req.body.title}','${req.body.author}','${req.body.publisher}','${req.body.Subject}','${req.body.Year}','${filename}') `,
          function(err,res){
              if(err){
                console.log(err);
              }
              console.info(res)
          })
          res.status(200).send({ message: "File Uploaded", code: 200 });
      


  })
   
  });
   
  app.post("/api/deleteEbookupload/", (req, res) => {
    console.log(__dirname);
        const newpath = __dirname + "\\uploads\\ebook\\";
console.info(newpath+req.body.deleteBookFile);
        fs.unlink(newpath+req.body.deleteBookFile, function(err) {
          if(err && err.code == 'ENOENT') {
              // file doens't exist
              console.info("File doesn't exist, won't remove it.");
              res.sendStatus(404)
          } else if (err) {
              // other errors, e.g. maybe we don't have enough permission
              console.error("Error occurred while trying to remove file");
          } else {
              console.info(`removed`);
             
              pool.query(`Delete from [ebook] where title='${req.body.deleteTitle}' and
                author='${req.body.deleteAuthor}';`,function(error,results){
                  if(error){
                    console.log(error)
                  }
                  console.log(results)
                  res.send(results.rowsAffected)
                })
          }
      });
 
  });

  app.post("/api/uploadStudentData",(req,res)=>{
    const file=req.files.file;
    const newpath = __dirname + "\\uploads\\user\\";
    const filename = file.name;
    console.log(newpath+filename);
    file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
    console.log(err);
    }
    pool.query(` BULK INSERT summaView From '${newpath+filename}'
    with(
    FORMAT = 'CSV',
    FIRSTROW=2,
    FIELDTERMINATOR= ',',
    ROWTERMINATOR = '\n',
    TABLOCK
    )
    `,
    function(err,result){
        if(err){
          console.log(err);
        }
        res.status(200).send({ message: "File Uploaded", code: 200 });
    })

    })
    })

  httpServer.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))