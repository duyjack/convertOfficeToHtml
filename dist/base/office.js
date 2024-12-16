"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BaseOffice_url, _BaseOffice_params;
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
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
    initKeyWhenNoValue(key) {
        if (!__classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`]) {
            __classPrivateFieldGet(this, _BaseOffice_params, "f")[`${key}`] = '';
        }
    }
    resetParams() {
        __classPrivateFieldSet(this, _BaseOffice_params, {}, "f");
    }
    generateIdElement(key) {
        return `${enum_1.PrefixId.input}_${key}`;
    }
    getParams() {
        return __classPrivateFieldGet(this, _BaseOffice_params, "f");
    }
    updateParams(key, value) {
        __classPrivateFieldGet(this, _BaseOffice_params, "f")[key] = value;
        const elementId = this.generateIdElement(key);
        const element = document.getElementById(elementId);
        if (element) {
            element.value = value;
        }
    }
    onChangeValueInput(callback) {
        Object.keys(__classPrivateFieldGet(this, _BaseOffice_params, "f")).forEach(key => {
            const idElement = this.generateIdElement(key);
            const element = document.getElementById(idElement);
            element === null || element === void 0 ? void 0 : element.addEventListener('change', (e) => {
                callback(key, e.target.value);
            });
        });
    }
}
_BaseOffice_url = new WeakMap(), _BaseOffice_params = new WeakMap();
exports.default = BaseOffice;
