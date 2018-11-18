(function (window) {

    'use strict';

    var utils = {

        noop: function() {},

        getDefaultSettings: function() {
            let dfSettings = {};
            dfSettings['mbShowCount'] = true;
            dfSettings['mbShowAlert'] = false;
            dfSettings['mbRunStatus'] = true;
            dfSettings['mbFilters'] = true;
            dfSettings['mbWhiteList'] = [];
            dfSettings['mbUserFilters'] = [];

            return dfSettings;
        },

        getSettings: function(callback) {
            let self = this;
            chrome.storage.local.get('mbSettings', function(res) {
                if((Object.keys(res).length) === 0) {
                    res = self.getDefaultSettings();
                    self.setSettings(res);
                    callback(res);
                } else {
                    callback(res.mbSettings);
                }
            });

        },

        setSettings: function(settings, callback) {
            callback = (callback === undefined) ? this.noop : callback;
            chrome.storage.local.set({'mbSettings' : settings}, callback);
        },


        setOption: function(option, value, callback) {
            let self = this;
            this.getSettings(function(res) {
                res[option] = value;
                self.setSettings(res, callback);
            });
        },


        cleanArray: function(arr) {
            return arr.map(function(e){
                return e.trim();
            }).filter(function(str) {
                return /^[^#]\S/.test(str);
            });
        },

        getDomain: function(url) {
            return (url.split('/')[2] || url.split('/')[0]).split(':')[0];
        },

        getRootDomain: function(url) {
            let domain = this.getDomain(url);

            if(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(domain) === true) {
                return domain;
            }

            let pieces = domain.split('.');
            return pieces.slice((pieces.length > 2) ? 1 : 0).join('.');
        },

        checkWhiteList: function(url, array) {
            if(array === null) {
                return false;
            } else {

                return (array.indexOf(url) > -1);
            }
        },

    };

    window.utils = utils;

}(window));
