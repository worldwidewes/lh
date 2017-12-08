(function() {
    "use strict";
    
    /*
     * @namespace window.AcidJs
     **/
    if(undefined === window.AcidJs) {
        window.AcidJs = {};
    }
    
    /*
     * @constructor
     * @param urls (Object) set a predefined key-value pairs of urls/shorturls
     * {
     *  "url": "shorturl"
     * }
     **/
    function Shortener(urls) {
        this.urls = urls || {};
    }
    
    Shortener.prototype = {
        /*
         * @member APIS (Object)
         * @public
         **/
        APIS: {
            tinyurl: "http://tinyurl.com/api-create.php?url="
        },
        
        /*
         * @method get
         * @public
         * @param longUrl (String) URL that should be shortened
         * @param callback (Function) [optional] callback that will be executed after the URL has been processed
         * @param apiToUse (String) [optional] which shortening service should be used (default is "tinyurl")
         **/
        get: function(longUrl, callback, apiToUse) {
            var
                that = this,
                service = apiToUse ? this.APIS[apiToUse] : this.APIS.tinyurl;
            
            if(this.urls[longUrl]) {
                if(callback) {
                    callback.call(this, this.urls[longUrl]);
                    return;
                }
            }
            
            $.when($.ajax({
                    url: "AcidJs.Shortener/php/Shortener.php",
                    data: "url=" + window.encodeURIComponent(longUrl) + 
                        "&service=" + window.encodeURIComponent(service),
                    dataType: "json"
                })).then(function(rsp){ 
                    that.set(longUrl, rsp[longUrl], callback);
                });
        },
        
        /*
         * @method set cache the short url in the urls object and reuse it from the DOM storage if requested again
         * @private
         * @param key (String) original expanded URL
         * @param value (String) shortened url
         * @param callback (Function) [optional] execute the callback, if set in the get() method
         **/
        set: function(key, value, callback) {
            this.urls[key] = value;
            if(callback) {
                callback.call(this, this.urls[key]);
            }
        }
    };
    
    window.AcidJs.Shortener = Shortener;
})();