/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-7-5
 * Time: 下午12:35
 * To change this template use File | Settings | File Templates.
 */


if (!HTMLParser) var HTMLParser = {};

var cheerio = require("cheerio");
var URL=require("url");


(function(module_para){
   //var $;
   module_para.Init=function(page_data){
        var $ = cheerio.load(page_data);
   };
    module_para.Parse_href_node=function(page_data,callback){
       var $ = cheerio.load(page_data);
       var href_nodes = [];
       $("a").each(function(i, ele) {
           var href = $(ele).attr("href");
           var href_node={};
           if(href){
              href_node.href = href.toString();
              href_node.class = $(ele).attr("class");
              href_node.text =  $(ele).text();
               href_nodes.push(href_node);
           }
       });
       callback(href_nodes);
   };
    module_para.Parse_script=function(page_data,callback){
        var $ = cheerio.load(page_data);
        var scripts = [];
        $("script").each(function(i, ele) {
            var temp = $(ele);
            var script = $(ele).text();
            if(script){
                scripts.push(script);
            }
        });
        callback(scripts);
   }

})(HTMLParser);

exports.HTMLParser=HTMLParser;