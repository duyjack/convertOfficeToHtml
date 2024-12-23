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
var _Xlsx_setting;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingXlsx = void 0;
const xlsx = __importStar(require("xlsx"));
const file_saver_1 = require("file-saver");
const office_1 = __importStar(require("./base/office"));
class SettingXlsx extends office_1.BaseSetting {
}
exports.SettingXlsx = SettingXlsx;
class Xlsx extends office_1.default {
    constructor(url, setting) {
        super(url, {});
        _Xlsx_setting.set(this, void 0);
        __classPrivateFieldSet(this, _Xlsx_setting, setting, "f");
    }
    loadToHtml(container) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const url = this.url;
                try {
                    // Fetch tệp Excel từ URL
                    const response = yield fetch(url);
                    if (!response.ok) {
                        reject(new Error(`HTTP error! Status: ${response.status}`));
                        return;
                    }
                    // Đọc dữ liệu nhị phân
                    const arrayBuffer = yield response.arrayBuffer();
                    // Phân tích dữ liệu Excel bằng SheetJS
                    const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: 'array' });
                    // Lấy sheet đầu tiên
                    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                    // console.log('cols', firstSheet['!cols']);
                    // console.log('rows', firstSheet['!cols']);
                    // Chuyển đổi sheet thành HTML
                    let html = xlsx.utils.sheet_to_html(firstSheet);
                    // console.log('html', html);
                    const textReplaces = html.match(/>{{\s*[\w.]+\s*}}</g);
                    // console.log('textReplaces', textReplaces);
                    for (let text of textReplaces) {
                        let width = '10px';
                        let componentName = 'input';
                        let style;
                        const key = text.replace('>{{', '').replace('}}<', '');
                        this.initKeyWhenNoValue(key);
                        if (__classPrivateFieldGet(this, _Xlsx_setting, "f").containsSmallTextInput.some(txt => text.includes(txt))) {
                            width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").smallInputSize}px`;
                            style = __classPrivateFieldGet(this, _Xlsx_setting, "f").styleSmallTextInput;
                        }
                        else if (__classPrivateFieldGet(this, _Xlsx_setting, "f").containsMediumTextInput.some(txt => text.includes(txt))) {
                            width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").mediumInputSize}px`;
                            style = __classPrivateFieldGet(this, _Xlsx_setting, "f").styleMediumTextInput;
                        }
                        else if (__classPrivateFieldGet(this, _Xlsx_setting, "f").containsLargeTextInput.some(txt => text.includes(txt))) {
                            width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").largeInputSize}px`;
                            style = __classPrivateFieldGet(this, _Xlsx_setting, "f").styleLargeTextInput;
                            componentName = 'textarea';
                        }
                        else {
                            width = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").mediumInputSize}px`;
                        }
                        const idElement = this.generateIdElement(key);
                        const styleComponent = style ? style + `,width: ${width}` : `width: ${width}`;
                        const component = `> <${componentName} id=${idElement} type='text' style='${styleComponent}'></${componentName}><`;
                        html = html.replace(text, component);
                    }
                    // Hiển thị HTML
                    container.innerHTML = html;
                    resolve();
                }
                catch (error) {
                    console.error('Error fetching or processing the file:', error);
                    container.innerHTML = `<p style="color:red;">Error: ${JSON.stringify(error)}</p>`;
                    reject(error);
                }
            }));
        });
    }
    saveFileWithParams(fileName) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const url = this.url;
            const response = yield fetch(url);
            if (!response.ok) {
                reject(`HTTP error! Status: ${response.status}`);
                return;
            }
            let arrayBuffer;
            try {
                // Đọc dữ liệu nhị phân
                arrayBuffer = yield response.arrayBuffer();
            }
            catch (err) {
                reject(err);
                return;
            }
            // Phân tích dữ liệu Excel bằng SheetJS
            const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
            Object.keys(this.getParams()).forEach((key) => {
                const value = this.getParams()[key];
                const placeholder = `${__classPrivateFieldGet(this, _Xlsx_setting, "f").delimiters.start}${key}${__classPrivateFieldGet(this, _Xlsx_setting, "f").delimiters.end}`;
                // Chuyển đổi sheet sang JSON để xử lý
                // Thay thế placeholder trong bảng
                for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                    for (let colIndex = 0; colIndex < data[rowIndex].length; colIndex++) {
                        if (typeof data[rowIndex][colIndex] === "string" && data[rowIndex][colIndex].includes(placeholder)) {
                            data[rowIndex][colIndex] = data[rowIndex][colIndex].replace(placeholder, value);
                        }
                    }
                }
            });
            // Chuyển dữ liệu đã xử lý ngược lại thành worksheet
            const newWorksheet = xlsx.utils.aoa_to_sheet(data);
            // Ghi worksheet vào workbook mới
            const newWorkbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);
            // Xuất file Excel mới
            const wbout = xlsx.write(newWorkbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([wbout], { type: "application/octet-stream" });
            (0, file_saver_1.saveAs)(blob, `${fileName}.xlsx`); // Sử dụng FileSaver.js để lưu file
            resolve();
        }));
    }
}
_Xlsx_setting = new WeakMap();
exports.default = Xlsx;
