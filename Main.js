#!/usr/bin/env node
/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-7-5
 * Time: 下午2:37
 * To change this template use File | Settings | File Templates.
 */


var productFetcher = require("./ProductFetcher").ProductFetcher;
var etaoFetcher = require("./EtaoFetcher").EtaoFetcher;
var mongo = require("./MongoOperator").MongoOperator;
var asyncr=require("async");
var fs = require("fs");



var page_url ="http://list.jd.com/list.html?cat=9987,653,655";

var db_url="mongodb://localhost:27017/";
var db_name="goods_jd";
var coll_name = "phone";

asyncr.series([

    function(callback){
       mongo.Init(db_url,db_name,coll_name,function(coll){
          console.log("DB init finished!") ;
          callback(null);
       });
    },
    function(callback){
        asyncr.whilst(
            function(){
                if(page_url){
                    return true;
                }else{
                    return false;
                }
            },
            function(callback){
                productFetcher.JDFetchProductItemList(page_url,function(status,nextPage,itemUrls){
                    if(status==="fail"){
                        callback(null);
                    }
                    console.log(nextPage,itemUrls);
                    page_url = nextPage;
                    itemUrls.forEach(function(ele){
                        etaoFetcher.GetProductInfoFromEtao(ele,function(data){
                            if(data.Item){
                                mongo.InsertDB(data.Item,function(err,res){
                                });
                            }else{
                                console.log("Wrong data!",data.Item);
                            }
                        });
                    });
                    callback(null);
                });
            },
            function(err){
               console.log("page_url is null");
            }
        );
    },



    function(callback){
        console.log("Finished");
        callback(null);
    }
]);



//page_data=fs.readFileSync("exp/phone_list.html",{encoding:"utf-8"});

//fs.writeFileSync("exp/phone_list_nodes.txt",page_data);

