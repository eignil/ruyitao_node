
//fetch_exports=require("./utility");

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}
if (typeof XMLHttpRequest === "undefined" || XMLHttpRequest === null){
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

window = {};
if (!fetch_exports) var fetch_exports = {};
//construct constants
(function(exports_para) {
    exports_para.constants = {
        open_after_install_page: "always",
        cache_size: 70,
        cache_expire_time: 7200,
        site_config: {
            book: {
                "product.dangdang.com": {
                    index: 1,
                    patterns: [{
                        url: "product.aspx(?:\\?|.+&)product_id=(?:\\d+)",
                        meta: {
                            isbn: [{
                                xpath: ".book_detailed li span",
                                regexp: "I S B N\uff1a(\\w+)"
                            }],
                            author: [{
                                xpath: ".book_detailed p",
                                regexp: "\u4f5c\u3000\u3000\u8005\uff1a[^<]*<a [^>]+>([^<]+)<"
                            }],
                            price: [{
                                xpath: ".book_r .price_d span",
                                regexp: "\uffe5([\\d\\.]+)"
                            }]
                        }
                    }]
                },
                "book.360buy.com": {
                    index: 2,
                    patterns: [{
                        url: ".",
                        meta: {
                            isbn: [{
                                xpath: "#summary li",
                                regexp: "\uff29\uff33\uff22\uff2e\uff1a</span>(\\w+)"
                            }],
                            author: [{
                                xpath: "#summary li",
                                regexp: "\u4f5c\u3000\u3000\u8005\uff1a[\\s\\S]+?<a [^>]+>(?:\\[[^\\]]+\\]\\s*)?([^<]+)<"
                            }],
                            price: [{
                                xpath: "#priceinfo",
                                regexp: "([\\d\\.]+)"
                            }]
                        }
                    }]
                },
                "book.douban.com": {
                    index: 3,
                    patterns: [{
                        url: ".",
                        meta: {
                            isbn: [{
                                xpath: "#info",
                                regexp: "ISBN:</span>\\s+(\\w+)"
                            }],
                            author: [{
                                xpath: "#info",
                                regexp: "\u4f5c\u8005</span>[^<]+<a [^>]+>(?:\\[[^\\]]+\\]\\s*)?([^<]+)<"
                            }],
                            price: [{
                                xpath: "#info",
                                regexp: "\u5b9a\u4ef7:</span>\\s*([\\d\\.]+)"
                            }]
                        }
                    }]
                },
                "www.amazon.cn": {
                    index: 4,
                    patterns: [{
                        url: /(\/(?:dp|dp\/product|-|o\/asin|ASIN|gp\/product)\/+([0-9A-Za-z]{10})(\/|\?|$|%3F|#)|asin=([0-9A-Za-z]{10}))/,
                        meta: {
                            isbn: [{
                                xpath: "table .content li",
                                regexp: "ISBN:</b>\\s+(\\w+)"
                            }],
                            author: [{
                                xpath: "#handleBuy .buying",
                                regexp: "<a[^>]+>([^<]+)</a> \\(\u4f5c\u8005\\)"
                            }],
                            price: [{
                                xpath: ".priceLarge",
                                regexp: "([\\d\\.]+)"
                            }]
                        }
                    }]
                },
                "item.taobao.com": {
                    index: 5,
                    patterns: [{
                        url: ".",
                        meta: {
                            isbn: [{
                                xpath: "#attributes .attributes-list",
                                regexp: "ISBN[^><]*?:&nbsp;(\\w+)"
                            }],
                            author: [{
                                xpath: "#attributes .attributes-list",
                                regexp: "\u4f5c\u8005:&nbsp;([^<]+?)(?:\\s*\u8457)?<"
                            }],
                            price: [{
                                xpath: "#J_StrPriceModBox",
                                regexp: "([\\d.]+)"
                            }]
                        }
                    }]
                },
                "item.tmall.com": {
                    index: 5,
                    patterns: [{
                        url: ".",
                        meta: {
                            isbn: [{
                                xpath: "#attributes .attributes-list",
                                regexp: "ISBN[^><]*?:&nbsp;(\\w+)"
                            }],
                            author: [{
                                xpath: "#attributes .attributes-list",
                                regexp: "\u4f5c\u8005:&nbsp;([^<]+?)(?:\\s*\u8457)?<"
                            }],
                            price: [{
                                xpath: "#J_StrPriceModBox",
                                regexp: "([\\d.]+)"
                            }]
                        }
                    }]
                }
            },
            product: {
                "360buy.com": 1,
                "99read.com": 1,
                "amazon.cn": 1,
                "beifabook.com": 1,
                "bookschina.com": 1,
                "bookuu.com": 1,
                "china-pub.com": 1,
                "coo8.com": 1,
                "dangdang.com": 1,
                "newegg.com.cn": 1,
                "tao3c.com": 1,
                "icson.com": 1,
                "51buy.com": 1,
                "suning.com": 1,
                "taobao.com": ["http://item.taobao.com/auction/item_detail", "http://item.taobao.com/item.htm"],
                "tmall.com": ["http://item.tmall.com/item.htm", "http://list.3c.tmall.com/spu-", "http://spu.tmall.com/spu-", "http://detail.tmall.com"]
            },
            search: {
                zh: {
                    "taobao.com": {
                        ruyi: [{
                            d: "&",
                            k: "testkeyword",
                            s: ""
                        }]
                    },
                    "360buy.com": {
                        search: [{
                            k: "keyword",
                            d: "&",
                            s: ""
                        }]
                    },
                    "dangdang.com": {
                        search: [{
                            k: "key",
                            d: "&",
                            s: ""
                        }, {
                            k: "q",
                            d: "&",
                            s: ""
                        }]
                    },
                    "taobao.com": {
                        list: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        "list.mall": [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        "list.3c": [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        s: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        s8: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        search: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        "try": [{
                            k: "",
                            d: "",
                            s: "J_TrialKeyword",
                            sk: "\u8bf7\u8f93\u5165\u641c\u7d22\u6761\u4ef6"
                        }]
                    },
                    "tmall.com": {
                        list: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        "list.3c": [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        "list.xie": [{
                            k: "q",
                            d: "&",
                            s: ""
                        }]
                    }
                },
                en: {
                    "taoassistant.com": {
                        DUMMY: [{
                            d: "&",
                            k: "testkeyword",
                            s: ""
                        }]
                    },
                    "ebay.com": {
                        "search.half": [{
                            k: "",
                            d: "",
                            s: "query"
                        }],
                        shop: [{
                            k: "_nkw",
                            d: "&",
                            s: ""
                        }]
                    },
                    "google.com": {
                        www: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }, {
                            k: "q",
                            d: "&",
                            s: ""
                        }, {
                            k: "query",
                            d: "&",
                            s: ""
                        }],
                        books: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        encrypted: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }, {
                            k: "query",
                            d: "&",
                            s: ""
                        }]
                    },
                    "bing.com": {
                        www: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }],
                        DUMMY: [{
                            k: "q",
                            d: "&",
                            s: ""
                        }]
                    },
                    "barnesandnoble.com": {
                        productsearch: [{
                            k: "WRD",
                            d: "&",
                            s: ""
                        }]
                    },
                    "fatwallet.com": {
                        www: [{
                            k: "query",
                            d: "&",
                            s: ""
                        }, {
                            k: "search",
                            d: "&",
                            s: ""
                        }]
                    },
                    "slickdeals.net": {
                        DUMMY: [{
                            k: "search",
                            d: "&",
                            s: ""
                        }, {
                            k: "q",
                            d: "&",
                            s: ""
                        }]
                    },
                    "bestbuy.com": {
                        www: [{
                            k: "st",
                            d: "&",
                            s: ""
                        }, {
                            k: "searchterm",
                            d: "&",
                            s: ""
                        }]
                    },
                    "walmart.com": {
                        www: [{
                            k: "search_query",
                            d: "&",
                            s: ""
                        }, {
                            k: "redirect_query",
                            d: "&",
                            s: ""
                        }]
                    }
                }
            },
            movie: {
                "movie.douban.com": [{
                    patterns: [{
                        list: "#subject_list",
                        img: ".item a.nbg>img",
                        a: ".item a.nbg"
                    }],
                    url: "movie.douban.com/.+$"
                }, {
                    patterns: [{
                        list: "body",
                        img: ".item a>img",
                        a: ".item a"
                    }],
                    url: "movie.douban.com/$"
                }]
            },
            detail_info: {}
        }
    }
})(fetch_exports);

fetch_exports || (fetch_exports = {});
(function(exports_para) {
    exports_para.localStorage = {
        getItem: function(c) {
            return localStorage.getItem(c)
        },
        setItem: function(c, b) {
            return localStorage.setItem(c, b)
        },
        hasItem: function(c) {
            return null !== localStorage.getItem(c)
        },
        removeItem: function(c) {
            return localStorage.removeItem(c)
        },
        each: function(c) {
            for (var b = localStorage.length; b--;) {
                var a = localStorage.key(b);
                c(a, localStorage.getItem(a))
            }
        }
    };
    exports_para.storage = function(c, b) {
        this.setNamespace(c);
        this.setStorage(b)
    };
    exports_para.storage.prototype = {
        seperator: "/",
        setStorage: function(g) {
            this.storage =
                "undefined" == typeof g ? exports_para.localStorage : g
        },
        getStorage: function() {
            return this.storage
        },
        setNamespace: function(c) {
            this.namespace = String(c || "")
        },
        getNamespace: function() {
            return this.namespace
        },
        getKey: function(c) {
            return (this.namespace ? this.namespace + this.seperator : this.namespace) + c
        },
        has: function(c) {
            return this.storage.hasItem(this.getKey(c))
        },
        get: function(c) {
            return this.storage.getItem(this.getKey(c))
        },
        set: function(c, b) {
            return this.storage.setItem(this.getKey(c), b)
        },
        remove: function(c) {
            return this.storage.removeItem(this.getKey(c))
        },
        has_object: function(c) {
            return this.has(c)
        },
        get_object: function(c) {
            c = this.get(c);
            try {
                return "string" == typeof c ? JSON.parse(c) : null
            } catch (b) {
                return null
            }
        },
        set_object: function(c, b) {
            return this.set(c, JSON.stringify(b))
        },
        remove_object: function(c) {
            return this.remove(c)
        },
        clear: function() {
            var c = this;
            this.each(function(b) {
                c.remove(b)
            })
        },
        each: function(c) {
            var b = this.getKey("");
            this.storage.each(function(a) {
                0 == a.indexOf(b) && c(a.substr(b.length))
            })
        },
        keys: function() {
            var c = [];
            this.each(function(b) {
                c.push(b)
            });
            return c
        }
    }
})(fetch_exports);

