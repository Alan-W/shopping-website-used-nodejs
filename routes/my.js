//从index中切出来的
//有文件提交的注册页面（闫）
// router.post('/reg',function (req,res,next) {    
// 	var name = req.files.file.name;   
// 	var tmp_path = "uploads/"+name;
// 	var target_path = "public/images/"+name;
// 	//移动文件
// 	fs.rename(tmp_path,target_path,function(){
		
// 		//删除临时文件夹文件
// 		fs.unlink(tmp_path,function(){});
// 	});
// 	fs.readFile(tmp_path,function(err,data){        
// 		fs.writeFile(name,data,function(err){                
// 			if(err) 
// 				return res.send('读取文件失败');
// 			else 
// 				add(req,res);
// 			});             	       	    
// 	});
// });
// function add(req,res){
// 	var newUser = new User({
// 		user_type:req.body.user_type,
// 		email:req.body.emails,
// 		name: req.body.name,
// 		phone: req.body.phone,
// 		password: req.body.password,
// 		isagreement:req.body.agreement,
// 		img:'images/'+req.files.file.name
// 	});
// 	User.get(newUser.email,function(err,user){
// 		if(err){
// 			return res.redirect('/');
// 		}
// 		if(user){
// 			return res.redirect('/register');//用户已注册，返回注册页
// 		}
// 		//用户不存在，新增用户
// 		newUser.save(function(err,user){
//             if(err){
//             	return res.redirect('/register');//错误，返回注册页
//             }
//             res.redirect('/login');//成功，跳到登陆页
// 		});
// 	});
// }