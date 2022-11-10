
const express=require('express')
let router=express.Router();
const pool=require('../../config/config');
var cors = require('cors')



router.use(cors())





router.use(function(req,res,next){
    console.log(req.url,"@",Date.now());
    next();
})



router.route('/allUsers').post((req, res) => {
  var user_name = req.body.user;
  var password = req.body.pass;
  pool.query(`select email,password from [user] where email='${user_name}' and password='${password}'`, function(error, results){
    if(error){
      console.log(error);
    }
    console.log("query response is ", results.rowsAffected);    
  
    
    if(results.rowsAffected[0] >= 1)
    {
      console.log("Response Has Been Sent")
      res.status(200).send("1")
    }
    else{
     res.status(200).send("0")
    }
    
  })
})



router.route('/addsubject').post((req, res) => {
    pool.query(`SELECT * from subjects where dep_type='${req.body.department+req.body.regulation}' and semester='${req.body.semester}' and subject_code='${req.body.subcode}'`,
    function(error,results){
      if(error){
        console.log(errors)
      }
      console.log(results);
      if(results.rowsAffected[0] == 1){
        console.log("2")
        res.send("2")
      }
      else{
        pool.query(`SELECT dep_code FROM departments WHERE dep_type='${req.body.department+req.body.regulation}';`,function(error,results){
          console.log(results);
            if(error){
                console.log(error);
              }
              let res1 = JSON.parse(JSON.stringify(results.recordset));
              console.log("query response is ",res1[0]);
              pool.query(`INSERT INTO subjects (dep_code,dep_type, semester, subject_code, subject_name)
        VALUES ('${res1[0]['dep_code']}', '${req.body.department+req.body.regulation}', '${req.body.semester}', '${req.body.subcode}', '${req.body.subname}');`,
         function(error, results){
          if(error){
            console.log(error);
          }
          if(results.rowsAffected[0] >= 1)
          {
            res.status(200).send({
              message:results.rowsAffected[0]
            });
          }
          else{
            res.status(200).send({
              message:0
            })
          }
          
        
        
        })
    
        })
      }
    })


    
  })





  router.route('/subjectlist').post((req,res)=>{
    console.log(req.body.dep_code);
    try{
      pool.query(`Select subject_code from subjects where dep_type='${req.body.dep_code}' and semester='${req.body.sem_code}'`,
      function(error,output){
        if(error){
          console.log(error);
        }
        res.send(output.recordset);
        console.log("query is " +output);
      })
    }
    catch(ex){
res.send(ex)
    }
  })





  router.route('/subjectNamelist').post((req,res)=>{
    console.log(req.body.subject_code);
    pool.query(`Select subject_name from subjects where subject_code='${req.body.subject_code}'`,
    function(error,output){
      if(error){
        console.log(error);
      }
      res.status(200).send(
        output.recordset
      );
      console.log("query is " +output);
    })
  })

  router.route('/booklist').post((req,res)=>{
    pool.query(`Select pdf_file from materials where sub_code='${req.body.subject_code}' and materialtype='${req.body.materialtype}'`,
    function(error,output){
      if(error){
        console.log(error);
      }
      res.status(200).send(
        output.recordset
      );
      console.log("query is " +output);
    }
    )

  })



  router.route('/addreport').post((req, res) => {
    console.log(req.body.email)
    pool.query(`SELECT username,type,designation FROM [Library].[dbo].[user] WHERE email='${req.body.email}';`,
    function(error,results){
      if(error){
          console.log(error);
        }
        let res1 = JSON.parse(JSON.stringify(results.recordset));
        const username=res1[0]['username'];
        const type=res1[0]['type'];
        const designation=res1[0]['designation'];
   
        const sql=` INSERT INTO report(username, type, department, designation, materialtype, materialname, timein, timeout) VALUES ('${username}','${type}','${req.body.department}','${designation}','${req.body.material_type}','${req.body.pdf_name}','${req.body.start_time}','${req.body.end_time}');
        SELECT SCOPE_IDENTITY() AS ID;`
        pool.query(sql,
   function(error, results){
    if(error){
      console.log(error);
    }
  
    console.log("id ",results.recordset[0]['ID']);
    if(results.rowsAffected[0] >= 1)
    {
      res.status(200).send({
        message:results.recordset[0]['ID'],
      });
    }
    else{
      res.status(200).send({
        message:"0"
      })
    }
    
  })



  })



    
  })


  router.route('/updatereport').post((req, res) => {

  const hello=req.body.end_time
    const sql=`  UPDATE report
    SET timeout='${req.body.end_time}'
    WHERE id='${req.body.id}';`
          pool.query(sql,
     function(error, results){
      if(error){
        console.log(error);
      }
      console.log("query response is ", hello );
        res.status(200).send({
          message:'1',
        });
      
    
      
    })


    
  })

  router.route('/getreport').get((req, res) => {

      const sql=`Select * from [report] ORDER BY timein`
            pool.query(sql,
       function(error, results){
        if(error){
          console.log(error);
        }
          res.send(results.recordset);        
      })
  
  
      
    })

    
  router.route('/getmaterials').get((req, res) => {

    try{
    const sql=`Select * from [materials]`
          pool.query(sql,
     function(error, results){
      if(error){
        console.log(error);
      }
        res.send(results.recordset);
      
    })


  }
  catch(ex){
    res.send(ex);
  }
  })

 

    
  router.route('/getallebook').get((req, res) => {

    const sql=`Select * from ebook`
          pool.query(sql,
     function(error, results){
      if(error){
        console.log(error);
      }
        res.send(results.recordset);
      
    
      
    })


    
  })

  router.route('/ebooklistsearch').post((req, res) => {
    const sql=`Select * from ebook where title like '${req.body.title}%';`
          pool.query(sql,
     function(error, results){
      if(error){
        console.log(error);
      }
      console.info(results.recordset)
      
    res.send(results.recordset)
      
    })


    
  })


  
  
      
  router.route('/getallesources').get((req, res) => {

    const sql=`Select * from esources`
          pool.query(sql,
     function(error, results){
      if(error){
        console.log(error);
      }
        res.send(results.recordset);
      
    
      
    })


    
  })


  router.post('/adminlogin', (req, res) => {
  var user_name = req.body.user;
  var password = req.body.pass;
  pool.query(`select * from [Library].[dbo].[user] where email='${user_name}' and password='${password}'`, function(error, results){
    if(error){
      console.log(error);
    }
    console.log("query response is ", results);
    if(results.rowsAffected[0] ==1)
    {
      res.status(200).send(results.recordset);
    }
    else{
      res.status(200).send(results.recordset)
    }
    
  })
})

