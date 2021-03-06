var yo = function(){console.log('yo')};

function KeyValueObject(key, value) {
    this.key = key;
    this.value = value;
}
var waTealiumUtils = {
    reportEvent: function(waArray, type) {
        try {
            var utagValues = {};
            for (var i = 0; i < waArray.length; i++) {
                utagValues[waArray[i].key] = waArray[i].value;
            }
            if (type == "view" && utag.view !== "undefined") {
                utag.view(utagValues);
            } else {
                if (type == "click" && utag.link !== "undefined") {
                    utag.link(utagValues);
                }
            }
        } catch (e) {}
    },
    reportJsonEvent: function(jsonObject, type) {
        try {
            if (type == "view" && utag.view !== "undefined") {
                utag.view(jsonObject);
            } else {
                if (type == "click" && utag.link !== "undefined") {
                    utag.link(jsonObject);
                }
            }
        } catch (e) {}
    }
};
