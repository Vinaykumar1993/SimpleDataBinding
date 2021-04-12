var express=require('express');
var bodyParser = require('body-parser')
var app=express();
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var studentData=[{"id":1,"age":18,"name":"yashwa"},{"id":2,"age":18,"name":"yashwa2"},{"id":3,"age":18,"name":"yashwa3"},{"id":4,"age":18,"name":"yashwa4"},{"id":5,"age":18,"name":"yashwa5"}];
app.get('/getdata',function(req,res){
	// console.log("request incoming....");
	res.send({status:1,data:studentData});
})
app.post('/postdata',urlencodedParser,function(req,res){
	console.log("postdata",req.body);
	var student_details={id:studentData.length+1,age:req.body.age,name:req.body.name};
	studentData.push(student_details);
	res.send({status:1,msg:"Data Created Successfully"});
})
app.listen(4000,function(){
	console.log("app listening now with the port of 4000");
})