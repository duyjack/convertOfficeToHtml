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
var _SettingXlsx_smallInputSize, _SettingXlsx_mediumInputSize, _SettingXlsx_largeInputSize, _SettingXlsx_containsTextSmallInput, _SettingXlsx_containsTextMediumInput, _SettingXlsx_containsTextLargeInput, _Xlsx_setting;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingXlsx = void 0;
const xlsx = __importStar(require("xlsx"));
const office_1 = __importDefault(require("./base/office"));
class SettingXlsx {
    constructor() {
        _SettingXlsx_smallInputSize.set(this, 20);
        _SettingXlsx_mediumInputSize.set(this, 30);
        _SettingXlsx_largeInputSize.set(this, 75);
        _SettingXlsx_containsTextSmallInput.set(this, []);
        _SettingXlsx_containsTextMediumInput.set(this, []);
        _SettingXlsx_containsTextLargeInput.set(this, []);
    }
    get smallInputSize() {
        return __classPrivateFieldGet(this, _SettingXlsx_smallInputSize, "f");
    }
    get mediumInputSize() {
        return __classPrivateFieldGet(this, _SettingXlsx_mediumInputSize, "f");
    }
    get largeInputSize() {
        return __classPrivateFieldGet(this, _SettingXlsx_largeInputSize, "f");
    }
    ///
    get containsTextSmallInput() {
        return __classPrivateFieldGet(this, _SettingXlsx_containsTextSmallInput, "f");
    }
    get containsTextMediumInput() {
        return __classPrivateFieldGet(this, _SettingXlsx_containsTextMediumInput, "f");
    }
    get containsTextLargeInput() {
        return __classPrivateFieldGet(this, _SettingXlsx_containsTextLargeInput, "f");
    }
    config(options) {
        var _a, _b, _c, _d, _e, _f;
        __classPrivateFieldSet(this, _SettingXlsx_smallInputSize, (_a = options.smallInputSize) !== null && _a !== void 0 ? _a : 20, "f");
        __classPrivateFieldSet(this, _SettingXlsx_mediumInputSize, (_b = options.mediumInputSize) !== null && _b !== void 0 ? _b : 30, "f");
        __classPrivateFieldSet(this, _SettingXlsx_largeInputSize, (_c = options.largeInputSize) !== null && _c !== void 0 ? _c : 30, "f");
        __classPrivateFieldSet(this, _SettingXlsx_containsTextSmallInput, (_d = options === null || options === void 0 ? void 0 : options.containsTextSmallInput) !== null && _d !== void 0 ? _d : [], "f");
        __classPrivateFieldSet(this, _SettingXlsx_containsTextMediumInput, (_e = options === null || options === void 0 ? void 0 : options.containsTextMediumInput) !== null && _e !== void 0 ? _e : [], "f");
        __classPrivateFieldSet(this, _SettingXlsx_containsTextLargeInput, (_f = options === null || options === void 0 ? void 0 : options.containsTextLargeInput) !== null && _f !== void 0 ? _f : [], "f");
    }
}
exports.SettingXlsx = SettingXlsx;
_SettingXlsx_smallInputSize = new WeakMap(), _SettingXlsx_mediumInputSize = new WeakMap(), _SettingXlsx_largeInputSize = new WeakMap(), _SettingXlsx_containsTextSmallInput = new WeakMap(), _SettingXlsx_containsTextMediumInput = new WeakMap(), _SettingXlsx_containsTextLargeInput = new WeakMap();
class Xlsx extends office_1.default {
    constructor(url, setting) {
        super(url, {});
        _Xlsx_setting.set(this, void 0);
        __classPrivateFieldSet(this, _Xlsx_setting, setting, "f");
    }
    convertXlsx2Html(container) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.url;
            try {
                // Fetch tệp Excel từ URL
                const response = yield fetch(url);
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);
                // Đọc dữ liệu nhị phân
                const arrayBuffer = yield response.arrayBuffer();
                // Phân tích dữ liệu Excel bằng SheetJS
                const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: 'array' });
                // Lấy sheet đầu tiên
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                console.log('cols', firstSheet['!cols']);
                console.log('rows', firstSheet['!cols']);
                // Chuyển đổi sheet thành HTML
                let html = xlsx.utils.sheet_to_html(firstSheet);
                console.log('html', html);
                const textReplaces = html.match(/>{{\s*[\w.]+\s*}}</g);
                console.log('textReplaces', textReplaces);
                for (let text of textReplaces) {
                    let width = '10px';
                    const key = text.replace('>{{', '').replace('}}<', '');
                    this.initKeyWhenNoValue(key);
                    if (__classPrivateFieldGet(this, _Xlsx_setting, "f").containsTextSmallInput.some(txt => text.includes(txt))) {
                        width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").smallInputSize}px`;
                    }
                    else if (__classPrivateFieldGet(this, _Xlsx_setting, "f").containsTextMediumInput.some(txt => text.includes(txt))) {
                        width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").mediumInputSize}px`;
                    }
                    else if (__classPrivateFieldGet(this, _Xlsx_setting, "f").containsTextLargeInput.some(txt => text.includes(txt))) {
                        width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").largeInputSize}px`;
                    }
                    else {
                        width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").mediumInputSize}px`;
                    }
                    const idElement = this.generateIdElement(key);
                    const component = `> <input id=${idElement} type='text' style='width: ${width}'/><`;
                    html = html.replace(text, component);
                }
                // Hiển thị HTML
                container.innerHTML = html;
            }
            catch (error) {
                console.error('Error fetching or processing the file:', error);
                container.innerHTML = `<p style="color:red;">Error: ${JSON.stringify(error)}</p>`;
            }
        });
    }
}
_Xlsx_setting = new WeakMap();
exports.default = Xlsx;
