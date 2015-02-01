/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-7-5
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */


if(!PageFetcher) var PageFetcher={};

var http = require("http");
var logger = require('tracer').colorConsole();
var iconv = require('iconv-lite');
var phantom = require('phantom');

// Utility function that downloads a URL and invokes
// callback with the data.
PageFetcher = {
    GetPage: function(url, callback) {

        logger.log("download:",url);
        var resq = http.get(url, function(res) {
            var get_buffer = [];
            res.on('data', function (chunk) {
                get_buffer.push(chunk);
            });
            res.on("end", function() {
                logger.log("GetPage End:",url);
                //var utf8_buffer = iconv.decode(Buffer.concat(get_buffer),'utf-8');
                callback(null,url,get_buffer);
            });
        });
        resq.on("error", function(e) {
            logger.log("Downlad failed:",url);
            logger.log("Error message:",e.message);
            callback(e,url,"");
            //throw(e);
            //setTimeout(PageData.GetPage(url, callback),30000);
        });

    },
    GetPageNodesWithPhantom: function(url, callback){
        console.log("open ",url);
        phantom.create('--load-images=no',function(ph) {
            return ph.createPage(function(page) {
                return page.open(url, function(status) {
                    console.log("opened %s? ",url, status);

                    page.evaluate(function () {
                        return document.all;
                    },function(result){
                        var validNodes=[];

                        if(result){
                            for (var i=0; i<result.length;i++){
                                if(result[i]){
                                    validNodes.push(result[i]);
                                }
                            }
                        }
                        ph.exit();
                        callback(null,url,validNodes);
                    });

                });
            });
        });
    },

    GetPageDataWithPhantom:function(url,callback){
        console.log("open ",url);
        phantom.create('--load-images=no',function(ph) {
            return ph.createPage(function(page) {
                return page.open(url, function(status) {
                    console.log("opened %s? ",url, status);
                    page.evaluate(function () {
                        return document.all[0].outerHTML;
                    },function(result){
                        ph.exit();
                        callback(status,url,result);
                    });

                });
            });
        });
    }
}
/*
*

* */
exports.PageFetcher = PageFetcher;



