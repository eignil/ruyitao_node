/**
 * BiForWeb.js
 * From: http://simigoods.360buy.com/js/BiForWeb.js
 * Date: 2014-2-24 14:14:19
 *
 *
 * 20130224 
 * for new list node
 * gbk to utf-8
 */
function recGetDomain() {
    var RecCurrentUrl = location.href;
    if (/360buy\.com/.test(RecCurrentUrl)) {
        return "jd.com";
    }
    if (/jd\.com/.test(RecCurrentUrl)) {
        return "jd.com";
    }
};
var RecRecommendCorrentDomain = recGetDomain();
function readPinCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return arr[2]; return '';
}
var loguri = "http://csc." + RecRecommendCorrentDomain + "/log.ashx?type1=$type1$&type2=$type2$&data=$data$&pin=$pin$&referrer=$referrer$&jinfo=$jinfo$&callback=?";
callback1 = function(data) {
    ;
}
log = function(type1, type2, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    var data = '';
    for (i = 2; i < arguments.length; i++) {
        data = data + arguments[i] + '|||';
    }   
    var url = loguri.replace(/\$type1\$/, escape(type1));
    url = url.replace(/\$type2\$/, escape(type2));
    url = url.replace(/\$data\$/, escape(data));
    url = url.replace(/\$pin\$/, escape(decodeURIComponent(readPinCookie("pin"))));
    url = url.replace(/\$referrer\$/, escape(document.referrer));
    url = url.replace(/\$jinfo\$/, escape(''));
    $.getJSON(
            url,
            callback1
        );

    var traceurl = ("https:" == document.location.protocol ? "https://mercuryssl" : "http://mercury") + ".jd.com/log.gif"
                + "?t=other.000000"
                + "&m=UA-J2011-1"
                + "&v=" + encodeURIComponent('t1=' + type1 + '$t2=' + type2 + '$p0=' + data)
                + "&ref=" + encodeURIComponent(document.referrer)
                + "&rm=" + (new Date).getTime();
    var d = new Image(1, 1);
    d.src = traceurl;
        
}
function GetWarePriceimg(sku) {
    return "<img  onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/no1.gif'\" src=\"http://jprice.360buyimg.com/price/gp" + sku + "-1-1-1.png\" />";
}
function getPuoductlink(sku) {
    if (sku > 10000000 && sku < 20000000) {
        return "http://book." + RecRecommendCorrentDomain + "/" + sku + ".html";
    }
    else if (sku > 20000000 && sku < 30000000) {
        return "http://mvd." + RecRecommendCorrentDomain + "/" + sku + ".html";
    }
    else {
        return "http://item.jd.com/" + sku + ".html";
    }
}
function GetImgMasterUrl(wid, Folder) {
    var domain = 10;
    switch (wid % 5) {
        case 0:
            domain = 10;
            break;
        case 1:
            domain = 11;
            break;
        case 2:
            domain = 12;
            break;
        case 3:
            domain = 13;
            break;
        case 4:
            domain = 14;
            break;
        default:
            domain = 10;
            break;
    }
    return "http://img" + domain + ".360buyimg.com/" + Folder + "/";
}
function verifyPrice(price) {
    if (!price || price == '') {
        return price;
    }
    var result;
    var i = price.toString().split('.');
    if (i.length == 1) {
        result = i[0] + '.' + '00';
    }
    else if (i.length == 2) {
        if (i[1].length == 1) {
            result = i[0] + '.' + i[1] + '0';
        }
        else if (i[1].length == 2) {
            result = price;
        }
        else if (i[1].length > 2) {
            result = i[0] + '.' + i[1].substring(0, 2);
        }
    }
    return result;
}
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

