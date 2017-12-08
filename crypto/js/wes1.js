//local wes
//tealium universal tag - utag.129 ut4.0.201701192154, Copyright 2017 Tealium.com Inc. All Rights Reserved.
try {
    (function(id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag === undefined) {
            utag = {};
        }
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function(o) {
                var a, b, c, l;
                a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    b.setAttribute("height", "1");
                    b.setAttribute("width", "1");
                    b.setAttribute("style", "display:none");
                    b.setAttribute("src", o.src);
                } else if (o.type === "img") {
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
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id;
                }
                if (typeof o.cb === "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function() {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function() {
                            if (this.readyState === "complete" || this.readyState === "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        }
                        ;
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l === "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b);
                    }
                }
            }
            ;
        } else {
            u.loader = utag.ut.loader;
        }
        u.ev = {
            'view': 1,
            'link': 1
        };
        u.initialized = false;
        u.map = {};
        u.extend = [];
        u.send = function(a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, i;
                u.data = {
                    "base_url": "//ga.getresponse.com/script/ga.js?grid=sBDcDWUZQcH8IAg==",
                    "customer_email": b.email
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                // u.loader_cb = function() {
                //     u.initialized = true;
                //     if (u.data.customer_email && (typeof b['cp.gaVisitorEmail'] == 'undefined' || b['cp.gaVisitorEmail'] == "" || b['cp.gaVisitorEmail'] == 'anonymous')) {
                //         gaSetUserId(u.data.customer_email);
                //     }
                //     ;
                // }
                // ;
                if (!u.initialized) {
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": u.loader_cb,
                        "loc": "script",
                        "id": 'utag_129'
                    });
                } else {
                    u.loader_cb();
                }
            }
        }
        ;
        utag.o[loader].loader.LOAD(id);
    })("129", "getwinesdirect.main");
} catch (error) {
    utag.DB(error);
}
