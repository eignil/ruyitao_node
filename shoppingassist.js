if (!exports) var exports = {};
(function(window_para, export_para, ca) {
	var export_para_u = export_para;
	export_para_u || (export_para_u = {});
	var export_para_ob = export_para_u;
	export_para_ob.browser || (export_para_ob.browser = {});
	export_para_ob.browser.extension = {
		sendRequest: function(a, b) {
			"undefined" == typeof b && (b = function() {});
			chrome.extension.sendRequest(a, b)
		},
		onRequest: {
			addListener: function(a) {
				chrome.extension.onRequest.addListener(a)
			},
			removeListener: function(a) {
				chrome.extension.onRequest.removeListener(a)
			}
		},
		getURL: function(a) {
			return chrome.extension.getURL(a || "")
		}
	};
	export_para.console = {
		debug: function(a) {
			export_para.browser.extension.sendRequest({
				topic: "log_message",
				message: a
			})
		}
	};
	var jquery = jQuery;
	jquery.color = {};
	jquery.color.make = function(a, b, c, d) {
		var e = {};
		e.r = a || 0;
		e.g = b || 0;
		e.b = c || 0;
		e.a = null != d ? d : 1;
		e.add = function(a, b) {
			for (var c = 0; c < a.length; ++c) e[a.charAt(c)] += b;
			return e.normalize()
		};
		e.scale = function(a, b) {
			for (var c = 0; c < a.length; ++c) e[a.charAt(c)] *= b;
			return e.normalize()
		};
		e.toString = function() {
			return 1 <= e.a ? "rgb(" + [e.r, e.g, e.b].join() + ")" : "rgba(" + [e.r, e.g, e.b, e.a].join() + ")"
		};
		e.normalize = function() {
			function a(b, c, d) {
				return c < b ? b : c > d ? d : c
			}
			e.r = a(0, parseInt(e.r), 255);
			e.g = a(0, parseInt(e.g),
				255);
			e.b = a(0, parseInt(e.b), 255);
			e.a = a(0, e.a, 1);
			return e
		};
		e.clone = function() {
			return jquery.color.make(e.r, e.b, e.g, e.a)
		};
		return e.normalize()
	};
	jquery.color.extract = function(a, b) {
		var c;
		do {
			c = a.css(b).toLowerCase();
			if ("" != c && "transparent" != c) break;
			a = a.parent()
		} while (!jquery.nodeName(a.get(0), "body"));
		"rgba(0, 0, 0, 0)" == c && (c = "transparent");
		return jquery.color.parse(c)
	};
	jquery.color.parse = function(a) {
		var b, c = jquery.color.make;
		if (b = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) return c(parseInt(b[1],
			10), parseInt(b[2], 10), parseInt(b[3], 10));
		if (b = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a)) return c(parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3], 10), parseFloat(b[4]));
		if (b = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a)) return c(2.55 * parseFloat(b[1]), 2.55 * parseFloat(b[2]), 2.55 * parseFloat(b[3]));
		if (b = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a)) return c(2.55 *
			parseFloat(b[1]), 2.55 * parseFloat(b[2]), 2.55 * parseFloat(b[3]), parseFloat(b[4]));
		if (b = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) return c(parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16));
		if (b = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a)) return c(parseInt(b[1] + b[1], 16), parseInt(b[2] + b[2], 16), parseInt(b[3] + b[3], 16));
		a = jquery.trim(a).toLowerCase();
		if ("transparent" == a) return c(255, 255, 255, 0);
		b = jc[a] || [0, 0, 0];
		return c(b[0], b[1], b[2])
	};
	var jc = {
		aqua: [0, 255, 255],
		azure: [240, 255, 255],
		beige: [245, 245, 220],
		black: [0, 0, 0],
		blue: [0, 0, 255],
		brown: [165, 42, 42],
		cyan: [0, 255, 255],
		darkblue: [0, 0, 139],
		darkcyan: [0, 139, 139],
		darkgrey: [169, 169, 169],
		darkgreen: [0, 100, 0],
		darkkhaki: [189, 183, 107],
		darkmagenta: [139, 0, 139],
		darkolivegreen: [85, 107, 47],
		darkorange: [255, 140, 0],
		darkorchid: [153, 50, 204],
		darkred: [139, 0, 0],
		darksalmon: [233, 150, 122],
		darkviolet: [148, 0, 211],
		fuchsia: [255, 0, 255],
		gold: [255, 215, 0],
		green: [0, 128, 0],
		indigo: [75, 0, 130],
		khaki: [240, 230, 140],
		lightblue: [173, 216, 230],
		lightcyan: [224, 255, 255],
		lightgreen: [144,
			238, 144
		],
		lightgrey: [211, 211, 211],
		lightpink: [255, 182, 193],
		lightyellow: [255, 255, 224],
		lime: [0, 255, 0],
		magenta: [255, 0, 255],
		maroon: [128, 0, 0],
		navy: [0, 0, 128],
		olive: [128, 128, 0],
		orange: [255, 165, 0],
		pink: [255, 192, 203],
		purple: [128, 0, 128],
		violet: [128, 0, 128],
		red: [255, 0, 0],
		silver: [192, 192, 192],
		white: [255, 255, 255],
		yellow: [255, 255, 0]
	}, jquery_b = jQuery,
		kc = function(a, b, c, d) {
			function e(a, b) {
				for (var b = [P].concat(b), c = 0; c < a.length; ++c) a[c].apply(this, b)
			}

			function f(a) {
				for (var b = [], c = 0; c < a.length; ++c) {
					var d = jquery_b.extend(!0, {}, n.series);
					null != a[c].data ? (d.data = a[c].data, delete a[c].data, jquery_b.extend(!0, d, a[c]), a[c].data = d.data) : d.data = a[c];
					b.push(d)
				}
				J = b;
				b = J.length;
				c = [];
				d = [];
				for (a = 0; a < J.length; ++a) {
					var f = J[a].color;
					null != f && (--b, "number" == typeof f ? d.push(f) : c.push(jquery_b.color.parse(J[a].color)))
				}
				for (a = 0; a < d.length; ++a) b = Math.max(b, d[a] + 1);
				c = [];
				for (a = d = 0; c.length < b;) f = n.colors.length == a ? jquery_b.color.make(100, 100, 100) : jquery_b.color.parse(n.colors[a]), f.scale("rgb", 1 + 0.2 * (1 == d % 2 ? -1 : 1) * Math.ceil(d / 2)), c.push(f), ++a, a >= n.colors.length && (a = 0, ++d);
				for (a = b =
					0; a < J.length; ++a) {
					d = J[a];
					null == d.color ? (d.color = c[b].toString(), ++b) : "number" == typeof d.color && (d.color = c[d.color].toString());
					if (null == d.lines.show) {
						var v, f = !0;
						for (v in d)
							if (d[v] && d[v].show) {
								f = !1;
								break
							}
						f && (d.lines.show = !0)
					}
					d.xaxis = j(G, h(d, "x"));
					d.yaxis = j(M, h(d, "y"))
				}
				v = function(a, b, c) {
					b < a.datamin && b != -g && (a.datamin = b);
					c > a.datamax && c != g && (a.datamax = c)
				};
				var k = Number.POSITIVE_INFINITY,
					q = Number.NEGATIVE_INFINITY,
					g = Number.MAX_VALUE,
					B, na, L, pa, xa;
				jquery_b.each(l(), function(a, b) {
					b.datamin = k;
					b.datamax = q;
					b.used = !1
				});
				for (a = 0; a < J.length; ++a) b = J[a], b.datapoints = {
					points: []
				}, e(V.processRawData, [b, b.data, b.datapoints]);
				for (a = 0; a < J.length; ++a) {
					var b = J[a],
						Ba = b.data,
						C = b.datapoints.format;
					if (!C) {
						C = [];
						C.push({
							x: !0,
							number: !0,
							required: !0
						});
						C.push({
							y: !0,
							number: !0,
							required: !0
						});
						if (b.bars.show || b.lines.show && b.lines.fill) C.push({
							y: !0,
							number: !0,
							required: !1,
							defaultValue: 0
						}), b.bars.horizontal && (delete C[C.length - 1].y, C[C.length - 1].x = !0);
						b.datapoints.format = C
					}
					if (null == b.datapoints.pointsize) {
						b.datapoints.pointsize = C.length;
						na = b.datapoints.pointsize;
						f = b.datapoints.points;
						insertSteps = b.lines.show && b.lines.steps;
						b.xaxis.used = b.yaxis.used = !0;
						for (c = B = 0; c < Ba.length; ++c, B += na) {
							xa = Ba[c];
							var ya = null == xa;
							if (!ya)
								for (d = 0; d < na; ++d) {
									L = xa[d];
									if (pa = C[d]) pa.number && null != L && (L = +L, isNaN(L) ? L = null : Infinity == L ? L = g : -Infinity == L && (L = -g)), null == L && (pa.required && (ya = !0), null != pa.defaultValue && (L = pa.defaultValue));
									f[B + d] = L
								}
							if (ya)
								for (d = 0; d < na; ++d) L = f[B + d], null != L && (pa = C[d], pa.x && v(b.xaxis, L, L), pa.y && v(b.yaxis, L, L)), f[B + d] = null;
							else if (insertSteps && 0 < B && null != f[B - na] &&
								f[B - na] != f[B] && f[B - na + 1] != f[B + 1]) {
								for (d = 0; d < na; ++d) f[B + na + d] = f[B + d];
								f[B + 1] = f[B - na + 1];
								B += na
							}
						}
					}
				}
				for (a = 0; a < J.length; ++a) b = J[a], e(V.processDatapoints, [b, b.datapoints]);
				for (a = 0; a < J.length; ++a) {
					b = J[a];
					f = b.datapoints.points;
					na = b.datapoints.pointsize;
					xa = B = k;
					ya = Ba = q;
					for (c = 0; c < f.length; c += na)
						if (null != f[c])
							for (d = 0; d < na; ++d)
								if (L = f[c + d], (pa = C[d]) && !(L == g || L == -g)) pa.x && (L < B && (B = L), L > Ba && (Ba = L)), pa.y && (L < xa && (xa = L), L > ya && (ya = L));
					b.bars.show && (c = "left" == b.bars.align ? 0 : -b.bars.barWidth / 2, b.bars.horizontal ? (xa += c,
						ya += c + b.bars.barWidth) : (B += c, Ba += c + b.bars.barWidth));
					v(b.xaxis, B, Ba);
					v(b.yaxis, xa, ya)
				}
				jquery_b.each(l(), function(a, b) {
					b.datamin == k && (b.datamin = null);
					b.datamax == q && (b.datamax = null)
				})
			}

			function h(a, b) {
				var c = a[b + "axis"];
				"object" == typeof c && (c = c.n);
				"number" != typeof c && (c = 1);
				return c
			}

			function l() {
				return jquery_b.grep(G.concat(M), function(a) {
					return a
				})
			}

			function v(a) {
				var b = {}, c, d;
				for (c = 0; c < G.length; ++c)(d = G[c]) && d.used && (b["x" + d.n] = d.c2p(a.left));
				for (c = 0; c < M.length; ++c)(d = M[c]) && d.used && (b["y" + d.n] = d.c2p(a.top));
				b.x1 !==
					ca && (b.x = b.x1);
				b.y1 !== ca && (b.y = b.y1);
				return b
			}

			function j(a, b) {
				a[b - 1] || (a[b - 1] = {
					n: b,
					direction: a == G ? "x" : "y",
					options: jquery_b.extend(!0, {}, a == G ? n.xaxis : n.yaxis)
				});
				return a[b - 1]
			}

			function k(b, c) {
				var d = document.createElement("canvas");
				d.className = c;
				d.width = K;
				d.height = Q;
				b || jquery_b(d).css({
					position: "absolute",
					left: 0,
					top: 0
				});
				jquery_b(d).appendTo(a);
				d.getContext || (d = window.G_vmlCanvasManager.initElement(d));
				d.getContext("2d").save();
				return d
			}

			function g() {
				K = a.width();
				Q = a.height();
				if (0 >= K || 0 >= Q) throw "Invalid dimensions for plot, width = " +
					K + ", height = " + Q;
			}

			function m(a) {
				a.width != K && (a.width = K);
				a.height != Q && (a.height = Q);
				a = a.getContext("2d");
				a.restore();
				a.save()
			}

			function r(a) {
				var b = a.labelWidth,
					c = a.labelHeight,
					d = a.options.position,
					e = a.options.tickLength,
					f = n.grid.axisMargin,
					h = n.grid.labelMargin,
					l = "x" == a.direction ? G : M,
					v = jquery_b.grep(l, function(a) {
						return a && a.options.position == d && a.reserveSpace
					});
				jquery_b.inArray(a, v) == v.length - 1 && (f = 0);
				null == e && (e = "full");
				l = jquery_b.grep(l, function(a) {
					return a && a.reserveSpace
				});
				l = 0 == jquery_b.inArray(a, l);
				!l && "full" == e && (e = 5);
				isNaN(+e) ||
					(h += +e);
				"x" == a.direction ? (c += h, "bottom" == d ? (y.bottom += c + f, a.box = {
					top: Q - y.bottom,
					height: c
				}) : (a.box = {
					top: y.top + f,
					height: c
				}, y.top += c + f)) : (b += h, "left" == d ? (a.box = {
					left: y.left + f,
					width: b
				}, y.left += b + f) : (y.right += b + f, a.box = {
					left: K - y.right,
					width: b
				}));
				a.position = d;
				a.tickLength = e;
				a.box.padding = h;
				a.innermost = l
			}

			function t() {
				var b, c = l();
				jquery_b.each(c, function(a, b) {
					b.show = b.options.show;
					null == b.show && (b.show = b.used);
					b.reserveSpace = b.show || b.options.reserveSpace;
					var c = b.options,
						d = +(null != c.min ? c.min : b.datamin),
						e = +(null !=
							c.max ? c.max : b.datamax),
						f = e - d;
					if (0 == f) {
						if (f = 0 == e ? 1 : 0.01, null == c.min && (d -= f), null == c.max || null != c.min) e += f
					} else {
						var h = c.autoscaleMargin;
						null != h && (null == c.min && (d -= f * h, 0 > d && (null != b.datamin && 0 <= b.datamin) && (d = 0)), null == c.max && (e += f * h, 0 < e && (null != b.datamax && 0 >= b.datamax) && (e = 0)))
					}
					b.min = d;
					b.max = e
				});
				allocatedAxes = jquery_b.grep(c, function(a) {
					return a.reserveSpace
				});
				y.left = y.right = y.top = y.bottom = 0;
				if (n.grid.show) {
					jquery_b.each(allocatedAxes, function(b, c) {
						var d = c.options,
							e;
						e = "number" == typeof d.ticks && 0 < d.ticks ? d.ticks :
							0.3 * Math.sqrt("x" == c.direction ? K : Q);
						e = (c.max - c.min) / e;
						var f, h, l, z;
						if ("time" == d.mode) {
							var ia = {
								second: 1E3,
								minute: 6E4,
								hour: 36E5,
								day: 864E5,
								month: 2592E6,
								year: 525949.2 * 6E4
							};
							z = [
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
							f = 0;
							null != d.minTickSize &&
								(f = "number" == typeof d.tickSize ? d.tickSize : d.minTickSize[0] * ia[d.minTickSize[1]]);
							for (h = 0; h < z.length - 1 && !(e < (z[h][0] * ia[z[h][1]] + z[h + 1][0] * ia[z[h + 1][1]]) / 2 && z[h][0] * ia[z[h][1]] >= f); ++h);
							f = z[h][0];
							l = z[h][1];
							"year" == l && (h = Math.pow(10, Math.floor(Math.log(e / ia.year) / Math.LN10)), z = e / ia.year / h, f = (1.5 > z ? 1 : 3 > z ? 2 : 7.5 > z ? 5 : 10) * h);
							c.tickSize = d.tickSize || [f, l];
							h = function(a) {
								var b = [],
									c = a.tickSize[0],
									d = a.tickSize[1],
									e = new Date(a.min),
									f = c * ia[d];
								"second" == d && e.setUTCSeconds(Ia(e.getUTCSeconds(), c));
								"minute" == d && e.setUTCMinutes(Ia(e.getUTCMinutes(),
									c));
								"hour" == d && e.setUTCHours(Ia(e.getUTCHours(), c));
								"month" == d && e.setUTCMonth(Ia(e.getUTCMonth(), c));
								"year" == d && e.setUTCFullYear(Ia(e.getUTCFullYear(), c));
								e.setUTCMilliseconds(0);
								f >= ia.minute && e.setUTCSeconds(0);
								f >= ia.hour && e.setUTCMinutes(0);
								f >= ia.day && e.setUTCHours(0);
								f >= 4 * ia.day && e.setUTCDate(1);
								f >= ia.year && e.setUTCMonth(0);
								var h = 0,
									l = Number.NaN,
									z;
								do
									if (z = l, l = e.getTime(), b.push(l), "month" == d)
										if (1 > c) {
											e.setUTCDate(1);
											var ka = e.getTime();
											e.setUTCMonth(e.getUTCMonth() + 1);
											var v = e.getTime();
											e.setTime(l +
												h * ia.hour + (v - ka) * c);
											h = e.getUTCHours();
											e.setUTCHours(0)
										} else e.setUTCMonth(e.getUTCMonth() + c);
										else "year" == d ? e.setUTCFullYear(e.getUTCFullYear() + c) : e.setTime(l + f); while (l < a.max && l != z);
								return b
							};
							f = function(a, b) {
								var c = new Date(a);
								if (null != d.timeformat) return jquery_b.plot.formatDate(c, d.timeformat, d.monthNames);
								var e = b.tickSize[0] * ia[b.tickSize[1]],
									f = b.max - b.min,
									h = d.twelveHourClock ? " %p" : "";
								fmt = e < ia.minute ? "%h:%M:%S" + h : e < ia.day ? f < 2 * ia.day ? "%h:%M" + h : "%b %d %h:%M" + h : e < ia.month ? "%b %d" : e < ia.year ? f < ia.year ? "%b" :
									"%b %y" : "%y";
								return jquery_b.plot.formatDate(c, fmt, d.monthNames)
							}
						} else {
							l = d.tickDecimals;
							var ka = -Math.floor(Math.log(e) / Math.LN10);
							null != l && ka > l && (ka = l);
							h = Math.pow(10, -ka);
							z = e / h;
							if (1.5 > z) f = 1;
							else if (3 > z) {
								if (f = 2, 2.25 < z && (null == l || ka + 1 <= l)) f = 2.5, ++ka
							} else f = 7.5 > z ? 5 : 10;
							f *= h;
							null != d.minTickSize && f < d.minTickSize && (f = d.minTickSize);
							c.tickDecimals = Math.max(0, null != l ? l : ka);
							c.tickSize = d.tickSize || f;
							h = function(a) {
								var b = [],
									c = Ia(a.min, a.tickSize),
									d = 0,
									e = Number.NaN,
									f;
								do f = e, e = c + d * a.tickSize, b.push(e), ++d; while (e < a.max &&
									e != f);
								return b
							};
							f = function(a, b) {
								return a.toFixed(b.tickDecimals)
							}
						} if (null != d.alignTicksWithAxis) {
							var v = ("x" == c.direction ? G : M)[d.alignTicksWithAxis - 1];
							v && (v.used && v != c) && (h = h(c), 0 < h.length && (null == d.min && (c.min = Math.min(c.min, h[0])), null == d.max && 1 < h.length && (c.max = Math.max(c.max, h[h.length - 1]))), h = function(a) {
								var b = [],
									c, d;
								for (d = 0; d < v.ticks.length; ++d) c = (v.ticks[d].v - v.min) / (v.max - v.min), c = a.min + c * (a.max - a.min), b.push(c);
								return b
							}, "time" != c.mode && null == d.tickDecimals && (e = Math.max(0, -Math.floor(Math.log(e) /
								Math.LN10) + 1), z = h(c), 1 < z.length && /\..*0$/.test((z[1] - z[0]).toFixed(e)) || (c.tickDecimals = e)))
						}
						c.tickGenerator = h;
						c.tickFormatter = jquery_b.isFunction(d.tickFormatter) ? function(a, b) {
							return "" + d.tickFormatter(a, b)
						} : f;
						f = c.options.ticks;
						e = [];
						null == f || "number" == typeof f && 0 < f ? e = c.tickGenerator(c) : f && (e = jquery_b.isFunction(f) ? f({
							min: c.min,
							max: c.max
						}) : f);
						c.ticks = [];
						for (f = 0; f < e.length; ++f) z = null, l = e[f], "object" == typeof l ? (h = +l[0], 1 < l.length && (z = l[1])) : h = +l, null == z && (z = c.tickFormatter(h, c)), isNaN(h) || c.ticks.push({
							v: h,
							label: z
						});
						e = c.ticks;
						c.options.autoscaleMargin && 0 < e.length && (null == c.options.min && (c.min = Math.min(c.min, e[0].v)), null == c.options.max && 1 < e.length && (c.max = Math.max(c.max, e[e.length - 1].v)));
						f = function(b, d) {
							return jquery_b('<div style="position:absolute;top:-10000px;' + d + 'font-size:smaller"><div class="' + c.direction + "Axis " + c.direction + c.n + 'Axis">' + b.join("") + "</div></div>").appendTo(a)
						};
						l = c.options;
						h = c.ticks || [];
						z = [];
						var db;
						e = l.labelWidth;
						l = l.labelHeight;
						if ("x" == c.direction) {
							if (null == e && (e = Math.floor(K / (0 < h.length ? h.length :
								1))), null == l) {
								z = [];
								for (ka = 0; ka < h.length; ++ka)(db = h[ka].label) && z.push('<div class="tickLabel" style="float:left;width:' + e + 'px">' + db + "</div>");
								0 < z.length && (z.push('<div style="clear:left"></div>'), f = f(z, "width:10000px;"), l = f.height(), f.remove())
							}
						} else if (null == e || null == l) {
							for (ka = 0; ka < h.length; ++ka)(db = h[ka].label) && z.push('<div class="tickLabel">' + db + "</div>");
							0 < z.length && (f = f(z, ""), null == e && (e = f.children().width()), null == l && (l = f.find("div.tickLabel").height()), f.remove())
						}
						null == e && (e = 0);
						null == l &&
							(l = 0);
						c.labelWidth = e;
						c.labelHeight = l
					});
					for (b = allocatedAxes.length - 1; 0 <= b; --b) r(allocatedAxes[b]);
					var d = n.grid.minBorderMargin;
					if (null == d)
						for (b = d = 0; b < J.length; ++b) d = Math.max(d, J[b].points.radius + J[b].points.lineWidth / 2);
					for (var e in y) y[e] += n.grid.borderWidth, y[e] = Math.max(d, y[e])
				}
				Z = K - y.left - y.right;
				X = Q - y.bottom - y.top;
				jquery_b.each(c, function(a, b) {
					var c = function(a) {
						return a
					}, d, e, f = b.options.transform || c,
						h = b.options.inverseTransform;
					"x" == b.direction ? (d = b.scale = Z / Math.abs(f(b.max) - f(b.min)), e = Math.min(f(b.max),
						f(b.min))) : (d = b.scale = X / Math.abs(f(b.max) - f(b.min)), d = -d, e = Math.max(f(b.max), f(b.min)));
					b.p2c = f == c ? function(a) {
						return (a - e) * d
					} : function(a) {
						return (f(a) - e) * d
					};
					b.c2p = h ? function(a) {
						return h(e + a / d)
					} : function(a) {
						return e + a / d
					}
				});
				if (n.grid.show) {
					jquery_b.each(allocatedAxes, function(a, b) {
						"x" == b.direction ? (b.box.left = y.left, b.box.width = Z) : (b.box.top = y.top, b.box.height = X)
					});
					a.find(".tickLabels").remove();
					b = ['<div class="tickLabels" style="font-size:smaller">'];
					c = l();
					for (d = 0; d < c.length; ++d) {
						e = c[d];
						var f = e.box;
						if (e.show) {
							b.push('<div class="' +
								e.direction + "Axis " + e.direction + e.n + 'Axis" style="color:' + e.options.color + '">');
							for (var h = 0; h < e.ticks.length; ++h) {
								var v = e.ticks[h];
								if (v.label && !(v.v < e.min || v.v > e.max)) {
									var k = {}, j;
									"x" == e.direction ? (j = "center", k.left = Math.round(y.left + e.p2c(v.v) - e.labelWidth / 2), "bottom" == e.position ? k.top = f.top + f.padding : k.bottom = Q - (f.top + f.height - f.padding)) : (k.top = Math.round(y.top + e.p2c(v.v) - e.labelHeight / 2), "left" == e.position ? (k.right = K - (f.left + f.width - f.padding), j = "right") : (k.left = f.left + f.padding, j = "left"));
									k.width =
										e.labelWidth;
									j = ["position:absolute", "text-align:" + j];
									for (var B in k) j.push(B + ":" + k[B] + "px");
									b.push('<div class="tickLabel" style="' + j.join(";") + '">' + v.label + "</div>")
								}
							}
							b.push("</div>")
						}
					}
					b.push("</div>");
					a.append(b.join(""))
				}
				a.find(".legend").remove();
				if (n.legend.show) {
					B = [];
					b = !1;
					c = n.legend.labelFormatter;
					for (f = 0; f < J.length; ++f)
						if (d = J[f], e = d.label) 0 == f % n.legend.noColumns && (b && B.push("</tr>"), B.push("<tr>"), b = !0), c && (e = c(e, d)), B.push('<td class="legendColorBox"><div style="border:1px solid ' + n.legend.labelBoxBorderColor +
							';padding:1px"><div style="width:4px;height:0;border:5px solid ' + d.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + e + "</td>");
					b && B.push("</tr>");
					0 != B.length && (b = '<table style="font-size:smaller;color:' + n.grid.color + '">' + B.join("") + "</table>", null != n.legend.container ? jquery_b(n.legend.container).html(b) : (B = "", c = n.legend.position, d = n.legend.margin, null == d[0] && (d = [d, d]), "n" == c.charAt(0) ? B += "top:" + (d[1] + y.top) + "px;" : "s" == c.charAt(0) && (B += "bottom:" + (d[1] + y.bottom) + "px;"), "e" == c.charAt(1) ?
						B += "right:" + (d[0] + y.right) + "px;" : "w" == c.charAt(1) && (B += "left:" + (d[0] + y.left) + "px;"), b = jquery_b('<div class="legend">' + b.replace('style="', 'style="position:absolute;' + B + ";") + "</div>").appendTo(a), 0 != n.legend.backgroundOpacity && (c = n.legend.backgroundColor, null == c && (c = (c = n.grid.backgroundColor) && "string" == typeof c ? jquery_b.color.parse(c) : jquery_b.color.extract(b, "background-color"), c.a = 1, c = c.toString()), d = b.children(), jquery_b('<div style="position:absolute;width:' + d.width() + "px;height:" + d.height() + "px;" + B + "background-color:" +
							c + ';"> </div>').prependTo(b).css("opacity", n.legend.backgroundOpacity))))
				}
			}

			function s() {
				q.clearRect(0, 0, K, Q);
				var a = n.grid;
				a.show && a.backgroundColor && (q.save(), q.translate(y.left, y.top), q.fillStyle = ga(n.grid.backgroundColor, X, 0, "rgba(255, 255, 255, 0)"), q.fillRect(0, 0, Z, X), q.restore());
				a.show && !a.aboveData && A();
				for (var b = 0; b < J.length; ++b) {
					e(V.drawSeries, [q, J[b]]);
					var c = J[b];
					c.lines.show && w(c);
					c.bars.show && I(c);
					c.points.show && u(c)
				}
				e(V.draw, [q]);
				a.show && a.aboveData && A()
			}

			function x(a, b) {
				var c, d, e, f, h =
						l();
				for (i = 0; i < h.length; ++i)
					if (c = h[i], c.direction == b && (f = b + c.n + "axis", !a[f] && 1 == c.n && (f = b + "axis"), a[f])) {
						d = a[f].from;
						e = a[f].to;
						break
					}
				a[f] || (c = "x" == b ? G[0] : M[0], d = a[b + "1"], e = a[b + "2"]);
				null != d && (null != e && d > e) && (f = d, d = e, e = f);
				return {
					from: d,
					to: e,
					axis: c
				}
			}

			function A() {
				var a;
				q.save();
				q.translate(y.left, y.top);
				var b = n.grid.markings;
				if (b) {
					if (jquery_b.isFunction(b)) {
						var c = P.getAxes();
						c.xmin = c.xaxis.min;
						c.xmax = c.xaxis.max;
						c.ymin = c.yaxis.min;
						c.ymax = c.yaxis.max;
						b = b(c)
					}
					for (a = 0; a < b.length; ++a) {
						var c = b[a],
							d = x(c, "x"),
							e = x(c,
								"y");
						null == d.from && (d.from = d.axis.min);
						null == d.to && (d.to = d.axis.max);
						null == e.from && (e.from = e.axis.min);
						null == e.to && (e.to = e.axis.max);
						d.to < d.axis.min || (d.from > d.axis.max || e.to < e.axis.min || e.from > e.axis.max) || (d.from = Math.max(d.from, d.axis.min), d.to = Math.min(d.to, d.axis.max), e.from = Math.max(e.from, e.axis.min), e.to = Math.min(e.to, e.axis.max), d.from == d.to && e.from == e.to || (d.from = d.axis.p2c(d.from), d.to = d.axis.p2c(d.to), e.from = e.axis.p2c(e.from), e.to = e.axis.p2c(e.to), d.from == d.to || e.from == e.to ? (q.beginPath(),
							q.strokeStyle = c.color || n.grid.markingsColor, q.lineWidth = c.lineWidth || n.grid.markingsLineWidth, q.moveTo(d.from, e.from), q.lineTo(d.to, e.to), q.stroke()) : (q.fillStyle = c.color || n.grid.markingsColor, q.fillRect(d.from, e.to, d.to - d.from, e.from - e.to))))
					}
				}
				c = l();
				b = n.grid.borderWidth;
				for (d = 0; d < c.length; ++d) {
					e = c[d];
					a = e.box;
					var f = e.tickLength,
						h, v, k, j;
					if (e.show && 0 != e.ticks.length) {
						q.strokeStyle = e.options.tickColor || jquery_b.color.parse(e.options.color).scale("a", 0.22).toString();
						q.lineWidth = 1;
						"x" == e.direction ? (h = 0, v = "full" ==
							f ? "top" == e.position ? 0 : X : a.top - y.top + ("top" == e.position ? a.height : 0)) : (v = 0, h = "full" == f ? "left" == e.position ? 0 : Z : a.left - y.left + ("left" == e.position ? a.width : 0));
						e.innermost || (q.beginPath(), k = j = 0, "x" == e.direction ? k = Z : j = X, 1 == q.lineWidth && (h = Math.floor(h) + 0.5, v = Math.floor(v) + 0.5), q.moveTo(h, v), q.lineTo(h + k, v + j), q.stroke());
						q.beginPath();
						for (a = 0; a < e.ticks.length; ++a) {
							var D = e.ticks[a].v;
							k = j = 0;
							D < e.min || (D > e.max || "full" == f && 0 < b && (D == e.min || D == e.max)) || ("x" == e.direction ? (h = e.p2c(D), j = "full" == f ? -X : f, "top" == e.position &&
								(j = -j)) : (v = e.p2c(D), k = "full" == f ? -Z : f, "left" == e.position && (k = -k)), 1 == q.lineWidth && ("x" == e.direction ? h = Math.floor(h) + 0.5 : v = Math.floor(v) + 0.5), q.moveTo(h, v), q.lineTo(h + k, v + j))
						}
						q.stroke()
					}
				}
				b && (q.lineWidth = b, q.strokeStyle = n.grid.borderColor, q.strokeRect(-b / 2, -b / 2, Z + b, X + b));
				q.restore()
			}

			function w(a) {
				function b(a, c, d, e, f) {
					var h = a.points,
						a = a.pointsize,
						l = null,
						v = null;
					q.beginPath();
					for (var z = a; z < h.length; z += a) {
						var k = h[z - a],
							g = h[z - a + 1],
							j = h[z],
							n = h[z + 1];
						if (!(null == k || null == j)) {
							if (g <= n && g < f.min) {
								if (n < f.min) continue;
								k = (f.min - g) / (n - g) * (j - k) + k;
								g = f.min
							} else if (n <= g && n < f.min) {
								if (g < f.min) continue;
								j = (f.min - g) / (n - g) * (j - k) + k;
								n = f.min
							}
							if (g >= n && g > f.max) {
								if (n > f.max) continue;
								k = (f.max - g) / (n - g) * (j - k) + k;
								g = f.max
							} else if (n >= g && n > f.max) {
								if (g > f.max) continue;
								j = (f.max - g) / (n - g) * (j - k) + k;
								n = f.max
							}
							if (k <= j && k < e.min) {
								if (j < e.min) continue;
								g = (e.min - k) / (j - k) * (n - g) + g;
								k = e.min
							} else if (j <= k && j < e.min) {
								if (k < e.min) continue;
								n = (e.min - k) / (j - k) * (n - g) + g;
								j = e.min
							}
							if (k >= j && k > e.max) {
								if (j > e.max) continue;
								g = (e.max - k) / (j - k) * (n - g) + g;
								k = e.max
							} else if (j >= k && j > e.max) {
								if (k >
									e.max) continue;
								n = (e.max - k) / (j - k) * (n - g) + g;
								j = e.max
							}(k != l || g != v) && q.moveTo(e.p2c(k) + c, f.p2c(g) + d);
							l = j;
							v = n;
							q.lineTo(e.p2c(j) + c, f.p2c(n) + d)
						}
					}
					q.stroke()
				}
				q.save();
				q.translate(y.left, y.top);
				q.lineJoin = "round";
				var c = a.lines.lineWidth,
					d = a.shadowSize;
				if (0 < c && 0 < d) {
					q.lineWidth = d;
					q.strokeStyle = "rgba(0,0,0,0.1)";
					var e = Math.PI / 18;
					b(a.datapoints, Math.sin(e) * (c / 2 + d / 2), Math.cos(e) * (c / 2 + d / 2), a.xaxis, a.yaxis);
					q.lineWidth = d / 2;
					b(a.datapoints, Math.sin(e) * (c / 2 + d / 4), Math.cos(e) * (c / 2 + d / 4), a.xaxis, a.yaxis)
				}
				q.lineWidth = c;
				q.strokeStyle =
					a.color;
				if (d = H(a.lines, a.color, 0, X)) {
					q.fillStyle = d;
					for (var f = a.datapoints, d = a.xaxis, e = a.yaxis, h = f.points, f = f.pointsize, l = Math.min(Math.max(0, e.min), e.max), v = 0, k = !1, j = 1, n = 0, D = 0; !(0 < f && v > h.length + f);) {
						var v = v + f,
							g = h[v - f],
							m = h[v - f + j],
							C = h[v],
							F = h[v + j];
						if (k) {
							if (0 < f && null != g && null == C) {
								D = v;
								f = -f;
								j = 2;
								continue
							}
							if (0 > f && v == n + f) {
								q.fill();
								k = !1;
								f = -f;
								j = 1;
								v = n = D + f;
								continue
							}
						}
						if (!(null == g || null == C)) {
							if (g <= C && g < d.min) {
								if (C < d.min) continue;
								m = (d.min - g) / (C - g) * (F - m) + m;
								g = d.min
							} else if (C <= g && C < d.min) {
								if (g < d.min) continue;
								F = (d.min -
									g) / (C - g) * (F - m) + m;
								C = d.min
							}
							if (g >= C && g > d.max) {
								if (C > d.max) continue;
								m = (d.max - g) / (C - g) * (F - m) + m;
								g = d.max
							} else if (C >= g && C > d.max) {
								if (g > d.max) continue;
								F = (d.max - g) / (C - g) * (F - m) + m;
								C = d.max
							}
							k || (q.beginPath(), q.moveTo(d.p2c(g), e.p2c(l)), k = !0);
							if (m >= e.max && F >= e.max) q.lineTo(d.p2c(g), e.p2c(e.max)), q.lineTo(d.p2c(C), e.p2c(e.max));
							else if (m <= e.min && F <= e.min) q.lineTo(d.p2c(g), e.p2c(e.min)), q.lineTo(d.p2c(C), e.p2c(e.min));
							else {
								var r = g,
									p = C;
								m <= F && m < e.min && F >= e.min ? (g = (e.min - m) / (F - m) * (C - g) + g, m = e.min) : F <= m && (F < e.min && m >= e.min) &&
									(C = (e.min - m) / (F - m) * (C - g) + g, F = e.min);
								m >= F && m > e.max && F <= e.max ? (g = (e.max - m) / (F - m) * (C - g) + g, m = e.max) : F >= m && (F > e.max && m <= e.max) && (C = (e.max - m) / (F - m) * (C - g) + g, F = e.max);
								g != r && q.lineTo(d.p2c(r), e.p2c(m));
								q.lineTo(d.p2c(g), e.p2c(m));
								q.lineTo(d.p2c(C), e.p2c(F));
								C != p && (q.lineTo(d.p2c(C), e.p2c(F)), q.lineTo(d.p2c(p), e.p2c(F)))
							}
						}
					}
				}
				0 < c && b(a.datapoints, 0, 0, a.xaxis, a.yaxis);
				q.restore()
			}

			function u(a) {
				function b(a, c, d, e, f, h, l, v) {
					for (var k = a.points, a = a.pointsize, z = 0; z < k.length; z += a) {
						var g = k[z],
							j = k[z + 1];
						null == g || (g < h.min ||
							g > h.max || j < l.min || j > l.max) || (q.beginPath(), g = h.p2c(g), j = l.p2c(j) + e, "circle" == v ? q.arc(g, j, c, 0, f ? Math.PI : 2 * Math.PI, !1) : v(q, g, j, c, f), q.closePath(), d && (q.fillStyle = d, q.fill()), q.stroke())
					}
				}
				q.save();
				q.translate(y.left, y.top);
				var c = a.points.lineWidth,
					d = a.shadowSize,
					e = a.points.radius,
					f = a.points.symbol;
				0 < c && 0 < d && (d /= 2, q.lineWidth = d, q.strokeStyle = "rgba(0,0,0,0.1)", b(a.datapoints, e, null, d + d / 2, !0, a.xaxis, a.yaxis, f), q.strokeStyle = "rgba(0,0,0,0.2)", b(a.datapoints, e, null, d / 2, !0, a.xaxis, a.yaxis, f));
				q.lineWidth =
					c;
				q.strokeStyle = a.color;
				b(a.datapoints, e, H(a.points, a.color), 0, !1, a.xaxis, a.yaxis, f);
				q.restore()
			}

			function E(a, b, c, d, e, f, h, l, v, k, g, j) {
				var n, m, D, q;
				g ? (q = m = D = !0, n = !1, g = c, c = b + d, e = b + e, a < g && (b = a, a = g, g = b, n = !0, m = !1)) : (n = m = D = !0, q = !1, g = a + d, a += e, e = c, c = b, c < e && (b = c, c = e, e = b, q = !0, D = !1));
				if (!(a < l.min || g > l.max || c < v.min || e > v.max))
					if (g < l.min && (g = l.min, n = !1), a > l.max && (a = l.max, m = !1), e < v.min && (e = v.min, q = !1), c > v.max && (c = v.max, D = !1), g = l.p2c(g), e = v.p2c(e), a = l.p2c(a), c = v.p2c(c), h && (k.beginPath(), k.moveTo(g, e), k.lineTo(g, c),
						k.lineTo(a, c), k.lineTo(a, e), k.fillStyle = h(e, c), k.fill()), 0 < j && (n || m || D || q)) k.beginPath(), k.moveTo(g, e + f), n ? k.lineTo(g, c + f) : k.moveTo(g, c + f), D ? k.lineTo(a, c + f) : k.moveTo(a, c + f), m ? k.lineTo(a, e + f) : k.moveTo(a, e + f), q ? k.lineTo(g, e + f) : k.moveTo(g, e + f), k.stroke()
			}

			function I(a) {
				q.save();
				q.translate(y.left, y.top);
				q.lineWidth = a.bars.lineWidth;
				q.strokeStyle = a.color;
				for (var b = "left" == a.bars.align ? 0 : -a.bars.barWidth / 2, c = a.datapoints, d = b + a.bars.barWidth, e = a.bars.fill ? function(b, c) {
							return H(a.bars, a.color, b, c)
						} : null,
						f = a.xaxis, h = a.yaxis, l = c.points, c = c.pointsize, k = 0; k < l.length; k += c) null != l[k] && E(l[k], l[k + 1], l[k + 2], b, d, 0, e, f, h, q, a.bars.horizontal, a.bars.lineWidth);
				q.restore()
			}

			function H(a, b, c, d) {
				var e = a.fill;
				if (!e) return null;
				if (a.fillColor) return ga(a.fillColor, c, d, b);
				a = jquery_b.color.parse(b);
				a.a = "number" == typeof e ? e : 0.4;
				a.normalize();
				return a.toString()
			}

			function N(a) {
				n.grid.hoverable && T("plothover", a, function(a) {
					return !1 != a.hoverable
				})
			}

			function S(a) {
				n.grid.hoverable && T("plothover", a, function() {
					return !1
				})
			}

			function U(a) {
				T("plotclick",
					a, function(a) {
						return !1 != a.clickable
					})
			}

			function T(b, c, d) {
				var e = O.offset(),
					f = c.pageX - e.left - y.left,
					h = c.pageY - e.top - y.top,
					l = v({
						left: f,
						top: h
					});
				l.pageX = c.pageX;
				l.pageY = c.pageY;
				var c = n.grid.mouseActiveRadius,
					k = c * c + 1,
					g = null,
					j, m;
				for (j = J.length - 1; 0 <= j; --j)
					if (d(J[j])) {
						var D = J[j],
							q = D.xaxis,
							F = D.yaxis,
							r = D.datapoints.points,
							p = D.datapoints.pointsize,
							t = q.c2p(f),
							s = F.c2p(h),
							x = c / q.scale,
							A = c / F.scale;
						q.options.inverseTransform && (x = Number.MAX_VALUE);
						F.options.inverseTransform && (A = Number.MAX_VALUE);
						if (D.lines.show || D.points.show)
							for (m =
								0; m < r.length; m += p) {
								var w = r[m],
									u = r[m + 1];
								if (null != w && !(w - t > x || w - t < -x || u - s > A || u - s < -A)) w = Math.abs(q.p2c(w) - f), u = Math.abs(F.p2c(u) - h), u = w * w + u * u, u < k && (k = u, g = [j, m / p])
							}
						if (D.bars.show && !g) {
							q = "left" == D.bars.align ? 0 : -D.bars.barWidth / 2;
							D = q + D.bars.barWidth;
							for (m = 0; m < r.length; m += p)
								if (w = r[m], u = r[m + 1], F = r[m + 2], null != w && (J[j].bars.horizontal ? t <= Math.max(F, w) && t >= Math.min(F, w) && s >= u + q && s <= u + D : t >= w + q && t <= w + D && s >= Math.min(F, u) && s <= Math.max(F, u))) g = [j, m / p]
						}
					}
				g ? (j = g[0], m = g[1], p = J[j].datapoints.pointsize, d = {
					datapoint: J[j].datapoints.points.slice(m *
						p, (m + 1) * p),
					dataIndex: m,
					series: J[j],
					seriesIndex: j
				}) : d = null;
				d && (d.pageX = parseInt(d.series.xaxis.p2c(d.datapoint[0]) + e.left + y.left), d.pageY = parseInt(d.series.yaxis.p2c(d.datapoint[1]) + e.top + y.top));
				if (n.grid.autoHighlight) {
					for (e = 0; e < fa.length; ++e) f = fa[e], f.auto == b && (!d || !(f.series == d.series && f.point[0] == d.datapoint[0] && f.point[1] == d.datapoint[1])) && da(f.series, f.point);
					d && aa(d.series, d.datapoint, b)
				}
				a.trigger(b, [l, d])
			}

			function R() {
				la || (la = setTimeout(ba, 30))
			}

			function ba() {
				la = null;
				ja.save();
				ja.clearRect(0,
					0, K, Q);
				ja.translate(y.left, y.top);
				var a, b;
				for (a = 0; a < fa.length; ++a)
					if (b = fa[a], b.series.bars.show) ha(b.series, b.point);
					else {
						var c = b.series,
							d = b.point;
						b = d[0];
						var d = d[1],
							f = c.xaxis,
							h = c.yaxis;
						if (!(b < f.min || b > f.max || d < h.min || d > h.max)) {
							var l = c.points.radius + c.points.lineWidth / 2;
							ja.lineWidth = l;
							ja.strokeStyle = jquery_b.color.parse(c.color).scale("a", 0.5).toString();
							l *= 1.5;
							b = f.p2c(b);
							d = h.p2c(d);
							ja.beginPath();
							"circle" == c.points.symbol ? ja.arc(b, d, l, 0, 2 * Math.PI, !1) : c.points.symbol(ja, b, d, l, !1);
							ja.closePath();
							ja.stroke()
						}
					}
				ja.restore();
				e(V.drawOverlay, [ja])
			}

			function aa(a, b, c) {
				"number" == typeof a && (a = J[a]);
				if ("number" == typeof b) var d = a.datapoints.pointsize,
				b = a.datapoints.points.slice(d * b, d * (b + 1));
				d = ea(a, b); - 1 == d ? (fa.push({
					series: a,
					point: b,
					auto: c
				}), R()) : c || (fa[d].auto = !1)
			}

			function da(a, b) {
				null == a && null == b && (fa = [], R());
				"number" == typeof a && (a = J[a]);
				"number" == typeof b && (b = a.data[b]);
				var c = ea(a, b); - 1 != c && (fa.splice(c, 1), R())
			}

			function ea(a, b) {
				for (var c = 0; c < fa.length; ++c) {
					var d = fa[c];
					if (d.series == a && d.point[0] == b[0] && d.point[1] == b[1]) return c
				}
				return -1
			}

			function ha(a, b) {
				ja.lineWidth = a.bars.lineWidth;
				ja.strokeStyle = jquery_b.color.parse(a.color).scale("a", 0.5).toString();
				var c = jquery_b.color.parse(a.color).scale("a", 0.5).toString(),
					d = "left" == a.bars.align ? 0 : -a.bars.barWidth / 2;
				E(b[0], b[1], b[2] || 0, d, d + a.bars.barWidth, 0, function() {
					return c
				}, a.xaxis, a.yaxis, ja, a.bars.horizontal, a.bars.lineWidth)
			}

			function ga(a, b, c, d) {
				if ("string" == typeof a) return a;
				for (var b = q.createLinearGradient(0, c, 0, b), c = 0, e = a.colors.length; c < e; ++c) {
					var f = a.colors[c];
					if ("string" != typeof f) {
						var h = jquery_b.color.parse(d);
						null != f.brightness && (h = h.scale("rgb", f.brightness));
						null != f.opacity && (h.a *= f.opacity);
						f = h.toString()
					}
					b.addColorStop(c / (e - 1), f)
				}
				return b
			}
			var J = [],
				n = {
					colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
					legend: {
						show: !0,
						noColumns: 1,
						labelFormatter: null,
						labelBoxBorderColor: "#ccc",
						container: null,
						position: "ne",
						margin: 5,
						backgroundColor: null,
						backgroundOpacity: 0.85
					},
					xaxis: {
						show: null,
						position: "bottom",
						mode: null,
						color: null,
						tickColor: null,
						transform: null,
						inverseTransform: null,
						min: null,
						max: null,
						autoscaleMargin: null,
						ticks: null,
						tickFormatter: null,
						labelWidth: null,
						labelHeight: null,
						reserveSpace: null,
						tickLength: null,
						alignTicksWithAxis: null,
						tickDecimals: null,
						tickSize: null,
						minTickSize: null,
						monthNames: null,
						timeformat: null,
						twelveHourClock: !1
					},
					yaxis: {
						autoscaleMargin: 0.02,
						position: "left"
					},
					xaxes: [],
					yaxes: [],
					series: {
						points: {
							show: !1,
							radius: 3,
							lineWidth: 2,
							fill: !0,
							fillColor: "#ffffff",
							symbol: "circle"
						},
						lines: {
							lineWidth: 2,
							fill: !1,
							fillColor: null,
							steps: !1
						},
						bars: {
							show: !1,
							lineWidth: 2,
							barWidth: 1,
							fill: !0,
							fillColor: null,
							align: "left",
							horizontal: !1
						},
						shadowSize: 3
					},
					grid: {
						show: !0,
						aboveData: !1,
						color: "#545454",
						backgroundColor: null,
						borderColor: null,
						tickColor: null,
						labelMargin: 5,
						axisMargin: 8,
						borderWidth: 2,
						minBorderMargin: null,
						markings: null,
						markingsColor: "#f4f4f4",
						markingsLineWidth: 2,
						clickable: !1,
						hoverable: !1,
						autoHighlight: !0,
						mouseActiveRadius: 10
					},
					hooks: {}
				}, W = null,
				Y = null,
				O = null,
				q = null,
				ja = null,
				G = [],
				M = [],
				y = {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, K = 0,
				Q = 0,
				Z = 0,
				X = 0,
				V = {
					processOptions: [],
					processRawData: [],
					processDatapoints: [],
					drawSeries: [],
					draw: [],
					bindEvents: [],
					drawOverlay: [],
					shutdown: []
				}, P = this;
			P.setData = f;
			P.setupGrid = t;
			P.draw = s;
			P.getPlaceholder = function() {
				return a
			};
			P.getCanvas = function() {
				return W
			};
			P.getPlotOffset = function() {
				return y
			};
			P.width = function() {
				return Z
			};
			P.height = function() {
				return X
			};
			P.offset = function() {
				var a = O.offset();
				a.left += y.left;
				a.top += y.top;
				return a
			};
			P.getData = function() {
				return J
			};
			P.getAxes = function() {
				var a = {};
				jquery_b.each(G.concat(M), function(b, c) {
					c && (a[c.direction + (1 != c.n ? c.n : "") + "axis"] = c)
				});
				return a
			};
			P.getXAxes = function() {
				return G
			};
			P.getYAxes = function() {
				return M
			};
			P.c2p = v;
			P.p2c = function(a) {
				var b = {}, c, d, e;
				for (c = 0; c < G.length; ++c)
					if ((d = G[c]) && d.used)
						if (e = "x" + d.n, null == a[e] && 1 == d.n && (e = "x"), null != a[e]) {
							b.left = d.p2c(a[e]);
							break
						}
				for (c = 0; c < M.length; ++c)
					if ((d = M[c]) && d.used)
						if (e = "y" + d.n, null == a[e] && 1 == d.n && (e = "y"), null != a[e]) {
							b.top = d.p2c(a[e]);
							break
						}
				return b
			};
			P.getOptions = function() {
				return n
			};
			P.highlight = aa;
			P.unhighlight = da;
			P.triggerRedrawOverlay = R;
			P.pointOffset = function(a) {
				return {
					left: parseInt(G[h(a, "x") - 1].p2c(+a.x) + y.left),
					top: parseInt(M[h(a, "y") - 1].p2c(+a.y) + y.top)
				}
			};
			P.shutdown = function() {
				la && clearTimeout(la);
				O.unbind("mousemove", N);
				O.unbind("mouseleave", S);
				O.unbind("click", U);
				e(V.shutdown, [O])
			};
			P.resize = function() {
				g();
				m(W);
				m(Y)
			};
			P.hooks = V;
			for (var ma = 0; ma < d.length; ++ma) {
				var oa = d[ma];
				oa.init(P);
				oa.options && jquery_b.extend(!0, n, oa.options)
			}
			jquery_b.extend(!0, n, c);
			null == n.xaxis.color && (n.xaxis.color = n.grid.color);
			null == n.yaxis.color && (n.yaxis.color = n.grid.color);
			null == n.xaxis.tickColor && (n.xaxis.tickColor = n.grid.tickColor);
			null == n.yaxis.tickColor && (n.yaxis.tickColor = n.grid.tickColor);
			null == n.grid.borderColor && (n.grid.borderColor = n.grid.color);
			null == n.grid.tickColor && (n.grid.tickColor = jquery_b.color.parse(n.grid.color).scale("a", 0.22).toString());
			for (c = 0; c < Math.max(1, n.xaxes.length); ++c) n.xaxes[c] = jquery_b.extend(!0, {}, n.xaxis, n.xaxes[c]);
			for (c = 0; c < Math.max(1, n.yaxes.length); ++c) n.yaxes[c] = jquery_b.extend(!0, {}, n.yaxis, n.yaxes[c]);
			n.xaxis.noTicks && null == n.xaxis.ticks && (n.xaxis.ticks = n.xaxis.noTicks);
			n.yaxis.noTicks && null == n.yaxis.ticks && (n.yaxis.ticks = n.yaxis.noTicks);
			n.x2axis && (n.xaxes[1] = jquery_b.extend(!0, {}, n.xaxis, n.x2axis), n.xaxes[1].position = "top");
			n.y2axis && (n.yaxes[1] = jquery_b.extend(!0, {}, n.yaxis, n.y2axis), n.yaxes[1].position = "right");
			n.grid.coloredAreas && (n.grid.markings = n.grid.coloredAreas);
			n.grid.coloredAreasColor && (n.grid.markingsColor = n.grid.coloredAreasColor);
			n.lines && jquery_b.extend(!0, n.series.lines, n.lines);
			n.points && jquery_b.extend(!0, n.series.points, n.points);
			n.bars && jquery_b.extend(!0, n.series.bars, n.bars);
			null != n.shadowSize && (n.series.shadowSize = n.shadowSize);
			for (c = 0; c < n.xaxes.length; ++c) j(G, c + 1).options =
				n.xaxes[c];
			for (c = 0; c < n.yaxes.length; ++c) j(M, c + 1).options = n.yaxes[c];
			for (var qa in V) n.hooks[qa] && n.hooks[qa].length && (V[qa] = V[qa].concat(n.hooks[qa]));
			e(V.processOptions, [n]);
			qa = a.children("canvas.base");
			c = a.children("canvas.overlay");
			0 == qa.length || 0 == c ? (a.html(""), a.css({
				padding: 0
			}), "static" == a.css("position") && a.css("position", "relative"), g(), W = k(!0, "base"), Y = k(!1, "overlay"), qa = !1) : (W = qa.get(0), Y = c.get(0), qa = !0);
			q = W.getContext("2d");
			ja = Y.getContext("2d");
			O = jquery_b([Y, W]);
			qa && (a.data("plot").shutdown(),
				P.resize(), ja.clearRect(0, 0, K, Q), O.unbind(), a.children().not([W, Y]).remove());
			a.data("plot", P);
			f(b);
			t();
			s();
			n.grid.hoverable && (O.mousemove(N), O.mouseleave(S));
			n.grid.clickable && O.click(U);
			e(V.bindEvents, [O]);
			var fa = [],
				la = null
		}, Ia = function(a, b) {
			return b * Math.floor(a / b)
		};
	jquery_b.plot = function(a, b, c) {
		return new kc(jquery_b(a), b, c, jquery_b.plot.plugins)
	};
	jquery_b.plot.version = "0.7";
	jquery_b.plot.plugins = [];
	jquery_b.plot.formatDate = function(a, b, c) {
		var d = function(a) {
			a = "" + a;
			return 1 == a.length ? "0" + a : a
		}, e = [],
			f = !1,
			h = !1,
			l = a.getUTCHours(),
			g = 12 > l;
		null ==
			c && (c = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")); - 1 != b.search(/%p|%P/) && (12 < l ? l -= 12 : 0 == l && (l = 12));
		for (var j = 0; j < b.length; ++j) {
			var k = b.charAt(j);
			if (f) {
				switch (k) {
					case "h":
						k = "" + l;
						break;
					case "H":
						k = d(l);
						break;
					case "M":
						k = d(a.getUTCMinutes());
						break;
					case "S":
						k = d(a.getUTCSeconds());
						break;
					case "d":
						k = "" + a.getUTCDate();
						break;
					case "m":
						k = "" + (a.getUTCMonth() + 1);
						break;
					case "y":
						k = "" + a.getUTCFullYear();
						break;
					case "b":
						k = "" + c[a.getUTCMonth()];
						break;
					case "p":
						k = g ? "am" : "pm";
						break;
					case "P":
						k = g ? "AM" : "PM";
						break;
					case "0":
						k = "", h = !0
				}
				k && h && (k = d(k), h = !1);
				e.push(k);
				h || (f = !1)
			} else "%" == k ? f = !0 : e.push(k)
		}
		return e.join("")
	};
	var za, Cb = function(a) {
			this.mode = Z.MODE_8BIT_BYTE;
			this.data = a;
			this.parsedData = [];
			for (var a = 0, b = this.data.length; a < b; a++) {
				var c = [],
					d = this.data.charCodeAt(a);
				65536 < d ? (c[0] = 240 | (d & 1835008) >>> 18, c[1] = 128 | (d & 258048) >>> 12, c[2] = 128 | (d & 4032) >>> 6, c[3] = 128 | d & 63) : 2048 < d ? (c[0] = 224 | (d & 61440) >>> 12, c[1] = 128 | (d & 4032) >>> 6, c[2] = 128 | d & 63) : 128 < d ? (c[0] = 192 | (d & 1984) >>> 6, c[1] = 128 | d & 63) : c[0] = d;
				this.parsedData.push(c)
			}
			this.parsedData =
				Array.prototype.concat.apply([], this.parsedData);
			this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239))
		}, oa = function(a, b) {
			this.typeNumber = a;
			this.errorCorrectLevel = b;
			this.modules = null;
			this.moduleCount = 0;
			this.dataCache = null;
			this.dataList = []
		}, Ja = function(a, b) {
			if (a.length == ca) throw Error(a.length + "/" + b);
			for (var c = 0; c < a.length && 0 == a[c];) c++;
			this.num = Array(a.length - c + b);
			for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c]
		}, fa = function(a,
			b) {
			this.totalCount = a;
			this.dataCount = b
		}, Db = function() {
			this.buffer = [];
			this.length = 0
		}, Eb = function() {
			var a = !1,
				b = navigator.userAgent;
			/android/i.test(b) && (a = !0, (aMat = b.toString().match(/android ([0-9]\.[0-9])/i)) && aMat[1] && (a = parseFloat(aMat[1])));
			return a
		};
	Cb.prototype = {
		getLength: function() {
			return this.parsedData.length
		},
		write: function(a) {
			for (var b = 0, c = this.parsedData.length; b < c; b++) a.put(this.parsedData[b], 8)
		}
	};
	oa.prototype = {
		addData: function(a) {
			a = new Cb(a);
			this.dataList.push(a);
			this.dataCache = null
		},
		isDark: function(a,
			b) {
			if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw Error(a + "," + b);
			return this.modules[a][b]
		},
		getModuleCount: function() {
			return this.moduleCount
		},
		make: function() {
			this.makeImpl(!1, this.getBestMaskPattern())
		},
		makeImpl: function(a, b) {
			this.moduleCount = 4 * this.typeNumber + 17;
			this.modules = Array(this.moduleCount);
			for (var c = 0; c < this.moduleCount; c++) {
				this.modules[c] = Array(this.moduleCount);
				for (var d = 0; d < this.moduleCount; d++) this.modules[c][d] = null
			}
			this.setupPositionProbePattern(0, 0);
			this.setupPositionProbePattern(this.moduleCount -
				7, 0);
			this.setupPositionProbePattern(0, this.moduleCount - 7);
			this.setupPositionAdjustPattern();
			this.setupTimingPattern();
			this.setupTypeInfo(a, b);
			7 <= this.typeNumber && this.setupTypeNumber(a);
			null == this.dataCache && (this.dataCache = oa.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
			this.mapData(this.dataCache, b)
		},
		setupPositionProbePattern: function(a, b) {
			for (var c = -1; 7 >= c; c++)
				if (!(-1 >= a + c || this.moduleCount <= a + c))
					for (var d = -1; 7 >= d; d++) - 1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] =
						0 <= c && 6 >= c && (0 == d || 6 == d) || 0 <= d && 6 >= d && (0 == c || 6 == c) || 2 <= c && 4 >= c && 2 <= d && 4 >= d ? !0 : !1)
		},
		getBestMaskPattern: function() {
			for (var a = 0, b = 0, c = 0; 8 > c; c++) {
				this.makeImpl(!0, c);
				var d = U.getLostPoint(this);
				if (0 == c || a > d) a = d, b = c
			}
			return b
		},
		createMovieClip: function(a, b, c) {
			a = a.createEmptyMovieClip(b, c);
			this.make();
			for (b = 0; b < this.modules.length; b++)
				for (var c = 1 * b, d = 0; d < this.modules[b].length; d++) {
					var e = 1 * d;
					this.modules[b][d] && (a.beginFill(0, 100), a.moveTo(e, c), a.lineTo(e + 1, c), a.lineTo(e + 1, c + 1), a.lineTo(e, c + 1), a.endFill())
				}
			return a
		},
		setupTimingPattern: function() {
			for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
			for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
		},
		setupPositionAdjustPattern: function() {
			for (var a = U.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++)
				for (var c = 0; c < a.length; c++) {
					var d = a[b],
						e = a[c];
					if (null == this.modules[d][e])
						for (var f = -2; 2 >= f; f++)
							for (var h = -2; 2 >= h; h++) this.modules[d + f][e + h] = -2 == f || 2 == f || -2 == h || 2 == h || 0 == f && 0 == h ? !0 : !1
				}
		},
		setupTypeNumber: function(a) {
			for (var b =
				U.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
				var d = !a && 1 == (b >> c & 1);
				this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d
			}
			for (c = 0; 18 > c; c++) d = !a && 1 == (b >> c & 1), this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d
		},
		setupTypeInfo: function(a, b) {
			for (var c = U.getBCHTypeInfo(this.errorCorrectLevel << 3 | b), d = 0; 15 > d; d++) {
				var e = !a && 1 == (c >> d & 1);
				6 > d ? this.modules[d][8] = e : 8 > d ? this.modules[d + 1][8] = e : this.modules[this.moduleCount - 15 + d][8] = e
			}
			for (d = 0; 15 > d; d++) e = !a && 1 == (c >> d & 1), 8 > d ? this.modules[8][this.moduleCount -
				d - 1
			] = e : 9 > d ? this.modules[8][15 - d - 1 + 1] = e : this.modules[8][15 - d - 1] = e;
			this.modules[this.moduleCount - 8][8] = !a
		},
		mapData: function(a, b) {
			for (var c = -1, d = this.moduleCount - 1, e = 7, f = 0, h = this.moduleCount - 1; 0 < h; h -= 2)
				for (6 == h && h--;;) {
					for (var l = 0; 2 > l; l++)
						if (null == this.modules[d][h - l]) {
							var g = !1;
							f < a.length && (g = 1 == (a[f] >>> e & 1));
							U.getMask(b, d, h - l) && (g = !g);
							this.modules[d][h - l] = g;
							e--; - 1 == e && (f++, e = 7)
						}
					d += c;
					if (0 > d || this.moduleCount <= d) {
						d -= c;
						c = -c;
						break
					}
				}
		}
	};
	oa.PAD0 = 236;
	oa.PAD1 = 17;
	oa.createData = function(a, b, c) {
		for (var b = fa.getRSBlocks(a,
			b), d = new Db, e = 0; e < c.length; e++) {
			var f = c[e];
			d.put(f.mode, 4);
			d.put(f.getLength(), U.getLengthInBits(f.mode, a));
			f.write(d)
		}
		for (e = a = 0; e < b.length; e++) a += b[e].dataCount;
		if (d.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + d.getLengthInBits() + ">" + 8 * a + ")");
		for (d.getLengthInBits() + 4 <= 8 * a && d.put(0, 4); 0 != d.getLengthInBits() % 8;) d.putBit(!1);
		for (; !(d.getLengthInBits() >= 8 * a);) {
			d.put(oa.PAD0, 8);
			if (d.getLengthInBits() >= 8 * a) break;
			d.put(oa.PAD1, 8)
		}
		return oa.createBytes(d, b)
	};
	oa.createBytes = function(a, b) {
		for (var c =
			0, d = 0, e = 0, f = Array(b.length), h = Array(b.length), l = 0; l < b.length; l++) {
			var g = b[l].dataCount,
				j = b[l].totalCount - g,
				d = Math.max(d, g),
				e = Math.max(e, j);
			f[l] = Array(g);
			for (var k = 0; k < f[l].length; k++) f[l][k] = 255 & a.buffer[k + c];
			c += g;
			k = U.getErrorCorrectPolynomial(j);
			g = (new Ja(f[l], k.getLength() - 1)).mod(k);
			h[l] = Array(k.getLength() - 1);
			for (k = 0; k < h[l].length; k++) j = k + g.getLength() - h[l].length, h[l][k] = 0 <= j ? g.get(j) : 0
		}
		for (k = l = 0; k < b.length; k++) l += b[k].totalCount;
		c = Array(l);
		for (k = g = 0; k < d; k++)
			for (l = 0; l < b.length; l++) k < f[l].length &&
				(c[g++] = f[l][k]);
		for (k = 0; k < e; k++)
			for (l = 0; l < b.length; l++) k < h[l].length && (c[g++] = h[l][k]);
		return c
	};
	for (var Z = {
		MODE_NUMBER: 1,
		MODE_ALPHA_NUM: 2,
		MODE_8BIT_BYTE: 4,
		MODE_KANJI: 8
	}, la = {
			L: 1,
			M: 0,
			Q: 3,
			H: 2
		}, U = {
			PATTERN_POSITION_TABLE: [
				[],
				[6, 18],
				[6, 22],
				[6, 26],
				[6, 30],
				[6, 34],
				[6, 22, 38],
				[6, 24, 42],
				[6, 26, 46],
				[6, 28, 50],
				[6, 30, 54],
				[6, 32, 58],
				[6, 34, 62],
				[6, 26, 46, 66],
				[6, 26, 48, 70],
				[6, 26, 50, 74],
				[6, 30, 54, 78],
				[6, 30, 56, 82],
				[6, 30, 58, 86],
				[6, 34, 62, 90],
				[6, 28, 50, 72, 94],
				[6, 26, 50, 74, 98],
				[6, 30, 54, 78, 102],
				[6, 28, 54, 80, 106],
				[6, 32, 58, 84, 110],
				[6, 30, 58, 86, 114],
				[6, 34, 62, 90, 118],
				[6, 26, 50, 74, 98, 122],
				[6, 30, 54, 78, 102, 126],
				[6, 26, 52, 78, 104, 130],
				[6, 30, 56, 82, 108, 134],
				[6, 34, 60, 86, 112, 138],
				[6, 30, 58, 86, 114, 142],
				[6, 34, 62, 90, 118, 146],
				[6, 30, 54, 78, 102, 126, 150],
				[6, 24, 50, 76, 102, 128, 154],
				[6, 28, 54, 80, 106, 132, 158],
				[6, 32, 58, 84, 110, 136, 162],
				[6, 26, 54, 82, 110, 138, 166],
				[6, 30, 58, 86, 114, 142, 170]
			],
			G15: 1335,
			G18: 7973,
			G15_MASK: 21522,
			getBCHTypeInfo: function(a) {
				for (var b = a << 10; 0 <= U.getBCHDigit(b) - U.getBCHDigit(U.G15);) b ^= U.G15 << U.getBCHDigit(b) - U.getBCHDigit(U.G15);
				return (a <<
					10 | b) ^ U.G15_MASK
			},
			getBCHTypeNumber: function(a) {
				for (var b = a << 12; 0 <= U.getBCHDigit(b) - U.getBCHDigit(U.G18);) b ^= U.G18 << U.getBCHDigit(b) - U.getBCHDigit(U.G18);
				return a << 12 | b
			},
			getBCHDigit: function(a) {
				for (var b = 0; 0 != a;) b++, a >>>= 1;
				return b
			},
			getPatternPosition: function(a) {
				return U.PATTERN_POSITION_TABLE[a - 1]
			},
			getMask: function(a, b, c) {
				switch (a) {
					case 0:
						return 0 == (b + c) % 2;
					case 1:
						return 0 == b % 2;
					case 2:
						return 0 == c % 3;
					case 3:
						return 0 == (b + c) % 3;
					case 4:
						return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2;
					case 5:
						return 0 == b * c %
							2 + b * c % 3;
					case 6:
						return 0 == (b * c % 2 + b * c % 3) % 2;
					case 7:
						return 0 == (b * c % 3 + (b + c) % 2) % 2;
					default:
						throw Error("bad maskPattern:" + a);
				}
			},
			getErrorCorrectPolynomial: function(a) {
				for (var b = new Ja([1], 0), c = 0; c < a; c++) b = b.multiply(new Ja([1, ga.gexp(c)], 0));
				return b
			},
			getLengthInBits: function(a, b) {
				if (1 <= b && 10 > b) switch (a) {
					case Z.MODE_NUMBER:
						return 10;
					case Z.MODE_ALPHA_NUM:
						return 9;
					case Z.MODE_8BIT_BYTE:
						return 8;
					case Z.MODE_KANJI:
						return 8;
					default:
						throw Error("mode:" + a);
				} else if (27 > b) switch (a) {
					case Z.MODE_NUMBER:
						return 12;
					case Z.MODE_ALPHA_NUM:
						return 11;
					case Z.MODE_8BIT_BYTE:
						return 16;
					case Z.MODE_KANJI:
						return 10;
					default:
						throw Error("mode:" + a);
				} else if (41 > b) switch (a) {
					case Z.MODE_NUMBER:
						return 14;
					case Z.MODE_ALPHA_NUM:
						return 13;
					case Z.MODE_8BIT_BYTE:
						return 16;
					case Z.MODE_KANJI:
						return 12;
					default:
						throw Error("mode:" + a);
				} else throw Error("type:" + b);
			},
			getLostPoint: function(a) {
				for (var b = a.getModuleCount(), c = 0, d = 0; d < b; d++)
					for (var e = 0; e < b; e++) {
						for (var f = 0, h = a.isDark(d, e), l = -1; 1 >= l; l++)
							if (!(0 > d + l || b <= d + l))
								for (var g = -1; 1 >= g; g++) 0 > e + g || b <= e + g || 0 == l && 0 == g || h ==
									a.isDark(d + l, e + g) && f++;
						5 < f && (c += 3 + f - 5)
					}
				for (d = 0; d < b - 1; d++)
					for (e = 0; e < b - 1; e++)
						if (f = 0, a.isDark(d, e) && f++, a.isDark(d + 1, e) && f++, a.isDark(d, e + 1) && f++, a.isDark(d + 1, e + 1) && f++, 0 == f || 4 == f) c += 3;
				for (d = 0; d < b; d++)
					for (e = 0; e < b - 6; e++) a.isDark(d, e) && (!a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6)) && (c += 40);
				for (e = 0; e < b; e++)
					for (d = 0; d < b - 6; d++) a.isDark(d, e) && (!a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e)) && (c +=
						40);
				for (e = f = 0; e < b; e++)
					for (d = 0; d < b; d++) a.isDark(d, e) && f++;
				a = Math.abs(100 * f / b / b - 50) / 5;
				return c + 10 * a
			}
		}, ga = {
			glog: function(a) {
				if (1 > a) throw Error("glog(" + a + ")");
				return ga.LOG_TABLE[a]
			},
			gexp: function(a) {
				for (; 0 > a;) a += 255;
				for (; 256 <= a;) a -= 255;
				return ga.EXP_TABLE[a]
			},
			EXP_TABLE: Array(256),
			LOG_TABLE: Array(256)
		}, Y = 0; 8 > Y; Y++) ga.EXP_TABLE[Y] = 1 << Y;
	for (Y = 8; 256 > Y; Y++) ga.EXP_TABLE[Y] = ga.EXP_TABLE[Y - 4] ^ ga.EXP_TABLE[Y - 5] ^ ga.EXP_TABLE[Y - 6] ^ ga.EXP_TABLE[Y - 8];
	for (Y = 0; 255 > Y; Y++) ga.LOG_TABLE[ga.EXP_TABLE[Y]] = Y;
	Ja.prototype = {
		get: function(a) {
			return this.num[a]
		},
		getLength: function() {
			return this.num.length
		},
		multiply: function(a) {
			for (var b = Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++)
				for (var d = 0; d < a.getLength(); d++) b[c + d] ^= ga.gexp(ga.glog(this.get(c)) + ga.glog(a.get(d)));
			return new Ja(b, 0)
		},
		mod: function(a) {
			if (0 > this.getLength() - a.getLength()) return this;
			for (var b = ga.glog(this.get(0)) - ga.glog(a.get(0)), c = Array(this.getLength()), d = 0; d < this.getLength(); d++) c[d] = this.get(d);
			for (d = 0; d < a.getLength(); d++) c[d] ^=
				ga.gexp(ga.glog(a.get(d)) + b);
			return (new Ja(c, 0)).mod(a)
		}
	};
	fa.RS_BLOCK_TABLE = [
		[1, 26, 19],
		[1, 26, 16],
		[1, 26, 13],
		[1, 26, 9],
		[1, 44, 34],
		[1, 44, 28],
		[1, 44, 22],
		[1, 44, 16],
		[1, 70, 55],
		[1, 70, 44],
		[2, 35, 17],
		[2, 35, 13],
		[1, 100, 80],
		[2, 50, 32],
		[2, 50, 24],
		[4, 25, 9],
		[1, 134, 108],
		[2, 67, 43],
		[2, 33, 15, 2, 34, 16],
		[2, 33, 11, 2, 34, 12],
		[2, 86, 68],
		[4, 43, 27],
		[4, 43, 19],
		[4, 43, 15],
		[2, 98, 78],
		[4, 49, 31],
		[2, 32, 14, 4, 33, 15],
		[4, 39, 13, 1, 40, 14],
		[2, 121, 97],
		[2, 60, 38, 2, 61, 39],
		[4, 40, 18, 2, 41, 19],
		[4, 40, 14, 2, 41, 15],
		[2, 146, 116],
		[3, 58, 36, 2, 59, 37],
		[4, 36, 16, 4, 37, 17],
		[4, 36, 12, 4, 37, 13],
		[2, 86, 68, 2, 87, 69],
		[4, 69, 43, 1, 70, 44],
		[6, 43, 19, 2, 44, 20],
		[6, 43, 15, 2, 44, 16],
		[4, 101, 81],
		[1, 80, 50, 4, 81, 51],
		[4, 50, 22, 4, 51, 23],
		[3, 36, 12, 8, 37, 13],
		[2, 116, 92, 2, 117, 93],
		[6, 58, 36, 2, 59, 37],
		[4, 46, 20, 6, 47, 21],
		[7, 42, 14, 4, 43, 15],
		[4, 133, 107],
		[8, 59, 37, 1, 60, 38],
		[8, 44, 20, 4, 45, 21],
		[12, 33, 11, 4, 34, 12],
		[3, 145, 115, 1, 146, 116],
		[4, 64, 40, 5, 65, 41],
		[11, 36, 16, 5, 37, 17],
		[11, 36, 12, 5, 37, 13],
		[5, 109, 87, 1, 110, 88],
		[5, 65, 41, 5, 66, 42],
		[5, 54, 24, 7, 55, 25],
		[11, 36, 12],
		[5, 122, 98, 1, 123, 99],
		[7, 73, 45, 3, 74, 46],
		[15, 43, 19, 2, 44, 20],
		[3,
			45, 15, 13, 46, 16
		],
		[1, 135, 107, 5, 136, 108],
		[10, 74, 46, 1, 75, 47],
		[1, 50, 22, 15, 51, 23],
		[2, 42, 14, 17, 43, 15],
		[5, 150, 120, 1, 151, 121],
		[9, 69, 43, 4, 70, 44],
		[17, 50, 22, 1, 51, 23],
		[2, 42, 14, 19, 43, 15],
		[3, 141, 113, 4, 142, 114],
		[3, 70, 44, 11, 71, 45],
		[17, 47, 21, 4, 48, 22],
		[9, 39, 13, 16, 40, 14],
		[3, 135, 107, 5, 136, 108],
		[3, 67, 41, 13, 68, 42],
		[15, 54, 24, 5, 55, 25],
		[15, 43, 15, 10, 44, 16],
		[4, 144, 116, 4, 145, 117],
		[17, 68, 42],
		[17, 50, 22, 6, 51, 23],
		[19, 46, 16, 6, 47, 17],
		[2, 139, 111, 7, 140, 112],
		[17, 74, 46],
		[7, 54, 24, 16, 55, 25],
		[34, 37, 13],
		[4, 151, 121, 5, 152, 122],
		[4, 75, 47, 14, 76,
			48
		],
		[11, 54, 24, 14, 55, 25],
		[16, 45, 15, 14, 46, 16],
		[6, 147, 117, 4, 148, 118],
		[6, 73, 45, 14, 74, 46],
		[11, 54, 24, 16, 55, 25],
		[30, 46, 16, 2, 47, 17],
		[8, 132, 106, 4, 133, 107],
		[8, 75, 47, 13, 76, 48],
		[7, 54, 24, 22, 55, 25],
		[22, 45, 15, 13, 46, 16],
		[10, 142, 114, 2, 143, 115],
		[19, 74, 46, 4, 75, 47],
		[28, 50, 22, 6, 51, 23],
		[33, 46, 16, 4, 47, 17],
		[8, 152, 122, 4, 153, 123],
		[22, 73, 45, 3, 74, 46],
		[8, 53, 23, 26, 54, 24],
		[12, 45, 15, 28, 46, 16],
		[3, 147, 117, 10, 148, 118],
		[3, 73, 45, 23, 74, 46],
		[4, 54, 24, 31, 55, 25],
		[11, 45, 15, 31, 46, 16],
		[7, 146, 116, 7, 147, 117],
		[21, 73, 45, 7, 74, 46],
		[1, 53, 23, 37, 54,
			24
		],
		[19, 45, 15, 26, 46, 16],
		[5, 145, 115, 10, 146, 116],
		[19, 75, 47, 10, 76, 48],
		[15, 54, 24, 25, 55, 25],
		[23, 45, 15, 25, 46, 16],
		[13, 145, 115, 3, 146, 116],
		[2, 74, 46, 29, 75, 47],
		[42, 54, 24, 1, 55, 25],
		[23, 45, 15, 28, 46, 16],
		[17, 145, 115],
		[10, 74, 46, 23, 75, 47],
		[10, 54, 24, 35, 55, 25],
		[19, 45, 15, 35, 46, 16],
		[17, 145, 115, 1, 146, 116],
		[14, 74, 46, 21, 75, 47],
		[29, 54, 24, 19, 55, 25],
		[11, 45, 15, 46, 46, 16],
		[13, 145, 115, 6, 146, 116],
		[14, 74, 46, 23, 75, 47],
		[44, 54, 24, 7, 55, 25],
		[59, 46, 16, 1, 47, 17],
		[12, 151, 121, 7, 152, 122],
		[12, 75, 47, 26, 76, 48],
		[39, 54, 24, 14, 55, 25],
		[22, 45, 15, 41,
			46, 16
		],
		[6, 151, 121, 14, 152, 122],
		[6, 75, 47, 34, 76, 48],
		[46, 54, 24, 10, 55, 25],
		[2, 45, 15, 64, 46, 16],
		[17, 152, 122, 4, 153, 123],
		[29, 74, 46, 14, 75, 47],
		[49, 54, 24, 10, 55, 25],
		[24, 45, 15, 46, 46, 16],
		[4, 152, 122, 18, 153, 123],
		[13, 74, 46, 32, 75, 47],
		[48, 54, 24, 14, 55, 25],
		[42, 45, 15, 32, 46, 16],
		[20, 147, 117, 4, 148, 118],
		[40, 75, 47, 7, 76, 48],
		[43, 54, 24, 22, 55, 25],
		[10, 45, 15, 67, 46, 16],
		[19, 148, 118, 6, 149, 119],
		[18, 75, 47, 31, 76, 48],
		[34, 54, 24, 34, 55, 25],
		[20, 45, 15, 61, 46, 16]
	];
	fa.getRSBlocks = function(a, b) {
		var c = fa.getRsBlockTable(a, b);
		if (c == ca) throw Error("bad rs block @ typeNumber:" +
			a + "/errorCorrectLevel:" + b);
		for (var d = c.length / 3, e = [], f = 0; f < d; f++)
			for (var h = c[3 * f + 0], l = c[3 * f + 1], g = c[3 * f + 2], j = 0; j < h; j++) e.push(new fa(l, g));
		return e
	};
	fa.getRsBlockTable = function(a, b) {
		switch (b) {
			case la.L:
				return fa.RS_BLOCK_TABLE[4 * (a - 1) + 0];
			case la.M:
				return fa.RS_BLOCK_TABLE[4 * (a - 1) + 1];
			case la.Q:
				return fa.RS_BLOCK_TABLE[4 * (a - 1) + 2];
			case la.H:
				return fa.RS_BLOCK_TABLE[4 * (a - 1) + 3];
			default:
				return ca
		}
	};
	Db.prototype = {
		get: function(a) {
			return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
		},
		put: function(a, b) {
			for (var c =
				0; c < b; c++) this.putBit(1 == (a >>> b - c - 1 & 1))
		},
		getLengthInBits: function() {
			return this.length
		},
		putBit: function(a) {
			var b = Math.floor(this.length / 8);
			this.buffer.length <= b && this.buffer.push(0);
			a && (this.buffer[b] |= 128 >>> this.length % 8);
			this.length++
		}
	};
	var Ka = [
		[17, 14, 11, 7],
		[32, 26, 20, 14],
		[53, 42, 32, 24],
		[78, 62, 46, 34],
		[106, 84, 60, 44],
		[134, 106, 74, 58],
		[154, 122, 86, 64],
		[192, 152, 108, 84],
		[230, 180, 130, 98],
		[271, 213, 151, 119],
		[321, 251, 177, 137],
		[367, 287, 203, 155],
		[425, 331, 241, 177],
		[458, 362, 258, 194],
		[520, 412, 292, 220],
		[586, 450, 322,
			250
		],
		[644, 504, 364, 280],
		[718, 560, 394, 310],
		[792, 624, 442, 338],
		[858, 666, 482, 382],
		[929, 711, 509, 403],
		[1003, 779, 565, 439],
		[1091, 857, 611, 461],
		[1171, 911, 661, 511],
		[1273, 997, 715, 535],
		[1367, 1059, 751, 593],
		[1465, 1125, 805, 625],
		[1528, 1190, 868, 658],
		[1628, 1264, 908, 698],
		[1732, 1370, 982, 742],
		[1840, 1452, 1030, 790],
		[1952, 1538, 1112, 842],
		[2068, 1628, 1168, 898],
		[2188, 1722, 1228, 958],
		[2303, 1809, 1283, 983],
		[2431, 1911, 1351, 1051],
		[2563, 1989, 1423, 1093],
		[2699, 2099, 1499, 1139],
		[2809, 2213, 1579, 1219],
		[2953, 2331, 1663, 1273]
	],
		pb = function(a,
			b) {
			this._el = a;
			this._htOption = b
		};
	pb.prototype.draw = function(a) {
		function b(a, b) {
			var c = document.createElementNS("http://www.w3.org/2000/svg", a),
				d;
			for (d in b) b.hasOwnProperty(d) && c.setAttribute(d, b[d]);
			return c
		}
		var c = this._htOption,
			d = this._el,
			e = a.getModuleCount();
		this.clear();
		var f = b("svg", {
			viewBox: "0 0 " + String(e) + " " + String(e),
			width: "100%",
			height: "100%",
			fill: c.colorLight
		});
		f.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
		d.appendChild(f);
		f.appendChild(b("rect", {
			fill: c.colorDark,
			width: "1",
			height: "1",
			id: "template"
		}));
		for (c = 0; c < e; c++)
			for (d = 0; d < e; d++)
				if (a.isDark(c, d)) {
					var h = b("use", {
						x: String(c),
						y: String(d)
					});
					h.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template");
					f.appendChild(h)
				}
	};
	pb.prototype.clear = function() {
		for (; this._el.hasChildNodes();) this._el.removeChild(this._el.lastChild)
	};
	var qb;
	if ("svg" === document.documentElement.tagName.toLowerCase()) qb = pb;
	else {
		var rb;
		if ("undefined" == typeof CanvasRenderingContext2D) {
			var sb = function(a, b) {
				this._el = a;
				this._htOption = b
			};
			sb.prototype.draw = function(a) {
				for (var b = this._htOption, c = this._el, d = a.getModuleCount(), e = Math.floor(b.width / d), f = Math.floor(b.height / d), h = ['<table style="border:0;border-collapse:collapse;">'], l = 0; l < d; l++) {
					h.push("<tr>");
					for (var g = 0; g < d; g++) h.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + e + "px;height:" + f + "px;background-color:" + (a.isDark(l, g) ? b.colorDark : b.colorLight) + ';"></td>');
					h.push("</tr>")
				}
				h.push("</table>");
				c.innerHTML = h.join("");
				a = c.childNodes[0];
				c = (b.width - a.offsetWidth) / 2;
				b = (b.height - a.offsetHeight) / 2;
				0 < c && 0 < b && (a.style.margin = b + "px " + c + "px")
			};
			sb.prototype.clear = function() {
				this._el.innerHTML = ""
			};
			rb = sb
		} else rb = function() {
			function a() {
				this._elImage.src = this._elCanvas.toDataURL("image/png");
				this._elImage.style.display = "block";
				this._elCanvas.style.display = "none"
			}
			if (this._android && 2.1 >= this._android) {
				var b = 1 / window.devicePixelRatio,
					c = CanvasRenderingContext2D.prototype.drawImage;
				CanvasRenderingContext2D.prototype.drawImage = function(a, d, h, l, g,
					j, k, m, r) {
					if ("nodeName" in a && /img/i.test(a.nodeName))
						for (var p = arguments.length - 1; 1 <= p; p--) arguments[p] *= b;
					else "undefined" == typeof m && (arguments[1] *= b, arguments[2] *= b, arguments[3] *= b, arguments[4] *= b);
					c.apply(this, arguments)
				}
			}
			var d = function(a, b) {
				this._bIsPainted = !1;
				this._android = Eb();
				this._htOption = b;
				this._elCanvas = document.createElement("canvas");
				this._elCanvas.width = b.width;
				this._elCanvas.height = b.height;
				a.appendChild(this._elCanvas);
				this._el = a;
				this._oContext = this._elCanvas.getContext("2d");
				this._bIsPainted = !1;
				this._elImage = document.createElement("img");
				this._elImage.style.display = "none";
				this._el.appendChild(this._elImage);
				this._bSupportDataURI = null
			};
			d.prototype.draw = function(a) {
				var b = this._elImage,
					c = this._oContext,
					d = this._htOption,
					g = a.getModuleCount(),
					j = d.width / g,
					k = d.height / g,
					m = Math.round(j),
					p = Math.round(k);
				b.style.display = "none";
				this.clear();
				for (b = 0; b < g; b++)
					for (var r = 0; r < g; r++) {
						var t = a.isDark(b, r),
							s = r * j,
							u = b * k;
						c.strokeStyle = t ? d.colorDark : d.colorLight;
						c.lineWidth = 1;
						c.fillStyle = t ? d.colorDark : d.colorLight;
						c.fillRect(s, u, j, k);
						c.strokeRect(Math.floor(s) + 0.5, Math.floor(u) + 0.5, m, p);
						c.strokeRect(Math.ceil(s) - 0.5, Math.ceil(u) - 0.5, m, p)
					}
				this._bIsPainted = !0
			};
			d.prototype.makeImage = function() {
				if (this._bIsPainted) {
					var b = this;
					b._fFail = void 0;
					b._fSuccess = a;
					if (null === b._bSupportDataURI) {
						var c = document.createElement("img"),
							d = function() {
								b._bSupportDataURI = !1;
								b._fFail && _fFail.call(b)
							};
						c.onabort = d;
						c.onerror = d;
						c.onload = function() {
							b._bSupportDataURI = !0;
							b._fSuccess && b._fSuccess.call(b)
						};
						c.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
					} else !0 ===
						b._bSupportDataURI && b._fSuccess ? b._fSuccess.call(b) : !1 === b._bSupportDataURI && b._fFail && b._fFail.call(b)
				}
			};
			d.prototype.isPainted = function() {
				return this._bIsPainted
			};
			d.prototype.clear = function() {
				this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
				this._bIsPainted = !1
			};
			d.prototype.round = function(a) {
				return !a ? a : Math.floor(1E3 * a) / 1E3
			};
			return d
		}();
		qb = rb
	}
	var lc = qb;
	za = function(a, b) {
		this._htOption = {
			width: 256,
			height: 256,
			typeNumber: 4,
			colorDark: "#000000",
			colorLight: "#ffffff",
			correctLevel: la.H,
			showTitle: !1
		};
		"string" === typeof b && (b = {
			text: b
		});
		if (b)
			for (var c in b) this._htOption[c] = b[c];
		"string" == typeof a && (a = document.getElementById(a));
		this._android = Eb();
		this._el = a;
		this._oQRCode = null;
		this._oDrawing = new lc(this._el, this._htOption);
		this._htOption.text && this.makeCode(this._htOption.text)
	};
	za.prototype.makeCode = function(a) {
		var b = this._htOption.correctLevel,
			c = 1,
			d;
		d = encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
		d = d.length + (d.length != a ? 3 : 0);
		for (var e = 0, f = Ka.length; e <= f; e++) {
			var h = 0;
			switch (b) {
				case la.L:
					h =
						Ka[e][0];
					break;
				case la.M:
					h = Ka[e][1];
					break;
				case la.Q:
					h = Ka[e][2];
					break;
				case la.H:
					h = Ka[e][3]
			}
			if (d <= h) break;
			else c++
		}
		if (c > Ka.length) throw Error("Too long data");
		this._oQRCode = new oa(c, this._htOption.correctLevel);
		this._oQRCode.addData(a);
		this._oQRCode.make();
		this._htOption.showTitle && (this._el.title = a);
		this._oDrawing.draw(this._oQRCode);
		this.makeImage()
	};
	za.prototype.makeImage = function() {
		"function" == typeof this._oDrawing.makeImage && (!this._android || 3 <= this._android) && this._oDrawing.makeImage()
	};
	za.prototype.clear =
		function() {
			this._oDrawing.clear()
	};
	za.CorrectLevel = la;
	export_para_u || (export_para_u = {});
	var export_para_Q = export_para_u;
	export_para_Q.PageCache = function(a, b, c) {
		return c ? new export_para_Q.PageCache.async(a, b) : new export_para_Q.PageCache.sync(a, b)
	};
	export_para_Q.PageCache.sync = function(a, b) {
		0 != arguments.length && (this.page_no = -1, this.pager_total_entries = this.pager_total_pages = void 0, this.cache = [], "function" == typeof a ? (this.generator = a, this.generator_finished = !1) : (this.pager = a.get, this.pager_page_size = a.PageSize), this.page_size = b.PageSize)
	};
	export_para_Q.PageCache.sync.prototype = {
		next: function() {
			var a = [];
			this.hasNext() &&
				(this.page_no++, a = this.get(this.page_no + 1).Entries, 0 == a.length && this.page_no--);
			return a
		},
		previous: function() {
			var a = [];
			this.hasPrevious() && (this.page_no--, a = this.get(this.page_no + 1).Entries);
			return a
		},
		hasNext: function() {
			var a = this.getTotalPages();
			return isNaN(a) ? !0 : this.page_no + 1 < a
		},
		hasPrevious: function() {
			return 0 < this.page_no
		},
		getTotalPages: function() {
			var a;
			if (this.pager) {
				if ("undefined" == typeof this.pager_total_pages) return NaN;
				a = "undefined" == typeof this.pager_total_entries ? "undefined" != typeof this.cache[this.pager_total_pages -
					1] ? (this.pager_total_pages - 1) * this.pager_page_size + this.cache[this.pager_total_pages - 1].Entries.length : this.pager_total_pages * this.pager_page_size : this.pager_total_entries
			} else if (this.generator_finished) a = this.cache.length;
			else return NaN;
			return Math.ceil(a / this.page_size)
		},
		get: function(a) {
			a = parseInt(a);
			if (isNaN(a) || 1 > a) a = 1;
			var b = [],
				c = (a - 1) * this.page_size,
				a = a * this.page_size;
			if (this.pager) {
				for (var d = Math.floor(c / this.pager_page_size), e = Math.ceil(a / this.pager_page_size), f = d; f < e; f++) {
					"undefined" == typeof this.cache[f] &&
						(this.cache[f] = this.pager(f + 1));
					var h = this.pager_page_size * f;
					b.push.apply(b, this.cache[f].Entries.slice(h >= c ? 0 : c - h, h + this.pager_page_size > a ? a - h : this.pager_page_size));
					"undefined" == typeof this.pager_total_pages && (this.pager_total_pages = this.cache[f].TotalPages);
					e = Math.min(e, this.pager_total_pages)
				}
				"undefined" != typeof this.cache[d] && this.cache[d].TotalEntries && (this.pager_total_entries = this.cache[d].TotalEntries)
			} else {
				for (; !this.generator_finished && this.cache.length < a;) b = this.generator(), 0 == b.length &&
					(this.generator_finished = !0), this.cache.push.apply(this.cache, b);
				b = this.cache.slice(c, a)
			}
			return {
				TotalPages: this.getTotalPages(),
				Entries: b
			}
		},
		reset: function() {
			this.page_no = -1
		}
	};
	export_para_Q.PageCache.async = function(a, b) {
		export_para_Q.PageCache.sync.call(this, a, b)
	};
	export_para_Q.PageCache.async.prototype = new export_para_Q.PageCache.sync;
	export_para_Q.PageCache.async.prototype.constructor = export_para_Q.PageCache.async;
	export_para_Q.PageCache.async.prototype.next = function(a) {
		if (this.hasNext()) {
			this.page_no++;
			var b = this;
			this.get(this.page_no + 1, function(c) {
				c = c.Entries;
				0 == c.length && b.page_no--;
				a(c)
			})
		} else a([])
	};
	export_para_Q.PageCache.async.prototype.previous = function(a) {
		this.hasPrevious() ? (this.page_no--, this.get(this.page_no + 1, function(b) {
			a(b.Entries)
		})) : a([])
	};
	export_para_Q.PageCache.async.prototype.get = function(a, b) {
		var c = this,
			a = parseInt(a);
		if (isNaN(a) || 1 > a) a = 1;
		var d = (a - 1) * this.page_size,
			e = a * this.page_size,
			f = [],
			h = function() {
				b({
					TotalPages: c.getTotalPages(),
					Entries: f
				}, a)
			};
		if (this.pager) {
			var l = Math.floor(d / this.pager_page_size),
				g = Math.ceil(e / this.pager_page_size),
				j = function(a, b) {
					if (a >= g) "undefined" != typeof c.cache[l] &&
						c.cache[l].TotalEntries && (c.pager_total_entries = c.cache[l].TotalEntries), h();
					else {
						var f = function(a, f) {
							a -= 1;
							c.cache[a] = f;
							var h = c.pager_page_size * a;
							b.push.apply(b, c.cache[a].Entries.slice(h >= d ? 0 : d - h, h + c.pager_page_size > e ? e - h : c.pager_page_size));
							"undefined" == typeof c.pager_total_pages && (c.pager_total_pages = c.cache[a].TotalPages);
							g = Math.min(g, c.pager_total_pages);
							j(a + 1, b)
						};
						"undefined" == typeof c.cache[a] ? c.pager(a + 1, f) : f(a + 1, c.cache[a])
					}
				};
			j(l, f)
		} else if (!this.generator_finished && this.cache.length < e) {
			var k =
				function(a) {
					a && 0 == a.length && (c.generator_finished = !0);
					c.cache.push.apply(c.cache, a);
					!c.generator_finished && c.cache.length < e ? c.generator(k) : (f = c.cache.slice(d, e), h())
			};
			this.generator(k)
		} else f = c.cache.slice(d, e), h()
	};
	var export_para_G = export_para_u;
	export_para_G.filterChain = function() {
		this.index = -1;
		this.chain = 0 < arguments.length ? arguments : []
	};
	export_para_G.filterChain.prototype.register = function(a) {
		this.chain.push(a)
	};
	export_para_G.filterChain.prototype.run = function() {
		this.index++;
		this.index < this.chain.length && this.chain[this.index].run(this)
	};
	export_para_G.i18n = {
		locale: "en",
		messages: {
			zh: {
				see_detail: "\u8be6\u60c5",
				no_results: "\u62b1\u6b49\uff01\u6ca1\u6709\u627e\u5230\u76f8\u5173\u7684\u5546\u54c1",
				hide: "\u9690\u85cf",
				show: "\u663e\u793a",
				feedback: "\u53cd\u9988",
				shoppingassist: "\u5982\u610f\u6dd8",
				settings: "\u9009\u9879",
				feedback_url: "http://ruyi.taobao.com/feedback",
				choose_at_least_one: "\u8bf7\u81f3\u5c11\u9009\u4e2d\u4e00\u4e2a\u641c\u7d22\u7f51\u7ad9",
				homepage: "\u5b98\u65b9\u7f51\u7ad9",
				search: "\u641c\u7d22",
				search_engine_setting: "\u641c\u7d22\u5546\u57ce\u8bbe\u7f6e",
				search_engine_setting_title: "\u641c\u7d22\u5546\u57ce",
				search_engine_setting_commit: "\u5b8c\u6210",
				no_products: "\u62b1\u6b49\uff01\u6ca1\u6709\u627e\u5230\u76f8\u5173\u7684\u5546\u54c1",
				search_engine_setting_msg: "\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u5546\u57ce\u3002",
				search_product_in: '\u5728${1}\u641c\u7d22"${2}"',
				click_to_hide: "\u70b9\u51fb\u9690\u85cf\u641c\u7d22\u7ed3\u679c",
				expand: "\u5c55\u5f00",
				shrink: "\u6536\u8d77",
				close: "\u5173\u95ed",
				hide_searchbox: "\u9690\u85cf\u641c\u7d22\u6846"
			},
			en: {
				see_detail: "See Detail",
				no_results: "sorry, no results",
				hide: "Hide",
				show: "Show",
				feedback: "Feedback",
				settings: "Options",
				shoppingassist: "Shopping Assistant",
				homepage: "Homepage",
				choose_at_least_one: "Please select at least one search site",
				feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ",
				expand: "Expand",
				collapse: "Collapse",
				close: "Close",
				search: "Search",
				search_engine_setting: "Customize",
				search_engine_setting_title: "Search On",
				search_engine_setting_commit: "OK",
				no_products: "Oops, no results",
				search_engine_setting_msg: "Please select at least one site.",
				search_product_in: 'Search "${2}" at ${1}',
				click_to_hide: "Click to hide",
				shrink: "Shrink",
				hide_searchbox: "Hide searchbox"
			},
			fr: {
				see_detail: "Voir le d\u00e9tail",
				no_results: "D\u00e9sol\u00e9, aucun r\u00e9sultat",
				hide: "Hide",
				show: "Show",
				feedback: "Feedback",
				settings: "Options",
				shoppingassist: "Shopping Assistant",
				homepage: "Homepage",
				choose_at_least_one: "Merci de s\u00e9lectionner au moins un site de recherche",
				feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ",
				expand: "Expand",
				collapse: "Collapse",
				close: "Close",
				search: "Search",
				search_engine_setting: "Customize",
				search_engine_setting_title: "Search On",
				search_engine_setting_commit: "OK",
				no_products: "Oops, no results",
				search_engine_setting_msg: "Please select at least one site.",
				search_product_in: 'Search "${2}" at ${1}',
				click_to_hide: "Click to hide",
				shrink: "Shrink",
				hide_searchbox: "Hide searchbox"
			},
			it: {
				see_detail: "Vedi dettagli",
				no_results: "Spiacenti, nessun risultato",
				hide: "Hide",
				show: "Show",
				feedback: "Feedback",
				settings: "Opzioni",
				shoppingassist: "Shopping Assistant",
				homepage: "Homepage",
				choose_at_least_one: "Prego, selezionare almeno un sito di ricerca",
				feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ",
				expand: "Expand",
				collapse: "Collapse",
				close: "Close",
				search: "Search",
				search_engine_setting: "Customize",
				search_engine_setting_title: "Search On",
				search_engine_setting_commit: "OK",
				no_products: "Oops, no results",
				search_engine_setting_msg: "Please select at least one site.",
				search_product_in: 'Search "${2}" at ${1}',
				click_to_hide: "Click to hide",
				shrink: "Shrink",
				hide_searchbox: "Hide searchbox"
			},
			de: {
				see_detail: "Details anschauen",
				no_results: "Entschuldigung, keine Suchergebnisse",
				hide: "Verstecken",
				show: "Zeigen",
				feedback: "Reaktion",
				settings: "Optionen",
				shoppingassist: "Shopping Assistant",
				homepage: "Startseite",
				choose_at_least_one: "Bitte w\u00e4hlen Sie mindestens eine Seite zum Durchsuchen aus",
				feedback_url: "http://spreadsheets.google.com/viewform?hl=en&formkey=dFhZVkE5ZC1veFk4YzRfVnpDRGtkTWc6MQ",
				expand: "Erweitern",
				collapse: "Zusammenbruch",
				close: "in der N\u00e4he",
				search: "Search",
				search_engine_setting: "Customize",
				search_engine_setting_title: "Search On",
				search_engine_setting_commit: "OK",
				no_products: "Oops, no results",
				search_engine_setting_msg: "Please select at least one site.",
				search_product_in: 'Search "${2}" at ${1}',
				click_to_hide: "Click to hide",
				shrink: "Shrink",
				hide_searchbox: "Hide searchbox"
			}
		},
		setLocale: function(a) {
			a in this.messages && (this.locale = a)
		},
		getLocale: function() {
			return this.locale
		},
		getMessage: function() {
			var a = arguments,
				b = a[0],
				c = "";
			b in this.messages[this.locale] && (c = this.messages[this.locale][b], 1 < a.length && (c = c.replace(/\$\{\d\}/g, function(b) {
				b = b.substring(2, 3);
				return a[b]
			})));
			return c
		}
	};
	export_para_G.extend = function(a, b, c, d) {
		if (!a || !b) return a;
		void 0 === c && (c = !0);
		var e, f, h;
		if (d && (h = d.length))
			for (e = 0; e < h; e++) {
				if (f = d[e], f in b && (c || !(f in a))) a[f] = b[f]
			} else
				for (f in b)
					if (c || !(f in a)) a[f] = b[f];
		return a
	};
	export_para_G.debounce = function(a, b, c) {
		var d;
		return function() {
			var e = this,
				f = arguments;
			d ? clearTimeout(d) :
				c && a.apply(e, f);
			d = setTimeout(function() {
				c || a.apply(e, f);
				d = null
			}, b || 100)
		}
	};
	export_para_G.str_repeat = function(a, b) {
		for (var c = []; 0 < b; c[--b] = a);
		return c.join("")
	};
	export_para_G.sprintf = function() {
		for (var a = 0, b, c = arguments[a++], d = [], e, f, h; c;) {
			if (e = /^[^\x25]+/.exec(c)) d.push(e[0]);
			else if (e = /^\x25{2}/.exec(c)) d.push("%");
			else if (e = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(c)) {
				if (null == (b = arguments[e[1] || a++]) || void 0 == b) throw "Too few arguments.";
				if (/[^s]/.test(e[7]) && "number" != typeof b) throw "Expecting number but found " +
					typeof b;
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
				f = e[3] ? "0" == e[3] ? "0" :
					e[3].charAt(1) : " ";
				h = e[5] - String(b).length - 0;
				f = e[5] ? export_para_G.str_repeat(f, h) : "";
				d.push("" + (e[4] ? b + f : f + b))
			} else throw "Huh ?!";
			c = c.substring(e[0].length)
		}
		return d.join("")
	};
	export_para_G.format_price = function(a, b) {
		if (0 >= a) return "";
		var c = "",
			c = export_para_G.sprintf("%.2f", a / 100);
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
	export_para_G.get_cookie = function(a) {
		for (var b = document.cookie.split("; "), c = 0, d; d = b[c] && b[c].split("="); c++)
			if (d[0] ===
				a) return d[1] || ""
	};
	var tb = {}, Fb = {}, Gb = function() {
			var a = String.fromCharCode(Math.floor(25 * Math.random() + 97)) + Math.floor(134217728 * Math.random()).toString(36);
			if ("undefined" != typeof Fb[a]) return Gb();
			Fb[a] = !0;
			return a
		};
	export_para_G.transform_selector = function(a) {
		return "undefined" != typeof tb[a] ? tb[a] : tb[a] = "" + Gb()
	};
	export_para_G.isNumeric = function(a) {
		return !isNaN(parseFloat(a)) && isFinite(a)
	};
	export_para_G.checkAndRun = function(a) {
		export_para_G.browser.extension.sendRequest({
			topic: "page_signature"
		}, function(b) {
			document.body.getAttribute(b) || (document.body.setAttribute(b,
				1), a())
		})
	};
	var export_para_Hb = export_para_u,
		Ib = function(a, b) {
			this.value = a;
			this.encoding = "undefined" == typeof b ? (document.charset || document.characterSet || "").toLowerCase() : b
		};
	Ib.prototype = {
		toString: function() {
			return this.value
		},
		containMultbyteChar: function(a) {
			for (var b = 0, c = a.length; b < c; b++)
				if (128 < a.charCodeAt(0)) return !0;
			return !1
		},
		getUnicode: function(a) {
			if (this.value.match(/%u[0-9a-fA-F]{4}/)) {
				var b = this.value.replace(/%u([0-9a-fA-F]{4})/g, function(a, b) {
					return String.fromCharCode(parseInt(b, 16))
				});
				a(b)
			} else this.containMultbyteChar(this.value) ?
				a(decodeURIComponent(this.value)) : this.encoding.match(/(x-)?(cp936|gbk|gb2312|gb18030)/) ? export_para_Hb.browser.extension.sendRequest({
					topic: "decode_gbk",
					data: this.value
				}, a) : a(this.value)
		}
	};
	export_para_Hb.site = {
		SearchTerm: Ib,
		get_domain: function(a) {
			return a.location && a.location.hostname ? a.location.hostname : ""
		},
		get_domain_from_str: function(a) {
			var b = "undefined";
			0 == a.toLowerCase().indexOf("http://") ? (b = a.substring(7), b = "http://" + b.substring(0, b.indexOf("/"))) : 0 == a.toLowerCase().indexOf("https://") && (b = a.substring(8), b = "https://" +
				b.substring(0, b.indexOf("/")));
			return b
		},
		get_url: function(a) {
			return a.location && a.location.href ? a.location.href : a.title ? a.title : ""
		},
		get_site: function(a) {
			var b = "";
			if (a) {
				var b = 2,
					c = a.split(".");
				a.match(/\.(com|co|org|net)\.(cn|uk|jp|hk|us|ca)$/) && (b += 1);
				b = c.length >= b ? c.splice(c.length - b, c.length).join(".") : a
			}
			return b
		},
		get_sub_domain: function(a, b) {
			var c = "";
			a && (c = a.length > b.length ? a.substring(0, a.length - b.length - 1) : "DUMMY");
			return c
		},
		check_shopping_term: function() {
			var a = this.get_site(this.get_domain(document));
			if ("google.com" == a || "google.cn" == a || "google.com.hk" == a || "google.co.uk" == a) {
				if (a = decodeURIComponent(document.location.href), -1 != a.indexOf("/products") || -1 != a.indexOf("tbs=bks:1") || -1 != a.indexOf("tbs=shop:1") || -1 != a.indexOf("tbm=bks") || -1 != a.indexOf("tbm=shop")) return !0
			} else {
				if ("bing.com" == a) {
					if (-1 != document.location.href.indexOf("/shopping/")) return !0;
					var a = $("#sw_abarl").find("a"),
						b = !1;
					$.each(a, function(a, d) {
						-1 != $(d).attr("href").indexOf("/shopping/") && (b = !0)
					});
					return b
				}
				return !0
			}
		},
		get_search_term: function(a,
			b) {
			if (!this.check_shopping_term()) return !1;
			var c = "",
				d = this.get_domain(b),
				e = this.get_site(d),
				d = this.get_sub_domain(d, e);
			a[d] && "undefined" == typeof a[d].e && (c = this.extract_search_term(a[d], b));
			c && "string" == typeof c && (c = new this.SearchTerm(c));
			return c
		},
		extract_search_term: function(a, b) {
			for (var c = "", d = b.location.search || b.location.hash, e, f = 0; f < a.length; f++) {
				var h = a[f].k,
					l = a[f].d,
					g = a[f].s,
					j = a[f].sk,
					k = a[f].charset;
				if (d) {
					for (var d = d.slice(1), l = d.split(l), m = l.length, p, f = 0; f < m; f++) p = l[f].split("="), h && p[0] ==
						h ? c = p[1] : p[0] == k && (e = p[1]);
					c && (c = new this.SearchTerm(c, e))
				}!c && g && (c = this.find_search_term_from_document(b, g), j && j == c && (c = ""));
				if (c) break
			}
			return c
		},
		find_search_term_from_query: function(a, b, c) {
			for (var d = "", a = a.split(c), b = RegExp("(?:^|\\?)" + b + '=([^#;\\?:@=&{}\\|\\\\^~\\[\\]`<>\\"]*)'), c = 0; c < a.length; c++) {
				var e = b.exec(a[c]);
				e && (d = e[1])
			}
			d && (d = d.replace(/\+/g, " "));
			return d
		},
		find_search_term_from_document: function(a, b) {
			var c = "",
				d = a.getElementById(b);
			if (d) c = d.value;
			else
				for (var d = a.getElementsByTagName("input"),
						e = 0; e < d.length; e++)
					if (d[e].name == b) {
						c = d[e].value;
						break
					} return c ? new this.SearchTerm(c, "unicode") : c
		}
	};
	var export_para_Ta = export_para_u;
	export_para_Ta.SearchBox || (export_para_Ta.SearchBox = {});
	var s = export_para_Ta.transform_selector;
	export_para_Ta.SearchBox.Tmpl = {
		getSearchEngineSettingTemplate: function(a, b) {
			var c = a.length,
				d = [],
				e;
			a.reverse();
			for (var f = 0; f < c; f++) e = a[f], e = '<li id="' + s("se-" + e.name) + '" class="' + s("merchant-item") + '" data-se-id="' + e.name + '">' + e.title + "</li>", d.push(e);
			"zh" == b && (e = '<li id="' + s("se-etao") + '" class="' + s("merchant-item") + " " + s("merchant-selected") +
				'" data-se-id="etao">\u6240\u6709\u5546\u57ce</li>', d.push(e));
			return d.join("")
		},
		getSearchEnginesTemplate: function(a) {
			for (var b = a.length, c = [], d, e = 0; e < b; e++) d = a[e], c.push('<li id="' + s("se-" + d.name) + '" data-se-id="' + d.name + '" class="' + s("se") + '" data-se-name="' + d.title + '">'), c.push('<img src="' + d.icon + '" /></li>'), 0 == e && c.push('<li class="' + s("separator-se") + " " + s("separator-small") + " " + s("ib") + '"></li>');
			return c.join("")
		},
		getProductsTemplate: function(a) {
			for (var b = a.length, c, d = export_para_Ta.SearchBox.Util.getURL("assets/images/loading.gif"),
					d = '<span class="' + s("product-image-wrapper") + '"><img class="' + s("product-image") + '" src="' + d + '" /><b class="' + s("line-height-setter") + '"></b></span>', e, f = [], h = 0; h < b; h++) c = a[h], e = c.preferredPrice, c = '<li class="' + s("product-item") + '" data-click-url="' + (c.ClickUrl || c.click_url || c.DetailPageURL) + '">', "<img" != e.substring(0, 4) && (e = '<span class="' + s("product-price-wrapper") + '">' + e + "</span>"), e = '<div class="' + s("product-price") + '">' + e + "</div>", f.push(c + d + e + "</li>");
			return f.join("")
		},
		getProductDetailTemplate: function(a) {
			var b =
				[],
				c = a.Title,
				d = a.productUsedPrice,
				e = a.productPrice,
				f = a.productFastTrack,
				h = a.productRatingStars,
				l = a.ClickUrl || a.click_url || a.DetailPageURL;
			b.push('<div id="' + s("product-title") + '">');
			b.push('<span id="' + s("product-page-link") + '" title="' + c + '" data-href="' + l + '">' + c + "</span>");
			b.push('</div><div id="' + s("product-price") + '">');
			b.push('<span id="' + s("product-used-price") + '">' + d + "</span>");
			b.push('<span id="' + s("product-now-price") + '">' + e + "</span>");
			b.push('</div><div id="' + s("product-image") + '">');
			b.push('<img data-href="' +
				l + '" src="' + a.productImageUrl + '" />');
			b.push('<span class="' + s("line-height-setter") + '"></span></div>');
			b.push('<div id="' + s("product-fast-trick") + '">' + f + "</div>");
			b.push('<div id="' + s("product-rating-stars") + '">' + h + "</div>");
			b.push('<div id="' + s("ivy-wrapper-in-detail") + '">');
			b.push('<span id="' + s("buy-btn-in-detail") + '" data-href="' + l + '"></span>');
			b.push('<span id="' + s("want-buy-btn-in-detail") + '" data-url="' + a.DetailPageURL + '"></span>');
			b.push('<div id="' + s("want-buy-count-info-in-detail") + '">\u5982\u610f\u6dd8\u7528\u6237\u4e2d\u6709123\u4eba\u60f3\u4e70</div></div>');
			return b.join("")
		},
		getMarketsTemplate: function(a, b, c) {
			for (var c = c || "", d = [], e, f = !1, h, l = 0, g = a.length; l < g; l++) h = a[l], 0 < l && (!f && h.BSeller != e) && (f = !0, d.push('<li class="' + s(c + "market-icon") + " " + s(c + "market-unimportant") + '"></li>')), e = h.BSeller, d.push(this.getMarketTemplate(h, l, b, c));
			f && d.unshift('<li class="' + s(c + "market-icon") + " " + s(c + "market-important") + '"></li>');
			return d.join("")
		},
		getMarketTemplate: function(a, b, c, d) {
			var d = d || "",
				e = [],
				f = "";
			b === c && (f = " " + s(d + "current-merchant"));
			e.push('<li class="' +
				s(d + "market-item") + f + '" data-href="' + a.DetailUrl + '" >');
			e.push('<div class="' + s(d + "price") + '">' + a.Price + "</div>");
			0 == b ? e.push('<div class="' + s(d + "market-name") + " " + s(d + "market-name-hightlight") + '">' + a.ShopName + "</div>") : e.push('<div class="' + s(d + "market-name") + '">' + a.ShopName + "</div>");
			e.push("</li>");
			return e.join("")
		},
		getLikeItemsTemplate: function(a) {
			for (var b = [], c = a.length, d, e = 0; e < c; e++) d = a[e], b.push('<li class="ruyitao-like-product-item" data-large-image-url="' + d.LargeImageUrl + '" data-title="' +
				d.Title + '">'), b.push('<a hideFocus="true" href="' + d.DetailPageURL + '" target="_blank" class="ruyitao-like-product-image ruyitao-log">'), b.push('<img class="ruyitao-small-image" src="' + d.SmallImageUrl + '" />'), b.push('<b class="ruyitao-line-height-setter"></b></a></li>');
			return b.join("")
		},
		getPriceCurveTipTemplate: function() {
			var a = [];
			a.push('<div id="' + s("price-curve-tip") + '">');
			a.push('<div id="' + s("current-point-date") + '"></div>');
			a.push('<div id="' + s("current-point-price") + '"></div>');
			a.push('<div id="' +
				s("price-curve-arrow-down") + '"></div></div>');
			return a.join("")
		},
		getPriceInfoTemplate: function(a, b) {
			return '\u6700\u9ad8\u4ef7\uff1a<span class="' + s("highest-price") + '">\uffe5' + b + '</span>\u6700\u4f4e\u4ef7\uff1a<span class="' + s("lowest-price") + '">\uffe5' + a + "</span>"
		},
		getTopTipContentTemplate: function(a, b) {
			var c = "",
				d = '<a class="' + s("check-out-more-merchants-in-tip") + '"target="_blank" href="${moreMerchantsLink}">\u67e5\u770b\u66f4\u591a\u5546\u5bb6</a>';
			"cheap" == a ? c = "\u672c\u7f51\u7ad9\u5728\u91cd\u70b9\u5546\u5bb6\u4e2d\u4ef7\u683c<strong>\u6700\u4f4e\uff01</strong>" +
				d : "expensive" == a && (c = '<strong>${relativeMerchantName}</strong>\u8981\u4fbf\u5b9c<strong>\uffe5${priceDiff}\u5143\uff01</strong><a target="_blank" href="${relativeMerchantLink}">\u53bb\u770b\u770b</a>' + d);
			if (c)
				for (var e in b) c = c.replace("${" + e + "}", b[e]);
			return c
		}
	};
	var export_para_S = export_para_u,
		window_ub = window,
		document_ra = document;
	export_para_S.SearchBox || (export_para_S.SearchBox = {});
	var Jb = export_para_S.transform_selector;
	export_para_S.SearchBox.Util = {
		getClickUrl: function(a, b) {
			export_para_S.browser.extension.sendRequest({
				topic: "construct_click_url",
				url: a
			}, b)
		},
		getURL: function(a) {
			return export_para_S.browser.extension.getURL(a)
		},
		getCurrentTab: function(a) {
			export_para_S.browser.extension.sendRequest({
				topic: "get_current_tab"
			}, a)
		},
		openTab: function(a, b, c) {
			export_para_S.browser.extension.sendRequest({
				topic: "tab_open",
				url: a,
				selected: b || !1
			}, c)
		},
		closeTab: function(a, b) {
			export_para_S.browser.extension.sendRequest({
				topic: "close_tab",
				tabId: a
			}, b)
		},
		activeTab: function(a, b) {
			export_para_S.browser.extension.sendRequest({
				topic: "active_tab",
				tabId: a
			}, b)
		},
		appendTraceParameter: function(a, b) {
			for (var c = b.split(/[?&]/), d = 0, e = c.length; d < e; d++) 0 == c[d].indexOf("tb_lm_id=") && (a = a.replace(/&tb_lm_id=[^&]*/,
				"").replace(/\?tb_lm_id=[^&]*&/, "?") + (-1 == a.indexOf("?") ? "?" : "&") + c[d]);
			return a
		},
		sendLog: function(a, b) {
			var c = {
				topic: "send_log",
				action: a,
				referrer: document.referrer
			};
			"undefined" != typeof b && (c.label = b);
			export_para_S.browser.extension.sendRequest(c)
		},
		_imgCache: {},
		_imgCacheIndex: 0,
		sendImageLog: function(a) {
			if (a) {
				var b = this,
					c = new Image,
					d = this._imgCacheIndex++;
				this._imgCache[d] = c;
				c.onload = c.onerror = function() {
					delete b._imgCache[d]
				};
				c.src = a;
				c = null
			}
		},
		getViewPortWidth: function() {
			return "CSS1Compat" == document_ra.compatMode ? document_ra.documentElement.clientWidth :
				document_ra.body.clientWidth
		},
		getViewPortHeight: function() {
			return "CSS1Compat" == document_ra.compatMode ? document_ra.documentElement.clientHeight : document_ra.body.clientHeight
		},
		getOverlayWidth: function() {
			var a = this.getViewPortWidth();
			return Math.max(a, document_ra.body.scrollWidth)
		},
		getOverlayHeight: function() {
			var a = this.getViewPortHeight();
			return Math.max(a, document_ra.body.scrollHeight)
		},
		getScrollPosition: function() {
			var a = $.browser.webkit,
				b = document_ra.body,
				c = document_ra.documentElement;
			return {
				top: a ? b.scrollTop : c.scrollTop,
				left: a ? b.scrollLeft : c.scrollLeft
			}
		},
		handleSogou: function() {
			/SE\s\d\.X\sMetaSr\s\d\.\d/g.test(window_ub.navigator.userAgent) &&
				$("#" + Jb("option-link")).hide()
		},
		replaceTemplateSelectors: function(a) {
			return a.replace(/ruyitao-selector-prefix-([\w_-]+)/g, function(a, c) {
				return export_para_S.transform_selector(c)
			})
		},
		getTemplate: function(a, b) {
			var c = this;
			export_para_S.browser.extension.sendRequest({
				topic: "get_template",
				page: a
			}, function(a) {
				"function" == typeof export_para_S.loadJQuery && ($ = jQuery = export_para_S.loadJQuery());
				a = export_para_S.SearchBox.Util.replaceTemplateSelectors(a);
				c.sanitizeHTML(a, function(a) {
					b(a)
				})
			})
		},
		sanitizeHTML: function(a, b) {
			var c = a.replace(/<script\b[\s\S]*?<\/script\s*>/g,
				"").replace(/\bon[A-z]+\s*=\s*['"]?[^>"]+['"]?/g, " ").replace(/href\s*=\s*['"]?\s*javascript:/g, " ");
			b(c)
		},
		addEvent: function(a, b, c, d) {
			a.addEventListener ? a.addEventListener(b, c, d || !1) : a.attachEvent && a.attachEvent("on" + b, c)
		},
		addThousandSeparator: function(a) {
			if (!isNaN(+a)) {
				var a = a + "",
					b = a.split(".")[0],
					a = a.split(".")[1];
				return b.replace(/(\d)(?=(?:\d{3})+\b)/g, "$1,") + (a ? "." + a : "")
			}
		},
		ajax: function(a, b) {
			a.topic = "ajax";
			export_para_S.browser.extension.sendRequest(a, b)
		},
		mergeStyleSheets: function() {
			if (!$.browser.msie || !document.styleSheets) return !0;
			var a = document.styleSheets,
				b = document.getElementsByTagName("style"),
				c = document.getElementsByTagName("link");
			if (32 > b.length + c.length || !a[0].cssText) return !0;
			for (var a = document.styleSheets[0], b = $("." + Jb("stylesheet")), d = 0; d < b.length; d++) {
				c = b.get(d);
				try {
					a.cssText += c.styleSheet.cssText, $(c).remove()
				} catch (e) {
					return !1
				}
			}
			return !0
		},
		parseImagePrice: function(a, b) {
			var c = a.attr("data-lazyload");
			c || (c = a.attr("src"));
			export_para_S.browser.extension.sendRequest({
				topic: "parse_image_price",
				domain: export_para_S.SearchBox.Util.getLocationProperty(window_ub,
					"hostname"),
				url: c
			}, b)
		},
		loadJQuery: function() {},
		parsePriceString: function(a) {
			if (a) {
				var b = /\d+(?:\.\d+)?/.exec(a);
				b && (a = b[0], a = parseFloat(a))
			}
			return a
		},
		getTopLevelDomain: function(a) {
			a = /[a-z0-9_-]+\.(?:com|net|org)/ig.exec(a);
			return !a ? null : a[0].toLowerCase()
		},
		getSiteMetaInfo: function(a) {
			a = this.getTopLevelDomain(a);
			return !a ? null : this.siteMetaInfo[a]
		},
		siteMetaInfo: {
			"360buy.com": {
				name: "\u4eac\u4e1c"
			},
			"51buy.com": {
				name: "\u6613\u8fc5"
			},
			"suning.com": {
				name: "\u82cf\u5b81\u6613\u8d2d"
			}
		},
		randomAppend: function(a,
			b) {
			var c = $(a).find("> *"),
				d = c.length,
				d = parseInt(Math.random() * d);
			c.eq(d).after(b)
		},
		openFeedback: function(a, b) {
			var c = "http://ruyi.taobao.com/bug/item/" + a + "?ref=" + (b || encodeURIComponent(export_para_S.SearchBox.Util.getLocationHref(window_ub)));
			export_para_S.SearchBox.Util.sendLog("click_compare", c);
			export_para_S.SearchBox.Util.openTab(c, !0)
		},
		elemInArray: function(a, b) {
			if ("function" == typeof b.indexOf) return -1 != b.indexOf(a);
			for (var c = 0, d = b.length; c < d; c++)
				if (b[c] === a) return !0;
			return !1
		},
		getLocation: function(a) {
			a = a || window;
			return a.location || a.document.location
		},
		getLocationProperty: function(a, b) {
			"string" === typeof a && (b = a, a = void 0);
			return export_para_S.SearchBox.Util.getLocation(a)[b]
		},
		setFixed: function(a, b) {
			var c, d;
			"iPad" == navigator.platform && -1 < navigator.userAgent.toLowerCase().search("cpu os 4") && (c = b ? 1 : 0, c += Number($(b ? a + " " + b : a).css("height").slice(0, -2)), d = window.innerHeight + window.pageYOffset - c, $(a).css("top", d), window.onscroll = function() {
				$(a).css("display", "none");
				setTimeout(function() {
					d = window.innerHeight + window.pageYOffset - c;
					$(a).css("top", d);
					$(a).css("display",
						"block")
				}, 100)
			})
		},
		getLocationHref: function(a) {
			return export_para_S.SearchBox.Util.getLocationProperty(a, "href")
		},
		CATEGORY_TAGS: {
			"\u7535\u5b50": 1,
			"\u7537": 1,
			"\u5973": 1,
			"\u513f\u7ae5": 1,
			"\u8f66": 1,
			"\u98df\u54c1": 1,
			"\u6237\u5916": 1,
			"\u5bb6\u5c45": 1,
			"\u65f6\u5c1a": 1,
			"\u5a31\u4e50": 1,
			"\u4e66": 1
		},
		filterCategoryTags: function(a) {
			if (!a || 0 == a.length) return [];
			for (var b = [], c = this.CATEGORY_TAGS, d = 0, e = a.length; d < e; d++) c.hasOwnProperty(a[d]) || b.push(a[d]);
			return b
		}
	};
	var export_para_Da = export_para_u;
	export_para_Da.SearchBox || (export_para_Da.SearchBox = {});
	var ep_searchbox = export_para_Da.SearchBox,
		E = export_para_Da.transform_selector;
	ep_searchbox.UI = {
		visibleProductNum: null,
		init: function() {},
		activateControlIcon: function(a) {
			$(a).addClass("" + E("active-control-icon"));
			$(a).hasClass("" + E("se")) && this.updateSearchEngineTitle(a, !0)
		},
		inactivateControlIcon: function(a) {
			$(a).removeClass("" + E("active-control-icon"));
			$(a).hasClass("" + E("se")) && this.updateSearchEngineTitle(a, !1)
		},
		isActiveControlIcon: function(a) {
			return $(a).hasClass("" + E("active-control-icon"))
		},
		updateSearchEngineTitle: function(a, b) {
			var c = $(a),
				d = c.attr("data-se-name"),
				e = ep_searchbox.App.getKeyword(),
				d = export_para_Da.i18n.getMessage("search_product_in", d, e);
			b && (d = export_para_Da.i18n.getMessage("click_to_hide"));
			c.attr("title", d)
		},
		showOptionList: function() {
			$("#" + E("option-list-content")).show()
		},
		hideOptionList: function() {
			$("#" + E("option-list-content")).hide()
		},
		showSearchBar: function() {
			$("#" + E("search-bar")).show();
			this.activateControlIcon($("#" + E("search-icon")))
		},
		hideSearchBar: function() {
			$("#" + E("search-bar")).hide();
			this.inactivateControlIcon($("#" + E("search-icon")))
		},
		focusSearch: function() {
			$("#" +
				E("search")).get(0).focus()
		},
		focusSearchBar: function() {
			$("#" + E("search-bar")).addClass("" + E("search-focus"))
		},
		blurSearchBar: function() {
			$("#" + E("search-bar")).removeClass("" + E("search-focus"))
		},
		searchBarStatus: function() {
			return $("#" + E("search-bar")).is(":visible")
		},
		showSearchEngineSetting: function() {
			$("#" + E("search-engines-setting")).show();
			this.activateControlIcon($("#" + E("plus-btn")))
		},
		hideSearchEngineSetting: function() {
			$("#" + E("search-engines-setting")).hide();
			this.inactivateControlIcon($("#" +
				E("plus-btn")))
		},
		showSearchEngineSettingMsg: function() {
			$("#" + E("ses-msg")).show()
		},
		hideSearchEngineSettingMsg: function() {
			$("#" + E("ses-msg")).hide()
		},
		hideOtherPopups: function(a) {
			$("." + E("popup")).filter('[id!="' + a + '"]').hide()
		},
		hidePopups: function() {
			this.hideOptionList();
			this.hideSearchEngineSetting();
			var a = export_para_Da.i18n.getMessage("search_engine_setting");
			$("#" + E("plus-btn")).attr("title", a)
		},
		showControlBar: function() {
			$.browser.msie && 9 > parseInt($.browser.version) ? $("#" + E("controller-bar")).css("filter",
				"") : $("#" + E("controller-bar")).css("opacity", 1)
		},
		enableSearchEngineHover: function() {
			$("#" + E("search-engines")).addClass("" + E("se-hover-enabled"))
		},
		disableSearchEngineHover: function() {
			$("#" + E("search-engines")).removeClass("" + E("se-hover-enabled"))
		}
	};
	var export_para_sa = export_para_u;
	export_para_sa.SearchBox || (export_para_sa.SearchBox = {});
	var vb = export_para_sa.SearchBox.Util,
		Lb = export_para_sa.SearchBox.Tmpl,
		La, Mb, Ua, Ma = export_para_sa.transform_selector;
	export_para_sa.SearchBox.SearchEngines = {
		init: function() {
			this.renderEnabledSearchEngines();
			this.registerEvents()
		},
		registerEvents: function() {
			var a =
				this;
			$("#" + Ma("submit-ses-btn")).click(function(b) {
				b.preventDefault();
				a.submit()
			})
		},
		getAll: function(a) {
			var b = this;
			export_para_sa.browser.extension.sendRequest({
				topic: "get_search_engines"
			}, function(c) {
				La = JSON.parse(JSON.stringify(c.search_engines));
				b.setEnabled(La);
				b.setLocale(c.locale);
				a(c)
			})
		},
		updateCached: function(a) {
			var b, c, d, e;
			for (e in La)
				if (La.hasOwnProperty(e)) {
					b = La[e];
					for (var f = 0, h = b.length; f < h; f++) c = b[f], d = c.name, a.hasOwnProperty(d) && (c.enabled = a[d])
				}
		},
		setLocale: function(a) {
			Ua = a;
			export_para_sa.i18n.setLocale(a)
		},
		getLocale: function() {
			return Ua
		},
		getCachedAll: function() {
			return La
		},
		filter: function(a) {
			for (var b = export_para_sa.site.get_site(vb.getLocationProperty(window, "hostname")), c = [], d = 0, e = a.length; d < e; d++) {
				var f = a[d];
				f.host && b.match(f.host) || ("etao" == f.name || ("paipai.com" == b || "eachnet.com" == b) && "taobao" == f.name) || c.push(f)
			}
			return c
		},
		sort: function(a) {
			a.sort(function(a, c) {
				return "etao" == a.name ? -1 : "etao" == c.name ? 1 : a.order - c.order
			})
		},
		getCurrentLocaleSearchEngines: function() {
			var a = this.getCachedAll(),
				b = this.getLocale(),
				c = [],
				d;
			for (d in a) a.hasOwnProperty(d) && d == b && (c = Array.prototype.concat.apply(c, a[d]));
			return c
		},
		renderSearchEngineSettingHtml: function() {
			var a = this.getCurrentLocaleSearchEngines(),
				a = this.filter(a),
				a = Lb.getSearchEngineSettingTemplate(a, this.getLocale());
			$("#" + Ma("merchant-list")).html(a)
		},
		renderEnabledSearchEngines: function() {
			var a = this.getEnabled();
			this.sort(a);
			$("#" + Ma("search-engine-item-template")).html();
			$.each(a, function(a, c) {
				c.icon = c.icon || vb.getURL("assets/images/search/se-icons/" + c.name + ".png")
			});
			a = Lb.getSearchEnginesTemplate(a);
			$("#" + Ma("search-engines")).html(a)
		},
		setSearchEngineSettingPosition: function() {
			var a = $("#" + Ma("plus-btn")),
				b = $("#" + Ma("search-engines-setting")),
				a = a.position().left + a.width() / 2,
				c = b.outerWidth(),
				a = a - c / 2;
			0 > a && (a = 0);
			b.css("left", a + "px")
		},
		getEnabled: function() {
			return Mb
		},
		setEnabled: function(a) {
			var a = a || this.getCachedAll(),
				b = export_para_sa.site.get_site(vb.getLocationProperty(window, "hostname")),
				c = [],
				d = function(d) {
					var d = a[d],
						e, l;
					e = 0;
					for (l = d.length; e < l; e++) {
						var g = d[e];
						if (g.enabled &&
							(!g.host || !b.match(g.host)))(!("paipai.com" == b || "eachnet.com" == b) || !("taobao" == g.name || "etao" == g.name)) && c.push(g)
					}
				};
			a[Ua] && d(Ua);
			for (var e in a) a.hasOwnProperty(e) && e != Ua && d(e);
			Mb = c
		},
		getSearchEngineById: function(a) {
			var b = this.getCurrentLocaleSearchEngines();
			if (b)
				for (var c = 0, d = b.length; c < d; c++)
					if (b[c].name === a) return b[c];
			return null
		}
	};
	var export_para_aa = export_para_u;
	export_para_aa.SearchBox || (export_para_aa.SearchBox = {});
	var ep_searchbox = export_para_aa.SearchBox,
		ta = ep_searchbox.Util,
		Nb = ep_searchbox.Tmpl,
		r = export_para_aa.transform_selector,
        ep_searchboxProducts = ep_searchbox.Products = {
			DEFAULT_SEARCH_ENGINE: "etao",
			BOOK_AUTHOR_SEARCH_ENGINE: "amazoncn_book",
			SAME_PRODUCTS_SEARCH_ENGINE: "product_search",
			keyword: "",
			searchEngine: "",
			productNumPerPage: 0,
			pageCache: null,
			maxPageNum: ca,
			loading: !1,
			arrowManualDisabled: !1,
			prevArrowValid: !0,
			nextArrowValid: !0,
			arrowValidDelay: 200,
			init: function() {
				var a = ba.calcProductNumByViewPortWidth();
				this.setProductNumPerPage(a);
				this.reset();
				this.registerEvents()
			},
			sendClickLog: function(a) {
				var b;
				switch (export_para_aa.currentViewType) {
					case "same":
						b = "click_same";
						break;
					case "recommend":
						b = "click_like";
						break;
					case "related":
					case "search":
						b = "click_search"
				}
				b ?
					ta.sendLog(b, a + "|" + ta.getLocationHref()) : export_para_aa.console.debug("Ready to send log but no action.")
			},
			registerEvents: function() {
				var a = this,
					b = $("#" + r("product-list"));
				b.delegate("." + r("product-item"), "click", function() {
					var b = $(this).attr("data-click-url");
					ta.openTab(b);
					a.sendClickLog(b)
				});
				b.delegate("." + r("product-item"), "mouseenter", function() {
					clearTimeout(Ea.timer);
					var c = b.find("." + r("product-item")).index(this);
					Ea.render(a.productsData[c]);
					Ea.show(this)
				}).delegate("." + r("product-item"), "mouseleave", function() {
					Ea.timer =
						setTimeout(function() {
							Ea.hide()
						}, Ea.delay)
				});
				$("#" + r("prev-page-btn")).click(function() {
					if (a.hasPrevPage() && a.prevArrowValid) {
						a.prevArrowValid = !1;
						var b = a.getProductNumPerPage();
						ba.setProductListWrapperWidthByProductNum(b);
						ba.moveProductList("prev");
						a.currentPageNum--;
						a.setArrowStatus();
						setTimeout(function() {
							a.prevArrowValid = !0
						}, a.arrowValidDelay)
					}
				});
				$("#" + r("next-page-btn")).click(function() {
					a.hasNextPage() && a.nextArrowValid && (a.nextArrowValid = !1, a.searchNextPage(function() {
						ba.moveProductList("next");
						a.setArrowStatus();
						setTimeout(function() {
							a.nextArrowValid = !0
						}, a.arrowValidDelay)
					}))
				})
			},
			reset: function() {
				var a = this;
				this.productsData = [];
				this.currentPageNum = this.maxPageNum = 0;
				this.loading = !1;
				Ob.cancel("searchbox_next");
				this.setSearchEngine("");
				this.setKeyword("");
				var b = 1,
					c = ca,
					d = this.getProductNumPerPage();
				this.pageCache = export_para_aa.PageCache(function(d) {
					"undefined" == typeof c || b <= c ? export_para_aa.browser.extension.sendRequest({
						topic: "item_search",
						Keyword: a.getKeyword(),
						SearchEngine: a.getSearchEngine(),
						ItemPage: b
					}, function(a) {
						b++;
						if ("Code" in a) export_para_aa.console.debug(a.Message), d([]);
						else return (c = a.TotalPages) ? d(a.Items) : d([])
					}) : d([])
				}, {
					PageSize: d
				}, !0)
			},
			searchNextPage: function(a) {
				var b = $("#" + r("product-list") + " ." + r("product-item")).length,
					c = this.getProductNumPerPage(),
					d = c * this.currentPageNum;
				d < b ? (this.currentPageNum++, b = Math.min(b - d, c), ba.setProductListWrapperWidthByProductNum(b), a()) : (b = this.getSearchEngine(), c = this.getKeyword(), this.search(b, c, this.currentPageNum + 1, null, a))
			},
			doNewSearch: function(a, b) {
				a && b ? (this.reset(), this.search(a,
					b, 1, function() {
						ba.clear();
						ba.reset()
					})) : this.renderByData(this.productsData)
			},
			renderByData: function(a) {
				this.reset();
				ba.hideNoResult();
				this.manualDisableAllArrow();
				ba.showLoading();
				this.maxPageNum = 1;
				ba.clear();
				ba.reset();
				this.searchSuccess(a)
			},
			search: function(a, b, c, d, e) {
				var f = this;
				this.setSearchEngine(a);
				this.setKeyword(b);
				ba.hideNoResult();
				this.manualDisableAllArrow();
				ba.showLoading();
				a = Ob.register("searchbox_next", function(a) {
					f.maxPageNum = a.TotalPages || 10;
					d && d();
					f.searchSuccess(a.Entries, e)
				});
				this.pageCache.get(c,
					a)
			},
			searchSuccess: function(a, b) {
				var c = this;
				ba.hideLoading();
				this.manualEnableAllArrow();
				var d = a.length;
				d ? (a = this.filter(a), this.productsData = this.productsData.concat(a), ba.render(a), ba.setProductListWrapperWidthByProductNum(d), b && b(), this.currentPageNum++) : (this.maxPageNum = this.currentPageNum, setTimeout(function() {
					c.nextArrowValid = !0
				}, c.arrowValidDelay), 0 == this.currentPageNum && ba.showNoResult());
				this.setArrowStatus()
			},
			filter: function(a) {
				$.each(a, function(a, c) {
					c.SmallImageUrl = c.SmallImageUrl || export_para_aa.browser.extension.getURL("assets/images/no_image_available.png");
					var d = c.Price || "",
						d = d.match(/too low/i) ? "Too low" : -1 != d.indexOf("-") ? $.trim(d.split("-")[0]) || "&nbsp;" : $.trim(d) || "&nbsp;";
					c.preferredPrice = d
				});
				return a
			},
			setArrowStatus: function() {
				ba.disableAllArrow();
				this.hasPrevPage() && ba.enableArrowBtn("prev");
				this.hasNextPage() && ba.enableArrowBtn("next")
			},
			hasPrevPage: function() {
				return !this.arrowManualDisabled && 1 < this.currentPageNum
			},
			hasNextPage: function() {
				return !this.arrowManualDisabled && this.currentPageNum < this.maxPageNum
			},
			manualDisableAllArrow: function() {
				this.arrowManualDisabled = !0;
				ba.disableAllArrow()
			},
			manualEnableAllArrow: function() {
				this.arrowManualDisabled = !1
			},
			getKeyword: function() {
				return this.keyword
			},
			setKeyword: function(a) {
				try {
					this.keyword = decodeURIComponent(a)
				} catch (b) {
					this.keyword = a
				}
			},
			getSearchEngine: function() {
				return this.searchEngine
			},
			setSearchEngine: function(a) {
				this.searchEngine = a
			},
			getProductNumPerPage: function() {
				return this.productNumPerPage
			},
			setProductNumPerPage: function(a) {
				this.productNumPerPage = a
			}
		}, ba = ep_searchbox.ProductsView = {
			viewPortWidth: 0,
			resizeTimer: null,
			resizeDelay: 100,
			init: function() {
				this.viewPortWidth = ta.getViewPortWidth();
				this.registerEvents();
				Ea.init()
			},
			reset: function() {
				$("#" + r("product-list")).hide().css("left", 0).show();
				this.disableAllArrow()
			},
			registerEvents: function() {
				var a = this;
				ta.addEvent(window, "resize", function() {
					clearTimeout(a.resizeTimer);
					a.resizeTimer = setTimeout(function() {
						if (ta.getViewPortWidth() != a.viewPortWidth) {
							a.viewPortWidth = ta.getViewPortWidth();
							var b = a.calcProductNumByViewPortWidth();
							ep_searchboxProducts.setProductNumPerPage(b);
							var b = ep_searchboxProducts.getSearchEngine(),
								c =
									ep_searchboxProducts.getKeyword();
							ep_searchboxProducts.doNewSearch(b, c)
						}
					}, a.resizeDelay)
				})
			},
			calcProductNumByViewPortWidth: function() {
				var a = ta.getViewPortWidth() - 102 - 168 - 20 - 20 - 60 - 112,
					a = Math.floor(a / 90);
				3 > a ? a = 3 : 20 < a && (a = 20);
				return a
			},
			setProductListWrapperWidthByProductNum: function(a) {
				this.setProductListWrapperWidth(90 * a)
			},
			show: function() {
				$("#" + r("products-wrapper")).show()
			},
			hide: function() {
				$("#" + r("products-wrapper")).hide()
			},
			render: function(a) {
				var b = Nb.getProductsTemplate(a);
				export_para_aa.SearchBox.Util.sanitizeHTML(b, function(b) {
					var d = $("#" + r("product-list"));
					d.append(b);
					var b = d.find("." + r("product-image")),
						e = b.length,
						f = b.length - a.length,
						h = 0;
					b.each(function(b) {
						b >= f && b < e && ($.browser.msie && "6.0" == $.browser.version && export_para_aa.IE6Patch.fixImageMaxSize($(this), 50), $(this).attr("src", a[h++].SmallImageUrl))
					})
				})
			},
			clear: function() {
				$("#" + r("product-list")).html("")
			},
			showLoading: function() {
				$("#" + r("product-list-overlay")).show()
			},
			hideLoading: function() {
				$("#" + r("product-list-overlay")).hide()
			},
			showNoResult: function() {
				$("#" + r("message")).show()
			},
			hideNoResult: function() {
				$("#" +
					r("message")).hide()
			},
			hidePageTurningBtns: function() {
				$("." + r("arrow")).hide()
			},
			enableArrowBtn: function(a) {
				$("#" + r(a + "-page-btn")).addClass("" + r("active-arrow"))
			},
			disableArrowBtn: function(a) {
				$("#" + r(a + "-page-btn")).removeClass("" + r("active-arrow"))
			},
			disableAllArrow: function() {
				this.disableArrowBtn("prev");
				this.disableArrowBtn("next")
			},
			setProductListWrapperWidth: function(a) {
				203 > a && ($.browser.msie && "6.0" == $.browser.version) && (a = 203);
				$("#" + r("product-list-wrapper")).width(a)
			},
			getProductListWrapperWidth: function() {
				$("#" +
					r("product-list-wrapper")).width()
			},
			moveProductList: function(a) {
				var b = $("#" + r("product-list")),
					c = b.position().left,
					d = 90 * ep_searchboxProducts.getProductNumPerPage();
				"next" == a ? c -= d : "prev" == a && (c += d);
				b.css("left", c)
			}
		}, Ea = ep_searchbox.Popup = {
			timer: null,
			delay: 200,
			init: function() {
				var a = this;
				$("#" + r("product-detail-container")).mouseenter(function() {
					clearTimeout(a.timer)
				}).mouseleave(function() {
					a.hide()
				});
				$("#" + r("product-detail-container")).delegate("#" + r("product-page-link") + ", #" + r("product-image") + " > img, #" + r("buy-btn-in-detail"),
					"click", function() {
						var a = $(this).attr("data-href");
						ta.openTab(a);
						ep_searchboxProducts.sendClickLog(a)
					}).delegate("#" + r("want-buy-btn-in-detail"), "click", function() {
					if (!$(this).hasClass(r("want-buy-btn-disabled"))) {
						var b = $(this).attr("data-url");
						a.wantThis(b)
					}
				}).delegate("#" + r("want-buy-count-info-in-detail"), "click", function() {
					a.openUserHomepage()
				})
			},
			setPosition: function(a) {
				var b = $("#" + r("product-detail-container")),
					c = b.outerWidth(),
					a = $(a).offset().left + 45 - c / 2 - 20,
					d = ta.getViewPortWidth();
				0 > a && (a = -1);
				c = d - c - 20 - 20;
				a > c &&
					(a = c);
				b.css("left", a + "px")
			},
			show: function(a) {
				$("#" + r("product-detail-container")).show();
				this.setPosition(a)
			},
			hide: function() {
				$("#" + r("product-detail-container")).hide()
			},
			filter: function(a) {
				a.productImageUrl = a.LargeImageUrl || a.SmallImageUrl;
				a.productUsedPrice = a.UsedPrice || "";
				a.productPrice = a.Price || "";
				a.productRatingStars = a.Stars || "";
				a.productFastTrack = a.FastTrack || "";
				return a
			},
			getWantCounts: function(a) {
				var b = this;
				export_para_aa.browser.extension.sendRequest({
					topic: "item_like_count",
					url: a
				}, function(a) {
					a.error ?
						$("#" + r("ivy-wrapper-in-detail")).hide() : ($("#" + r("ivy-wrapper-in-detail")).show(), b.updateWantsStatus(a.users, a.wanted))
				})
			},
			wantThis: function(a) {
				var b = this;
				export_para_aa.browser.extension.sendRequest({
					topic: "item_like_add",
					url: a
				}, function(a) {
					a && (a.success && "undefined" != typeof a.users) && b.updateWantsStatus(a.users, !0)
				})
			},
			updateWantsStatus: function(a, b) {
				var c = "",
					c = '<a class="' + r("ivy-wants-count") + '" target="_blank">';
				$("#" + r("want-buy-btn-in-detail")).removeClass(r("want-buy-btn-disabled"));
				a = parseInt(a);
				if (isNaN(a) ||
					0 > a) a = 0;
				0 == a ? c = "\u6210\u4e3a\u7b2c " + c + "1 \u4e2a</a>\u60f3\u4e70\u7684\u5982\u610f\u6dd8\u7528\u6237" : b ? (c = 1 == a ? "\u4f60\u662f\u7b2c" + c + " 1 \u4e2a</a>\u60f3\u4e70\u7684\u5982\u610f\u6dd8\u7528\u6237" : "\u4f60\u4e0e\u5176\u4ed6" + c + (a - 1) + " \u4e2a</a>\u5982\u610f\u6dd8\u7528\u6237\u90fd\u60f3\u4e70", $("#" + r("want-buy-btn-in-detail")).addClass(r("want-buy-btn-disabled"))) : c = "\u5982\u610f\u6dd8\u7528\u6237\u4e2d\u6709" + c + a + " \u4eba</a>\u60f3\u4e70";
				$("#" + r("want-buy-count-info-in-detail")).html(c)
			},
			openUserHomepage: function(a) {
				export_para_aa.browser.extension.sendRequest({
					topic: "item_like_open_homepage",
					url: a
				})
			},
			getWantCountsTimer: null,
			render: function(a) {
				var b = this,
					c = $("#" + r("product-detail-container")),
					d, e = 240;
				a.Popup ? (c.addClass(r("product-detail-container-for-etao")), this.renderForEtao(a), d = $("#" + r("product-image-for-etao") + " img"), e = 100) : (c.removeClass(r("product-detail-container-for-etao")), clearTimeout(this.getWantCountsTimer), this.getWantCountsTimer = setTimeout(function() {
						b.getWantCounts(a.DetailPageURL)
					}, 50), a = this.filter(a), $("#" + r("product-detail-template")).html(), c = Nb.getProductDetailTemplate(a),
					export_para_aa.SearchBox.Util.sanitizeHTML(c, function(a) {
						$("#" + r("product-detail-container")).html("").append(a);
						d = $("#" + r("product-image") + " img")
					}));
				$.browser.msie && "6.0" == $.browser.version && export_para_aa.IE6Patch.fixImageMaxSize(d, e)
			},
			renderForEtao: function(a) {
				var b = a.Popup,
					c = $("#" + r("product-detail-container"));
				$.trim(a.popupHTML) ? (b = a.popupHTML, c.html("").append(b)) : 0 == b.indexOf("http://") ? (c.html('<div class="' + r("popup-loading") + '"></div>'), export_para_aa.browser.extension.sendRequest({
					topic: "ajax",
					url: b,
					dataType: "text"
				}, function(b) {
					(b =
						$.trim(b)) && "string" == typeof b ? (b = b && b.replace(/(https?:\/\/)img\d+\.(taobaocdn|tbcdn)\.com/g, "$1go.alicdn.com"), b = export_para_aa.SearchBox.Util.replaceTemplateSelectors(b), export_para_aa.SearchBox.Util.sanitizeHTML(b, function(b) {
						a.popupHTML = b;
						c.html("").append(b)
					})) : c.hide()
				})) : c.html("").append(b)
			}
		}, Ob = {
			callback_id: 1,
			callbacks: {},
			keys: function(a) {
				var b = [],
					c;
				for (c in a) b.push(c);
				return b
			},
			register: function(a, b) {
				var c = this;
				this.cancel(a);
				var d = this.callback_id++;
				this.callbacks[a][d] = b;
				return function() {
					var b = c.get(a, d);
					b && (b.apply(b, arguments), c.cancel(a))
				}
			},
			cancel: function(a) {
				this.callbacks[a] = {}
			},
			get: function(a, b) {
				if ("object" == typeof this.callbacks[a] && "function" == typeof this.callbacks[a][b]) return this.callbacks[a][b]
			}
		}, H = export_para_u,
		mc = window,
		Wa = document;
	H.SearchBox || (H.SearchBox = {});
	var Xa = H.SearchBox,
		eb = Xa.UI,
		Ca = Xa.Util,
		Fa = Xa.SearchEngines,
		fb = Xa.Products,
		Oa = Xa.ProductsView,
		Pb = null,
		Qb = null,
		Rb = null,
		Pa, x = H.transform_selector,
		wb = Ca.getLocationHref(mc);
	H.SearchBox.App = {
		searchEngine: "",
		isFirstShown: !1,
		expanded: !0,
		run: function(a) {
			var b =
				this,
				c = H.site.get_domain(Wa),
				d = H.site.get_site(c),
				e = function(d) {
					if (d.config) {
						var e = b.getSearchTerm(d);
						H.console.debug("get search term '" + e + "'");
						e ? (Ca.loadJQuery(), b.init(e, d.status)) : a.run();
						b.handleAjaxSearch(c)
					} else a.run()
				};
			Fa.getAll(function() {
				0 < Fa.getEnabled().length ? b.baidu.isSERP() ? b.baidu.isCommoditySearch(function(a, c, d) {
					a && b.init(c, d)
				}) : b.getSiteConfig(d, e) : a.run()
			})
		},
		baidu: {
			isCommoditySearch: function(a) {
				Ca.loadJQuery();
				var b = this.filterKeyword(this.getKeyword() || ""),
					c = this.getURL();
				this.checkCommodiySearch(b,
					c, a)
			},
			isSERP: function() {
				return wb.match(/^http:\/\/www\.baidu\.com\/s\?/) || wb.match(/^http:\/\/www\.baidu\.com\/baidu\?word=/)
			},
			getKeyword: function() {
				return $("#kw").val()
			},
			getURL: function() {
				var a = [];
				$('td.f span.g, td.f span.c-showurl, td.f div.c-showurl, td.f>font[color=\'#008000\'], td.f #ala_img_results a:not([href^="http://www.baidu.com/link?url="]):not([href^="http://www.baidu.com/baidu.php?url="])td.f #ala_img_desc a:not([href^="http://www.baidu.com/link?url="]):not([href^="http://www.baidu.com/baidu.php?url="])td.f .op_digital_base_moreInfo_l a, td.f .op_digital_moreLink_p a.op_digital_base_moreLink_a, td.f h3.t a:not([href^="http://www.baidu.com/link?url="]):not([href^="http://www.baidu.com/baidu.php?url="])').each($.proxy(function(b,
					c) {
					var d = $(c);
					if (d.length) {
						var e = d.text();
						c.tagName && "a" === c.tagName.toLowerCase() && (e = d.attr("href"));
						(e = this.filterURL(e)) && a.push(e)
					}
				}, this));
				return a
			},
			filterURL: function(a) {
				return $.trim(a.replace(/&nbsp;/g, " ")).split(RegExp(String.fromCharCode(32) + "|" + String.fromCharCode(160), "g"))[0]
			},
			filterKeyword: function(a) {
				return $.trim(a.replace(/(\u5B98\u7F51|\u5B98\u65B9\u7F51\u7AD9|\u65D7\u8230\u5E97|\u5B98\u65B9\u65D7\u8230\u5E97)+$/gm, ""))
			},
			checkCommodiySearch: function(a, b, c) {
				var d = H.site.get_domain(Wa),
					d = H.site.get_site(d);
				H.browser.extension.sendRequest({
					topic: "baidu_page_is_commodity_search",
					domain: d,
					keyword: a,
					url: wb,
					urls: b
				}, function(b) {
					b && b.is_shopping_keyword ? c(!0, a, b.site_status) : c(!1)
				})
			}
		},
		destory: function() {
			$("." + x("searchbox-protection")).remove()
		},
		getSiteConfig: function(a, b) {
			H.browser.extension.sendRequest({
				topic: "get_site_config",
				domain: a
			}, b)
		},
		getSearchTerm: function(a) {
			return H.site.get_search_term(a.config, Wa)
		},
		getKeyword: function() {
			return Pa
		},
		setKeyword: function(a) {
			Rb = Pa;
			try {
				Pa = decodeURIComponent(a)
			} catch (b) {
				Pa =
					""
			}
			$("#" + x("search")).val(Pa)
		},
		handleAjaxSearch: function(a) {
			var b = this;
			if ("www.amazon.cn" == a) {
				var c = $("#twotabsearchtextbox"),
					a = c.get(0).form;
				$(a).submit(d);
				c.change(d);
				$("#rightResultsATF").delegate("#relatedSearches a", "mousedown", d);
				history.pushState ? $(window).bind("popstate", d) : $(window).bind("hashchange", d);
				var d = function() {
					setTimeout(function() {
						var a = c.val();
						if (a && a != Pa) {
							var d = b.getCurrentSearchEngine();
							b.setKeyword(a);
							d && b.selectSearchEngine(d)
						}
					}, 200)
				}
			}
		},
		init: function(a, b) {
			if (!$("#" + x("controller-bar")).length && !$("#" + x("products-wrapper")).length) {
				var c = this;
				this.fixFlash();
				H.SearchBox.Util.getTemplate("views/searchbox.html", function(d) {
					Ca.randomAppend(document.body, d);
					Fa.init();
					c.doI18n();
					c.registerEvents();
					H.currentViewType = "search";
					var e = Fa.getEnabled()[0].name;
					fb.init();
					Oa.init();
					Ca.handleSogou();
					d = function(a) {
						c.setKeyword(a);
						Fa.renderSearchEngineSettingHtml();
						$.browser.msie && "6.0" == $.browser.version && H.IE6Patch.init();
						c.selectSearchEngine(e);
						b ? (Oa.show(), c.showControlBar()) : (fb.doNewSearch(e, a), c.hideControlBar(),
							Oa.hide(), c.showShrinkBar());
						Ca.sendLog("show_search", Ca.getLocationHref())
					};
					"object" == typeof a && "function" == typeof a.getUnicode ? a.getUnicode(d) : d(a)
				})
			}
		},
		fixFlash: function() {
			var a = $('embed[type="application/x-shockwave-flash"]'),
				b = null;
			$.each(a, function(a, d) {
				b = $(d).clone(!0);
				b.attr("wmode", "transparent");
				$(d).replaceWith(b)
			})
		},
		showControlBar: function() {
			$("#" + x("controller-bar")).show()
		},
		hideControlBar: function() {
			$("#" + x("controller-bar")).hide()
		},
		showShrinkBar: function() {
			$("#" + x("shrink-bar")).show()
		},
		hideShrinkBar: function() {
			$("#" + x("shrink-bar")).hide()
		},
		registerEvents: function() {
			var a = this;
			$("#" + x("close-btn")).click(function() {
				a.hideControlBar();
				Oa.hide();
				a.setSiteStatus("search", !1);
				a.showShrinkBar()
			});
			$(document).click(function(b) {
				b = b.target;
				!$(b).is("." + x("popup")) && !$(b).parents("." + x("popup")).is("." + x("popup")) && a.resetPopups()
			});
			$("#" + x("search-form")).submit(function(b) {
				b.preventDefault();
				if (b = $.trim($("#" + x("search")).val())) a.setKeyword(b), a.selectSearchEngine(a.searchEngine), clearTimeout(a.hideControlBarTimer)
			});
			this._registerSearchBarEvents();
			var b = null,
				c = $("#" + x("merchants-selection-wrapper"));
			$("#" + x("merchants-selection-handler")).mouseenter(function() {
				c.show()
			}).mouseleave(function() {
				b = setTimeout(function() {
					c.hide()
				}, 0)
			});
			c.mouseenter(function() {
				clearTimeout(b)
			}).mouseleave(function() {
				$(this).hide()
			});
			$("#" + x("search-logo")).click(function() {
				H.SearchBox.Util.openTab("http://ruyi.taobao.com/?utm_medium=ext&utm_source=ruyi", !0)
			});
			$("#" + x("merchant-list")).delegate("." + x("merchant-item"), "click", function() {
				var b =
					x("merchant-selected"),
					c = $(this);
				c.siblings("." + b).removeClass(b);
				c.addClass(b);
				$("#" + x("current-merchant-name")).text(c.text());
				b = c.attr("data-se-id");
				b != a.getCurrentSearchEngine() && (a.setSiteStatus("search", !0), a.selectSearchEngine(b))
			});
			$("#" + x("shrink-bar")).click(function() {
				a.hideShrinkBar();
				Oa.show();
				a.showControlBar();
				a.setSiteStatus("search", !0)
			});
			$("." + x("ivy-home-link")).click(function() {
				H.browser.extension.sendRequest({
					topic: "item_like_open_homepage"
				})
			})
		},
		_registerSearchBarEvents: function() {
			var a;
			$("#" + x("search")).focus(function() {
				eb.focusSearchBar()
			}).blur(function() {
				a && clearTimeout(a);
				a = setTimeout(function() {
					eb.blurSearchBar()
				}, 200)
			});
			$("#" + x("search-btn")).click(function() {
				a && clearTimeout(a);
				eb.focusSearch()
			})
		},
		setPosition: function(a) {
			if ($.browser.msie && "6.0" == $.browser.version) {
				var b;
				"active" == a ? b = 76 : "inactive" == a && (b = 0);
				H.IE6Patch.setBarPosition(b);
				H.IE6Patch.resetPosition()
			} else a = x(a + "-position"), a = x("wrapper") + " " + x("searchbox-protection") + " " + a, $("#" + x("controller-bar")).attr("class",
				a)
		},
		getSiteStatus: function(a, b) {
			H.browser.extension.sendRequest({
				topic: "get_site_status",
				type: a,
				domain: H.site.get_site(H.site.get_domain(Wa))
			}, function(a) {
				b(a)
			})
		},
		setSiteStatus: function(a, b) {
			H.browser.extension.sendRequest({
				topic: "set_site_status",
				domain: H.site.get_site(H.site.get_domain(Wa)),
				type: a,
				status: b
			})
		},
		checkCurrentSearchEngineIsEnabled: function() {
			for (var a = Fa.getEnabled(), b = this.getCurrentSearchEngine(), c = 0, d = a.length; c < d; c++)
				if (a[c].name == b) return !0;
			return !1
		},
		selectSearchEngine: function(a) {
			this.searchEngine =
				a;
			var b = $("#" + x("se-" + a));
			if (a != fb.getSearchEngine() || Rb != this.getKeyword()) b.addClass(x("merchant-selected")), $("#" + x("current-merchant-name")).text(b.text()), fb.doNewSearch(a, this.getKeyword());
			Oa.show();
			this.setCurrentSearchEngine(a)
		},
		resetPopups: function() {
			eb.hidePopups();
			this.setActiveControllerIcon(null)
		},
		getActiveControllerIcon: function() {
			return Qb
		},
		setActiveControllerIcon: function(a) {
			Qb = a
		},
		getCurrentSearchEngine: function() {
			return Pb
		},
		setCurrentSearchEngine: function(a) {
			Pb = a
		},
		doI18n: function() {
			var a =
				Fa.getLocale(),
				b, c, d;
			$("." + x("wrapper") + " [data-i18n]").each(function() {
				b = $(this).attr("data-i18n");
				c = b.split("->");
				d = c[1];
				"content" == c[0] ? $(this).html(H.i18n.getMessage(d)) : "attribute" == c[0] && (d = d.split(":"), $(this).attr(d[0], H.i18n.getMessage(d[1])))
			});
			"zh" == a ? (a = Ca.getURL("assets/images/search/search-cn.png"), $("#" + x("search-icon") + " img").attr("src", a)) : ($("#" + x("search-logo")).hide(), $("#" + x("non-zh-logo")).show(), $("#" + x("shrink-bar")).addClass(x("shrink-bar-en")).attr("title", "Click to show Shopping Assistant"),
				$("#" + x("merchants-selection-wrapper")).css("left", "76px"))
		}
	};
	var Ya = export_para_u,
		M = Ya.transform_selector;
	Ya.ControlBar = {
		init: function(a) {
			this.bindEvents();
			this.setPosition(a);
			$.browser.msie && "6.0" == $.browser.version && Ya.IE6Patch.init()
		},
		bindEvents: function() {
			$("#" + M("products-close-btn")).click(function() {
				$("#" + M("products-wrapper")).hide()
			});
			this._registerSearchBarEvents()
		},
		_registerSearchBarEvents: function() {
			var a = this,
				b;
			$("#" + M("search")).focus(function() {
				a.focusSearchBar()
			}).blur(function() {
				b && clearTimeout(b);
				b = setTimeout(function() {
					a.blurSearchBar()
				}, 200)
			});
			$("#" + M("search-btn")).click(function() {
				b && clearTimeout(b);
				a.focusSearch()
			})
		},
		CONTROL_BAR_BOTTOM_WITH_PRICE_COMPARATION: 46,
		CONTROL_BAR_BOTTOM_WITH_SEARCH: 76,
		CONTROL_BAR_BOTTOM_WITH_NOTHING: 0,
		setPosition: function(a) {
			if ($.browser.msie && "6.0" == $.browser.version) {
				var b;
				"product" == a ? b = this.CONTROL_BAR_BOTTOM_WITH_PRICE_COMPARATION : "search" == a ? b = this.CONTROL_BAR_BOTTOM_WITH_SEARCH : "hide" == a && (b = this.CONTROL_BAR_BOTTOM_WITH_NOTHING);
				Ya.IE6Patch.setBarPosition(b);
				Ya.IE6Patch.resetPosition()
			} else a = M(a + "-bottom"), a = M("wrapper") + " " + M("products-protection") + " " + a, $("#" + M("controller-bar")).attr("class", a)
		},
		showSearchBar: function() {
			$("#" + M("search-bar")).show()
		},
		hideSearchBar: function() {
			$("#" + M("search-bar")).hide()
		},
		focusSearch: function() {
			$("#" + M("search")).get(0).focus()
		},
		focusSearchBar: function() {
			$("#" + M("search-bar")).addClass("" + M("search-focus"))
		},
		blurSearchBar: function() {
			$("#" + M("search-bar")).removeClass("" + M("search-focus"))
		},
		setKeyword: function(a) {
			$("#" +
				M("search")).val(a)
		}
	};
	var Qa = window,
		j = export_para_u,
		nc = function(a) {
			for (var b, c, d = a.length, e, f; d--;) e = a[d], c = $(e.xpath), f = RegExp(e.regexp, "i"), $.each(c, function() {
				var a;
				if (a = (this.innerHTML || "").match(f)) return b = a[1], !1
			});
			return b
		}, Sb = j.site,
		Ga = j.browser.extension,
		Tb = Qa.document,
		A = j.SearchBox.Util,
		g = j.transform_selector;
	j.shareWeibo = function(a) {
		var b = encodeURIComponent,
			c = window.screen,
			d = [],
			e = "http://v.t.sina.com.cn/share/share.php?";
		for (name in a) a.hasOwnProperty(name) && d.push(name + "=" + b(a[name]));
		d.push("appkey=1965387856");
		e += d.join("&");
		window.open(e, "mb", ["toolbar=0,status=0,resizable=1,width=620,height=450,left=", (c.width - 620) / 2, ",top=", (c.height - 450) / 2].join(""))
	};
	var Za = j.PriceComparationsUI = {
		viewPortWidth: 0,
		_ICON_CLASSNAME: g("market-icon"),
		_widthArr: null,
		init: function() {
			this.viewPortWidth = document.documentElement.clientWidth;
			this._widthArr = this._getMarketListWidthArr();
			this.adjustMarketListWidth();
			this.bindEvents()
		},
		bindEvents: function() {
			var a = this,
				b = j.debounce(function() {
					document.documentElement.clientWidth !=
						a.viewPortWidth && (a.viewPortWidth = document.documentElement.clientWidth, a.adjustMarketListWidth(), j.ItemBar.markCurrentMerchant())
				});
			A.addEvent(window, "resize", b)
		},
		_getMarketListWidthArr: function() {
			var a = this,
				b = $("#" + g("price-comparation-wrapper")).is(":hidden"),
				c = 0,
				d = [];
			b && ($("#" + g("products-wrapper")).remove(), $("#" + g("price-comparation-wrapper")).css({
				visible: "hidden"
			}).show());
			$("#" + g("market-list") + " li").each(function(b, f) {
				c += $(f).outerWidth(!0);
				d.push({
					isIcon: $(f).hasClass(a._ICON_CLASSNAME),
					width: c
				})
			});
			b && $("#" + g("price-comparation-wrapper")).hide().css({
				visible: ""
			});
			return d
		},
		adjustMarketListWidth: function() {
			for (var a, b, c = document.documentElement.clientWidth - 102 - 168 - 20 - 120, d = !1, e = this._widthArr.length - 1; 0 <= e && !(b = this._widthArr[e], a = b.width, (d = d || b.isIcon) && this._widthArr[0].isIcon && (a -= this._widthArr[0].width), (2 > e || a <= c) && !b.isIcon); e--);
			d ? this.hideIcon() : this.showIcon();
			this.setMarketListWidth(a + 2)
		},
		showIcon: function() {
			$("#" + g("price-comparation-wrapper") + " ." + this._ICON_CLASSNAME).show()
		},
		hideIcon: function() {
			$("#" + g("price-comparation-wrapper") + " ." + this._ICON_CLASSNAME).hide()
		},
		setMarketListWidth: function(a) {
			$("#" + g("market-list")).width(a)
		},
		show: function() {
			$("#" + g("price-comparation-wrapper")).show()
		},
		hide: function() {
			$("#" + g("price-comparation-wrapper")).hide()
		}
	};
	j.ItemBar = {
		_max_items: ca,
		_loading: !1,
		_page_size: ca,
		_total_pages: ca,
		_page: 0,
		_has_more_books: !1,
		moreBooksOfAuthor: null,
		productNum: 0,
		priceComparationInfo: {
			valid: !1,
			type: "",
			currentPrice: ca,
			currentMerchantName: "",
			productTitle: "",
			relativeMerchantName: "",
			priceDiff: ca
		},
		destory: function() {
			$("#" + g("products-style")).remove();
			$("#" + g("controller-bar")).remove();
			$("#" + g("products-wrapper")).remove();
			$("#" + g("price-comparation-wrapper")).remove()
		},
		initPriceComparation: function(a) {
			var b = this,
				c = a.productList,
				d = a.product;
			this.productNum = c.length;
			j.SearchBox.Util.getTemplate("views/products.html", function(e) {
				A.randomAppend(document.body, e);
				j.qrCode.init($("." + g("price-comparation-box") + " ." + g("market-qrcode"))[0], function() {
					$("." + g("market-qrcode-wrapper")).hide()
				});
				setTimeout(function() {
					$.browser.msie && (A.mergeStyleSheets() || b.destory(), "6.0" == $.browser.version && j.IE6Patch.init());
					j.SearchBox.Products.init();
					j.SearchBox.ProductsView.init();
					var e = b.calcCurrentMerchantIndex(c, d);
					b.renderMarketList(c, e);
					Za.init();
					Za.show();
					b.markCurrentMerchant();
					j.SearchBox.App.getSiteStatus("price_compare", function(a) {
						a ? b.sendShowLog("show_product", c) : (Za.hide(), b.showShrinkBar(), b.checkExpandTip())
					});
					b.bindEvents(d, c);
					b.checkMoreBooksOfAuthor(a.book_author);
					A.handleSogou();
					b.handleIvyHomeLinkClick();
					b.checkAddToWantIntroStatus()
				}, 0)
			})
		},
		calcCurrentMerchantIndex: function(a, b) {
			for (var c, d = 0, e = a.length; d < e; d++)
				if (b.ItemNid && b.ItemNid == a[d].nid) {
					c = d;
					break
				}
			return c
		},
		markCurrentMerchant: function() {
			var a = $("." + g("current-merchant")).eq(0),
				b = $("#" + g("current-merchant-cursor")),
				c = $("#" + g("market-list")),
				d = c.find("." + g("market-item")),
				c = parseInt(c.width() / 120);
			a.length && d.index(a) <= c - 1 ? (a = a.position().left + 54, b.show().css("left", a + "px")) : b.hide()
		},
		isSameProduct: function(a) {
			return a &&
				a.Epid && 14 < a.Epid.length && 3 <= a.Epid.charAt(0)
		},
		initSame: function(a, b) {
			var c = this,
				d = a.productList;
			this.productNum = d.length;
			this.sameProductsKeyword = a.Keyword;
			j.SearchBox.Util.getTemplate("views/products.html", function(e) {
				A.randomAppend(document.body, e);
				j.qrCode.init($("." + g("products-box") + " ." + g("market-qrcode"))[0]);
				b ? (c.updateLogo("recommend"), j.currentViewType = "recommend") : (c.updateLogo("same"), j.currentViewType = "same");
				j.SearchBox.ProductsView.hidePageTurningBtns();
				$.browser.msie && (A.mergeStyleSheets(),
					"6.0" == $.browser.version && j.IE6Patch.init());
				j.SearchBox.Products.init();
				j.SearchBox.ProductsView.init();
				j.SearchBox.Products.doNewSearch(j.SearchBox.Products.SAME_PRODUCTS_SEARCH_ENGINE, c.sameProductsKeyword);
				c.handleLogoClick();
				j.SearchBox.App.getSiteStatus("price_compare", function(a) {
					a ? (j.SearchBox.ProductsView.show(), c.sendShowLog("show_same", d)) : (j.SearchBox.ProductsView.hide(), c.showShrinkBar(), c.checkExpandTip())
				});
				c.checkMoreBooksOfAuthor(a.book_author);
				A.handleSogou();
				c.handleShrink("same",
					d);
				c.handleIvyHomeLinkClick();
				c.checkAddToWantIntroStatus()
			})
		},
		sendShowLog: function(a, b) {
			var c = A.getLocationHref();
			b && "object" == typeof b[0] && "undefined" != typeof b[0].DetailPageURL ? A.sendLog(a, A.appendTraceParameter(c, b[0].DetailPageURL)) : A.sendLog(a, c)
		},
		initLike: function(a) {
			var b = this,
				c = a.productList;
			this.productNum = c.length;
			j.SearchBox.Util.getTemplate("views/products.html", function(d) {
				A.randomAppend(document.body, d);
				j.qrCode.init($("." + g("products-box") + " ." + g("market-qrcode"))[0]);
				b.updateLogo("recommend");
				j.currentViewType = "recommend";
				j.SearchBox.ProductsView.hidePageTurningBtns();
				$.browser.msie && (A.mergeStyleSheets(), "6.0" == $.browser.version && j.IE6Patch.init());
				j.SearchBox.Products.init();
				j.SearchBox.ProductsView.init();
				j.etaoLike.render(c);
				b.handleLogoClick();
				j.SearchBox.App.getSiteStatus("price_compare", function(a) {
					a ? (j.SearchBox.ProductsView.show(), b.sendShowLog("show_like", c)) : (j.SearchBox.ProductsView.hide(), b.showShrinkBar(), b.checkExpandTip())
				});
				b.checkMoreBooksOfAuthor(a.book_author);
				A.handleSogou();
				b.handleShrink("like", c);
				b.handleIvyHomeLinkClick();
				b.checkAddToWantIntroStatus()
			})
		},
		initRelated: function(a) {
			var b = this;
			j.SearchBox.Util.getTemplate("views/products.html", function(c) {
				A.randomAppend(document.body, c);
				b.updateLogo("similar");
				j.currentViewType = "related";
				$.browser.msie && (A.mergeStyleSheets() || b.destory(), "6.0" == $.browser.version && j.IE6Patch.init());
				j.SearchBox.Products.init();
				j.SearchBox.ProductsView.init();
				0 < a.length && (j.SearchBox.Products.doNewSearch(j.SearchBox.Products.DEFAULT_SEARCH_ENGINE,
					a), b.handleLogoClick(), j.SearchBox.App.getSiteStatus("price_compare", function(a) {
					a ? (j.SearchBox.ProductsView.show(), b.sendShowLog("show_product")) : (j.SearchBox.ProductsView.hide(), b.showShrinkBar(), b.checkExpandTip())
				}));
				A.handleSogou();
				b.handleShrink("related");
				b.handleIvyHomeLinkClick();
				b.checkAddToWantIntroStatus()
			})
		},
		initSearch: function() {
			var a = this;
			A.getTemplate("views/products.html", function(b) {
				A.randomAppend(document.body, b);
				$("#" + g("products-wrapper")).remove();
				j.qrCode.init($("." + g("price-comparation-box") +
					" ." + g("market-qrcode"))[0], function() {
					$("#" + g("price-comparation-logo")).html("");
					$("#" + g("price-comparation-logo")).addClass(g("search-logo")).attr("title", "\u5982\u610f\u6dd8 - \u641c\u7d22");
					$("#" + g("price-comparation-wrapper")).height(30);
					$("#" + g("search-wrapper")).show();
					$("." + g("market-qrcode-wrapper")).hide()
				}, function() {
					$("." + g("search-logo-wrapper")).addClass(g("logo-ruyi")).html("")
				});
				$("#" + g("more-results-link")).hide();
				$("#" + g("func-btns-wrapper")).hide();
				$.browser.msie && (A.mergeStyleSheets() ||
					a.destory(), "6.0" == $.browser.version && j.IE6Patch.init());
				Za.show();
				a.handleSearch();
				a.handleLogoClick();
				a.handleClose();
				A.handleSogou();
				$("#" + g("search-field")).focus();
				a.checkAddToWantIntroStatus()
			});
			A.sendLog("show_empty", A.getLocationHref())
		},
		updateLogo: function(a) {
			$("#" + g("logo")).attr("title", "\u5982\u610f\u6dd8 - " + {
				same: "\u540c\u6b3e\u5546\u54c1",
				recommend: "\u5546\u54c1\u63a8\u8350",
				similar: "\u76f8\u5173\u5546\u54c1"
			}[a]).addClass(g(a + "-logo"));
			$("." + g("logo-type")).html({
				same: "\u540c\u6b3e",
				recommend: "\u63a8\u8350",
				similar: "\u76f8\u5173"
			}[a])
		},
		bindEvents: function(a, b) {
			var c = this,
				d = A.getLocationHref();
			$("#" + g("market-list")).delegate("." + g("market-item"), "click", function() {
				if (!$(this).hasClass(g("current-merchant"))) {
					var a = $(this).attr("data-href");
					A.openTab(a);
					A.sendLog("click_product", a + "|" + d)
				}
			});
			$("#" + g("more-results-link")).click(function() {
				j.SearchBox.Util.openTab(a.DetailPageURL, !0);
				A.sendLog("click_product", a.DetailPageURL + "|" + d)
			});
			var e = a.book ? ["\u300a", "\u300b"] : ["\u201c", "\u201d"],
				f = a.DetailPageURL,
				h;
			a.SmallImageUrl && (h = a.SmallImageUrl.replace("_80x80.jpg", ""));
			var l = a.Title || "",
				m;
			this.shareWeiboImpl = function() {
				if (!m) {
					var a = j.Share.getContentTemplate("ca", {
						productTitle: e[0] + l + e[1]
					}),
						b = c.priceComparationInfo;
					b.valid && 0 != b.priceDiff && (a = "pk_" + b.type, a = j.Share.getContentTemplate(a, b));
					m = {
						siteId: "sina_weibo",
						text: a,
						url: f,
						imageType: "simple",
						imageUrl: h
					}
				}
				j.Share.supportSimpleShare && (m.custom = !0);
				j.Share.handleRequest(m)
			};
			var D = l.replace(/(?:\(|\uff08)[^(^)^\uff08^\uff09]+(?:\)|\uff09)/g,
				""),
				k = "http://s.taobao.com/search?tb_lm_id=ryt_ext&q=";
			j.browser.extension.sendRequest({
				topic: "encode_gbk",
				str: D
			}, function(a) {
				a && (k += a)
			});
			$("#" + g("search-in-taobao-icon")).attr("title", "\u5728\u6dd8\u5b9d\u641c\u7d22\u201c" + D + "\u201d").click(function() {
				j.SearchBox.Util.openTab(k, !0);
				A.sendLog("click_product", k + "|" + d)
			});
			this.handleLogoClick();
			this.handleShrink("price_compare", b)
		},
		showShrinkBar: function() {
			$("#" + g("shrink-bar")).show()
		},
		hideShrinkBar: function() {
			$("#" + g("shrink-bar")).hide()
		},
		handleShrink: function(a,
			b) {
			var c = this;
			$("#" + g("price-comparation-close-btn")).click(function() {
				$("#" + g("price-comparation-wrapper")).hide();
				c.showShrinkBar();
				j.SearchBox.App.setSiteStatus("price_compare", !1)
			});
			$("#" + g("products-close-btn")).click(function() {
				j.SearchBox.ProductsView.hide();
				c.showShrinkBar();
				j.SearchBox.App.setSiteStatus("price_compare", !1)
			});
			$("#" + g("shrink-bar")).click(function() {
				c.hideShrinkBar();
				"price_compare" == a ? (Za.show(), c.sendShowLog("show_product", b)) : (j.SearchBox.ProductsView.show(), "same" == a ? c.sendShowLog("show_same",
					b) : "related" == a ? c.sendShowLog("show_product", b) : "like" == a && c.sendShowLog("show_like", b));
				j.SearchBox.App.setSiteStatus("price_compare", !0)
			})
		},
		handleIvyHomeLinkClick: function() {
			$("." + g("ivy-home-link")).click(function() {
				j.browser.extension.sendRequest({
					topic: "item_like_open_homepage"
				})
			})
		},
		handleClose: function() {
			$("#" + g("price-comparation-close-btn")).click(function() {
				$("#" + g("price-comparation-wrapper")).remove()
			})
		},
		handleSearch: function() {
			var a = null;
			$("#" + g("search-field")).focus(function() {
				$(this).addClass(g("search-field-focused"))
			}).blur(function() {
				var b =
					$(this);
				a = setTimeout(function() {
					b.removeClass(g("search-field-focused"))
				}, 100)
			});
			$("#" + g("search-form")).submit(function(b) {
				b.preventDefault();
				clearTimeout(a);
				b = $("#" + g("search-field")).val();
				(b = $.trim(b)) ? j.SearchBox.Util.openTab("http://s.etao.com/search?tb_lm_id=ryt_ext&q=" + b, !0) : ($("#" + g("search-btn")).blur(), $("#" + g("search-field")).focus())
			})
		},
		handleLogoClick: function() {
			$("." + g("logo")).click(function() {
				j.SearchBox.Util.openTab("http://ruyi.taobao.com/?utm_medium=ext&utm_source=ruyi", !0)
			})
		},
		checkAddToWantIntroStatus: function() {
			var a = this;
			Ga.sendRequest({
				topic: "check_add_to_want_intro_status"
			}, function(b) {
				b && j.SearchBox.Util.getTemplate("views/add-to-want-intro.html", function(b) {
					$(document.body).append(b);
					var d = $("#" + g("popup-intro-wrapper"));
					$("#" + g("pi-close")).click(function() {
						d.css("top", "-100px");
						a.adjustBodyPaddingTop(0);
						j.likeButtonTips && j.likeButtonTips.fixPos()
					});
					setTimeout(function() {
						d.css("top", 0);
						a.adjustBodyPaddingTop();
						Ga.sendRequest({
							topic: "set_add_to_want_intro_status"
						});
						j.likeButtonTips && j.likeButtonTips.fixPos()
					}, 500)
				})
			})
		},
		adjustBodyPaddingTop: function(a) {
			"undefined" == typeof a && (a = 100);
			var b = $(document.body).attr("style") || "";
			$(document.body).attr("style", b + ";padding-top:" + a + "px !important;")
		},
		checkExpandTip: function() {
			var a = j.site.get_site(j.site.get_domain(document));
			("taobao.com" == a || "tmall.com" == a) && Ga.sendRequest({
				topic: "get_expand_tip_status",
				domain: a
			}, function(b) {
				b && j.SearchBox.Util.getTemplate("views/expand-tip.html", function(b) {
					$(document.body).append(b);
					var d = $("#" + g("et-wrapper"));
					d.css("bottom", 0);
					$("#" + g("et-close")).click(function() {
						d.css("bottom", "-330px")
					});
					$("#" + g("et-expend-now-btn")).click(function() {
						d.css("bottom", "-330px");
						$("#" + g("shrink-bar")).trigger("click")
					});
					Ga.sendRequest({
						topic: "set_expand_tip_status",
						domain: a
					})
				})
			})
		},
		shareWeiboImpl: null,
		shareWeibo: function() {
			this.shareWeiboImpl && "function" == typeof this.shareWeiboImpl && this.shareWeiboImpl()
		},
		renderMarketList: function(a, b) {
			$.each(a, function(a, b) {
				b.DetailUrl = b.ClickUrl || b.DetailPageURL
			});
			var c = j.SearchBox.Tmpl.getMarketsTemplate(a, b);
			$("#" + g("market-list")).html(c)
		},
		fillMoreBookList: function(a) {
			for (var a = this.moreBooksOfAuthor, b = $("#" + g("book-list")), c = 0, d = Math.min(a.length, 6), e = []; c < d; c++) {
				var f = a[c];
				e.push('<li class="' + g("book-item") + '">');
				e.push('<a target="_blank" href="' + (f.ClickUrl || f.DetailPageURL) + '">' + f.Title + "</a>");
				e.push("</li>");
				c != d - 1 && e.push('<li class="' + g("book-separater") + '"></li>')
			}
			b.html(e.join(""))
		},
		hideAuthorIcon: function() {
			$("#" + g("author-icon")).hide()
		},
		checkMoreBooksOfAuthor: function(a) {
			var b =
				this;
			a ? (j.console.debug("Has author: " + a), Ga.sendRequest({
				topic: "item_search",
				Keyword: a,
				SearchEngine: j.SearchBox.Products.BOOK_AUTHOR_SEARCH_ENGINE,
				ItemPage: 1
			}, function(c) {
				"object" == typeof c.Items && 0 < c.Items.length ? (j.console.debug(a + " wroted " + c.Items.length + " books."), j.ItemBar._has_more_books = !0, j.ItemBar.moreBooksOfAuthor = c.Items, j.ItemBar.author = a, $("#" + g("author-icon")).click(function() {
					j.SearchBox.Util.openTab("http://www.amazon.cn/s?tag=ruyita-23&ie=UTF8&search-alias=books&field-author=" +
						a, !0)
				})) : b.hideAuthorIcon()
			})) : b.hideAuthorIcon()
		},
		parseCurrentProductPrice: function(a) {
			Ga.sendRequest({
				topic: "get_detail_config",
				domain: A.getLocationProperty(Qa, "hostname")
			}, function(b) {
				if (b && b.length)
					for (var c, d, e = 0; e < b.length; e++)
						if (c = b[e], RegExp(c.url).test(A.getLocationHref(Qa)))
							for (var f = 0; f < c.patterns.length; f++)
								if (d = c.patterns[f], d.price && (d = $(d.price), d.length)) {
									"IMG" == d.get(0).tagName ? A.parseImagePrice(d, function(b) {
										b = A.parsePriceString(b);
										a(b)
									}) : (c = d.text(), c = A.parsePriceString(c), a(c));
									break
								}
			})
		},
		constructPriceComparationInfo: function(a, b, c) {
			var d = this.priceComparationInfo;
			if (!a || !b || !c) d.valid = !1;
			else if (c = c[0], c.BSeller) {
				var e = A.getSiteMetaInfo(A.getLocationProperty(Qa, "hostname"));
				e ? (d.currentMerchantName = e.name, (e = A.parsePriceString(c.Price)) ? (e = a - e, d.priceDiff = Math.abs(e).toFixed(1), 0 < e ? d.type = "expensive" : 0 > e && (d.type = "cheap"), e = b.book ? ["\u300a", "\u300b"] : ["\u201c", "\u201d"], d.productTitle = e[0] + b.Title + e[1], d.currentPrice = a, d.relativeMerchantName = c.ShopName, d.relativeMerchantLink =
					c.DetailUrl || c.ClickUrl || c.DetailPageURL, d.moreMerchantsLink = b.DetailPageURL, d.valid = !0) : d.valid = !1) : d.valid = !1
			} else d.valid = !1
		}
	};
	j.sameBookAssist = {};
	j.sameBookAssist.run = function(a) {
		var b = Sb.get_url(Tb),
			c = Sb.get_domain(Tb);
		Ga.sendRequest({
			topic: "is_book_site",
			domain: c,
			url: b
		}, function(b) {
			if (b) {
				"function" == typeof j.loadJQuery && ($ = j.loadJQuery());
				var c;
				var f, h = {};
				if (b) {
					for (f in b) b.hasOwnProperty(f) && (h[f] = nc(b[f]));
					c = h
				} else c = void 0;
				c.isbn ? (j.IvyWantBuy.init(), b = JSON.stringify({
					url: A.getLocationHref(Qa),
					title: Qa.document.title,
					isbn: c.isbn
				}), j.browser.extension.sendRequest({
					topic: "item_search",
					Keyword: b,
					SearchEngine: "product_search",
					ItemPage: 1
				}, function(a) {
					"object" == typeof a.Items && 0 < a.Items.length ? (a.Product.book = c, j.ItemBar.isSameProduct(a.Product) ? j.ItemBar.initSame({
						productList: a.Items,
						product: a.Product,
						Keyword: j.productSearch.getKeyword(),
						book_author: c.author
					}) : j.ItemBar.initPriceComparation({
						productList: a.Items,
						max_items: 8,
						book_author: c.author,
						product: a.Product
					}), j.ItemBar.constructPriceComparationInfo(c.price,
						a.Product, a.Items), j.console.debug("Current product price: " + c.price)) : j.ItemBar.initSearch()
				})) : a.run()
			} else a.run()
		})
	};
	var export_para_$a = export_para_u,
		gb = export_para_$a.transform_selector,
		oc = export_para_$a.SearchBox.Util.getLocationHref(window);
	export_para_$a.qrCode = {
		init: function(a, b, c) {
			var d = this;
			export_para_$a.browser.extension.sendRequest({
				topic: "get_price_history_data",
				url: oc
			}, function(e) {
                if (!e && b) {
                    b()
                } else {
                    c && c(), e = e.Item.nid, new za(a, {
                        text: "http://www.etao.com/go/rgn/etaoapp/redirect/item.php?src=ruyitao&nid=" + e + "&wpartner=13",
                        width: 65,
                        height: 65,
                        correctLevel: za.CorrectLevel.L
                    }),
                        d._initDom(), d._initEvent(), d._initTipsQr(e), d._getFinalPrice(e)
                }
			})
		},
		_initDom: function() {
			this._qrCodeWrapper = $("." + gb("market-qrcode-wrapper"));
			this._qrMsg = $("." + gb("qrcode-msg"));
			this._tips = $("." + gb("qrcode-tips"))
		},
		_initEvent: function() {
			var a = this;
			this._qrCodeWrapper.on("mouseenter", function() {
				a._show()
			});
			this._qrCodeWrapper.on("mouseleave", function() {
				a._hide()
			});
			this._tips.on("mouseenter", function() {
				clearTimeout(a._hideTimer)
			});
			this._tips.on("mouseleave", function() {
				a._hide()
			})
		},
		_initTipsQr: function(a) {
			new za(document.querySelector("." +
				gb("qr")), {
				text: "http://www.etao.com/go/rgn/etaoapp/redirect/item.php?src=ruyitao&nid=" + a + "&wpartner=13",
				width: 114,
				height: 114,
				correctLevel: za.CorrectLevel.L
			})
		},
		_show: function() {
			var a = this;
			this._showTimer = setTimeout(function() {
				var b = a._qrCodeWrapper.offset(),
					c = $(window).scrollTop();
				a._tips.css({
					display: "block",
					position: "fixed",
					left: b.left,
					top: b.top - 210 - c
				})
			}, 400)
		},
		_hide: function() {
			var a = this;
			this._hideTimer = setTimeout(function() {
				a._tips.css({
					display: "none"
				})
			}, 400)
		},
		_getFinalPrice: function(a) {
			var b =
				this;
			export_para_$a.browser.extension.sendRequest({
				topic: "get_final_price",
				nid: a
			}, function(a) {
				a = a.currentPrice >= a.finalPrice ? a.currentPrice - a.finalPrice : 0;
				0 < a ? (a = a.toFixed(2), 1E4 < a && (a = Math.round(a / 1E4) + "\u4e07"), b._qrCodeWrapper.find("span").html(a), b._tips.find("span").html(a)) : b._qrMsg.html('<div style="margin-top:14px">\u624b\u673a\u4e00\u6dd8\u626b\u7801\u8d2d\u4e70</div>')
			})
		}
	};
	var hb = window,
		T = export_para_u,
		Ub = T.SearchBox.Util;
	T.productSearch = {
		getKeyword: function() {
			return JSON.stringify({
				url: Ub.getLocationHref(hb),
				title: hb.document.title
			})
		}
	};
	T.productSearch.run = function() {
		var a = this;
		T.browser.extension.sendRequest({
			topic: "is_detail_site",
			url: Ub.getLocationHref(hb),
			title: hb.document.title
		}, function(b) {
			if ("undefined" != typeof b.locale) {
				T.IvyWantBuy.init();
				var c;
				T.SearchBox.Util.loadJQuery();
				b.product ? (c = a.getKeyword(), T.browser.extension.sendRequest({
					topic: "item_search",
					Keyword: c,
					SearchEngine: "product_search",
					ItemPage: 1
				}, function(a) {
					T.console.debug("1. " + a.Items.length);
					"object" == typeof a.Items && 0 < a.Items.length &&
						(T.ItemBar.isSameProduct(a.Product) ? T.ItemBar.initSame({
						productList: a.Items,
						product: a.Product,
						Keyword: c
					}) : T.ItemBar.initPriceComparation({
						productList: a.Items,
						product: a.Product
					}), T.ItemBar.parseCurrentProductPrice(function(b) {
						b && (T.ItemBar.constructPriceComparationInfo(b, a.Product, a.Items), T.console.debug("Current product price: " + b))
					}))
				})) : b.likeItems ? T.ItemBar.initLike({
					productList: b.likeItems
				}) : b.productSameTag ? (c = a.getKeyword(), T.browser.extension.sendRequest({
					topic: "item_search",
					Keyword: c,
					SearchEngine: "product_search",
					ItemPage: 1
				}, function(a) {
					T.console.debug("1. " + a.Items.length);
					"object" == typeof a.Items && 0 < a.Items.length && (T.ItemBar.initSame({
						productList: a.Items,
						product: a.Product,
						Keyword: c
					}, !0), T.ItemBar.parseCurrentProductPrice(function(b) {
						b && (T.ItemBar.constructPriceComparationInfo(b, a.Product, a.Items), T.console.debug("Current product price: " + b))
					}))
				})) : b.keyword ? T.ItemBar.initRelated(b.keyword) : T.ItemBar.initSearch()
			}
		})
	};
	var Vb = export_para_u;
	Vb.etaoLike = {
		_productList: null,
		render: function(a) {
			(a = this._productList = a || this._productList) &&
				Vb.SearchBox.Products.renderByData(a)
		}
	};
	var N = export_para_u,
		ab = window,
		ma = N.SearchBox.Util,
		m = N.transform_selector;
	N.SrpCompare = {
		initialized: !1,
		hideDelay: 100,
		hideIconTimer: ca,
		hidePopupTimer: ca,
		templateInserted: !1,
		CLASS_ICON_DISABLED: m("huoyan-icon-disabled"),
		init: function() {
			var a = this;
			this.initialized || (this.initialized = !0, N.browser.extension.sendRequest({
				topic: "get_srp_config",
				domain: ma.getLocationProperty(ab, "hostname")
			}, function(b) {
				b && (ma.loadJQuery(), a.bindEvents(b))
			}))
		},
		destory: function() {
			$("." + m("fast-compare-protection")).remove()
		},
		registeredAnchorAndImg: [],
		bindEvents: function(a) {
			for (var b = this, c = 0, d = a.length; c < d; c++) {
				var e = a[c];
				if (("undefined" == typeof e.url || RegExp(e.url).test(ma.getLocationHref(ab))) && "undefined" != typeof e.patterns) {
					for (var f = !1, e = e.patterns, h = 0, g = e.length; h < g; h++) {
						var j = e[h],
							m = "undefined" != typeof j.list,
							k = m ? $(j.list) : $(document.body);
						0 < k.size() && (j.img && j.a && !ma.elemInArray(j.img + "|" + j.a, this.registeredAnchorAndImg)) && (this.registeredAnchorAndImg.push(j.img + "|" + j.a), f = function(a, c) {
							return function(d) {
								b.showIcon($(d.target),
									a, c)
							}
						}(j, k), m ? k.delegate(j.img, "mouseenter", f).delegate(j.img, "mouseleave", function() {
							b.hideIcon(b.hideDelay);
							b.hidePopup(b.hideDelay)
						}) : $(j.img, k).mouseenter(f).mouseleave(function() {
							b.hideIcon(b.hideDelay);
							b.hidePopup(b.hideDelay)
						}), f = !0)
					}
					if (f) break
				}
			}
		},
		parseCurrentProductPrice: function(a, b, c) {
			for (var d, e, f = 0; f < a.length; f++) {
				e = b;
				for (var h = 0; h < a[f].imgToItemLevel; h++) e = e.parent();
				d = $(a[f].selector, e).eq(0);
				if (d.length) break
			}
			d.length && ("IMG" == d.get(0).tagName ? N.SearchBox.Util.parseImagePrice(d, function(a) {
				var e =
					d,
					a = N.SearchBox.Util.parsePriceString(a);
				c(a, b, e)
			}) : (a = d.text(), e = d, a = N.SearchBox.Util.parsePriceString(a), c(a, b, e)))
		},
		priceComparationInfo: {
			valid: !1,
			type: "",
			currentPrice: ca,
			currentMerchantName: "",
			productTitle: "",
			relativeMerchantName: "",
			priceDiff: ca
		},
		constructPriceComparationInfo: function(a, b, c) {
			var d = this.priceComparationInfo;
			if (!a || !b || !c) d.valid = !1;
			else {
				var e = ma.getSiteMetaInfo(ma.getLocationProperty(ab, "hostname"));
				e ? (d.currentMerchantName = e.name, (e = ma.parsePriceString(c.Price)) ? (e = a - e, d.priceDiff =
					Math.abs(e).toFixed(1), 0 < e ? d.type = "expensive" : 0 > e && (d.type = "cheap"), e = b.Book ? ["\u300a", "\u300b"] : ["\u201c", "\u201d"], d.productTitle = e[0] + b.Title + e[1], d.currentPrice = a, d.relativeMerchantName = c.SiteName, d.valid = !0) : d.valid = !1) : d.valid = !1
			}
		},
		currentImageElement: null,
		selectorPattern: null,
		matchedResultList: null,
		showIcon: function(a, b, c) {
			var d = this;
			this.clearHideIconTimer();
			var e = $(b.img, c).index(a); - 1 != e && (e = $(b.a, c).eq(e), 0 != e.size() && (this.currentImageElement = a, this.selectorPattern = b, this.matchedResultList =
				c, d.templateInserted ? d.setIconPosition() : d.insertTemplateAndBindEvents(function() {
					d.setIconPosition()
				}), this.currentProductLink = e.get(0).href))
		},
		setIconPosition: function() {
			this.enableIcon();
			var a = this.currentImageElement,
				b = $("#" + m("huoyan-icon")),
				c = a.offset(),
				d = a.outerWidth(),
				a = a.outerHeight(),
				e = b.width(),
				f = b.height();
			b.css({
				top: c.top + a - f - 1 + "px",
				left: c.left + (d - e) / 2 + "px"
			}).show()
		},
		clearHideIconTimer: function() {
			this.hideIconTimer != ca && clearTimeout(this.hideIconTimer);
			this.hideIconTimer = ca
		},
		hideIcon: function(a) {
			var b =
				this;
			this.clearHideIconTimer();
			a ? this.hideIconTimer = setTimeout(function() {
				b._hideIcon()
			}, a) : this._hideIcon()
		},
		_hideIcon: function() {
			$("#" + m("huoyan-icon")).hide()
		},
		disableIcon: function() {
			$("#" + m("huoyan-icon")).addClass(this.CLASS_ICON_DISABLED)
		},
		enableIcon: function() {
			$("#" + m("huoyan-icon")).removeClass(this.CLASS_ICON_DISABLED)
		},
		showPopup: function() {
			var a = this.currentImageElement,
				b = this.selectorPattern,
				c = this.matchedResultList;
			if (a && b && c) {
				var d = this;
				this.currentImageElement = a;
				var e = $(b.img, c).index(a); - 1 != e && (c = $(b.a, c).eq(e), 0 != c.size() && (c = c.get(0).href, d.hidePopup(), N.browser.extension.sendRequest({
					topic: "get_price_comparation_and_history_prices_data",
					link: c
				}, function(c) {
					if (!c || !c.Item) d.disableIcon();
					else {
						var e = c.Items,
							g = c.tagsInfo,
							j = c.Item;
						if ("undefined" != typeof j) {
							d.searchResult = c;
							var D = $("#" + m("huoyan-wrapper")).show();
							N.SearchBox.Util.sendLog("show_compare", ma.getLocationHref(ab));
							var k = $("#" + m("fast-compare"));
							$("#" + m("no-price-comparation-info")).hide();
							var p = $("#" + m("huoyan-header")),
								r = $("#" + m("huoyan-body")),
								t = $("#" + m("hy-ivy-bar")),
								s = $("#" + m("hy-tags-wrapper")),
								u;
							if (e && 0 < e.length) {
								for (var g = [], w, x = 0, A = e.length; x < A; x++) w = e[x], u = "" + m("fc-item"), g.push('<li class="' + u + '" title="' + w.SiteName + '"><a class="' + m("fc-item-link") + '" href="javascript:void(0);" data-click-url="' + w.ClickUrl + '"><img width="16" height="16" class="' + m("fc-item-img") + '" alt="' + w.SiteName + '" src="' + w.SiteLogo + '" /><span class="' + m("fc-item-price") + '">' + w.Price + "</span></a></li>");
								$("#" + m("fc-list")).empty().append(g.join("\n"));
								k.css("display", "inline-block");
								s.hide();
								u = 425;
								g = 427
							} else if (g && g.tags && 2 < g.tags.length) {
								w = g.tags;
								var E = g.item_id,
									g = "";
								u = m("hy-tag-item");
								for (var G, x = 0, A = w.length; x < A; x++) G = w[x], g += '<li class="' + u + '">' + G + "</li>";
								$("#" + m("hy-tag-list")).empty().append(g);
								g = "http://ruyi.taobao.com/item/" + encodeURIComponent(E) + "?utm_medium=ext&utm_source=ruyi#similar";
								$("#" + m("hy-tag-list")).attr("data-href", g);
								$("#" + m("hy-search-tags-in-etao")).attr("href", g);
								u = 425;
								g = 427;
								s.css("display", "inline-block");
								k.hide()
							} else u =
								314, setTimeout(function() {
									k.hide();
									s.hide()
								}, 0), g = 316;
							p.width(u);
							r.width(u);
							t.width(u);
							d.renderPlot(j.Prices, j);
							var j = b.price,
								p = a.attr(m("detected-price")),
								H = c.Product,
								I;
							e && (I = e[0]);
							p ? d.constructPriceComparationInfo(p, H, I) : j && j.length && d.parseCurrentProductPrice(j, a, function(b) {
								a.attr(m("detected-price"), b);
								d.constructPriceComparationInfo(b, H, I)
							});
							c = $("#" + m("huoyan-wrapper") + " ." + m("fc-arrow"));
							arrow_width = c.width();
							e = a.offset();
							D.outerHeight();
							parseInt(c.css("height"));
							j = e.top + a.outerHeight() / 2 -
								D.outerHeight() / 2;
							p = e.left + a.outerWidth() + arrow_width;
							t = $(document.body).scrollLeft() + document.documentElement.clientWidth;
							p + g < t ? (c.removeClass(m("fc-arrow-right")), c.css({
								left: -1 * arrow_width
							}), k.addClass(m("float-right-layout")), s.addClass(m("float-right-layout")), $("#" + m("hy-price-curve")).prependTo(r)) : (c.addClass("" + m("fc-arrow-right")), p = e.left - arrow_width - g, c.css({
								left: g - 2
							}), k.removeClass(m("float-right-layout")).prependTo(r), s.removeClass(m("float-right-layout")).prependTo(r));
							D.css({
								top: j,
								left: p
							})
						}
					}
				}), this.getWantCounts(c)))
			}
		},
		clearHidePopupTimer: function() {
			this.hidePopupTimer != ca && clearTimeout(this.hidePopupTimer);
			this.hidePopupTimer = ca
		},
		hidePopup: function(a) {
			var b = this;
			this.clearHidePopupTimer();
			a ? this.hidePopupTimer = setTimeout(function() {
				b._hidePopup()
			}, a) : this._hidePopup()
		},
		_hidePopup: function() {
			$("#" + m("huoyan-wrapper")).hide()
		},
		insertTemplateAndBindEvents: function(a) {
			var b = this;
			N.SearchBox.Util.getTemplate("views/srp-compare.html", function(c) {
				if (!b.templateInserted) {
					b.templateInserted = !0;
					N.SearchBox.Util.randomAppend(document.body, c);
					$("#" + m("huoyan-wrapper")).mouseenter(function() {
						b.clearHideIconTimer();
						b.clearHidePopupTimer()
					}).mouseleave(function() {
						b.hidePopup();
						b.hideIcon()
					});
					$("#" + m("fast-compare")).delegate("." + m("fc-item-link"), "click", function() {
						var a = $(this).attr("data-click-url");
						N.browser.extension.sendRequest({
							topic: "tab_open",
							url: a
						});
						N.SearchBox.Util.sendLog("click_compare", a + "|" + ma.getLocationHref(ab))
					});
					$("#" + m("fc-product-link")).click(function() {
						b.searchResult &&
							("undefined" != typeof b.searchResult.Product && "undefined" != typeof b.searchResult.Product.DetailPageURL) && (N.SearchBox.Util.sendLog("click_compare", b.searchResult.Product.DetailPageURL), window.open(b.searchResult.Product.DetailPageURL))
					});
					var d = null;
					$("#" + m("hy-price-curve-plot")).bind("plothover", function(a, c, h) {
						h ? d != h.dataIndex && (d = h.dataIndex, b.hideTip(), a = new Date(h.datapoint[0]), a = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate(), c = h.datapoint[1].toFixed(2), c = "\uffe5 " + ma.addThousandSeparator(c),
							b.showTip(a, c, h.pageX, h.pageY)) : (b.hideTip(), d = null)
					});
					$("#" + m("fc-share")).click(function() {
						if (b.searchResult && "undefined" != typeof b.searchResult.Item && "undefined" != typeof b.searchResult.Item.DetailPageURL) {
							var a = b.searchResult.Item,
								c = a.DetailPageURL,
								d = a.SmallImageUrl.replace("_80x80.jpg", ""),
								g = N.Share.getContentTemplate("ca", {
									productTitle: "\u201c" + a.Title + "\u201d"
								}),
								a = b.priceComparationInfo;
							a.valid && 0 != a.priceDiff && (g = "pk_" + a.type, g = N.Share.getContentTemplate(g, a));
							var j = {
								custom: !0,
								siteId: "sina_weibo",
								text: g,
								url: c
							}, c = N.Share;
							c.supportCaptureShare ? (j.imageType = "capture", N.Share.calcCaptureDataForFastCompare(b.currentImageElement, function(a) {
								j.imageWidth = a.width;
								j.imageHeight = a.height;
								j.top = a.top;
								j.left = a.left;
								N.Share.handleRequest(j)
							})) : (j.imageUrl = d, c.supportSimpleShare ? j.imageType = "simple" : j.custom = !1, N.Share.handleRequest(j))
						}
					});
					$("#" + m("huoyan-icon")).mouseenter(function() {
						b.clearHideIconTimer();
						b.showPopup()
					}).mouseleave(function() {
						b.hideIcon(b.hideDelay);
						b.hidePopup(b.hideDelay)
					});
					$("#" + m("hy-ivy-wants-text")).click(function() {
						b.openUserHomepage(b.currentItemId)
					});
					$("#" + m("hy-ivy-want-btn")).click(function() {
						$(this).hasClass(m("bought")) || (b.wantThis(b.currentProductLink), N.SearchBox.Util.sendLog("click_compare", b.currentProductLink))
					});
					a && "function" == typeof a && a();
					$("#" + m("hy-tag-list")).click(function() {
						ma.openTab($(this).attr("data-href"), !0)
					})
				}
			})
		},
		filterPriceHistoryData: function(a, b) {
			var c = 0;
			if (a) {
				for (var d = 0, e = 0, f = a.length; e < f; e++) a[e][0] *= 1E3, a[e][0] > d && (d = a[e][0]), null == a[e][1] && (a[e][1] = ca, c++);
				c = new Date;
				(f = b || "") || (f = a[a.length - 1][1]);
				d = new Date(parseInt(d));
				f && (c.getMonth() == d.getMonth() ? c.getDate() != d.getDate() && (a[e] = [c.getTime(), f]) : a[e] = [c.getTime(), f])
			}
			return a
		},
		renderPlot: function(a, b) {
			var c = b.Price.replace(/\uffe5|\s/g, ""),
				c = parseFloat(c);
			if ((a = this.filterPriceHistoryData(a, c)) && 0 < a.length) {
				var d = $("#" + m("hy-price-curve-plot")),
					e = this;
				try {
					this.drawPlot(a, d)
				} catch (f) {
					N.console.debug("draw plot error: " + f.message), setTimeout(function() {
						try {
							e.drawPlot(a, d)
						} catch (b) {
							N.console.debug("draw plot error again: " + b.message)
						}
					}, 0)
				}
				var c = this.getPrice(a, "max"),
					h = this.getPrice(a, "min");
				this.setPrices(h, c, b.nid)
			}
		},
		getPrice: function(a, b) {
			for (var c = [], d = 0, e = a.length; d < e; d++) a[d][1] && c.push(a[d][1]);
			return Math[b].apply(null, c)
		},
		setPrices: function(a, b, c) {
			a = this.getPriceInfoTemplate(this.formatNum(a), this.formatNum(b), c);
			$("#" + m("hy-pc-price-info")).html(a)
		},
		drawPlot: function(a, b) {
			var c = new Date,
				d = c.getTime();
			c.setMonth(c.getMonth() - 3);
			c.setDate(c.getDate() - 1);
			var c = c.getTime(),
				e = this.getPrice(a, "max"),
				f = this.getPrice(a, "min"),
				h;
			1 > e - f && (h = 2);
			d = {
				series: {
					lines: {
						show: !0,
						lineWidth: 1,
						steps: !0
					},
					points: {
						show: !0,
						radius: 2,
						lineWidth: 0,
						fillColor: "#faaa2b"
					},
					color: "#fab13c",
					shadowSize: 1
				},
				grid: {
					hoverable: !0,
					backgroundColor: "#fff",
					borderWidth: 1,
					borderColor: "#d1e3ea",
					tickColor: "#d1e3ea",
					labelMargin: 8
				},
				xaxis: {
					min: c,
					max: d,
					mode: "time",
					timeformat: "%0m/%0d",
					tickSize: [15, "day"]
				},
				yaxis: {
					minTickSize: 5,
					tickDecimals: h,
					tickFormatter: this.formatNum
				}
			};
			try {
				b.data("plot")
			} catch (g) {
				N.console.debug("destroy plot error: " + g.message)
			}
			$.plot(b, [a], d)
		},
		showTip: function(a, b, c, d) {
			var e = this.getPriceCurveTipTemplate();
			$(document.body).append(e);
			b = "\u4ef7\u683c\uff1a" + b;
			$("#" + m("hy-current-point-date")).text("\u65e5\u671f\uff1a" + a);
			$("#" + m("hy-current-point-price")).text(b);
			var a = $("#" + m("hy-price-curve-tip")),
				b = a.outerWidth(),
				e = a.outerHeight(),
				f = c - b / 2,
				h = (b - 8) / 2,
				g = document.documentElement.clientWidth;
			f + b > g && (f = g - b, h = b - (g - c) - 4);
			a.css({
				top: d - e - 15,
				left: f
			}).addClass(m("hy-tip-visible"));
			$("#" + m("hy-price-curve-arrow-down")).css("left", h)
		},
		hideTip: function() {
			$("#" + m("hy-price-curve-tip")).remove()
		},
		formatNum: function(a) {
			a =
				Math.round(100 * a) / 100;
			return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
		},
		getPriceCurveTipTemplate: function() {
			return '<div id="' + m("hy-price-curve-tip") + '" ><div id="' + m("hy-current-point-date") + '"></div><div id="' + m("hy-current-point-price") + '"></div><div id="' + m("hy-price-curve-arrow-down") + '"></div></div>'
		},
		getWantCounts: function(a) {
			var b = this;
			N.browser.extension.sendRequest({
				topic: "item_like_count",
				url: a
			}, function(a) {
				if (a.error) $("#" + m("huoyan-wrapper")).addClass(m("fetch-like-count-error"));
				else {
					$("#" + m("huoyan-wrapper")).removeClass(m("fetch-like-count-error"));
					var d = a.wanted,
						e = a.users;
					b.currentItemId = a.item_id;
					b.updateWantsStatus(e, d)
				}
			})
		},
		wantThis: function(a) {
			var b = this;
			N.browser.extension.sendRequest({
				topic: "item_like_add",
				url: a
			}, function(a) {
				a && (a.success && "undefined" != typeof a.users) && b.updateWantsStatus(a.users, !0)
			})
		},
		updateWantsStatus: function(a, b) {
			var c = "",
				c = '<a class="' + m("ivy-wants-count") + '" target="_blank">';
			$("#" + m("hy-ivy-want-btn")).removeClass(m("bought"));
			a = parseInt(a);
			if (isNaN(a) || 0 > a) a = 0;
			0 == a ? c = "\u6210\u4e3a\u7b2c " + c + "1 \u4e2a</a>\u60f3\u4e70\u7684\u5982\u610f\u6dd8\u7528\u6237" : b ? (c = 1 == a ? "\u4f60\u662f\u7b2c" + c + " 1 \u4e2a</a>\u60f3\u4e70\u7684\u5982\u610f\u6dd8\u7528\u6237" : "\u4f60\u4e0e\u5176\u4ed6" + c + (a - 1) + " \u4e2a</a>\u5982\u610f\u6dd8\u7528\u6237\u90fd\u60f3\u4e70", $("#" + m("hy-ivy-want-btn")).addClass(m("bought"))) : c = "\u5982\u610f\u6dd8\u7528\u6237\u4e2d\u6709" + c + a + " \u4eba</a>\u60f3\u4e70";
			$("#" + m("hy-ivy-wants-text")).html(c)
		},
		openUserHomepage: function(a) {
			N.browser.extension.sendRequest({
				topic: "item_like_open_homepage",
				item_id: a
			})
		},
		getPriceInfoTemplate: function(a, b) {
			return '<span>\u6700\u9ad8\u4ef7\uff1a<span class="' + m("hy-highest-price") + '">\uffe5' + b + '</span></span><span>\u6700\u4f4e\u4ef7\uff1a<span class="' + m("hy-lowest-price") + '">\uffe5' + a + "</span></span>"
		}
	};
	var ib = export_para_u,
		pc = window,
		qc = ib.SearchBox.Util;
	ib.CnaCookie = {
		hostRegexp: /\b(taobao|etao|tmall)\.com/,
		init: function() {
			if (this.hostRegexp.test(qc.getLocationProperty(pc, "hostname"))) {
				var a = ib.get_cookie("cna");
				a && ib.browser.extension.sendRequest({
					topic: "set_cna_cookie",
					value: a
				})
			}
		}
	};
	var jb = export_para_u,
		rc = window,
		sc = jb.SearchBox.Util;
	jb.TracknickCookie = {
		hostRegexp: /\b(taobao|etao|tmall)\.com/,
		init: function() {
			if (this.hostRegexp.test(sc.getLocationProperty(rc, "hostname"))) {
				var a = jb.get_cookie("tracknick");
				a && jb.browser.extension.sendRequest({
					topic: "set_tracknick_cookie",
					value: a
				})
			}
		}
	};
	var tc = export_para_u,
		wEventProxy = function() {
			if (!(this instanceof wEventProxy)) return new wEventProxy;
			this._callbacks = {};
			this._fired = {}
		};
	wEventProxy.prototype.addListener = function(a, b) {
		this._callbacks = this._callbacks || {};
		this._callbacks[a] = this._callbacks[a] ||
			[];
		this._callbacks[a].push(b);
		return this
	};
	wEventProxy.prototype.bind = wEventProxy.prototype.addListener;
	wEventProxy.prototype.on = wEventProxy.prototype.addListener;
	wEventProxy.prototype.await = wEventProxy.prototype.addListener;
	wEventProxy.prototype.removeListener = function(a, b) {
		var c = this._callbacks,
			d;
		if (a) {
			if (c)
				if (b) {
					var e = c[a];
					if (!e) return this;
					d = e.length;
					for (c = 0; c < d; c++)
						if (b === e[c]) {
							e[c] = null;
							break
						}
				} else c[a] = []
		} else this._callbacks = {};
		return this
	};
	wEventProxy.prototype.unbind = wEventProxy.prototype.removeListener;
	wEventProxy.prototype.removeAllListeners = function(a) {
		return this.unbind(a)
	};
	wEventProxy.prototype.trigger =
		function(a, b) {
			var c, d, e, f, h, g, j = 2;
			if (!(d = this._callbacks)) return this;
			for (; j--;)
				if (c = j ? a : "all", c = d[c]) {
					h = 0;
					for (g = c.length; h < g; h++)(e = c[h]) ? (f = j ? Array.prototype.slice.call(arguments, 1) : arguments, e.apply(this, f)) : (c.splice(h, 1), h--, g--)
				}
			return this
	};
	wEventProxy.prototype.emit = wEventProxy.prototype.trigger;
	wEventProxy.prototype.fire = wEventProxy.prototype.trigger;
	wEventProxy.prototype.once = function(a, b) {
		var c = this,
			d = function() {
				b.apply(c, arguments);
				c.unbind(a, d)
			};
		this.bind(a, d);
		return this
	};
	wEventProxy.prototype.immediate = function(a, b, c) {
		this.bind(a, b);
		this.trigger(a,
			c);
		return this
	};
	var Wb = function(a, b, c, d) {
		var e = this,
			f, h = 0,
			g = arguments.length,
			j, m, k, p, r = 0,
			t = {};
		if (3 > g) return this;
		k = Array.prototype.slice.apply(arguments, [0, g - 2]);
		m = arguments[g - 2];
		p = arguments[g - 1];
		if ("function" !== typeof m) return this;
		f = k.length;
		g = function(a) {
			e[p ? "once" : "bind"](a, function(b) {
				e._fired[a] = e._fired[a] || {};
				e._fired[a].data = b;
				t[a] || (t[a] = !0, r++)
			})
		};
		for (h = 0; h < f; h++) g(k[h]);
		j = function() {
			if (!(r < f)) {
				var a = [];
				for (h = 0; h < f; h++) a.push(e._fired[k[h]].data);
				p && e.unbind("all", j);
				m.apply(null, a)
			}
		};
		e.bind("all", j)
	};
	wEventProxy.prototype.all = function(a, b, c) {
		var d = Array.prototype.concat.apply([], arguments);
		d.push(!0);
		Wb.apply(this, d);
		return this
	};
	wEventProxy.prototype.assign = wEventProxy.prototype.all;
	wEventProxy.prototype.tail = function() {
		var a = Array.prototype.concat.apply([], arguments);
		a.push(!1);
		Wb.apply(this, a);
		return this
	};
	wEventProxy.prototype.assignAll = wEventProxy.prototype.tail;
	wEventProxy.prototype.assignAlways = wEventProxy.prototype.tail;
	wEventProxy.prototype.after = function(a, b, c) {
		if (0 === b) return c.call(null, []), this;
		var d = this,
			e = [],
			f;
		f = function(h, g) {
			h === a && (b--, e.push(g), 1 >
				b && (d.unbind("all", f), c.apply(null, [e])))
		};
		d.bind("all", f);
		return this
	};
	wEventProxy.prototype.any = function() {
		var a = this,
			b, c, d = arguments.length;
		b = arguments[d - 1];
		var d = Array.prototype.slice.apply(arguments, [0, d - 1]),
			e = d.length,
			f = d.join("_");
		a.once(f, b);
		c = function(b) {
			a.bind(b, function(c) {
				a.trigger(f, {
					data: c,
					eventName: b
				})
			})
		};
		for (b = 0; b < e; b++) c(d[b])
	};
	wEventProxy.prototype.not = function(a, b) {
		this.bind("all", function(c, d) {
			c !== a && b(d)
		})
	};
	wEventProxy.create = function() {
		var a = new wEventProxy;
		arguments.length && a.assign.apply(a, Array.prototype.slice.call(arguments));
		return a
	};
	tc.EventProxy = wEventProxy;
	var export_para_X = export_para_u,
		Xb = document,
		Yb = export_para_X.SearchBox.Util,
		Zb = export_para_X.SearchBox.Tmpl,
		R = export_para_X.transform_selector,
		uc = Yb.getLocationHref(window),
		da = function(a) {
			if (a)
				for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b])
		};
	da.prototype.getCurrentPrice = function() {};
	da.prototype.destoryTemplateWrapper = function() {
		this.templateWrapper && (this.templateWrapper.remove(), delete this.templateWrapper)
	};
	export_para_X.PriceCurve = {
		proxy: null,
		nodataClass: R("price-curve-no-data"),
		buttonDom: "#" + R("like-button-price-curve"),
		site: null,
		sites: {
			"tmall.com": new da,
			"taobao.com": new da,
			"360buy.com": new da,
			"dangdang.com": new da,
			"suning.com": new da({
				getCurrentPrice: function() {
					var a = $("#netPrice em").text();
					if (a && a.match(/\d+\.\d+/)) return a
				}
			}),
			"gome.com.cn": new da({
				getCurrentPrice: function() {
					var a = $(".info .price b");
					if ((a = 0 < a.size() ? a.text() : "") && a.match(/\d+\.\d+/)) return a
				}
			}),
			"coo8.com": new da,
			"yhd.com": new da({
				getCurrentPrice: function() {
					var a = 0 < $("#current_price").size() ? $("#current_price").text() : $("#nonMemberPrice").text();
					if (a && a.match(/\d+\.\d+/)) return a
				}
			}),
			"51buy.com": new da({
				getCurrentPrice: function() {
					var a = 0 < $("#goods_detail_mate .item_icson .price_font").size() ? $("#goods_detail_mate .item_icson .price_font").text() : "";
					if (a && a.match(/\d+\.\d+/)) return a
				}
			}),
			"yixun.com": new da({
				getCurrentPrice: function() {
					var a = 0 < $("#goods_detail_mate .item_icson .price_font").size() ? $("#goods_detail_mate .item_icson .price_font").text() : "";
					if (a && a.match(/\d+\.\d+/)) return a
				}
			}),
			"amazon.cn": new da,
			"vancl.com": new da,
			"vjia.com": new da,
			"lefeng.com": new da,
			"newegg.com.cn": new da,
			"xiu.com": new da,
			"jumei.com": new da
		},
		copyStyle: function(a, b, c) {
			var d = {}, e = 0;
			for (len = c.length; e < len; e++) d[c[e]] = b.css(c[e]);
			a.css(d)
		},
		init: function(a) {
			this.mode = a;
			this._init()
		},
		_init: function() {
			var a = this,
				b = export_para_X.site.get_site(export_para_X.site.get_domain(Xb));
			this.sites["jd.com"] = this.sites["360buy.com"];
			this.sites.hasOwnProperty(b) && (this.site = this.sites[b], $(this.buttonDom).css("display", "block"), this.site.insertTemplate = function(a) {
				var b = $("body"),
					e = this.templateWrapper = $("<div/>");
				e.addClass(R("price-curve-protection"));
				e.appendTo(b).append(a);
				return !0
			}, export_para_X.SearchBox.Util.loadJQuery(), export_para_X.SearchBox.Util.getTemplate("views/price-curve.html", function(b) {
				a.site.insertTemplate(b) && (a.proxy = new export_para_X.EventProxy, a.proxy.assign("priceHistoryData", function() {
					a.render.apply(a, arguments);
					a.bindEvents.apply(a)
				}), a.getPriceHistoryData())
			}))
		},
		destory: function() {
			$("#" + R("price-curve")).remove();
			$("#" + R("price-curve-style")).remove()
		},
		render: function(a) {
			this.hideLoading();
			if (a) {
				var b = $("#" + R("price-curve-plot")),
					c = this,
					d = this.filterPriceHistoryData(a.Item.Prices);
				try {
					this.drawPlot(d, b)
				} catch (e) {
					$.browser.msie && 9 <= $.browser.version || (export_para_X.console.debug("draw plot error: " + e.message), setTimeout(function() {
						try {
							c.drawPlot(d, b)
						} catch (a) {
							export_para_X.console.debug("draw plot error again: " + a.message), $("#" + R("price-curve")).remove()
						}
					}, 0))
				}
				var f = this.getPrice(d, "max"),
					h = this.getPrice(d, "min");
				this.setPrices(h, f, a.Item.nid)
			} else this.handleNoPriceData()
		},
		getPriceHistoryData: function() {
			var a = this;
			export_para_X.browser.extension.sendRequest({
				topic: "get_price_history_data",
				url: uc
			}, function(b) {
				a.proxy.trigger("priceHistoryData",
					b)
			})
		},
		filterPriceHistoryData: function(a) {
			var b = 0;
			if (a) {
				for (var c = 0, d = 0, e = a.length; d < e; d++) a[d][0] *= 1E3, a[d][0] > c && (c = a[d][0]), null == a[d][1] && (a[d][1] = ca, b++);
				var f = new Date,
					h = this.site.getCurrentPrice();
				h || (h = a[a.length - 1][1]);
				c = new Date(parseInt(c));
				h && (f.getMonth() == c.getMonth() ? f.getDate() != c.getDate() && (a[d] = [f.getTime(), h]) : a[d] = [f.getTime(), h]);
				if (2 > a.length || b == e) a = null
			}
			return a
		},
		getPrice: function(a, b) {
			for (var c = [], d = 0, e = a.length; d < e; d++) a[d][1] && c.push(a[d][1]);
			return Math[b].apply(null, c)
		},
		setPrices: function(a, b, c) {
			a = Zb.getPriceInfoTemplate(this.formatNum(a), this.formatNum(b), c);
			$("#" + R("pc-price-info")).html(a)
		},
		drawPlot: function(a, b) {
			var c = new Date,
				d = c.getTime();
			c.setMonth(c.getMonth() - 3);
			c.setDate(c.getDate() - 1);
			var c = c.getTime(),
				e = this.getPrice(a, "max"),
				f = this.getPrice(a, "min"),
				h;
			1 > e - f && (h = 2);
			$.plot(b, [a], {
				series: {
					lines: {
						show: !0,
						lineWidth: 1,
						steps: !0
					},
					points: {
						show: !0,
						radius: 2,
						lineWidth: 0,
						fillColor: "#faaa2b"
					},
					color: "#fab13c",
					shadowSize: 1
				},
				grid: {
					hoverable: !0,
					backgroundColor: "#fff",
					borderWidth: 1,
					borderColor: "#d1e3ea",
					tickColor: "#d1e3ea",
					labelMargin: 8
				},
				xaxis: {
					min: c,
					max: d,
					mode: "time",
					timeformat: "%0m/%0d",
					tickSize: [15, "day"]
				},
				yaxis: {
					minTickSize: 5,
					tickDecimals: h,
					tickFormatter: this.formatNum
				}
			})
		},
		bindEvents: function() {
			var a = this,
				b = {
					timer: null,
					clear: function() {
						this.timer && (clearTimeout(this.timer), delete this.timer)
					},
					set: function(a) {
						this.clear();
						this.timer = a
					}
				};
			$(this.buttonDom).bind("mouseenter", function() {
				b.clear();
				a.show()
			}).bind("mouseleave", function() {
				b.set(setTimeout($.proxy(a.hide,
					a), 50))
			});
			$("#" + R("price-curve")).bind("mouseenter", function() {
				b.clear()
			}).bind("mouseleave", function() {
				b.set(setTimeout($.proxy(a.hide, a), 50))
			});
			var c = null;
			$("#" + R("price-curve-plot")).bind("plothover", function(b, e, f) {
				f ? c != f.dataIndex && (c = f.dataIndex, a.hideTip(), b = new Date(f.datapoint[0]), b = b.getFullYear() + "/" + (b.getMonth() + 1) + "/" + b.getDate(), e = f.datapoint[1].toFixed(2), e = "\uffe5 " + Yb.addThousandSeparator(e), a.showTip(b, e, f.pageX, f.pageY)) : (a.hideTip(), c = null)
			})
		},
		handleNoPriceData: function() {
			$("#" +
				R("no-price-history-info")).show();
			$("#" + R("price-curve-plot")).hide()
		},
		hideLoading: function() {
			$("#" + R("price-curve-loading")).hide()
		},
		adjustPosition: function() {
			var a = $("#" + R("price-curve")),
				b = $(this.buttonDom),
				c = b.offset(),
				d = b.outerWidth(),
				b = b.outerHeight(),
				b = c.top + b + 5,
				e = c.left + d - a.outerWidth();
			this.mode == export_para_X.IvyWantBuy.mode.LINE2 && (e = c.left, $("#" + R("price-curve-arrow")).css({
				left: d / 2 - 4 + "px",
				right: "auto"
			}));
			a.css({
				top: b + "px",
				left: e + "px"
			})
		},
		show: function() {
			this.adjustPosition();
			$("#" + R("price-curve")).show()
		},
		hide: function() {
			$("#" + R("price-curve")).hide()
		},
		showTip: function(a, b, c, d) {
			var e = Zb.getPriceCurveTipTemplate();
			$(Xb.body).append(e);
			b = "\u4ef7\u683c\uff1a" + b;
			$("#" + R("current-point-date")).text("\u65e5\u671f\uff1a" + a);
			$("#" + R("current-point-price")).text(b);
			a = $("#" + R("price-curve-tip"));
			b = a.outerWidth();
			e = a.outerHeight();
			a.css({
				top: d - e - 15,
				left: c - b / 2
			}).addClass(R("tip-visible"));
			$("#" + R("price-curve-arrow-down")).css("left", (b - 8) / 2)
		},
		hideTip: function() {
			$("#" + R("price-curve-tip")).remove()
		},
		formatNum: function(a) {
			a =
				Math.round(100 * a) / 100;
			return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
		}
	};
	var I = export_para_u,
		kb = I.SearchBox.Util,
		K = I.transform_selector,
		lb = kb.getLocationHref(window);
	kb.getLocationProperty(window, "hostname");
	var O = K("like-button-protection"),
		ea = function(a) {
			this.getWrapper = a
		};
	ea.prototype.insertTemplate = function(a) {
		return !(!this.getWrapper || !(this.templateWrapper = this.getWrapper(a)))
	};
	ea.prototype.destoryTemplateWrapper = function() {
		this.templateWrapper && (this.templateWrapper.remove(), delete this.templateWrapper,
			delete this.getWrapper)
	};
	I.IvyWantBuy = {
		showPriceAlertSettingsTip: !1,
		site: null,
		sites: {
			"tmall.com": new ea(function(a) {
				var b = $("#J_DetailMeta .tb-key");
				if (0 < b.size()) {
					var c = $("<div></div>").css("padding-top", "15px");
					c.addClass(O);
					b.prepend(c.append(a));
					return c
				}
			}),
			"taobao.com": new ea(function(a) {
				var b = $("#J_PromoPrice"),
					b = 0 >= b.length ? $("#J_StrPriceModBox") : b;
				if (0 < b.size()) {
					var c = $("<li></li>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"360buy.com": new ea(function(a) {
				var b = $("#summary-price");
				b.length || (b = $("#priceinfo").parent());
				if (0 < b.size()) {
					var c = $("<li></li>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"dangdang.com": new ea(function(a) {
				var b = 0 < $("#d_price").size() ? $("#d_price").parent() : $(".show_info .m_price").parent();
				if (0 < b.size()) {
					var c = $("<div></div>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"suning.com": new ea(function(a) {
				var b = $(".product-info-type .sn-price:last");
				if (0 < b.size()) {
					var c = $("<li></li>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"gome.com.cn": new ea(function(a) {
				var b = $("#amount");
				if (0 < b.size()) {
					var c = $("<li/>");
					c.addClass(O);
					I.IvyWantBuy.copyStyle(c, b, ["width"]);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"coo8.com": new ea(function(a) {
				var b = $("#c8InfoData");
				if (0 < b.size()) {
					var c = $("<li/>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"yhd.com": new ea(function(a) {
				var b = $("#currentPriceArea");
				if (0 < b.size()) {
					var c = $("<div></div>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"1mall.com": new ea(function(a) {
				var b = $(".specific_info1:first");
				if (0 < b.size()) {
					var c = $("<div></div>");
					c.addClass(O);
					c.css({
						marginLeft: 14
					});
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"yixun.com": new ea(function(a) {
				var b = $(".xbase_item.xprice:last");
				if (0 < b.size()) {
					var c = $("<div/>");
					c.addClass(O);
					I.IvyWantBuy.copyStyle(c, b, ["marginBottom"]);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"amazon.cn": new ea(function(a) {
				var b = $("#actualPriceRow").parent();
				if (0 < b.size()) {
					var c = $("<tr/>");
					c.addClass(O);
					c.appendTo(b).append($('<td colspan="2"></td>').append(a));
					return c
				}
			}),
			"vancl.com": new ea(function(a) {
				var b =
					$(".MSpriceArea");
				if (0 < b.size()) {
					var c = $("<div/>").css("marginTop", "10px");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"vjia.com": new ea(function(a) {
				var b = $("#MarketPrice"),
					b = 0 < b.length ? b.parent("li") : $("#SellPrice").parent("li");
				if (0 < b.size()) {
					var c = $("<li/>").css("clear", "both");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"lefeng.com": new ea(function(a) {
				var b = $(".messagenu");
				if (0 < b.size()) {
					var c = $("<p/>");
					c.addClass(O);
					c.insertBefore(b).append(a);
					return c
				}
			}),
			"newegg.com.cn": new ea(function(a) {
				var b =
					$(".neweggPrice");
				if (0 < b.size()) {
					var c = $("<dd/>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"xiu.com": new ea(function(a) {
				var b = $(".col1.xs2");
				0 == b.length && (b = $(".col1.layer12"));
				if (0 < b.size()) {
					var c = $("<p/>").css("clear", "both");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			}),
			"jumei.com": new ea(function(a) {
				var b = $(".info .productinfo_righttop .price");
				if (0 < b.size()) {
					var c = $("<div/>");
					c.addClass(O);
					c.insertAfter(b).append(a);
					return c
				}
			})
		},
		copyStyle: function(a, b, c) {
			var d = {}, e = 0;
			for (len =
				c.length; e < len; e++) d[c[e]] = b.css(c[e]);
			a.css(d)
		},
		setBadge: function(a) {
			I.browser.extension.sendRequest({
				topic: "set_badge",
				text: a
			})
		}
	};
	I.IvyWantBuy.event = new I.EventProxy;
	I.IvyWantBuy.mode = {
		DEFAULT: "like-button-mode-default",
		LINE2: "like-button-mode-line2"
	};
	I.IvyWantBuy.checkMode = function() {
		var a = this.site.templateWrapper.outerWidth() < $("#" + K("like-button")).outerWidth() ? this.mode.LINE2 : this.mode.DEFAULT;
		a != this.mode.DEFAULT && $("#" + K("like-button")).addClass(K(a));
		return a
	};
	I.IvyWantBuy.init = function() {
		var a =
			this,
			b = I.site.get_site(I.site.get_domain(document));
		this.sites["jd.com"] = this.sites["360buy.com"];
		this.sites.hasOwnProperty(b) && (this.site = this.sites[b], "amazon.cn" != b && (I.browser.extension.sendRequest({
			topic: "item_like_count",
			url: lb
		}, function(b) {
			if (!b.error) {
				var d = b.item_id;
				kb.loadJQuery();
				if (!(0 < $("#" + K("like-button")).size())) {
					kb.getTemplate("views/like-button.html", function(d) {
						d = $(d);
						a.site.insertTemplate(d) && (I.PriceCurve.init(a.checkMode()), I.SearchBox.Util.sendLog("show_detail_want", lb), $("#" +
							K("like-button-outer"), d).click(f), $("#" + K("like-button-spec"), d).click(g), h(b.wanted, b.users), I.browser.extension.sendRequest({
							topic: "get_likebtn_tips_status"
						}, function(a) {
							1 != a && setTimeout(function() {
								I.likeButtonTips && I.likeButtonTips.show()
							}, 0)
						}))
					});
					var e = function(a, b) {
						var c = '<span id="' + K("like-button-num") + '"> ',
							a = parseInt(a);
						if (isNaN(a) || 0 > a) a = 0;
						return 0 == a ? "\u6210\u4e3a\u7b2c" + c + "1 </span>\u4e2a\u60f3\u4e70\u7684\u4eba" : b ? 1 == a ? "\u4f60\u662f\u7b2c" + c + "1 </span>\u4e2a\u60f3\u4e70\u7684\u4eba" :
							"\u4f60\u4e0e\u5176\u4ed6" + c + (a - 1) + " </span>\u4e2a\u4eba\u90fd\u60f3\u4e70" : "\u6709" + c + a + " </span>\u4eba\u60f3\u4e70"
					}, f = function() {
							if ($("#" + K("like-button-outer")).hasClass(K("like-button-disabled"))) return !1;
							I.browser.extension.sendRequest({
								topic: "item_like_add",
								url: lb
							}, function(b) {
								I.browser.extension.sendRequest({
									topic: "get_likebtn_popup_status"
								}, function(a) {
									1 != a && I.wantBuyPopup.show()
								});
								"undefined" != typeof b.users && (h(!0, b.users), a.showPriceAlertSettingsTip && ($("#" + K("price-alert-settings-tip")).show(),
									$("#" + K("price-alert-settings-link")).click(function() {
										I.browser.extension.sendRequest({
											topic: "set_price_alert_settings_tip"
										});
										$("#" + K("price-alert-settings-tip")).hide()
									})), I.SearchBox.Util.sendLog("click_detail_want", lb))
							});
							return !1
						}, h = function(a, b) {
							var c = "removeClass";
							a && (c = "addClass");
							$("#" + K("like-button-outer"))[c](K("like-button-disabled"));
							$("#" + K("like-button-spec")).html(e(b, a))
						}, g = function() {
							I.browser.extension.sendRequest({
								topic: "item_like_open_homepage",
								item_id: d
							});
							return !1
						}, j = I.browser.runtime ?
							I.browser.runtime.onMessage : I.browser.extension.onRequest;
					j && j.addListener(function(a) {
						switch (a.topic) {
							case "update_wants_status":
								a.status && a.status.item_id == d && h(a.status.wanted, a.status.users)
						}
					})
				}
			}
		}), I.browser.extension.sendRequest({
			topic: "get_price_alert_settings_tip"
		}, function(b) {
			a.showPriceAlertSettingsTip = b
		})))
	};
	var Ra = export_para_u;
	Ra.SearchBox.Util.getLocationHref(window);
	Ra.wantBuyPopup = {
		init: function() {
			var a = Ra.SearchBox.Util,
				b = this;
			a.getTemplate("views/wantbuy-popup.html", function(c) {
				a.randomAppend(document.body,
					c);
				b._initDom();
				b._initEvent()
			})
		},
		_initDom: function() {
			this.SELECTORS = Ra.transform_selector;
			this._pop = $("." + this.SELECTORS("likebtn-popup"));
			this._close = $("." + this.SELECTORS("close"));
			this._checkLabel = $("." + this.SELECTORS("ft") + " label");
			this._check = $("." + this.SELECTORS("ft") + " input")
		},
		_initEvent: function() {
			var a = this;
			this._close.on("click", function() {
				a.close()
			});
			this._checkLabel.on("click", function() {
				a._checkLabel[0].className = a._check[0].checked ? "selected" : ""
			})
		},
		show: function() {
			this._pop.css({
				display: "block"
			})
		},
		close: function() {
			this._pop.css({
				display: "none"
			});
			this._check[0].checked && Ra.browser.extension.sendRequest({
				topic: "set_likebtn_popup_status"
			})
		}
	};
	Ra.wantBuyPopup.init();
	var bb = export_para_u;
	bb.likeButtonTips = {
		init: function() {
			var a = bb.SearchBox.Util,
				b = this;
			this.SELECTORS = bb.transform_selector;
			a.getTemplate("views/likebtn-tips.html", function(c) {
				a.randomAppend(document.body, c);
				b._initDom();
				b._initEvent()
			})
		},
		_initDom: function() {
			this._closeBtn = $("." + this.SELECTORS("known"));
			this._tips = $("." + this.SELECTORS("want-tips"));
			this._btn = $("#" + this.SELECTORS("like-button-outer"))
		},
		_initEvent: function() {
			var a = this;
			this._closeBtn.on("click", function(b) {
				b.preventDefault();
				a._close()
			});
			$(window).on("resize", function() {
				a._setPos()
			});
			$(window).on("scroll", function() {
				a._setPos()
			})
		},
		show: function() {
			this._tips.css({
				display: "block"
			});
			this._setPos();
			bb.browser.extension.sendRequest({
				topic: "set_likebtn_tips_status"
			})
		},
		fixPos: function() {
			this._setPos()
		},
		_setPos: function() {
			this._btn = $("#" + this.SELECTORS("like-button-outer"));
			var a = this._btn.offset();
			this._tips.css({
				left: a.left,
				top: a.top + 34
			})
		},
		_close: function() {
			this._tips.css({
				display: "none"
			})
		}
	};
	bb.likeButtonTips.init();
	var ua = export_para_u,
		$b = window,
		ac = document,
		va = ua.SearchBox.Util,
		t = ua.transform_selector,
		ha = ua.Share = {
			currentSiteId: "",
			popupShowed: !1,
			shortUrl: "",
			imageUrl: "",
			supportCaptureShare: !1,
			supportSimpleShare: !1,
			contentTemplates: {
				ca: "\u5546\u5bb6\u4fc3\u9500\u8ff7\u4eba\u773c\uff0c\u5f3a\u70c8\u63a8\u8350\u5927\u5bb6\u4f7f\u7528@\u5982\u610f\u6dd8\uff0c\u770b\u5b8c\u5386\u53f2\u4ef7\u683c\u66f2\u7ebf\uff0c\u8fd8\u80fd\u8fdb\u884c\u591a\u7ad9\u6bd4\u4ef7\uff0c\u4ece\u6b64\u4e0d\u518d\u88ab\u5ffd\u60a0\u3002\u6211\u521a\u7528@\u5982\u610f\u6dd8 \u67e5\u4e86${productTitle} #\u5982\u610f\u6dd8OK\u8d2d#\uff08\u4e0b\u8f7d\u5730\u5740\uff1ahttp://t.cn/aeDbuE\uff09 {{{url}}}",
				pk_expensive: "\u5751\u7239\u554a\uff0c\u521a\u7528\u6bd4\u4ef7\u795e\u5668@\u5982\u610f\u6dd8 \u53d1\u73b0${currentMerchantName}\u7684${productTitle}\u5356${currentPrice}\u5143\uff0c\u6bd4${relativeMerchantName}\u8d35\u4e86${priceDiff}\u5143\u554a\uff01{{{url}}} \u62d2\u82b1\u51a4\u6789\u94b1\uff0c\u6bd4\u51fa\u771f\u5b9e\u60e0 #\u5982\u610f\u6dd8OK\u8d2d#\uff08\u4e0b\u8f7d\u5730\u5740\uff1ahttp://t.cn/aeDbuE\uff09",
				pk_cheap: "\u6211\u561e\u4e2a\u53bb\uff01\u521a\u7528\u6bd4\u4ef7\u795e\u5668@\u5982\u610f\u6dd8 \u53d1\u73b0${currentMerchantName}\u7684${productTitle}\u6700\u4fbf\u5b9c\uff0c\u5356${currentPrice}\u5143\uff0c\u6bd4\u7b2c\u4e8c\u540d${relativeMerchantName}\u4fbf\u5b9c\u4e86${priceDiff}\u5143\uff01{{{url}}} \u62d2\u82b1\u51a4\u6789\u94b1\uff0c\u6bd4\u51fa\u771f\u5b9e\u60e0 #\u5982\u610f\u6dd8OK\u8d2d#\uff08\u4e0b\u8f7d\u5730\u5740\uff1ahttp://t.cn/aeDbuE\uff09 {{{url}}}"
			},
			init: function() {
				var a = this,
					b = va.getLocationHref(window);
				"http://ruyi.taobao.com/service/access-token-callback.html" !== b && 0 == b.indexOf("http://ruyi.taobao.com/service/access-token-callback.html") && ua.browser.extension.sendRequest({
					topic: "callback_share_authorization",
					url: b
				});
				this.checkCustomShareSupport(function(b) {
					a.supportSimpleShare = b.simple;
					a.supportCaptureShare = b.capture
				});
				ua.browser.extension.onRequest.addListener(function(b) {
					switch (b.topic) {
						case "short_url":
							a.shortUrl = b.shortUrl;
							a.handleResponse();
							break;
						case "capture_image_data":
							a.imageUrl = b.imageData, a.handleResponse()
					}
				})
			},
			destory: function() {
				$("." + t("share-protection")).remove()
			},
			insertTemplate: function(a) {
				$("#" + t("share-wrapper")).length ? a && a() : va.getTemplate("views/share.html", function(b) {
					$(ac.body).append(b);
					ua.Share.View.bindEvents();
					a && a()
				})
			},
			getContentTemplate: function(a, b) {
				var c = this.contentTemplates[a];
				if (c)
					for (var d in b) c = c.replace("${" + d + "}", b[d]);
				else c = "";
				return c
			},
			checkCustomShareSupport: function(a) {
				ua.browser.extension.sendRequest({
						topic: "support_custom_share"
					},
					a)
			},
			handleRequest: function(a) {
				if (a.custom) {
					if (!this.popupShowed) {
						var b = this;
						this.insertTemplate(function() {
							b.currentSiteId = a.siteId;
							b.text = a.text;
							"simple" == a.imageType && (b.imageUrl = a.imageUrl, b.handleResponse());
							if ("capture" == a.imageType || a.url) a.topic = "handle_share_request", ua.browser.extension.sendRequest(a)
						})
					}
				} else this.nativeShare(a)
			},
			handleResponse: function() {
				if (this.shortUrl && this.imageUrl) {
					var a = this.text.replace("{{{url}}}", this.shortUrl);
					ha.View.setContent(a);
					ha.View.setImage(this.imageUrl);
					ha.View.show();
					ha.View.showForm();
					ha.View.enableShareBtn();
					ha.View.setPosition();
					this.imageUrl = this.shortUrl = ""
				}
			},
			countLetterNumber: function(a) {
				for (var a = $.trim(a), b = 0, c = 0, d = a.length; c < d; c++) b = 127 >= a.charCodeAt(c) ? b + 0.5 : b + 1;
				return Math.ceil(b)
			},
			getZoomLevel: function() {
				return document.width ? document.width / $(ac).width() : 1
			},
			calcCaptureDataForFastCompare: function(a, b) {
				var c = $("#" + t("huoyan-wrapper")),
					d = this.getZoomLevel(),
					e = va.getViewPortWidth() * d,
					f = va.getViewPortHeight() * d,
					h = va.getScrollPosition(),
					g =
						h.top,
					h = h.left,
					j = a.outerWidth() * d,
					m = a.outerHeight() * d,
					k = c.outerWidth() * d,
					p = c.outerHeight() * d,
					r = a.offset(),
					c = c.offset(),
					s = Math.max(m, p) + 60,
					u = j + k + 6 + 20,
					w = Math.min(r.top * d, c.top * d) - g * d - 15,
					x;
				x = c.left < r.left ? c.left * d - h * d - 10 : r.left * d - h * d - 10;
				0 > x && (h += x, x = 0);
				0 > w && (g += w, w = 0);
				x + u > e && (h += x + u - e, x = e - u);
				w + s > f && (g += w + s - f, w = f - s);
				$b.scrollTo(h, g);
				setTimeout(function() {
					b({
						width: u,
						height: s,
						top: w,
						left: x
					})
				}, 50)
			},
			validate: function() {
				var a = $("#" + t("share-text")).val(),
					a = this.countLetterNumber(a);
				return 0 >= a || 140 < a ? !1 : !0
			},
			getImageData: function() {
				var a = $("#" + t("share-image")).attr("src"),
					b = a.indexOf("base64,");
				return atob(a.substr(b + 7))
			},
			getTextContent: function() {
				return $.trim($("#" + t("share-text")).val())
			},
			share: function() {
				if (this.validate()) {
					var a = {
						topic: "share",
						siteId: this.currentSiteId,
						followRuyitao: $("#" + t("follow-us")).get(0).checked
					}, b = $("#" + t("share-image")).attr("src");
					0 == b.indexOf("data:") ? a.imageData = this.getImageData() : a.imageUrl = b;
					a.textContent = this.getTextContent();
					ua.browser.extension.sendRequest(a, function(a) {
						ha.View.hideForm();
						ha.View.enableShareBtn();
						a.success ? ha.View.showSuccessResult(a.shareLink) : ha.View.showFailureResult(a.reason.text)
					})
				} else ha.View.warn(), ha.View.enableShareBtn()
			},
			nativeShare: function(a) {
				if ("sina_weibo" == a.siteId) {
					var b = {};
					b.title = a.text;
					b.pic = a.imageUrl;
					b.url = a.url;
					var a = encodeURIComponent,
						c = window.screen,
						d = [],
						e = "http://v.t.sina.com.cn/share/share.php?";
					for (name in b) b.hasOwnProperty(name) && d.push(name + "=" + a(b[name]));
					d.push("appkey=1965387856");
					e += d.join("&");
					window.open(e, "mb", ["toolbar=0,status=0,resizable=1,width=620,height=450,left=", (c.width - 620) / 2, ",top=", (c.height - 450) / 2].join(""))
				}
			}
		};
	ua.Share.View = {
		bindEvents: function() {
			function a() {
				var a = $(this).val(),
					a = ha.countLetterNumber(a);
				b.setRemainLetterNumber(a)
			}
			var b = this;
			$("#" + t("share-btn")).click(function() {
				ha.View.shareBtnEnabled && (ha.View.disableShareBtn(), ha.share())
			});
			$("." + t("share-close-btn")).click(function() {
				ha.popupShowed = !1;
				b.hide();
				b.hideSuccessResult();
				b.hideFailureResult()
			});
			$("#" + t("share-return-btn")).click(function() {
				b.showForm();
				b.hideFailureResult()
			});
			var c =
				$("#" + t("share-text"));
			if (c.get(0).oninput) c.on("input", a);
			else c.keyup(a);
			var d = null;
			$($b).resize(function() {
				clearTimeout(d);
				d = setTimeout(function() {
					b.setPosition();
					b.setOverlaySize()
				}, 200)
			})
		},
		warn: function() {
			$("#" + t("share-text")).addClass("" + t("warning")).focus();
			setTimeout(function() {
				$("#" + t("share-text")).removeClass("" + t("warning"))
			}, 800)
		},
		setRemainLetterNumber: function(a) {
			var b = "",
				a = 140 - a,
				b = 0 > a ? '\u5df2\u7ecf\u8d85\u8fc7<span id="' + t("remain-letter-number") + '"class="' + t("letter-overflow") + '">' + -a + "</span>\u5b57" : '\u8fd8\u53ef\u8f93\u5165<span id="' + t("remain-letter-number") + '">' + a + "</span>\u5b57";
			$("#" + t("remain-letter")).html(b)
		},
		setImage: function(a) {
			$("#" + t("share-image")).attr("src", a)
		},
		setContent: function(a) {
			$("#" + t("share-text")).val(a);
			a = ha.countLetterNumber(a);
			this.setRemainLetterNumber(a)
		},
		show: function() {
			ha.popupShowed = !0;
			var a = $("#" + t("share-wrapper"));
			a.show();
			setTimeout(function() {
				a.removeClass("" + t("share-wrapper-hidden")).addClass("" + t("share-wrapper-visible"))
			}, 0);
			this.showOverlay()
		},
		hide: function() {
			var a = $("#" + t("share-wrapper"));
			a.removeClass("" + t("share-wrapper-visible")).addClass("" + t("share-wrapper-hidden"));
			setTimeout(function() {
				a.hide()
			}, 200);
			this.hideOverlay()
		},
		setPosition: function() {
			var a = $("#" + t("share-wrapper")),
				b = va.getViewPortWidth(),
				c = va.getViewPortHeight(),
				d = a.outerWidth(),
				e = a.outerHeight(),
				f = va.getScrollPosition(),
				g = f.top,
				f = f.left;
			"fixed" == a.css("position") && (f = g = 0);
			b = Math.max((b - d) / 2 + f, 0);
			c = Math.max((c - e) / 2 + g, 0);
			a.css({
				top: c + "px",
				left: b + "px"
			})
		},
		showOverlay: function() {
			var a =
				$("#" + t("share-overlay"));
			a.show();
			setTimeout(function() {
				a.removeClass("" + t("overlay-hidden")).addClass("" + t("overlay-visible"))
			}, 0);
			this.setOverlaySize()
		},
		hideOverlay: function() {
			$("#" + t("share-overlay")).removeClass("" + t("overlay-visible")).addClass("" + t("overlay-hidden"));
			setTimeout(function() {
				$("#" + t("share-overlay")).hide()
			}, 200)
		},
		setOverlaySize: function() {
			var a = va.getViewPortWidth(),
				b = va.getViewPortHeight();
			$("#" + t("share-overlay")).width(a).height(b)
		},
		showForm: function() {
			$("#" + t("share-form")).show()
		},
		hideForm: function() {
			$("#" + t("share-form")).hide()
		},
		showSuccessResult: function(a) {
			$("#" + t("check-out-share")).attr("href", a);
			$("#" + t("share-success")).show()
		},
		hideSuccessResult: function() {
			$("#" + t("share-success")).hide()
		},
		showFailureResult: function(a) {
			$("#" + t("share-failure-reason")).text(a);
			$("#" + t("share-failure")).show()
		},
		hideFailureResult: function() {
			$("#" + t("share-failure")).hide()
		},
		shareBtnEnabled: !0,
		enableShareBtn: function() {
			this.shareBtnEnabled = !0;
			$("#" + t("share-btn")).removeClass("" + t("share-btn-disabled")).addClass("" +
				t("share-btn-enabled"))
		},
		disableShareBtn: function() {
			this.shareBtnEnabled = !1;
			$("#" + t("share-btn")).removeClass("" + t("share-btn-enabled")).addClass("" + t("share-btn-disabled"))
		}
	};
	var Sa = export_para_u,
		xb = Sa.SearchBox.Util,
		bc = [],
		wc = function(a) {
			if (a) {
				var b = xb.getLocationHref(window),
					c;
				for (c in a)
					if (a.hasOwnProperty(c))
						for (var d = a[c], e = 0, f = d.length; e < f; e++) {
							var g = d[e];
							RegExp(g.url, "i").test(b) && (xb.loadJQuery(), g.wait ? vc(g, b, c, g.wait) : g.repeat ? cc(g, b, c, g.repeat) : yb(g, b, c))
						}
			}
		}, vc = function(a, b, c, d) {
			setTimeout(function() {
				yb(a,
					b, c)
			}, d)
		}, cc = function(a, b, c, d) {
			setTimeout(function() {
				yb(a, b, c);
				cc(a, b, c, d)
			}, d)
		}, yb = function(a, b, c) {
			if (0 != $(a.selector).size()) {
				var d = [];
				$.each($(a.selector), function(a, b) {
					-1 == $.inArray(b, bc) && (bc.push(b), d.push(b.innerHTML))
				});
				0 < d.length && Sa.browser.extension.sendRequest({
					topic: "ivy_send_user_collection",
					type: c,
					source_url: b,
					collections: d
				})
			}
		};
	Sa.SyncOrder = {
		init: function() {
			Sa.browser.extension.sendRequest({
				topic: "oauth_is_authorized"
			}, function(a) {
				a && Sa.browser.extension.sendRequest({
					topic: "options_get",
					options: ["sync_order"]
				}, function(a) {
					a.sync_order_result_setting && Sa.browser.extension.sendRequest({
						topic: "get_ivy_config",
						domain: xb.getLocationProperty(window, "hostname")
					}, wc)
				})
			})
		}
	};
	var Aa = export_para_u,
		mb = window,
		zb = Aa.SearchBox.Util;
	Aa.Notification = {
		TEMPLATE_URL: "http://ruyi.taobao.com/extension/ruyitao-notification",
		init: function() {
			if (!(mb.navigator.userAgent.match(/msie/i) && "BackCompat" == document.compatMode)) {
				var a = this;
				Aa.browser.extension.sendRequest({
						topic: "get_notification",
						url: zb.getLocationHref(mb)
					},
					function(b) {
						b && (Aa.SearchBox.Util.loadJQuery(), a.showNotification(b))
					})
			}
		},
		renderNotification: function(a) {
			$("#ruyitao-notify-title").text(a.title);
			$("#ruyitao-notify-body").html(a.content);
			$("#ruyitao-notify").show();
			if ("undefined" != typeof a.width) {
				var b = parseInt(a.width) || 160,
					a = parseInt(a.height) || 75;
				$("#ruyitao-notify-body").css({
					width: b,
					height: a
				});
				$("#ruyitao-notify").css({
					bottom: -1 * (a + 41),
					width: $("#ruyitao-notify-body").outerWidth()
				})
			}
		},
		bindEvents: function(a) {
			$("#ruyitao-notify-cb").click(function() {
				Aa.browser.extension.sendRequest({
					topic: "set_notification",
					id: a.id,
					status: $(this).is(":checked") ? "close" : ""
				})
			});
			$("#ruyitao-notify-hide").click(function() {
				$("#ruyitao-notify").slideUp(500);
				Aa.browser.extension.sendRequest({
					topic: "set_notification",
					id: a.id,
					status: "hide"
				})
			})
		},
		slideUp: function() {
			var a = parseInt($("#ruyitao-notify").css("bottom")),
				b = null,
				c = Math.abs(a) / 30,
				d, e = function() {
					0 > a ? (a += c, $("#ruyitao-notify").css({
						bottom: a
					}), b = setTimeout(e, 50)) : b && clearTimeout(b)
				}, b = setTimeout(e, 50),
				f = function() {
					d && clearTimeout(d);
					d = setTimeout(function() {
							$("#ruyitao-notify").slideUp(500)
						},
						6E4)
				};
			$("#ruyitao-notify").mouseenter(function() {
				d && (clearTimeout(d), d = void 0)
			}).mouseleave(f);
			f()
		},
		trackEvents: function(a) {
			Aa.SearchBox.Util.sendLog("showad_" + a.campaign + "_" + a.id, zb.getLocationHref(mb));
			$("#ruyitao-notify .ruyitao-track-ad").click(function() {
				Aa.SearchBox.Util.sendLog("clickad_" + a.campaign + "_" + a.id, this.href + "|" + zb.getLocationHref(mb))
			})
		},
		showNotification: function(a) {
			var b = this;
			Aa.SearchBox.Util.getTemplate(a.template || b.TEMPLATE_URL, function(c) {
				$(document.body).append(c);
				b.renderNotification(a);
				b.bindEvents(a);
				b.slideUp();
				b.trackEvents(a)
			})
		}
	};
	var Ab = export_para.SearchBox.Util.getLocationHref();
	if (-1 != Ab.indexOf("ruyi.taobao.com"))
		for (var Bb = [{
			app: "ruyitao",
			redirect_uri: "http://ruyi.taobao.com/service/access-token-callback.html?app=ruyitao"
		}, {
			app: "ivy",
			redirect_uri: "http://ruyi.taobao.com/service/access-token-callback.html?app=ivy"
		}], nb = 0, xc = Bb.length; nb < xc; nb++)
			if (0 == Ab.indexOf(Bb[nb].redirect_uri)) {
				export_para.browser.extension.sendRequest({
					topic: "oauth_callback",
					redirect_url: Ab,
					application: Bb[nb].app
				});
				break
			}
	var yc =
		window,
		cb = export_para_u,
		dc = cb.SearchBox.Util,
		zc = cb.transform_selector;
	cb.PriceAlertSettings = {
		sites: {
			"jd.com": [{
				url: "t.jd.com/home/follow",
				parentSelector: ".main .right .o-mt"
			}, {
				url: "t.jd.com/product/followProductList.action",
				parentSelector: ".main .right .o-mt"
			}],
			"taobao.com": [{
				url: "favorite.taobao.com/item_collect.htm",
				parentSelector: "#fav-class .mercury-map-wrap"
			}, {
				url: "favorite.taobao.com/collectList.htm",
				parentSelector: "#tab"
			}, {
				url: "cart.taobao.com/cart.htm",
				parentSelector: "#J_FloatBar .float-bar-wrapper .operations",
				condition: function() {
					return "" != $.trim($("#J_OrderList").html())
				},
				delay: !0
			}]
		},
		init: function() {
			var a = cb.site.get_site(cb.site.get_domain(document));
			if (this.sites.hasOwnProperty(a))
				for (var b = yc.location.href, a = this.sites[a], c, d, e = 0, f = a.length; e < f; e++)
					if (c = a[e], d = RegExp(c.url), d.test(b)) {
						this.insertTemplate(c.parentSelector, c.delay);
						break
					}
		},
		insertTemplate: function(a, b, c) {
			function d() {
				dc.getTemplate("views/price-aler-settings.html", function(b) {
					$(a).append(b);
					e.bindEvents()
				})
			}
			var e = this;
			1 == $(a).length ?
				d() : b && setTimeout(function() {
					1 == $(a).length && ("function" == typeof c && c() || !c) ? d() : setTimeout(function() {
						1 == $(a).length && ("function" == typeof c && c() || !c) && d()
					}, 2E3)
				}, 2E3)
		},
		bindEvents: function() {
			$("#" + zc("price-alert-settings-link-wrapper")).click(function() {
				dc.openTab("http://ruyi.taobao.com/my/settings?utm_medium=ext&utm_source=ruyi", !0)
			})
		}
	};
	var Ha = export_para_u,
		V = Ha.transform_selector,
		ec = Ha.browser.runtime ? Ha.browser.runtime.onMessage : Ha.browser.extension.onRequest;
	ec && ec.addListener(function(a) {
		switch (a.topic) {
			case "show_price_mind_messages":
				var b =
					a.messages,
					c = function() {
						for (var a = "", c = 0, g = b.length, g = 3 > g ? g : 3; c < g; c++) var j = b[c],
						m = parseFloat(j.original_price) - parseFloat(j.reduction_price), p = '<li class="' + V("pamb-message") + '" data-id=' + j.id + ">", p = p + ('<div class="' + V("pamb-product-img") + '"><img src="' + j.small_image + '" /></div>'), p = p + ('<div class="' + V("pamb-product-info") + '">'), p = p + ('<div class="' + V("pamb-product-title") + '">' + j.title + "</div>"), p = p + ('<div class="' + V("pamb-current-price-wrap") + '"><span>\u5df2\u7ecf\u964d\u5230\u4e86</span>'), p = p +
							('<span class="' + V("pamb-current-price") + '">\uffe5' + m.toFixed(2) + "</span></div>"), p = p + ('<div class="' + V("pamb-price-reduction-wrap") + '">\u964d\u4e86\uffe5' + j.reduction_price + "</div></div></li>"), a = a + p;
						$("#" + V("pamb-messages")).html(a);
						d || ($("#" + V("pamb-messages")).delegate("." + V("pamb-message"), "click", function() {
							var a = $(this).attr("data-id"),
								a = "http://ruyi.taobao.com/item/" + encodeURIComponent(a) + "?utm_medium=ext&utm_source=ruyi";
							Ha.SearchBox.Util.openTab(a, !0)
						}), $("#" + V("pamb-close")).click(function() {
							var a =
								$("#" + V("pamb-wrapper")),
								b = a.outerHeight();
							a.css("bottom", -b + "px")
						}));
						$("#" + V("pamb-wrapper")).css("bottom", 0);
						Ha.browser.extension.sendRequest({
							topic: "clear_unread_price_mind_messages"
						})
					};
				if (b && 0 < b.length) {
					var d = 1 == $(document.body).attr("data-ruyitao-price-mind-inserted");
					d ? c() : Ha.SearchBox.Util.getTemplate("views/price-alert-messages-body.html", function(a) {
						$(document.body).append(a).attr("data-ruyitao-price-mind-inserted", 1);
						c && c()
					})
				}
		}
	});
	export_para.checkAndRun(function() {
		(new export_para.filterChain(export_para.SearchBox.App,
			export_para.sameBookAssist, export_para.productSearch)).run();
		export_para.SrpCompare.init();
		export_para.CnaCookie.init();
		export_para.TracknickCookie.init();
		export_para.Notification.init();
		export_para.Share.init();
		export_para.SyncOrder.init();
		export_para.PriceAlertSettings.init()
	});
	var fc = export_para_u,
		Ac = {
			"x-webkit-speech": "",
			lang: "zh-CN",
			"x-webkit-grammar": "builtin:translate"
		}, gc = {
			"taobao.com": ["#title", "#title2"],
			"tmall.com": ["#mq", "#btm-mq"],
			"360buy.com": ["#key", "#key-re-search", "#keyword"],
			"suning.com": ["#searchKeywords"],
			"amazon.cn": ["#twotabsearchtextbox"],
			"coo8.com": ["#searchKeywords", "#searchKeywords2"],
			"51buy.com": ["#q_show"]
		}, Bc = fc.site.get_domain(document),
		hc = fc.site.get_site(Bc),
		ic;
	hc in gc && (ic = gc[hc], $.each(ic, function(a, b) {
		$(b).attr(Ac)
	}))
})(window, exports);