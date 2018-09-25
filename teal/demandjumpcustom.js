//~~tv:20010.20140827
//~~tc: Tealium Custom Container

/*
  Tealium Custom Container Notes:
  - Add sending code between "Start Tag Sending Code" and "End Tag Sending Code".
  - Add JavaScript tag library code between "Start Tag Library Code" and "End Tag Library Code".
  - Add JavaScript code only, do not add HTML code in this file.
  - Remove any <script> and </script> tags from the code you place in this file.

  Loading external JavaScript files (Loader):
  - If you need to load an additional external JavaScript file, un-comment the singe-line JavaScript comments ("//") within the following Loader sections near the bottom of this file:
      - "Start Loader Function Call"
      - "End Loader Function Call"
      - "Start Loader Callback Function"
      - "End Loader Callback Function"
  - After un-commenting, insert the path to the external JavaScript file you want to load.
  - Finally, within the Loader callback function, insert the JavaScript code that should run after the external JavaScript file has loaded.
*/

/* Start Tag Library Code */
/* End Tag Library Code */

//tealium universal tag - utag.sender.custom_container ut4.0.##UTVERSION##, Copyright ##UTYEAR## Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Start Tealium loader 4.32
    // Please do not modify
    if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {'view' : 1};

    u.initialized = false;

    ##UTGEN##

    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, i;

        u.data = {
          /* Initialize default tag parameter values here */
          /* Examples: */
          /* "account_id" : "1234567" */
          //"base_url" : ""
          /* A value mapped to "account_id" or "base_url" in TiQ will replace these default values. */
        };


        /* Start Tag-Scoped Extensions Code */
        /* Please Do Not Edit This Section */
        ##UTEXTEND##
        /* End Tag-Scoped Extensions Code */


        /* Start Mapping Code */
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }
        /* End Mapping Code */


        /* Start Tag Sending Code */

          u.data.order_id = u.data.order_id || b._corder || "";
          u.data.grand_total = u.data.grand_total || b._ctotal || "";
          u.data.tax_amt = u.data.tax_amt || b._ctax || "";
          u.data.shipping_amt = u.data.shipping_amt || b._cship || "";
          u.data.city = u.data.city || b._ccity || "";
          u.data.state = u.data.state || b._cstate || "";
          u.data.country = u.data.country || b._ccountry || "";
          u.data.currency = u.data.currency || b._ccurrency || "";
          u.data.product_id = u.data.product_id || b._cprod || [];
          u.data.product_name = u.data.product_name || b._cprodname || [];
          u.data.product_category = u.data.product_category || b._ccat || [];
          u.data.product_price = u.data.product_price || b._cprice || [];
          u.data.product_quantity = u.data.product_quantity || b._cquan || [];
        /* End Tag Sending Code */


        /* Start Loader Callback Function */
        /* Un-comment the single-line JavaScript comments ("//") to use this Loader callback function. */

        u.loader_cb = function () {
          //initialized once
          if(!u.initialized){
            window.djpush('newTracker', 'demandjump-analytics', 'analytics.demandjump.com', {
                appId: '1230010079-01',
                platform: 'web',
                cookieDomain: '.dooney.com',
                cookieName: 'djaim',
                contexts: {
                    gaCookies: true,
                    geolocation: false
                },
                post: true
            });
          }
          u.initialized = true;
          
          window.djpush('trackPageView');


          //transaction
          if(u.data.order_id){
              window.djpush('addTrans',
                u.data.order_id, // orderId - REQUIRED - numeric id for the transaction or order
                'Primary Store', // affiliation - optional - name of the store or partner affiliation
                u.data.grand_total, // total - REQUIRED - grand total including taxes and shipping
                u.data.tax_amt, // tax - optional - the amount of tax
                u.data.shipping_amt, // shipping - optional - the amount of tax
                u.data.city, // city - optional - city associated to the order
                u.data.state, // state or province - optional - state associated to the order
                u.data.country, // country - optional - 3-digit country code
                u.data.currency // currency - optional - 3-digit currency code
            );

            //call 'addItem' for each item in the order
            for(i=0;i<u.data.product_id.length;i++){
              window.djpush('addItem',
                  u.data.order_id[i], // orderId - REQUIRED - numeric id for the transaction or order
                  u.data.product_id[i], // sku - REQUIRED - sku number of the item
                  u.data.product_name[i], // name - REQUIRED - name of the product
                  u.data.product_category[i], // category - optional - the category of the product
                  u.data.product_price[i], // price - REQUIRED - the price of the product
                  u.data.product_quantity[i], // quantity - REQUIRED - the quantity being sold of this item
                  u.data.currency // currency - optional - 3-digit currency code
              );
            }

            //send transaction
            window.djpush('trackTrans');
          }
          

        };

        /* End Loader Callback Function */


        /* Start Loader Function Call */
        /* Un-comment the single-line JavaScript comments ("//") to use Loader. */

          if (!u.initialized) {
            //u.loader({"type" : "iframe", "src" : u.data.base_url + c.join(u.data.qsp_delim), "cb" : u.loader_cb, "loc" : "body", "id" : 'utag_##UTID##' });
            //u.loader({"type" : "script", "src" : u.data.base_url, "cb" : u.loader_cb, "loc" : "script", "id" : 'utag_##UTID##' });
            (function(j, u, m, p, i, n, g, z) {
                if (!j[i]) {
                    j.DemandJumpAnalytics = j.DemandJumpAnalytics || [];
                    j.DemandJumpAnalytics.push(i);
                    j[i] = function() {
                        (j[i].q = j[i].q || []).push(arguments)
                    };
                    j[i].q = j[i].q || [];
                    n = u.createElement(m);
                    g = u.getElementsByTagName(m)[0];
                    n.async = 1;
                    n.onload = z;
                    n.src = p;
                    g.parentNode.insertBefore(n, g);
                }
            }(window, document, "script", "//cdn.demandjump.com/analytics/dj.js", "djpush", u.loader_cb));
          } else {
            u.loader_cb();
          }

          //u.loader({"type" : "img", "src" : u.data.base_url + c.join(u.data.qsp_delim) });

        /* End Loader Function Call */


        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  })("##UTID##", "##UTLOADERID##");
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag

