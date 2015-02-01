#!/usr/bin/env node
var http = require("http");
var fs = require('fs');
var cheerio = require("cheerio");
var URL=require("url");
var iconv = require('iconv-lite');
var needle = require('needle');
// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
    logger.log(url);
    http.get(url, function(res) {
        var get_buffer = [];
        if(IsImage(url)){
            //res.setEncoding('binary');
        }else{
            //res.setEncoding('gbk');
        }
        res.on('data', function (chunk) {
            get_buffer.push(chunk);
        });
        res.on("end", function() {
            //var utf8_buffer = iconv.decode(get_buffer,'utf-8');
            var rec_buf = Buffer.concat(get_buffer);
            var utf8_buffer = iconv.decode(rec_buf,'gb2312');
            console.log(utf8_buffer);
            //callback(utf8_buffer);
        });
    }).on("error", function() {
            console.log("get error:",url);
            //callback(null);
        });
}

function GetStream(url,callack){
  console.log("Getting:"+url);
  http.get(url, function(res) {
    //res.pipe()
  });
}

function IsImage(data_url){
  var regExp = /\.(jpg|png)$/i;
  var result = regExp.test(data_url);
  if(result){
     console.log("Is Image");
   }else{
    console.log("Not Image");
   }
  return (result);
}
function IsBinary(data_url){
  if(IsImage(data_url)){
    return true;
  }
  var regExp = /\.(pdf|doc)$/i;
  return(regExp.test(data_url));
}

function SaveFile(path,data_url,data){
var urlObj = URL.parse(data_url);
var file_name = urlObj.pathname.match(/\/[^\/]*$/);
console.log("file name:"+file_name);
fs.writeFile(path+file_name,data,'binary',function(e){
        if(e) throw e;
    });
}

//var url_src = "http://we.99btgongchang.com/p2p/01/13-01-28-00-11-52.html"
//var url_src = "http://list.jd.com/9987-653-655-0-0-0-0-0-0-0-1-1-1-1-1-72-4137-33.html"
var url_src = "http://www.baidu.com"
fs.exists('temp',function(exsist){
  if(!exsist){
    fs.mkdirSync('temp', 0755);
  }
});  

download(url_src, function(data) {
  if (data) {
        SaveFile("temp",url_src,data);
        
        var $ = cheerio.load(data);
        $("img").each(function(i, e) {
            var img_url = $(e).attr("src");
            console.log(img_url);
            download(img_url,function(data){
              if(data){
                 SaveFile("temp",img_url,data);
              }
            });
        });

    console.log("done");

  }
  else console.log("error");  
});