"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _OfficeDoc_setting;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingDoc = void 0;
const docxtemplater_1 = __importDefault(require("docxtemplater"));
const pizzip_1 = __importDefault(require("pizzip"));
const index_js_1 = __importDefault(require("pizzip/utils/index.js"));
const expressions_1 = __importDefault(require("docxtemplater/expressions"));
const mammoth_1 = __importDefault(require("mammoth"));
const file_saver_1 = require("file-saver");
const office_1 = __importStar(require("./base/office"));
const utils_1 = require("./utils");
class SettingDoc extends office_1.BaseSetting {
}
exports.SettingDoc = SettingDoc;
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
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                    // const textReplaces = html.match(/{{\s*[\w.]+\s*}}/g);
                    const regex = (0, utils_1.generateDynamicRegex)(__classPrivateFieldGet(this, _OfficeDoc_setting, "f").delimiters.start, __classPrivateFieldGet(this, _OfficeDoc_setting, "f").delimiters.end);
                    const textReplaces = html.match(regex);
                    // console.log('textReplaces', textReplaces);
                    for (let text of textReplaces) {
                        let width = '10px';
                        let style;
                        let componentName = 'input';
                        const key = `${text.replace('{{', '').replace('}}', '')}`;
                        this.initKeyWhenNoValue(key);
                        if (__classPrivateFieldGet(this, _OfficeDoc_setting, "f").containsSmallTextInput.some(txt => text.includes(txt))) {
                            width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").smallInputSize}px`;
                            style = __classPrivateFieldGet(this, _OfficeDoc_setting, "f").styleSmallTextInput;
                        }
                        else if (__classPrivateFieldGet(this, _OfficeDoc_setting, "f").containsMediumTextInput.some(txt => text.includes(txt))) {
                            width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").mediumInputSize}px`;
                            style = __classPrivateFieldGet(this, _OfficeDoc_setting, "f").styleMediumTextInput;
                        }
                        else if (__classPrivateFieldGet(this, _OfficeDoc_setting, "f").containsLargeTextInput.some(txt => text.includes(txt))) {
                            width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").largeInputSize}px`;
                            style = __classPrivateFieldGet(this, _OfficeDoc_setting, "f").styleLargeTextInput;
                            componentName = 'textarea';
                        }
                        else {
                            width = `${__classPrivateFieldGet(this, _OfficeDoc_setting, "f").mediumInputSize}px`;
                        }
                        const styleComponent = style ? style + `,width: ${width}` : `width: ${width}`;
                        const idElement = this.generateIdElement(key);
                        const component = ` <${componentName} id=${idElement} type='text' style='${styleComponent}'></${componentName}>`;
                        html = html.replace(text, component);
                    }
                    // console.log('html', html);
                    pdfContainer.innerHTML = html;
                    resolve();
                })
                    .catch((error) => {
                    console.error(error);
                    reject(error);
                });
            }));
        });
    }
    saveFileWithParams(fileName) {
        return new Promise((resolve, reject) => {
            loadFile(this.url, (error, content) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    reject(error);
                    return;
                }
                const zip = new pizzip_1.default(content);
                const doc = new docxtemplater_1.default(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                    parser: expressions_1.default,
                    delimiters: {
                        start: __classPrivateFieldGet(this, _OfficeDoc_setting, "f").delimiters.start,
                        end: __classPrivateFieldGet(this, _OfficeDoc_setting, "f").delimiters.end,
                    }
                });
                doc.render(Object.assign({}, this.getParams()));
                const out = doc.getZip().generate({
                    type: 'blob',
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                }); //Output the document using Data-URI
                (0, file_saver_1.saveAs)(out, `${fileName}.docx`);
                resolve();
            }));
        });
    }
}
_OfficeDoc_setting = new WeakMap();
exports.default = OfficeDoc;
