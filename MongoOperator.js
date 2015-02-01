/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-7-6
 * Time: 下午3:36
 * To change this template use File | Settings | File Templates.
 */

if(!MongoOperator) var MongoOperator={};

var MongoClient = require('mongodb').MongoClient
var db;
var coll;

var moment = require("moment");
var logger = require('tracer').colorConsole();

(function(module_para){

    module_para.InitDB=  function(db_config,callback){
        // Initialize connection
        var current_data = moment().format('YYYY_MM_DD');
        var db_url =  db_config.db_url+db_config.db_name+'_'+current_data;
        MongoClient.connect(db_url, function(err, database) {
            callback(err, database);
        });
    };

    module_para.InitCollection=function(db,coll_name,callback){
        var coll = db.collection(coll_name);
        callback(coll);
    };

    module_para.Init=function(db_url,db_name,coll_name,callback){
        module_para.InitDB({db_url:db_url,db_name:db_name},function(err,database){
            module_para.InitCollection(database,coll_name,function(colle){
                coll = colle;
                callback(colle);
            });
        });
    };
    module_para.InsertDB=function(data,callback){

        coll.find({'DetailPageURL':data.DetailPageURL}).count(function(error, nItem){
            if (error){
                throw error;
                //return 0;
            }
            if(nItem!==0){
                //logger.log("There are %d item already:%s", nItem,data.DetailPageURL);
            }else{//
                coll.insert(data,function(err,result){
                    if (err) throw err;
                    //logger.log(result);
                    callback(err,result);
                });
            }
        });
    }

    function InsertDB_(coll,data,callback){

        coll.find({'DetailPageURL':data.DetailPageURL}).count(function(error, nItem){
            if (error){
                throw error;
                //return 0;
            }
            if(nItem!==0){
                //logger.log("There are %d item already:%s", nItem,data.DetailPageURL);
            }else{//
                coll.insert(data,function(err,result){
                    if (err) throw err;
                    //logger.log(result);
                    inserted_product_item_counter+=1;
                    logger.log("all inserted product item num:%d",inserted_product_item_counter);
                    callback(result);
                });
            }
        });
    }


})(MongoOperator);

exports.MongoOperator = MongoOperator;