fetch_exports || (fetch_exports = {});
(function(log_para) {
    for (var g = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR"], b = {}, a = 0; a < g.length; a++) b[g[a]] = a;
    var e = b.WARN;
    log_para.console = {
        setLevel: function(d) {
            d in b && (e = b[d])
        },
        getLevel: function() {
            return g[e]
        },
        log: function(d) {
            console.log(d)
        },
        trace: function(d) {
            f(d, b.TRACE)
        },
        debug: function(d) {
            console.log(Array.prototype.slice.call(arguments).concat([b.DEBUG]))
            //f.apply(window, Array.prototype.slice.call(arguments).concat([b.DEBUG]))
        },
        info: function(d) {
            f(d, b.INFO)
        },
        warn: function(d) {
            f(d, b.WARN)
        },
        error: function(d) {
            f(d, b.ERROR)
        }
    };
    var f = function(d) {
        var a = arguments[arguments.length - 1];
        if (a >=
            e) {
            var temp_data = new Date,
                f = function(d) {
                    return (10 > d ? "0" : "") + d
                }, d = temp_data.getFullYear() + "-" + f(temp_data.getMonth() + 1) + "-" + f(temp_data.getDate()) + " " + f(temp_data.getHours()) + ":" + f(temp_data.getMinutes()) + ":" + f(temp_data.getSeconds()) + " [" + g[a] + "]" + d,
                temp_data = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            switch (a) {
                case b.trace:
                    console.trace(d);
                    break;
                case b.DEBUG:
                    console.debug.apply(console, temp_data);
                    break;
                case b.INFO:
                    console.info(d);
                    break;
                case b.WARN:
                    console.warn(d);
                    break;
                case b.ERROR:
                    console.error(d)
            }
        }
    }
})(fetch_exports);

//cache
fetch_exports || (fetch_exports = {});
(function(exports_para) {
    exports_para.cache = function(g) {
        g = g || {};
        this.max_size = g.max_size || 50;
        this.expire_time = g.expire_time || 3600;
        this.storage = g.storage || new exports_para.storage("cache");
        this.fill_factor = g.fill_factor || 0.62;
        this._count = 0
    };
    exports_para.cache.prototype = {
        has: function(c) {
            return null != this._get_item(c)
        },
        get: function(g) {
            var b = this._get_item(g),
                a = exports_para.console || {
                    debug: function() {}
                };
            if (null != b) return a.debug("CACHE hit " + g), b.value;
            a.debug("CACHE miss " + g);
            return null
        },
        set: function(c, b, a) {
            if (null == c || "" == c) throw Error("key cannot be null or empty");
            "undefined" == typeof a && (a = {});
            "undefined" == typeof a.expire_time && (a.expire_time = this.expire_time);
            a.expire_time = (new Date).getTime() + 1E3 * a.expire_time;
            this.storage.has_object(c) || this._count++;
            this.storage.set_object(c, {
                value: b,
                key: c,
                options: a
            });
            0 < this.max_size && this._count > this.max_size && this._purge()
        },
        clear: function() {
            this.storage.clear()
        },
        remove: function(c) {
            if (this.storage.has_object(c)) {
                var b = this.storage.get_object(c);
                this.storage.remove_object(c);
                0 < this._count && this._count--;
                null != b.options.callback &&
                setTimeout(function() {
                    b.options.callback(b.key, b.value)
                }, 0)
            }
        },
        _is_expired: function(c) {
            return c.options.expire_time && c.options.expire_time < (new Date).getTime()
        },
        _get_item: function(c) {
            var b = this.storage.get_object(c);
            null != b && ("undefined" == typeof b.options ? (this.storage.remove_object(c), b = null) : this._is_expired(b) && (this.remove(c), b = null));
            return b
        },
        _purge: function() {
            var c = Math.floor(this.max_size * this.fill_factor);
            if (!(0 >= c) && (c = this._count - c, !(0 >= c))) {
                var b = [];
                this.storage.each(function(d) {
                    b.push(d)
                });
                for (var a, e, f = b.length - 1; f; f--) a = Math.floor(Math.random() * f + 1), e = b[f], b[f] = b[a], b[a] = e;
                for (a = 0; a < c; a++) this.remove(b[a])
            }
        }
    }
})(fetch_exports);
//site info
fetch_exports || (fetch_exports = {});
(function(exports_para, g) {
    exports_para.site = {
        cache: g,
        storage: g,
        key_config: "site_config",
        key_status: "site_status",
        loading_status: -1,
        next_try_time: g,
        search_default_status: !1,
        price_compare_default_status: !0,
        price_curve_default_status: !1,
        price_compare_default_status_false_sites: ["taobao.com", "tmall.com"],
        init: function(b) {
            b = b || {};
            this.storage = b.storage;
            this.cache = b.cache;
            this.search_default_status = !! b.search_status;
            this.price_compare_default_status = !! b.price_compare_status;
            this.price_curve_default_status = !! b.price_curve_status
        },
        getConfig: function(b, a) {
            var e = this.cache,
                f = exports_para.options.get_locale(),
                d = this,
                j;
            0 == this.loading_status && (this.next_try_time && this.next_try_time < (new Date).getTime()) && (this.loading_status = -1); - 1 == this.loading_status && (e.has(this.key_config) ? (exports_para.constants.site_config = e.get(this.key_config), this.loading_status = 1) : (this.loading_status = 0, exports_para.ajax_func({
                url: exports_para.options.get_api_url() + "/ext/siteconfig",
                data: {
                    locale: f,
                    version: exports_para.constants.version,
                    pid: exports_para.constants.pid,
                    uid: exports_para.constants.uid
                },
                success: function(b, j, f) {
                    d.loading_status =
                        1;
                    exports_para.constants.site_config = b;
                    e.set(d.key_config, b);
                    a && a.success && a.success(b, j, f)
                },
                error: function(b, e, j) {
                    exports_para.console.error("get site config failed: " + (e ? "status code(" + e + ")" : j || "Unknown Error"));
                    a && a.error && a.error(b, e, j);
                    d.next_try_time = (new Date).getTime() + (0 == e ? 0 : 6E5)
                }
            })));
            j = exports_para.constants.site_config.search;
            j = j.hasOwnProperty(f) ? j[f] : j.en;
            return j[b]
        },
        getPriceAlertSettingsTip: function() {
            return this.storage.get("price-alert-settings-tip")
        },
        setPriceAlertSettingsTip: function(b) {
            this.storage.set("price-alert-settings-tip",
                b)
        },
        checkAddToWantIntroStatus: function() {
            return this.storage.get("add-to-want-status")
        },
        setAddToWantIntroStatus: function(b) {
            this.storage.set("add-to-want-status", b)
        },
        getExpandTipStatus: function(b) {
            var a = this.storage.get_object("expand-tip-status");
            return a ? a[b] : null
        },
        setExpandTipStatus: function(b, a) {
            var c = this.storage.get_object("expand-tip-status") || {};
            c[b] = a;
            this.storage.set_object("expand-tip-status", c)
        },
        getIvyConfig: function(b) {
            var a = exports_para.constants.site_config.ivy;
            if (a && a[b]) return a[b]
        },
        getSrpConfig: function(b) {
            var a =
                exports_para.constants.site_config.srp;
            if (a && a[b]) return a[b]
        },
        getMovieConfig: function(b) {
            var a = exports_para.constants.site_config.movie;
            if (a && a[b]) return a[b]
        },
        _getStatusKey: function(b) {
            return ("undefined" == typeof b || !b ? "" : b + "_") + this.key_status
        },
        getStatus: function(b, a) {
            var e = "search" == a ? this.search_default_status : this.price_compare_default_status,
                f = this.storage.get_object(this._getStatusKey(a)) || {}, e = "undefined" != typeof f[b] ? f[b] : e;
            return "price_compare" == a && exports_para.elemInArray(b, this.price_compare_default_status_false_sites) &&
                (f = this.storage.get_object("price_compare_status_changed_sites"), !f || f && !exports_para.elemInArray(b, f)) ? !1 : e
        },
        setStatus: function(b, a, e) {
            var f = this._getStatusKey(e),
                d = this.storage.get_object(f) || {};
            d[b] = a;
            this.storage.set_object(f, d);
            "price_compare" == e && exports_para.elemInArray(b, this.price_compare_default_status_false_sites) && ((d = this.storage.get_object("price_compare_status_changed_sites")) ? exports_para.elemInArray(b, d) || d.push(b) : d = [b], this.storage.set_object("price_compare_status_changed_sites", d))
        },
        clearStatus: function(b) {
            b =
                this._getStatusKey(b);
            this.storage.set_object(b, {})
        },
        getPriceCurveStatus: function(b) {
            var a = this.price_curve_default_status,
                c = this._getStatusKey("price_curve"),
                c = this.storage.get_object(c) || {};
            return c[b] !== g ? c[b] : a
        },
        setPriceCurveStatus: function(b, a) {
            var c = this._getStatusKey("price_curve"),
                f = this.storage.get_object(c) || {};
            f[b] = a;
            this.storage.set_object(c, f)
        }
    }
})(fetch_exports);


fetch_exports || (fetch_exports = {});
(function(exports_para, g) {
    var b = {
        _functions: [],
        register: function(b, a) {
            if ("function" == typeof a) return a;
            this._functions.push(new Function(b, a));
            return this._functions.length - 1
        },
        call: function(b) {
            var a = this._functions[b];
            if (a) {
                for (var d = [], c = 1, h = arguments.length; c < h; c++) d.push(arguments[c]);
                return a.apply(null, d)
            }
            throw Error("Undefined function " + b);
        }
    }, real_instant = {
        search_engines: {},
        search_url: function(a) {
            a.Keyword = "gb" == a.encoding ? exports_para.encode.gb2312.encode(a.Keyword) : encodeURIComponent(a.Keyword);
            if ("undefined" != typeof a.urlfunc) {
                var f =
                    "function" == typeof a.urlfunc ? a.urlfunc(a, fetch_exports) : b.call(a.urlfunc, a, fetch_exports);
                f && a.callback(f)
            } else "undefined" != typeof a.url && (a.K = a.Keyword, a.P = a.ItemPage, a.F = exports_para.constants.pid, a.U = exports_para.constants.uid, a.C = exports_para.constants.cnaCookie, f = a.url.replace(/{(\w+)}/g, function(d, b) {
                return "undefined" != typeof a[b] ? a[b] : ""
            }), a.callback(f))
        },
        get_match: function(a, b) {
            if ("function" == typeof b.exec) {
                var d = b.exec(a);
                if (d) return d[1]
            } else {
                if ("function" == typeof b) return b(a);
                if (d = b[0].exec(a)) return d[b[1]]
            }
            return null
        },
        parse_item: function(b,
                             f) {
            var d = {};
            if ("function" == typeof f.valid && !f.valid(b)) return null;
            for (var j in f)
                if ("valid" != j) {
                    var h = real_instant.get_match(b, f[j]) || "";
                    h && "object" == typeof h ? exports_para.extend(d, h) : d[j] = h
                }
            return !d.ASIN ? null : d
        },
        parse: function(b, f) {
            var d = {
                TotalPages: 0,
                Items: []
            };
            if (0 < (d.TotalPages = real_instant.get_match(b, f.total_pages))) {
                for (var j = g, h; null != (h = f.separator.exec(b));) h = h.index, j && (j = b.substr(j, h - j + 1).replace(/\n/g, ""), (j = real_instant.parse_item(j, f.item)) && d.Items.push(j)), j = h;
                j && (j = b.substr(j).replace(/\n/g, ""), (j = real_instant.parse_item(j, f.item)) &&
                    d.Items.push(j))
            } else exports_para.console.debug("page not match");
            return d
        },
        click_url: function(a) {
            return exports_para.options.get_api_url() + "/ext/clickurl?url=" + encodeURIComponent(a) + "&pid=" + exports_para.constants.pid
        },
        add_css_prefix: function(a, b) {
            "undefined" == typeof b && (b = "ruyitao-");
            return a.replace(/class="([^"]+)"/g, function(d, a) {
                for (var a = a.split(/\s+/), c = 0; c < a.length; c++) a[c] = b + a[c];
                return 'class="' + a.join(" ") + '"'
            })
        },
        install: function(e) {
            try {
                if ("undefined" == typeof e.name) throw Error("Search engine name not defined");
                if ("undefined" ==
                    typeof e.urlfunc) {
                    if ("undefined" == typeof e.url) throw Error("Search engine url not defined");
                } else e.urlfunc = b.register("options,fetch_exports", e.urlfunc);
                e.selected = "undefined" == typeof e.selected || 1 == e.selected;
                e.enabled = 1 == e.enabled;
                e.submit_data = 1 == e.submit_data;
                e.order = parseInt(e.order);
                if (e.enabled && "undefined" == typeof e.title) throw Error("Search engine title not defined");
                e.parse = "undefined" == typeof e.parse ? function(d) {
                    return JSON.parse(d)
                } : b.register("html, fetch_exports", e.parse);
                real_instant.search_engines[e.name] =
                    e
            } catch (f) {
                exports_para.console.error("install search engine " + e.name + " failed: " + f.message)
            }
        },
        init: function(b) {
            exports_para.factory.getCache();
            var f = "init_search_" + (new Date).getTime();
            window[f] = function(d) {
                real_instant.search_engines = {};
                for (var c = 0; c < d.length; c++) real_instant.install(d[c]);
                "function" == typeof b && b()
            };
            var d = document.getElementsByTagName("head")[0],
                j = document.createElement("script");
            j.type = "text/javascript";
            j.src = "https://ruyi.taobao.com/ext/searchengines?" + exports_para.http_build_query({
                locale: exports_para.options.get_locale(),
                version: exports_para.constants.version,
                pid: exports_para.constants.pid,
                callback: f
            });
            d.appendChild(j);
            var h = setTimeout(function() {
                real_instant.init()
            }, 6E4);
            j.onload = j.onreadystatechange = function() {
                j.onload = j.onreadystatechange = null;
                d.removeChild(j);
                clearTimeout(h)
            }
        },
        search: function(e, f, d) {
            if ("undefined" == typeof real_instant.search_engines[e]) d.error(null, null, "Unknown search engine");
            else {
                var j = real_instant.search_engines[e];
                f.callback = function(h) {
                    exports_para.ajax_func({
                        url: h,
                        dataType: "text",
                        success: function(c) {
                            var e = c.match(/<meta\s+http-equiv="refresh"\s+content="\d+;url=(http:\/\/.+)"/);
                            e && e[1] ?
                                f.callback(e[1]) : (f.callbacks = {
                                success: function(b) {
                                    d.success(b);
                                    "jingdong" == j.name || "suning" == j.name ? real_instant.parseImagePrice(j.homepage, b.Items, function(d) {
                                        b.Items = d;
                                        real_instant.submit(j, h, b)
                                    }) : real_instant.submit(j, h, b)
                                },
                                error: d.error
                            }, real_instant.options = f, (c = "function" == typeof j.parse ? j.parse(c, fetch_exports) : b.call(j.parse, c, fetch_exports)) && f.callbacks.success(c))
                        },
                        error: d.error
                    })
                };
                j.urlfunc ? f.urlfunc = j.urlfunc : f.url = j.url;
                f.encoding = j.encoding;
                real_instant.search_url(f)
            }
        },
        parseImagePrice: function(a, b, d) {
            if (b)
                for (var j = b.length, h, i = 0, k = 0; k < j; k++) {
                    h = b[k];
                    h = h.Price;
                    if (0 <= h.indexOf("<img") && (h = /<img\s+.*src="(.+png)".*\s*\/>/.exec(h)) && h[1]) {
                        (function(h, k) {
                            exports_para.service.helper.parseImagePrice(a, k, function(a) {
                                a && (b[h].Price = a, exports_para.console.debug("Parsed image price: " + h + " - " + a));
                                i++;
                                i == j && d(b)
                            })
                        })(k, h[1]);
                        continue
                    }
                    i++;
                    i == j && d(b)
                }
        },
        has: function(b) {
            return b in real_instant.search_engines
        },
        get: function(b) {
            return real_instant.search_engines[b]
        },
        submit: function(b, a, d) {
            if (b.submit_data && !("object" != typeof d || "object" != typeof d.Items || "undefined" == typeof d.Items.length || 0 == d.Items.length)) d.source_url =
                a, exports_para.ajax_func({
                url: exports_para.options.get_api_url() + "/ext/submit",
                data: {
                    uid: exports_para.constants.uid,
                    data: JSON.stringify(d)
                },
                type: "post"
            })
        },
        _search_engines: [{
            enabled: !0,
            encoding: "def",
            homepage: "http://www.suning.com",
            host: "suning\\.com",
            locales: "zh",
            name: "suning",
            order: 1010,
            selected: !1,
            title: {
                en: "Suning",
                zh: "\u82cf\u5b81"
            },
            url: "http://ruyi.taobao.com/ext/search?q={K}&seller=suning&page={P}&pid={F}"
        }, {
            enabled: !1,
            encoding: "def",
            locales: "zh",
            name: "product_search",
            order: 1007,
            selected: !0,
            url: "http://ruyi.taobao.com/ext/productSearch?q={K}&pid={F}&u={U}&c={C}"
        }, {
            enabled: !0,
            encoding: "def",
            homepage: "http://www.etao.com",
            host: "",
            locales: "zh",
            name: "etao",
            order: 1021,
            selected: !0,
            title: {
                en: "Etao",
                zh: "\u4e00\u6dd8"
            },
            url: "http://ruyi.taobao.com/ext/etaoSearch?q={K}&application={A}&pid={F}&page={P}&version=3.3.2"
        }, {
            enabled: !0,
            encoding: "def",
            homepage: "http://www.amazon.cn",
            host: "amazon\\.cn",
            locales: "zh",
            name: "amazoncn",
            order: 1002,
            selected: !0,
            title: {
                en: "Amazon Cn",
                zh: "\u4e9a\u9a6c\u900a"
            },
            url: "http://ruyi.taobao.com/ext/search?q={K}&seller=amazon&page={P}&pid={F}"
        }, {
            enabled: !0,
            encoding: "def",
            homepage: "http://www.dangdang.com",
            host: "dangdang\\.com",
            locales: "zh",
            name: "dangdang",
            order: 1005,
            selected: !0,
            title: {
                en: "DangDang",
                zh: "\u5f53\u5f53"
            },
            url: "http://ruyi.taobao.com/ext/search?q={K}&seller=dangdang&page={P}&pid={F}"
        }, {
            enabled: !1,
            encoding: "def",
            locales: "zh",
            name: "amazoncn_book",
            selected: !0,
            url: "http://ruyi.taobao.com/ext/search?q={K}&seller=amazon&page={P}&pid={F}"
        }, {
            enabled: !0,
            encoding: "def",
            homepage: "http://www.jd.com",
            host: "jd\\.com",
            locales: "zh",
            name: "jingdong",
            order: 1004,
            selected: !0,
            title: {
                en: "JingDong",
                zh: "\u4eac\u4e1c"
            },
            url: "http://ruyi.taobao.com/ext/search?q={K}&seller=360buy&page={P}&pid={F}"
        }, {
            enabled: !0,
            encoding: "def",
            homepage: "http://www.tmall.com",
            host: "tmall\\.com",
            locales: "zh",
            name: "taobao",
            order: 1001,
            selected: !0,
            title: {
                en: "Tmall",
                zh: "\u5929\u732b"
            },
            url: "http://ruyi.taobao.com/ext/taobaoSearch?keyword={K}&application={A}&pid={F}"
        }]
    };
    exports_para.SearchEngine = real_instant
})(fetch_exports);

