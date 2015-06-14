var mongodb = require('./db');
var ObjectId = require('mongodb').ObjectID;

//定义Project类
function Project(project) {
    this.remarkName = project.remarkName;//项目名称
    this.wholeMoney= project.wholeMoney;//众筹总额
    this.lowestMoney= project.lowestMoney;//最低投资额
    this.type = project.type;//项目类型
    this.province = project.province;//项目地址
    this.logo = project.logo;//主页面项目logo
    this.simpleDescription= project.simpleDescription;//项目一句话描述
    this.background= project.background;//项目背景图片
    this.images= project.images;//涉及项目的所有图片，用于投资页面
    this.pubProportion = project.pubProportion;//项目方出资及比例
    this.pubEarn = project.pubEarn;//项目方收益及比例
    this.buyParts = project.buyParts;//项目的认购份数
    this.invested = project.invested;//项目已筹资金额
    this.state= 0//项目审核状态
}
//输出Project
module.exports = Project;
//存储项目信息
Project.prototype.save = function(callback) {
    var project ={
        remarkName: this.remarkName,
        wholeMoney: this.wholeMoney,
        lowestMoney: this.lowestMoney,
        type: this.type,
        province: this.province,
        logo: this.logo,
        state: this.state,
        simpleDescription: this.simpleDescription,
        background: this.background,
        images: this.images,
        pubProportion:this.pubProportion,
        pubEarn: this.pubEarn,
        buyParts: this.buyParts,
        invested: this.invested
    }
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err)//错误，返回err信息
        };
        //读取projects集合
        db.collection('projects', function(err, collection){
            if (err) {
                mongodb.close();//错误，关闭数据库
                return callback(err);//错误，返回err信息
            };
            //将数据插入到projects集合
            collection.insert(project,{
                safe: true
            }, function (err, project) {
                mongodb.close();
                if (err) {
                    return callback(err);//错误，返回err信息
                };
                callback(null, project);//成功，err为null，并返回用户存储后的文档
            })
        })
    })
}

//读取项目信息
Project.get = function(state,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取project集合
        db.collection('projects',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //查找state值为0的project
            collection.find({
                state: 0
            }).toArray(function(err,projects){
                mongodb.close();
                if(err){
                    return callback(err);//失败！返回err信息
                }
                callback(null,projects);//成功。返回查询到的项目
            });
        });
    });
};

//读取正在修改的项目信息
Project.getonechanging = function(proname,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取project集合
        db.collection('projects',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //查找state值为0的project
            collection.find({
                remarkName:proname
            }).toArray(function(err,projects){
                mongodb.close();
                if(err){
                    return callback(err);//失败！返回err信息
                }
                callback(null,projects);//成功。返回查询到的项目
            });
        });
    });
};
 //根据ID读取项目信息
Project.getOneMessage = function(_id, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 projects 集合
        db.collection('projects', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //根据 _id 对象查询项目
            collection.findOne({
                "_id":ObjectID(_id)
            }, function(err, project){
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, project);//成功！以数组形式返回查询的结果
            });
        });
    });
};
//查找当前记录的上一条记录
Project.getPreIfo = function(_id, callback) {
    //打开数据库
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err); //错误，返回 err 信息
        }
        //读取 projects 集合
        db.collection('projects', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err); //错误，返回 err 信息
            }
            //查找项目id（_id键）值为 id 一个文档
            collection.find({
                _id: ObjectId(_id)
            }, 
            {
                sort: {_id: 1}
            },{
                limit:1
            },function(err, projects) {
                mongodb.close();
                if (err) {
                    return callback(err); //失败！返回 err 信息
                }
                callback(null, projects); //成功！返回查询的用户信息
            });
        });
    });
};
//更新projects的相关字段
Project.update = function(name, project, callback) {

    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 projects 集合
        db.collection('projects', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //更新项目融资信息
            collection.update({
                "remarkName": name
            },
             {
                $set: {
                    wholeMoney: project.wholeMoney,
                    pubProportion: project.pubProportion,
                    pubEarn: project.pubEarn,
                    buyParts: project.buyParts
                }
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};
//项目检索排序
Project.sort = function(type, callback) {
    console.log(type);
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//错误，返回err信息
        }
        //读取project集合
        db.collection('projects',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //查找state值为0的project
            collection.find({
                type: type
            }).toArray(function(err,projects){
                mongodb.close();
                if(err){
                    return callback(err);//失败！返回err信息
                }
                callback(null,projects);//成功。返回查询到的项目
            });
        });
    });
}