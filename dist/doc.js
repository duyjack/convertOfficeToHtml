"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _SettingDoc_smallInputSize, _SettingDoc_mediumInputSize, _SettingDoc_largeInputSize, _SettingDoc_containsTextSmallInput, _SettingDoc_containsTextMediumInput, _SettingDoc_containsTextLargeInput, _OfficeDoc_setting;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingDoc = void 0;
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const pizzip_1 = __importDefault(require("pizzip"));
const index_js_1 = __importDefault(require("pizzip/utils/index.js"));
const expressions_1 = __importDefault(require("docxtemplater/expressions"));
const mammoth_1 = __importDefault(require("mammoth"));
const file_saver_1 = require("file-saver");
const office_1 = __importDefault(require("./base/office"));
class SettingDoc {
    constructor() {
        _SettingDoc_smallInputSize.set(this, 20);
        _SettingDoc_mediumInputSize.set(this, 30);
        _SettingDoc_largeInputSize.set(this, 75);
        _SettingDoc_containsTextSmallInput.set(this, []);
        _SettingDoc_containsTextMediumInput.set(this, []);
        _SettingDoc_containsTextLargeInput.set(this, []);
    }
    get smallInputSize() {
        return __classPrivateFieldGet(this, _SettingDoc_smallInputSize, "f");
    }
    get mediumInputSize() {
        return __classPrivateFieldGet(this, _SettingDoc_mediumInputSize, "f");
    }
    get largeInputSize() {
        return __classPrivateFieldGet(this, _SettingDoc_largeInputSize, "f");
    }
    ///
    get containsTextSmallInput() {
        return __classPrivateFieldGet(this, _SettingDoc_containsTextSmallInput, "f");
    }
    get containsTextMediumInput() {
        return __classPrivateFieldGet(this, _SettingDoc_containsTextMediumInput, "f");
    }
    get containsTextLargeInput() {
        return __classPrivateFieldGet(this, _SettingDoc_containsTextLargeInput, "f");
    }
    config(options) {
        var _a, _b, _c, _d, _e, _f;
        __classPrivateFieldSet(this, _SettingDoc_smallInputSize, (_a = options.smallInputSize) !== null && _a !== void 0 ? _a : 20, "f");
        __classPrivateFieldSet(this, _SettingDoc_mediumInputSize, (_b = options.mediumInputSize) !== null && _b !== void 0 ? _b : 30, "f");
        __classPrivateFieldSet(this, _SettingDoc_largeInputSize, (_c = options.largeInputSize) !== null && _c !== void 0 ? _c : 30, "f");
        __classPrivateFieldSet(this, _SettingDoc_containsTextSmallInput, (_d = options === null || options === void 0 ? void 0 : options.containsTextSmallInput) !== null && _d !== void 0 ? _d : [], "f");
        __classPrivateFieldSet(this, _SettingDoc_containsTextMediumInput, (_e = options === null || options === void 0 ? void 0 : options.containsTextMediumInput) !== null && _e !== void 0 ? _e : [], "f");
        __classPrivateFieldSet(this, _SettingDoc_containsTextLargeInput, (_f = options === null || options === void 0 ? void 0 : options.containsTextLargeInput) !== null && _f !== void 0 ? _f : [], "f");
    }
}
exports.SettingDoc = SettingDoc;
_SettingDoc_smallInputSize = new WeakMap(), _SettingDoc_mediumInputSize = new WeakMap(), _SettingDoc_largeInputSize = new WeakMap(), _SettingDoc_containsTextSmallInput = new WeakMap(), _SettingDoc_containsTextMediumInput = new WeakMap(), _SettingDoc_containsTextLargeInput = new WeakMap();
function loadFile(url, callback) {
    index_js_1.default.getBinaryContent(url, callback);
}
class OfficeDoc extends office_1.default {
    constructor(url, setting) {
        super(url, {});
        _OfficeDoc_setting.set(this, void 0);
        __classPrivateFieldSet(this, _OfficeDoc_setting, setting, "f");
    }
    loadToHtml(container) {
        return __awaiter(this, void 0, void 0, function* () {
            // const url = 'https://gomeetv3.vnptit.vn/storage/test/TT18_3.docx';
            const url = this.url;
            let arrayBuffer;
            try {
                const response = yield fetch(url);
                arrayBuffer = yield response.arrayBuffer();
                this.resetParams();
            }
            catch (err) {
                throw err;
            }
            mammoth_1.default.convertToHtml({ arrayBuffer: arrayBuffer })
                .then((result) => {
                var html = result.value; // The generated HTML
                const pdfContainer = container;
                const textReplaces = html.match(/{{\s*[\w.]+\s*}}/g);
                console.log('textReplaces', textReplaces);
                for (let text of textReplaces) {
                    let width = '10px';
                    const key = `${text}`;
                    this.initKeyWhenNoValue(key);
                    if (__classPrivateFieldGet(this, _OfficeDoc_setting, "f").containsTextSmallInput.some(txt => text.includes(txt))) {
                        width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").smallInputSize}px`;
                    }
                    else if (__classPrivateFieldGet(this, _OfficeDoc_setting, "f").containsTextMediumInput.some(txt => text.includes(txt))) {
                        width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").mediumInputSize}px`;
                    }
                    else if (__classPrivateFieldGet(this, _OfficeDoc_setting, "f").containsTextLargeInput.some(txt => text.includes(txt))) {
                        width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").largeInputSize}px`;
                    }
                    else {
                        width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").mediumInputSize}px`;
                    }
                    const idElement = this.generateIdElement(key);
                    const component = ` <input id=${idElement} type='text' style='width: ${width}'/>`;
                    html = html.replace(text, component);
                }
                // console.log('html', html);
                pdfContainer.innerHTML = html;
            })
                .catch((error) => {
                console.error(error);
            });
        });
    }
    generateDocument(fileName) {
        loadFile(this.url, (error, content) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                throw error;
            }
            const zip = new pizzip_1.default(content);
            const doc = new docxtemplater_1.default(zip, {
                paragraphLoop: true,
                linebreaks: true,
                parser: expressions_1.default,
                delimiters: {
                    start: '{{',
                    end: '}}'
                }
            });
            doc.render(Object.assign({}, this.getParams()));
            const out = doc.getZip().generate({
                type: 'blob',
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }); //Output the document using Data-URI
            (0, file_saver_1.saveAs)(out, `${fileName}.docx`);
        }));
    }
}
_OfficeDoc_setting = new WeakMap();
exports.default = OfficeDoc;