//除了“购买了还购买了其他的地方也在用统计不要更改此方法”
function reClick(type2, pwid, sku, num) {
    name = "reWids" + type2;
    reWids = getCookie(name);
    if (reWids != null) {
        reWids = reWids.toString();
        var pos = reWids.indexOf(sku);
        if (pos < 0) {
            reWids = reWids + "," + sku;
        }
    }
    else {
        reWids = sku;
    }
    setCookie(name, reWids, 15);

    sku = sku.split("#");
    log(3, type2, sku[0]);
    //log('RC', 'CK', type2, pwid, sku[0], num);
}
//过渡页拆分统计
reCookieName = "reWidsTs";
function reClick3(type2, pwid, sku, num) {
    var reWidsClubCookies = eval('(' + getCookie(reCookieName) + ')');
    if (reWidsClubCookies == null || reWidsClubCookies == '') {
        reWidsClubCookies = new Object();
    }
    if (reWidsClubCookies[type2] == null) {
        reWidsClubCookies[type2] = '';
    }
    var pos = reWidsClubCookies[type2].indexOf(sku);
    if (pos < 0) {
        reWidsClubCookies[type2] = reWidsClubCookies[type2] + "," + sku;
    }

    setCookie(reCookieName, $.toJSON(reWidsClubCookies), 15);
    //推荐位点击
    log(3, type2, sku);
    //log('RC', 'CK', type2, pwid, sku[0], num);
}
function setCookie(name, value, date) {
    var Days = date;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=." + RecRecommendCorrentDomain + "";
}
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}
function getflag(name) {
    if (getCookie(name) != null & getCookie(name) != "") {
        return 1;
    }
    return 0;
}
//我的购物车页面推荐商品(购买了同样商品的顾客还购买了)
//----------------------start-------------------------------------
var CartRecommandWare;
function GetRecommandWare(wids, showContainer) {
    $.getJSON("http://prs." + RecRecommendCorrentDomain + "/GetRecommendWare.aspx?ip=" + getCookie("ipLocation") + "&wids=" + wids + "&jsoncallback=?",
        function(json) {
            if (json != undefined && json != "" && json.length > 0) {
                log('R2', 'Show', json.length);
                CartRecommandWare = json;
                GetRecommandWarePage(showContainer, 3);
                var len = $(".num > li").length;
                var index = 0;
                var adTimer;
                $(".num li").mouseover(function() {
                    index = $(".num li").index(this);
                    showImg(index);
                }).eq(0).mouseover();
                $('.ad').hover(function() {
                    clearInterval(adTimer);
                }, function() {
                    adTimer = setInterval(function() {
                        showImg(index)
                        index++;
                        if (index == len) { index = 0; }
                    }, 5000);
                }).trigger("mouseleave");
            }
        }
    );
}
//我的购物车页面推荐商品拼凑每页html(购买了同样商品的顾客还购买了)
function GetRecommandWarePage(showContainer, pagesize) {
    var wcart_pagecount = Math.ceil(CartRecommandWare.length / pagesize);
    var wcart_start = 0;
    var wcart_end = 0;
    var wcart_start
    var html = "";
    html += "<div class=\"c-top\"></div>";
    html += "<div class=\"content_right\">";
    html += "<h3>\u8d2d\u4e70\u4e86\u540c\u6837\u5546\u54c1\u7684\u987e\u5ba2\u8fd8\u8d2d\u4e70\u4e86</h3>";
    html += "<ul class=\"num\">";
    for (var i = 1; i <= wcart_pagecount; i++) {
        html += "<li>" + i + "</li>";
    }
    html += "</ul>";
    html += "<div class=\"ad\">";
    html += "<div class=\"slider\">";
    html += "<ul>";
    for (var curpage = 1; curpage <= wcart_pagecount; curpage++) {
        wcart_start = (curpage - 1) * pagesize;
        wcart_end = wcart_start + pagesize - 1;
        if (wcart_end >= CartRecommandWare.length) {
            wcart_end = CartRecommandWare.length - 1;
        }
        html += "<li class=\"Product_List_S3\">";
        html += "<ul>";
        for (var i = wcart_start; i <= wcart_end; i++) {
            html += "<li>";
            html += "<dl onclick = 'reClick(\"2\",\"" + CartRecommandWare[i].Pwid + "\",\"" + CartRecommandWare[i].Wid + "\",\"" + i + "\")'>";
            html += "<dt><a href=" + getPuoductlink(CartRecommandWare[i].Wid) + " title=\"" + CartRecommandWare[i].Wname + "&#13;" + CartRecommandWare[i].Promotitle + "\" target=\"_blank\"><img onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/none/none_150.gif'\" src=\"" + GetImgMasterUrl(CartRecommandWare[i].Wid, "n4") + CartRecommandWare[i].ImageUrl + "\" /></a></dt>";
            html += "<dd>";
            html += "<div class=\"p_Name\"><a href=" + getPuoductlink(CartRecommandWare[i].Wid) + " title=\"" + CartRecommandWare[i].Wname + "&#13;" + CartRecommandWare[i].Promotitle + "\" target=\"_blank\">" + CartRecommandWare[i].Wname + "<font style=\"color:#ff0000\">" + CartRecommandWare[i].Promotitle + "</font></a></div>";
            html += "<div class=\"p_Price\"><img onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/no1.gif'\" src=\"" + CartRecommandWare[i].PriceImg + "\" /></div>";
            html += "<div class=\"p_Opp\"><a onclick=\"AddProduct('" + CartRecommandWare[i].Wid + "',1,this)\" href=\"#none\"><img alt=\"\u52a0\u5165\u8d2d\u7269\u8f66\" title=\"\u52a0\u5165\u8d2d\u7269\u8f66\" src=\"http://www." + RecRecommendCorrentDomain + "/purchase/skin/images/addcart2.gif\" /></a></div>";
            html += "</dd>";
            html += "</dl>";
            html += "</li>";
        }
        html += "</ul>";
        html += "</li>";
    }
    html += "</ul>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "<div class=\"c-bot\"></div>";
    document.getElementById(showContainer).innerHTML = html;
}
function showImg(index) {
    var adHeight = $(".content_right .ad").height();
    $(".slider").stop(true, false).animate({ top: -adHeight * index }, 1000);
    $(".num li").removeClass("on").eq(index).addClass("on");
}

