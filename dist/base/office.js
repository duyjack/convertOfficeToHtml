"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _BaseSetting_delimiters, _BaseSetting_smallInputSize, _BaseSetting_mediumInputSize, _BaseSetting_largeInputSize, _BaseSetting_containsSmallTextInput, _BaseSetting_containsMediumTextInput, _BaseSetting_containsLargeTextInput, _BaseSetting_styleSmallTextInput, _BaseSetting_styleMediumTextInput, _BaseSetting_styleLargeTextInput, _BaseOffice_url, _BaseOffice_params;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSetting = void 0;
const enum_1 = require("../enum");
class BaseSetting {
    get delimiters() {
        return __classPrivateFieldGet(this, _BaseSetting_delimiters, "f");
    }
    get smallInputSize() {
        return __classPrivateFieldGet(this, _BaseSetting_smallInputSize, "f");
    }
    get mediumInputSize() {
        return __classPrivateFieldGet(this, _BaseSetting_mediumInputSize, "f");
    }
    get largeInputSize() {
        return __classPrivateFieldGet(this, _BaseSetting_largeInputSize, "f");
    }
    /// contains text
    get containsSmallTextInput() {
        return __classPrivateFieldGet(this, _BaseSetting_containsSmallTextInput, "f");
    }
    get containsMediumTextInput() {
        return __classPrivateFieldGet(this, _BaseSetting_containsMediumTextInput, "f");
    }
    get containsLargeTextInput() {
        return __classPrivateFieldGet(this, _BaseSetting_containsLargeTextInput, "f");
    }
    /// style
    get styleSmallTextInput() {
        return __classPrivateFieldGet(this, _BaseSetting_styleSmallTextInput, "f");
    }
    get styleMediumTextInput() {
        return __classPrivateFieldGet(this, _BaseSetting_styleMediumTextInput, "f");
    }
    get styleLargeTextInput() {
        return __classPrivateFieldGet(this, _BaseSetting_styleLargeTextInput, "f");
    }
    constructor(delimiters) {
        _BaseSetting_delimiters.set(this, void 0);
        _BaseSetting_smallInputSize.set(this, 20);
        _BaseSetting_mediumInputSize.set(this, 30);
        _BaseSetting_largeInputSize.set(this, 75);
        _BaseSetting_containsSmallTextInput.set(this, []);
        _BaseSetting_containsMediumTextInput.set(this, []);
        _BaseSetting_containsLargeTextInput.set(this, []);
        _BaseSetting_styleSmallTextInput.set(this, void 0);
        _BaseSetting_styleMediumTextInput.set(this, void 0);
        _BaseSetting_styleLargeTextInput.set(this, void 0);
        __classPrivateFieldSet(this, _BaseSetting_delimiters, delimiters, "f");
    }
    config(options) {
        var _a, _b, _c, _d, _e, _f;
        __classPrivateFieldSet(this, _BaseSetting_smallInputSize, (_a = options.smallInputSize) !== null && _a !== void 0 ? _a : 20, "f");
        __classPrivateFieldSet(this, _BaseSetting_mediumInputSize, (_b = options.mediumInputSize) !== null && _b !== void 0 ? _b : 30, "f");
        __classPrivateFieldSet(this, _BaseSetting_largeInputSize, (_c = options.largeInputSize) !== null && _c !== void 0 ? _c : 30, "f");
        __classPrivateFieldSet(this, _BaseSetting_containsSmallTextInput, (_d = options === null || options === void 0 ? void 0 : options.containsTextSmallInput) !== null && _d !== void 0 ? _d : [], "f");
        __classPrivateFieldSet(this, _BaseSetting_containsMediumTextInput, (_e = options === null || options === void 0 ? void 0 : options.containsTextMediumInput) !== null && _e !== void 0 ? _e : [], "f");
        __classPrivateFieldSet(this, _BaseSetting_containsLargeTextInput, (_f = options === null || options === void 0 ? void 0 : options.containsTextLargeInput) !== null && _f !== void 0 ? _f : [], "f");
        __classPrivateFieldSet(this, _BaseSetting_styleSmallTextInput, options === null || options === void 0 ? void 0 : options.styleSmallTextInput, "f");
        __classPrivateFieldSet(this, _BaseSetting_styleMediumTextInput, options === null || options === void 0 ? void 0 : options.styleMediumTextInput, "f");
        __classPrivateFieldSet(this, _BaseSetting_styleLargeTextInput, options === null || options === void 0 ? void 0 : options.styleLargeTextInput, "f");
    }
}
exports.BaseSetting = BaseSetting;
_BaseSetting_delimiters = new WeakMap(), _BaseSetting_smallInputSize = new WeakMap(), _BaseSetting_mediumInputSize = new WeakMap(), _BaseSetting_largeInputSize = new WeakMap(), _BaseSetting_containsSmallTextInput = new WeakMap(), _BaseSetting_containsMediumTextInput = new WeakMap(), _BaseSetting_containsLargeTextInput = new WeakMap(), _BaseSetting_styleSmallTextInput = new WeakMap(), _BaseSetting_styleMediumTextInput = new WeakMap(), _BaseSetting_styleLargeTextInput = new WeakMap();
class BaseOffice {
    constructor(url, params) {
        _BaseOffice_url.set(this, void 0);
        _BaseOffice_params.set(this, void 0); // key: value of doc
        __classPrivateFieldSet(this, _BaseOffice_url, url, "f");
        __classPrivateFieldSet(this, _BaseOffice_params, params, "f");
    }
    get url() {
        return __classPrivateFieldGet(this, _BaseOffice_url, "f");
    }
    initKeyWhenNoValue(key, isArray = false, position) {
        if (!__classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`]) {
            if (isArray) {
                __classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`] = [];
                if (position !== undefined) {
                    __classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`][position] = '';
                }
            }
            else {
                __classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`] = '';
            }
        }
        else {
            if (isArray && __classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`]) {
                if (position != undefined && !__classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`][position]) {
                    __classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`][position] = '';
                }
            }
        }
    }
    loadToHtml(container) {
        throw new Error('no implement');
    }
    resetParams() {
        __classPrivateFieldSet(this, _BaseOffice_params, {}, "f");
    }
    generateIdElement(key, position) {
        if (position != undefined) {
            return `${enum_1.PrefixId.input}_${key}_${position}`;
        }
        return `${enum_1.PrefixId.input}_${key}`;
    }
    getParams() {
        return __classPrivateFieldGet(this, _BaseOffice_params, "f");
    }
    updateParams(key, value, position) {
        if (Array.isArray(__classPrivateFieldGet(this, _BaseOffice_params, "f")[key]) && position != undefined) {
            console.log(`updateParams key ${key} - value ${value} - position ${position}`);
            __classPrivateFieldGet(this, _BaseOffice_params, "f")[key][position] = value;
        }
        else {
            __classPrivateFieldGet(this, _BaseOffice_params, "f")[key] = value;
        }
        const elementId = this.generateIdElement(key, position);
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value;
        }
    }
    onChangeValueInput(callback) {
        if (!this.callbackOnInput) {
            this.callbackOnInput = callback;
            this.listenInputChangeValue();
        }
    }
    listenInputChangeValue() {
        Object.keys(__classPrivateFieldGet(this, _BaseOffice_params, "f")).forEach(key => {
            if (Array.isArray(__classPrivateFieldGet(this, _BaseOffice_params, "f")[key])) {
                __classPrivateFieldGet(this, _BaseOffice_params, "f")[key].forEach((value, index) => {
                    const idElement = this.generateIdElement(key, index);
                    const element = document.getElementById(idElement);
                    if (element && !element.oninput) {
                        element.oninput = (e) => {
                            const value = e.target.value;
                            this.updateParams(key, value, index);
                            if (this.callbackOnInput) {
                                this.callbackOnInput(key, value);
                            }
                        };
                    }
                });
            }
            else {
                const idElement = this.generateIdElement(key);
                const element = document.getElementById(idElement);
                if (element && !element.oninput) {
                    element.oninput = (e) => {
                        const value = e.target.value;
                        this.updateParams(key, value);
                        if (this.callbackOnInput) {
                            this.callbackOnInput(key, value);
                        }
                    };
                }
            }
        });
    }
    saveFileWithParams(fileName) {
        throw new Error('no implement');
    }
    getValueFromKey(key, options) {
        return this.getParams()[key];
    }
}
_BaseOffice_url = new WeakMap(), _BaseOffice_params = new WeakMap();
exports.default = BaseOffice;
