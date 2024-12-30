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
    constructor(url, options) {
        var _a;
        super(url, ((_a = options.params) !== null && _a !== void 0 ? _a : {}));
        _Xlsx_setting.set(this, void 0);
        this.numberRowsExtra = 0;
        __classPrivateFieldSet(this, _Xlsx_setting, options.setting, "f");
        Object.keys(this.getParams()).forEach(key => {
            const length = this.getParams()[key].length;
            if (length > 0 && this.numberRowsExtra < length - 1) {
                this.numberRowsExtra = length - 1;
            }
        });
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
                    // console.log('rows', firstSheet['!rows']);
                    this.jsonData = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });
                    this.renderTable(container, this.jsonData);
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
    addNewRow(container) {
        this.numberRowsExtra++;
        this.renderTable(container, this.jsonData);
        if (this.callbackOnInput) {
            this.listenInputChangeValue();
        }
    }
    removeRow(container) {
        if (this.numberRowsExtra > 0) {
            this.numberRowsExtra--;
            this.renderTable(container, this.jsonData);
            // console.log('params 1', JSON.stringify(this.getParams()));
            Object.keys(this.getParams()).forEach(key => {
                const position = this.getParams()[key].length - 1;
                // console.log(`remove key ${key} - position ${position}`);
                this.removeDataFromKey(key, position);
            });
            // console.log('params 2', JSON.stringify(this.getParams()));
        }
    }
    renderTable(container, data) {
        let tableHTML = '<table>';
        let positionsWithInputs = []; // Lưu vị trí cột của các ô chứa `{{ }}`
        let keyForPostions = new Map();
        let lastRow = 0;
        let maxCol = 1;
        // Duyệt qua từng hàng và cột
        for (let i = 0; i < data.length; i++) {
            if (data[i].length < 1) {
                continue;
            }
            tableHTML += '<tr>';
            // console.log('row', i, data[i].length);
            if (maxCol < data[i].length) {
                maxCol = data[i].length;
            }
            for (let j = 0; j < data[i].length; j++) {
                const cell = data[i][j] || '';
                // console.log(`row ${i} - col ${j} - data ${cell} - data[i].length ${data[i].length}`);
                // Nếu ô chứa `{{ }}`, đánh dấu vị trí và thay bằng input đầu tiên
                if (typeof cell === 'string' && cell.includes(__classPrivateFieldGet(this, _Xlsx_setting, "f").delimiters.start) && cell.includes(__classPrivateFieldGet(this, _Xlsx_setting, "f").delimiters.end)) {
                    const key = String(cell).replace('{{', '').replace('}}', '');
                    this.initKeyWhenNoValue(key, true, 0);
                    const idElement = this.generateIdElement(key, 0);
                    positionsWithInputs.push(j); // Lưu vị trí cột
                    keyForPostions.set(j, key);
                    const value = this.getDataFromKey(key, 0);
                    tableHTML += `<td><input id=${idElement} type="text" value='${value}'></td>`;
                    // tableHTML += `<td><input type="text" class="input-cell" placeholder="Nhập giá trị đầu tiên..."></td>`;
                }
                else {
                    tableHTML += `<td colspan="n">${cell}</td>`;
                }
            }
            tableHTML += '</tr>';
            lastRow = i;
        }
        // console.log('positionsWithInputs', positionsWithInputs);
        // console.log('lastRow', lastRow);
        // console.log('data[lastRow].length', data[lastRow].length);
        // Thêm các dòng input khác cho các cột được đánh dấu
        for (let i = 0; i < this.numberRowsExtra; i++) { // Giả sử thêm 5 dòng input cho mỗi cột chứa `{{ }}`
            tableHTML += '<tr>';
            for (let j = 0; j < data[lastRow].length; j++) {
                if (positionsWithInputs.includes(j)) {
                    const key = keyForPostions.get(j);
                    const idElement = this.generateIdElement(key, this.getParams()[key].length);
                    this.initKeyWhenNoValue(key, true, i + 1);
                    const value = this.getDataFromKey(key, i + 1);
                    tableHTML += `<td><input id=${idElement} type="text" value='${value}'></td>`;
                }
                else {
                    tableHTML += '<td></td>';
                }
            }
            tableHTML += '</tr>';
        }
        tableHTML += '</table>';
        const finalHTML = tableHTML.replace('colspan="n"', `colspan="${maxCol}"`);
        container.innerHTML = finalHTML;
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
            let maxCol = 1;
            let positionsWithInputs = []; // Lưu vị trí cột của các ô chứa `{{ }}`
            let keyForPostions = new Map();
            let lastRow = 0;
            // console.log('data 1', data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].length < 1) {
                    continue;
                }
                // console.log('row', i, data[i].length);
                if (maxCol < data[i].length) {
                    maxCol = data[i].length;
                }
                for (let j = 0; j < data[i].length; j++) {
                    let cell = data[i][j] || '';
                    // console.log(`row ${i} - col ${j} - data ${cell} - data[i].length ${data[i].length}`);
                    // Nếu ô chứa `{{ }}`, đánh dấu vị trí và thay bằng input đầu tiên
                    if (typeof cell === 'string' && cell.includes(__classPrivateFieldGet(this, _Xlsx_setting, "f").delimiters.start) && cell.includes(__classPrivateFieldGet(this, _Xlsx_setting, "f").delimiters.end)) {
                        const key = String(cell).replace('{{', '').replace('}}', '');
                        positionsWithInputs.push(j); // Lưu vị trí cột
                        keyForPostions.set(j, key);
                        const value = this.getDataFromKey(key, 0);
                        data[i][j] = value;
                    }
                }
                lastRow = i;
            }
            // console.log('data 2', data);
            for (let i = 0; i < this.numberRowsExtra; i++) { // Giả sử thêm 5 dòng input cho mỗi cột chứa `{{ }}`
                const row = lastRow + 1 + i;
                data[row].length = maxCol;
                for (let j = 0; j < data[row].length; j++) {
                    let cell = data[row][j] || '';
                    if (positionsWithInputs.includes(j)) {
                        const key = keyForPostions.get(j);
                        const value = this.getDataFromKey(key, i + 1);
                        data[row][j] = value;
                    }
                }
            }
            // console.log('data 3', data);
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
    getDataFromKey(key, position) {
        return this.getParams()[key][position];
    }
    removeDataFromKey(key, position) {
        delete this.getParams()[key][position];
    }
}
_Xlsx_setting = new WeakMap();
exports.default = Xlsx;
