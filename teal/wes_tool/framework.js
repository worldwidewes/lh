/*
Tealium Tools Framework
Author: Wesley Limtiaco
Date: 02/05/18 (English Dates are better)
Version: 1.0
Change Log: 
    1.0: Initial Release
*/
window.mfa_reset = window.mfa_reset || {

    initialized: false,

    // Initialize message object with data object for passing information
    message: {
        header: '<p style="">MFA Reset Utility</p>',
        footer: '<br><p style="">Comments / bugs / feature requests? Send them to <a href="mailto:wesley.limtiaco@tealium.com">wesley.limtiaco@tealium.com</a></p>',
        namespace: "mfa_reset_main",
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
                                if (data == "success") {
                                    window.mfa_reset.makeFinishCircle('MFA Reset complete!');
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

                    window.mfa_reset.makeFinishCircle('Primary account is ' + result.primary_account)

                }
            });
        }, 1000);

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

window.mfa_reset_main = function(arg) {
    return mfa_reset.main(arg);
}

if (!mfa_reset.initialized) {
    mfa_reset.initialized = true;
    mfa_reset_main({
        command: "start"
    });
} else {
    if (typeof mfa_reset.message.ui_finish === 'undefined' || mfa_reset.message.exit === true) {
        mfa_reset_main({
            command: "start"
        });
    }
}