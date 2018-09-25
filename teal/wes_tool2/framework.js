/*
Tealium Tools Framework
Created by Jason Paddock/Brian Kranson/Adrian Browning
Date: 9/28/16
Version: 1.0
Change Log: 
    1.0: Initial Release
*/
window.uuu = window.uuu || {

    initialized: false,

    // Initialize message object with data object for passing information
    message: {
        header: '<p style="">Ultimate User Utility</p>',
        footer: '<br><p style="">Comments / bugs / feature requests? Send them to <a href="mailto:wesley.limtiaco@tealium.com">wesley.limtiaco@tealium.com</a></p>',
        namespace: "uuu_main",
        data: {
            msg_queue: []
        }
    },

    // Incoming tool object from Tealium tools .html (Handlebars) UI
    main: function(tool) {
        if (document.URL.indexOf('my.tealiumiq.com') === -1) {
            this.error('Need to be on TiQ Website');
            return false
        }
        switch (tool.command) {
            case "start":
                this.start();
                break;
            case "reset_mfa":
                this.reset_mfa(tool.account_name, tool.user_email);
                break;
            case "query_user":
                this.query_user(tool.account_name, tool.user_email);
                break;
            case "update_permissions":
                this.update_permissions(tool.account_name, tool.user_email);
                break;
            case "exit":
                this.exit();
                break;
            default:
                this.error("Unknown command received from Tealium Tool: '" + tool.command + "'");
                break;
        }
        tealiumTools.send(this.message);

    },
    reset_mfa: function(account_name, user_email) {
        //Show a message to the user
        this.makeProgressCircle("Resetting " + user_email + "'s MFA...");
        //Need to copy the this context to the 'that' variable so that inside the anonymous function, I can still access the tool object without referencing its name
        var that = this;
        //Force a delay to showcase the wait screen
        var utk = localStorage.getItem('utk') || '';
        setTimeout(function() {
            $.ajax({
                url: 'https://my.tealiumiq.com/urest/users/' + user_email + '/accounts/tealium?utk=' + utk,
                type: 'GET',
                success: function(result, dataobj) {
                    // Do something with the result
                    setTimeout(function() {
                        $.ajax({
                            url: 'https://my.tealiumiq.com/urest/users/' + user_email + '/accounts/' + result.primary_account + '/profiles/main/mfa?utk=' + utk,
                            type: 'PUT',
                            success: function(response, data) {
                                console.log(data);
                                if (data == "success") {
                                    window.framework.makeFinishCircle('MFA Reset complete!');
                                }
                                // Do something with the result
                            }
                        });
                    }, 1000);
                }
            });
        }, 1000);

    },
    query_user: function(account_name, user_email) {
        //Show a message to the user
        this.makeProgressCircle("Getting " + user_email + "'s MFA...");
        //Need to copy the this context to the 'that' variable so that inside the anonymous function, I can still access the tool object without referencing its name
        var that = this;
        //Force a delay to showcase the wait screen
        var utk = localStorage.getItem('utk') || '';
        setTimeout(function() {
            $.ajax({
                url: 'https://my.tealiumiq.com/urest/users/' + user_email + '/accounts/tealium?utk=' + utk,
                type: 'GET',
                success: function(result, dataobj) {

                    window.framework.makeFinishCircle('Primary account is ' + result.primary_account)

                }
            });
        }, 1000);

    },
    update_permissions: function(account_name, user_email) {
        debugger;
        String.prototype.template = function(obj, result) {
            result = this;
            for (var key in obj) {
                result = result.replace((new RegExp("{{\\s*" + key + "\\s*}}", "g")), obj[key]);
            }
            return result;
        };
        var urls = {
            user: "https://{{domain}}/urest/users/{{username}}/accounts/{{account}}/updatepermissioncache?utk={{token}}",
            account: "https://{{domain}}/urest/users/accounts/{{account}}/updatepermissioncache?utk={{token}}",
            global_user: "https://{{domain}}/urest/users/{{username}}/accounts/*/updatepermissioncache?utk={{token}}",
            superuser: "https://{{domain}}/urest/users/{{username}}/addwildcardaccountuser?utk={{token}}"
        };
        var prompts = {
            account: function() {
                return prompt("What is the account name?");
            },
            username: function() {
                return prompt("What is the username?");
            }
        };
        var ask_for = function(prompts) {
            var args = arguments,
                result = [],
                answer = "";
            for (var i = args.length - 1; i >= 1; i--) {
                answer = prompts[args[i]]();
                if (answer) {
                    result.push(answer);
                } else {
                    return result;
                }
            }
            return result;
        };
        var update = function(obj, url, a) {
            obj.domain = location.host;
            obj.token = utk.textContent;
            url = urls[obj.target].template(obj);
            a = document.createElement("a");
            a.href = url;
            a.target = "_blank";
            a.click();
        };
        var target = prompt("What do you want to update?\nOptions:\nuser, account, global_user, superuser");
        var answers = [];
        if (target === "user") {
            answers = ask_for(prompts, "account", "username");
            if (answers[0] && answers[1]) update({
                target: target,
                username: answers[0],
                account: answers[1]
            });
        } else if (target === "account") {
            answers = ask_for(prompts, "account");
            if (answers[0]) update({
                target: target,
                account: answers[0]
            });
        } else if (target === "global_user" || target === "superuser") {
            answers = ask_for(prompts, "username");
            if (answers[0]) update({
                target: target,
                username: answers[0]
            });
        };
    },
    log: function(str) {
        console.log(str);
        this.message.data.msg_queue.push(str);
        tealiumTools.send(this.message);
    },
    exit: function() {
        this.message.exit = true;
    },
    start: function() {
        this.message.exit = false;
        this.ui_state('ui_start');
        this.message.data.account_name = utui.login.account;
        this.message.data.profiles = [];
    },

    makeProgressCircle: function(msg) {
        // console.log("makeProgressCircle");
        this.ui_state('ui_wait');
        if (typeof msg !== 'undefined') {
            this.message.data.wait_message = msg;
        }
        tealiumTools.send(this.message);
    },
    makeFinishCircle: function(msg) {
        // console.log("makeProgressCircle");
        this.ui_state('ui_finish');
        if (typeof msg !== 'undefined') {
            this.message.data.finish_message = msg;
        }
        tealiumTools.send(this.message);
    },

    ui_state: function(cmd) {
        var that = this;
        Object.keys(this.message).forEach(function(key, index) {
            if (key.indexOf('ui_') === 0) {
                that.message[key] = false;
            }
        });
        this.message[cmd] = true;
    },

    error: function(msg) {
        this.ui_state('ui_error');
        this.message.data.error_message = msg;
        console.log('Error: ' + msg);
        tealiumTools.send(this.message);
    }
}

window.uuu_main = function(arg) {
    return uuu.main(arg);
}

if (!uuu.initialized) {
    uuu.initialized = true;
    uuu_main({
        command: "start"
    });
} else {
    if (typeof uuu.message.ui_finish === 'undefined' || uuu.message.exit === true) {
        uuu_main({
            command: "start"
        });
    }
}