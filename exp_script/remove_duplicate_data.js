#!/usr/bin/env node

var config = {
    db_url:"mongodb://localhost:27017/test",
    db_name:"goods_jd",
    product_start_url:"http://list.jd.com/9987-653-655-0-0-0-0-0-0-0-1-1-1-1-1-72-4137-33.html"
};


/**
 * 游标函数
 * @param _start 游标的起始位置
 * @param _limit 游标的分页数量
 * @param _callback 游标执行函数
 */
function cursor(_start,_limit,_callback){
    //初始化数据定义
    var start,limit,flag,len;
    //初始化起始位置
    start = !_start || _start < 0 ? 0 : _start;
    //初始化分页数量
    limit = !_limit || _limit < 1 ? 1 : _limit;
    //使用Model执行分页查询
    var find_res = coll.find().skip(start).limit(limit);
    console.log(find_res);
    find_res.exec(function(err,docs){
        //缓存长度
        len = docs.length;
        //如果没有查询到，证明已经查询完毕
        if(len === 0){
            console.log('遍历结束');
        }
        //初始化循环结束标记
        flag = 0;
        //遍历
        docs.forEach(function(doc){
            //如果有执行函数就执行
            if(_callback && toString.call(_callback) === '[object Function]'){
                _callback(doc);
            }
            //如果循环到末尾，则迭代
            if(len == ++flag){
                cursor(start + docs.length,limit);
            }
        });
    });
}

var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient
var db;
var coll;


// Initialize connection
MongoClient.connect(config.db_url, function(err, database) {
    if(err) throw err;

    db = database;
    //var current_data = moment().format('YYYY_MM_DD');

    Remove_duplicate();
    //logger.log("Collected to database");
});

function Remove_duplicate(){
	coll = db.collection(config.db_name+'_'+'2014_04_26');
	//
	cursor(0,100,function(doc){
		console.log(doc);
	});
}