fetch_exports || (fetch_exports = {});
(function(exports_para, g) {
    var b = function(a) {
        var b = g;
        return function() {
            if (b) return b;
            "undefined" == typeof b && (b = a());
            return b
        }
    }, a = {
        init: function(b) {
            b = b || {};
            this.storage = b.storage
        },
        getStorage: function(b) {
            return new exports_para.storage(b, this.storage)
        }
    };
    a.getCache = b(function() {
        var b = new exports_para.cache({
                max_size: exports_para.constants.cache_size,
                expire_time: exports_para.constants.cache_expire_time,
                storage: a.getStorage("cache")
            }),
            f = 0;
        b.storage.each(function() {
            f++
        });
        b._count = f;
        return b
    });
    a.getRuyitaoOauth = b(function() {
        var b = new exports_para.oauth({
            appkey: "1362053493",
            authorize_url: "http://ruyi.taobao.com/my/oauth/authorize",
            resource_url: "http://ruyi.taobao.com/my",
            redirect_url: "http://ruyi.taobao.com/service/access-token-callback.html?app=ruyitao",
            storage: a.getStorage("extension")
        });
        b.getUserInfo = function(a) {
            b.isAuthorized() ? this.request({
                url: "/api/me",
                success: function(d) {
                    d.nick ? (b.setTokenData({
                        nick: d.nick,
                        user_id: d.user_id
                    }), a && a(d)) : d.error && a && a()
                },
                error: function(d, c) {
                    "401" == c && b.removeAccessToken();
                    a && a()
                }
            }) : a && a()
        };
        return b
    });
    exports_para.factory = a
})(fetch_exports);



fetch_exports || (fetch_exports = {});

