if (!exports)var exports = {};
(function (kc, Ea, ea) {
    var G = Ea;
    G || (G = {});
    var Fa = G;
    Fa.browser || (Fa.browser = {});
    Fa.browser.extension = {sendRequest: function (a, b) {
        "undefined" == typeof b && (b = function () {
        });
        chrome.extension.sendRequest(a, b)
    }, onRequest: {addListener: function (a) {
        chrome.extension.onRequest.addListener(a)
    }, removeListener: function (a) {
        chrome.extension.onRequest.removeListener(a)
    }}, getURL: function (a) {
        return chrome.extension.getURL(a || "")
    }};
    Ea.console = {debug: function (a) {
        Ea.browser.extension.sendRequest({topic: "log_message", message: a})
    }};
    G || (G = {});
    var A = G;
    A.PageCache = function (a, b, c) {
        return c ? new A.PageCache.async(a, b) : new A.PageCache.sync(a, b)
    };
    A.PageCache.sync = function (a, b) {
        0 != arguments.length && (this.page_no = -1, this.pager_total_entries = this.pager_total_pages = void 0, this.cache = [], "function" == typeof a ? (this.generator = a, this.generator_finished = !1) : (this.pager = a.get, this.pager_page_size = a.PageSize), this.page_size = b.PageSize)
    };
    A.PageCache.sync.prototype = {next: function () {
        var a = [];
        this.hasNext() && (this.page_no++, a = this.get(this.page_no +
            1).Entries, 0 == a.length && this.page_no--);
        return a
    }, previous: function () {
        var a = [];
        this.hasPrevious() && (this.page_no--, a = this.get(this.page_no + 1).Entries);
        return a
    }, hasNext: function () {
        var a = this.getTotalPages();
        return isNaN(a) ? !0 : this.page_no + 1 < a
    }, hasPrevious: function () {
        return 0 < this.page_no
    }, getTotalPages: function () {
        var a;
        if (this.pager) {
            if ("undefined" == typeof this.pager_total_pages)return NaN;
            a = "undefined" == typeof this.pager_total_entries ? "undefined" != typeof this.cache[this.pager_total_pages - 1] ? (this.pager_total_pages -
                1) * this.pager_page_size + this.cache[this.pager_total_pages - 1].Entries.length : this.pager_total_pages * this.pager_page_size : this.pager_total_entries
        } else if (this.generator_finished)a = this.cache.length; else return NaN;
        return Math.ceil(a / this.page_size)
    }, get: function (a) {
        a = parseInt(a);
        if (isNaN(a) || 1 > a)a = 1;
        var b = [], c = (a - 1) * this.page_size, a = a * this.page_size;
        if (this.pager) {
            for (var d = Math.floor(c / this.pager_page_size), e = Math.ceil(a / this.pager_page_size), f = d; f < e; f++) {
                "undefined" == typeof this.cache[f] && (this.cache[f] =
                    this.pager(f + 1));
                var h = this.pager_page_size * f;
                b.push.apply(b, this.cache[f].Entries.slice(h >= c ? 0 : c - h, h + this.pager_page_size > a ? a - h : this.pager_page_size));
                "undefined" == typeof this.pager_total_pages && (this.pager_total_pages = this.cache[f].TotalPages);
                e = Math.min(e, this.pager_total_pages)
            }
            "undefined" != typeof this.cache[d] && this.cache[d].TotalEntries && (this.pager_total_entries = this.cache[d].TotalEntries)
        } else {
            for (; !this.generator_finished && this.cache.length < a;)b = this.generator(), 0 == b.length && (this.generator_finished = !0), this.cache.push.apply(this.cache, b);
            b = this.cache.slice(c, a)
        }
        return{TotalPages: this.getTotalPages(), Entries: b}
    }, reset: function () {
        this.page_no = -1
    }};
    A.PageCache.async = function (a, b) {
        A.PageCache.sync.call(this, a, b)
    };
    A.PageCache.async.prototype = new A.PageCache.sync;
    A.PageCache.async.prototype.constructor = A.PageCache.async;
    A.PageCache.async.prototype.next = function (a) {
        if (this.hasNext()) {
            this.page_no++;
            var b = this;
            this.get(this.page_no + 1, function (c) {
                c = c.Entries;
                0 == c.length && b.page_no--;
                a(c)
            })
        } else a([])
    };
    A.PageCache.async.prototype.previous = function (a) {
        this.hasPrevious() ? (this.page_no--, this.get(this.page_no + 1, function (b) {
            a(b.Entries)
        })) : a([])
    };
    A.PageCache.async.prototype.get = function (a, b) {
        var c = this, a = parseInt(a);
        if (isNaN(a) || 1 > a)a = 1;
        var d = (a - 1) * this.page_size, e = a * this.page_size, f = [], h = function () {
            b({TotalPages: c.getTotalPages(), Entries: f}, a)
        };
        if (this.pager) {
            var I = Math.floor(d / this.pager_page_size), m = Math.ceil(e / this.pager_page_size), v = function (a, b) {
                if (a >= m)"undefined" != typeof c.cache[I] && c.cache[I].TotalEntries &&
                    (c.pager_total_entries = c.cache[I].TotalEntries), h(); else {
                    var f = function (a, f) {
                        a -= 1;
                        c.cache[a] = f;
                        var h = c.pager_page_size * a;
                        b.push.apply(b, c.cache[a].Entries.slice(h >= d ? 0 : d - h, h + c.pager_page_size > e ? e - h : c.pager_page_size));
                        "undefined" == typeof c.pager_total_pages && (c.pager_total_pages = c.cache[a].TotalPages);
                        m = Math.min(m, c.pager_total_pages);
                        v(a + 1, b)
                    };
                    "undefined" == typeof c.cache[a] ? c.pager(a + 1, f) : f(a + 1, c.cache[a])
                }
            };
            v(I, f)
        } else if (!this.generator_finished && this.cache.length < e) {
            var E = function (a) {
                a && 0 == a.length &&
                (c.generator_finished = !0);
                c.cache.push.apply(c.cache, a);
                !c.generator_finished && c.cache.length < e ? c.generator(E) : (f = c.cache.slice(d, e), h())
            };
            this.generator(E)
        } else f = c.cache.slice(d, e), h()
    };
    var Q = jQuery;
    Q.color = {};
    Q.color.make = function (a, b, c, d) {
        var e = {};
        e.r = a || 0;
        e.g = b || 0;
        e.b = c || 0;
        e.a = null != d ? d : 1;
        e.add = function (a, b) {
            for (var c = 0; c < a.length; ++c)e[a.charAt(c)] += b;
            return e.normalize()
        };
        e.scale = function (a, b) {
            for (var c = 0; c < a.length; ++c)e[a.charAt(c)] *= b;
            return e.normalize()
        };
        e.toString = function () {
            return 1 <=
                e.a ? "rgb(" + [e.r, e.g, e.b].join() + ")" : "rgba(" + [e.r, e.g, e.b, e.a].join() + ")"
        };
        e.normalize = function () {
            function a(b, c, d) {
                return c < b ? b : c > d ? d : c
            }

            e.r = a(0, parseInt(e.r), 255);
            e.g = a(0, parseInt(e.g), 255);
            e.b = a(0, parseInt(e.b), 255);
            e.a = a(0, e.a, 1);
            return e
        };
        e.clone = function () {
            return Q.color.make(e.r, e.b, e.g, e.a)
        };
        return e.normalize()
    };
    Q.color.extract = function (a, b) {
        var c;
        do {
            c = a.css(b).toLowerCase();
            if ("" != c && "transparent" != c)break;
            a = a.parent()
        } while (!Q.nodeName(a.get(0), "body"));
        "rgba(0, 0, 0, 0)" == c && (c = "transparent");
        return Q.color.parse(c)
    };
    Q.color.parse = function (a) {
        var b, c = Q.color.make;
        if (b = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))return c(parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3], 10));
        if (b = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a))return c(parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3], 10), parseFloat(b[4]));
        if (b = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))return c(2.55 *
            parseFloat(b[1]), 2.55 * parseFloat(b[2]), 2.55 * parseFloat(b[3]));
        if (b = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a))return c(2.55 * parseFloat(b[1]), 2.55 * parseFloat(b[2]), 2.55 * parseFloat(b[3]), parseFloat(b[4]));
        if (b = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))return c(parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16));
        if (b = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))return c(parseInt(b[1] +
            b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16));
        a = Q.trim(a).toLowerCase();
        if ("transparent" == a)return c(255, 255, 255, 0);
        b = Cb[a] || [0, 0, 0];
        return c(b[0], b[1], b[2])
    };
    var Cb = {aqua: [0, 255, 255], azure: [240, 255, 255], beige: [245, 245, 220], black: [0, 0, 0], blue: [0, 0, 255], brown: [165, 42, 42], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgrey: [169, 169, 169], darkgreen: [0, 100, 0], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204],
        darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkviolet: [148, 0, 211], fuchsia: [255, 0, 255], gold: [255, 215, 0], green: [0, 128, 0], indigo: [75, 0, 130], khaki: [240, 230, 140], lightblue: [173, 216, 230], lightcyan: [224, 255, 255], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightyellow: [255, 255, 224], lime: [0, 255, 0], magenta: [255, 0, 255], maroon: [128, 0, 0], navy: [0, 0, 128], olive: [128, 128, 0], orange: [255, 165, 0], pink: [255, 192, 203], purple: [128, 0, 128], violet: [128, 0, 128], red: [255, 0, 0], silver: [192, 192, 192], white: [255,
            255, 255], yellow: [255, 255, 0]}, m = jQuery, Db = function (a, b, c, d) {
        function e(a, b) {
            for (var b = [B].concat(b), c = 0; c < a.length; ++c)a[c].apply(this, b)
        }

        function f(a) {
            for (var b = [], c = 0; c < a.length; ++c) {
                var d = m.extend(!0, {}, g.series);
                null != a[c].data ? (d.data = a[c].data, delete a[c].data, m.extend(!0, d, a[c]), a[c].data = d.data) : d.data = a[c];
                b.push(d)
            }
            D = b;
            b = D.length;
            c = [];
            d = [];
            for (a = 0; a < D.length; ++a) {
                var j = D[a].color;
                null != j && (--b, "number" == typeof j ? d.push(j) : c.push(m.color.parse(D[a].color)))
            }
            for (a = 0; a < d.length; ++a)b = Math.max(b,
                d[a] + 1);
            c = [];
            for (a = d = 0; c.length < b;)j = g.colors.length == a ? m.color.make(100, 100, 100) : m.color.parse(g.colors[a]), j.scale("rgb", 1 + 0.2 * (1 == d % 2 ? -1 : 1) * Math.ceil(d / 2)), c.push(j), ++a, a >= g.colors.length && (a = 0, ++d);
            for (a = b = 0; a < D.length; ++a) {
                d = D[a];
                null == d.color ? (d.color = c[b].toString(), ++b) : "number" == typeof d.color && (d.color = c[d.color].toString());
                if (null == d.lines.show) {
                    var f, j = !0;
                    for (f in d)if (d[f] && d[f].show) {
                        j = !1;
                        break
                    }
                    j && (d.lines.show = !0)
                }
                d.xaxis = H(J, h(d, "x"));
                d.yaxis = H(L, h(d, "y"))
            }
            f = function (a, b, c) {
                b < a.datamin &&
                    b != -C && (a.datamin = b);
                c > a.datamax && c != C && (a.datamax = c)
            };
            var k = Number.POSITIVE_INFINITY, p = Number.NEGATIVE_INFINITY, C = Number.MAX_VALUE, l, q, x, V, r;
            m.each(I(), function (a, b) {
                b.datamin = k;
                b.datamax = p;
                b.used = !1
            });
            for (a = 0; a < D.length; ++a)b = D[a], b.datapoints = {points: []}, e(R.processRawData, [b, b.data, b.datapoints]);
            for (a = 0; a < D.length; ++a) {
                var b = D[a], t = b.data, s = b.datapoints.format;
                if (!s) {
                    s = [];
                    s.push({x: !0, number: !0, required: !0});
                    s.push({y: !0, number: !0, required: !0});
                    if (b.bars.show || b.lines.show && b.lines.fill)s.push({y: !0,
                        number: !0, required: !1, defaultValue: 0}), b.bars.horizontal && (delete s[s.length - 1].y, s[s.length - 1].x = !0);
                    b.datapoints.format = s
                }
                if (null == b.datapoints.pointsize) {
                    b.datapoints.pointsize = s.length;
                    q = b.datapoints.pointsize;
                    j = b.datapoints.points;
                    insertSteps = b.lines.show && b.lines.steps;
                    b.xaxis.used = b.yaxis.used = !0;
                    for (c = l = 0; c < t.length; ++c, l += q) {
                        r = t[c];
                        var y = null == r;
                        if (!y)for (d = 0; d < q; ++d) {
                            x = r[d];
                            if (V = s[d])V.number && null != x && (x = +x, isNaN(x) ? x = null : Infinity == x ? x = C : -Infinity == x && (x = -C)), null == x && (V.required && (y = !0), null != V.defaultValue && (x = V.defaultValue));
                            j[l + d] = x
                        }
                        if (y)for (d = 0; d < q; ++d)x = j[l + d], null != x && (V = s[d], V.x && f(b.xaxis, x, x), V.y && f(b.yaxis, x, x)), j[l + d] = null; else if (insertSteps && 0 < l && null != j[l - q] && j[l - q] != j[l] && j[l - q + 1] != j[l + 1]) {
                            for (d = 0; d < q; ++d)j[l + q + d] = j[l + d];
                            j[l + 1] = j[l - q + 1];
                            l += q
                        }
                    }
                }
            }
            for (a = 0; a < D.length; ++a)b = D[a], e(R.processDatapoints, [b, b.datapoints]);
            for (a = 0; a < D.length; ++a) {
                b = D[a];
                j = b.datapoints.points;
                q = b.datapoints.pointsize;
                r = l = k;
                y = t = p;
                for (c = 0; c < j.length; c += q)if (null != j[c])for (d = 0; d < q; ++d)if (x =
                    j[c + d], (V = s[d]) && !(x == C || x == -C))V.x && (x < l && (l = x), x > t && (t = x)), V.y && (x < r && (r = x), x > y && (y = x));
                b.bars.show && (c = "left" == b.bars.align ? 0 : -b.bars.barWidth / 2, b.bars.horizontal ? (r += c, y += c + b.bars.barWidth) : (l += c, t += c + b.bars.barWidth));
                f(b.xaxis, l, t);
                f(b.yaxis, r, y)
            }
            m.each(I(), function (a, b) {
                b.datamin == k && (b.datamin = null);
                b.datamax == p && (b.datamax = null)
            })
        }

        function h(a, b) {
            var c = a[b + "axis"];
            "object" == typeof c && (c = c.n);
            "number" != typeof c && (c = 1);
            return c
        }

        function I() {
            return m.grep(J.concat(L), function (a) {
                return a
            })
        }

        function v(a) {
            var b = {}, c, d;
            for (c = 0; c < J.length; ++c)(d = J[c]) && d.used && (b["x" + d.n] = d.c2p(a.left));
            for (c = 0; c < L.length; ++c)(d = L[c]) && d.used && (b["y" + d.n] = d.c2p(a.top));
            b.x1 !== ea && (b.x = b.x1);
            b.y1 !== ea && (b.y = b.y1);
            return b
        }

        function H(a, b) {
            a[b - 1] || (a[b - 1] = {n: b, direction: a == J ? "x" : "y", options: m.extend(!0, {}, a == J ? g.xaxis : g.yaxis)});
            return a[b - 1]
        }

        function E(b, c) {
            var d = document.createElement("canvas");
            d.className = c;
            d.width = K;
            d.height = M;
            b || m(d).css({position: "absolute", left: 0, top: 0});
            m(d).appendTo(a);
            d.getContext ||
            (d = window.G_vmlCanvasManager.initElement(d));
            d.getContext("2d").save();
            return d
        }

        function G() {
            K = a.width();
            M = a.height();
            if (0 >= K || 0 >= M)throw"Invalid dimensions for plot, width = " + K + ", height = " + M;
        }

        function A(a) {
            a.width != K && (a.width = K);
            a.height != M && (a.height = M);
            a = a.getContext("2d");
            a.restore();
            a.save()
        }

        function P(a) {
            var b = a.labelWidth, c = a.labelHeight, d = a.options.position, e = a.options.tickLength, f = g.grid.axisMargin, h = g.grid.labelMargin, k = "x" == a.direction ? J : L, C = m.grep(k, function (a) {
                return a && a.options.position ==
                    d && a.reserveSpace
            });
            m.inArray(a, C) == C.length - 1 && (f = 0);
            null == e && (e = "full");
            k = m.grep(k, function (a) {
                return a && a.reserveSpace
            });
            k = 0 == m.inArray(a, k);
            !k && "full" == e && (e = 5);
            isNaN(+e) || (h += +e);
            "x" == a.direction ? (c += h, "bottom" == d ? (p.bottom += c + f, a.box = {top: M - p.bottom, height: c}) : (a.box = {top: p.top + f, height: c}, p.top += c + f)) : (b += h, "left" == d ? (a.box = {left: p.left + f, width: b}, p.left += b + f) : (p.right += b + f, a.box = {left: K - p.right, width: b}));
            a.position = d;
            a.tickLength = e;
            a.box.padding = h;
            a.innermost = k
        }

        function N() {
            var b, c = I();
            m.each(c,
                function (a, b) {
                    b.show = b.options.show;
                    null == b.show && (b.show = b.used);
                    b.reserveSpace = b.show || b.options.reserveSpace;
                    var c = b.options, d = +(null != c.min ? c.min : b.datamin), e = +(null != c.max ? c.max : b.datamax), j = e - d;
                    if (0 == j) {
                        if (j = 0 == e ? 1 : 0.01, null == c.min && (d -= j), null == c.max || null != c.min)e += j
                    } else {
                        var f = c.autoscaleMargin;
                        null != f && (null == c.min && (d -= j * f, 0 > d && (null != b.datamin && 0 <= b.datamin) && (d = 0)), null == c.max && (e += j * f, 0 < e && (null != b.datamax && 0 >= b.datamax) && (e = 0)))
                    }
                    b.min = d;
                    b.max = e
                });
            allocatedAxes = m.grep(c, function (a) {
                return a.reserveSpace
            });
            p.left = p.right = p.top = p.bottom = 0;
            if (g.grid.show) {
                m.each(allocatedAxes, function (b, c) {
                    var d = c.options, e;
                    e = "number" == typeof d.ticks && 0 < d.ticks ? d.ticks : 0.3 * Math.sqrt("x" == c.direction ? K : M);
                    e = (c.max - c.min) / e;
                    var j, f, w, n;
                    if ("time" == d.mode) {
                        var u = {second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, month: 2592E6, year: 525949.2 * 6E4};
                        n = [
                            [1, "second"],
                            [2, "second"],
                            [5, "second"],
                            [10, "second"],
                            [30, "second"],
                            [1, "minute"],
                            [2, "minute"],
                            [5, "minute"],
                            [10, "minute"],
                            [30, "minute"],
                            [1, "hour"],
                            [2, "hour"],
                            [4, "hour"],
                            [8, "hour"],
                            [12, "hour"],
                            [1, "day"],
                            [2, "day"],
                            [3, "day"],
                            [0.25, "month"],
                            [0.5, "month"],
                            [1, "month"],
                            [2, "month"],
                            [3, "month"],
                            [6, "month"],
                            [1, "year"]
                        ];
                        j = 0;
                        null != d.minTickSize && (j = "number" == typeof d.tickSize ? d.tickSize : d.minTickSize[0] * u[d.minTickSize[1]]);
                        for (f = 0; f < n.length - 1 && !(e < (n[f][0] * u[n[f][1]] + n[f + 1][0] * u[n[f + 1][1]]) / 2 && n[f][0] * u[n[f][1]] >= j); ++f);
                        j = n[f][0];
                        w = n[f][1];
                        "year" == w && (f = Math.pow(10, Math.floor(Math.log(e / u.year) / Math.LN10)), n = e / u.year / f, j = (1.5 > n ? 1 : 3 > n ? 2 : 7.5 > n ? 5 : 10) * f);
                        c.tickSize = d.tickSize || [j, w];
                        f = function (a) {
                            var b =
                                [], c = a.tickSize[0], d = a.tickSize[1], e = new Date(a.min), j = c * u[d];
                            "second" == d && e.setUTCSeconds(ta(e.getUTCSeconds(), c));
                            "minute" == d && e.setUTCMinutes(ta(e.getUTCMinutes(), c));
                            "hour" == d && e.setUTCHours(ta(e.getUTCHours(), c));
                            "month" == d && e.setUTCMonth(ta(e.getUTCMonth(), c));
                            "year" == d && e.setUTCFullYear(ta(e.getUTCFullYear(), c));
                            e.setUTCMilliseconds(0);
                            j >= u.minute && e.setUTCSeconds(0);
                            j >= u.hour && e.setUTCMinutes(0);
                            j >= u.day && e.setUTCHours(0);
                            j >= 4 * u.day && e.setUTCDate(1);
                            j >= u.year && e.setUTCMonth(0);
                            var f = 0, w = Number.NaN,
                                n;
                            do if (n = w, w = e.getTime(), b.push(w), "month" == d)if (1 > c) {
                                e.setUTCDate(1);
                                var g = e.getTime();
                                e.setUTCMonth(e.getUTCMonth() + 1);
                                var z = e.getTime();
                                e.setTime(w + f * u.hour + (z - g) * c);
                                f = e.getUTCHours();
                                e.setUTCHours(0)
                            } else e.setUTCMonth(e.getUTCMonth() + c); else"year" == d ? e.setUTCFullYear(e.getUTCFullYear() + c) : e.setTime(w + j); while (w < a.max && w != n);
                            return b
                        };
                        j = function (a, b) {
                            var c = new Date(a);
                            if (null != d.timeformat)return m.plot.formatDate(c, d.timeformat, d.monthNames);
                            var e = b.tickSize[0] * u[b.tickSize[1]], j = b.max - b.min,
                                f = d.twelveHourClock ? " %p" : "";
                            fmt = e < u.minute ? "%h:%M:%S" + f : e < u.day ? j < 2 * u.day ? "%h:%M" + f : "%b %d %h:%M" + f : e < u.month ? "%b %d" : e < u.year ? j < u.year ? "%b" : "%b %y" : "%y";
                            return m.plot.formatDate(c, fmt, d.monthNames)
                        }
                    } else {
                        w = d.tickDecimals;
                        var g = -Math.floor(Math.log(e) / Math.LN10);
                        null != w && g > w && (g = w);
                        f = Math.pow(10, -g);
                        n = e / f;
                        if (1.5 > n)j = 1; else if (3 > n) {
                            if (j = 2, 2.25 < n && (null == w || g + 1 <= w))j = 2.5, ++g
                        } else j = 7.5 > n ? 5 : 10;
                        j *= f;
                        null != d.minTickSize && j < d.minTickSize && (j = d.minTickSize);
                        c.tickDecimals = Math.max(0, null != w ? w : g);
                        c.tickSize =
                            d.tickSize || j;
                        f = function (a) {
                            var b = [], c = ta(a.min, a.tickSize), d = 0, e = Number.NaN, j;
                            do j = e, e = c + d * a.tickSize, b.push(e), ++d; while (e < a.max && e != j);
                            return b
                        };
                        j = function (a, b) {
                            return a.toFixed(b.tickDecimals)
                        }
                    }
                    if (null != d.alignTicksWithAxis) {
                        var z = ("x" == c.direction ? J : L)[d.alignTicksWithAxis - 1];
                        z && (z.used && z != c) && (f = f(c), 0 < f.length && (null == d.min && (c.min = Math.min(c.min, f[0])), null == d.max && 1 < f.length && (c.max = Math.max(c.max, f[f.length - 1]))), f = function (a) {
                            var b = [], c, d;
                            for (d = 0; d < z.ticks.length; ++d)c = (z.ticks[d].v - z.min) /
                                (z.max - z.min), c = a.min + c * (a.max - a.min), b.push(c);
                            return b
                        }, "time" != c.mode && null == d.tickDecimals && (e = Math.max(0, -Math.floor(Math.log(e) / Math.LN10) + 1), n = f(c), 1 < n.length && /\..*0$/.test((n[1] - n[0]).toFixed(e)) || (c.tickDecimals = e)))
                    }
                    c.tickGenerator = f;
                    c.tickFormatter = m.isFunction(d.tickFormatter) ? function (a, b) {
                        return"" + d.tickFormatter(a, b)
                    } : j;
                    j = c.options.ticks;
                    e = [];
                    null == j || "number" == typeof j && 0 < j ? e = c.tickGenerator(c) : j && (e = m.isFunction(j) ? j({min: c.min, max: c.max}) : j);
                    c.ticks = [];
                    for (j = 0; j < e.length; ++j)n =
                        null, w = e[j], "object" == typeof w ? (f = +w[0], 1 < w.length && (n = w[1])) : f = +w, null == n && (n = c.tickFormatter(f, c)), isNaN(f) || c.ticks.push({v: f, label: n});
                    e = c.ticks;
                    c.options.autoscaleMargin && 0 < e.length && (null == c.options.min && (c.min = Math.min(c.min, e[0].v)), null == c.options.max && 1 < e.length && (c.max = Math.max(c.max, e[e.length - 1].v)));
                    j = function (b, d) {
                        return m('<div style="position:absolute;top:-10000px;' + d + 'font-size:smaller"><div class="' + c.direction + "Axis " + c.direction + c.n + 'Axis">' + b.join("") + "</div></div>").appendTo(a)
                    };
                    w = c.options;
                    f = c.ticks || [];
                    n = [];
                    var k;
                    e = w.labelWidth;
                    w = w.labelHeight;
                    if ("x" == c.direction) {
                        if (null == e && (e = Math.floor(K / (0 < f.length ? f.length : 1))), null == w) {
                            n = [];
                            for (g = 0; g < f.length; ++g)(k = f[g].label) && n.push('<div class="tickLabel" style="float:left;width:' + e + 'px">' + k + "</div>");
                            0 < n.length && (n.push('<div style="clear:left"></div>'), j = j(n, "width:10000px;"), w = j.height(), j.remove())
                        }
                    } else if (null == e || null == w) {
                        for (g = 0; g < f.length; ++g)(k = f[g].label) && n.push('<div class="tickLabel">' + k + "</div>");
                        0 < n.length && (j =
                            j(n, ""), null == e && (e = j.children().width()), null == w && (w = j.find("div.tickLabel").height()), j.remove())
                    }
                    null == e && (e = 0);
                    null == w && (w = 0);
                    c.labelWidth = e;
                    c.labelHeight = w
                });
                for (b = allocatedAxes.length - 1; 0 <= b; --b)P(allocatedAxes[b]);
                var d = g.grid.minBorderMargin;
                if (null == d)for (b = d = 0; b < D.length; ++b)d = Math.max(d, D[b].points.radius + D[b].points.lineWidth / 2);
                for (var e in p)p[e] += g.grid.borderWidth, p[e] = Math.max(d, p[e])
            }
            aa = K - p.left - p.right;
            W = M - p.bottom - p.top;
            m.each(c, function (a, b) {
                var c = function (a) {
                    return a
                }, d, e, j =
                    b.options.transform || c, f = b.options.inverseTransform;
                "x" == b.direction ? (d = b.scale = aa / Math.abs(j(b.max) - j(b.min)), e = Math.min(j(b.max), j(b.min))) : (d = b.scale = W / Math.abs(j(b.max) - j(b.min)), d = -d, e = Math.max(j(b.max), j(b.min)));
                b.p2c = j == c ? function (a) {
                    return(a - e) * d
                } : function (a) {
                    return(j(a) - e) * d
                };
                b.c2p = f ? function (a) {
                    return f(e + a / d)
                } : function (a) {
                    return e + a / d
                }
            });
            if (g.grid.show) {
                m.each(allocatedAxes, function (a, b) {
                    "x" == b.direction ? (b.box.left = p.left, b.box.width = aa) : (b.box.top = p.top, b.box.height = W)
                });
                a.find(".tickLabels").remove();
                b = ['<div class="tickLabels" style="font-size:smaller">'];
                c = I();
                for (d = 0; d < c.length; ++d) {
                    e = c[d];
                    var j = e.box;
                    if (e.show) {
                        b.push('<div class="' + e.direction + "Axis " + e.direction + e.n + 'Axis" style="color:' + e.options.color + '">');
                        for (var f = 0; f < e.ticks.length; ++f) {
                            var h = e.ticks[f];
                            if (h.label && !(h.v < e.min || h.v > e.max)) {
                                var k = {}, C;
                                "x" == e.direction ? (C = "center", k.left = Math.round(p.left + e.p2c(h.v) - e.labelWidth / 2), "bottom" == e.position ? k.top = j.top + j.padding : k.bottom = M - (j.top + j.height - j.padding)) : (k.top = Math.round(p.top +
                                    e.p2c(h.v) - e.labelHeight / 2), "left" == e.position ? (k.right = K - (j.left + j.width - j.padding), C = "right") : (k.left = j.left + j.padding, C = "left"));
                                k.width = e.labelWidth;
                                C = ["position:absolute", "text-align:" + C];
                                for (var l in k)C.push(l + ":" + k[l] + "px");
                                b.push('<div class="tickLabel" style="' + C.join(";") + '">' + h.label + "</div>")
                            }
                        }
                        b.push("</div>")
                    }
                }
                b.push("</div>");
                a.append(b.join(""))
            }
            a.find(".legend").remove();
            if (g.legend.show) {
                l = [];
                b = !1;
                c = g.legend.labelFormatter;
                for (j = 0; j < D.length; ++j)if (d = D[j], e = d.label)0 == j % g.legend.noColumns &&
                    (b && l.push("</tr>"), l.push("<tr>"), b = !0), c && (e = c(e, d)), l.push('<td class="legendColorBox"><div style="border:1px solid ' + g.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + d.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + e + "</td>");
                b && l.push("</tr>");
                0 != l.length && (b = '<table style="font-size:smaller;color:' + g.grid.color + '">' + l.join("") + "</table>", null != g.legend.container ? m(g.legend.container).html(b) : (l = "", c = g.legend.position, d = g.legend.margin,
                    null == d[0] && (d = [d, d]), "n" == c.charAt(0) ? l += "top:" + (d[1] + p.top) + "px;" : "s" == c.charAt(0) && (l += "bottom:" + (d[1] + p.bottom) + "px;"), "e" == c.charAt(1) ? l += "right:" + (d[0] + p.right) + "px;" : "w" == c.charAt(1) && (l += "left:" + (d[0] + p.left) + "px;"), b = m('<div class="legend">' + b.replace('style="', 'style="position:absolute;' + l + ";") + "</div>").appendTo(a), 0 != g.legend.backgroundOpacity && (c = g.legend.backgroundColor, null == c && (c = (c = g.grid.backgroundColor) && "string" == typeof c ? m.color.parse(c) : m.color.extract(b, "background-color"),
                    c.a = 1, c = c.toString()), d = b.children(), m('<div style="position:absolute;width:' + d.width() + "px;height:" + d.height() + "px;" + l + "background-color:" + c + ';"> </div>').prependTo(b).css("opacity", g.legend.backgroundOpacity))))
            }
        }

        function O() {
            k.clearRect(0, 0, K, M);
            var a = g.grid;
            a.show && a.backgroundColor && (k.save(), k.translate(p.left, p.top), k.fillStyle = ra(g.grid.backgroundColor, W, 0, "rgba(255, 255, 255, 0)"), k.fillRect(0, 0, aa, W), k.restore());
            a.show && !a.aboveData && T();
            for (var b = 0; b < D.length; ++b) {
                e(R.drawSeries, [k, D[b]]);
                var c = D[b];
                c.lines.show && fa(c);
                c.bars.show && ma(c);
                c.points.show && ga(c)
            }
            e(R.draw, [k]);
            a.show && a.aboveData && T()
        }

        function Q(a, b) {
            var c, d, e, f, g = I();
            for (i = 0; i < g.length; ++i)if (c = g[i], c.direction == b && (f = b + c.n + "axis", !a[f] && 1 == c.n && (f = b + "axis"), a[f])) {
                d = a[f].from;
                e = a[f].to;
                break
            }
            a[f] || (c = "x" == b ? J[0] : L[0], d = a[b + "1"], e = a[b + "2"]);
            null != d && (null != e && d > e) && (f = d, d = e, e = f);
            return{from: d, to: e, axis: c}
        }

        function T() {
            var a;
            k.save();
            k.translate(p.left, p.top);
            var b = g.grid.markings;
            if (b) {
                if (m.isFunction(b)) {
                    var c = B.getAxes();
                    c.xmin = c.xaxis.min;
                    c.xmax = c.xaxis.max;
                    c.ymin = c.yaxis.min;
                    c.ymax = c.yaxis.max;
                    b = b(c)
                }
                for (a = 0; a < b.length; ++a) {
                    var c = b[a], d = Q(c, "x"), e = Q(c, "y");
                    null == d.from && (d.from = d.axis.min);
                    null == d.to && (d.to = d.axis.max);
                    null == e.from && (e.from = e.axis.min);
                    null == e.to && (e.to = e.axis.max);
                    d.to < d.axis.min || (d.from > d.axis.max || e.to < e.axis.min || e.from > e.axis.max) || (d.from = Math.max(d.from, d.axis.min), d.to = Math.min(d.to, d.axis.max), e.from = Math.max(e.from, e.axis.min), e.to = Math.min(e.to, e.axis.max), d.from == d.to && e.from == e.to ||
                        (d.from = d.axis.p2c(d.from), d.to = d.axis.p2c(d.to), e.from = e.axis.p2c(e.from), e.to = e.axis.p2c(e.to), d.from == d.to || e.from == e.to ? (k.beginPath(), k.strokeStyle = c.color || g.grid.markingsColor, k.lineWidth = c.lineWidth || g.grid.markingsLineWidth, k.moveTo(d.from, e.from), k.lineTo(d.to, e.to), k.stroke()) : (k.fillStyle = c.color || g.grid.markingsColor, k.fillRect(d.from, e.to, d.to - d.from, e.from - e.to))))
                }
            }
            c = I();
            b = g.grid.borderWidth;
            for (d = 0; d < c.length; ++d) {
                e = c[d];
                a = e.box;
                var f = e.tickLength, h, U, C, l;
                if (e.show && 0 != e.ticks.length) {
                    k.strokeStyle =
                        e.options.tickColor || m.color.parse(e.options.color).scale("a", 0.22).toString();
                    k.lineWidth = 1;
                    "x" == e.direction ? (h = 0, U = "full" == f ? "top" == e.position ? 0 : W : a.top - p.top + ("top" == e.position ? a.height : 0)) : (U = 0, h = "full" == f ? "left" == e.position ? 0 : aa : a.left - p.left + ("left" == e.position ? a.width : 0));
                    e.innermost || (k.beginPath(), C = l = 0, "x" == e.direction ? C = aa : l = W, 1 == k.lineWidth && (h = Math.floor(h) + 0.5, U = Math.floor(U) + 0.5), k.moveTo(h, U), k.lineTo(h + C, U + l), k.stroke());
                    k.beginPath();
                    for (a = 0; a < e.ticks.length; ++a) {
                        var q = e.ticks[a].v;
                        C = l = 0;
                        q < e.min || (q > e.max || "full" == f && 0 < b && (q == e.min || q == e.max)) || ("x" == e.direction ? (h = e.p2c(q), l = "full" == f ? -W : f, "top" == e.position && (l = -l)) : (U = e.p2c(q), C = "full" == f ? -aa : f, "left" == e.position && (C = -C)), 1 == k.lineWidth && ("x" == e.direction ? h = Math.floor(h) + 0.5 : U = Math.floor(U) + 0.5), k.moveTo(h, U), k.lineTo(h + C, U + l))
                    }
                    k.stroke()
                }
            }
            b && (k.lineWidth = b, k.strokeStyle = g.grid.borderColor, k.strokeRect(-b / 2, -b / 2, aa + b, W + b));
            k.restore()
        }

        function fa(a) {
            function b(a, c, d, e, f) {
                var j = a.points, a = a.pointsize, w = null, g = null;
                k.beginPath();
                for (var h = a; h < j.length; h += a) {
                    var u = j[h - a], n = j[h - a + 1], l = j[h], z = j[h + 1];
                    if (!(null == u || null == l)) {
                        if (n <= z && n < f.min) {
                            if (z < f.min)continue;
                            u = (f.min - n) / (z - n) * (l - u) + u;
                            n = f.min
                        } else if (z <= n && z < f.min) {
                            if (n < f.min)continue;
                            l = (f.min - n) / (z - n) * (l - u) + u;
                            z = f.min
                        }
                        if (n >= z && n > f.max) {
                            if (z > f.max)continue;
                            u = (f.max - n) / (z - n) * (l - u) + u;
                            n = f.max
                        } else if (z >= n && z > f.max) {
                            if (n > f.max)continue;
                            l = (f.max - n) / (z - n) * (l - u) + u;
                            z = f.max
                        }
                        if (u <= l && u < e.min) {
                            if (l < e.min)continue;
                            n = (e.min - u) / (l - u) * (z - n) + n;
                            u = e.min
                        } else if (l <= u && l < e.min) {
                            if (u < e.min)continue;
                            z = (e.min - u) / (l - u) * (z - n) + n;
                            l = e.min
                        }
                        if (u >= l && u > e.max) {
                            if (l > e.max)continue;
                            n = (e.max - u) / (l - u) * (z - n) + n;
                            u = e.max
                        } else if (l >= u && l > e.max) {
                            if (u > e.max)continue;
                            z = (e.max - u) / (l - u) * (z - n) + n;
                            l = e.max
                        }
                        (u != w || n != g) && k.moveTo(e.p2c(u) + c, f.p2c(n) + d);
                        w = l;
                        g = z;
                        k.lineTo(e.p2c(l) + c, f.p2c(z) + d)
                    }
                }
                k.stroke()
            }

            k.save();
            k.translate(p.left, p.top);
            k.lineJoin = "round";
            var c = a.lines.lineWidth, d = a.shadowSize;
            if (0 < c && 0 < d) {
                k.lineWidth = d;
                k.strokeStyle = "rgba(0,0,0,0.1)";
                var e = Math.PI / 18;
                b(a.datapoints, Math.sin(e) * (c / 2 + d / 2), Math.cos(e) * (c /
                    2 + d / 2), a.xaxis, a.yaxis);
                k.lineWidth = d / 2;
                b(a.datapoints, Math.sin(e) * (c / 2 + d / 4), Math.cos(e) * (c / 2 + d / 4), a.xaxis, a.yaxis)
            }
            k.lineWidth = c;
            k.strokeStyle = a.color;
            if (d = ba(a.lines, a.color, 0, W)) {
                k.fillStyle = d;
                for (var f = a.datapoints, d = a.xaxis, e = a.yaxis, g = f.points, f = f.pointsize, h = Math.min(Math.max(0, e.min), e.max), C = 0, l = !1, q = 1, m = 0, I = 0; !(0 < f && C > g.length + f);) {
                    var C = C + f, r = g[C - f], t = g[C - f + q], s = g[C], y = g[C + q];
                    if (l) {
                        if (0 < f && null != r && null == s) {
                            I = C;
                            f = -f;
                            q = 2;
                            continue
                        }
                        if (0 > f && C == m + f) {
                            k.fill();
                            l = !1;
                            f = -f;
                            q = 1;
                            C = m = I + f;
                            continue
                        }
                    }
                    if (!(null ==
                        r || null == s)) {
                        if (r <= s && r < d.min) {
                            if (s < d.min)continue;
                            t = (d.min - r) / (s - r) * (y - t) + t;
                            r = d.min
                        } else if (s <= r && s < d.min) {
                            if (r < d.min)continue;
                            y = (d.min - r) / (s - r) * (y - t) + t;
                            s = d.min
                        }
                        if (r >= s && r > d.max) {
                            if (s > d.max)continue;
                            t = (d.max - r) / (s - r) * (y - t) + t;
                            r = d.max
                        } else if (s >= r && s > d.max) {
                            if (r > d.max)continue;
                            y = (d.max - r) / (s - r) * (y - t) + t;
                            s = d.max
                        }
                        l || (k.beginPath(), k.moveTo(d.p2c(r), e.p2c(h)), l = !0);
                        if (t >= e.max && y >= e.max)k.lineTo(d.p2c(r), e.p2c(e.max)), k.lineTo(d.p2c(s), e.p2c(e.max)); else if (t <= e.min && y <= e.min)k.lineTo(d.p2c(r), e.p2c(e.min)),
                            k.lineTo(d.p2c(s), e.p2c(e.min)); else {
                            var D = r, v = s;
                            t <= y && t < e.min && y >= e.min ? (r = (e.min - t) / (y - t) * (s - r) + r, t = e.min) : y <= t && (y < e.min && t >= e.min) && (s = (e.min - t) / (y - t) * (s - r) + r, y = e.min);
                            t >= y && t > e.max && y <= e.max ? (r = (e.max - t) / (y - t) * (s - r) + r, t = e.max) : y >= t && (y > e.max && t <= e.max) && (s = (e.max - t) / (y - t) * (s - r) + r, y = e.max);
                            r != D && k.lineTo(d.p2c(D), e.p2c(t));
                            k.lineTo(d.p2c(r), e.p2c(t));
                            k.lineTo(d.p2c(s), e.p2c(y));
                            s != v && (k.lineTo(d.p2c(s), e.p2c(y)), k.lineTo(d.p2c(v), e.p2c(y)))
                        }
                    }
                }
            }
            0 < c && b(a.datapoints, 0, 0, a.xaxis, a.yaxis);
            k.restore()
        }

        function ga(a) {
            function b(a, c, d, e, f, j, w, u) {
                for (var g = a.points, a = a.pointsize, h = 0; h < g.length; h += a) {
                    var n = g[h], z = g[h + 1];
                    null == n || (n < j.min || n > j.max || z < w.min || z > w.max) || (k.beginPath(), n = j.p2c(n), z = w.p2c(z) + e, "circle" == u ? k.arc(n, z, c, 0, f ? Math.PI : 2 * Math.PI, !1) : u(k, n, z, c, f), k.closePath(), d && (k.fillStyle = d, k.fill()), k.stroke())
                }
            }

            k.save();
            k.translate(p.left, p.top);
            var c = a.points.lineWidth, d = a.shadowSize, e = a.points.radius, f = a.points.symbol;
            0 < c && 0 < d && (d /= 2, k.lineWidth = d, k.strokeStyle = "rgba(0,0,0,0.1)", b(a.datapoints,
                e, null, d + d / 2, !0, a.xaxis, a.yaxis, f), k.strokeStyle = "rgba(0,0,0,0.2)", b(a.datapoints, e, null, d / 2, !0, a.xaxis, a.yaxis, f));
            k.lineWidth = c;
            k.strokeStyle = a.color;
            b(a.datapoints, e, ba(a.points, a.color), 0, !1, a.xaxis, a.yaxis, f);
            k.restore()
        }

        function da(a, b, c, d, e, f, g, h, k, l, q, m) {
            var p, r, t, s;
            q ? (s = r = t = !0, p = !1, q = c, c = b + d, e = b + e, a < q && (b = a, a = q, q = b, p = !0, r = !1)) : (p = r = t = !0, s = !1, q = a + d, a += e, e = c, c = b, c < e && (b = c, c = e, e = b, s = !0, t = !1));
            if (!(a < h.min || q > h.max || c < k.min || e > k.max))if (q < h.min && (q = h.min, p = !1), a > h.max && (a = h.max, r = !1), e < k.min &&
                (e = k.min, s = !1), c > k.max && (c = k.max, t = !1), q = h.p2c(q), e = k.p2c(e), a = h.p2c(a), c = k.p2c(c), g && (l.beginPath(), l.moveTo(q, e), l.lineTo(q, c), l.lineTo(a, c), l.lineTo(a, e), l.fillStyle = g(e, c), l.fill()), 0 < m && (p || r || t || s))l.beginPath(), l.moveTo(q, e + f), p ? l.lineTo(q, c + f) : l.moveTo(q, c + f), t ? l.lineTo(a, c + f) : l.moveTo(a, c + f), r ? l.lineTo(a, e + f) : l.moveTo(a, e + f), s ? l.lineTo(q, e + f) : l.moveTo(q, e + f), l.stroke()
        }

        function ma(a) {
            k.save();
            k.translate(p.left, p.top);
            k.lineWidth = a.bars.lineWidth;
            k.strokeStyle = a.color;
            for (var b = "left" == a.bars.align ?
                0 : -a.bars.barWidth / 2, c = a.datapoints, d = b + a.bars.barWidth, e = a.bars.fill ? function (b, c) {
                return ba(a.bars, a.color, b, c)
            } : null, f = a.xaxis, g = a.yaxis, h = c.points, c = c.pointsize, m = 0; m < h.length; m += c)null != h[m] && da(h[m], h[m + 1], h[m + 2], b, d, 0, e, f, g, k, a.bars.horizontal, a.bars.lineWidth);
            k.restore()
        }

        function ba(a, b, c, d) {
            var e = a.fill;
            if (!e)return null;
            if (a.fillColor)return ra(a.fillColor, c, d, b);
            a = m.color.parse(b);
            a.a = "number" == typeof e ? e : 0.4;
            a.normalize();
            return a.toString()
        }

        function ha(a) {
            g.grid.hoverable && ca("plothover",
                a, function (a) {
                    return!1 != a.hoverable
                })
        }

        function ia(a) {
            g.grid.hoverable && ca("plothover", a, function () {
                return!1
            })
        }

        function ja(a) {
            ca("plotclick", a, function (a) {
                return!1 != a.clickable
            })
        }

        function ca(b, c, d) {
            var e = S.offset(), f = c.pageX - e.left - p.left, h = c.pageY - e.top - p.top, k = v({left: f, top: h});
            k.pageX = c.pageX;
            k.pageY = c.pageY;
            var c = g.grid.mouseActiveRadius, m = c * c + 1, I = null, l, q;
            for (l = D.length - 1; 0 <= l; --l)if (d(D[l])) {
                var x = D[l], B = x.xaxis, r = x.yaxis, t = x.datapoints.points, s = x.datapoints.pointsize, y = B.c2p(f), E = r.c2p(h), H =
                    c / B.scale, G = c / r.scale;
                B.options.inverseTransform && (H = Number.MAX_VALUE);
                r.options.inverseTransform && (G = Number.MAX_VALUE);
                if (x.lines.show || x.points.show)for (q = 0; q < t.length; q += s) {
                    var A = t[q], F = t[q + 1];
                    if (null != A && !(A - y > H || A - y < -H || F - E > G || F - E < -G))A = Math.abs(B.p2c(A) - f), F = Math.abs(r.p2c(F) - h), F = A * A + F * F, F < m && (m = F, I = [l, q / s])
                }
                if (x.bars.show && !I) {
                    B = "left" == x.bars.align ? 0 : -x.bars.barWidth / 2;
                    x = B + x.bars.barWidth;
                    for (q = 0; q < t.length; q += s)if (A = t[q], F = t[q + 1], r = t[q + 2], null != A && (D[l].bars.horizontal ? y <= Math.max(r, A) &&
                        y >= Math.min(r, A) && E >= F + B && E <= F + x : y >= A + B && y <= A + x && E >= Math.min(r, F) && E <= Math.max(r, F)))I = [l, q / s]
                }
            }
            I ? (l = I[0], q = I[1], s = D[l].datapoints.pointsize, d = {datapoint: D[l].datapoints.points.slice(q * s, (q + 1) * s), dataIndex: q, series: D[l], seriesIndex: l}) : d = null;
            d && (d.pageX = parseInt(d.series.xaxis.p2c(d.datapoint[0]) + e.left + p.left), d.pageY = parseInt(d.series.yaxis.p2c(d.datapoint[1]) + e.top + p.top));
            if (g.grid.autoHighlight) {
                for (e = 0; e < Y.length; ++e)f = Y[e], f.auto == b && (!d || !(f.series == d.series && f.point[0] == d.datapoint[0] &&
                    f.point[1] == d.datapoint[1])) && pa(f.series, f.point);
                d && na(d.series, d.datapoint, b)
            }
            a.trigger(b, [k, d])
        }

        function Z() {
            wa || (wa = setTimeout(sa, 30))
        }

        function sa() {
            wa = null;
            F.save();
            F.clearRect(0, 0, K, M);
            F.translate(p.left, p.top);
            var a, b;
            for (a = 0; a < Y.length; ++a)if (b = Y[a], b.series.bars.show)va(b.series, b.point); else {
                var c = b.series, d = b.point;
                b = d[0];
                var d = d[1], f = c.xaxis, h = c.yaxis;
                if (!(b < f.min || b > f.max || d < h.min || d > h.max)) {
                    var g = c.points.radius + c.points.lineWidth / 2;
                    F.lineWidth = g;
                    F.strokeStyle = m.color.parse(c.color).scale("a",
                        0.5).toString();
                    g *= 1.5;
                    b = f.p2c(b);
                    d = h.p2c(d);
                    F.beginPath();
                    "circle" == c.points.symbol ? F.arc(b, d, g, 0, 2 * Math.PI, !1) : c.points.symbol(F, b, d, g, !1);
                    F.closePath();
                    F.stroke()
                }
            }
            F.restore();
            e(R.drawOverlay, [F])
        }

        function na(a, b, c) {
            "number" == typeof a && (a = D[a]);
            if ("number" == typeof b)var d = a.datapoints.pointsize, b = a.datapoints.points.slice(d * b, d * (b + 1));
            d = qa(a, b);
            -1 == d ? (Y.push({series: a, point: b, auto: c}), Z()) : c || (Y[d].auto = !1)
        }

        function pa(a, b) {
            null == a && null == b && (Y = [], Z());
            "number" == typeof a && (a = D[a]);
            "number" == typeof b &&
            (b = a.data[b]);
            var c = qa(a, b);
            -1 != c && (Y.splice(c, 1), Z())
        }

        function qa(a, b) {
            for (var c = 0; c < Y.length; ++c) {
                var d = Y[c];
                if (d.series == a && d.point[0] == b[0] && d.point[1] == b[1])return c
            }
            return-1
        }

        function va(a, b) {
            F.lineWidth = a.bars.lineWidth;
            F.strokeStyle = m.color.parse(a.color).scale("a", 0.5).toString();
            var c = m.color.parse(a.color).scale("a", 0.5).toString(), d = "left" == a.bars.align ? 0 : -a.bars.barWidth / 2;
            da(b[0], b[1], b[2] || 0, d, d + a.bars.barWidth, 0, function () {
                return c
            }, a.xaxis, a.yaxis, F, a.bars.horizontal, a.bars.lineWidth)
        }

        function ra(a, b, c, d) {
            if ("string" == typeof a)return a;
            for (var b = k.createLinearGradient(0, c, 0, b), c = 0, e = a.colors.length; c < e; ++c) {
                var f = a.colors[c];
                if ("string" != typeof f) {
                    var g = m.color.parse(d);
                    null != f.brightness && (g = g.scale("rgb", f.brightness));
                    null != f.opacity && (g.a *= f.opacity);
                    f = g.toString()
                }
                b.addColorStop(c / (e - 1), f)
            }
            return b
        }

        var D = [], g = {colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"], legend: {show: !0, noColumns: 1, labelFormatter: null, labelBoxBorderColor: "#ccc", container: null, position: "ne", margin: 5,
            backgroundColor: null, backgroundOpacity: 0.85}, xaxis: {show: null, position: "bottom", mode: null, color: null, tickColor: null, transform: null, inverseTransform: null, min: null, max: null, autoscaleMargin: null, ticks: null, tickFormatter: null, labelWidth: null, labelHeight: null, reserveSpace: null, tickLength: null, alignTicksWithAxis: null, tickDecimals: null, tickSize: null, minTickSize: null, monthNames: null, timeformat: null, twelveHourClock: !1}, yaxis: {autoscaleMargin: 0.02, position: "left"}, xaxes: [], yaxes: [], series: {points: {show: !1,
            radius: 3, lineWidth: 2, fill: !0, fillColor: "#ffffff", symbol: "circle"}, lines: {lineWidth: 2, fill: !1, fillColor: null, steps: !1}, bars: {show: !1, lineWidth: 2, barWidth: 1, fill: !0, fillColor: null, align: "left", horizontal: !1}, shadowSize: 3}, grid: {show: !0, aboveData: !1, color: "#545454", backgroundColor: null, borderColor: null, tickColor: null, labelMargin: 5, axisMargin: 8, borderWidth: 2, minBorderMargin: null, markings: null, markingsColor: "#f4f4f4", markingsLineWidth: 2, clickable: !1, hoverable: !1, autoHighlight: !0, mouseActiveRadius: 10},
            hooks: {}}, oa = null, ua = null, S = null, k = null, F = null, J = [], L = [], p = {left: 0, right: 0, top: 0, bottom: 0}, K = 0, M = 0, aa = 0, W = 0, R = {processOptions: [], processRawData: [], processDatapoints: [], drawSeries: [], draw: [], bindEvents: [], drawOverlay: [], shutdown: []}, B = this;
        B.setData = f;
        B.setupGrid = N;
        B.draw = O;
        B.getPlaceholder = function () {
            return a
        };
        B.getCanvas = function () {
            return oa
        };
        B.getPlotOffset = function () {
            return p
        };
        B.width = function () {
            return aa
        };
        B.height = function () {
            return W
        };
        B.offset = function () {
            var a = S.offset();
            a.left += p.left;
            a.top +=
                p.top;
            return a
        };
        B.getData = function () {
            return D
        };
        B.getAxes = function () {
            var a = {};
            m.each(J.concat(L), function (b, c) {
                c && (a[c.direction + (1 != c.n ? c.n : "") + "axis"] = c)
            });
            return a
        };
        B.getXAxes = function () {
            return J
        };
        B.getYAxes = function () {
            return L
        };
        B.c2p = v;
        B.p2c = function (a) {
            var b = {}, c, d, e;
            for (c = 0; c < J.length; ++c)if ((d = J[c]) && d.used)if (e = "x" + d.n, null == a[e] && 1 == d.n && (e = "x"), null != a[e]) {
                b.left = d.p2c(a[e]);
                break
            }
            for (c = 0; c < L.length; ++c)if ((d = L[c]) && d.used)if (e = "y" + d.n, null == a[e] && 1 == d.n && (e = "y"), null != a[e]) {
                b.top = d.p2c(a[e]);
                break
            }
            return b
        };
        B.getOptions = function () {
            return g
        };
        B.highlight = na;
        B.unhighlight = pa;
        B.triggerRedrawOverlay = Z;
        B.pointOffset = function (a) {
            return{left: parseInt(J[h(a, "x") - 1].p2c(+a.x) + p.left), top: parseInt(L[h(a, "y") - 1].p2c(+a.y) + p.top)}
        };
        B.shutdown = function () {
            wa && clearTimeout(wa);
            S.unbind("mousemove", ha);
            S.unbind("mouseleave", ia);
            S.unbind("click", ja);
            e(R.shutdown, [S])
        };
        B.resize = function () {
            G();
            A(oa);
            A(ua)
        };
        B.hooks = R;
        for (var ka = 0; ka < d.length; ++ka) {
            var la = d[ka];
            la.init(B);
            la.options && m.extend(!0, g, la.options)
        }
        m.extend(!0,
            g, c);
        null == g.xaxis.color && (g.xaxis.color = g.grid.color);
        null == g.yaxis.color && (g.yaxis.color = g.grid.color);
        null == g.xaxis.tickColor && (g.xaxis.tickColor = g.grid.tickColor);
        null == g.yaxis.tickColor && (g.yaxis.tickColor = g.grid.tickColor);
        null == g.grid.borderColor && (g.grid.borderColor = g.grid.color);
        null == g.grid.tickColor && (g.grid.tickColor = m.color.parse(g.grid.color).scale("a", 0.22).toString());
        for (c = 0; c < Math.max(1, g.xaxes.length); ++c)g.xaxes[c] = m.extend(!0, {}, g.xaxis, g.xaxes[c]);
        for (c = 0; c < Math.max(1, g.yaxes.length); ++c)g.yaxes[c] =
            m.extend(!0, {}, g.yaxis, g.yaxes[c]);
        g.xaxis.noTicks && null == g.xaxis.ticks && (g.xaxis.ticks = g.xaxis.noTicks);
        g.yaxis.noTicks && null == g.yaxis.ticks && (g.yaxis.ticks = g.yaxis.noTicks);
        g.x2axis && (g.xaxes[1] = m.extend(!0, {}, g.xaxis, g.x2axis), g.xaxes[1].position = "top");
        g.y2axis && (g.yaxes[1] = m.extend(!0, {}, g.yaxis, g.y2axis), g.yaxes[1].position = "right");
        g.grid.coloredAreas && (g.grid.markings = g.grid.coloredAreas);
        g.grid.coloredAreasColor && (g.grid.markingsColor = g.grid.coloredAreasColor);
        g.lines && m.extend(!0, g.series.lines,
            g.lines);
        g.points && m.extend(!0, g.series.points, g.points);
        g.bars && m.extend(!0, g.series.bars, g.bars);
        null != g.shadowSize && (g.series.shadowSize = g.shadowSize);
        for (c = 0; c < g.xaxes.length; ++c)H(J, c + 1).options = g.xaxes[c];
        for (c = 0; c < g.yaxes.length; ++c)H(L, c + 1).options = g.yaxes[c];
        for (var X in R)g.hooks[X] && g.hooks[X].length && (R[X] = R[X].concat(g.hooks[X]));
        e(R.processOptions, [g]);
        X = a.children("canvas.base");
        c = a.children("canvas.overlay");
        0 == X.length || 0 == c ? (a.html(""), a.css({padding: 0}), "static" == a.css("position") &&
            a.css("position", "relative"), G(), oa = E(!0, "base"), ua = E(!1, "overlay"), X = !1) : (oa = X.get(0), ua = c.get(0), X = !0);
        k = oa.getContext("2d");
        F = ua.getContext("2d");
        S = m([ua, oa]);
        X && (a.data("plot").shutdown(), B.resize(), F.clearRect(0, 0, K, M), S.unbind(), a.children().not([oa, ua]).remove());
        a.data("plot", B);
        f(b);
        N();
        O();
        g.grid.hoverable && (S.mousemove(ha), S.mouseleave(ia));
        g.grid.clickable && S.click(ja);
        e(R.bindEvents, [S]);
        var Y = [], wa = null
    }, ta = function (a, b) {
        return b * Math.floor(a / b)
    };
    m.plot = function (a, b, c) {
        return new Db(m(a),
            b, c, m.plot.plugins)
    };
    m.plot.version = "0.7";
    m.plot.plugins = [];
    m.plot.formatDate = function (a, b, c) {
        var d = function (a) {
            a = "" + a;
            return 1 == a.length ? "0" + a : a
        }, e = [], f = !1, h = !1, m = a.getUTCHours(), v = 12 > m;
        null == c && (c = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
        -1 != b.search(/%p|%P/) && (12 < m ? m -= 12 : 0 == m && (m = 12));
        for (var A = 0; A < b.length; ++A) {
            var E = b.charAt(A);
            if (f) {
                switch (E) {
                    case "h":
                        E = "" + m;
                        break;
                    case "H":
                        E = d(m);
                        break;
                    case "M":
                        E = d(a.getUTCMinutes());
                        break;
                    case "S":
                        E = d(a.getUTCSeconds());
                        break;
                    case "d":
                        E =
                            "" + a.getUTCDate();
                        break;
                    case "m":
                        E = "" + (a.getUTCMonth() + 1);
                        break;
                    case "y":
                        E = "" + a.getUTCFullYear();
                        break;
                    case "b":
                        E = "" + c[a.getUTCMonth()];
                        break;
                    case "p":
                        E = v ? "am" : "pm";
                        break;
                    case "P":
                        E = v ? "AM" : "PM";
                        break;
                    case "0":
                        E = "", h = !0
                }
                E && h && (E = d(E), h = !1);
                e.push(E);
                h || (f = !1)
            } else"%" == E ? f = !0 : e.push(E)
        }
        return e.join("")
    };
    var H = G;
    H.filterChain = function () {
        this.index = -1;
        this.chain = 0 < arguments.length ? arguments : []
    };
    H.filterChain.prototype.register = function (a) {
        this.chain.push(a)
    };
    H.filterChain.prototype.run = function () {
        this.index++;
        this.index < this.chain.length && this.chain[this.index].run(this)
    };
    H.i18n = {locale: "en", messages: {zh: {see_detail: "\u8be6\u60c5", no_results: "\u62b1\u6b49\uff01\u6ca1\u6709\u627e\u5230\u76f8\u5173\u7684\u5546\u54c1", hide: "\u9690\u85cf", show: "\u663e\u793a", feedback: "\u53cd\u9988", shoppingassist: "\u5982\u610f\u6dd8", settings: "\u9009\u9879", feedback_url: "http://ruyi.taobao.com/feedback", choose_at_least_one: "\u8bf7\u81f3\u5c11\u9009\u4e2d\u4e00\u4e2a\u641c\u7d22\u7f51\u7ad9", homepage: "\u5b98\u65b9\u7f51\u7ad9",
        search: "\u641c\u7d22", search_engine_setting: "\u641c\u7d22\u5546\u57ce\u8bbe\u7f6e", search_engine_setting_title: "\u641c\u7d22\u5546\u57ce", search_engine_setting_commit: "\u5b8c\u6210", no_products: "\u62b1\u6b49\uff01\u6ca1\u6709\u627e\u5230\u76f8\u5173\u7684\u5546\u54c1", search_engine_setting_msg: "\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u5546\u57ce\u3002", search_product_in: '\u5728${1}\u641c\u7d22"${2}"', click_to_hide: "\u70b9\u51fb\u9690\u85cf\u641c\u7d22\u7ed3\u679c", expand: "\u5c55\u5f00", shrink: "\u6536\u8d77",
        close: "\u5173\u95ed", hide_searchbox: "\u9690\u85cf\u641c\u7d22\u6846"}, en: {see_detail: "See Detail", no_results: "sorry, no results", hide: "Hide", show: "Show", feedback: "Feedback", settings: "Options", shoppingassist: "Shopping Assistant", homepage: "Homepage", choose_at_least_one: "Please select at least one search site", feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ", expand: "Expand", collapse: "Collapse", close: "Close", search: "Search", search_engine_setting: "Customize",
        search_engine_setting_title: "Search On", search_engine_setting_commit: "OK", no_products: "Oops, no results", search_engine_setting_msg: "Please select at least one site.", search_product_in: 'Search "${2}" at ${1}', click_to_hide: "Click to hide", shrink: "Shrink", hide_searchbox: "Hide searchbox"}, fr: {see_detail: "Voir le d\u00e9tail", no_results: "D\u00e9sol\u00e9, aucun r\u00e9sultat", hide: "Hide", show: "Show", feedback: "Feedback", settings: "Options", shoppingassist: "Shopping Assistant", homepage: "Homepage", choose_at_least_one: "Merci de s\u00e9lectionner au moins un site de recherche",
        feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ", expand: "Expand", collapse: "Collapse", close: "Close", search: "Search", search_engine_setting: "Customize", search_engine_setting_title: "Search On", search_engine_setting_commit: "OK", no_products: "Oops, no results", search_engine_setting_msg: "Please select at least one site.", search_product_in: 'Search "${2}" at ${1}', click_to_hide: "Click to hide", shrink: "Shrink", hide_searchbox: "Hide searchbox"}, it: {see_detail: "Vedi dettagli",
        no_results: "Spiacenti, nessun risultato", hide: "Hide", show: "Show", feedback: "Feedback", settings: "Opzioni", shoppingassist: "Shopping Assistant", homepage: "Homepage", choose_at_least_one: "Prego, selezionare almeno un sito di ricerca", feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ", expand: "Expand", collapse: "Collapse", close: "Close", search: "Search", search_engine_setting: "Customize", search_engine_setting_title: "Search On", search_engine_setting_commit: "OK",
        no_products: "Oops, no results", search_engine_setting_msg: "Please select at least one site.", search_product_in: 'Search "${2}" at ${1}', click_to_hide: "Click to hide", shrink: "Shrink", hide_searchbox: "Hide searchbox"}, de: {see_detail: "Details anschauen", no_results: "Entschuldigung, keine Suchergebnisse", hide: "Verstecken", show: "Zeigen", feedback: "Reaktion", settings: "Optionen", shoppingassist: "Shopping Assistant", homepage: "Startseite", choose_at_least_one: "Bitte w\u00e4hlen Sie mindestens eine Seite zum Durchsuchen aus",
        feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ", expand: "Erweitern", collapse: "Zusammenbruch", close: "in der N\u00e4he", search: "Search", search_engine_setting: "Customize", search_engine_setting_title: "Search On", search_engine_setting_commit: "OK", no_products: "Oops, no results", search_engine_setting_msg: "Please select at least one site.", search_product_in: 'Search "${2}" at ${1}', click_to_hide: "Click to hide", shrink: "Shrink", hide_searchbox: "Hide searchbox"}},
        setLocale: function (a) {
            a in this.messages && (this.locale = a)
        }, getLocale: function () {
            return this.locale
        }, getMessage: function () {
            var a = arguments, b = a[0], c = "";
            b in this.messages[this.locale] && (c = this.messages[this.locale][b], 1 < a.length && (c = c.replace(/\$\{\d\}/g, function (b) {
                b = b.substring(2, 3);
                return a[b]
            })));
            return c
        }};
    H.extend = function (a, b, c, d) {
        if (!a || !b)return a;
        void 0 === c && (c = !0);
        var e, f, h;
        if (d && (h = d.length))for (e = 0; e < h; e++) {
            if (f = d[e], f in b && (c || !(f in a)))a[f] = b[f]
        } else for (f in b)if (c || !(f in a))a[f] =
            b[f];
        return a
    };
    H.debounce = function (a, b, c) {
        var d;
        return function () {
            var e = this, f = arguments;
            d ? clearTimeout(d) : c && a.apply(e, f);
            d = setTimeout(function () {
                c || a.apply(e, f);
                d = null
            }, b || 100)
        }
    };
    H.str_repeat = function (a, b) {
        for (var c = []; 0 < b; c[--b] = a);
        return c.join("")
    };
    H.sprintf = function () {
        for (var a = 0, b, c = arguments[a++], d = [], e, f, h; c;) {
            if (e = /^[^\x25]+/.exec(c))d.push(e[0]); else if (e = /^\x25{2}/.exec(c))d.push("%"); else if (e = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(c)) {
                if (null == (b = arguments[e[1] ||
                    a++]) || void 0 == b)throw"Too few arguments.";
                if (/[^s]/.test(e[7]) && "number" != typeof b)throw"Expecting number but found " + typeof b;
                switch (e[7]) {
                    case "b":
                        b = b.toString(2);
                        break;
                    case "c":
                        b = String.fromCharCode(b);
                        break;
                    case "d":
                        b = parseInt(b);
                        break;
                    case "e":
                        b = e[6] ? b.toExponential(e[6]) : b.toExponential();
                        break;
                    case "f":
                        b = e[6] ? parseFloat(b).toFixed(e[6]) : parseFloat(b);
                        break;
                    case "o":
                        b = b.toString(8);
                        break;
                    case "s":
                        b = (b = String(b)) && e[6] ? b.substring(0, e[6]) : b;
                        break;
                    case "u":
                        b = Math.abs(b);
                        break;
                    case "x":
                        b = b.toString(16);
                        break;
                    case "X":
                        b = b.toString(16).toUpperCase()
                }
                b = /[def]/.test(e[7]) && e[2] && 0 <= b ? "+" + b : b;
                f = e[3] ? "0" == e[3] ? "0" : e[3].charAt(1) : " ";
                h = e[5] - String(b).length - 0;
                f = e[5] ? H.str_repeat(f, h) : "";
                d.push("" + (e[4] ? b + f : f + b))
            } else throw"Huh ?!";
            c = c.substring(e[0].length)
        }
        return d.join("")
    };
    H.format_price = function (a, b) {
        if (0 >= a)return"";
        var c = "", c = H.sprintf("%.2f", a / 100);
        switch (b) {
            case "us":
                c = "$" + c;
                break;
            case "ca":
                c = "CDN$" + c;
                break;
            case "fr":
            case "de":
                c = "EUR " + c;
                break;
            case "uk":
                c = "&#xA3;" + c;
                break;
            default:
                c = "$" + c
        }
        return c
    };
    H.get_cookie = function (a) {
        for (var b = document.cookie.split("; "), c = 0, d; d = b[c] && b[c].split("="); c++)if (d[0] === a)return d[1] || ""
    };
    var Ga = {}, Wa = {}, Xa = function () {
        var a = String.fromCharCode(Math.floor(25 * Math.random() + 97)) + Math.floor(134217728 * Math.random()).toString(36);
        if ("undefined" != typeof Wa[a])return Xa();
        Wa[a] = !0;
        return a
    };
    H.transform_selector = function (a) {
        return"undefined" != typeof Ga[a] ? Ga[a] : Ga[a] = "" + Xa()
    };
    H.isNumeric = function (a) {
        return!isNaN(parseFloat(a)) && isFinite(a)
    };
    H.checkAndRun = function (a) {
        H.browser.extension.sendRequest({topic: "page_signature"},
            function (b) {
                document.body.getAttribute(b) || (document.body.setAttribute(b, 1), a())
            })
    };
    var Ya = G, Za = function (a, b) {
        this.value = a;
        this.encoding = "undefined" == typeof b ? (document.charset || document.characterSet || "").toLowerCase() : b
    };
    Za.prototype = {toString: function () {
        return this.value
    }, containMultbyteChar: function (a) {
        for (var b = 0, c = a.length; b < c; b++)if (128 < a.charCodeAt(0))return!0;
        return!1
    }, getUnicode: function (a) {
        if (this.value.match(/%u[0-9a-fA-F]{4}/)) {
            var b = this.value.replace(/%u([0-9a-fA-F]{4})/g, function (a, b) {
                return String.fromCharCode(parseInt(b, 16))
            });
            a(b)
        } else this.containMultbyteChar(this.value) ? a(decodeURIComponent(this.value)) : this.encoding.match(/(x-)?(cp936|gbk|gb2312|gb18030)/) ? Ya.browser.extension.sendRequest({topic: "decode_gbk", data: this.value}, a) : a(this.value)
    }};
    Ya.site = {SearchTerm: Za, get_domain: function (a) {
        return a.location && a.location.hostname ? a.location.hostname : ""
    }, get_domain_from_str: function (a) {
        var b = "undefined";
        0 == a.toLowerCase().indexOf("http://") ? (b = a.substring(7), b = "http://" + b.substring(0,
            b.indexOf("/"))) : 0 == a.toLowerCase().indexOf("https://") && (b = a.substring(8), b = "https://" + b.substring(0, b.indexOf("/")));
        return b
    }, get_url: function (a) {
        return a.location && a.location.href ? a.location.href : a.title ? a.title : ""
    }, get_site: function (a) {
        var b = "";
        if (a) {
            var b = 2, c = a.split(".");
            a.match(/\.(com|co|org|net)\.(cn|uk|jp|hk|us|ca)$/) && (b += 1);
            b = c.length >= b ? c.splice(c.length - b, c.length).join(".") : a
        }
        return b
    }, get_sub_domain: function (a, b) {
        var c = "";
        a && (c = a.length > b.length ? a.substring(0, a.length - b.length - 1) :
            "DUMMY");
        return c
    }, check_shopping_term: function () {
        var a = this.get_site(this.get_domain(document));
        if ("google.com" == a || "google.cn" == a || "google.com.hk" == a || "google.co.uk" == a) {
            if (a = decodeURIComponent(document.location.href), -1 != a.indexOf("/products") || -1 != a.indexOf("tbs=bks:1") || -1 != a.indexOf("tbs=shop:1") || -1 != a.indexOf("tbm=bks") || -1 != a.indexOf("tbm=shop"))return!0
        } else {
            if ("bing.com" == a) {
                if (-1 != document.location.href.indexOf("/shopping/"))return!0;
                var a = $("#sw_abarl").find("a"), b = !1;
                $.each(a, function (a, d) {
                    -1 != $(d).attr("href").indexOf("/shopping/") && (b = !0)
                });
                return b
            }
            return!0
        }
    }, get_search_term: function (a, b) {
        if (!this.check_shopping_term())return!1;
        var c = "", d = this.get_domain(b), e = this.get_site(d), d = this.get_sub_domain(d, e);
        a[d] && "undefined" == typeof a[d].e && (c = this.extract_search_term(a[d], b));
        c && "string" == typeof c && (c = new this.SearchTerm(c));
        return c
    }, extract_search_term: function (a, b) {
        for (var c = "", d = b.location.search || b.location.hash, e, f = 0; f < a.length; f++) {
            var h = a[f].k, m = a[f].d, v = a[f].s, A = a[f].sk,
                E = a[f].charset;
            if (d) {
                for (var d = d.slice(1), m = d.split(m), H = m.length, G, f = 0; f < H; f++)G = m[f].split("="), h && G[0] == h ? c = G[1] : G[0] == E && (e = G[1]);
                c && (c = new this.SearchTerm(c, e))
            }
            !c && v && (c = this.find_search_term_from_document(b, v), A && A == c && (c = ""));
            if (c)break
        }
        return c
    }, find_search_term_from_query: function (a, b, c) {
        for (var d = "", a = a.split(c), b = RegExp("(?:^|\\?)" + b + '=([^#;\\?:@=&{}\\|\\\\^~\\[\\]`<>\\"]*)'), c = 0; c < a.length; c++) {
            var e = b.exec(a[c]);
            e && (d = e[1])
        }
        d && (d = d.replace(/\+/g, " "));
        return d
    }, find_search_term_from_document: function (a, b) {
        var c = "", d = a.getElementById(b);
        if (d)c = d.value; else for (var d = a.getElementsByTagName("input"), e = 0; e < d.length; e++)if (d[e].name == b) {
            c = d[e].value;
            break
        }
        return c ? new this.SearchTerm(c, "unicode") : c
    }};
    var v = G, Ha = window, N = document;
    v.SearchBox || (v.SearchBox = {});
    var $a = v.transform_selector;
    v.SearchBox.Util = {getClickUrl: function (a, b) {
        v.browser.extension.sendRequest({topic: "construct_click_url", url: a}, b)
    }, getURL: function (a) {
        return v.browser.extension.getURL(a)
    }, getCurrentTab: function (a) {
        v.browser.extension.sendRequest({topic: "get_current_tab"},
            a)
    }, openTab: function (a, b, c) {
        v.browser.extension.sendRequest({topic: "tab_open", url: a, selected: b || !1}, c)
    }, closeTab: function (a, b) {
        v.browser.extension.sendRequest({topic: "close_tab", tabId: a}, b)
    }, activeTab: function (a, b) {
        v.browser.extension.sendRequest({topic: "active_tab", tabId: a}, b)
    }, appendTraceParameter: function (a, b) {
        for (var c = b.split(/[?&]/), d = 0, e = c.length; d < e; d++)0 == c[d].indexOf("tb_lm_id=") && (a = a.replace(/&tb_lm_id=[^&]*/, "").replace(/\?tb_lm_id=[^&]*&/, "?") + (-1 == a.indexOf("?") ? "?" : "&") + c[d]);
        return a
    },
        sendLog: function (a, b) {
            var c = {topic: "send_log", action: a, referrer: document.referrer};
            "undefined" != typeof b && (c.label = b);
            v.browser.extension.sendRequest(c)
        }, _imgCache: {}, _imgCacheIndex: 0, sendImageLog: function (a) {
            if (a) {
                var b = this, c = new Image, d = this._imgCacheIndex++;
                this._imgCache[d] = c;
                c.onload = c.onerror = function () {
                    delete b._imgCache[d]
                };
                c.src = a;
                c = null
            }
        }, getViewPortWidth: function () {
            return"CSS1Compat" == N.compatMode ? N.documentElement.clientWidth : N.body.clientWidth
        }, getViewPortHeight: function () {
            return"CSS1Compat" ==
                N.compatMode ? N.documentElement.clientHeight : N.body.clientHeight
        }, getOverlayWidth: function () {
            var a = this.getViewPortWidth();
            return Math.max(a, N.body.scrollWidth)
        }, getOverlayHeight: function () {
            var a = this.getViewPortHeight();
            return Math.max(a, N.body.scrollHeight)
        }, getScrollPosition: function () {
            var a = $.browser.webkit, b = N.body, c = N.documentElement;
            return{top: a ? b.scrollTop : c.scrollTop, left: a ? b.scrollLeft : c.scrollLeft}
        }, handleSogou: function () {
            /SE\s\d\.X\sMetaSr\s\d\.\d/g.test(Ha.navigator.userAgent) && $("#" +
                $a("option-link")).hide()
        }, replaceTemplateSelectors: function (a) {
            return a.replace(/ruyitao-selector-prefix-([\w_-]+)/g, function (a, c) {
                return v.transform_selector(c)
            })
        }, getTemplate: function (a, b) {
            var c = this;
            v.browser.extension.sendRequest({topic: "get_template", page: a}, function (a) {
                "function" == typeof v.loadJQuery && ($ = jQuery = v.loadJQuery());
                a = v.SearchBox.Util.replaceTemplateSelectors(a);
                c.sanitizeHTML(a, function (a) {
                    b(a)
                })
            })
        }, sanitizeHTML: function (a, b) {
            var c = a.replace(/<script\b[\s\S]*?<\/script\s*>/g, "").replace(/\bon[A-z]+\s*=\s*['"]?[^>"]+['"]?/g,
                " ").replace(/href\s*=\s*['"]?\s*javascript:/g, " ");
            b(c)
        }, addEvent: function (a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
        }, addThousandSeparator: function (a) {
            if (!isNaN(+a)) {
                var a = a + "", b = a.split(".")[0], a = a.split(".")[1];
                return b.replace(/(\d)(?=(?:\d{3})+\b)/g, "$1,") + (a ? "." + a : "")
            }
        }, ajax: function (a, b) {
            a.topic = "ajax";
            v.browser.extension.sendRequest(a, b)
        }, mergeStyleSheets: function () {
            if (!$.browser.msie || !document.styleSheets)return!0;
            var a = document.styleSheets,
                b = document.getElementsByTagName("style"), c = document.getElementsByTagName("link");
            if (32 > b.length + c.length || !a[0].cssText)return!0;
            for (var a = document.styleSheets[0], b = $("." + $a("stylesheet")), d = 0; d < b.length; d++) {
                c = b.get(d);
                try {
                    a.cssText += c.styleSheet.cssText, $(c).remove()
                } catch (e) {
                    return!1
                }
            }
            return!0
        }, parseImagePrice: function (a, b) {
            var c = a.attr("data-lazyload");
            c || (c = a.attr("src"));
            v.browser.extension.sendRequest({topic: "parse_image_price", domain: v.SearchBox.Util.getLocationProperty(Ha, "hostname"), url: c},
                b)
        }, loadJQuery: function () {
        }, parsePriceString: function (a) {
            if (a) {
                var b = /\d+(?:\.\d+)?/.exec(a);
                b && (a = b[0], a = parseFloat(a))
            }
            return a
        }, getTopLevelDomain: function (a) {
            a = /[a-z0-9_-]+\.(?:com|net|org)/ig.exec(a);
            return!a ? null : a[0].toLowerCase()
        }, getSiteMetaInfo: function (a) {
            a = this.getTopLevelDomain(a);
            return!a ? null : this.siteMetaInfo[a]
        }, siteMetaInfo: {"360buy.com": {name: "\u4eac\u4e1c"}, "51buy.com": {name: "\u6613\u8fc5"}, "suning.com": {name: "\u82cf\u5b81\u6613\u8d2d"}}, randomAppend: function (a, b) {
            var c = $(a).find("> *"),
                d = c.length, d = parseInt(Math.random() * d);
            c.eq(d).after(b)
        }, openFeedback: function (a, b) {
            var c = "http://ruyi.taobao.com/bug/item/" + a + "?ref=" + (b || encodeURIComponent(v.SearchBox.Util.getLocationHref(Ha)));
            v.SearchBox.Util.sendLog("click_compare", c);
            v.SearchBox.Util.openTab(c, !0)
        }, elemInArray: function (a, b) {
            if ("function" == typeof b.indexOf)return-1 != b.indexOf(a);
            for (var c = 0, d = b.length; c < d; c++)if (b[c] === a)return!0;
            return!1
        }, getLocation: function (a) {
            a = a || window;
            return a.location || a.document.location
        }, getLocationProperty: function (a, b) {
            "string" === typeof a && (b = a, a = void 0);
            return v.SearchBox.Util.getLocation(a)[b]
        }, setFixed: function (a, b) {
            var c, d;
            "iPad" == navigator.platform && -1 < navigator.userAgent.toLowerCase().search("cpu os 4") && (c = b ? 1 : 0, c += Number($(b ? a + " " + b : a).css("height").slice(0, -2)), d = window.innerHeight + window.pageYOffset - c, $(a).css("top", d), window.onscroll = function () {
                $(a).css("display", "none");
                setTimeout(function () {
                    d = window.innerHeight + window.pageYOffset - c;
                    $(a).css("top", d);
                    $(a).css("display", "block")
                }, 100)
            })
        }, getLocationHref: function (a) {
            return v.SearchBox.Util.getLocationProperty(a,
                "href")
        }, CATEGORY_TAGS: {"\u7535\u5b50": 1, "\u7537": 1, "\u5973": 1, "\u513f\u7ae5": 1, "\u8f66": 1, "\u98df\u54c1": 1, "\u6237\u5916": 1, "\u5bb6\u5c45": 1, "\u65f6\u5c1a": 1, "\u5a31\u4e50": 1, "\u4e66": 1}, filterCategoryTags: function (a) {
            if (!a || 0 == a.length)return[];
            for (var b = [], c = this.CATEGORY_TAGS, d = 0, e = a.length; d < e; d++)c.hasOwnProperty(a[d]) || b.push(a[d]);
            return b
        }};
    var O = G;
    O.SearchBox || (O.SearchBox = {});
    var Ia = O.SearchBox.Util, ab = O.SearchBox.Tmpl, fa, bb, ba, ga = O.transform_selector;
    O.SearchBox.SearchEngines = {init: function () {
        this.renderEnabledSearchEngines();
        this.registerEvents()
    }, registerEvents: function () {
        var a = this;
        $("#" + ga("submit-ses-btn")).click(function (b) {
            b.preventDefault();
            a.submit()
        })
    }, getAll: function (a) {
        var b = this;
        O.browser.extension.sendRequest({topic: "get_search_engines"}, function (c) {
            fa = JSON.parse(JSON.stringify(c.search_engines));
            b.setEnabled(fa);
            b.setLocale(c.locale);
            a(c)
        })
    }, updateCached: function (a) {
        var b, c, d, e;
        for (e in fa)if (fa.hasOwnProperty(e)) {
            b = fa[e];
            for (var f = 0, h = b.length; f < h; f++)c = b[f], d = c.name, a.hasOwnProperty(d) && (c.enabled = a[d])
        }
    },
        setLocale: function (a) {
            ba = a;
            O.i18n.setLocale(a)
        }, getLocale: function () {
            return ba
        }, getCachedAll: function () {
            return fa
        }, filter: function (a) {
            for (var b = O.site.get_site(Ia.getLocationProperty(window, "hostname")), c = [], d = 0, e = a.length; d < e; d++) {
                var f = a[d];
                f.host && b.match(f.host) || ("etao" == f.name || ("paipai.com" == b || "eachnet.com" == b) && "taobao" == f.name) || c.push(f)
            }
            return c
        }, sort: function (a) {
            a.sort(function (a, c) {
                return"etao" == a.name ? -1 : "etao" == c.name ? 1 : a.order - c.order
            })
        }, getCurrentLocaleSearchEngines: function () {
            var a =
                this.getCachedAll(), b = this.getLocale(), c = [], d;
            for (d in a)a.hasOwnProperty(d) && d == b && (c = Array.prototype.concat.apply(c, a[d]));
            return c
        }, renderSearchEngineSettingHtml: function () {
            var a = this.getCurrentLocaleSearchEngines(), a = this.filter(a), a = ab.getSearchEngineSettingTemplate(a, this.getLocale());
            $("#" + ga("merchant-list")).html(a)
        }, renderEnabledSearchEngines: function () {
            var a = this.getEnabled();
            this.sort(a);
            $("#" + ga("search-engine-item-template")).html();
            $.each(a, function (a, c) {
                c.icon = c.icon || Ia.getURL("assets/images/search/se-icons/" +
                    c.name + ".png")
            });
            a = ab.getSearchEnginesTemplate(a);
            $("#" + ga("search-engines")).html(a)
        }, setSearchEngineSettingPosition: function () {
            var a = $("#" + ga("plus-btn")), b = $("#" + ga("search-engines-setting")), a = a.position().left + a.width() / 2, c = b.outerWidth(), a = a - c / 2;
            0 > a && (a = 0);
            b.css("left", a + "px")
        }, getEnabled: function () {
            return bb
        }, setEnabled: function (a) {
            var a = a || this.getCachedAll(), b = O.site.get_site(Ia.getLocationProperty(window, "hostname")), c = [], d = function (d) {
                var d = a[d], e, m;
                e = 0;
                for (m = d.length; e < m; e++) {
                    var v = d[e];
                    if (v.enabled && (!v.host || !b.match(v.host)))(!("paipai.com" == b || "eachnet.com" == b) || !("taobao" == v.name || "etao" == v.name)) && c.push(v)
                }
            };
            a[ba] && d(ba);
            for (var e in a)a.hasOwnProperty(e) && e != ba && d(e);
            bb = c
        }, getSearchEngineById: function (a) {
            var b = this.getCurrentLocaleSearchEngines();
            if (b)for (var c = 0, d = b.length; c < d; c++)if (b[c].name === a)return b[c];
            return null
        }};
    var Ja = "ruyi.object", cb = function (a, b) {
        a ? "function" != typeof a && (b = a, a = Ka) : a = Ka;
        var c, d = function () {
                c.superclass.prototype.constructor.apply(this, arguments)
            },
            e;
        e = function () {
        };
        e.prototype = a.prototype;
        e = new e;
        d.prototype = e;
        c = d.prototype.constructor = d;
        for (var f in b)b[f]instanceof Function && (b[f].__name = f, b[f].__owner = c), c.prototype[f] = b[f];
        c.superclass = a;
        c._super = a.prototype;
        return c
    }, ha = function (a) {
        for (var a = a.split(/ +/g), b = 0, c = a.length; b < c; b++)a[b] = "__event_" + a[b];
        return a.join(" ")
    }, Ka = cb(function () {
        this.init.apply(this, arguments)
    }, {init: function () {
    }, parent: function () {
        return arguments.callee.caller.__owner.superclass
    }, parentProto: function () {
        return arguments.callee.caller.__owner.superclass.prototype
    },
        callParent: function (a) {
            var b = Array.prototype.slice.call(arguments);
            return arguments.callee.caller.__owner.superclass.prototype[b.shift(0)].apply(this, b)
        }, callSuper: function () {
            return arguments.callee.caller.__owner.superclass.prototype[arguments.callee.caller.__name].apply(this, arguments)
        }, bind: function (a, b, c) {
            arguments[0] = ha(arguments[0]);
            var d = $(this);
            $(this).bind.apply(d, arguments);
            return this
        }, one: function (a, b, c) {
            arguments[0] = ha(arguments[0]);
            var d = $(this);
            d.one.apply(d, arguments);
            return this
        },
        trigger: function (a, b) {
            arguments[0] = ha(arguments[0]);
            var c = $(this);
            c.trigger.apply(c, arguments);
            return this
        }, triggerHandler: function (a, b) {
            arguments[0] = ha(arguments[0]);
            var c = $(this);
            c.triggerHandler.apply(c, arguments);
            return this
        }, unbind: function (a, b) {
            arguments[0] = ha(arguments[0]);
            var c = $(this);
            c.unbind.apply(c, arguments);
            return this
        }}), db = function (a) {
        if (("string" == typeof a || a instanceof String) && 0 < (a = $.trim(a)).length) {
            for (var b = window, a = a.split("."), c = 0; c < a.length; c++)"undefined" == typeof b[a[c]] &&
                (b[a[c]] = {}), b = b[a[c]];
            return b
        }
        return a
    }, Ja = db(Ja);
    $.extend(Ja, {Parent: Ka, createClass: cb, funcToArray: function (a, b) {
        var c = a || [];
        b && (b instanceof Array ? c = c.concact(b) : $.isFunction(b) && c.push(b));
        return c
    }, createPackage: db});
    var Eb = ruyi.object.createPackage("ruyi.aop"), fb = function (a, b, c, d) {
        var e = $.isFunction(a), f;
        e ? (f = a, c = b) : f = a[b];
        var d = d ? eb(f, c, 0) : eb(c, f, 1), h;
        for (h in f)d[h] = c[h] = f[h];
        e || (a[b] = d);
        return d
    }, eb = function (a, b, c) {
        return function () {
            var d = a.apply(this, arguments), e = b.apply(this, arguments);
            return 0 == c ? d : e
        }
    };
    $.extend(Eb, {addBefore: function (a, b, c) {
        return fb(a, b, c, !1)
    }, addAfter: function (a, b, c) {
        return fb(a, b, c, !0)
    }});
    var Fb = ruyi.object.createPackage("ruyi.data"), Gb = G, La = ruyi.object.createClass(null, {conf: null, xmlHttpRequest: null, _abortFlagArr: null, defaultLoad: !1, autoAbort: !0, successFilter: null, getData: null, init: function (a) {
        $.extend(this, a, {_abortFlagArr: {}});
        "boolean" == typeof this.defaultLoad && this.defaultLoad && this.load()
    }, load: function () {
        this.reload()
    }, reload: function () {
        var a = this;
        this.autoAbort &&
        this.abort();
        var b = (new Date).getTime();
        this._abortFlagArr[b] = !1;
        var c = function (c) {
            return $.isFunction(c) ? function () {
                "boolean" == typeof a._abortFlagArr[b] && !a._abortFlagArr[b] && c.apply(this, arguments)
            } : null
        }, d = this.conf.success;
        $.isFunction(d) && this.successFilter && (d = function () {
            var b = [$.proxy(a.conf.success, this)];
            Array.prototype.push.apply(b, arguments);
            a.successFilter.doFilter.apply(this.successFilter, b)
        });
        var e = c(this.conf.error), d = c(d), c = ruyi.aop.addBefore(c(this.conf.complete) || function () {
        }, function () {
            a.xmlHttpRequest =
                null
        });
        this.getData(d, e, c)
    }, getData: function (a, b, c) {
        this.xmlHttpRequest = $.ajax($.extend({}, this.conf, {error: b, success: a, complete: c}))
    }, abort: function () {
        var a = !1;
        try {
            this.xmlHttpRequest ? (this.xmlHttpRequest.abort(), this.xmlHttpRequest = null) : a = !0
        } catch (b) {
            a = !0
        }
        if (a)for (var c in this._abortFlagArr)try {
            delete this._abortFlagArr[c]
        } catch (d) {
            this._abortFlagArr[c] = ea
        }
    }, setSuccessFilter: function (a) {
        this.successFilter = a
    }, getSuccessFilter: function () {
        return this.successFilter
    }});
    ruyi.object.createClass(La, {getData: function () {
        throw Error('Please override abstract method "getData".');
    }});
    var Hb = ruyi.object.createClass(La, {getData: function (a, b, c) {
        Gb.browser.extension.sendRequest(this.conf.data, function () {
            $.isFunction(a) && a.apply(this, arguments);
            $.isFunction(c) && c.apply(this, arguments)
        })
    }}), Ib = ruyi.object.createClass({init: function (a) {
        $.extend(this, a)
    }, doFilter: function () {
    }});
    $.extend(Fb, {DataSource: La, ExtDS: Hb, Filter: Ib});
    var Ma = ruyi.object.createPackage("ruyi.window");
    Ma.conf = {WINDOW_DEFAULT_CLASSNAME: "ruyi_window"};
    var gb = ruyi.object.createClass(null, {group: null, dom: null, init: function (a) {
            var b =
                this;
            this.dom = "undefined" == typeof a.dom ? this.getNewDom() : $(a.dom);
            this.dom.addClass(Ma.conf.WINDOW_DEFAULT_CLASSNAME);
            "string" == typeof a.className && this.dom.addClass(a.className);
            "object" == typeof a.css && this.dom.css(a.css);
            (this.group = a.group || this.group) && (this.group instanceof Array ? $.each(this.group, function () {
                this.add(b)
            }) : this.group.add(this))
        }, getNewDom: function () {
            return $("<div/>").hide().appendTo($(document.body))
        }, isHide: function () {
            return this.dom.is(":hidden")
        }, show: function () {
            this.dom.show();
            this.trigger("showHandle")
        }, hide: function () {
            this.dom.hide();
            this.trigger("hideHandle")
        }, toggle: function () {
            this.isHide() ? this.show() : this.hide()
        }, css: function (a) {
            this.dom.css(a)
        }, addChild: function (a) {
            var b = this.dom;
            b.append.apply(b, arguments)
        }, removeChild: function () {
            this.dom.empty()
        }, destroy: function () {
            var a = this;
            this.group && (this.group instanceof Array ? $.each(this.group, function () {
                this.del(a)
            }) : this.group.del(this));
            this.hide();
            this.dom.remove();
            delete this.dom
        }, toString: function () {
            return"ruyi.window.Window"
        }}),
        Na = ruyi.object.createClass(gb, {dependDom: null, align: "right", valign: "bottom", offset: {top: 0, left: 0}, inViewX: !1, inViewY: !1, init: function (a) {
            Na._super.init.apply(this, arguments);
            $.extend(this, a, {dependDom: "undefined" == typeof a.dependDom ? $(document.body) : $(a.dependDom), offset: $.extend({}, this.offset, a.offset)})
        }, show: function () {
            Na._super.show.call(this);
            this.adjust()
        }, setDependDom: function (a) {
            a && (this.dependDom = $(a))
        }, adjust: function () {
            var a = this.align, b = this.valign, c = this.getAdjustPosition(a, b), d = $(window);
            if (this.inViewY) {
                var e = !1, f = null;
                c.top < d.scrollTop() ? (b = this.getRelativeValign(b, "top"), e = !0) : c.top + this.dom.outerHeight() > d.scrollTop() + d.outerHeight() && (b = this.getRelativeValign(b, "bottom"), e = !0);
                e && (f = $.extend({}, this.offset, {top: -this.offset.top}), this.trigger("adjustChangeY", [b]));
                c = this.getAdjustPosition(a, b, f)
            }
            this.inViewX && (c.left + this.dom.outerWidth() > d.scrollLeft() + d.width() ? (a = this.getRelativeAlign(a, "right"), c = this.getAdjustPosition(a, b)) : c.left < d.scrollLeft() && (a = this.getRelativeAlign(a,
                "left"), c = this.getAdjustPosition(a, b)));
            this.dom.css({top: c.top, left: c.left})
        }, getAdjustPosition: function (a, b, c) {
            var c = c || this.offset, d = this.dependDom.offset(), e = 0, f = 0;
            "right" == a ? f = d.left : "left" == a ? f = d.left + this.dependDom.outerWidth() - this.dom.outerWidth() : "center" == a ? f = d.left - Math.abs(this.dependDom.outerWidth() - this.dom.outerWidth()) / 2 : "out_right" == a ? f = d.left + this.dependDom.outerWidth() : "out_left" == a && (f = d.left - this.dom.outerWidth());
            "top" == b ? e = d.top : "bottom" == b ? e = d.top + this.dependDom.outerHeight() :
                "middle" == b ? e = d.top + (this.dependDom.outerHeight() - this.dom.outerHeight()) / 2 : "out_top" == b ? e = d.top - this.dom.outerHeight() : "in_top" == b && (e = d.top + this.dependDom.outerHeight() - this.dom.outerHeight());
            return{top: e + c.top, left: f + c.left}
        }, getRelativeValign: function (a, b) {
            return"top" == b ? "bottom" : "out_top"
        }, getRelativeAlign: function (a, b) {
            a = a || this.align;
            if ("left" == b)switch (a) {
                case "right":
                case "center":
                case "left":
                    return"right";
                case "out_right":
                case "out_left":
                    return"out_right";
                default:
                    return a
            } else switch (a) {
                case "right":
                case "center":
                case "left":
                    return"left";
                case "out_right":
                case "out_left":
                    return"out_left";
                default:
                    return a
            }
        }, toString: function () {
            return"ruyi.window.DependWindow"
        }}), pa = ruyi.object.createClass(null, {name: null, member: null, init: function (a) {
            a = a || {};
            this.member = [];
            for (var b = a.member || [], c = 0; c < b.length; c++)this.add(b[c]);
            this.name = a.name
        }, add: function (a) {
            if (a) {
                for (var b = !1, c = 0; c < this.member.length && !(b = a == this.member[c]); c++);
                if (!b)return this.member.push(a), !0
            }
            return!1
        }, del: function (a) {
            this.member = $.grep(this.member, function (b) {
                    return a == b
                },
                !0)
        }, toString: function () {
            return"ruyi.window.Group"
        }}), hb = ruyi.object.createClass(pa, {add: function (a) {
            var b = this, c = !1;
            if (a && (c = hb._super.add.call(this, a)))ruyi.aop.addBefore(a, "show", function () {
                $.each(b.member, function () {
                    this.hide()
                })
            }), ruyi.aop.addBefore(a, "toggle", function () {
                $.each(b.member, function () {
                    a != this && this.hide()
                })
            });
            return c
        }}), ib = ruyi.object.createClass(pa, {init: function () {
            var a = this;
            ib._super.init.apply(this, arguments);
            $(document).click(function (b) {
                $.browser.mozilla && 0 != b.button || a.documentClickFunc(b)
            })
        },
            documentClickFunc: function () {
                $.each(this.member, function () {
                    this.hide()
                })
            }}), Oa = ruyi.object.createClass(pa, {adjust: function () {
            $.each(this.member, function () {
                this.adjust && !this.isHide() && this.adjust()
            })
        }}), jb = ruyi.object.createClass(Oa, {init: function () {
            var a = this;
            jb._super.init.apply(this, arguments);
            $(window).resize(function () {
                a.adjust()
            })
        }}), kb = ruyi.object.createClass(Oa, {init: function () {
            var a = this;
            kb._super.init.apply(this, arguments);
            $(window).scroll(function () {
                a.adjust()
            })
        }});
    $.extend(Ma, {Window: gb,
        DependWindow: Na, Group: pa, AdjustGroup: Oa, SingleOpenGroup: hb, ClickCloseGroup: ib, AutoAdjustGroup: jb, ScrollAdjustGroup: kb});
    var Jb = ruyi.object.createPackage("ruyi.select"), Pa = function (a) {
        return Array.prototype.slice.call(a || Pa.caller.arguments)
    }, ia = {KEYBOARD: "KEYBOARD", MOUSEENTER: "MOUSEENTER", CLICK: "CLICK"}, lb = ruyi.object.createClass({dom: null, keyboardUpDownDom: null, name: null, options: null, cursor: -1, _disabled: !1, init: function (a) {
        $.extend(this, a, {options: [], dom: $(a.dom ? a.dom : this.getDefaultDom()), keyboardUpDownDom: $(a.keyboardUpDownDom ?
            a.keyboardUpDownDom : $("<span/>"))});
        this.initUpDown()
    }, disable: function () {
        this._disabled = !0
    }, enable: function () {
        this._disabled = !1
    }, initUpDown: function () {
        var a = this;
        this.keyboardUpDownDom.keyup(function (b) {
            a._disabled || (38 == b.keyCode ? a.up(ia.KEYBOARD) : 40 == b.keyCode && a.down(ia.KEYBOARD))
        })
    }, getDefaultDom: function () {
        return $("<div/>").appendTo(document.body)
    }, addOption: function (a) {
        var b = this, c = this.options.push(a) - 1;
        a.dom.bind("mouseenter", function () {
            b.moveTo(c, ia.MOUSEENTER)
        });
        a.dom.bind("click", function () {
            b.moveTo(c,
                ia.CLICK)
        });
        this.dom.append(a.dom)
    }, addLine: function () {
        this.dom.append($("<hr/>"))
    }, clear: function () {
        for (var a = 0; a < this.options.length; a++)this.options[a].destroy(), this.options[a] = ea, delete this.options[a];
        delete this.options;
        this.options = [];
        this.cursor = -1;
        this.dom.empty()
    }, moveTo: function (a, b) {
        return this.options[a] ? ("number" == typeof this.cursor && this.options[this.cursor] && this.options[this.cursor].unselect(b), this.cursor = a, this.options[this.cursor].select(b), !0) : !1
    }, up: function () {
        var a = this.options.length -
            1;
        "number" == typeof this.cursor && (a = this.cursor - 1, 0 > a && (a = this.options.length - 1));
        var b = Pa();
        b.unshift(a);
        return this.moveTo.apply(this, b)
    }, down: function () {
        var a = this.cursor + 1;
        a > this.options.length - 1 && (a = 0);
        var b = Pa();
        b.unshift(a);
        return this.moveTo.apply(this, b)
    }, getPrev: function () {
        return-1 == this.cursor ? null : this.getOption(this.cursor - 1)
    }, getNext: function () {
        return-1 == this.cursor ? null : this.getOption(this.cursor + 1)
    }, getFirst: function () {
        return this.getOption(0)
    }, getLast: function () {
        return this.getOption(this.cursor.length -
            1)
    }, getOption: function (a) {
        return 0 > a || a >= this.options.length ? null : this.options[a]
    }, getCurrOption: function () {
        return this.getOption(this.cursor)
    }}), mb = ruyi.object.createClass(lb, {window: null, init: function (a) {
        a.dom = a.window.dom;
        mb._super.init.apply(this, arguments)
    }}), Kb = ruyi.object.createClass({dom: null, name: null, value: null, highlightClass: null, unhighlightClass: null, selected: !1, init: function (a) {
        $.extend(this, a);
        this.dom = $(this.dom ? this.dom : this.getDefaultDom())
    }, getDefaultDom: function () {
        return $("<div/>")
    },
        select2: function () {
            this.selected = !0;
            this.highlight()
        }, select: function (a) {
            this.select2();
            this.trigger("selectHandle", [a])
        }, unselect: function (a) {
            this.selected = !1;
            this.unhighlight();
            ("undefined" == typeof a || a) && this.trigger("unselectHandle")
        }, highlight: function () {
            this.dom.removeClass(this.unhighlightClass).addClass(this.highlightClass)
        }, unhighlight: function () {
            this.dom.removeClass(this.highlightClass).addClass(this.unhighlightClass)
        }, destroy: function () {
            this.dom.remove();
            this.dom = ea;
            delete this.dom
        }});
    $.extend(Jb, {Select: lb, WindowSelect: mb, Option: Kb, SELECT_TYPE: ia});
    var Lb = ruyi.object.createPackage("ruyi.suggest"), nb = ruyi.object.createClass(ruyi.select.Select, {init: function () {
        var a = this;
        nb._super.init.apply(this, arguments);
        this.window.bind("showHandle", function () {
            a.enable()
        });
        this.window.bind("hideHandle", function () {
            a.disable()
        })
    }, show: function () {
        this.window.show()
    }, hide: function () {
        this.window.hide()
    }}), Qa = ruyi.object.createClass(ruyi.select.Select, {init: function () {
        Qa._super.init.apply(this, arguments)
    },
        addOption: function (a) {
            var b = this;
            a.bind("selectHandle", function (a, d) {
                d == ruyi.select.SELECT_TYPE.KEYBOARD ? b.keyboardUpDownDom.val(this.getTextValue()) : d == ruyi.select.SELECT_TYPE.CLICK && (b.keyboardUpDownDom.val(this.getTextValue()), b.hide())
            });
            Qa._super.addOption.apply(this, arguments)
        }, show: function () {
            this.dom.show()
        }, hide: function () {
            this.dom.hide()
        }}), ob = ruyi.object.createClass(ruyi.select.Option, {init: function () {
        ob._super.init.apply(this, arguments)
    }, getTextValue: function () {
        return this.value
    }}), Mb =
        ruyi.object.createClass(null, {dataSource: null, _loadTimer: null, time: 200, textDom: null, _oldValue: null, select: null, message: null, init: function (a) {
            var b = this;
            $.extend(this, a, {textDom: $(a.textDom)});
            this.dataSource.conf.success = function () {
                b.reload.apply(b, arguments)
            };
            this.textDom.focus(function () {
                this.value == b.message && (this.value = "", b.trigger("hideMessageHandle"))
            }).blur(function () {
                "" == jQuery.trim(this.value) && (this.value = b.message, b.trigger("showMessageHandle"))
            }).keyup(function (a) {
                13 == a.keyCode ? b.trigger("textEnterHandle",
                    b.textDom.val()) : 38 == a.keyCode || 40 == a.keyCode || (b.__triggerByValue(), 0 >= b.textDom.val().length ? b._oldValue = b.textDom.val() : b._oldValue != b.textDom.val() && (b.stop(), b._loadTimer = setTimeout(function () {
                    b._oldValue = b.textDom.val();
                    b.dataSource.conf.url = b.getUrl(b.textDom.val());
                    b.dataSource.conf.data = b.getData(b.textDom.val());
                    b.dataSource.reload()
                }, b.time || 0)))
            })
        }, __triggerByValue: function () {
            0 >= this.textDom.val().length ? this.trigger("textEmptyHandle") : this.trigger("textFullHandle", this.textDom.val())
        },
            clearTimer: function () {
                this._loadTimer && (clearTimeout(this._loadTimer), this._loadTimer = null)
            }, getUrl: function () {
                return this.dataSource.conf.url
            }, getData: function () {
                return null
            }, reload: function () {
                this.select.clear();
                for (var a = this.getOptions.apply(this, arguments), b = 0; b < a.length; b++)this.select.addOption(a[b]);
                0 < this.select.options.length ? this.select.show() : this.select.hide()
            }, getOptions: function () {
                return[]
            }, clearInput: function () {
                this.textDom.val(this._oldValue = "")
            }, setValue: function (a, b) {
                !1 != b && this.textDom.focus();
                this.textDom.val(this._oldValue = a);
                this.__triggerByValue()
            }, setMessage: function (a) {
                this.message = a
            }, getMessage: function () {
                return this.message
            }, stop: function () {
                this.clearTimer();
                this.dataSource.abort()
            }});
    $.extend(Lb, {SuggestSelect: nb, SuggestOption: ob, DefaultSuggestSelect: Qa, Suggest: Mb});
    var Nb = ruyi.object.createPackage("ruyi.page"), Ob = ruyi.object.createClass(null, {init: function (a) {
        this._count = a.count || 0;
        this._ps = a.ps || 10;
        this._pc = 0;
        this._pn = a.pn || 1;
        this._vn = a.vn || 7;
        this.adjust()
    }, getStart: function () {
        return(this.getPN() -
            1) * this.getPS()
    }, getBeginPage: function () {
        return Math.max(this.getPN() - Math.floor(this._vn / 2), 1)
    }, getEndPage: function () {
        return Math.min(this.getBeginPage() + Math.max(0, this._vn - 1), this._pc)
    }, getNextPage: function () {
        return this._pn + 1 > this.getPC() ? null : this._pn + 1
    }, getPrevPage: function () {
        return 1 > this._pn - 1 ? null : this._pn - 1
    }, getPC: function () {
        return this._pc
    }, setPN: function (a) {
        this._pn = a
    }, getPN: function () {
        return this._pn
    }, setPS: function (a) {
        this._ps = a;
        return adjust()
    }, getPS: function () {
        return this._ps
    }, setVN: function (a) {
        this._vn =
            a
    }, getVN: function () {
        return this._vn
    }, getCount: function () {
        return this._count
    }, setCount: function (a) {
        this._count = a;
        this.adjust();
        return this
    }, adjust: function () {
        this._pc = Math.ceil(this._count / this._ps);
        return this
    }});
    $.extend(Nb, {Page: Ob});
    var Pb = ruyi.object.createPackage("ruyi.list"), Qb = ruyi.object.createClass(null, {dom: null, page: null, init: function (a) {
        $.extend(this, a, {dom: $(a.dom), page: a.page || this.page || new ruyi.page.Page({})})
    }, pageTo: function (a) {
        this.show.apply(this, arguments)
    }, nextPage: function () {
        var a =
            this.page.getNextPage();
        this.page.getPN() < a && this.pageTo(a)
    }, refresh: function () {
        this.pageTo(this.page.getPN())
    }, show: function () {
    }, showListByArr: function (a) {
        this.empty();
        this.addItems(a)
    }, empty: function () {
        this.dom.empty()
    }, addItem: function (a, b) {
        var c = this.getItemDom(a, b);
        c instanceof Array ? this.dom.append.apply(this.dom, c) : this.dom.append(c)
    }, addItems: function (a, b) {
        var c = this.getItemDomArr(a, b);
        if ($.isArray(c)) {
            var d = this.dom;
            d.append.apply(d, c)
        }
    }, getItemDom: function () {
    }, getItemDomArr: function (a, b) {
        var c =
            a.length;
        if (0 < c) {
            for (var b = b || 0, d = [], e = 0; e < c; e++) {
                var f = this.getItemDom(a[e], b + e);
                f instanceof Array ? d.push.apply(d, f) : d.push(f)
            }
            return d
        }
        return null
    }, destroy: function () {
        this.dom.remove();
        this.dom = null
    }});
    $.extend(Pb, {List: Qb});
    var Rb = ruyi.object.createPackage("ruyi.tab"), Sb = ruyi.object.createClass(null, {name: null, showItem: null, showItemNum: -1, items: null, init: function (a) {
        var a = a || {}, b = this;
        $.extend(this, {name: a.name, items: []});
        $.each(a.items || [], function (a, d) {
            b.addItem(d)
        });
        a.defaultShow && this.show(a.defaultShow)
    },
        addItem: function (a) {
            this.items.push(a)
        }, show: function (a) {
            var b, c, d = null, e = -1;
            "string" == typeof a ? $.each(this.items, function (b, c) {
                a == c.name ? (c.show(), d = c, e = b) : c.hide()
            }) : "number" == typeof a && $.each(this.items, function (b, c) {
                a == b ? (c.show(), d = c, e = b) : c.hide()
            });
            d && (b = this.showItem, c = this.showItemNum, this.showItem = d, this.showItemNum = e, b !== d && this.trigger("changeHandle", [b, c, d, e]), this.trigger("showHandle", [b, c, d, e]))
        }, getItem: function (a) {
            if ("string" == typeof a)for (var b = 0; b < this.items.length; b++) {
                var c = this.items[b];
                if (a == c.name)return c
            } else if ("number" == typeof a && this.items.length > a)return this.items[a];
            return null
        }}), Tb = ruyi.object.createClass(null, {name: null, dom: null, init: function (a) {
        $.extend(this, a, {name: a.name, dom: $(a.dom)})
    }, show: function () {
        this.dom.show();
        this.trigger("showHandle")
    }, hide: function () {
        this.dom.hide();
        this.trigger("hideHandle")
    }});
    $.extend(Rb, {Tab: Sb, TabItem: Tb});
    var Ub = ruyi.object.createPackage("ruyi.job"), pb = ruyi.object.createClass({_name: "", _exeTime: null, _exeCount: 0, init: function (a) {
        $.extend(this,
            a, {_name: a.name})
    }, getName: function () {
        return this._name
    }, getExeTime: function () {
        return this._exeTime
    }, getExeCount: function () {
        return this._exeCount
    }, execute: function () {
        this._exeTime = new Date;
        this._exeCount++;
        this.trigger("executeHandle", Array.prototype.slice.apply(arguments))
    }}), Vb = ruyi.object.createClass(pb, {_members: null, _name: "", init: function (a) {
        this.callSuper.apply(this, arguments);
        this._members = {}
    }, execute: function (a, b, c) {
        var d = this.get(a);
        d && d.execute(b, c);
        this.callSuper.apply(this, arguments)
    },
        add: function (a) {
            this._members[a.getName()] = a
        }, get: function (a) {
            return a ? this._members[a] || null : this.getMembers()
        }, getMembers: function () {
            for (var a in this._members)this._members.hasOwnProperty(a) && arr.push(this._members[a]);
            return arr
        }});
    $.extend(Ub, {JobManager: Vb, Job: pb});
    var Wb = ruyi.object.createPackage("ruyi.module"), qb = new ruyi.object.createClass({_members: null, init: function (a) {
        $.extend(this, a, {_members: []})
    }, broadcast: function (a, b, c) {
        if (this.has(a))for (var d in this._members) {
            var e = this._members[d];
            e.name != a && this._members.hasOwnProperty(d) && e.__trigger.apply(e, arguments)
        }
    }, add: function (a) {
        a != this && (this._members[a.name] = a, a.setManager(this))
    }, get: function (a) {
        return this._members[a]
    }, has: function (a) {
        return!!this.get(a)
    }}), rb = new qb({name: "global"}), Xb = ruyi.object.createClass(qb, {_manager: null, name: null, init: function (a) {
        this.callSuper.apply(this, arguments);
        rb.add(this)
    }, broadcast: function (a, b) {
        var c = [this.name];
        Array.prototype.push.apply(c, arguments);
        this._manager.broadcast.apply(this._manager,
            c)
    }, __trigger: function (a, b, c) {
        this.trigger(a + ":" + b, Array.prototype.slice.call(arguments, 2))
    }, setManager: function (a) {
        this._manager = a
    }});
    $.extend(Wb, {modules: rb, Module: Xb});
    ruyi.object.createPackage("ruyi.popup.util");
    var Yb = ruyi.object.createPackage("ruyi.popup.global"), qa = G, Zb = ruyi.object.createClass(ruyi.data.ExtDS, {keyword: "", searchEngine: "etao", _reset: function () {
        var a = this, b = 1, c = ea, d = new ruyi.data.ExtDS({conf: {}}), e = this.page.getPS();
        this.pageCache = qa.PageCache(function (e) {
            "undefined" == typeof c ||
                b <= c ? (d.conf.data = {topic: "item_search", Keyword: a.getKeyword(), SearchEngine: a.getSearchEngine(), ItemPage: b}, d.conf.success = function (a) {
                b++;
                if ("Code"in a)qa.console.debug(a.Message), e([]); else return(c = a.TotalPages) ? e(a.Items || []) : e([])
            }, d.load()) : e([])
        }, {PageSize: e}, !0)
    }, getData: function (a) {
        this.pageCache.get(this.page.getPN(), a)
    }, getKeyword: function () {
        return this.keyword
    }, setKeyword: function (a) {
        try {
            this.keyword = decodeURIComponent(a)
        } catch (b) {
            this.keyword = ""
        }
        this._reset()
    }, getSearchEngine: function () {
        return this.searchEngine
    },
        setSearchEngine: function (a) {
            this.searchEngine = a;
            this._reset()
        }}), $b = ruyi.object.createClass(ruyi.list.List, {_data: null, init: function (a) {
        this.callSuper.apply(this, arguments);
        this.bindEvents()
    }, bindEvents: function () {
        this.dom.delegate(".ruyitao-selector-prefix-product-item", "click", $.proxy(function (a) {
            a = $(a.currentTarget).attr("data-index");
            this.trigger("selectHandle", [this.getData(a)])
        }, this))
    }, show: function (a) {
        var b = this, c = this.page;
        c.setPN(a || c.getPN() || 1);
        this.dataSource.conf.success = function (a) {
            a &&
            b.showListByArr(a.Entries || [])
        };
        this.dataSource.load()
    }, showListByArr: function (a) {
        this._data = a;
        this.callSuper.apply(this, arguments)
    }, getData: function (a) {
        return isNaN(a) ? this._data : this._data[a]
    }, getItemDom: function (a, b) {
        var c = this.encodeHTML(a.Title) || "";
        return['<li class="ruyitao-selector-prefix-product-item" data-index="' + b + '">', '  <span class="ruyitao-selector-prefix-product-image-wrapper" title="' + c + '"><img class="ruyitao-selector-prefix-product-image" src="' + (a.SmallImageUrl || "") + '"><b class="ruyitao-selector-prefix-line-height-setter"></b></span>',
            '  <div class="ruyitao-selector-prefix-product-title" title="' + c + '">' + (c || "&nbsp;") + "</div>", '  <div class="ruyitao-selector-prefix-product-price" title="">' + (a.Price || "" || "&nbsp;") + "</div>", "</li>"].join("")
    }, encodeHTML: function (a) {
        return"string" != typeof a ? a : a.replace(/"|&|'|<|>/g, function (a) {
            return"&#" + a.charCodeAt(0) + ";"
        })
    }}), Ra = new ruyi.tab.Tab({name: "historyAndResultTab"});
    Ra.bind("changeHandle", function (a, b, c, d) {
        d.dom.hide().fadeIn(200)
    });
    var sb = new ruyi.tab.Tab({name: "globalTab"});
    $("#ruyitao-selector-prefix-toolbar-logo").click(function () {
        sb.show("searchView");
        Ra.show("searchHistory")
    });
    $("#ruyitao-selector-prefix-toolbar-options").click(function () {
        var a = qa.SearchBox.Util.getURL("views/options.html");
        qa.SearchBox.Util.openTab(a, !0)
    });
    $("#ruyitao-selector-prefox-toolbar-ivy-home").click(function () {
        (new ruyi.data.ExtDS({conf: {data: {topic: "item_like_open_homepage"}}})).load()
    });
    $("#ruyitao-selector-prefix-toolbar-close").click(function () {
        try {
            external.quit()
        } catch (a) {
            window.close()
        }
    });
    $("#ruyitao-selector-prefix-toolbar-logout").click(function (a) {
        a.preventDefault();
        a.stopPropagation();
        (new ruyi.data.ExtDS({conf: {data: {topic: "logout_from_ivy"}, success: function () {
            $(".ruyitao-selector-prefix-unlogedin-view").show();
            $(".ruyitao-selector-prefix-logedin-view").hide();
            $("#ruyitao-selector-prefix-toolbar-logout").hide();
            $("#ruyitao-selector-prefix-toolbar-username").hide();
            $("#ruyitao-selector-prefix-detail-wrapper").hide();
            $("#ruyitao-selector-prefix-search-view").hide()
        }}})).load()
    });
    $.extend(Yb, {ItemSearchDS: Zb, ProductListBase: $b, historyAndResultTab: Ra, globalTab: sb});
    ruyi.object.createPackage("ruyi.popup.suggest");
    var ac = ruyi.object.createClass(ruyi.suggest.Suggest, {init: function (a) {
        a.select = new ruyi.suggest.SuggestSelect({window: new ruyi.window.DependWindow({group: [new ruyi.window.ClickCloseGroup, new ruyi.window.AutoAdjustGroup], dom: $(a.windowDom), dependDom: $(a.textDom)}), keyboardUpDownDom: a.textDom, dom: jQuery("<ol/>").appendTo(a.windowDom)});
        a.dataSource = a.dataSource || new ruyi.data.ExtDS({conf: {}});
        this.callSuper.apply(this, arguments);
        ruyi.aop.addAfter(this.select,
            "clear", function () {
                this.prev = this.next = ea
            });
        this.closeDom = $(a.closeDom);
        this.bindEvents()
    }, bindEvents: function () {
        this.bind("textEmptyHandle", function () {
            this.select.window.hide()
        });
        this.bind("textFullHandle", function () {
            this.closeDom.show()
        });
        this.bind("showMessageHandle textEmptyHandle", function () {
            this.closeDom.hide()
        });
        this.closeDom.click($.proxy(function () {
            this.setValue("")
        }, this));
        this.bind("textEnterHandle textEmptyHandle", $.proxy(this.stop, this))
    }, getOptions: function (a) {
        for (var b = [], a = a.result,
                 c = 0, d = a.length; c < d; c++)b.push(this.getOption(a[c]));
        return b
    }, getOption: function (a) {
        var b = this;
        option = new ruyi.suggest.SuggestOption({value: a, highlightClass: "ruyitao-selector-prefix-suggestion-selected", getDefaultDom: function () {
            return jQuery("<li/>").html(this.getTextValue()).click($.proxy(function () {
                b.textDom.val(this.getTextValue())
            }, this))
        }, getTextValue: function () {
            return this.value[0]
        }});
        option.bind("selectHandle", function (a, d) {
            d == ruyi.select.SELECT_TYPE.KEYBOARD && b.textDom.val(this.getTextValue());
            b.trigger("selectHandle", [d, this])
        });
        return option
    }, getData: function (a) {
        return{topic: "suggest_search", keyword: a}
    }}), va = $("#ruyitao-selector-prefix-toolbar-searchbox-text").click(function (a) {
        a.stopPropagation()
    }), T = new ac({time: 50, message: va.val(), textDom: va, windowDom: "#ruyitao-selector-prefix-suggestion-box", closeDom: "#ruyitao-selector-prefix-toolbar-searchbox-close"});
    T.bind("hideMessageHandle", function () {
        this.textDom.addClass("ruyitao-selector-prefix-toolbar-searchbox-text-active")
    });
    T.bind("showMessageHandle",
        function () {
            this.textDom.removeClass("ruyitao-selector-prefix-toolbar-searchbox-text-active")
        });
    T.bind("selectHandle", function (a, b, c) {
        b != ruyi.select.SELECT_TYPE.KEYBOARD && b == ruyi.select.SELECT_TYPE.CLICK && ja.search(c.getTextValue())
    });
    T.bind("textEnterHandle", function (a, b) {
        if ((b = b || this.textDom.val()) && b != this.message)this.select.hide(), ja.search(b || va.val());
        this.textDom.focus()
    });
    T.bind("textEmptyHandle", function () {
        ja.textEmpty()
    });
    $("#ruyitao-selector-prefix-toolbar-searchbox-button").click(function () {
        T.trigger("textEnterHandle");
        return!1
    });
    var ja = new ruyi.module.Module({name: "suggest", BROADCAST_TYPE: {SEARCH: "search", EMPTY: "empty"}, search: function (a) {
        this.broadcast(this.BROADCAST_TYPE.SEARCH, a)
    }, textEmpty: function () {
        this.broadcast(this.BROADCAST_TYPE.EMPTY)
    }});
    ja.bind("searchHistory:search status:search", function (a, b) {
        T.setValue(b.keyword)
    });
    ja.bind("i18n:ready", function (a, b) {
        "zh" != b && T.dataSource.setSuccessFilter(new ruyi.data.Filter({doFilter: function (a, b) {
            for (var e = [], f = b[1], h = 0, m = f.length; h < m; h++)e.push([f[h]]);
            a({result: e})
        }}));
        T.setMessage(va.val())
    });
    ruyi.object.createPackage("ruyi.popup.searchHistory");
    var tb = new ruyi.data.Filter({doFilter: function (a, b) {
        for (var c = [], d = 0, e = b.length, f; d < e; d++)f = b[d], c.push({Title: f.keyword, Price: "", SmallImageUrl: f.img, searchBean: f});
        a({Entries: c})
    }}), ub = ruyi.object.createClass(ruyi.popup.global.ProductListBase, {containerDom: null, init: function (a) {
        this.callSuper.apply(this, arguments);
        this.containerDom = $(a.containerDom);
        this.setDataSource()
    }, showListByArr: function (a) {
        this.callSuper.apply(this,
            arguments);
        !a || 0 >= a.length ? this.containerDom.hide() : this.containerDom.show()
    }, hide: function () {
        this.containerDom.hide()
    }, setDataSource: function () {
        this.dataSource = new ruyi.data.ExtDS({conf: {data: {topic: "search_history", begin: 0, num: this.page.getPS()}}, successFilter: tb})
    }}), ra = new ub({page: new ruyi.page.Page({ps: 10}), dom: "#ruyitao-selector-prefix-toolbar-history-search .ruyitao-selector-prefix-product-list", containerDom: "#ruyitao-selector-prefix-toolbar-history-search"});
    ra.bind("selectHandle", function (a, b) {
        ka.search(b.searchBean)
    });
    $("#ruyitao-selector-prefix-toolbar-history-clear").click(function () {
        (new ruyi.data.ExtDS({conf: {data: {topic: "clear_search_history"}, success: function () {
            ra.show()
        }}})).load()
    });
    var la = new (ruyi.object.createClass(ub, {data: null, setDataSource: function () {
        var a = this;
        this.dataSource = new ruyi.data.DataSource({conf: {}, getData: function (b) {
            b(a.data || [])
        }, successFilter: tb})
    }, setData: function (a) {
        this.data = a
    }}))({page: new ruyi.page.Page({ps: 10}), dom: "#ruyitao-selector-prefix-toolbar-popular-search .ruyitao-selector-prefix-product-list",
        containerDom: "#ruyitao-selector-prefix-toolbar-popular-search"});
    la.bind("selectHandle", function (a, b) {
        ka.search(b.searchBean)
    });
    ruyi.aop.addAfter(ra, "showListByArr", function (a) {
        !a || 0 >= a.length ? la.show() : la.hide()
    });
    var vb = ruyi.popup.global.historyAndResultTab, wb = new ruyi.tab.TabItem({name: "searchHistory", dom: "#ruyitao-selector-prefix-toolbar-history"});
    wb.bind("showHandle", function () {
        ra.show()
    });
    vb.addItem(wb);
    var ka = new ruyi.module.Module({name: "searchHistory", BROADCAST_TYPE: {SEARCH: "search"}, search: function (a) {
        this.broadcast(this.BROADCAST_TYPE.SEARCH,
            a)
    }});
    ka.bind("suggest:empty", function () {
        vb.show("searchHistory")
    });
    ka.bind("i18n:ready", function (a, b, c) {
        la.setData(c.popular_search_data)
    });
    ruyi.object.createPackage("ruyi.popup.searchResult");
    var Sa = G, bc = ruyi.object.createClass(ruyi.popup.global.ProductListBase, {_showLoadingTimer: null, LOADING_CLASS: "ruyitao-selector-prefix-loading", NODATA_CLASS: "ruyitao-selector-prefix-nodata", bindEvents: function () {
        this.callSuper.apply(this, arguments);
        this.page.bind("changeHandle", $.proxy(function (a, b) {
                this.show(b)
            },
            this))
    }, showListByArr: function (a) {
        var b = this.page;
        this.hideLoading();
        !a || 0 >= a.length ? (this.showNoData(), b.setCount((b.getPN() - 1) * b.getPS()), b.getMaxPC() == Number.MAX_VALUE && b.setMaxPC(Math.max(b.getPN() - 1, 0))) : b.setCount(b.getPN() * b.getPS());
        b.show(a && a.length || 0);
        this.callSuper.apply(this, arguments);
        $.browser.msie && 7 >= $.browser.version || this.dom.hide().fadeIn(200)
    }, show: function (a, b, c) {
        this.resetPage(b, c);
        "string" == typeof b && this.dataSource.setKeyword(b);
        "string" == typeof c && this.dataSource.setSearchEngine(c);
        this.dom.empty();
        this.hideNoData();
        this.showLoading();
        this.callSuper.apply(this, arguments)
    }, resetPage: function (a, b) {
        (this.dataSource.getKeyword() != a || this.dataSource.getSearchEngine() != b) && this.page.reset()
    }, showLoading: function () {
        this.clearShowLoading();
        this._showLoadingTimer = setTimeout($.proxy(function () {
            this.dom.addClass(this.LOADING_CLASS);
            this.page.hide()
        }, this), 100)
    }, hideLoading: function () {
        this.clearShowLoading();
        this.dom.removeClass(this.LOADING_CLASS)
    }, clearShowLoading: function () {
        this._showLoadingTimer &&
        (clearTimeout(this._showLoadingTimer), this._showLoadingTimer = null)
    }, showNoData: function () {
        this.dom.addClass(this.NODATA_CLASS)
    }, hideNoData: function () {
        this.dom.removeClass(this.NODATA_CLASS)
    }, getSearchBean: function () {
        return{keyword: this.dataSource.getKeyword(), se: this.dataSource.getSearchEngine(), pageNum: this.page.getPN() || 1}
    }}), xb = new (ruyi.object.createClass(ruyi.page.Page, {_maxPC: Number.MAX_VALUE, init: function (a) {
        this.callSuper.apply(this, arguments);
        this.dom = $(a.dom);
        this._bindEvents()
    }, _bindEvents: function () {
        this.dom.delegate("a.ruyitao-selector-prefix-page-prev.ruyitao-selector-prefix-page-active,a.ruyitao-selector-prefix-page-next.ruyitao-selector-prefix-page-active",
            "click", $.proxy(function (a) {
                a.preventDefault();
                var a = $(a.currentTarget), b = this.getPN(), b = a.hasClass("ruyitao-selector-prefix-page-next") ? Math.min(b + 1, this.getMaxPC()) : a.hasClass("ruyitao-selector-prefix-page-prev") ? Math.max(b - 1, 1) : +a.html();
                this.trigger("changeHandle", b)
            }, this))
    }, setCount: function (a, b) {
        (b || this.getCount() < a) && this.callSuper.apply(this, arguments)
    }, getBeginPage: function () {
        return this.getMaxPC() == Number.MAX_VALUE ? Math.max(1, this.getPN() - this.getVN() + 1) : this.callSuper.apply(this, arguments)
    },
        setMaxPC: function (a) {
            this._maxPC = a
        }, getMaxPC: function () {
            return this._maxPC
        }, show: function (a) {
            this.setBtn("prev", 1 < this.getPN());
            this.setBtn("next", a >= this.getPS())
        }, hide: function () {
            this.setBtn("prev", !1);
            this.setBtn("next", !1)
        }, reset: function () {
            this.setPN(1);
            this.setCount(0, !0);
            this.setMaxPC(Number.MAX_VALUE)
        }, setBtn: function (a, b) {
            var c = $("a.ruyitao-selector-prefix-page-" + a, this.dom);
            b ? !c.hasClass("ruyitao-selector-prefix-page-active") && c.addClass("ruyitao-selector-prefix-page-active") : c.removeClass("ruyitao-selector-prefix-page-active")
        }}))({ps: 8,
        vn: 5, dom: "#ruyitao-selector-prefix-toolbar-searchresult .ruyitao-selector-prefix-product-container-searchresult"}), P = new bc({page: xb, dom: "#ruyitao-selector-prefix-toolbar-searchresult .ruyitao-selector-prefix-product-list", dataSource: new ruyi.popup.global.ItemSearchDS({page: xb, conf: {}, successFilter: new ruyi.data.Filter({doFilter: function (a, b) {
        if (b && b.Entries)for (var c = 0, d = b.Entries, e = d.length, f, h; c < e; c++)if ((f = d[c].Price) && 0 < (h = f.indexOf("-")))d[c].Price = $.trim(f.substring(0, h));
        a(b)
    }})})});
    ruyi.aop.addAfter(P,
        "showNoData", function () {
            $("#ruyitao-selector-prefix-toolbar-searchresult .ruyitao-selector-prefix-nodata-box").show()
        });
    ruyi.aop.addAfter(P, "hideNoData", function () {
        $("#ruyitao-selector-prefix-toolbar-searchresult .ruyitao-selector-prefix-nodata-box").hide()
    });
    P.bind("selectHandle", function (a, b) {
        ca.selectProduct(b)
    });
    var cc = ruyi.object.createClass(ruyi.list.List, {__readyCBArr: null, currentSeId: null, SELECTED_CLASS: "ruyitao-selector-prefix-shop-selected", init: function (a) {
        this.callSuper.apply(this, arguments);
        this.dataSource = a.dataSource || new ruyi.data.DataSource({conf: {}, __getDataFlag: !1, getData: function (a, c, d) {
            if (this.__getDataFlag) {
                var e = Sa.SearchBox.SearchEngines.getCurrentLocaleSearchEngines();
                Sa.SearchBox.SearchEngines.sort(e);
                a(e)
            } else {
                var f = arguments.callee, h = arguments;
                Sa.SearchBox.SearchEngines.getAll($.proxy(function () {
                    this.__getDataFlag = !0;
                    f.apply(this, h)
                }, this))
            }
        }});
        this.__readyCBArr = [];
        this._bindEvents()
    }, _bindEvents: function () {
        this.dom.delegate("li:not(." + this.SELECTED_CLASS + ")", "click",
            $.proxy(function (a) {
                this.select($(a.currentTarget))
            }, this))
    }, ready: function (a) {
        this.dataSource.__getDataFlag ? a.apply(this) : this.__readyCBArr.push(a)
    }, __doReady: function () {
        for (var a = 0, b = this.__readyCBArr.length; a < b; a++) {
            var c = this.__readyCBArr[0];
            this.__readyCBArr.shift();
            c.apply(this)
        }
    }, select: function (a, b) {
        null == a && (a = this.currentSeId || this.getSEId(0));
        var c = a;
        "string" == typeof a && (c = this.getDomBySE(a));
        if (c && 0 < c.length) {
            var d = $("li." + this.SELECTED_CLASS, this.dom).removeClass(this.SELECTED_CLASS);
            c.addClass(this.SELECTED_CLASS);
            this.currentSeId = a;
            this.trigger("selectHandle", [
                {name: c.attr("data-se-id"), title: c.attr("data-se-name")},
                d,
                c,
                b
            ])
        }
    }, show: function () {
        var a = this;
        this.dataSource.conf.success = function (b) {
            b && a.showListByArr(b || [])
        };
        this.dataSource.load()
    }, showListByArr: function (a) {
        this._data = a;
        this.callSuper.apply(this, arguments);
        this.__doReady()
    }, getItemDom: function (a, b) {
        var c = "\u4e00\u6dd8" == a.title ? "\u6240\u6709" : a.title;
        return"" + ("<li " + (0 == b ? 'class="' + this.SELECTED_CLASS + '"' : "") + 'data-se-id="' +
            a.name + '" data-se-name="' + c + '">' + c + "</li>")
    }, getDomBySE: function (a) {
        return $('li[data-se-id="' + a + '"]', this.dom)
    }, getSE: function (a) {
        return this._data && this._data[a]
    }, getSEId: function (a) {
        return(a = this.getSE(a)) && a.name
    }}), Z = new (ruyi.object.createClass(cc, {cursorDom: null, init: function () {
        this.callSuper.apply(this, arguments);
        this.cursorDom = $(this.cursorDom);
        this.bind("selectHandle", $.proxy(function (a, b, c, d) {
            this.animate(c, d)
        }, this))
    }, animate: function (a, b) {
        var c = this.getOffset(b).top;
        $.browser.msie && 7 >=
            $.browser.version ? this.cursorDom.css({marginTop: c}) : this.cursorDom.animate({marginTop: c}, 100)
    }, getOffset: function (a) {
        var a = a.offset(), b = this.dom.offset();
        return{top: a.top - b.top, left: a.left - b.left}
    }}))({dom: "#ruyitao-selector-prefix-toolbar-searchresult .ruyitao-selector-prefix-shop-container ul", cursorDom: "#ruyitao-selector-prefix-toolbar-searchresult .ruyitao-selector-prefix-shop-container .ruyitao-selector-prefix-shop-cursor"});
    Z.bind("selectHandle", function (a, b, c, d, e) {
        P.show(e && e.page && e.page.getPN() ||
            1, null, b.name)
    });
    Z.show();
    var xa = ruyi.popup.global.historyAndResultTab, dc = new ruyi.tab.TabItem({name: "searchResult", dom: "#ruyitao-selector-prefix-toolbar-searchresult"});
    xa.addItem(dc);
    var ca = new ruyi.module.Module({name: "searchResult", BROADCAST_TYPE: {SHOW_PRODUCT_LIST: "showProductList", SELECT_PRODUCT: "selectProduct"}, showProductList: function (a) {
        this.broadcast(this.BROADCAST_TYPE.SHOW_PRODUCT_LIST, a)
    }, selectProduct: function (a) {
        this.broadcast(this.BROADCAST_TYPE.SELECT_PRODUCT, a)
    }});
    ruyi.aop.addAfter(P,
        "show", function () {
            ca.showProductList(this.getSearchBean())
        });
    ca.bind("suggest:search", function (a, b) {
        xa.show("searchResult");
        P.dataSource.setKeyword(b);
        Z.ready(function () {
            this.select(null)
        })
    });
    ca.bind("searchHistory:search", function (a, b) {
        xa.show("searchResult");
        P.dataSource.setKeyword(b.keyword);
        Z.ready(function () {
            this.select(b.se)
        })
    });
    ca.bind("status:search", function (a, b) {
        xa.show("searchResult");
        P.dataSource.setKeyword(b.keyword);
        P.dataSource.setSearchEngine(b.se);
        P.page.setPN(b.pageNum || 1);
        Z.ready(function () {
            this.select(b.se,
                {page: P.page})
        })
    });
    ruyi.object.createPackage("ruyi.popup.searchView");
    var yb = ruyi.popup.global.globalTab, ec = 0;
    $("#nav-search").click(function () {
        yb.show("searchView")
    });
    var Ta = new ruyi.tab.TabItem({name: "searchView", dom: "#ruyitao-selector-prefix-search-view"});
    Ta.bind("showHandle", function () {
        $("#nav-search").addClass("active").removeClass("hidden");
        fc.show()
    });
    Ta.bind("hideHandle", function () {
        $("#nav-search").removeClass("active").removeClass("hidden")
    });
    yb.addItem(Ta);
    var fc = new ruyi.module.Module({name: "searchView",
        BROADCAST_TYPE: {SHOW: "show"}, show: function () {
            this.broadcast(this.BROADCAST_TYPE.SHOW, ++ec)
        }});
    ruyi.object.createPackage("ruyi.popup.detail");
    var ya = G, da = ya.SearchBox.Util, gc = ruyi.object.createClass({currentProductInfo: null, currentIsBook: null, priceCurve: null, currentProductLink: "", init: function (a) {
        this.priceCurve = a;
        this.bindEvents()
    }, bindEvents: function () {
        var a = this;
        $("#ruyitao-selector-prefix-share-btn").click(function () {
            a.currentProductInfo && a.share(a.currentProductInfo, a.currentIsBook)
        });
        $("#ruyitao-selector-prefix-buy-btn,#ruyitao-selector-prefix-photo-btn,#ruyitao-selector-prefix-title-btn,#ruyitao-selector-prefix-more-results-link").click(function () {
            da.sendLog("click_popup",
                $(this).attr("href"))
        });
        $("#ruyitao-selector-prefix-comparation-prices").delegate("a", "click", function () {
            da.sendLog("click_popup", $(this).attr("href"))
        });
        $("#ruyitao-selector-prefix-toolbar-ivy-want-btn").click(function () {
            a.wantThis(a.currentProductLink)
        });
        $("#ruyitao-selector-prefix-cancel-from-want").click(function () {
            a.unwantThis(a.currentProductLink)
        });
        $("#ruyitao-selector-prefix-toolbar-ivy-wants-text").click(function () {
            a.openUserHomepage(a.currentItemId)
        });
        $("#ruyitao-selector-prefix-tag-list").click(function () {
            var a =
                $(this).attr("data-href");
            da.openTab(a, !0)
        })
    }, fetchDataAndRender: function (a, b) {
        var c = this, d = new ruyi.data.ExtDS({conf: {data: {topic: "get_price_comparation_and_history_prices_data", link: a}, success: function (d) {
            var h = d.Item, m = d.Product;
            d && "object" == typeof h ? (e.load(), za.show("detail"), c.currentProductInfo = h, c.currentIsBook = m && m.Book, c.renderBaseInfo(h, !b), c.renderPriceComparation(d.Items, m), c.priceCurve.render(h.Prices, h)) : b ? (da.sendLog("click_popup", a), da.openTab(a, !0)) : (ya.console.debug("Not fetched current product data."),
                Ua.showSearchView())
        }}}), e = new ruyi.data.ExtDS({conf: {data: {topic: "get_tags_by_product_link", link: a}, success: function (a) {
            a && a.tags && 2 < a.tags.length ? c.renderTags(a) : c.hideTagsWrapper()
        }}});
        this.currentProductLink = a;
        this.getWantCounts(a, b);
        d.load()
    }, renderTags: function (a) {
        var b = a.tags, a = a.item_id, c = "";
        if (2 < b.length) {
            for (var d = 0; d < b.length; d++)c += "<li>" + b[d] + "</li>";
            $("#ruyitao-selector-prefix-tag-list").html(c);
            b = "http://ruyi.taobao.com/item/" + encodeURIComponent(a) + "?utm_medium=ext&utm_source=ruyi#similar";
            $("#ruyitao-selector-prefix-tag-list").attr("data-href", b);
            $("#ruyitao-selector-prefix-search-tags-in-etao").attr("href", b);
            this.showTagsWrapper()
        }
    }, showTagsWrapper: function () {
        $("#ruyitao-selector-prefix-tags-wrapper").show()
    }, hideTagsWrapper: function () {
        $("#ruyitao-selector-prefix-tags-wrapper").hide()
    }, isSameProduct: function (a) {
        return a && a.Epid && 14 < a.Epid.length && 3 <= a.Epid.charAt(0)
    }, renderBaseInfo: function (a, b) {
        var c = a.LargeImageUrl, d = a.Title, e = a.Price, f = a.ClickUrl || a.DetailPageURL;
        $("#ruyitao-selector-prefix-title-btn").text(d).attr("title",
            d);
        b || ($("#ruyitao-selector-prefix-shopname").text(a.ShopName + "\uff1a"), $("#ruyitao-selector-prefix-price").html(e));
        $("#ruyitao-selector-prefix-photo img").attr("src", c);
        $("#ruyitao-selector-prefix-buy-btn,#ruyitao-selector-prefix-photo-btn,#ruyitao-selector-prefix-title-btn").attr("href", f)
    }, MAX_PRICE_COMPARATION_COMMODITY_NUM: 4, renderPriceComparation: function (a, b) {
        var c = $("#ruyitao-selector-prefix-comparation-prices").hide(), d = $("#ruyitao-selector-prefix-no-price-comparation-info").hide(), e = $("#ruyitao-selector-prefix-other-links").hide();
        if (a && a.length && !this.isSameProduct(b)) {
            for (var d = a.length < this.MAX_PRICE_COMPARATION_COMMODITY_NUM ? a.length : this.MAX_PRICE_COMPARATION_COMMODITY_NUM, f, h = "", m, v = 0; v < d; v++)f = a[v], m = f.ClickUrl || DetailPageURL, h += '<li><a href="' + m + '" target="_blank"><img width="16" height="16" class="ruyitao-selector-prefix-merchant-logo" title="' + f.SiteName + '" src="' + f.SiteLogo + '" /><span class="ruyitao-selector-prefix-comparation-price">' + f.Price + "</span></a></li>";
            c.show().html(h);
            e.show();
            $("#ruyitao-selector-prefix-more-results-link").attr("href",
                b.DetailPageURL)
        } else d.show()
    }, getWantCounts: function (a) {
        var b = this;
        (new ruyi.data.ExtDS({conf: {data: {topic: "item_like_count", url: a}, success: function (a) {
            if (a.error)$("#ruyitao-selector-prefix-toolbar").addClass("ruyitao-selector-prefix-fetch-like-count-error"); else {
                $("#ruyitao-selector-prefix-toolbar").removeClass("ruyitao-selector-prefix-fetch-like-count-error");
                var d = a.wanted, e = a.users;
                b.currentItemId = a.item_id;
                b.updateWantsStatus(e, d)
            }
        }}})).load()
    }, wantThis: function (a) {
        var b = this;
        (new ruyi.data.ExtDS({conf: {data: {topic: "item_like_add",
            url: a}, success: function (a) {
            a && (a.success && "undefined" != typeof a.users) && (b.updateWantsStatus(a.users, !0), a.wanted = !0, b.sendWantsStatusUpdateMessage(a))
        }}})).load()
    }, unwantThis: function (a) {
        var b = this;
        (new ruyi.data.ExtDS({conf: {data: {topic: "item_like_delete", url: a}, success: function (a) {
            a && a.success && (b.updateWantsStatus(a.users, !1), a.wanted = !1, b.sendWantsStatusUpdateMessage(a))
        }}})).load()
    }, sendWantsStatusUpdateMessage: function (a) {
        (new ruyi.data.ExtDS({conf: {data: {topic: "update_wants_status", status: a}}})).load()
    },
        updateWantsStatus: function (a, b) {
            var c = "";
            $("#ruyitao-selector-prefix-toolbar-ivy-want-btn").removeClass("ruyitao-selector-prefix-bought");
            var d = "hide", a = parseInt(a);
            if (isNaN(a) || 0 > a)a = 0;
            0 == a ? c = '\u6210\u4e3a\u7b2c <a class="ruyitao-selector-prefix-ivy-wants-count" target="_blank">1 </a>\u4e2a\u60f3\u4e70\u7684\u4eba' : b ? (c = 1 == a ? '\u4f60\u662f\u7b2c<a class="ruyitao-selector-prefix-ivy-wants-count" target="_blank"> 1 </a>\u4e2a\u60f3\u4e70\u7684\u4eba' : '\u4f60\u4e0e\u5176\u4ed6<a class="ruyitao-selector-prefix-ivy-wants-count" target="_blank">' +
                (a - 1) + " </a>\u4eba\u90fd\u60f3\u4e70", $("#ruyitao-selector-prefix-toolbar-ivy-want-btn").addClass("ruyitao-selector-prefix-bought"), d = "show") : c = '\u5df2\u6709<a class="ruyitao-selector-prefix-ivy-wants-count" target="_blank">' + a + " </a>\u4eba\u60f3\u4e70";
            $("#ruyitao-selector-prefix-toolbar-ivy-wants-text").html(c);
            $("#ruyitao-selector-prefix-added-to-want-tip")[d]()
        }, openUserHomepage: function (a) {
            (new ruyi.data.ExtDS({conf: {data: {topic: "item_like_open_homepage", item_id: a}}})).load()
        }, share: function (a, b) {
            var c = b ? ["\u300a", "\u300b"] : ["\u201c", "\u201d"], c = {url: a.ClickUrl || a.DetailPageURL, title: "\u64e6\uff01\u5982\u610f\u6dd8\u771f\u662f\u8d2d\u7269\u795e\u5668\uff01\u770b\u5230\u5546\u54c1\u5c31\u80fd\u6bd4\u4ef7\uff0c\u4e0d\u6bd4\u4e0d\u77e5\u9053\uff0c\u4e00\u6bd4\u7701\u4e0d\u5c11\uff01\u521a\u7528@\u5982\u610f\u6dd8 \u67e5\u4e86" + c[0] + a.Title + c[1] + "\uff0c\uff08\u5b98\u65b9\u7f51\u7ad9\uff1ahttp://t.cn/aeDbuE\uff09", pic: a.LargeImageUrl}, d = encodeURIComponent, e = window.screen, f = [], h = "http://v.t.sina.com.cn/share/share.php?";
            for (name in c)c.hasOwnProperty(name) && f.push(name + "=" + d(c[name]));
            f.push("appkey=1965387856");
            h += f.join("&");
            window.open(h, "mb", ["toolbar=0,status=0,resizable=1,width=620,height=450,left=", (e.width - 620) / 2, ",top=", (e.height - 450) / 2].join(""))
        }}), hc = new (ruyi.object.createClass({init: function () {
        this.bindEvents()
    }, bindEvents: function () {
        var a = null, b = this;
        $("#ruyitao-selector-prefix-price-curve").bind("plothover", function (c, d, e) {
            e ? a != e.dataIndex && (a = e.dataIndex, b.hideTip(), c = new Date(e.datapoint[0]), c =
                c.getFullYear() + "/" + (c.getMonth() + 1) + "/" + c.getDate(), d = e.datapoint[1].toFixed(2), d = "\uffe5 " + da.addThousandSeparator(d), b.showTip(c, d, e.pageX, e.pageY)) : (b.hideTip(), a = null)
        })
    }, filterPriceHistoryData: function (a, b) {
        var c = 0;
        if (a) {
            for (var d = 0, e = 0, f = a.length; e < f; e++)a[e][0] *= 1E3, a[e][0] > d && (d = a[e][0]), null == a[e][1] && (a[e][1] = ea, c++);
            c = new Date;
            (f = b || "") || (f = a[a.length - 1][1]);
            d = new Date(parseInt(d));
            f && (c.getMonth() == d.getMonth() ? c.getDate() != d.getDate() && (a[e] = [c.getTime(), f]) : a[e] = [c.getTime(), f])
        }
        return a
    },
        render: function (a, b) {
            var c = b.Price.replace(/\uffe5|\s/g, ""), c = parseInt(c);
            if ((a = this.filterPriceHistoryData(a, c)) && 0 < a.length) {
                var d = $("#ruyitao-selector-prefix-price-curve"), e = this;
                try {
                    this.drawPlot(a, d)
                } catch (f) {
                    ya.console.debug("draw plot error: " + f.message), setTimeout(function () {
                        try {
                            e.drawPlot(a, d)
                        } catch (b) {
                            ya.console.debug("draw plot error again: " + b.message)
                        }
                    }, 0)
                }
                var c = this.getPrice(a, "max"), h = this.getPrice(a, "min");
                this.setPrices(h, c, b.nid)
            }
        }, getPrice: function (a, b) {
            for (var c = [], d = 0, e = a.length; d <
                e; d++)a[d][1] && c.push(a[d][1]);
            return Math[b].apply(null, c)
        }, setPrices: function (a, b, c) {
            a = this.getPriceInfoTemplate(this.formatNum(a), this.formatNum(b), c);
            $("#ruyitao-selector-prefix-pc-price-info").html(a)
        }, drawPlot: function (a, b) {
            var c = new Date, d = c.getTime();
            c.setMonth(c.getMonth() - 3);
            c.setDate(c.getDate() - 1);
            var c = c.getTime(), e = this.getPrice(a, "max"), f = this.getPrice(a, "min"), h;
            1 > e - f && (h = 2);
            $.plot(b, [a], {series: {lines: {show: !0, lineWidth: 1, steps: !0}, points: {show: !0, radius: 2, lineWidth: 0, fillColor: "#faaa2b"},
                color: "#fab13c", shadowSize: 1}, grid: {hoverable: !0, backgroundColor: "#fff", borderWidth: 1, borderColor: "#d1e3ea", tickColor: "#d1e3ea", labelMargin: 8}, xaxis: {min: c, max: d, mode: "time", timeformat: "%0m/%0d", tickSize: [15, "day"]}, yaxis: {minTickSize: 5, tickDecimals: h, tickFormatter: this.formatNum}})
        }, showTip: function (a, b, c, d) {
            var e = this.getPriceCurveTipTemplate();
            $(document.body).append(e);
            b = "\u4ef7\u683c\uff1a" + b;
            $("#ruyitao-selector-prefix-current-point-date").text("\u65e5\u671f\uff1a" + a);
            $("#ruyitao-selector-prefix-current-point-price").text(b);
            var a = $("#ruyitao-selector-prefix-price-curve-tip"), b = a.outerWidth(), e = a.outerHeight(), f = c - b / 2, h = (b - 8) / 2, m = document.documentElement.clientWidth;
            f + b > m && (f = m - b, h = b - (m - c) - 4);
            a.css({top: d - e - 15, left: f}).addClass("ruyitao-selector-prefix-tip-visible");
            $("#ruyitao-selector-prefix-price-curve-arrow-down").css("left", h)
        }, hideTip: function () {
            $("#ruyitao-selector-prefix-price-curve-tip").remove()
        }, formatNum: function (a) {
            a = Math.round(100 * a) / 100;
            return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }, getPriceCurveTipTemplate: function () {
            return'<div id="ruyitao-selector-prefix-price-curve-tip" ><div id="ruyitao-selector-prefix-current-point-date"></div><div id="ruyitao-selector-prefix-current-point-price"></div><div id="ruyitao-selector-prefix-price-curve-arrow-down"></div></div>'
        },
        getPriceInfoTemplate: function (a, b) {
            return'<span>\u6700\u9ad8\u4ef7\uff1a<span class="ruyitao-selector-prefix-highest-price">\uffe5' + b + '</span></span><span>\u6700\u4f4e\u4ef7\uff1a<span class="ruyitao-selector-prefix-lowest-price">\uffe5' + a + "</span></span>"
        }})), zb = new gc(hc), za = ruyi.popup.global.globalTab, Aa = new ruyi.tab.TabItem({name: "detail", dom: "#ruyitao-selector-prefix-detail-wrapper"});
    Aa.bind("showHandle", function () {
        $("#nav-detail").addClass("active").removeClass("hidden")
    });
    za.bind("changeHandle",
        function (a, b) {
            if (b && b.name == Aa.name) {
                var c = $("#nav-detail");
                c.hasClass("active") ? c.removeClass("active") : c.addClass("hidden")
            }
        });
    za.addItem(Aa);
    $("#nav-detail").click(function () {
        za.show(Aa.name)
    });
    var Ua = new ruyi.module.Module({name: "detail", showSearchView: function () {
        this.broadcast("showSearchView")
    }});
    Ua.bind("searchResult:selectProduct", function (a, b) {
        zb.fetchDataAndRender(b.DetailPageURL, !0)
    });
    Ua.bind("status:showDetail", function (a, b) {
        zb.fetchDataAndRender(b)
    });
    ruyi.object.createPackage("ruyi.popup.status");
    var ic = ruyi.popup.global.globalTab, Ab = ruyi.popup.global.historyAndResultTab, Ba = new (ruyi.object.createClass(ruyi.job.JobManager))({}), Ca = new ruyi.job.Job({name: "searchResult", getStatus: function () {
        return{name: "searchResult"}
    }});
    Ca.bind("executeHandle", function (a, b) {
        ma.search(b)
    });
    Ba.add(Ca);
    var Va = new ruyi.job.Job({name: "searchHistory", getStatus: function () {
        return{name: "searchHistory"}
    }});
    Va.bind("executeHandle", function () {
        Ab.show("searchHistory")
    });
    Ba.add(Va);
    var Bb = new (ruyi.object.createClass(ruyi.data.ExtDS,
        {add: function (a) {
            this.conf.data.status = a;
            this.load()
        }}))({conf: {data: {topic: "add_popup_status"}, success: function () {
    }}}), sa = new ruyi.data.ExtDS({conf: {data: {topic: "get_popup_status"}, success: function (a) {
        ic.show("searchView");
        a && 0 < a.length && a[0].name && a[0].data ? Ba.execute(a[0].name, a[0].data) : Ba.execute("searchHistory")
    }}}), Da = new (ruyi.object.createClass(ruyi.data.ExtDS, {setUrl: function (a) {
        this.conf.data.url = a
    }, setTitle: function (a) {
        this.conf.data.title = a
    }}))({conf: {data: {topic: "is_detail_site"}, success: function (a) {
        "undefined" != typeof a.locale ? ma.showDetail(Da.conf.data.url) : sa.load()
    }}});
    $("#ruyitao-selector-prefix-ivy-login-button").click(function () {
        (new ruyi.data.ExtDS({conf: {data: {topic: "login", redirect: !0}, success: function () {
            window.location.reload()
        }}})).load()
    });
    Ab.bind("showHandle", function (a, b, c, d) {
        var e;
        switch (d.name) {
            case "searchHistory":
                e = Va.getStatus();
                break;
            case "searchResult":
                e = Ca.getStatus()
        }
        Bb.add(e)
    });
    var ma = new ruyi.module.Module({name: "status", BROADCAST_TYPE: {SEARCH: "search", SHOW_DETAIL: "showDetail"},
        search: function (a) {
            this.broadcast(this.BROADCAST_TYPE.SEARCH, a)
        }, showDetail: function (a, b) {
            this.broadcast(this.BROADCAST_TYPE.SHOW_DETAIL, a, b)
        }});
    ma.bind("searchResult:showProductList", function (a, b) {
        var c = Ca.getStatus();
        c.data = b;
        Bb.add(c)
    });
    ma.bind("i18n:ready", function (a, b) {
        (new ruyi.data.ExtDS({conf: {data: {topic: "is_loged_in_ivy"}, success: function (a) {
            var d = a && a.user_id && a.nick ? a.nick : null;
            d ? ($(".ruyitao-selector-prefix-unlogedin-view").hide(), $(".ruyitao-selector-prefix-logedin-view").show(), $("#ruyitao-selector-prefix-toolbar-username").text(d)) :
                ($(".ruyitao-selector-prefix-unlogedin-view").show(), $(".ruyitao-selector-prefix-logedin-view").hide(), $("#ruyitao-selector-prefix-toolbar-username").text(""));
            a && (a.user_id && a.nick) && ("zh" == b ? ($("#ruyitao-selector-prefix-navbar").show(), (new ruyi.data.ExtDS({conf: {data: {topic: "get_current_tab"}, success: function (a) {
                a ? (Da.setUrl(a.url), Da.setTitle(a.title), Da.load()) : sa.load()
            }}})).load()) : sa.load())
        }}})).load()
    });
    ma.bind("detail:showSearchView", function () {
        sa.load()
    });
    ma.bind("searchView:show", function (a, b) {
        1 == b && sa.load()
    });
    ruyi.object.createPackage("ruyi.popup.i18n");
    var na = new (ruyi.object.createClass({messages: null, locale: "en", init: function (a) {
        $.extend(this, a)
    }, setLocale: function (a) {
        a in this.messages && (this.locale = a)
    }, getLocale: function () {
        return this.locale
    }, getMessages: function (a) {
        return this.messages[a || this.locale]
    }, getMessage: function (a) {
        var b = this.getMessages();
        return b && a in b ? b[a] : ""
    }, render: function (a) {
        var b = this;
        a && this.setLocale(a);
        $("[rel^=i18n],[i18n]").each(function () {
            var a, d;
            if (a =
                ($(this).attr("rel") || "").match(/i18n\[(.*?)\]/)) {
                var e = $(this);
                e.is("input") ? e.val(b.getMessage(a[1])) : e.html(b.getMessage(a[1]))
            }
            (d = $(this).attr("i18n")) && $.each(d.split(","), $.proxy(function (a, c) {
                var d = c.split(":");
                2 == d.length && (d[1] = b.getMessage(d[1])) && this.attr.apply(this, d)
            }, $(this)))
        })
    }}))({messages: {zh: {search_history: "\u641c\u7d22\u5386\u53f2", search_history_clear: "\u6e05\u9664", search_history_clear_title: "\u6e05\u9664\u5386\u53f2", view_history: "\u6d4f\u89c8\u8fc7\u7684\u5546\u54c1", input_message: "\u8bf7\u8f93\u5165\u4f60\u60f3\u641c\u7d22\u7684\u5546\u54c1",
        search_btn: "", no_results: "\u62b1\u6b49\uff0c\u672a\u627e\u5230\u7ed3\u679c\uff01", popular_search: "\u70ed\u95e8\u641c\u7d22", popular_search_data: [
            {keyword: "\u6570\u7801\u76f8\u673a", img: "http://img04.taobaocdn.com/bao/uploaded/i8/T1RGmQXmVeXXafPp_X_113847.jpg_b.jpg", se: "etao"},
            {keyword: "\u4e09\u661f\u624b\u673a", img: "http://img01.taobaocdn.com/bao/uploaded/i5/T1ZGR_XcxfXXbio5rX_115516.jpg_b.jpg", se: "etao"},
            {keyword: "\u5185\u8863", img: "http://img04.taobaocdn.com/bao/uploaded/i4/T1DyOiXepmXXcFc.g8_071808.jpg_b.jpg",
                se: "etao"},
            {keyword: "\u5e73\u677f\u7535\u8111", img: "http://img01.taobaocdn.com/bao/uploaded/i1/T1KSnIXmhgXXXfQJc7_064152.jpg_b.jpg", se: "etao"},
            {keyword: "\u53d6\u6696\u5668", img: "http://img03.taobaocdn.com/bao/uploaded/i3/T1CPCsXnpLXXbHVfjX_114819.jpg_b.jpg", se: "etao"},
            {keyword: "\u83ab\u8a00", img: "http://img03.taobaocdn.com/bao/uploaded/i3/T1bHvUXehfXXXBfTPa_092432.jpg_b.jpg", se: "etao"},
            {keyword: "\u62a4\u624b\u971c", img: "http://img01.taobaocdn.com/bao/uploaded/i1/T1q9YYXoBdXXXI6A3__110256.jpg_b.jpg",
                se: "etao"},
            {keyword: "\u7535\u89c6", img: "http://img03.taobaocdn.com/bao/uploaded/i3/T1oJreXgJfXXbgEoEZ_034019.jpg_b.jpg", se: "etao"},
            {keyword: "\u52a0\u6e7f\u5668", img: "http://img02.taobaocdn.com/bao/uploaded/i2/T13_5vXnXzXXbB1BI3_051105.jpg_b.jpg", se: "etao"},
            {keyword: "zippo", img: "http://img02.taobaocdn.com/bao/uploaded/i2/T1CteQXahcXXcO7ck1_040430.jpg_b.jpg", se: "etao"}
        ]}, en: {search_history: "Search History", search_history_clear: "Clear", search_history_clear_title: "Clear history", input_message: "Please enter the product name",
        search_btn: "Search", no_results: "Oops, no result!", popular_search: "Hot keywords", popular_search_data: [
            {keyword: "Camera", img: "http://ecx.images-amazon.com/images/I/41gEcoG2qJL._AA115_.jpg", se: "amazon"},
            {keyword: "GPS", img: "http://ecx.images-amazon.com/images/I/41QNJqpZ6PL._AA115_.jpg", se: "amazon"},
            {keyword: "LCD TV", img: "http://ecx.images-amazon.com/images/I/41q9kKNWVFL._AA115_.jpg", se: "amazon"},
            {keyword: "Laptop", img: "http://ecx.images-amazon.com/images/I/41Y4QtahKcL._AA115_.jpg", se: "amazon"},
            {keyword: "Oral-B",
                img: "http://ecx.images-amazon.com/images/I/21LqYBMwDGL._AA115_.jpg", se: "amazon"},
            {keyword: "Xbox 360", img: "http://ecx.images-amazon.com/images/I/411d9xAlGRL._AA115_.jpg", se: "amazon"},
            {keyword: "Mouse", img: "http://ecx.images-amazon.com/images/I/415joSK9hkL._AA115_.jpg", se: "amazon"},
            {keyword: "Razor", img: "http://ecx.images-amazon.com/images/I/41evRiKZvTL._AA115_.jpg", se: "amazon"},
            {keyword: "Perfume", img: "http://ecx.images-amazon.com/images/I/51kavLfdFVL._AA115_.jpg", se: "amazon"},
            {keyword: "Smarthone", img: "http://ecx.images-amazon.com/images/I/51JOaE64EFL._AA115_.jpg",
                se: "amazon"}
        ]}, uk: {search_history: "Search History en_gb", search_history_clear: "Clear", search_history_clear_title: "Clear history", view_history: "Products", input_message: "Please enter the product name", search_btn: "Search", no_results: "Oops, no result!", popular_search: "Hot keywords", popular_search_data: [
        {keyword: "Camera", img: "http://ecx.images-amazon.com/images/I/41gEcoG2qJL._AA115_.jpg", se: "amazonuk"},
        {keyword: "GPS", img: "http://ecx.images-amazon.com/images/I/41QNJqpZ6PL._AA115_.jpg", se: "amazonuk"},
        {keyword: "LCD TV",
            img: "http://ecx.images-amazon.com/images/I/41q9kKNWVFL._AA115_.jpg", se: "amazonuk"},
        {keyword: "Laptop", img: "http://ecx.images-amazon.com/images/I/41Y4QtahKcL._AA115_.jpg", se: "amazonuk"},
        {keyword: "Oral-B", img: "http://ecx.images-amazon.com/images/I/21LqYBMwDGL._AA115_.jpg", se: "amazonuk"},
        {keyword: "Xbox 360", img: "http://ecx.images-amazon.com/images/I/411d9xAlGRL._AA115_.jpg", se: "amazonuk"},
        {keyword: "Mouse", img: "http://ecx.images-amazon.com/images/I/415joSK9hkL._AA115_.jpg", se: "amazonuk"},
        {keyword: "Razor",
            img: "http://ecx.images-amazon.com/images/I/41evRiKZvTL._AA115_.jpg", se: "amazonuk"},
        {keyword: "Perfume", img: "http://ecx.images-amazon.com/images/I/51kavLfdFVL._AA115_.jpg", se: "amazonuk"},
        {keyword: "Smarthone", img: "http://ecx.images-amazon.com/images/I/51JOaE64EFL._AA115_.jpg", se: "amazonuk"}
    ]}, fr: {search_history: "Mots-cl\u00e9s", search_history_clear: "Effacer", search_history_clear_title: "Effacer l'historique", view_history: "Produits", input_message: "S'il vous pla\u00eet entrez le nom du produit", search_btn: "Go",
        no_results: "Oups, pas de r\u00e9sultat!", popular_search: "Hot mots-cl\u00e9s", popular_search_data: [
            {keyword: "Appareils Photo", img: "http://ecx.images-amazon.com/images/I/41gEcoG2qJL._AA115_.jpg", se: "amazonfr"},
            {keyword: "GPS", img: "http://ecx.images-amazon.com/images/I/41QNJqpZ6PL._AA115_.jpg", se: "amazonfr"},
            {keyword: "TV", img: "http://ecx.images-amazon.com/images/I/41q9kKNWVFL._AA115_.jpg", se: "amazonfr"},
            {keyword: "Smartphone", img: "http://ecx.images-amazon.com/images/I/51JOaE64EFL._AA115_.jpg", se: "amazonfr"},
            {keyword: "Oral-B", img: "http://ecx.images-amazon.com/images/I/21LqYBMwDGL._AA115_.jpg", se: "amazonfr"},
            {keyword: "Xbox 360", img: "http://ecx.images-amazon.com/images/I/411d9xAlGRL._AA115_.jpg", se: "amazonfr"},
            {keyword: "Souris", img: "http://ecx.images-amazon.com/images/I/415joSK9hkL._AA115_.jpg", se: "amazonfr"},
            {keyword: "Rasoir", img: "http://ecx.images-amazon.com/images/I/41evRiKZvTL._AA115_.jpg", se: "amazonfr"},
            {keyword: "Parfum", img: "http://ecx.images-amazon.com/images/I/51kavLfdFVL._AA115_.jpg", se: "amazonfr"},
            {keyword: "iPod", img: "http://ecx.images-amazon.com/images/I/51fsAvTyvXL._AA115_.jpg", se: "amazonfr"}
        ]}, de: {search_history: "Schl\u00fcsselw\u00f6rter", search_history_clear: "L\u00f6schen", search_history_clear_title: "Verlauf l\u00f6schen", view_history: "Produkte", input_message: "Bitte geben Sie den Produktnamen", search_btn: "Lot", no_results: "Oops, kein Ergebnis!", popular_search: "Hot Stichworte", popular_search_data: [
        {keyword: "Kamera", img: "http://ecx.images-amazon.com/images/I/41gEcoG2qJL._AA115_.jpg", se: "amazonde"},
        {keyword: "GPS", img: "http://ecx.images-amazon.com/images/I/41QNJqpZ6PL._AA115_.jpg", se: "amazonde"},
        {keyword: "Notebook", img: "http://ecx.images-amazon.com/images/I/41KHT2W6raL._AA115.jpg", se: "amazonde"},
        {keyword: "TV", img: "http://ecx.images-amazon.com/images/I/515N7H5Q6nL._AA115_.jpg", se: "amazonde"},
        {keyword: "Oral-B", img: "http://ecx.images-amazon.com/images/I/21LqYBMwDGL._AA115_.jpg", se: "amazonde"},
        {keyword: "Xbox 360", img: "http://ecx.images-amazon.com/images/I/411d9xAlGRL._AA115_.jpg", se: "amazonde"},
        {keyword: "Maus", img: "http://ecx.images-amazon.com/images/I/415joSK9hkL._AA115_.jpg", se: "amazonde"},
        {keyword: "Rasierer", img: "http://ecx.images-amazon.com/images/I/41evRiKZvTL._AA115_.jpg", se: "amazonde"},
        {keyword: "Parf\u00fcm", img: "http://ecx.images-amazon.com/images/I/51kavLfdFVL._AA115_.jpg", se: "amazonde"},
        {keyword: "Smartphone", img: "http://ecx.images-amazon.com/images/I/51JOaE64EFL._AA115_.jpg", se: "amazonde"}
    ]}}}), jc = new ruyi.module.Module({name: "i18n", BROADCAST_TYPE: {READY: "ready"}, ready: function () {
        this.broadcast(this.BROADCAST_TYPE.READY,
            na.getLocale(), na.getMessages())
    }});
    (new ruyi.data.ExtDS({conf: {data: {topic: "get_locale"}, success: function (a) {
        na.render(a || "zh");
        "zh" != na.getLocale() && $("#ruyitao-selector-prefix-toolbar").removeClass("ruyitao-selector-prefix-toolbar-i18n-zh").addClass("ruyitao-selector-prefix-toolbar-i18n-" + na.getLocale());
        jc.ready()
    }}})).load()
})(window, exports);
