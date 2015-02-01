/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-4-7
 * Time: 下午12:23
 * To change this template use File | Settings | File Templates.
 */

var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
function  temp_getFinalPrice(data){
    var b =
        this;
    fetch_goods_info.sendRequest({
        topic: "get_final_price",
        nid: data
    }, function(response_data) {
        //console.log(response_data);
        /*
         for (var sub_item in response_data)
         if("string" === typeof(sub_item)){
         console.log(sub_item);
         var buffer = new BufferHelper();
         buffer.concat(response_data[sub_item]);
         var buff = buffer.toBuffer();
         response_data[sub_item]=iconv.decode(buff, 'GBK');
         console.log(response_data[sub_item]);
         }
         */
        //var str = iconv.decode(buf, 'GBK');
        InsertDB(response_data);
        //response_data = response_data.currentPrice >= response_data.finalPrice ? response_data.currentPrice - response_data.finalPrice : 0;
        //0 < response_data ? (response_data = response_data.toFixed(2), 1E4 < response_data && (response_data = Math.round(response_data / 1E4) + "\u4e07"), b._qrCodeWrapper.find("span").html(response_data), b._tips.find("span").html(response_data)) : b._qrMsg.html('<div style="margin-top:14px">\u624b\u673a\u4e00\u6dd8\u626b\u7801\u8d2d\u4e70</div>')
    })
};
