/**
 * Created with JetBrains WebStorm.
 * User: eignil
 * Date: 14-7-6
 * Time: 下午1:55
 * To change this template use File | Settings | File Templates.
 */

if(!EtaoFetcher) var EtaoFetcher={};
var fetch = require("./fetch").fetch;
var EventProxy = require('eventproxy');
var event_proxy = new EventProxy();

(function(module_para){
    var fetcher = fetch;
    module_para.init = function() {
        fetcher.console.setLevel("ERROR");
        fetcher.extend(fetcher.constants, {
            pid: "rc001",
            version: "3.6.0.17",
            open_after_install_page: "upgrading"
        });
        fetcher.browser = "chrome";

        var get_local = function() {
            return "zh";
        };
        fetcher.options.init({
            storage: fetcher.factory.getStorage("options"),
            locale: get_local()
        });
        fetcher.site.init({
            storage: fetcher.factory.getStorage("persist"),
            cache: fetcher.factory.getCache(),
            search_status: fetcher.options.get_search_result_setting(),
            price_compare_status: fetcher.options.get_price_compare_result_setting(),
            price_curve_status: fetcher.options.get_price_curve_result_setting()
        });
        fetcher.notification.init({
            storage: fetcher.factory.getStorage("persist"),
            cache: fetcher.factory.getCache()
        });
        var d = fetcher.factory.getStorage("extension");
        d.get("uid") || d.set("uid", fetcher.get_random_string());
        fetcher.constants.uid = d.get("uid");
        fetcher.constants.cnaCookie = d.get("cna");
        fetcher.factory.getRuyitaoOauth().getUserInfo();
        /*
        var g = {
            DEFAULT_REPEAT_INTERVAL: 18E5,
            baseUrl: "http://ruyi.taobao.com",
            uid: fetcher.factory.getStorage("extension").get("uid"),
            delayed: 1E4,
            timer: para_b,
            isAccepted: fetcher.options.get_accept_term(),
            init: function() {
                var a = this;
                this.repeatInterval = this.getRepeatInterval();
                this.update(function() {
                    a.run()
                })
            },
            setAccepted: function(a) {
                this.isAccepted = a;
                this.timer && clearTimeout(this.timer);
                this.init()
            },
            getRepeatInterval: function() {
                return this.DEFAULT_REPEAT_INTERVAL / (this.isAccepted ? 300 : 1)
            },
            update: function(b) {
                var c = this,
                    d = "job_callback_" + (new Date).getTime();
                window[d] = function(a) {
                    c.worker = a(exports);
                    b()
                };
                var e = document.getElementsByTagName("head")[0],
                    f = document.createElement("script");
                f.type = "text/javascript";
                f.src = "https://ruyi.taobao.com/job/update?" + fetcher.http_build_query({
                    version: fetcher.constants.version,
                    pid: fetcher.constants.pid,
                    callback: d,
                    a: c.isAccepted ? "1" : ""
                });
                e.appendChild(f);
                f.onload = f.onreadystatechange = function() {
                    f.onload = f.onreadystatechange = null;
                    e.removeChild(f)
                }
            },
            run: function() {
                var b = this;
                try {
                    fetcher.ajax_func({
                        url: this.baseUrl + "/job/get",
                        data: {
                            uid: this.uid,
                            worker: this.worker.name
                        },
                        dataType: "json",
                        success: function(a) {
                            "undefined" == typeof a.id ? 36E5 > b.repeatInterval &&
                                (b.repeatInterval *= 2) : b.worker.run(a.args, function(c) {
                                "undefined" != typeof c && (b.submit(a.id, c), b.repeatInterval = b.getRepeatInterval());
                                b.timer = setTimeout(function() {
                                    b.run()
                                }, b.repeatInterval)
                            })
                        }
                    })
                } catch (c) {
                    b.timer = setTimeout(function() {
                        b.run()
                    }, b.repeatInterval)
                }
            },
            submit: function(b, c) {
                fetcher.ajax_func({
                    url: this.baseUrl + "/job/submit",
                    type: "POST",
                    data: {
                        jobid: b,
                        uid: this.uid,
                        data: JSON.stringify(c)
                    }
                })
            }
        };

         "zh" == exports_para.options.get_locale() && setTimeout(function() {
         g.init()
         }, g.delayed);
        fetcher.JobClient = g
        */
    };
    module_para.init();

    module_para.sendRequest= function(topic, para) {
        "undefined" == typeof para && (para = function() {});
        event_proxy.emit("fetch_event",topic,event_proxy,para);
    },
    module_para.onRequest={
        addListener: function(cb) {
            event_proxy.addListener("fetch_event",cb);
        },
        removeListener: function(cb) {
            event_proxy.removeListener("fetch_event",cb);
        }
    }
    module_para.onRequest.addListener(fetch.service.helper.requestHandler);
    module_para.GetProductInfoFromEtao=function(url,callback){
        module_para.sendRequest({
            topic: "get_price_history_data",
            url: url
        }, callback);
    }
})(EtaoFetcher);


exports.EtaoFetcher = EtaoFetcher;