(function(exports_para, g) {
    exports_para.extend = function(dest_obj, src_obj, e, filter_obj) {
        if (!dest_obj || !src_obj) return dest_obj;
        e === g && (e = !0);
        var d, j, h;
        if (filter_obj && (h = filter_obj.length))
            for (d = 0; d < h; d++) {//将所有同时在filter_obj 和src_obj中的元素 合并到dest_obj 中
                if (j = filter_obj[d], j in src_obj && (e || !(j in dest_obj))) dest_obj[j] = src_obj[j]
            } else //将src_obj 合并到dest_obj 中
            for (j in src_obj)
                if (e || !(j in dest_obj)) dest_obj[j] = src_obj[j];
        return dest_obj
    };
    exports_para.filter_int = function(b, a, e, c) {
        b = parseInt(b);
        return isNaN(b) || "undefined" != typeof e && b < e || "undefined" != typeof c && b > c ? a : b
    };
    exports_para.is_empty = function(b) {
        if ("object" != typeof b) return !b;
        for (var a in b)
            if (b.hasOwnProperty(a)) return !1;
        return !0
    };
    exports_para.is_array = function(b) {
        return b && "object" == typeof b &&
            "function" == typeof b.unshift
    };
    exports_para.trim = function(b) {
        return (b || "").replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "")
    };
    exports_para.cut_string = function(b, a, e) {
        "undefined" == typeof e && (e = "...");
        b.length > a && (b = b.substr(0, a - e.length) + e);
        return b
    };
    exports_para.get_random_string = function() {
        return Math.floor(2147483648 * Math.random()).toString(36) + (Math.floor(2147483648 * Math.random()) ^ (new Date).getTime()).toString(36)
    };
    exports_para.htmlspecialchars = function(b) {
        return (b || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g,
            "&lt;").replace(/>/g, "&gt;")
    };
    exports_para.htmlspecialchars_decode = function(b) {
        return (b || "").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    };
    exports_para.strip_tags = function(b, a) {
        var e;
        "undefined" == typeof a ? e = "<\\/?\\w+[^>]*>" : ("string" == typeof a && (a = a.split(",")), e = "<\\/?(" + a.join("|") + ")[^>]*>");
        return b.replace(RegExp(e, "g"), " ").replace(/<\!--[\s\S]+?--\>/g, "").replace(/\s+/g, " ")
    };
    exports_para.str_repeat = function(b, a) {
        for (var e = []; 0 < a; e[--a] = b);
        return e.join("")
    };
    exports_para.sprintf = function() {
        for (var b = 0, a, e = arguments[b++], f = [], d, j, h; e;) {
            if (d = /^[^\x25]+/.exec(e)) f.push(d[0]);
            else if (d = /^\x25{2}/.exec(e)) f.push("%");
            else if (d = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(e)) {
                if (null == (a = arguments[d[1] || b++]) || a == g) throw "Too few arguments.";
                if (/[^s]/.test(d[7]) && "number" != typeof a) throw "Expecting number but found " + typeof a;
                switch (d[7]) {
                    case "b":
                        a = a.toString(2);
                        break;
                    case "c":
                        a = String.fromCharCode(a);
                        break;
                    case "d":
                        a = parseInt(a);
                        break;
                    case "e":
                        a =
                            d[6] ? a.toExponential(d[6]) : a.toExponential();
                        break;
                    case "f":
                        a = d[6] ? parseFloat(a).toFixed(d[6]) : parseFloat(a);
                        break;
                    case "o":
                        a = a.toString(8);
                        break;
                    case "s":
                        a = (a = String(a)) && d[6] ? a.substring(0, d[6]) : a;
                        break;
                    case "u":
                        a = Math.abs(a);
                        break;
                    case "x":
                        a = a.toString(16);
                        break;
                    case "X":
                        a = a.toString(16).toUpperCase()
                }
                a = /[def]/.test(d[7]) && d[2] && 0 <= a ? "+" + a : a;
                j = d[3] ? "0" == d[3] ? "0" : d[3].charAt(1) : " ";
                h = d[5] - String(a).length - 0;
                j = d[5] ? exports_para.str_repeat(j, h) : "";
                f.push("" + (d[4] ? a + j : j + a))
            } else throw "Huh ?!";
            e = e.substring(d[0].length)
        }
        return f.join("")
    };
    exports_para.http_build_query = function(http_obj, a_http, http_seperator) {
        var c, d, j = [],
            h = function(d, b, e_http_para) {
                var e, c = [];
                !0 === b ? b = "1" : !1 === b && (b = "0");
                if (null !== b && "object" === typeof b) {
                    for (e in b) null !== b[e] && c.push(h(d + "[" + e + "]", b[e], e_http_para));
                    return c.join(e_http_para)
                }
                if ("function" !== typeof b) return encodeURIComponent(d) + "=" + encodeURIComponent(b);
                throw Error("There was an error processing for http_build_query().");
            };
        http_seperator || (http_seperator = "&");
        for (d in http_obj) c = http_obj[d], a_http && !isNaN(d) && (d = String(a_http) + d), j.push(h(d, c, http_seperator));
        return j.join(http_seperator)
    };
    exports_para.parse_url = function(b, a) {
        for (var e = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),
                 c = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(b), d = {}, j = 14; j--;) d[e[j]] = c[j] || "";
        switch (a) {
            case "PHP_URL_SCHEME":
                return d.protocol;
            case "PHP_URL_HOST":
                return d.host;
            case "PHP_URL_PORT":
                return d.port;
            case "PHP_URL_USER":
                return d.user;
            case "PHP_URL_PASS":
                return d.password;
            case "PHP_URL_PATH":
                return d.path;
            case "PHP_URL_QUERY":
                return d.query;
            case "PHP_URL_FRAGMENT":
                return d.anchor;
            default:
                return e = {}, "" !== d.protocol && (e.scheme = d.protocol), "" !== d.host && (e.host = d.host), "" !== d.port && (e.port = d.port), "" !== d.user && (e.user = d.user), "" !== d.password && (e.pass = d.password), "" !== d.path && (e.path = d.path), "" !== d.query && (e.query = d.query), "" !== d.anchor && (e.fragment = d.anchor), e
        }
    };
    exports_para.parse_query = function(b) {
        for (var a = {}, b = (b + "").split("&"), e = 0, c = "", d = 0, e = b.length, d = 0; d < e; d++) c = b[d].split("="), a[unescape(c[0])] = unescape(c[1]).replace(/[+]/g, " ");
        return a
    };
    exports_para.xhr = function() {
        return new XMLHttpRequest
    };
    exports_para.ajax_func = function(ajax_para) {
        var a = exports_para.console || {
                debug: function() {}
            }, e = ajax_para.complete,
            f = ajax_para.status,
            ajax_para_ext = exports_para.extend(ajax_para || {}, {
                type: "GET"
            }, !1);
        if ("undefined" == typeof ajax_para_ext.url) return g;
        var ajax_para_type = ajax_para_ext.type.toUpperCase();
        ajax_para_ext.data && "string" != typeof ajax_para_ext.data && (ajax_para_ext.data = exports_para.http_build_query(ajax_para_ext.data), "GET" == ajax_para_type ? (ajax_para_ext.url += (ajax_para_ext.url.match(/\?/) ? "&" : "?") + ajax_para_ext.data, ajax_para_ext.data = null) : ajax_para_ext.contentType = "application/x-www-form-urlencoded");
        var j = ajax_para_ext.error || exports_para.ajax_func.error_handler,
            exports_xhr = exports_para.xhr();
        a.debug(ajax_para_type + ": " + ajax_para_ext.url);
        exports_xhr.open(ajax_para_type, ajax_para_ext.url, !0);
        exports_xhr.onreadystatechange = function() {
            if (4 == exports_xhr.readyState) {  //HTTP 响应已经完全接收
                var xhr_status = exports_xhr.status,
                    a = exports_para.parseResponse(exports_xhr, ajax_para_ext.dataType);
                e && e(a, xhr_status);
                if (ajax_para_ext.success && 200 <= xhr_status && 300 > xhr_status || 304 == xhr_status)
                    if (ajax_para_ext.dataType && "xml" == ajax_para_ext.dataType) ajax_para_ext.success(exports_xhr.responseXML, xhr_status, exports_xhr);
                    else
                    if (ajax_para_ext.dataType && "text" == ajax_para_ext.dataType) ajax_para_ext.success(exports_xhr.responseText, xhr_status, exports_xhr);
                    else {
                        var i;
                        try {
                            i = JSON.parse(exports_xhr.responseText)
                        } catch (g) {
                            j && j(exports_xhr, xhr_status, g);
                            return
                        }
                        ajax_para_ext.success(i, xhr_status, exports_xhr)
                    } else if (f)
                    if (f[xhr_status]) f[xhr_status](a);
                    else f.others && f.others(a, xhr_status);
                else j && j(exports_xhr, xhr_status)
            }
        };
        exports_xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        ajax_para_ext.contentType && exports_xhr.setRequestHeader("Content-Type", ajax_para_ext.contentType);
        try {
            ajax_para_ext.data &&
                a.debug("form data: " + ajax_para_ext.data), exports_xhr.send(ajax_para_ext.data)
        } catch (i) {
            j && j(exports_xhr, null, i)
        }
        return exports_xhr
    };
    exports_para.format_price = function(b, a) {
        b = parseInt(b);
        if (isNaN(b) || 0 >= b) return "";
        var e;
        e = exports_para.sprintf("%.2f", b / 100);
        switch (a) {
            case "us":
                e = "$" + e;
                break;
            case "ca":
                e = "CDN$" + e;
                break;
            case "fr":
            case "de":
                e = "EUR " + e.replace(".", ",");
                break;
            case "uk":
                e = "&#xA3;" + e;
                break;
            default:
                e = "$" + e
        }
        return e
    };
    exports_para.sendFormData = function(b) {
        var a = b.url,
            e = b.success,
            f = b.complete;
        if (!a || !e && !f) throw Error("Parameter url and success or complete are required.");
        var d =
                b.textData || {}, j = b.binaryData,
            h = b.headers || {}, i = b.status,
            b = b.boundary || "XMLHttpRequest2";
        j.name = j.name || "keyName";
        j.value = j.value || "keyvalue";
        d = exports_para.constructMultipartFormData(b, j, d);
        j = "multipart/form-data; boundary=" + b;
        d = exports_para.constructBufferData(d);
        h["Content-Type"] = j;
        var k = exports_para.xhr();
        k.open("POST", a, !0);
        k.onreadystatechange = function() {
            if (4 == k.readyState) {
                var d = k.status,
                    b = exports_para.parseResponse(k);
                f && f(b, d);
                if (e && (200 <= d && 300 > d || 304 === d)) e(b);
                else if (i)
                    if (i[d]) i[d](b);
                    else i.others && i.others(b, d)
            }
        };
        for (var g in h) k.setRequestHeader(g,
            h[g]);
        k.send(d)
    };
    exports_para.parseResponse = function(xhr_para, data_type) {
        //console.log(xhr_para.);
        var e = xhr_para.getResponseHeader("content-type"),
            c = xhr_para.responseText;
        if ("string" == typeof e)
            if (0 <= e.indexOf("xml")) c = xhr_para.responseXML;//对请求的响应，解析为 XML 并作为 Document 对象返回。
            else
            if (0 <= e.indexOf("json") || 0 <= e.indexOf("javascript") && -1 == e.indexOf("x-javascript")) c = JSON.parse(c);
            else try {
                if (!data_type || "json" == data_type) c = JSON.parse(c)
            } catch (d) {}
        return c
    };
    exports_para.constructBufferData = function(b) {
        for (var a = b.length, e = new Uint8Array(a), c = 0; c < a; c++) e[c] = b.charCodeAt(c);
        return e.buffer
    };
    exports_para.constructMultipartFormData = function(b, a, c) {
        var f =
                [],
            d;
        for (d in c) f.push("--" + b + "\r\n"), f.push("Content-Disposition: form-data; "), f.push('name="' + d + '"\r\n\r\n' + c[d] + "\r\n");
        f.push("--" + b + "\r\n");
        f.push("Content-Disposition: form-data; ");
        f.push('name="' + (a.name || "binaryfilename") + '"; ');
        f.push('filename="' + a.value + '"\r\n');
        f.push("Content-type: " + a.type + "\r\n\r\n");
        f.push(a.data + "\r\n");
        f.push("--" + b + "--\r\n");
        return f.join("")
    };
    exports_para.supportBlob = function() {
        return window.Blob !== g
    };
    exports_para.supportXHR2 = function() {
        return "object" === typeof exports_para.xhr().upload
    };
    exports_para.supportTypedArray =
        function() {
            return window.ArrayBuffer !== g
        };
    exports_para.getTabBrowser = function() {
        return Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser").gBrowser
    };
    exports_para.elemInArray = function(b, a) {
        if ("function" == typeof a.indexOf) return -1 != a.indexOf(b);
        for (var c = 0, f = a.length; c < f; c++)
            if (a[c] === b) return !0;
        return !1
    }
})(fetch_exports);