router.post('/checkstaff',(req,res)=>{
  var user_name = req.body.user;
  pool.query(`select * from [Library].[dbo].[user] where email='${user_name}' and (user_type='1' or user_type='2') ;`, function(error, results){
    if(error){
      console.log(error);
    }
    console.log("query response is ", results);
    if(results.rowsAffected[0] ==1)
    {
      res.status(200).send("1");
    }
    else{
      res.status(200).send('0')
    }
    
  })
})

router.post('/passwordchange',(req,res)=>{
  var user_name = req.body.user;
  pool.query(`select * from [Library].[dbo].[user] where email='${user_name}';`, function(error, results){
    if(error){
      console.log(error);
    }
    console.log("query response is ", results);
    if(results.rowsAffected[0] ==1)
    {
      res.status(200).send("1");
    }
    else{
      res.status(200).send('0')
    }
    
  })
})


router.post('/updatestaffpassword',(req,res)=>{
  var user_name = req.body.user;
  var password=req.body.pass;
  pool.query(`UPDATE [dbo].[user]
  SET password='${password}'
WHERE email='${user_name}';`, function(error, results){
    if(error){
      console.log(error);
    }
    console.log("query response is ", results);
    if(results.rowsAffected[0] ==1)
    {
      res.status(200).send("1");
    }
    else{
      res.status(200).send('0')
    }
    
  })
})




router.route('/addNewUser').post((req,res)=>{
 const hello=req.body.sprno
 console.info(hello)
 
 pool.query(`Select * from [user] where email='${req.body.email}'`,function(error,results){
  if(error){
    console.info(error)
  }
  if(results.rowsAffected[0]==1){
    res.status(200).send({
      message:"2"
    })
  }
  else{
    pool.query(`Insert into [user] (spr_no,email,password,username,department,type,designation,user_type)
    Values ('${req.body.sprno}','${req.body.email}','${req.body.password}',
    '${req.body.username}','${req.body.department}','${req.body.type}','${req.body.designation}','${req.body.usertype}');  
    `,function(error,results){
      if(error){
        console.info(error)
      }
  console.info(results);
  if(results.rowsAffected[0]===1){
  res.status(200).send({
    message:"1"
  });
  }
  else{
    res.status(200).send(
      {
        message:"0"
      })
  }
  
    })
  }
 })


})



router.route('/showalluserdata').get((req, res) => {

  const sql=`Select * from [user]`
        pool.query(sql,
   function(error, results){
    if(error){
      console.log(error);
    }
      res.send(results.recordset);
    
  
    
  })


  
})



router.route('/updatetheUser').post((req,res)=>{
  const hello=req.body.email
  console.info(hello)

  const sql=`
  UPDATE [dbo].[user] SET
   [email]='${req.body.email}',
   [password]='${req.body.password}',
   [username]='${req.body.username}',
   [department]='${req.body.department}',
   [type]='${req.body.type}',
   [designation]='${req.body.designation}',
   [user_type]=${req.body.usertype}
  where [spr_no]='${req.body.sprno}';  
  `
   pool.query(sql,function(error,results){
     if(error)
     {
       console.info(error)
     }
 console.info("This is updated User " + results.rowsAffected[0]);
 if(results.rowsAffected[0]===1){
 res.status(200).send({
   message:"1"
 });
 }
 else{
   res.status(200).send(
     {
       message:"0"
     })
 }
 
   })
 })
 







router.post('/deletetheuser',(req,res)=>{
  var user_name = req.body.user;
  pool.query(`Delete from [Library].[dbo].[user] where spr_no='${req.body.sprno}' and email='${req.body.email}';`, function(error, results){
    if(error){
      console.log(error);
    }
    console.log("query response is ", results);
    if(results.rowsAffected[0] ==1)
    {
      res.status(200).send("1");
    }
    else{
      res.status(200).send('0')
    }
    
  })
})


router.post('/addInstruction',(req,res)=>{
  pool.query(`update  instruction set instruction= '${req.body.instruction}' where type= '${req.body.type}';`,
   function(error, results){
    if(error){
      console.log(error);
    }
    console.log(results);
    if(results.rowsAffected[0] >= 1)
    {
      res.status(200).send({
        message:results.rowsAffected[0]
      });
    }
    else{
      res.status(200).send({
        message:0
      })
    }
    
  
  
  })
})

router.get('/getInstruction',(req,res)=>{
  pool.query(`Select * from instruction`,
   function(error, results){
    if(error){
      console.log(error);
    }
    console.log(results);
    if(results)
    {
      res.status(200).send({
        message:results.recordsets
      });
    }

    
  
  
  })
})




   


module.exports=router;