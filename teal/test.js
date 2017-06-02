//tealium universal tag - utag.loader ut4.0.201701241837, Copyright 2017 Tealium.com Inc. All Rights Reserved.
var utag_condload = false;
try {
    (function() {
        function ul(src, a, b) {
            a = document;
            b = a.createElement('script');
            b.language = 'javascript';
            b.type = 'text/javascript';
            b.src = src;
            a.getElementsByTagName('head')[0].appendChild(b)
        }
        ;if (("" + document.cookie).match("utag_env_lithium_main=([^\S;]*)")) {
            if (RegExp.$1.indexOf("/prod/") === -1) {
                ul(RegExp.$1);
                utag_condload = true;
                __tealium_default_path = '//tags.tiqcdn.com/utag/lithium/main/prod/';
            }
        }
    })();
} catch (e) {}
;try {
    (function(a, b, c) {
        if (typeof utag_data == 'undefined')
            utag_data = {};
        a = location.pathname.split('/');
        b = (a.length > 9) ? 9 : a.length;
        for (c = 1; c < b; c++) {
            utag_data['_pathname' + c] = (typeof a[c] != 'undefined') ? a[c] : ''
        }
    })();
} catch (e) {}
;if (typeof utag == "undefined" && !utag_condload) {
    var utag = {
        id: "lithium.main",
        o: {},
        sender: {},
        send: {},
        rpt: {
            ts: {
                a: new Date()
            }
        },
        dbi: [],
        loader: {
            q: [],
            lc: 0,
            f: {},
            p: 0,
            ol: 0,
            wq: [],
            lq: [],
            bq: {},
            bk: {},
            rf: 0,
            ri: 0,
            rp: 0,
            rq: [],
            ready_q: [],
            sendq: {
                "pending": 0
            },
            run_ready_q: function() {
                for (var i = 0; i < utag.loader.ready_q.length; i++) {
                    utag.DB("READY_Q:" + i);
                    try {
                        utag.loader.ready_q[i]()
                    } catch (e) {
                        utag.DB(e)
                    }
                    ;
                }
            },
            lh: function(a, b, c) {
                a = "" + location.hostname;
                b = a.split(".");
                c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\./.test(a)) ? 3 : 2;
                return b.splice(b.length - c, c).join(".");
            },
            WQ: function(a, b, c, d, g) {
                utag.DB('WQ:' + utag.loader.wq.length);
                try {
                    if (utag.udoname && utag.udoname.indexOf(".") < 0) {
                        utag.ut.merge(utag.data, window[utag.udoname], 0);
                    }
                    utag.handler.RE('view', utag.data, "bwq");
                    if (utag.cfg.load_rules_at_wait) {
                        utag.handler.LR();
                    }
                } catch (e) {
                    utag.DB(e)
                }
                ;d = 0;
                g = [];
                for (a = 0; a < utag.loader.wq.length; a++) {
                    b = utag.loader.wq[a];
                    b.load = utag.loader.cfg[b.id].load;
                    if (b.load == 4) {
                        this.f[b.id] = 0;
                        utag.loader.LOAD(b.id)
                    } else if (b.load > 0) {
                        g.push(b);
                        d++;
                    } else {
                        this.f[b.id] = 1;
                    }
                }
                for (a = 0; a < g.length; a++) {
                    utag.loader.AS(g[a]);
                }
                if (d == 0) {
                    utag.loader.END();
                }
            },
            AS: function(a, b, c, d) {
                utag.send[a.id] = a;
                if (typeof a.src == 'undefined') {
                    a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'utag.' + a.id + '.js')
                }
                a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v ? a.v : utag.cfg.v);
                utag.rpt['l_' + a.id] = a.src;
                b = document;
                this.f[a.id] = 0;
                if (a.load == 2) {
                    utag.DB("Attach sync: " + a.src);
                    a.uid = a.id;
                    b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
                    if (typeof a.cb != 'undefined')
                        a.cb();
                } else if (a.load == 1 || a.load == 3) {
                    if (b.createElement) {
                        c = 'utag_lithium.main_' + a.id;
                        if (!b.getElementById(c)) {
                            d = {
                                src: a.src,
                                id: c,
                                uid: a.id,
                                loc: a.loc
                            }
                            if (a.load == 3) {
                                d.type = "iframe"
                            }
                            ;if (typeof a.cb != 'undefined')
                                d.cb = a.cb;
                            utag.ut.loader(d);
                        }
                    }
                }
            },
            GV: function(a, b, c) {
                b = {};
                for (c in a) {
                    if (a.hasOwnProperty(c) && typeof a[c] != "function")
                        b[c] = a[c];
                }
                return b
            },
            OU: function(a, b, c, d, f) {
                try {
                    if (typeof utag.data['cp.OPTOUTMULTI'] != 'undefined') {
                        c = utag.loader.cfg;
                        a = utag.ut.decode(utag.data['cp.OPTOUTMULTI']).split('|');
                        for (d = 0; d < a.length; d++) {
                            b = a[d].split(':');
                            if (b[1] * 1 !== 0) {
                                if (b[0].indexOf('c') == 0) {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tcat == b[0].substring(1))
                                            c[f].load = 0
                                    }
                                } else if (b[0] * 1 == 0) {
                                    utag.cfg.nocookie = true
                                } else {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tid == b[0])
                                            c[f].load = 0
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDdom: function(o) {
                var d = document || {}
                  , l = location || {};
                o["dom.referrer"] = eval("document." + "referrer");
                o["dom.title"] = "" + d.title;
                o["dom.domain"] = "" + l.hostname;
                o["dom.query_string"] = ("" + l.search).substring(1);
                o["dom.hash"] = ("" + l.hash).substring(1);
                o["dom.url"] = "" + d.URL;
                o["dom.pathname"] = "" + l.pathname;
                o["dom.viewport_height"] = window.innerHeight || (d.documentElement ? d.documentElement.clientHeight : 960);
                o["dom.viewport_width"] = window.innerWidth || (d.documentElement ? d.documentElement.clientWidth : 960);
            },
            RDcp: function(o, b, c, d) {
                b = b || utag.loader.RC();
                for (d in b) {
                    if (d.match(/utag_(.*)/)) {
                        for (c in utag.loader.GV(b[d])) {
                            o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
                        }
                    }
                }
                for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
                    if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined")
                        o["cp." + c] = b[c];
                }
            },
            RDqp: function(o, a, b, c) {
                a = location.search + (location.hash + '').replace("#", "&");
                if (utag.cfg.lowerqp) {
                    a = a.toLowerCase()
                }
                ;if (a.length > 1) {
                    b = a.substring(1).split('&');
                    for (a = 0; a < b.length; a++) {
                        c = b[a].split("=");
                        if (c.length > 1) {
                            o["qp." + c[0]] = utag.ut.decode(c[1])
                        }
                    }
                }
            },
            RDmeta: function(o, a, b, h) {
                a = document.getElementsByTagName("meta");
                for (b = 0; b < a.length; b++) {
                    try {
                        h = a[b].name || a[b].getAttribute("property") || "";
                    } catch (e) {
                        h = "";
                        utag.DB(e)
                    }
                    ;if (utag.cfg.lowermeta) {
                        h = h.toLowerCase()
                    }
                    ;if (h != "") {
                        o["meta." + h] = a[b].content
                    }
                }
            },
            RDva: function(o, a, b) {
                a = "";
                try {
                    a = localStorage.getItem("tealium_va");
                    if (!a || a == "{}")
                        return;
                    b = utag.ut.flatten({
                        va: JSON.parse(a)
                    });
                    utag.ut.merge(o, b, 1);
                } catch (e) {
                    utag.DB("localStorage not supported");
                }
            },
            RDut: function(o, a) {
                o["ut.domain"] = utag.cfg.domain;
                o["ut.version"] = utag.cfg.v;
                o["ut.event"] = a || "view";
                try {
                    o["ut.account"] = utag.cfg.utid.split("/")[0];
                    o["ut.profile"] = utag.cfg.utid.split("/")[1];
                    o["ut.env"] = utag.cfg.path.split("/")[6];
                } catch (e) {
                    utag.DB(e)
                }
            },
            RD: function(o, a, b, c, d) {
                utag.DB("utag.loader.RD");
                if (typeof o["_t_session_id"] != "undefined") {
                    return
                }
                ;a = (new Date()).getTime();
                b = utag.loader.RC();
                c = a + parseInt(utag.cfg.session_timeout);
                d = a;
                if (!b.utag_main) {
                    b.utag_main = {};
                } else if (b.utag_main.ses_id && typeof b.utag_main._st != "undefined" && parseInt(b.utag_main._st) < a) {
                    delete b.utag_main.ses_id;
                }
                if (!b.utag_main.v_id) {
                    b.utag_main.v_id = utag.ut.vi(a);
                }
                if (!b.utag_main.ses_id) {
                    b.utag_main.ses_id = d + '';
                    b.utag_main._ss = b.utag_main._pn = 1;
                    b.utag_main._sn = 1 + parseInt(b.utag_main._sn || 0);
                } else {
                    d = b.utag_main.ses_id;
                    b.utag_main._ss = 0;
                    b.utag_main._pn = 1 + parseInt(b.utag_main._pn);
                    b.utag_main._sn = parseInt(b.utag_main._sn);
                }
                if (isNaN(b.utag_main._sn) || b.utag_main._sn < 1) {
                    b.utag_main._sn = b.utag_main._pn = 1
                }
                b.utag_main._st = c + '';
                utag.loader.SC("utag_main", {
                    "v_id": b.utag_main.v_id,
                    "_sn": b.utag_main._sn,
                    "_ss": b.utag_main._ss,
                    "_pn": b.utag_main._pn + ";exp-session",
                    "_st": c,
                    "ses_id": d + ";exp-session"
                });
                o["_t_visitor_id"] = b.utag_main.v_id;
                o["_t_session_id"] = d;
                this.RDqp(o);
                this.RDmeta(o);
                this.RDcp(o, b);
                this.RDdom(o);
                this.RDva(o);
                this.RDut(o);
            },
            RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
                o = {};
                b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
                r = /^(.*?)=(.*)$/;
                s = /^(.*);exp-(.*)$/;
                t = (new Date()).getTime();
                for (c = 0; c < b.length; c++) {
                    if (b[c].match(r)) {
                        ck = RegExp.$1;
                        cv = RegExp.$2;
                    }
                    e = utag.ut.decode(cv);
                    if (typeof ck != "undefined") {
                        if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
                            e = e.split("$");
                            g = [];
                            j = {};
                            for (f = 0; f < e.length; f++) {
                                try {
                                    g = e[f].split(":");
                                    if (g.length > 2) {
                                        g[1] = g.slice(1).join(":");
                                    }
                                    v = "";
                                    if (("" + g[1]).indexOf("~") == 0) {
                                        h = g[1].substring(1).split("|");
                                        for (i = 0; i < h.length; i++)
                                            h[i] = utag.ut.decode(h[i]);
                                        v = h
                                    } else
                                        v = utag.ut.decode(g[1]);
                                    j[g[0]] = v;
                                } catch (er) {
                                    utag.DB(er)
                                }
                                ;
                            }
                            o[ck] = {};
                            for (f in utag.loader.GV(j)) {
                                if (j[f]instanceof Array) {
                                    n = [];
                                    for (m = 0; m < j[f].length; m++) {
                                        if (j[f][m].match(s)) {
                                            k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                            if (k > t)
                                                n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                                        }
                                    }
                                    j[f] = n.join("|");
                                } else {
                                    j[f] = "" + j[f];
                                    if (j[f].match(s)) {
                                        k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                        j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                                    }
                                }
                                if (j[f])
                                    o[ck][f] = j[f];
                            }
                        } else if (utag.cl[ck] || utag.cl['_all_']) {
                            o[ck] = e
                        }
                    }
                }
                return (a) ? (o[a] ? o[a] : {}) : o;
            },
            SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
                if (!a)
                    return 0;
                if (a == "utag_main" && utag.cfg.nocookie)
                    return 0;
                v = "";
                var date = new Date();
                var exp = new Date();
                exp.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
                x = exp.toGMTString();
                if (c && c == "da") {
                    x = "Thu, 31 Dec 2009 00:00:00 GMT";
                } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
                    if (typeof b != "object") {
                        v = b
                    }
                } else {
                    d = utag.loader.RC(a, 0);
                    for (e in utag.loader.GV(b)) {
                        f = "" + b[e];
                        if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
                            g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
                            if (RegExp.$3 == "u")
                                g = parseInt(RegExp.$2);
                            f = RegExp.$1 + ";exp-" + g;
                        }
                        if (c == "i") {
                            if (d[e] == null)
                                d[e] = f;
                        } else if (c == "d")
                            delete d[e];
                        else if (c == "a")
                            d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
                        else if (c == "ap" || c == "au") {
                            if (d[e] == null)
                                d[e] = f;
                            else {
                                if (d[e].indexOf("|") > 0) {
                                    d[e] = d[e].split("|")
                                }
                                g = (d[e]instanceof Array) ? d[e] : [d[e]];
                                g.push(f);
                                if (c == "au") {
                                    h = {};
                                    k = {};
                                    for (i = 0; i < g.length; i++) {
                                        if (g[i].match(/^(.*);exp-(.*)$/)) {
                                            j = RegExp.$1;
                                        }
                                        if (typeof k[j] == "undefined") {
                                            k[j] = 1;
                                            h[g[i]] = 1;
                                        }
                                    }
                                    g = [];
                                    for (i in utag.loader.GV(h)) {
                                        g.push(i);
                                    }
                                }
                                d[e] = g
                            }
                        } else
                            d[e] = f;
                    }
                    h = new Array();
                    for (g in utag.loader.GV(d)) {
                        if (d[g]instanceof Array) {
                            for (c = 0; c < d[g].length; c++) {
                                d[g][c] = encodeURIComponent(d[g][c])
                            }
                            h.push(g + ":~" + d[g].join("|"))
                        } else
                            h.push(g + ":" + encodeURIComponent(d[g]))
                    }
                    ;if (h.length == 0) {
                        h.push("");
                        x = ""
                    }
                    v = (h.join("$"));
                }
                document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
                return 1
            },
            LOAD: function(a, b, c, d) {
                if (!utag.loader.cfg) {
                    return
                }
                if (this.ol == 0) {
                    if (utag.loader.cfg[a].block && utag.loader.cfg[a].cbf) {
                        this.f[a] = 1;
                        delete utag.loader.bq[a];
                    }
                    for (b in utag.loader.GV(utag.loader.bq)) {
                        if (utag.loader.cfg[a].load == 4 && utag.loader.cfg[a].wait == 0) {
                            utag.loader.bk[a] = 1;
                            utag.DB("blocked: " + a);
                        }
                        utag.DB("blocking: " + b);
                        return;
                    }
                    utag.loader.INIT();
                    return;
                }
                utag.DB('utag.loader.LOAD:' + a);
                if (this.f[a] == 0) {
                    this.f[a] = 1;
                    if (utag.cfg.noview != true) {
                        if (utag.loader.cfg[a].send) {
                            utag.DB("SENDING: " + a);
                            try {
                                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                                    utag.DB("utag.loader.LOAD:sendq: " + a);
                                    while (d = utag.loader.sendq[a].shift()) {
                                        utag.DB(d);
                                        utag.sender[a].send(d.event, utag.handler.C(d.data));
                                        utag.loader.sendq.pending--;
                                    }
                                } else {
                                    utag.sender[a].send('view', utag.handler.C(utag.data));
                                }
                                utag.rpt['s_' + a] = 0;
                            } catch (e) {
                                utag.DB(e);
                                utag.rpt['s_' + a] = 1;
                            }
                        }
                    }
                    if (utag.loader.rf == 0)
                        return;
                    for (b in utag.loader.GV(this.f)) {
                        if (this.f[b] == 0 || this.f[b] == 2)
                            return
                    }
                    utag.loader.END();
                }
            },
            EV: function(a, b, c, d) {
                if (b == "ready") {
                    if (!utag.data) {
                        try {
                            utag.cl = {
                                '_all_': 1
                            };
                            utag.loader.initdata();
                            utag.loader.RD(utag.data);
                        } catch (e) {
                            utag.DB(e)
                        }
                        ;
                    }
                    if ((document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading")
                        setTimeout(c, 1);
                    else {
                        utag.loader.ready_q.push(c);
                        var RH;
                        if (utag.loader.ready_q.length <= 1) {
                            if (document.addEventListener) {
                                RH = function() {
                                    document.removeEventListener("DOMContentLoaded", RH, false);
                                    utag.loader.run_ready_q()
                                }
                                ;
                                if (!utag.cfg.dom_complete)
                                    document.addEventListener("DOMContentLoaded", RH, false);
                                window.addEventListener("load", utag.loader.run_ready_q, false);
                            } else if (document.attachEvent) {
                                RH = function() {
                                    if (document.readyState === "complete") {
                                        document.detachEvent("onreadystatechange", RH);
                                        utag.loader.run_ready_q()
                                    }
                                }
                                ;
                                document.attachEvent("onreadystatechange", RH);
                                window.attachEvent("onload", utag.loader.run_ready_q);
                            }
                        }
                    }
                } else {
                    if (a.addEventListener) {
                        a.addEventListener(b, c, false)
                    } else if (a.attachEvent) {
                        a.attachEvent(((d == 1) ? "" : "on") + b, c)
                    }
                }
            },
            END: function(b, c, d, e, v, w) {
                if (this.ended) {
                    return
                }
                ;this.ended = 1;
                utag.DB("loader.END");
                b = utag.data;
                if (utag.handler.base && utag.handler.base != '*') {
                    e = utag.handler.base.split(",");
                    for (d = 0; d < e.length; d++) {
                        if (typeof b[e[d]] != "undefined")
                            utag.handler.df[e[d]] = b[e[d]]
                    }
                } else if (utag.handler.base == '*') {
                    utag.ut.merge(utag.handler.df, b, 1);
                }
                utag.rpt['r_0'] = "t";
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
                utag.rpt.ts['s'] = new Date();
                v = ".tiqcdn.com";
                w = utag.cfg.path.indexOf(v);
                if (w > 0 && b["cp.utag_main__ss"] == 1)
                    utag.ut.loader({
                        src: utag.cfg.path.substring(0, w) + v + "/utag/tiqapp/utag.v.js?a=" + utag.cfg.utid + (utag.cfg.nocookie ? "&nocookie=1" : "&cb=" + (new Date).getTime()),
                        id: "tiqapp"
                    })
                utag.handler.RE('view', b, "end");
                utag.handler.INIT();
            }
        },
        DB: function(a, b) {
            if (utag.cfg.utagdb === false) {
                return;
            } else if (typeof utag.cfg.utagdb == "undefined") {
                utag.db_log = [];
                b = document.cookie + '';
                utag.cfg.utagdb = ((b.indexOf('utagdb=true') >= 0) ? true : false);
            }
            if (utag.cfg.utagdb === true) {
                var t;
                if (utag.ut.typeOf(a) == "object") {
                    t = utag.handler.C(a)
                } else {
                    t = a
                }
                utag.db_log.push(t);
                try {
                    console.log(t)
                } catch (e) {}
            }
        },
        RP: function(a, b, c) {
            if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
                b = [];
                for (c in utag.loader.GV(a)) {
                    if (c != 'src')
                        b.push(c + '=' + escape(a[c]))
                }
                this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
            }
        },
        view: function(a, c, d) {
            return this.track({
                event: 'view',
                data: a,
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        link: function(a, c) {
            return this.track({
                event: 'link',
                data: a,
                cfg: {
                    cb: c
                }
            })
        },
        track: function(a, b, c, d) {
            if (typeof a == "string")
                a = {
                    event: a,
                    data: b,
                    cfg: {
                        cb: c
                    }
                };
            for (d in utag.loader.GV(utag.o)) {
                try {
                    utag.o[d].handler.trigger(a.event || "view", a.data || a, a.cfg)
                } catch (e) {
                    utag.DB(e)
                }
                ;
            }
            if (a.cfg && a.cfg.cb)
                try {
                    a.cfg.cb()
                } catch (e) {
                    utag.DB(e)
                }
            ;return true
        },
        handler: {
            base: "",
            df: {},
            o: {},
            send: {},
            iflag: 0,
            INIT: function(a, b, c) {
                utag.DB('utag.handler.INIT');
                if (utag.initcatch) {
                    utag.initcatch = 0;
                    return
                }
                this.iflag = 1;
                a = utag.loader.q.length;
                if (a > 0) {
                    for (b = 0; b < a; b++) {
                        c = utag.loader.q[b];
                        utag.handler.trigger(c.a, c.b)
                    }
                }
            },
            test: function() {
                return 1
            },
            LR: function() {
                utag.DB("Load Rules");
                for (var d in utag.loader.GV(utag.cond)) {
                    utag.cond[d] = false;
                }
                utag.DB(utag.data);
                utag.loader.loadrules();
                utag.DB(utag.cond);
                utag.loader.initcfg();
                utag.loader.OU();
            },
            RE: function(a, b, c, d, e, f, g) {
                if (c && !this.cfg_extend) {
                    return 0;
                }
                utag.DB('All Tags EXTENSIONS');
                utag.DB(b);
                if (typeof this.extend != "undefined") {
                    g = 0;
                    for (d = 0; d < this.extend.length; d++) {
                        try {
                            e = 0;
                            if (typeof this.cfg_extend != "undefined") {
                                f = this.cfg_extend[d];
                                if (typeof f.count == "undefined")
                                    f.count = 0;
                                if (f[a] == 0 || (f.once == 1 && f.count > 0) || (typeof c != "undefined" && f[c] == 0)) {
                                    e = 1
                                } else {
                                    if (typeof c != "undefined" && f[c] == 1) {
                                        g = 1
                                    }
                                    ;f.count++
                                }
                            }
                            if (e != 1) {
                                this.extend[d](a, b);
                                utag.rpt['ex_' + d] = 0
                            }
                        } catch (er) {
                            utag.rpt['ex_' + d] = 1;
                            utag.ut.error({
                                e: er.message,
                                s: utag.cfg.path + 'utag.js',
                                l: d,
                                t: 'ge'
                            });
                        }
                    }
                    utag.DB(b);
                    return g;
                }
            },
            trigger: function(a, b, c, d, e, f) {
                utag.DB('trigger:' + a);
                b = b || {};
                utag.DB(b);
                if (!this.iflag) {
                    for (d in utag.loader.f) {
                        if (!(utag.loader.f[d] === 1))
                            utag.DB('Tag ' + d + ' did not LOAD')
                    }
                    utag.loader.q.push({
                        a: a,
                        b: b
                    });
                    return;
                }
                utag.cfg.noview = false;
                utag.ut.merge(b, this.df, 0);
                utag.loader.RDqp(b);
                utag.loader.RDcp(b);
                utag.loader.RDdom(b);
                utag.loader.RDmeta(b);
                utag.loader.RDva(b);
                utag.loader.RDut(b, a);
                function sendTag(a, b, d) {
                    try {
                        if (typeof utag.sender[d] != "undefined") {
                            utag.DB("SENDING: " + d);
                            utag.sender[d].send(a, utag.handler.C(b));
                            utag.rpt['s_' + d] = 0;
                        } else if (utag.loader.cfg[d].load != 2 && utag.loader.cfg[d].s2s != 1) {
                            utag.loader.sendq[d] = utag.loader.sendq[d] || [];
                            utag.loader.sendq[d].push({
                                "event": a,
                                "data": b
                            });
                            utag.loader.sendq.pending++;
                            utag.loader.AS({
                                id: d,
                                load: 1
                            });
                        }
                    } catch (e) {
                        utag.DB(e)
                    }
                }
                if (c && c.uids) {
                    this.RE(a, b);
                    for (f = 0; f < c.uids.length; f++) {
                        d = c.uids[f];
                        sendTag(a, b, d);
                    }
                } else if (utag.cfg.load_rules_ajax) {
                    this.RE(a, b, "blr");
                    utag.ut.merge(utag.data, b, 1);
                    this.LR();
                    this.RE(a, b);
                    for (f = 0; f < utag.loader.cfgsort.length; f++) {
                        d = utag.loader.cfgsort[f];
                        if (utag.loader.cfg[d].load && utag.loader.cfg[d].send) {
                            sendTag(a, b, d);
                        }
                    }
                } else {
                    this.RE(a, b);
                    for (d in utag.loader.GV(utag.sender)) {
                        sendTag(a, b, d);
                    }
                }
                utag.loader.SC("utag_main", {
                    "_st": ((new Date()).getTime() + parseInt(utag.cfg.session_timeout))
                });
            },
            C: function(a, b, c) {
                b = {};
                for (c in utag.loader.GV(a)) {
                    if (a[c]instanceof Array) {
                        b[c] = a[c].slice(0)
                    } else {
                        b[c] = a[c]
                    }
                }
                return b
            }
        },
        ut: {
            pad: function(a, b, c, d) {
                a = "" + ((a - 0).toString(16));
                d = '';
                if (b > a.length) {
                    for (c = 0; c < (b - a.length); c++) {
                        d += '0'
                    }
                }
                return "" + d + a
            },
            vi: function(t, a, b) {
                if (!utag.v_id) {
                    a = this.pad(t, 12);
                    b = "" + Math.random();
                    a += this.pad(b.substring(2, b.length), 16);
                    try {
                        a += this.pad((navigator.plugins.length ? navigator.plugins.length : 0), 2);
                        a += this.pad(navigator.userAgent.length, 3);
                        a += this.pad(document.URL.length, 4);
                        a += this.pad(navigator.appVersion.length, 3);
                        a += this.pad(screen.width + screen.height + parseInt((screen.colorDepth) ? screen.colorDepth : screen.pixelDepth), 5)
                    } catch (e) {
                        utag.DB(e);
                        a += "12345"
                    }
                    ;utag.v_id = a;
                }
                return utag.v_id
            },
            isEmptyObject: function(o, a) {
                for (a in o) {
                    return false;
                }
                return true;
            },
            typeOf: function(e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            },
            flatten: function(o) {
                var a = {};
                function r(c, p) {
                    if (Object(c) !== c || c instanceof Array) {
                        a[p] = c;
                    } else {
                        if (utag.ut.isEmptyObject(c)) {} else {
                            for (var d in c) {
                                r(c[d], p ? p + "." + d : d);
                            }
                        }
                    }
                }
                r(o, "");
                return a;
            },
            merge: function(a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d]
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined")
                            a[d] = b[d]
                    }
                }
            },
            decode: function(a, b) {
                b = "";
                try {
                    b = decodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                }
                ;if (b == "") {
                    b = unescape(a)
                }
                ;return b
            },
            error: function(a, b, c) {
                if (typeof utag_err != "undefined") {
                    utag_err.push(a)
                }
                c = "";
                for (b in a) {
                    c += b + ":" + a[b] + " , "
                }
                ;utag.DB(c)
            },
            loader: function(o, a, b, c, l) {
                a = document;
                if (o.type == "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l])
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l]
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                }
                ;if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function() {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function() {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        }
                        ;
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        }
    };
    utag.o['lithium.main'] = utag;
    utag.cfg = {
        v: "ut4.36.201701241837",
        load_rules_ajax: true,
        load_rules_at_wait: false,
        lowerqp: false,
        session_timeout: 1800000,
        readywait: 0,
        noload: 0,
        domain: utag.loader.lh(),
        path: "//tags.tiqcdn.com/utag/lithium/main/prod/",
        utid: "lithium/main/201701241837"
    };
    try {
        var _gaq = _gaq || [];
        var pageTracker = pageTracker || {
            _trackEvent: function(c, d, e, f, g) {
                g = {
                    ga_eventCat: c,
                    ga_eventAction: d,
                    ga_eventLabel: e,
                    ga_eventValue: f
                };
                utag.link(g, null, [10]);
            },
            _trackPageview: function(c) {
                _gaq.push(['_trackPageview', c ? c : null]);
            }
        }
    } catch (e) {}
    ;utag.cond = {
        10: 0,
        3: 0,
        4: 0,
        7: 0,
        9: 0
    };
    utag.pagevars = function(ud) {
        ud = ud || utag.data;
        try {
            ud['js_page.jQuery.fn.jquery'] = jQuery.fn.jquery
        } catch (e) {
            utag.DB(e)
        }
        ;
    }
    ;
    utag.loader.initdata = function() {
        try {
            utag.data = (typeof utag_data != 'undefined') ? utag_data : {};
            utag.udoname = 'utag_data';
        } catch (e) {
            utag.data = {};
            utag.DB('idf:' + e);
        }
    }
    ;
    utag.loader.loadrules = function(_pd, _pc) {
        var d = _pd || utag.data;
        var c = _pc || utag.cond;
        for (var l in utag.loader.GV(c)) {
            switch (l) {
            case '10':
                try {
                    c[10] |= (d['dom.domain'].toString().toLowerCase().indexOf('pages.lithium.com'.toLowerCase()) > -1 && d['page_type'].toString().toLowerCase().indexOf('confirmation'.toLowerCase()) < 0) || (d['dom.domain'].toString().toLowerCase().indexOf('www.lithium.com'.toLowerCase()) > -1 && d['page_type'].toString().toLowerCase().indexOf('confirmation'.toLowerCase()) < 0 && d['page_type'].toString().toLowerCase().indexOf('holiday'.toLowerCase()) < 0) || (d['dom.domain'].toString().toLowerCase().indexOf('wwwstage.lithium.com'.toLowerCase()) > -1 && d['page_type'].toString().toLowerCase().indexOf('confirmation'.toLowerCase()) < 0 && d['page_type'].toString().toLowerCase().indexOf('holiday'.toLowerCase()) < 0)
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '3':
                try {
                    c[3] |= (d['page_type'].toString().toLowerCase() == 'confirmation'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '4':
                try {
                    c[4] |= (d['dom.domain'].toString().toLowerCase() != 'pages.lithium.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '7':
                try {
                    c[7] |= (d['dom.domain'].toString().toLowerCase().indexOf('employees.lithium.com'.toLowerCase()) < 0 && d['page_type'].toString().toLowerCase() != 'community-employee'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            case '9':
                try {
                    c[9] |= (d['dom.domain'].toString().toLowerCase() == 'www.lithium.com'.toLowerCase()) || (d['dom.domain'].toString().toLowerCase() == 'wwwstage.lithium.com'.toLowerCase())
                } catch (e) {
                    utag.DB(e)
                }
                ;break;
            }
        }
    }
    ;
    utag.pre = function() {
        utag.loader.initdata();
        utag.pagevars();
        try {
            utag.loader.RD(utag.data)
        } catch (e) {
            utag.DB(e)
        }
        ;utag.loader.loadrules();
    }
    ;
    utag.loader.GET = function() {
        utag.cl = {
            '_all_': 1
        };
        utag.pre();
        utag.handler.extend = [function(a, b) {
            try {
                if (utag.data['qp.utagdb']) {
                    if (utag.data['qp.utagdb'].match(/1|true/i)) {
                        document.cookie = 'utagdb=true';
                        utag.data['cp.utagdb'] = 'true';
                        utag.cfg.utagdb = true;
                    } else {
                        document.cookie = 'utagdb=false';
                        utag.data['cp.utagdb'] = 'false';
                        utag.cfg.utagdb = false;
                    }
                }
                if (utag.cfg.path.indexOf('/prod/') === -1 && (typeof utag.data['cp.utagdb'] === 'undefined' || utag.data['cp.utagdb'] === 'true')) {
                    document.cookie = 'utagdb=true';
                    utag.cfg.utagdb = true;
                }
            } catch (e) {
                utag.DB('Tealium Debugging Tools Failed: ' + e);
            }
        }
        , function(a, b) {
            if ((typeof Demandbase == 'undefined' || typeof Demandbase.IP.CompanyProfile == 'null') && sessionStorage.db == undefined) {
                utag.DB("***** Interval Set *****");
                db_cb_int = 0;
                var check_demandbase = setInterval(function() {
                    check_db_object();
                }, 1000);
            } else if (sessionStorage.db != undefined) {
                utag.DB("********* sessionStorage.db defined *********")
                var db_obj = JSON.parse(sessionStorage.db);
                for (var key in db_obj) {
                    b[key] = db_obj[key];
                }
            }
            function check_db_object() {
                if (typeof Demandbase != 'undefined' && typeof Demandbase.IP.CompanyProfile != 'null') {
                    utag.DB("***** Demandbase is Set *****");
                    sessionStorage.db = JSON.stringify(Demandbase.IP.CompanyProfile);
                    for (var key in Demandbase.IP.CompanyProfile) {
                        utag.data[key] = Demandbase.IP.CompanyProfile[key];
                    }
                    clearInterval(check_demandbase);
                } else {
                    debugger ;if (db_cb_int > 5) {
                        utag.DB("******** # Attempts exceeded : Clearing Interval ******")
                        clearInterval(check_demandbase);
                    }
                    utag.DB("***** Interval Increment +1 *****");
                    db_cb_int++;
                }
            }
        }
        , function(a, b) {
            try {
                if (1) {
                    b['site_section_1'] = b['_pathname1'];
                    b['site_section_2'] = b['_pathname2'];
                    b['site_section_3'] = b['_pathname3']
                }
            } catch (e) {
                utag.DB(e)
            }
        }
        ];
        utag.handler.cfg_extend = [{
            "alr": 1,
            "bwq": 0,
            "id": "19",
            "blr": 0,
            "end": 0
        }, {
            "alr": 1,
            "bwq": 0,
            "id": "24",
            "blr": 0,
            "end": 0
        }, {
            "alr": 1,
            "bwq": 0,
            "id": "25",
            "blr": 0,
            "end": 0
        }];
        utag.loader.initcfg = function() {
            utag.loader.cfg = {
                "1": {
                    load: 1,
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 3117
                },
                "9": {
                    load: utag.cond[7],
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 20067
                },
                "11": {
                    load: 1,
                    send: 1,
                    v: 201701192305,
                    wait: 1,
                    tid: 7110
                },
                "3": {
                    load: 1,
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 7115
                },
                "7": {
                    load: utag.cond[4],
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 13060
                },
                "4": {
                    load: utag.cond[3],
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 7117
                },
                "14": {
                    load: 1,
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 2013
                },
                "18": {
                    load: 1,
                    send: 1,
                    v: 201601061904,
                    wait: 1,
                    tid: 20064
                },
                "27": {
                    load: utag.cond[9],
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 20010
                },
                "29": {
                    load: 1,
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 18016
                },
                "30": {
                    load: utag.cond[3],
                    send: 1,
                    v: 201512282356,
                    wait: 1,
                    tid: 18016
                },
                "32": {
                    load: 1,
                    send: 1,
                    v: 201611212107,
                    wait: 1,
                    tid: 6026
                },
                "33": {
                    load: 1,
                    send: 1,
                    v: 201611212107,
                    wait: 1,
                    tid: 20078
                },
                "35": {
                    load: utag.cond[10],
                    send: 1,
                    v: 201701192305,
                    wait: 1,
                    tid: 20010
                },
                "40": {
                    load: 1,
                    send: 1,
                    v: 201610041652,
                    wait: 1,
                    tid: 2045
                },
                "42": {
                    load: 1,
                    send: 1,
                    v: 201701241837,
                    wait: 1,
                    tid: 20010
                }
            };
            utag.loader.cfgsort = ["1", "9", "11", "3", "7", "4", "14", "18", "27", "29", "30", "32", "33", "35", "40", "42"];
        }
        utag.loader.initcfg();
    }
    if (typeof utag_cfg_ovrd != 'undefined') {
        for (var i in utag.loader.GV(utag_cfg_ovrd))
            utag.cfg[i] = utag_cfg_ovrd[i]
    }
    ;utag.loader.PINIT = function(a, b, c) {
        utag.DB("Pre-INIT");
        if (utag.cfg.noload) {
            return;
        }
        try {
            this.GET();
            if (utag.handler.RE('view', utag.data, "blr")) {
                utag.handler.LR();
            }
        } catch (e) {
            utag.DB(e)
        }
        ;a = this.cfg;
        c = 0;
        for (b in this.GV(a)) {
            if (a[b].block == 1 || (a[b].load > 0 && (typeof a[b].src != 'undefined' && a[b].src != ''))) {
                a[b].block = 1;
                c = 1;
                this.bq[b] = 1;
            }
        }
        if (c == 1) {
            for (b in this.GV(a)) {
                if (a[b].block) {
                    a[b].id = b;
                    if (a[b].load == 4)
                        a[b].load = 1;
                    a[b].cb = function() {
                        var d = this.uid;
                        utag.loader.cfg[d].cbf = 1;
                        utag.loader.LOAD(d)
                    }
                    ;
                    this.AS(a[b]);
                }
            }
        }
        if (c == 0)
            this.INIT();
    }
    ;
    utag.loader.INIT = function(a, b, c, d, e) {
        utag.DB('utag.loader.INIT');
        if (this.ol == 1)
            return -1;
        else
            this.ol = 1;
        utag.handler.RE('view', utag.data);
        utag.rpt.ts['i'] = new Date();
        d = this.cfgsort;
        for (a = 0; a < d.length; a++) {
            e = d[a];
            b = this.cfg[e];
            b.id = e;
            if (b.block != 1 && b.s2s != 1) {
                if (utag.loader.bk[b.id] || (utag.cfg.readywait && b.load == 4)) {
                    this.f[b.id] = 0;
                    utag.loader.LOAD(b.id)
                } else if (b.wait == 1 && utag.loader.rf == 0 && !(b.load == 4 && utag.cfg.noview)) {
                    utag.DB('utag.loader.INIT: waiting ' + b.id);
                    this.wq.push(b)
                    this.f[b.id] = 2;
                } else if (b.load > 0) {
                    utag.DB('utag.loader.INIT: loading ' + b.id);
                    this.lq.push(b);
                    this.AS(b);
                }
            }
        }
        if (this.wq.length > 0)
            utag.loader.EV('', 'ready', function(a) {
                if (utag.loader.rf == 0) {
                    utag.DB('READY:utag.loader.wq');
                    utag.loader.rf = 1;
                    utag.loader.WQ();
                }
            });
        else if (this.lq.length > 0)
            utag.loader.rf = 1;
        else if (this.lq.length == 0)
            utag.loader.END();
        return 1
    }
    ;
    utag.loader.EV('', 'ready', function(a) {
        if (utag.loader.efr != 1) {
            utag.loader.efr = 1;
            try {
                if (typeof utag.runonce == 'undefined')
                    utag.runonce = {};
                utag.jdh = function(h, i, j, k) {
                    h = utag.jdhc.length;
                    if (h == 0)
                        window.clearInterval(utag.jdhi);
                    else {
                        for (i = 0; i < h; i++) {
                            j = utag.jdhc[i];
                            k = jQuery(j.i).is(":visible") ? 1 : 0;
                            if (k != j.s) {
                                if (j.e == (j.s = k))
                                    jQuery(j.i).trigger(j.e ? "afterShow" : "afterHide")
                            }
                        }
                    }
                }
                ;
                utag.jdhi = window.setInterval(utag.jdh, 250);
                utag.jdhc = [];
                if (typeof utag.data['js_page.jQuery.fn.jquery'] != 'undefined') {
                    if (typeof utag.runonce[15] == 'undefined') {
                        utag.runonce[15] = 1;
                        utag.jdhc.push({
                            i: 'div.whs-video > iframe',
                            e: 1
                        });
                        jQuery(document.body).on('afterShow', 'div.whs-video > iframe', function(e) {
                            if (jQuery('div.whs-video > iframe').is(':visible')) {
                                utag.link({
                                    "event_category": 'Klout Perks',
                                    "event_action": 'CTA',
                                    "event_label": 'Watch Video'
                                })
                            }
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                if (typeof utag.data['js_page.jQuery.fn.jquery'] != 'undefined') {
                    if (typeof utag.runonce[18] == 'undefined') {
                        utag.runonce[18] = 1;
                        jQuery(document.body).on('blur', 'input#Email, input[name="Email"]', function(e) {
                            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            if (re.test(this.value)) {
                                utag.link({
                                    customer_email: this.value
                                });
                            }
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;try {
                if (typeof utag.data['js_page.jQuery.fn.jquery'] != 'undefined') {
                    if (typeof utag.runonce[20] == 'undefined') {
                        utag.runonce[20] = 1;
                        jQuery(document.body).on('blur', 'input#lia-email, input[name="email"]', function(e) {
                            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                            if (re.test(this.value)) {
                                utag.link({
                                    customer_email: this.value
                                });
                            }
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
            ;
        }
    })
    if (utag.cfg.readywait || utag.cfg.waittimer) {
        utag.loader.EV('', 'ready', function(a) {
            if (utag.loader.rf == 0) {
                utag.loader.rf = 1;
                utag.cfg.readywait = 1;
                utag.DB('READY:utag.cfg.readywait');
                setTimeout(function() {
                    utag.loader.PINIT()
                }, utag.cfg.waittimer || 1);
            }
        })
    } else {
        utag.loader.PINIT()
    }
}
