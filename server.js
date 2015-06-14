var express = require('express');
var bodyParser = require('body-parser');
var fs=require('fs');
var util = require('util');

var multer  = require('multer');

var app = express();

app.use(multer({ dest: './uploads/'}));
app.use(bodyParser.json());
app.get('/try.html',function (req,res) {    
	res.sendFile(__dirname+'/try.html');});

app.post('/fileupload',function(req,res,next){
   // console.log(req.body);
    console.log(req.files);
    return true;
});

app.post('/try.html',function (req,res) { 
    console.log(util.inspect(req.files,{depth:1}));   
	var file=req.body.files;    
	fs.readFile(file.path,function(err,data){        
		if(err) res.send('读文件操作失败。');        
		else{            
			fs.writeFile(file.name,data,function(err){                
				if(err) res.send('写文件操作失败。');
				else res.send('文件上传成功。');            
			});       
			 }    
			});
});app.listen(1337, "127.0.0.1");