function NewGetRecommandWare(wids) {
    $.getJSON("http://prs." + RecRecommendCorrentDomain + "/GetRecommendWare.aspx?ip=" + getCookie("ipLocation") + "&wids=" + wids + "&jsoncallback=?",
    function(json) {
        if (!json) { return; }

        var html = "";
        for (var i = 0; i < json.length; i++) {
            html += "<li onclick = 'reClick(\"2\",\"" + json[i].Pwid + "\",\"" + json[i].Wid + "\",\"" + i + "\")'>";
            html += "<div class=\"p-img\"><a href=" + getPuoductlink(json[i].Wid) + " title=\"" + json[i].Wname + "\" target=\"_blank\"><img onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/none/none_150.gif'\" src=\"" + GetImgMasterUrl(json[i].Wid, "n3") + json[i].ImageUrl + "\" class=\"loading-style2\" /></a></div>";
            html += "<div class=\"p-name\"><a href=" + getPuoductlink(json[i].Wid) + " title=\"" + json[i].Wname + "\" target=\"_blank\">" + json[i].Wname + json[i].WareTitle + "</a></div>";
            html += "<div class=\"p-price\"><img onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/no1.gif'\" src=\"" + json[i].PriceImg + "\" /></div>";
            html += "<div class=\"p-btn\"><a class=\"btn\" href=\"#\"><span class=\"btn-icon\">1</span><span class=\"btn-text\">加入购物车</span></a></div>";
            html += "</li>";
        }
        $(".clearfix").html(html);
        $(".clearfix").show();
        log('R2', 'Show', json.length);
    });
}
//---------过渡页面“购买了还购买了”和“您可能感兴趣的商品”的显示--begin--------------
var CurrentWids = "";
function GetWares(Wids) {
    CurrentWids = Wids;
    $.getJSONP("http://prs." + RecRecommendCorrentDomain + "/GetInterimPageNewJsonData.aspx?ip=" + getCookie("ipLocation") + "&wids=" + Wids + "&callback=InterimPageHtmlJson", InterimPageHtmlJson);
}
InterimPageHtml = function(json) {
    if (json != undefined && json != null && json != "" && json.length > 0) {
        str = json.split('&#!#&');
        if (str[0] == '') {
            $('#similar').hide();
        }
        else {
            $('#similarData').html(str[0]);
            var StatisticsKey = (CurrentWids.length == 6 || CurrentWids.length == 8) ? "&TrsBuy" : "&TrsBuyP";
            //log(str[2] + StatisticsKey, 'Show');
            log('R4', 'Show');

        }
        if (str[1] == '') {
            $('#promotion').hide();
        }
        else {
            $('#promotionData').html(str[1])
            var StatisticsKey = (CurrentWids.length == 6 || CurrentWids.length == 8) ? "&TrsNed" : "&TrsNedP";
            //log(str[2] + StatisticsKey, 'Show');
            log('R5', 'Show');

        }
        RecommendTag.init();
        //log(GetFirstType() + '&Buy', 'Show');
    }
}
InterimPageHtmlJson = function(json) {
    if (json != undefined && json != null && json != "" && json.length > 0) {
        var userbuy = getCookie("_ghis");
        if (userbuy == null) {
            userbuy = "";
        }
        var userbuytype = getCookie("_ghit");
        if (userbuytype == null) {
            userbuytype = "";
        }
        var html1 = "", html2 = "", i1 = 0, i2 = 0;
        for (var i = 0, len = json.length; i < len; i++) {
            var p2 = json[i];
            if ((userbuytype.indexOf(',' + p2.Type + ',') < 0) || (userbuytype.indexOf('.' + p2.Type + '.') < 0)) {
                if (userbuy.indexOf(',' + p2.Code + ',') < 0) {
                    if (i1 < 9) {
                        i1++;
                        html1 += "<dl onclick = 'reClick(\"4\",\"\",\"" + p2.Wid + "\",\"" + i + "\");'>";
                        html1 += "<dt class=\"p-img\"><a href=" + getPuoductlink(p2.Wid) + " title=\"" + p2.Name + "\" target=\"_blank\"><img src=\"" + GetImgMasterUrl(p2.Wid, "n4") + p2.Imgurl + "\" onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/none/none_150.gif'\" width=\"100\" height=\"100\" alt=\"" + p2.Name + "\"/></a></dt>";
                        html1 += "<dd class=\"p-info\">";
                        html1 += "<div class=\"p-name\"><a href=" + getPuoductlink(p2.Wid) + " title=\"" + p2.Name + "\" target=\"_blank\">" + p2.Name + "</a></div>";
                        html1 += "<div class=\"p-price\"><strong>\uffe5" + p2.Wmeprice + "</strong><span sku=\"" + p2.Wid + "\" id=\"p" + p2.Wid + "\"></span></div>";
                        html1 += "<div class=\"p-btn\"><a onclick=\"AddProduct(" + p2.Wid + ",1,this)\" class=\"btn-append\" href=\"#none\">\u52a0\u5165\u8d2d\u7269\u8f66</a></div>";
                        html1 += "</dd>";
                        html1 += "</dl>";
                    } else {
                        i2++;
                        if (i2 > 6) break;
                        html2 += "<dl onclick = 'reClick(\"4\",\"\",\"" + p2.Wid + "\",\"" + i + "\");'>";
                        html2 += "<dt class=\"p-img\"><a href=" + getPuoductlink(p2.Wid) + " title=\"" + p2.Name + "\" target=\"_blank\"><img src=\"" + GetImgMasterUrl(p2.Wid, "n4") + p2.Imgurl + "\" onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/none/none_150.gif'\" width=\"100\" height=\"100\" alt=\"" + p2.Name + "\"/></a></dt>";
                        html2 += "<dd class=\"p-info\">";
                        html2 += "<div class=\"p-name\"><a href=" + getPuoductlink(p2.Wid) + " title=\"" + p2.Name + "\" target=\"_blank\">" + p2.Name + "</a></div>";
                        html2 += "<div class=\"p-price\"><strong>\uffe5" + p2.Wmeprice + "</strong><span sku=\"" + p2.Wid + "\" id=\"p" + p2.Wid + "\"></span></div>";
                        html2 += "<div class=\"p-btn\"><a onclick=\"AddProduct(" + p2.Wid + ",1,this)\" class=\"btn-append\" href=\"#none\">\u52a0\u5165\u8d2d\u7269\u8f66</a></div>";
                        html2 += "</dd>";
                        html2 += "</dl>";
                    }
                }
            }
        }
        if (html1) {
            html1 = "<div class=\"list-h\">" + html1 + "</div>";
            $('#similarData').html(html1);
            log('R4', 'Show');
        } else {
            $('#similar').hide();
        }
        if (html2) {
            html2 = "<div class=\"list-h\">" + html2 + "</div>";
            $('#promotionData').html(html2);
            log('R5', 'Show');
        } else {
            $('#promotion').hide();
        }
        RecommendTag.init();
    }
}
//过渡页促销icon显示
var RecommendTag = {
    init: function() {
        var skus = "";
        var arr1 = $("#promotionData dl dd span");
        var arr2 = $("#similarData dl dd span");
        var arr = $.merge($.makeArray(arr1), $.makeArray(arr2));
        $.each(arr, function(i, v) {
            if ($(v).attr('sku') != undefined && $(v).attr('sku') != "" && $(v).attr('sku').length > 0) {
                skus += 'J_' + $(v).attr('sku') + ',';
            }
        });
        this.skuids = skus;
        this.ShowTag();
    },
    ShowTag: function() {
        var _this = this;
        var param = {
            skuids: _this.skuids,
            callback: 'RecommendTag.ShowTags'
        };
        $.ajax({
            url: 'http://ad.3.cn/flags/mgets',
            data: param,
            cache: true,
            dataType: 'script',
            success: function(r) {
            }
        });
    },
    ShowTags: function(r) {
        if (!r) { return; }
        var pInfo;
        for (var i = 0; i < r.length; i++) {
            pInfo = "";
            for (var j = 0; j < r[i].pf.length; j++) {
                switch (r[i].pf[j]) {
                    case 1:
                        pInfo += "<a class=\"pt1\" title=\"\u672c\u5546\u54c1\u6b63\u5728\u964d\u4ef7\u9500\u552e\u4e2d\">\u76f4\u964d</a>";
                        break;
                    case 2:
                        pInfo += "<a class=\"pt2\" title=\"\u8d2d\u4e70\u672c\u5546\u54c1\u9001\u8d60\u54c1\">\u8d60\u54c1</a>";
                        break;
                    case 3:
                        pInfo += "<a class=\"pt3\" title=\"\u8d2d\u4e70\u672c\u5546\u54c1\u8fd4\u4f18\u60e0\u5238\">\u8fd4\u5238</a>";
                        break;
                    case 4:
                        pInfo += "<a class=\"pt4\" title=\"\u8d2d\u4e70\u672c\u5546\u54c1\u9001\u79ef\u5206\">\u9001\u79ef\u5206</a>";
                        break;
                    default:
                        return;
                }
            }
            $("#p" + r[i].pid).html(pInfo);
        }
    }
};
//-----商品订单页面，推荐显示---begin-------------------------------------
function OrderPageRe() {
    var InWids = "";
    var Wids = $('#jdhome_orderlist_recproduct').text().replace(/'/g, "");
    if (this.location.hostname.toLowerCase().indexOf('jd2008', 0) >= 0) {
        $("a[clstag$='click|keycount|orderinfo|order_product']").each(function(i, o) {
            if (i >= 4) { return false; }
            var being = o.href.lastIndexOf("/") + 1;
            var end = o.href.lastIndexOf(".");
            InWids += o.href.substring(being, end) + ",";
            return true;
        })
        InWids = InWids.substring(0, InWids.length - 1)
    }
    else {
        var arrWids = Wids.split(",");
        if (arrWids.length > 0) {
            if (arrWids.length >= 4) {
                for (var j = 0; j < 5; j++) {
                    InWids = InWids + arrWids[j] + ",";
                }
            }
            else {
                for (var j = 0; j < arrWids.length; j++) {
                    InWids = InWids + arrWids[j] + ",";
                }
            }
            InWids = InWids.substring(0, InWids.length - 1)
        }
    }
    $.getJSONP("http://prs." + RecRecommendCorrentDomain + "/OrderRe.aspx?ip=" + getCookie("ipLocation") + "&wids=" + InWids + "&callback=OrderRecommandWarePage", OrderRecommandWarePage);
}
OrderRecommandWarePage = function(json) {
    if (json != undefined && json != null && json != "" && json.length > 0) {
        OrderRecommandWarePageHtml(json);
        log('DDR', 'Show');
        //log(GetFirstType() + '&Buy', 'Show');
    }
}
function OrderRecommandWarePageHtml(json) {
    var Wids = $('#jdhome_orderlist_recproduct').text().replace(/'/g, "");
    var Order_end = json.length - 1;
    var html = "";
    html += "<div class=\"mt\">";
    if (Wids.length >= 1) {
        html += "<h2>\u6839\u636e\u60a8\u7684\u8d2d\u4e70\u8bb0\u5f55\uff0c\u6211\u4eec\u4e3a\u60a8\u63a8\u8350</h2>";
    }
    else {
        html += "<h2>\u60a8\u53ef\u80fd\u611f\u5174\u8da3\u7684\u5546\u54c1</h2>";
    }
    html += "<div class=\"extra\">";
    html += "<a target=\"_blank\" href='http://my." + RecRecommendCorrentDomain + "/personal/guess.html' clstag='click|keycount|rorder|persmore'>\u4eca\u65e5\u4e3a\u60a8\u63a8\u8350</a>";
    html += "</div>";
    html += "</div>";
    html += "<div class=\"mc\">";
    html += "<div class=\"reco-l\" id=\"brands-left\">";
    html += "<div></div>";
    html += "</div>";
    html += "<div class=\"i-reco\" id=\"reco-list\">";
    html += "<ul class=\"list-h\">";
    var userbuy = getCookie("_ghis");
    if (userbuy == null) {
        userbuy = "";
    }
    var userbuytype = getCookie("_ghit");
    if (userbuytype == null) {
        userbuytype = "";
    }
    for (var i = 0; i <= Order_end; i++) {
        if (Wids.indexOf(json[i].Wid) < 0) {
            if ((userbuytype.indexOf(',' + json[i].ThridType + ',') < 0) || (userbuytype.indexOf('.' + json[i].ThridType + '.') < 0)) {
                if (userbuy.indexOf(',' + json[i].Code + ',') < 0) {
                    html += "<li onclick = 'reClick(\"DDR\",\"\",\"" + json[i].Wid + "\",\"" + i + "\")'>";
                    html += "<div class=\"p-img\"><a href=" + json[i].WidStr + " title=\"" + json[i].Wname + "&#13;" + json[i].Promotitle + "\" target=\"_blank\"><img width=\"160\" height=\"160\" src=" + json[i].ImageUrl + "  onerror=\"this.src='http://www." + RecRecommendCorrentDomain + "/images/none/none_150.gif'\" alt=\"" + json[i].Wname + "\"/></a></div>";
                    html += "<div class=\"p-name\"><a href=" + json[i].WidStr + " title=\"" + json[i].Wname + "&#13;" + json[i].Promotitle + "\" target=\"_blank\">" + json[i].Wname + json[i].Promotitle + "</a></div>";
                    html += "<div class=\"p-price\">\u4eac\u4e1c\u4ef7\uff1a<strong>\uffe5" + json[i].WMeprice + "</strong></div>";
                    html += "</li>";
                }
            }
        }
    }
    html += "</ul>";
    html += "</div>";
    html += "<div class=\"reco-r\" id=\"brands-right\">";
    html += "<div></div>";
    html += "</div>";
    html += "</div>";
    $('#reco').html(html);
    $('#reco').show();
    $("#reco-list").jdMarquee({
        deriction: "left",
        auto: true,
        width: 704,
        height: 250,
        step: 4,
        speed: 4,
        delay: 10,
        control: true,
        _front: "#brands-right",
        _back: "#brands-left"
    });
}
// -----分类列表页新用户推荐---begin---------------
function ListRecP(pwid, keyword) {
    if (keyword == null && keyword == undefined) {
        keyword = "";
    }
    $.getJSONP("http://simigoods." + RecRecommendCorrentDomain + "/FirstOrderRec.aspx?ip=" + getCookie("ipLocation") + "&pwid=" + pwid + "&keyword=" + keyword + "&callback=ListRecPCallback",
        ListRecPCallback
    );
}
ListRecPCallback = function(json) {
    if (json != undefined && json != "" && json.length == 3) {
        $("#hotsale").fadeOut(function() { $("#hotsale").replaceWith(json).fadeIn() });
        log('NR', 'Show');
    }
}
//我的京东改版后“猜你喜欢”的推荐--------start-------------------------------------
function GuessYouLike() {
    $.getJSON("http://prs." + RecRecommendCorrentDomain + "/GuessYouLike.aspx?ip=" + getCookie("ipLocation") + "&jsoncallback=?",
    function(json) {
        GuessYouLikeCallback(json)
    })
}
GuessYouLikeCallback = function(json) {
    if (json != undefined && json != "" && json.length > 0) {
        $("#GuessLike").html(json);
        log('R3', 'Show', 12);
        $("#GuessLike").jdMarquee({
            deriction: "left",
            width: 548,
            height: 183,
            step: 4,
            speed: 4,
            delay: 10,
            control: true,
            _front: "#recoright01",
            _back: "#recoleft01"
        });
    }
}
//初始化方法
Init = function() {
    if ($('#jdhome_orderlist_recproduct').length != 0) {
        OrderPageRe();
    }
}
Init();

/**
 * ThridRec.js
 * From: http://simigoods.360buy.com/js/ThridRec.js
 * Date: 2013-12-25 13:30:17
 */
function recGetDomain() {
    var RecCurrentUrl = location.href;
    if (/360buy\.com/.test(RecCurrentUrl)) {
        return "jd.com";
    };
    if (/jd\.com/.test(RecCurrentUrl)) {
        return "jd.com";
    };
};
reCookieName = "reWidsThirdRec";
var RecRecommendCorrentDomain = recGetDomain();
var wids = "";
var atthref = "http://my." + RecRecommendCorrentDomain + "/personal/guess.html";
function readPinCookie(name)//读取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return arr[2]; return '';
};
callback1 = function(data) {
    ;
};
log = function(type1, type2, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
    var loguri = "http://csc." + RecRecommendCorrentDomain + "/log.ashx?type1=$type1$&type2=$type2$&data=$data$&pin=$pin$&referrer=$referrer$&jinfo=$jinfo$&callback=?";
    var data = '';
    for (i = 2; i < arguments.length; i++) {
        data = data + arguments[i] + '|||';
    };
    var url = loguri.replace(/\$type1\$/, escape(type1));
    url = url.replace(/\$type2\$/, escape(type2));
    url = url.replace(/\$data\$/, escape(data));
    url = url.replace(/\$pin\$/, escape(decodeURIComponent(readPinCookie("pin"))));
    url = url.replace(/\$referrer\$/, escape(document.referrer));
    url = url.replace(/\$jinfo\$/, escape(''));
    $.getJSON(
            url,
            callback1
        );
    var traceurl = ("https:" == document.location.protocol ? "https://mercuryssl" : "http://mercury") + ".jd.com/log.gif"
                + "?t=other.000000"
                + "&m=UA-J2011-1"
                + "&v=" + encodeURIComponent('t1=' + type1 + '$t2=' + type2 + '$p0=' + data)
                + "&ref=" + encodeURIComponent(document.referrer)
                + "&rm=" + (new Date).getTime();
    var d = new Image(1, 1);
    d.src = traceurl;
};
function skutype(b) {
    if (b) {
        var a = b.toString().length;
        return a == 10 ? 1 : 0;
    }
    return 0;
};
function clsPVAndShowLog(wpid, psku, markId, op) {
    var key = wpid + "." + markId + "." + skutype(psku) + "." + op;
    log('d', 'o', key);
};
function clsClickLog(wpid, psku, rsku, markId, num, reCookieName) {
    var key = wpid + "." + markId + "." + skutype(psku);
    appendCookie(reCookieName, rsku, key);
    log('d', 'o', key + ".c");
};
function appendCookie(reCookieName, sku, key) {
    var reWidsCookies = eval("(" + getCookie(reCookieName) + ")");
    if (reWidsCookies == null || reWidsCookies == "") {
        reWidsCookies = new Object();
    };
    if (reWidsCookies[key] == null) {
        reWidsCookies[key] = "";
    };
    var pos = reWidsCookies[key].indexOf(sku);
    if (pos < 0) {
        reWidsCookies[key] = reWidsCookies[key] + "," + sku;
    };
    setCookie(reCookieName, $.toJSON(reWidsCookies), 15);
};
function reClick2(type2, pwid, sku, num) {
    var reWidsClubCookies = eval('(' + getCookie(reCookieName) + ')');
    if (reWidsClubCookies == null || reWidsClubCookies == '') {
        reWidsClubCookies = new Object();
    };
    if (reWidsClubCookies[type2] == null) {
        reWidsClubCookies[type2] = '';
    };
    var pos = reWidsClubCookies[type2].indexOf(sku);
    if (pos < 0) {
        reWidsClubCookies[type2] = reWidsClubCookies[type2] + "," + sku;
    };
    setCookie(reCookieName, $.toJSON(reWidsClubCookies), 15);
    sku = sku.split("#");
    log(3, type2, sku[0]);
    //log('RC', 'CK', type2, pwid, sku[0], num);
};
// 截取固定长度子字符串 sSource为字符串,iLen为截取的长度
function getInterceptedStr(sSource, iLen) {
    if (sSource.replace(/[^\x00-\xff]/ig, "xx").length <= iLen) {
        return sSource;
    };
    var str = ""; var l = 0; var schar;
    for (var i = 0; schar = sSource.charAt(i); i++) {
        l += (schar.match(/[^\x00-\xff]/ig) != null ? 2 : 1);
        if (l < iLen - 1) { str += schar; } else { break; };
    };
    return str + "...";
};
function setCookie(name, value, date)//两个参数，一个是cookie的名子，一个是值
{
    var Days = date; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/;domain=." + RecRecommendCorrentDomain + "";
};
function getCookie(name)//读取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
};
//三级列表页推荐--------start------------------------------------
var Sort = "";
var type = "";
var key = "";
// var BrandId = "";
var referkey="";
function GetKeyWords() {
    var keyword = "";
    var crumb = $(".crumb a");
    var crumbIndex = 3;
    if (crumb.length == 0) {
        crumb = $(".breadcrumb a");
        crumbIndex = 2;
    }
    keyword = $(crumb[crumbIndex]).text()
    return keyword;
};
function ThirdTypeRec() {
    var referstrUrl = this.location.href;
    var referThirdkey = "";
    var referSbegin = referstrUrl.lastIndexOf("/");
    var referSend = referstrUrl.lastIndexOf(".");
    var referstrUrlS = referstrUrl.substring(referSbegin + 1, referSend);
    var referstrUrlSplit = referstrUrlS.split("-");
    for (var i = 3; i < referstrUrlSplit.length - 3; i++) {
        referThirdkey += referstrUrlSplit[i] + "-";
        if (i >= 9)
        { break; }
    };
    referThirdkey = referThirdkey.substring(0, referThirdkey.length - 1);
    referkey=referThirdkey;
    var strUrl = this.location.href;
    var Thirdkey = 0; var ThirdType = 0; var firsttype = 0; var Brand = 0;
    var Sbegin = strUrl.lastIndexOf("/");
    var Send = strUrl.lastIndexOf(".");
    var strUrlS = strUrl.substring(Sbegin + 1, Send);
    var strUrlSplit = strUrlS.split("-");
    ThirdType = strUrlSplit[2]; firsttype = strUrlSplit[0]; Thirdkey = "";
    // Brand = $('#select-brand .content div a[class=curr]').attr("id");
    for (var i = 3; i < strUrlSplit.length - 3; i++) {
        Thirdkey += strUrlSplit[i] + "-";
        if (i >= 9)
        { break; }
    };
    Thirdkey = Thirdkey.substring(0, Thirdkey.length - 1);
    if (Thirdkey == "0-0-0-0-0-0-0") {
        Thirdkey = "";
    };
    var r = /^\+?[1-9][0-9]*$/;
    if (r.test(firsttype) && r.test(ThirdType)) {
        Sort = firsttype; type = ThirdType; 
        // BrandId = Brand;
    };
    if (params.thirdCatId != undefined) {
        atthref = "http://my." + RecRecommendCorrentDomain + "/product/likes.html?tid=" + params.thirdCatId;
    };
    key = Thirdkey;
    log(Sort + "&ThirdPage", 'Show');
};
function ischoiceonetag() {
    if ($('#finalbuy div').length > 0) {
        var data = $($('#finalbuy ul li .p-img').find('a')[0]).attr('href');
        var a = data.split('/')[data.split('/').length - 1];
        var b = a.split('.');
        wids = b[0];
        atthref = "http://my." + RecRecommendCorrentDomain + "/product/likes.html?id=" + wids;
        $($('#finalbuy .more').find('a')[0]).attr("href", atthref);
    };
};
ThirdTypeRec();
function verifyPrice(price) {
    if (!price || price == '') {
        return price;
    }
    var result;
    var i = price.toString().split('.');
    if (i.length == 1) {
        result = i[0] + '.' + '00';
    }
    else if (i.length == 2) {
        if (i[1].length == 1) {
            result = i[0] + '.' + i[1] + '0';
        }
        else if (i[1].length == 2) {
            result = price;
        }
        else if (i[1].length > 2) {
            result = i[0] + '.' + i[1].substring(0, 2);
        }
    }
    return result;
};
var listRank_TPL = '<ul class="tabcon">'
                    + ' {for item in data }'
                    + '     <li {if parseInt(item_index) == 0} class="fore fore1" {/if} {if parseInt(item_index) == 1} class="fore2" {/if} {if parseInt(item_index) == 2} class="fore3" {/if} onclick="clsClickLog(\'\', \'\', \'${item.sku}\', 31, ${parseInt(item_index)+1}, \'rodGThirdRec\');Recommend.newImage(\'${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}\', true);"><span>${parseInt(item_index)+1}</span>'
                    + '         {if parseInt(item_index) == 0}'
                    + '             <div class="p-img">'
                    + '             <a href="http://item.jd.com/${item.sku}.html" title="${item.t}" target="_blank"><img src="${pageConfig.FN_GetImageDomain(item.sku)}n5/${item.img}" width="50" height="50" data-img="1" /></a>'
                    + '             </div>'
                    + '         {else}'
                    + '             <div class="p-img" style="display: none;">'
                    + '             <a href="http://item.jd.com/${item.sku}.html" title="${item.t}" target="_blank"><img src="${pageConfig.FN_GetImageDomain(item.sku)}n5/${item.img}" width="50" height="50" data-img="1" /></a>'
                    + '             </div>'
                    + '         {/if}'
                    + '     <div class="p-name"><a href="http://item.jd.com/${item.sku}.html" target="_blank">${item.t}</a></div>'
                    + '     {if parseInt(item_index) == 0}'
                    + '         {if parseInt(item.jp) <= 0 || item.jp == \"\"}'
                    + '             <div class="p-price"><strong>暂无报价</strong></div>'
                    + '         {else}'
                    + '             <div class="p-price"><strong>￥${verifyPrice(item.jp)}</strong></div>'
                    + '         {/if}'
                    + '     {else}'
                    + '         {if parseInt(item.jp) <= 0 || item.jp == \"\"}'
                    + '             <div class="p-price" style="display: none;"><strong>暂无报价</strong></div>'
                    + '         {else}'
                    + '             <div class="p-price" style="display: none;"><strong>￥${verifyPrice(item.jp)}</strong></div>'
                    + '         {/if}'
                    + '     {/if}'
                    + ' </li>'
                    + ' {/for}'
                    + '</ul>';                          
