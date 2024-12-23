"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDynamicRegex = void 0;
const generateDynamicRegex = (startDelim, endDelim) => {
    // Escape các ký tự đặc biệt để đảm bảo chúng hoạt động trong regex
    const escapedStartDelim = startDelim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedEndDelim = endDelim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Tạo regex động
    const dynamicRegex = new RegExp(`${escapedStartDelim}\\s*[\\w.]+\\s*${escapedEndDelim}`, 'g');
    return dynamicRegex;
};
exports.generateDynamicRegex = generateDynamicRegex;
