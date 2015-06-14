var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');
var Project = require('../model/project.js');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cookieParser = require('cookie-parser');

var User = require('../models/user.js');
var connect = require('connect');
var router = express.Router();
router.use(cookieParser());
router.use(multer({ dest: './uploads/'}));
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dianpu', function(req, res, next) {
  res.render('dianpu');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/homepage', function(req, res) {
  Project.get(0, function(err,projects) {
    if (err) {
      return res.redirect('/');
    };
    res.render('homepage', {
      projects: projects
    });
  })
});
//注册页面
router.post('/reg',function(req,res){
	var newUser = new User({
		user_type:req.body.user_type,
		email:req.body.emails,
		name: req.body.name,
		phone: req.body.phone,
		password: req.body.password,
		isagreement:req.body.agreement
		
	});
	User.get(newUser.email,function(err,user){
		if(err){
			return res.redirect('/');
		}
		if(user){
			return res.redirect('/register');//用户名已注册，跳到注册页面
		}
		//如果不存在，则新增用户
		newUser.save(function(err,user){
      if(err){
            	return res.redirect('/register');//错误，返回注册页
            }
            res.redirect('/login');//成功，跳到登陆页面
          });
	});
});


router.get('/login', function(req, res, next) {
  res.render('login');
});
//登录页面
router.post('/login',function(req,res) {
    //生成密码的md5值
    var password = req.body.password;
    var email = req.body.email;
    //检查用户是否存在
    User.get(email, function (err, user) {

     if (!user) {
       return res.send({
        text: '该用户不存在'
      });
     }
         //检查密码是否正确
         if (user.password != password) {
          return res.send({
            text: '密码错误'
          });
        }

        //用户名密码都匹配，用户信息存入session
     req.session.password = password;//目前并没有加session的定义
     res.send({
      isChecked: true
    });
   });

  })

//不登录，不显示此页，只有登陆成功才会显示此页
// router.get('/homepage', function(req, res, next) {
//   res.render('homepage');
// });

//homepage搜索项目信息
router.post('/project-info',function(req,res){
  //return res.send({text:req.body.state});
  //搜索项目
  Project.get(req.body.state,function(err,project){
    if(!project){
      return res.send({
        text:'没有此状态项目'
      });
    }
    return res.send(project);
  });
});
//检索正在修改的项目信息
router.post('/pro-publish-info',function(req,res){
  //return res.send({text:req.body.state});
  //搜索项目
  Project.getonechanging(req.body.proname,function(err,project){
    if(!project){
      return res.send({
        text:'没有此状态项目'
      });
    }
    return res.send(project);
  });
});
//投资页面
router.get('/invest/', function(req, res, next) {
 // congsole.log(req.params.type);
  Project.get(0, function(err,projects) {
    if (err) {
      return res.redirect('/');
    };
    res.render('invest', {
      projects: projects
    });
  })
});
router.get('/invest/:type', function(req, res, next) {
 // congsole.log(req.params.type);
  Project.sort(req.params.type, function(err,projects) {
    if (err) {
      return res.redirect('/');
    };
    res.render('invest', {
      projects: projects
    });
  })
});


router.get('/publish/firstForms', function(req, res) {
  res.render('publish/firstForms');
});
router.get('/publish00', function(req, res) {
  res.render('publish00');
});
//发布项目第一个表单提交
router.post('/publish/secondForms/', function(req, res) {
  var id = req.body.id;
    // 上传文件的临时路径
    var tmp_path = req.files.logofiles.path;
    // 移动至硬盘路径
    var target_path = './public/upload-images/' + req.files.logofiles.name;
    // 移动文件
    fs.rename(tmp_path, target_path, function(err) {
      if (err) throw err;
      // 删除临时文件
      fs.unlink(tmp_path, function() {
       if (err) throw err;
     });
    });
    var project = new Project({
      remarkName: req.body.remarkName,
      wholeMoney: req.body.wholeMoney,
      type: req.body.type,
      province: req.body.province,
      logo: '/upload-images/'+req.files.logofiles.name
    });
    project.save(function(err, project) {
      if (err) {
            return res.redirect('/publish/secondForms'); //错误，留在当前页面
          }})
    var ID = ObjectId(project._id).toString();
    console.log(String(project.remarkName));
    console.log(ID);
    res.render('publish/secondForms',{
      name:  req.body.remarkName,
      money: req.body.money
    });

      //  req.session.project = project; //
     // res.render('publish',{
     //   proname:'req.body.remarkName'
   // }); //成功后重绘publish页面
;
})

//发布项目基本信息第二个表单提交
router.post('/publish/thirdForms/:name', function(req, res) {
  //  console.log(req.params.name);
  var project = new Project({
    wholeMoney: req.body.wholeMoney,
      pubProportion:  req.body.pubMoney,
      pubEarn:  req.body.pubEarn,
      buyParts:  req.body.buyParts
  })
  Project.update(req.params.name, project,  function (err, project) {
    if (err) {
      res.send('error');
    }
    Project.getOneMessage(req.params._id, function (err, project) {
      if (err) {
      //  res.send('ddd');
    }

    res.render('publish/thirdForms', {
      id: req.params._id
    });
  })
  })
})

router.get('/users', function(req, res) {
  res.render('users');
});
//店铺详情上传大背景图片
router.post('/up-bigimg',function (req,res,next) {
  var name = req.files.biglogo.name;   
  var tmp_path = "uploads/"+name;
  var target_path = "public/images/"+name;
  //移动文件
  fs.rename(tmp_path,target_path,function(){

    //删除临时文件夹文件
    fs.unlink(tmp_path,function(){});
  });
  fs.readFile(tmp_path,function(err,data){
    fs.writeFile(name,data,function(err){
      if(err)
        return res.send('读取文件失败');
      else
        res.redirect('/publish');//成功，跳出“uploadblock”
    });
  });
});

module.exports = router;

