#!/usr/bin/env node

var db_config = {

};
var config ={

    JD:{
        db_config:{
            db_url:"mongodb://localhost:27017/",
            db_name:"goods_jd"
        },
        product_list:{
            cell_phone:{
                item_name: "手机",
                list_url: "http://list.jd.com/list.html?cat=9987,653,655"
            },
            domestic_fruit:{
                item_name: "国产水果",
                list_url: "http://list.jd.com/12218-12221-12237.html"
            }
        }
    }

};
var logger = require('tracer').colorConsole();
var moment = require("moment");
var cur_date=moment().format('MMMM Do YYYY, h:mm:ss a');
logger.log("Starting at "+cur_date);



var EventProxy = require('eventproxy');
var event_proxy = new EventProxy();
var fetch_counter = 0;
var product_item_counter=0;
var inserted_product_item_counter=0;
var error_response_item_counter=0;
var g_next_page=config.product_start_url;



if (!com) var com = {};
com.etao || (com.etao = {});
com.etao.ruyitao || (com.etao.ruyitao = {});

fetch_goods_info = {
    sendRequest: function(topic, para) {
        "undefined" == typeof para && (para = function() {});
        event_proxy.emit("fetch_event",topic,event_proxy,para);
    },
    onRequest: {
        addListener: function(cb) {
            event_proxy.addListener("fetch_event",cb);
        },
        removeListener: function(cb) {
            event_proxy.removeListener("fetch_event",cb);
        }
    }
};




var MongoClient = require('mongodb').MongoClient
var db;
var coll;

function InitDB(db_config,callback){
    // Initialize connection
    var current_data = moment().format('YYYY_MM_DD');
    var db_url =  db_config.db_url+db_config.db_name+'_'+current_data;
    MongoClient.connect(db_url, function(err, database) {
        callback(err, database);
    });
}

function InitCollection(db,coll_name,callback){
    var coll = db.collection(coll_name);
    callback(coll);
}