var Recommend = {
    init: function(BrandId, locId, loc, c3) {
        this.BrandId = BrandId;
        this.locId = locId;
        this.loc = loc;
        this.c3 = c3;
        this.pin = readCookie('pin');
        this.pid = locId === null ? 1 : locId.split('-')[0];
        var __jda = readCookie('__jda');
        if (__jda) {
            if (__jda.split('.')[1] == '-') {
                this.uuid = -1;
            } else {
                this.uuid = __jda.split('.')[1];
            }
        } else {
            this.uuid = -1;
        }
        if (this.BrandId > 0) {
            this.getNewBuyBuy();
        }
    },
    newImage: function(src, random, callback) {
        var img = new Image();
        src = random ? (src + '&random=' + Math.random() + '' + (new Date)) : src;
        img.setAttribute('src', src);
        img.onload = function() {
             if (typeof callback !== 'undefined') {
                callback(src);
            }
        };
    },
    getNewBuyBuy: function() {
        var _this = this;
        var param = {
            p: 503000,      // 买了又买了
            hi: "bid:" + _this.BrandId,
            c3: _this.c3,
            lid: _this.pid,
            lim: 10,
            uuid: _this.uuid,
            ec: 'utf-8',
            callback: 'Recommend.setNewRank'
        };
        if (this.pin) {
            param.pin = this.pin;
        }
        $.ajax({
            url: 'http://diviner.jd.com/diviner',
            data: param,
            dataType: 'script',
            cache: true,
            success: function(r) {
            }
        });
    },
    setNewRank: function(r) {
        var desElement = $('#weekRank');
        if (!r || !r.success || r.data.length < 1) {
            return;
        };
        desElement.show().find('.mc').html(listRank_TPL.process(r));
        this.newImage(r.impr+"&m=UA-J2011-1&ref="+encodeURIComponent(document.referrer));
        weekRank2Effect();
    }
};
function recstrip_tags (input, allowed) {
    allowed = (((allowed ||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';  
    });
}
function getTitle(object) {
    var skuids = "";
    object.each(function() {
        skuids += $(this).attr("sku_c") + ",";
    });
    skuids=skuids.substring(0,skuids.length-1);
    $.getJSONP('http://jprice.jd.com/adslogan/'+skuids + '-GetRecommendwsmentsCallback.ad');
};
var GetRecommendwsmentsCallback = function(json) {
    if (json.AdWordList) {
        for ( var i = 0; i < json.AdWordList.length; i++) {
            var object = $("#finalbuy .mc ul li[sku_c='" + json.AdWordList[i].wid + "']"), adTitle = json.AdWordList[i].waretitle;
            if (object.length) {
                object.find(".rate").find("a").append('<font name='+json.AdWordList[i].wid+' class="adwords" style="color: #ff0000">' + recstrip_tags(adTitle) + '</font>');
                object.find(".p-img").find("img").attr("title",recstrip_tags(adTitle));
                object.find(".rate").find("a").attr("title",recstrip_tags(adTitle));
            }
        }
    }
};
var FilterNoResults_TPL="<div class=\"mt\"><h2>降价促销商品推荐</h2></div>"
                        +"<ul class=\"list-h\">"
                        +   "{for item in data}"
                        +       "<li onclick=\"clsClickLog('', '', '${item.sku}', 32,'${item_index}', 'rodGThirdRec');Recommend.newImage('${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}', true);\">"
                        +           "<div class=\"p-img\">"
                        +               "<a href='http://item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\"><img src='${pageConfig.FN_GetImageDomain(item.sku)}n2/${item.img}' alt='${item.t}' onerror=\"this.src='http://www.jd.com/images/none/none_150.gif'\"></a>"
                        +           "</div>"
                        +           "<div class=\"p-name\">"
                        +               "<a href='http://item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\">${item.t}</a>"
                        +           "</div>"
                        +           "<div class=\"p-price\"><strong>"
                        +               "{if parseInt(item.jp) <= 0 || item.jp == \"\"}"
                        +                   "暂无报价"
                        +               "{else}"
                        +                   "￥${verifyPrice(item.jp)}"
                        +               "{/if}"
                        +           "</strong></div>"
                        +       "</li>"
                        +   "{/for}"
                        +"</ul>";
var ListViewBuy_TPL = "<div class=\"mt\"></div>"
                    +"<div class=\"mc\">"
                    +   "<ul>"
                    +   "{for item in data}"
                    +       "{if item_index==0}"
                    + "<li class='fore' sku_c='${item.sku}' onclick = 'reClick2(\"${item.c3}&ThirdRec\",\"\",\"${item.sku}\",\"${item_index}\");Recommend.newImage(\"${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}\", true);'>"
                    +           "{else}"
                    + "<li sku_c='${item.sku}' onclick = 'reClick2(\"${item.c3}&ThirdRec\",\"\",\"${item.sku}\",${item_index});Recommend.newImage(\"${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}\", true);'>"
                    +       "{/if}"
                    +           "<div class='p-img'>"
                    +               "<a href='http://item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\"><img width='100' height='100' src='${pageConfig.FN_GetImageDomain(item.sku)}n4/${item.img}' alt='${item.t}'></a>"
                    +           "</div>"
                    +           "<div class='rate'>"
                    +               "{if item.odds > 0}"
                    +                   "<strong>${item.odds}%会买：</strong>"
                    +               "{else}"
                    +               "{/if}"
                    +           "<a href='http://item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\">${item.t}</a>"
                    +           "</div>"
                    +           "<div class='p-price'><strong>"
                    +              "{if parseInt(item.jp) <= 0 || item.jp == \"\"}"
                    +                  "暂无报价"
                    +              "{else}"
                    +                  "￥${verifyPrice(item.jp)}"
                    +              "{/if}"
                    +              "</strong></div>"
                    +           "</li>"
                    +   "{/for}"
                    +   "</ul>"
                    // +   "<div class=\"more\">"
                    // +       "<a target=\"_blank\" title=\"查看更多\" href=\"" + atthref + "\" clstag='click|keycount|recthird|persmore'>查看更多推荐</a>"
                    // +   "</div>"
                    +"</div>";
var ListViewAlsoBuy_TPL="<div class=\"mt\"></div>"
                        +"<div class=\"mc\">"
                        +   "<ul>"
                        +   "{for item in data}"
                        +   "{if item_index==0}"
                        +       "<li class='fore' sku_c='${item.sku}' onclick = 'reClick2(\"${item.c3}&ThirdBuy\",\"\",\"${item.sku}\",\"${item_index}\");Recommend.newImage(\"${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}\", true);'>"
                        +   "{else}"
                        +       "<li sku_c='${item.sku}' onclick = 'reClick2(\"${item.c3}&ThirdBuy\",\"\",\"${item.sku}\",\"${item_index}\");Recommend.newImage(\"${item.clk}&m=UA-J2011-1&ref=${encodeURIComponent(document.referrer)}\", true);'>"
                        +       "{/if}"
                        +           "<div class='p-img'>"
                        +           "<a href='http://item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\">"
                        +               "<img width='100' height='100' src='${pageConfig.FN_GetImageDomain(item.sku)}n4/${item.img}' alt='${item.t}'>"
                        +           "</a>"
                        +       "</div>"
                        +       "<div class='rate'>"
                        +           "<a href='http://item.jd.com/${item.sku}.html' title='${item.t}' target=\"_blank\">${item.t}</font></a>"
                        +       "</div>"
                        +           "<div class=\"p-price\"><strong>"
                        +               "{if parseInt(item.jp) <= 0 || item.jp == \"\"}"
                        +                   "暂无报价"
                        +               "{else}"
                        +                   "￥${verifyPrice(item.jp)}"
                        +               "{/if}"
                        +           "</strong></div>"
                        +       "</li>"
                        +   "{/for}"
                        +   "</ul>"
                        +"</div>";  
var RecommendList = {
    init: function(key, locId, loc, c3) {
        this.key = key;
        this.locId = locId;
        this.loc = loc;
        this.c3 = c3;
        this.pin = readCookie('pin');
        this.pid = locId === null ? 1 : locId.split('-')[0];
        var __jda = readCookie('__jda');
        if (__jda) {
            if (__jda.split('.')[1] == '-') {
                this.uuid = -1;
            } else {
                this.uuid = __jda.split('.')[1];
            }
        } else {
            this.uuid = -1;
        };
            this.getNewViewBuy();  
    },
    initViewAlsoBuy: function(locId, loc, c3) {
        this.locId = locId;
        this.loc = loc;
        this.c3 = c3;
        this.pin = readCookie('pin');
        this.pid = locId === null ? 1 : locId.split('-')[0];
        var skuids = "";
        var skuid="";
        if($("#finalbuy .mc ul li").length>0){
            skuid=$($("#finalbuy .mc ul li").get(0)).attr("sku_c");
            $("#finalbuy .mc ul li").each(function() {
                skuids += $(this).attr("sku_c") + ",";
            });
        };
        this.sku=skuid;
        this.skus=skuids.substring(0,skuids.length-1);
        var __jda = readCookie('__jda');
        if (__jda) {
            if (__jda.split('.')[1] == '-') {
                this.uuid = -1;
            } else {
                this.uuid = __jda.split('.')[1];
            }
        } else {
            this.uuid = -1;
        };
            this.getNewViewAlsoBuy();  
    },
    initFilterNoResults: function(referkey,locId, loc, c3) {
        this.locId = locId;
        this.referkey = referkey;
        this.loc = loc;
        this.c3 = c3;
        this.pin = readCookie('pin');
        this.pid = locId === null ? 1 : locId.split('-')[0];
        var __jda = readCookie('__jda');
        if (__jda) {
            if (__jda.split('.')[1] == '-') {
                this.uuid = -1;
            } else {
                this.uuid = __jda.split('.')[1];
            }
        } else {
            this.uuid = -1;
        };
            this.getFilterNoResults();  
    },
    newImage: function(src, random, callback) {
        var img = new Image();
        src = random ? (src + '&random=' + Math.random() + '' + (new Date)) : src;
        img.setAttribute('src', src);
        img.onload = function() {
             if (typeof callback !== 'undefined') {
                callback(src);
            };
        };
    },
    getNewViewBuy: function() {
        var _this = this;
        var param = {
            p: 504000,
            hi: "uk:" + _this.key,
            c3: _this.c3,
            lid: _this.pid,
            lim: 6,
            uuid: _this.uuid,
            ec: 'utf-8',
            callback: 'RecommendList.setNewViewBuy'
        };
        if (this.pin) {
            param.pin = this.pin;
        };
        $.ajax({
            url: 'http://diviner.jd.com/diviner',
            data: param,
            dataType: 'script',
            cache: true,
            success: function(r) {
            }
        })
    },
    setNewViewBuy: function(r) {
        var desElement = $('#finalbuy');
        if (!r || !r.success || r.data.length < 1) {
            return;
        };  
        desElement.html(ListViewBuy_TPL.process(r));    
        var keyWords = getInterceptedStr(GetKeyWords(), 12);
        $("#finalbuy .mt").html("<h2>浏览<font color=\"red\">" + keyWords + "</font>最终购买</h2>");
        desElement.show();getTitle($("#finalbuy .mc ul li"));
        this.newImage(r.impr+"&m=UA-J2011-1&ref="+encodeURIComponent(document.referrer));     
        RecommendList.initViewAlsoBuy(readCookie('ipLoc-djd'), readCookie('ipLocation'), type); 
    },
    getNewViewAlsoBuy: function() {
        var _this = this;
        var param = {
            p: 504001,
            c3: _this.c3,
            lid: _this.pid,
            lim: 4,
            uuid: _this.uuid,
            ec: 'utf-8',
            callback: 'RecommendList.setNewViewAlsoBuy'
        };
        if (this.pin) {
            param.pin = this.pin;
        };
        if (this.sku) {
            param.sku = this.sku;
        };
        if (this.skus) {
            param.skus = this.skus;
        };
        $.ajax({
            url: 'http://diviner.jd.com/diviner',
            data: param,
            dataType: 'script',
            cache: true,
            success: function(r) {
            }
        })
    },
    setNewViewAlsoBuy: function(r) {
        var desElement = $('#alsobuy');
        if (!r || !r.success || r.data.length < 1) {
            return;
        };  
        desElement.html(ListViewAlsoBuy_TPL.process(r));
        var keyWords = getInterceptedStr(GetKeyWords(), 12);
        $("#alsobuy .mt").html("<h2>浏览<font color=\"red\">" + keyWords + "</font>还购买了</h2>");
        desElement.show();getTitle($("#alsobuy .mc ul li"));
        this.newImage(r.impr+"&m=UA-J2011-1&ref="+encodeURIComponent(document.referrer));
        log(type + "&ThirdBuy", 'Show');
    },
    getFilterNoResults: function() {
        var _this = this;
        var param = {
            p: 503001,
            hi: "uk:" + _this.referkey,
            c3: _this.c3,
            lid: _this.pid,
            lim: 8,
            uuid: _this.uuid,
            ec: 'utf-8',
            callback: 'RecommendList.setFilterNoResults'
        };
        if (this.pin) {
            param.pin = this.pin;
        };
        $.ajax({
            url: 'http://diviner.jd.com/diviner',
            data: param,
            dataType: 'script',
            cache: true,
            success: function(r) {
            }
        })
    },
    setFilterNoResults: function(r) {
        var desElement = $('#co-product');
        if (!r || !r.success || r.data.length < 1) {
            return;
        };  
        desElement.html(FilterNoResults_TPL.process(r));
        desElement.show();
        clsPVAndShowLog("", "", 32, "s");
        this.newImage(r.impr+"&m=UA-J2011-1&ref="+encodeURIComponent(document.referrer));
    }
};
function FilterNoResults(type) {
    RecommendList.initFilterNoResults(referkey,readCookie('ipLoc-djd'), readCookie('ipLocation'), type);
    //FilterNoResultsShow(type);
    clsPVAndShowLog("", "", 32, "p");
};

if (params.thirdCatId != undefined) {
    RecommendList.init(key, readCookie('ipLoc-djd'), readCookie('ipLocation'), params.thirdCatId);
};

if(params.exp_brand != undefined && params.thirdCatId != undefined){
    Recommend.init(params.exp_brand, readCookie('ipLoc-djd'), readCookie('ipLocation'), params.thirdCatId);
}