
//exports.utility=fetch_exports;

if (!Utility) var Utility = {};
(function(module_para){
    module_para.IsImage = function(data_url){
        var regExp = /\.(jpg|png)$/i;
        var result = regExp.test(data_url);
        if(result){
            console.log("Is Image");
        }else{
            console.log("Not Image");
        }
        return (result);
    };
    module_para.IsBinary = function(data_url){
        if(IsImage(data_url)){
            return true;
        }
        var regExp = /\.(pdf|doc)$/i;
        return(regExp.test(data_url));
    };

    module_para.UniqArray = function(arr){
        var toObject = function(a) {
            var o = {};
            for (var i=0; i< a.length; i=i+1) {
                o[a[i]] = true;
            }
            return o;
        };
        var keys = function(o) {
            var a=[], i;
            for (i in o) {
                if (o.hasOwnProperty(i)) { // 这里, YUI源码中是lang.hasOwnProperty(o, i)
                    a.push(i);
                }
            }
            return a;
        };
        return keys(toObject(arr));

    }
})(Utility);

exports.Utility=Utility;