fetch_exports || (fetch_exports = {});
(function(exports_para, g) {
    exports_para.options = {
        _locales: {
            zh: !0,
            us: !0,
            uk: !0,
            de: !0,
            it: !0,
            fr: !0,
            ca: !0
        },
        _locale: g,
        init: function(b) {
            b = b || {};
            this.storage = b.storage;
            this._get("locale") || this.set_locale(b.locale)
        },
        get_secure_api_url: function() {
            return "https://ruyi.taobao.com"
        },
        get_api_url: function() {
            return "http://ruyi.taobao.com"
        },
        has_locale: function(b) {
            return b in this._locales
        },
        get_locale: function() {
            if ("undefined" == typeof this._locale) {
                var b = this._get("locale");
                this._locale = b in this._locales ? b : "zh"
            }
            return this._locale
        },
        set_locale: function(b) {
            b in
                this._locales || (b = "zh");
            this._locale = b;
            return this._set("locale", b)
        },
        set_search_engine: function(b) {
            this.storage.set_object("search_engine", b)
        },
        get_search_engine: function() {
            return this.storage.get_object("search_engine") || {}
        },
        set_accept_term: function(b) {
            return this.storage.set("accept_term", b)
        },
        get_accept_term: function() {
            return "1" == this.storage.get("accept_term")
        },
        get_search_result_setting: function() {
            return "true" == this._get("search_result_setting")
        },
        set_search_result_setting: function(b) {
            return this._set("search_result_setting",
                String(b))
        },
        get_price_compare_result_setting: function() {
            return "true" == this._get("price_compare_result_setting")
        },
        set_price_compare_result_setting: function(b) {
            return this._set("price_compare_result_setting", String(b))
        },
        get_sync_order_result_setting: function() {
            var b = this._get("sync_order_result_setting");
            b || (b = "true");
            return "true" == b
        },
        set_sync_order_result_setting: function(b) {
            return this._set("sync_order_result_setting", String(b))
        },
        get_movie_result_setting: function() {
            var b = this._get("movie_result_setting");
            b || (b = "true");
            return "true" == b
        },
        set_movie_result_setting: function(b) {
            return this._set("movie_result_setting", String(b))
        },
        get_price_curve_result_setting: function() {
            var b = this._get("price_curve_result_setting");
            return "true" === (b || "false")
        },
        set_price_curve_result_setting: function(b) {
            return this._set("price_curve_result_setting", b + "")
        },
        _get: function(b) {
            return this.storage.get(b)
        },
        _set: function(b, a) {
            return this.storage.set(b, a)
        },
        get: function(b, a) {
            var c;
            c = "function" == typeof this["get_" + b] ? this["get_" + b]() :
                this._get(b);
            return c === g ? a : c
        },
        set: function(b, a) {
            if ("function" == typeof this["set_" + b]) {
                for (var c = [], f = 1; f < arguments.length; f++) c[f - 1] = arguments[f];
                return this["set_" + b].apply(this, c)
            }
            return this._set(b, a)
        }
    }
})(fetch_exports);


fetch_exports || (fetch_exports = {});
(function(exports_para, g) {
    var b = function(a) {
        this.authorize_url = a.authorize_url;
        this.redirect_url = a.redirect_url;
        this.resource_url = a.resource_url;
        this.appkey = a.appkey;
        this.storage = a.storage;
        this.preparedAuthorizationCallbacks = [];
        this.token = null
    };
    b.tabs = {
        _data: {},
        add: function(a, b, c) {
            this._data[a] = {
                requestTab: b,
                authTab: a,
                callback: c
            }
        },
        has: function(a) {
            return this._data.hasOwnProperty(a)
        },
        get: function(a) {
            return this._data[a]
        },
        remove: function(a) {
            delete this._data[a]
        }
    };
    b.prototype.runPreparedAuthorizationCallbacksIfReady =
        function() {
            var a = this.preparedAuthorizationCallbacks;
            if (a.length) {
                for (var b = 0, c = a.length; b < c; b++) a[b][0].apply(this, a[b][1]);
                this.preparedAuthorizationCallbacks = []
            }
        };
    b.prototype.addPreparedAuthorizationCallback = function(a, b) {
        this.preparedAuthorizationCallbacks.push([a, b])
    };
    b.prototype.getAuthorizationUrl = function(a) {
        a = this.authorize_url + "?client_id=" + this.appkey + "&redirect_uri=" + encodeURIComponent(this.redirect_url) + "&response_type=token" + (a ? "&logout=1" : "");
        exports_para.console.debug("Authorization url: " + a);
        return a
    };
    b.prototype.getAccessToken = function() {
        if (null === this.token) {
            this.token = {};
            var a = this.storage.get_object("oauth_token/" + this.authorize_url + "/" + this.appkey);
            if (a) try {
                "undefined" != typeof a.expires && a.expires > (new Date).getTime() && (this.token = a)
            } catch (b) {
                exports_para.console.debug(b)
            }
        }
        return this.token
    };
    b.prototype.setAccessToken = function(a) {
        a.expires_in && (a.expires = (new Date).getTime() + 1E3 * (a.expires_in - 60));
        this.storage.set_object("oauth_token/" + this.authorize_url + "/" + this.appkey, a);
        this.token = a
    };
    b.prototype.removeAccessToken =
        function() {
            this.storage.remove_object("oauth_token/" + this.authorize_url + "/" + this.appkey);
            this.token = {}
        };
    b.prototype.setTokenData = function(a) {
        var b = this.getAccessToken();
        b && (b = exports_para.extend(b, a), this.setAccessToken(b))
    };
    b.prototype.getTokenData = function(a) {
        var b = this.getAccessToken();
        return b ? b[a] : g
    };
    b.prototype.parseAccessToken = function(a) {
        if ((a = a.split("#")[1]) && "string" === typeof a) {
            for (var a = a.split("&"), b = {}, c, d = 0, g = a.length; d < g; d++) c = a[d].split("="), b[c[0]] = c[1];
            return b
        }
    };
    b.prototype.isAuthorized =
        function() {
            var a = this.getAccessToken();
            return "undefined" != typeof a && "undefined" != typeof a.access_token
        };
    b.prototype.authorize = function(a, e, f) {
        var d = this;
        if (this.isAuthorized()) e();
        else {
            var g = function(a) {
                exports_para.browser.tabs.create({
                    url: d.getAuthorizationUrl(f),
                    selected: !0
                }, function(c) {
                    b.tabs.add(c.id, a, e);
                    d.runPreparedAuthorizationCallbacksIfReady()
                })
            };
            a && ("number" == typeof a && 0 < a || "string" == typeof a) ? g(a) : exports_para.browser.tabs.getCurrent(function(a) {
                g(a ? a.id : "")
            })
        }
    };
    b.prototype.storeAccessToken = function(a, e) {
        if (b.tabs.has(a)) {
            var f =
                this.parseAccessToken(e);
            "undefined" != typeof f.access_token ? this.setAccessToken(f) : exports_para.console.debug("oauth get access token failed")
        } else this.addPreparedAuthorizationCallback(arguments.callee, [a, e]), exports_para.console.debug("oauth tab does not exists")
    };
    b.prototype.authorizeCallback = function(a) {
        if (a) {
            var e = b.tabs.get(a);
            if (e) {
                var f = e.requestTab;
                f && ("number" == typeof f && 0 < f || "string" == typeof f) && exports_para.browser.tabs.update(f, {
                    active: !0
                });
                e.callback();
                exports_para.browser.tabs.remove(a);
                b.tabs.remove(a)
            } else exports_para.console.debug("No cached data found by authorization tab id: " +
                a), this.addPreparedAuthorizationCallback(arguments.callee, [a])
        } else exports_para.console.debug("Invalid authorization tab id.")
    };
    b.prototype.request = function(a) {
        var b = this,
            f = this.getAccessToken();
        if (f) {
            "undefined" == typeof a.data && (a.data = {});
            a.data.access_token = f.access_token;
            a.data._t = (new Date).getTime();
            a.url = this.resource_url + a.url;
            var d = a.error;
            a.error = function(a, c) {
                try {
                    var f = JSON.parse(a.responseText);
                    f.error && "invalid_token" == f.error && b.removeAccessToken();
                    d && d(a, c)
                } catch (g) {
                    d && d(a, c)
                }
            };
            exports_para.ajax_func(a)
        }
    };
    exports_para.oauth =
        b
})(fetch_exports);

fetch_exports || (fetch_exports = {});
(function(exports_para, g) {
    var b = function(a) {
        var b = g;
        return function() {
            if (b) return b;
            "undefined" == typeof b && (b = a());
            return b
        }
    }, a = {
        init: function(b) {
            b = b || {};
            this.storage = b.storage
        },
        getStorage: function(b) {
            return new exports_para.storage(b, this.storage)
        }
    };
    a.getCache = b(function() {
        var b = new exports_para.cache({
                max_size: exports_para.constants.cache_size,
                expire_time: exports_para.constants.cache_expire_time,
                storage: a.getStorage("cache")
            }),
            f = 0;
        b.storage.each(function() {
            f++
        });
        b._count = f;
        return b
    });
    a.getRuyitaoOauth = b(function() {
        var b = new exports_para.oauth({
            appkey: "1362053493",
            authorize_url: "http://ruyi.taobao.com/my/oauth/authorize",
            resource_url: "http://ruyi.taobao.com/my",
            redirect_url: "http://ruyi.taobao.com/service/access-token-callback.html?app=ruyitao",
            storage: a.getStorage("extension")
        });
        b.getUserInfo = function(a) {
            b.isAuthorized() ? this.request({
                url: "/api/me",
                success: function(d) {
                    d.nick ? (b.setTokenData({
                        nick: d.nick,
                        user_id: d.user_id
                    }), a && a(d)) : d.error && a && a()
                },
                error: function(d, c) {
                    "401" == c && b.removeAccessToken();
                    a && a()
                }
            }) : a && a()
        };
        return b
    });
    exports_para.factory = a
})(fetch_exports);

fetch_exports || (fetch_exports = {});
(function(exports_para, g) {
    exports_para.notification = {
        STORE_KEY: "notification",
        init: function(b) {
            b = b || {};
            this.notifications = g;
            this.storage = b.storage;
            this.cache = b.cache;
            this.config = g
        },
        formatDate: function(b) {
            var a = function(b) {
                return (10 > b ? "0" : "") + String(b)
            };
            return b.getFullYear() + "-" + a(1 + b.getMonth()) + "-" + a(b.getDate())
        },
        getConfig: function() {
            if ("undefined" == typeof this.config) {
                var b = new Date,
                    a = this.formatDate(b),
                    b = this.formatDate(new Date(b.getTime() - 2592E5));
                this.config = {
                    date: a
                };
                var c = this.storage.get_object(this.STORE_KEY);
                if (c && "object" == typeof c) {
                    var a = "undefined" != typeof c.date && c.date == a,
                        f;
                    for (f in c) c.hasOwnProperty(f) && f.match(/^\d+$/) && (c[f].expires && c[f].expires >= b) && (a || (c[f].times = 0, "hide" == c[f].status && (c[f].status = "")), this.config[f] = c[f]);
                    this.saveConfig()
                }
            }
            return this.config
        },
        saveConfig: function() {
            this.storage.set_object(this.STORE_KEY, this.config)
        },
        getNotification: function(b) {
            "undefined" == typeof this.notifications && this.pullNotifications();
            if (this.notifications)
                for (var a = 0, e = this.notifications.length; a <
                    e; a++) {
                    var f = this.notifications[a],
                        d = RegExp(f.match);
                    exports_para.console.debug("check msg " + f.id + ": url " + d.test(b));
                    if (d.test(b)) {
                        d = this.getStatus(f.id);
                        "undefined" == typeof d && (d = {
                            status: "",
                            expires: f.expires,
                            times: 0
                        });
                        var j = parseInt(f.quota);
                        isNaN(j) && (j = 0);
                        if ("" == d.status && d.times < j) return d.times++, this.config[f.id] = d, this.saveConfig(), f
                    }
                }
        },
        setStatus: function(b, a) {
            var c = this.getConfig();
            c.hasOwnProperty(b) && !("hide" == a && "" != c[b].status) && (c[b].status = a, this.saveConfig())
        },
        getStatus: function(b) {
            var a = this.getConfig();
            return a.hasOwnProperty(b) ? a[b] : g
        },
        setNotifications: function(b) {
            this.notifications = [];
            if (b && "undefined" != typeof b.length)
                for (var a = 0, c = b.length; a < c; a++) {
                    var f = b[a];
                    if (f.id && f.id.match(/^\d+$/) && f.campaign && f.campaign.match(/^[a-zA-Z0-9]+$/) && f.title && f.match && f.content && f.expires && f.expires.match(/^\d+-\d+-\d+/)) {
                        var d = f.expires.split(/[-\s]/),
                            j = new Date;
                        j.setYear(d[0]);
                        j.setMonth(d[1] - 1);
                        j.setDate(d[2]);
                        f.expires = this.formatDate(j);
                        this.notifications.push(f)
                    }
                }
        },
        pullNotifications: function(b) {
            if (this.cache.has(this.STORE_KEY)) this.setNotifications(this.cache.get(this.STORE_KEY));
            else {
                var a = this;
                exports_para.ajax_func({
                    url: exports_para.options.get_api_url("zh") + "/ext/notification",
                    data: {
                        uid: exports_para.constants.uid,
                        pid: exports_para.constants.pid,
                        version: exports_para.constants.version
                    },
                    success: function(c) {
                        c && "undefined" != typeof c.length && (a.setNotifications(c), a.cache.set(a.STORE_KEY, c), b && b())
                    }
                }   )
            }
        }
    }
})(fetch_exports);


