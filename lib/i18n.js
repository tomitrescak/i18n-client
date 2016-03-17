"use strict";
// mf
var I18n = (function () {
    function I18n() {
        var _this = this;
        this.languages = {};
        this.currentLanguage = "en";
        this.translate = function (key, args) {
            var tr = _this.languages[_this.currentLanguage][key];
            if (!tr) {
                if (key.indexOf(".") > -1) {
                    var parts = key.split(".");
                    tr = _this.languages[_this.currentLanguage];
                    for (var i = 0; i < parts.length; i++) {
                        if (!tr[parts[i]]) {
                            tr = null;
                            break;
                        }
                        tr = tr[parts[i]];
                    }
                }
            }
            if (!tr) {
                tr = "<" + key + ">";
            }
            else if (args) {
                for (var i in args) {
                    tr = tr.replace("{" + i + "}", args[i]);
                }
            }
            return tr;
        };
    }
    I18n.prototype.add = function (language, strings) {
        if (!this.languages[language]) {
            this.languages[language] = {};
        }
        for (var s in strings) {
            this.languages[language][s] = strings[s];
        }
    };
    I18n.prototype.initTranslator = function (prefix) {
        var _this = this;
        return function (key) {
            return _this.translate(prefix + "." + key);
        };
    };
    return I18n;
}());
exports.i18n = new I18n();
