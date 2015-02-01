/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-7-6
 * Time: 下午12:30
 * To change this template use File | Settings | File Templates.
 */

if (!ProductFetcher) var ProductFetcher={};

pageFetcher = require("./PageFetcher").PageFetcher;

jdhtmlParser = require("./JDHTMLParser").JDHTMLParser;

(function(module_para){
    module_para.JDFetchProductItemList=function(url,callback){
        pageFetcher.GetPageDataWithPhantom(url,function(e,url,page_data){
            jdhtmlParser.GetItemAndNextUrl(page_data,function(nextPage,itemUrls){
                 callback(e,nextPage,itemUrls);
                //  return {nextPage:nextPage,itemUrls:itemUrls};
            });
        });
    }
})(ProductFetcher);

exports.ProductFetcher = ProductFetcher;