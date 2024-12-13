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
var _Xlsx_url, _Xlsx_params;
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx = __importStar(require("xlsx"));
class Xlsx {
    // #setting: SettingDoc;
    constructor(url) {
        _Xlsx_url.set(this, void 0);
        _Xlsx_params.set(this, void 0); // key: value of doc
        __classPrivateFieldSet(this, _Xlsx_url, url, "f");
        __classPrivateFieldSet(this, _Xlsx_params, {}, "f");
        // this.#setting = setting;
    }
    convertXlsx2Html(container) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = __classPrivateFieldGet(this, _Xlsx_url, "f");
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
                // Chuyển đổi sheet thành HTML
                const html = xlsx.utils.sheet_to_html(firstSheet);
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
_Xlsx_url = new WeakMap(), _Xlsx_params = new WeakMap();
exports.default = Xlsx;