(function(exports_para, g) {
	exports_para.PriceCharModels = {};
	var a = function(d) {
		return function(b, a, c) {
			d({
				Code: a,
				Message: c ? c.toString() : "Something is wrong(May be the networking is abnormal)."
			})
		}
	}, service_local = {
			get_final_price: function(d, b, a) {
				exports_para.ajax_func({
					url: "http://ok.etao.com/api/purchase_decision.do",
					data: {
						src: "ruyitao",
						wap: "false",
						history: "false",
						partner: "182",
						nid: d.nid
					},
					success: function(d) {
						d &&
							d.result && d.result.finalPrice ? a(d.result) : a()
					},
					error: function() {
						a()
					}
				})
			},
			set_likebtn_tips_status: function() {
				exports_para.factory.getStorage("extension").set("hideliketips", 1)
			},
			get_likebtn_tips_status: function(d, b, a) {
				d = exports_para.factory.getStorage("extension").get("hideliketips");
				a(d)
			},
			set_likebtn_popup_status: function() {
				exports_para.factory.getStorage("extension").set("hidelikepopup", 1)
			},
			get_likebtn_popup_status: function(d, b, a) {
				d = exports_para.factory.getStorage("extension").get("hidelikepopup");
				a(d)
			},
			get_expand_tip_status: function(d, b, a) {
				d =
					exports_para.site.getExpandTipStatus(d.domain);
				a(1 != d)
			},
			set_expand_tip_status: function(d) {
				exports_para.site.setExpandTipStatus(d.domain, 1)
			},
			page_signature: function(d, b, a) {
				var d = exports_para.constants.uid,
					b = 5381,
					e;
				for (e = 0; e < d.length; e++) b += d.charCodeAt(e) * (e + 1);
				a("ryt" + Math.abs(b))
			},
			baidu_page_is_commodity_search: function(d, b, a) {
				exports_para.console.debug("[baidu_page_is_commodity_search]: " + d.keyword);
				var b = exports_para.options.get_api_url("zh") + "/ext/queryPredict",
					e = d.domain;
				exports_para.ajax_func({
					url: b,
					type: "POST",
					data: {
						pid: exports_para.constants.pid,
						keyword: d.keyword || "",
						url: d.url,
						urls: JSON.stringify(d.urls || [])
					},
					success: function(d) {
						var b = {
							is_shopping_keyword: !1
						};
						d && d.is_shopping_keyword && (b.is_shopping_keyword = !0, b.keyword = d.keyword, b.site_status = exports_para.site.getStatus(e, "search"));
						a(b)
					},
					error: function() {
						a()
					}
				})
			},
			get_tags_by_product_link: function(d, b, a) {
				var e = exports_para.factory.getCache(),
					f = "product_tags/" + d.link;
				e.has(f) ? a(e.get(f)) : exports_para.ajax_func({
					url: exports_para.options.get_api_url("zh") + "/my/api/item",
					data: {
						url: d.link
					},
					success: function(d) {
						d && d.tags && d.item_id ? (e.set(f, d), a(d)) : a()
					},
					error: function() {
						a()
					}
				})
			},
			get_price_comparation_and_history_prices_data: function(d, b, a) {
				var e = this,
					b = exports_para.service.helper.getPid(),
					f = exports_para.factory.getCache(),
					g = "link_search_with_history_prices/" + d.link;
				f.has(g) ? a(f.get(g)) : exports_para.ajax_func({
					url: exports_para.options.get_api_url("zh") + "/ext/productLinkSearch",
					data: {
						link: d.link,
						pid: b,
						group: "prices,item,items"
					},
					success: function(b) {
						if (b && b.Item) {
							var c = b.Items;
							c && c.length ? (f.set(g, b), a(b)) : e.get_tags_by_product_link({
								link: d.link
							}, null, function(d) {
								b.tagsInfo = d;
								f.set(g, b);
								a(b)
							})
						} else a({})
					},
					error: function() {
						a({})
					}
				})
			},
			construct_click_url: function(d, b, a) {
				var b = exports_para.service.helper.getPid(),
					e = exports_para.options.get_api_url("zh") + "/ext/clickurl?";
				a(e + "url=" + d.url + "&pid=" + b)
			},
			is_first_shown: function(d, b, a) {
				a("true" == exports_para.factory.getStorage("persist").get("first_shown"))
			},
			set_first_shown: function(d, b, a) {
				d = d.type === g ? !0 : d.type;
				exports_para.factory.getStorage("persist").set("first_shown", d);
				a && a({})
			},
			get_site_config: function(d, b, a) {
				d = {
					status: exports_para.site.getStatus(d.domain, d.type || "search"),
					config: exports_para.site.getConfig(d.domain)
				};
				a(d)
			},
			get_site_status: function(d,
				b, a) {
				a(exports_para.site.getStatus(d.domain, d.type))
			},
			set_site_status: function(d, b, a) {
				exports_para.site.setStatus(d.domain, d.status, d.type);
				a({})
			},
			parse_image_price: function(d, b, a) {
				exports_para.service.helper.parseImagePrice(d.domain, d.url, a, document)
			},
			get_detail_config: function(d, b, a) {
				exports_para.factory.getCache();
				b = exports_para.constants.site_config.detail_info;
				d = exports_para.service.helper.get_top_level_domain(d.domain);
				b[d] ? a(b[d]) : a()
			},
			support_custom_share: function(d, b, a) {
				d = {};
				b = exports_para.browser.tabs;
				b.create && (b.update && b.remove) && (d.simple = !0, exports_para.supportTypedArray() &&
					(exports_para.supportXHR2() && "function" === typeof exports_para.browser.tabs.captureVisibleTab) && (d.capture = !0));
				a(d)
			},
			share: function(d, b, a) {
				exports_para.Share.share(d, a)
			},
			handle_share_request: function(d, b) {
				d.srcTabId = b.tab.id;
				exports_para.Share.handleRequest(d)
			},
			callback_share_authorization: function(d, b) {
				exports_para.Share.handleAuthorizationCallback(d.url, b.tab.id)
			},
			get_price_curve_status: function(d, b, a) {
				d = exports_para.site.getPriceCurveStatus(d.domain);
				a(d)
			},
			set_price_curve_status: function(d) {
				exports_para.site.setPriceCurveStatus(d.domain, d.status)
			},
			get_price_history_data: function(d,
				b, response_func) {
				exports_para.console.debug("[get_price_history_data] url: " + d.url);
				var e = exports_para.factory.getCache(),
					f = "price_history/" + d.url;
				e.has(f) ? response_func(e.get(f)) : (b = exports_para.options.get_api_url("zh") + "/ext/productLinkSearch", exports_para.ajax_func({
					url: b,
					data: {
						link: d.url,
						group: "prices,item",
						pid: exports_para.constants.pid
					},
					success: function(res) {
						//exports_para.console.debug("[history price data length]: " + (res.Item && res.Item.Prices && res.Item.Prices.length || 0));
						res.Item && res.Item.Prices && res.Item.Prices.length ? (e.set(f, res), response_func(res)) :
                            ( exports_para.console.debug("[history price data FAILED]:"+ d.url) && response_func())
					},
					error: function() {
                        exports_para.console.debug("[history price data ERROR]:"+d.url);
						//response_func()
					}
				}))
			},
			get_srp_config: function(d, b,
				a) {
				d = exports_para.site.getSrpConfig(d.domain) || exports_para.site.getSrpConfig(this.helper.get_top_level_domain(d.domain));
				a(d)
			},
			item_link_search: function(d, b, a) {
				var e = exports_para.factory.getCache(),
					f = "link_search/" + d.link;
				e.has(f) ? a(e.get(f)) : exports_para.ajax_func({
					url: exports_para.options.get_api_url("zh") + "/ext/productLinkSearch",
					data: {
						link: d.link,
						pid: exports_para.constants.pid
					},
					success: function(d) {
						e.set(f, d);
						a(d)
					},
					error: function() {
						a({})
					}
				})
			},
			get_search_engines: function(d, b, a) {
				var d = exports_para.options.get_locale(),
					b = exports_para.options.get_search_engine(),
					e = exports_para.SearchEngine.search_engines,
					f = {}, g;
				for (g in e) {
					var m = e[g];
					if (m.enabled) {
						var n = m.locales.split(","),
							p = {
								name: m.name,
								title: "undefined" == typeof m.title[d] ? m.title.en : m.title[d],
								homepage: m.homepage,
								order: m.order,
								host: m.host
							};
						m.icon && (p.icon = m.icon);
						p.enabled = "undefined" != typeof b[g] ? b[g] : -1 != m.locales.indexOf(d) ? m.selected : !1;
						"undefined" == typeof f[n[0]] && (f[n[0]] = []);
						f[n[0]].push(p)
					}
				}
				for (var q in f) f[q].sort(function(d, b) {
					return d.order - b.order
				});
				a({
					locale: d,
					search_engines: f
				})
			},
			is_book_site: function(d, b, a) {
				var b = exports_para.constants.site_config.book,
					e = d.domain,
					d = d.url,
					b = b[e] && b[e].patterns,
					f, g;
				if (b) {
					for (f = b.length; f--;)
						if (e = b[f], d.match(RegExp(e.url))) {
							g = !0;
							a(e.meta);
							break
						}
					g || a(!1)
				} else a(!1)
			},
			item_search: function(d, b, a) {
				var e = this,
					f = d.SearchEngine;
				if ("function" == typeof this[f + "_search"]) this[f + "_search"](d, b, a);
				else exports_para.SearchEngine.has(f) ? exports_para.service.helper.search({
					search_engine: f,
					request: d,
					callback: function(g) {
						a(g);
						var m = exports_para.SearchEngine.get(f);
						m && (m.enabled && 1 == d.ItemPage && g && g.Items && 0 < g.Items.length) && e.add_search_history({
							searchBean: {
								keyword: d.Keyword,
								se: f,
								img: g.Items[0].SmallImageUrl,
								Item: {
									SmallImageUrl: g.Items[0].SmallImageUrl,
									LargeImageUrl: g.Items[0].LargeImageUrl
								},
								minPrice: "",
								maxPrice: "",
								time: (new Date).getTime()
							}
						}, b)
					},
					preload: !0
				}) : a({
					TotalPages: 0,
					Items: []
				})
			},
			is_detail_site: function(d, b, a) {
				var b = d.url,
					e = this.helper.get_top_level_domain(b),
					f = !1,
					e = exports_para.constants.site_config.product[e];
				if ("undefined" != typeof e)
					if ("undefined" != typeof e.length)
						for (var g = 0; g < e.length; g++) b.match(e[g]) && (f = !0);
					else f = !0;
				f ? exports_para.service.helper.search({
					search_engine: "product_search",
					request: {
						Keyword: JSON.stringify({
							url: d.url,
							title: d.title
						}),
						ItemPage: 1
					},
					callback: function(d) {
						d.DetailPage ? (exports_para.console.debug("1. \u662f\u5546\u54c1\u8be6\u60c5\u9875\uff0c\u52a0\u8f7d\u6570\u636e"), d.LikeItems && d.LikeItems.length ? a({
							locale: exports_para.options.get_locale(),
							likeItems: d.LikeItems,
							likePage: d.LikePage
						}) : d.ProductSameTag ? a({
							locale: exports_para.options.get_locale(),
							productSameTag: d.ProductSameTag
						}) : "undefined" != typeof d.Items ? a({
							locale: exports_para.options.get_locale(),
							product: d.Product
						}) : a({
							locale: exports_para.options.get_locale(),
							keyword: d.Keyword
						})) : (exports_para.console.debug("\u4e0d\u662f\u5546\u54c1\u8be6\u60c5\u9875\uff0c\u65e0\u6570\u636e"), a({}))
					}
				}) : a({})
			},
			get_notification: function(d, b, a) {
				"zh" == exports_para.options.get_locale() ? a(exports_para.notification.getNotification(d.url)) : a()
			},
			set_notification: function(d, b, a) {
				exports_para.notification.setStatus(d.id, d.status);
				a({})
			},
			ajax: function(d, b, a) {
				d.success || (d.success = function(d) {
					a(d)
				});
				d.error || (d.error = function() {
					a({})
				});
				exports_para.ajax_func(d)
			},
			get_template: function(d, b, a) {
				exports_para.service.helper.getTemplate(d.page, a)
			},
			get_current_tab: function(d,
				b, a) {
				try {
					exports_para.browser.tabs.getSelected(null, a)
				} catch (e) {
					exports_para.console.debug("Get current tab failed, message: " + e.message), a()
				}
			},
			tab_open: function(d, b, a) {
				exports_para.browser.tabs.create({
					url: d.url,
					selected: "undefined" == typeof d.selected ? !0 : d.selected
				}, a)
			},
			close_tab: function(d, b, a) {
				exports_para.browser.tabs.remove(d.tabId, a)
			},
			active_tab: function(d, b, a) {
				exports_para.browser.tabs.update(d.tabId, {
					selected: !0
				}, a)
			},
			options_get: function(d, a, b) {
				for (var d = d.options, a = {}, e, f = 0, g = d.length; f < g; f++) e = d[f] + "_result_setting", a[e] = exports_para.options.get(e, exports_para.site[d[f] +
					"_default_status"]);
				b(a)
			},
			options_set: function(d, a, b) {
				for (var e in d) a = d[e], "locale" == e ? (exports_para.options.set_locale(d.locale), exports_para.options.set_search_engine({}), this.clear_search_history(), this.clear_popup_status()) : "search_engine" == e ? (a = exports_para.options.get_search_engine(), a[d.search_engine] = !! d.enabled, exports_para.options.set_search_engine(a)) : "topic" != e && ("search_result_setting" == e ? (exports_para.options.set_search_result_setting(a), exports_para.site.search_default_status = a) : "price_compare_result_setting" == e ? (exports_para.options.set_price_compare_result_setting(a),
					exports_para.site.price_compare_default_status = a) : "sync_order_result_setting" == e ? exports_para.options.set_sync_order_result_setting(a) : ("price_curve_result_setting" == e && (exports_para.site.price_curve_default_status = a), exports_para.options.set(e, a)));
				b({})
			},
			set_search_engine: function(d, a, b) {
				var a = exports_para.options.get_search_engine(),
					d = d.search_engines,
					e;
				for (e in d) d.hasOwnProperty(e) && (a[e] = d[e]);
				exports_para.options.set_search_engine(a);
				b({})
			},
			set_cna_cookie: function(d) {
				exports_para.constants.cnaCookie != d.value && (exports_para.constants.cnaCookie = d.value, exports_para.factory.getStorage("extension").set("cna",
					d.value))
			},
			set_tracknick_cookie: function(d) {
				exports_para.constants.cnaCookie != d.value && (exports_para.constants.tracknickCookie = d.value, exports_para.factory.getStorage("extension").set("tracknick", d.value))
			},
			encode_gbk: function(d, a, b) {
				(d = d.str) ? b(exports_para.encode.gb2312.encode(d)) : b("")
			},
			decode_gbk: function(d, a, b) {
				-1 == d.data.indexOf("%") ? b(d.data) : b(exports_para.encode.gb2312.decode(d.data))
			},
			log_message: function(a) {
				exports_para.console.debug("[page] " + a.message)
			},
			send_log: function(a) {
				var b = exports_para.constants,
					e = {
						a: a.action,
						p: b.pid,
						u: b.uid,
						v: b.version,
						t: Math.floor((new Date).getTime() /
							1E3)
					};
				a.label && (e.l = a.label);
				a.referrer && (e.r = a.referrer);
				b.cnaCookie && (e.c = b.cnaCookie);
				b.tracknickCookie && (e.tn = b.tracknickCookie);
				exports_para.ajax_func({
					url: exports_para.options.get_api_url() + "/s.gif",
					data: e
				})
			},
			get_movie_config: function(a, b, e) {
				exports_para.options.get_movie_result_setting() ? (a = exports_para.site.getMovieConfig(a.domain) || exports_para.site.getMovieConfig(this.helper.get_top_level_domain(a.domain)), e(a)) : e()
			},
			movie_link_search: function(a, b, e) {
				var f = exports_para.factory.getCache(),
					g = "movie_link_search/" + a.link;
				f.has(g) ? e(f.get(g)) : exports_para.ajax_func({
					url: exports_para.options.get_api_url("zh") +
						"/kanshaext",
					data: {
						url: a.link,
						cna: exports_para.constants.cnaCookie,
						uid: exports_para.constants.uid,
						pid: exports_para.constants.pid
					},
					success: function(a) {
						f.set(g, a);
						e(a)
					},
					error: function() {
						e({})
					}
				})
			},
			get_locale: function(a, b, e) {
				e(exports_para.options.get_locale())
			},
			suggest_search: function(a, b, e) {
				var b = exports_para.options.get_locale() || "en",
					f = exports_para.factory.getCache(),
					g = "suggest_search/" + b + "/" + a.keyword,
					l;
				if (f.has(g)) e(f.get(g));
				else {
					switch (b) {
						case "zh":
							l = "http://suggest.taobao.com/sug?area=etao&code=utf-8";
							break;
						case "en":
							l = "http://completion.amazon.com/search/complete?method=completion&search-alias=aps&mkt=1";
							break;
						case "fr":
							l = "http://completion.amazon.co.uk/search/complete?method=completion&search-alias=aps&mkt=5";
							break;
						case "it":
							l = "http://completion.amazon.co.uk/search/complete?method=completion&search-alias=aps&mkt=35691";
							break;
						case "de":
							l = "http://completion.amazon.co.uk/search/complete?method=completion&search-alias=aps&mkt=4"
					}
					exports_para.ajax_func({
						url: l,
						data: {
							q: a.keyword
						},
						success: function(a) {
							f.set(g, a);
							e(a)
						},
						error: function() {
							e({})
						}
					})
				}
			},
			add_search_history: function(a, b, e) {
				var f = a.searchBean;
				f && this.search_history({},
					b, function(a) {
						for (var b = [f], d = a.length, j = 0; j < d && !(f.keyword && (a[j].keyword && f.keyword.toLowerCase() != a[j].keyword.toLowerCase()) && b.push(a[j]), 10 <= b.length); j++);
						exports_para.factory.getStorage("history").set_object("search_bean_array", b);
						"function" == typeof e && e()
					})
			},
			search_history: function(a, b, e) {
				var b = exports_para.factory.getStorage("history").get_object("search_bean_array") || [],
					f = a.begin || 0,
					a = a.num || b.length;
				"function" == typeof e && e(b.slice(f, a))
			},
			clear_search_history: function(a, b, e) {
				exports_para.factory.getStorage("history").set_object("search_bean_array", []);
				"function" == typeof e && e()
			},
			add_popup_status: function(a, b, e) {
				var f = a.status;
				f && this.get_popup_status({}, b, function(a) {
					a.unshift(f);
					1 < a.length && (a = a.slice(0, 1));
					exports_para.factory.getStorage("history").set_object("popup_status_array", a);
					"function" == typeof e && e()
				})
			},
			get_popup_status: function(a, b, e) {
				var b = exports_para.factory.getStorage("history").get_object("popup_status_array") || [],
					f = a.begin || 0,
					a = a.num || b.length;
				"function" == typeof e && e(b.slice(f, a))
			},
			clear_popup_status: function(a, b, e) {
				exports_para.factory.getStorage("history").set_object("popup_status_array", []);
				"function" == typeof e && e()
			}
		};
	exports_para.extend(service_local, {
		oauth_callback: function(a, b) {
			var e = a.application,
				f = b.tab.id;
			if ("ivy" == e) exports_para.ivy.loginCallback(f);
			else if ("ruyitao" == e) {
				var g = exports_para.factory.getRuyitaoOauth();
				g.storeAccessToken(f, a.redirect_url);
				g.getUserInfo(function() {
					g.authorizeCallback(f, a.redirect_url)
				})
			}
		},
		oauth_is_authorized: function(a, b, e) {
			a = exports_para.factory.getRuyitaoOauth();
			e(a.isAuthorized())
		},
		oauth_authorize: function(a, b, h) {
			a = exports_para.factory.getRuyitaoOauth();
			a.removeAccessToken();
			a.authorize(b.tab.id, function() {
				service_local.oauth_get_user(null,
					b, h)
			}, !0)
		},
		oauth_remove_token: function(a, b, e) {
			exports_para.factory.getRuyitaoOauth().removeAccessToken();
			e()
		},
		oauth_get_user: function(a, b, e) {
			a = exports_para.factory.getRuyitaoOauth();
			!a.getTokenData("nick") && a.isAuthorized() ? a.getUserInfo(function(a) {
				e(a)
			}) : e({
				nick: a.getTokenData("nick")
			})
		}
	});
	var f = {
		getSended: function(a) {
			var b = {}, e, f = exports_para.factory.getCache().get("ivy_send_items/" + a),
				f = (f || "").split("|"),
				a = 0;
			for (e = f.length; a < e; a++) b[f[a]] = !0;
			return b
		},
		setSended: function(a, b) {
			var e = [],
				f;
			for (f in b) b.hasOwnProperty(f) && e.push(f);
			exports_para.factory.getCache().set("ivy_send_items/" + a, e.join("|"))
		},
		add: function(a, b) {
			var e = this.getSended(a),
				f, g, l = [];
			f = 0;
			for (g = b.length; f < g; f++) {
				var m = exports_para.md5.hash(b[f]);
				e.hasOwnProperty(m) || (e[m] = !0, l.push(b[f]))
			}
			0 < l.length && this.setSended(a, e);
			return l
		}
	};
	exports_para.extend(service_local, {
		is_loged_in_ivy: function(a, b, e) {
			exports_para.ivy.isLogedIn(e)
		},
		logout_from_ivy: function(a, b, e) {
			exports_para.ivy.logout(e)
		},
		login: function(a, b, e) {
			var f;
			b && b.tab && (f = b.tab.id);
			exports_para.ivy.login(a.redirect, f, function() {
				e && e()
			})
		},
		login_callback: function(a, b) {
			exports_para.ivy.loginCallback(b.tab.id)
		},
		item_like_add: function(a, b, e) {
			function f() {
				exports_para.ivy.want(a.url, function(a) {
					"20001" == a.error_code ? exports_para.ivy.login(!0, g, function() {
						l || f();
						l = !0
					}) : e(a)
				}, function() {
					e({
						error: !0
					})
				})
			}
			var g;
			b && b.tab && (g = b.tab.id);
			var l = !1;
			f()
		},
		item_like_delete: function(a, b, e) {
			function f() {
				exports_para.ivy.unwant(g, function(a) {
					"20001" == a.error_code ? exports_para.ivy.login(!0, l, function() {
						m || f();
						m = !0
					}) : e(a)
				}, function() {
					e({
						error: !0
					})
				})
			}
			var g = a.url,
				l;
			b && b.tab && (l = b.tab.id);
			var m = !1;
			f()
		},
		item_like_open_homepage: function(a) {
			a = (a = a.item_id) ? "http://ruyi.taobao.com/item/" +
				encodeURIComponent(a) + "?utm_medium=ext&utm_source=ruyi" : "http://ruyi.taobao.com/my?utm_medium=ext&utm_source=ruyi";
			exports_para.browser.tabs.create({
				url: a,
				selected: !0
			})
		},
		item_like_count: function(a, b, e) {
			exports_para.ivy.isWant(a.url, function(a) {
				e(a)
			}, function() {
				e({
					error: !0
				})
			})
		},
		get_ivy_config: function(a, b, e) {
			a = exports_para.site.getIvyConfig(a.domain) || exports_para.site.getIvyConfig(this.helper.get_top_level_domain(a.domain));
			e(a)
		},
		ivy_send_user_collection: function(a) {
			var b = a.source_url,
				h = service_local.helper.get_top_level_domain(b),
				h = f.add(h, a.collections);
			h.length && exports_para.ivy.uploadCollection(a.type, h, b)
		},
		get_price_alert_settings_tip: function(a, b, e) {
			a = exports_para.site.getPriceAlertSettingsTip();
			e(1 != a)
		},
		set_price_alert_settings_tip: function() {
			exports_para.site.setPriceAlertSettingsTip(1)
		},
		get_unread_price_alert_messages: function(a, b, e) {
			e(exports_para.PriceAlertMessages.messages)
		},
		clear_unread_price_mind_messages: function() {
			exports_para.ivy.clearUnreadPriceMindMessages()
		},
		update_wants_status: function(a) {
			function b(a, d) {
				var e = exports_para.browser.tabs.sendRequest || exports_para.browser.tabs.sendMessage;
				e && a != g && e(a, {
					topic: "update_wants_status",
					status: d
				})
			}
			var e = a.tab_id;
			e ? b(e, a.status) : "function" == typeof exports_para.browser.tabs.query ? exports_para.browser.tabs.query({
				active: !0
			}, function(c) {
				for (var e = 0; e < c.length; e++) {
					var f = c[e];
					0 == f.url.indexOf("http") && b(f.id, a.status)
				}
			}) : "function" == typeof exports_para.browser.tabs.getSelected && exports_para.browser.tabs.getSelected(null, function(c) {
				c && (c.url && 0 == c.url.indexOf("http")) && b(c.id, a.status)
			})
		},
		check_add_to_want_intro_status: function(a, b, e) {
			a = exports_para.site.checkAddToWantIntroStatus();
			e(1 != a)
		},
		set_add_to_want_intro_status: function() {
			exports_para.site.setAddToWantIntroStatus(1)
		}
	});
	exports_para.extend(service_local, {
		set_badge: function(a) {
			a.tabId === g ? exports_para.browser.tabs.getSelected(null, function(e) {
				SetBrowserIcon(a, e.id);
				exports_para.browser.browserAction.setTitle({
					title: "\u52a0\u5165\u5982\u610f\u6dd8\u7684\u5fc3\u613f\u5355",
					tabId: e.id
				})
			}) : (SetBrowserIcon(a, a.tabId), exports_para.browser.browserAction.setTitle({
				title: "\u52a0\u5165\u5982\u610f\u6dd8\u7684\u5fc3\u613f\u5355",
				tabId: a.tabId
			}))
		}
	});
	service_local.helper = {
		getPid: function() {
			return exports_para.constants.pid
		},
		parseImagePrice: function(a, b, e, f) {
			var f = f || document,
				g = exports_para.service.helper.get_top_level_domain(a),
				l = function(a) {
					"360buy.com" ==
						g ? exports_para.PriceCharModels["360buy.com"] = a["jd.com"] : exports_para.PriceCharModels[g] = a[g];
					m()
				}, m = function() {
					try {
						var a = function(a) {
							var d = null;
							if (a && "object" == typeof a) {
								var f = exports_para.PriceCharModels[g][a.height];
								f && (d = (new exports_para.PriceDetector(f.boundaryValue, f.models)).detect(a), /\?/.test(d) && (exports_para.console.debug("Parse price failed: " + d), exports_para.console.debug("Price image url: " + b), d = null))
							}
							e(d)
						}, d = f.createElement("img");
						d.onload = function() {
							var b = f.createElement("canvas"),
								c = b.getContext("2d"),
								e = b.width = d.width,
								b = b.height = d.height;
							c.drawImage(d,
								0, 0, e, b);
							c = c.getImageData(0, 0, e, b);
							a(c)
						};
						d.onerror = function() {
							exports_para.console.debug("Load image: " + b + " failed.");
							a(null)
						};
						d.src = b
					} catch (l) {
						exports_para.console.debug("Parse image price failed, message: " + l.message), e(null)
					}
				};
			if (exports_para.PriceCharModels[g]) m();
			else {
				var n = exports_para.factory.getCache();
				n.has("price_char_models") ? l(n.get("price_char_models")) : (a = exports_para.options.get_api_url("zh") + "/ext/priceCharModels", exports_para.ajax_func({
					url: a,
					success: function(a) {
						n.set("price_char_models", a);
						l(a)
					}
				}))
			}
		},
		requestHandler: function(a, b, e) {
			var f = a.topic;
			exports_para.console.debug("request for " +
				f);
			try {
				if ("_" != f.charAt(0) && "function" == typeof exports_para.service[a.topic]) exports_para.service[a.topic](a, b, e);
				else exports_para.console.debug("unknown request " + f)
			} catch (g) {
				exports_para.console.error("REQEUST ERROR:" + g.message + (g.stack ? "\n" + g.stack : ""))
			}
		},
		getTemplate: function(a, b) {
			var e, f = !1;
			0 == a.indexOf("http://") ? (f = !0, e = a) : e = exports_para.browser.extension.getURL(a);
			var g_cache = exports_para.factory.getCache(),
				l = "template/" + a,
				m = function(a) {
					a = a.replace(/%chrome-extension%/g, exports_para.browser.extension.getURL(""));
					f && g_cache.set(l, a);
					b(a)
				};
			f && g_cache.has(l) ? b(g_cache.get(l)) : exports_para.ajax_func({
				url: e,
				dataType: "text",
				success: function(a) {
					m(a)
				},
				error: function(a, d, c) {
					4 == a.readyState && 0 != e.indexOf("http://") ? m(a.responseText) : b({
						Code: d,
						Message: c ? c.toString() : "Something is wrong(May be the networking is abnormal)."
					})
				}
			})
		},
		search: function(b) {
			var e = exports_para.factory.getCache(),
				f = exports_para.extend({}, b.request),
				g = exports_para.filter_int(f.ItemPage, 1, 1),
				k = b.search_engine + "/" + f.Keyword + "-" + g;
			e.has(k) ? b.callback(e.get(k)) : (exports_para.SearchEngine.search(b.search_engine, f, {
					success: function(a) {
						e.set(k, a);
						b.callback(a)
					},
					error: a(b.callback)
				}), b.preload &&
				1 == g && exports_para.SearchEngine.search_engines[b.search_engine].enabled && this.preloadSearch(b))
		},
		preloadMutex: 0,
		preloadSearch: function(a) {
			var b = this;
			this.cancelPreloadSearch();
			var e = this.preloadMutex;
			exports_para.service.get_search_engines({}, null, function(f) {
				if ("zh" == f.locale) {
					var g = f.search_engines[f.locale],
						l = function(f) {
							e == b.preloadMutex && f < g.length && (g[f].name != a.search_engine && g[f].enabled ? b.backupCookie(g[f], function() {
								exports_para.service.helper.search({
									search_engine: g[f].name,
									request: a.request,
									callback: function() {
										b.restoreCookie(g[f]);
										l(f + 1)
									}
								})
							}) : l(f + 1))
						};
					l(0)
				}
			})
		},
		cancelPreloadSearch: function() {
			this.preloadMutex++
		},
		get_top_level_domain: function(a) {
			var b = exports_para.parse_url(a, "PHP_URL_HOST"),
				a = b.match(/\.(com|co|org|net)\.(cn|uk|jp|hk|us|ca)$/) ? 3 : 2,
				b = b.split(".");
			return b.slice(Math.max(b.length - a, 0)).join(".")
		},
		backupCookies: {},
		backupCookie: function(a, b) {
			var e = this,
				f = a.name,
				g;
			"amazoncn" == f ? (g = {
				url: "http://www.amazon.cn",
				name: "session-id"
			}, chrome.cookies.get(g, function(a) {
				a && a.value && (e.backupCookies[f] = a.value);
				chrome.cookies.set({
					domain: ".amazon.cn",
					path: "/",
					url: "http://www.amazon.cn",
					name: "session-id",
					value: "tmp-session-id"
				}, function(a) {
					exports_para.console.debug("Set session-id in cookie for amazoncn: " + a.value);
					b && b()
				})
			})) : "dangdang" == f ? (g = {
				url: "http://www.dangdang.com",
				name: "HK"
			}, chrome.cookies.get(g, function(a) {
				a && a.value && (e.backupCookies[f] = a.value);
				b && b()
			})) : b && b()
		},
		restoreCookie: function(a) {
			a = a.name;
			"amazoncn" == a ? chrome.cookies.set({
				domain: ".amazon.cn",
				path: "/",
				url: "http://www.amazon.cn",
				name: "session-id",
				value: this.backupCookies[a]
			}, function(a) {
				exports_para.console.debug("Restore cookie session-id for amazoncn: " +
					a.value)
			}) : "dangdang" == a && chrome.cookies.set({
				domain: ".dangdang.com",
				path: "/",
				url: "http://www.dangdang.com",
				name: "HK",
				value: this.backupCookies[a]
			}, function(a) {
				exports_para.console.debug("Restore cookie HK for dangdang: " + a.value)
			})
		}
	};
	exports_para.service = service_local
})(fetch_exports);


exports.fetch=fetch_exports;