function InsertDB_(coll,data,callback){

    coll.find({'DetailPageURL':data.DetailPageURL}).count(function(error, nItem){
        if (error){
            throw error;
            //return 0;
        }
        if(nItem!==0){
            logger.log("There are %d item already:%s", nItem,data.DetailPageURL);
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

function InsertDB(data){

    coll.find({'DetailPageURL':data.DetailPageURL}).count(function(error, nItem){
        if (error){
            throw error;
            //return 0;
        }
        if(nItem!==0){
            logger.log("There are %d item already:%s", nItem,data.DetailPageURL);
        }else{//
            coll.insert(data,function(err,result){
                if (err) throw err;
                //logger.log(result);
                inserted_product_item_counter+=1;
                logger.log("all inserted product item num:%d",inserted_product_item_counter);
            });
        }
    });
}

function fetch_callback(data,callback) {

    //logger.log(data.Item);
    if("undefined" == typeof(data) || "undefined" ==typeof(data.Item)){
        error_response_item_counter+=1;
        logger.log("Error response data:",data);
        logger.log("All Error response counter:",error_response_item_counter);
    }else{
        coll.find({'DetailPageURL':data.DetailPageURL}).count(function(error, nItem){
            if (error){
                throw error;
                //return 0;
            }
            if(nItem!==0){
                logger.log("There are %d item already:%s", nItem,data.DetailPageURL);
            }else{//
                coll.insert(data.Item,function(err,result){
                    if (err) throw err;
                    //logger.log(result);
                    inserted_product_item_counter+=1;
                    logger.log("all inserted product item num:%d",inserted_product_item_counter);
                    //callback(result);
                });
            }
        });



        //InsertDB(db_coll,data.Item,callback);
    }

    //temp_getFinalPrice(data.Item.nid);


}


var http = require("http");
var fs = require('fs');
var cheerio = require("cheerio");
var URL=require("url");
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');


// Utility function that downloads a URL and invokes
// callback with the data.
PageData = {
    GetPage: function(url, callback) {

    logger.log("download:",url);
    var resq = http.get(url, function(res) {
        var get_buffer = [];
        res.on('data', function (chunk) {
            get_buffer.push(chunk);
        });
        res.on("end", function() {
            logger.log("GetPage End:",url);
            var utf8_buffer = iconv.decode(Buffer.concat(get_buffer),'GBK');
            //var urlObj = URL.parse(url);

            //fs.writeFileSync(urlObj.hostname,utf8_buffer);
            callback(url,utf8_buffer);
        });
    });
    resq.on("error", function(e) {
        logger.log("Downlad failed:",url);
        logger.log("Error message:",e.message);
        //throw(e);
        setTimeout(PageData.GetPage(url, callback),30000);
    });

}
}


fetch_page = {
    sendRequest: function(url, callback) {
        //"undefined" == typeof para && (para = function() {});
        event_proxy.emit("get_page",url,callback);
    },
    onRequest: {
        addListener: function(cb) {
            event_proxy.addListener("get_page",cb);
        },
        removeListener: function(cb) {
            event_proxy.removeListener("get_page",cb);
        }
    }
};

fetch_page.onRequest.addListener(PageData.GetPage);

var etaoMaxAtOnce = 15;
var etaoQueue = [];
var etaoCurNum=0;



if (!ParsePage) var ParsePage = {};
(function(parse_page){
    parse_page.JD = {
        url_pattern : {
           "main_page"    : "jd.com",
           "product_list" : "list.jd.com",
           "product_item" : "item.jd.com",
           "product_test" : ""
        },

        ParseList : function(url,page_data,callback){
            console.log("Parsing page:",url);
            var $ = cheerio.load(page_data);
            var next_page=[];
            var isLastPage = false;
            if ($('span').hasClass('next-disabled')){
                isLastPage=true;
            }
            $("script").each(function(i, ele){
                console.log(ele);
            });

            $("a").each(function(i, ele) {
                //get next page url
                if($(ele).attr("class")=="next"){
                    var next_url=$(ele).attr("href");
                    if("undefined"!=next_url){
                        next_page.push(next_url);
                        logger.log("next_page:"+next_page);
                    }
                }
                //get item urls
                var inter_url = $(ele).attr("href");
                if(inter_url){
                    var urlObj = URL.parse(inter_url);
                    if(urlObj.host==ParsePage.JD.url_pattern["product_item"]){
                        coll.find({'DetailPageURL':inter_url}).count(function(error, nItem){
                            if (error){
                                throw error;
                            }
                            if(nItem!==0){
                                logger.log("There are %d item already:%s", nItem,inter_url);
                            }else{//
                                logger.log("all product item num:%d",product_item_counter);
                                product_item_counter+=1;
                                //
                                GetProductInfoFromEtao({url:inter_url,callback:fetch_callback});
                            }
                        });
                    }else{

                    }
                }
            });

            var full_next_page="";
            if(isLastPage){
                console.log("----------------------channel crawl ended----------------------");
            }else if(next_page.length>0
                && "undefined"!=next_page[0]){

                full_next_page = "http://"+parse_page.JD.url_pattern["product_list"]+"/"+next_page[0];
                logger.log("real next page:"+full_next_page);
                //
                fetch_page.sendRequest(full_next_page,parse_page.JD.ParseList);
            }else{
                console.log(next_page);
                console.log("Can't ge next page information!!!");
                fetch_page.sendRequest(url,parse_page.JD.ParseList);
            }
            //callback(full_next_page);
            return full_next_page;
        },

        Parse: function(url,page_data){
            var urlObj = URL.parse(url);
            if(urlObj.host==this.url_pattern["product_list"]){
                logger.log("This is product list page:%s",url);
                var next_page=this.ParseList(url,page_data);
            }
        }

    }

})(ParsePage);

var asyncr=require("async");

function scratch(){
    asyncr.series([
    function(callback){
        InitDB(config.JD.db_config,function(err,database){
            if(err) throw err;
            if(db){
                db.close();
            }
            db = database;
            console.log("DB init finished.");
            callback(err);
        });
    },

    function(callback){
        console.log("collecte to cell_phone");
        InitCollection(db,config.JD.product_list.cell_phone.item_name,function(collection){
            coll = collection;
            console.log("Collection established.",coll);
            callback();
        });

    },

    function(callback){
        fetch_page.sendRequest(config.JD.product_list.cell_phone.list_url,ParsePage.JD.ParseList);

    }
    ]);

}
scratch();
//
var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();

   rule.hour = new schedule.Range(0,24,8);
//rule.minute = 40;

var j = schedule.scheduleJob(rule, function(){

        console.log("执行任务");
    scratch();

});


