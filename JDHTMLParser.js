/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-7-5
 * Time: 下午8:51
 * To change this template use File | Settings | File Templates.
 */

if (!JDHTMLParser) var JDHTMLParser = {};

var URL=require("url");
utility = require("./utility").Utility;
htmlParser  = require("./HTMLParser").HTMLParser;

(function(module_para){

    module_para.PickItemURL=function(url_nodes,callback){
        var item_urls = [];

        if(url_nodes){
            url_nodes.forEach(function(ele){
               if(ele){
                   var interUrl=URL.parse(ele.href.toString());
                   if(interUrl.hostname=="item.jd.com" && interUrl.path!==null){
                       item_urls.push(interUrl.protocol+"//"+interUrl.hostname+interUrl.path);
                   }
               }
           });
        }

        callback(utility.UniqArray(item_urls));
    };
    module_para.PickNextPageURL=function(url_nodes,callback){
        var next_page_urls = "";
        if(url_nodes){
            url_nodes.forEach(function(ele){
                if(ele){
                    if(ele.class=="next" && ele.text == "下一页"){
                        next_page_urls = "http://list.jd.com/list.html"+ele.href.toString();
                        return   next_page_urls;
                    }
                }
            });
        }
        return   next_page_urls;
    };
    module_para.GetItemAndNextUrl=function(page_data,callback){
        var item_Urls=[];
        var next_page_url;
        if(page_data){
            htmlParser.Parse_href_node(page_data,function(urls){

                module_para.PickItemURL(urls,function(itemUrls){
                    item_Urls= itemUrls;

                });
                next_page_url=module_para.PickNextPageURL(urls) ;
                callback(next_page_url,item_Urls);
            });
        }
    }

})(JDHTMLParser);

exports.JDHTMLParser=JDHTMLParser;
