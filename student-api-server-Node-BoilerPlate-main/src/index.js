const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const studentArray=require("./InitialData.js");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get("/api/student",(req,res)=>{
    res.json(studentArray);

});
app.get('/api/student/:id', (req, res) => {
    const id = req.params.id;
    const studentid = studentArray.find((s) => s.id == id);
    if (!studentid) {
      return res.status(404).send('Studentid not found');
    }
    res.json(studentid);
  });
app.post('/api/student',(req,res)=>{
    const {name,currentClass,division}=req.body;
    if(!name||!currentClass||!division){
        res.status(400).send("Incompleted detais provided");
    }
    const id=studentArray.length+1;
    const newstudentid={id,name,currentClass,division};
    studentArray.push(newstudentid);
    res.json(newstudentid);
});

app.put('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const{name}=req.body;
    const studentid=studentArray.find((s)=>s.id==id);
    if(!studentid){
        res.status(400).send("Invalid student data provided")
    }
    if(!name){
        res.status(400).send("incompled details provided");
    }
    studentid.name=name;
    res.json("student record updated Succesfully");
})
app.delete('/api/student/:id',(req,res)=>{
    const id=req.params.id;
    const studentIndex=studentArray.find((s)=> s.id==id);
    if(studentIndex===-1){
            res.status(404).send("studentid not found in studentarray");
    }
    studentArray.splice(studentIndex,1);
    res.json("Studentid deleted successfully");

});

app.listen(port, () => console.log(`App listening on port ${port}!`))


module.exports = app;  1