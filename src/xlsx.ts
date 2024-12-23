import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import BaseOffice, { BaseSetting } from './base/office';

export class SettingXlsx extends BaseSetting {

}

export default class Xlsx<T> extends BaseOffice<T> {

    #setting: SettingXlsx;

    constructor(
        url: string,
        setting: SettingXlsx,
    ) {
        super(url, {} as any)
        this.#setting = setting;
    }


    async loadToHtml(container: HTMLElement): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const url = this.url;
            try {
                // Fetch tệp Excel từ URL
                const response = await fetch(url);
                if (!response.ok) {
                    reject(new Error(`HTTP error! Status: ${response.status}`));
                    return;
                }

                // Đọc dữ liệu nhị phân
                const arrayBuffer = await response.arrayBuffer();

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
                for (let text of textReplaces as Array<string>) {
                    let width = '10px';
                    let componentName = 'input';
                    let style: string | undefined;
                    const key = text.replace('>{{', '').replace('}}<', '');
                    this.initKeyWhenNoValue(key);
                    if (this.#setting.containsSmallTextInput.some(txt => text.includes(txt))) {
                        width = `${this.#setting.smallInputSize}px`;
                        style = this.#setting.styleSmallTextInput;
                    } else if (this.#setting.containsMediumTextInput.some(txt => text.includes(txt))) {
                        width = `${this.#setting.mediumInputSize}px`;
                        style = this.#setting.styleMediumTextInput;
                    } else if (this.#setting.containsLargeTextInput.some(txt => text.includes(txt))) {
                        width = `${this.#setting.largeInputSize}px`;
                        style = this.#setting.styleLargeTextInput;
                        componentName = 'textarea';
                    } else {
                        width = `${this.#setting.mediumInputSize}px`;
                    }
                    const idElement = this.generateIdElement(key);
                    const styleComponent = style ? style + `,width: ${width}` : `width: ${width}`;
                    const component = `> <${componentName} id=${idElement} type='text' style='${styleComponent}'></${componentName}><`;
                    html = html.replace(text, component);
                }

                // Hiển thị HTML
                container.innerHTML = html;
                resolve();
            } catch (error) {
                console.error('Error fetching or processing the file:', error);
                container.innerHTML = `<p style="color:red;">Error: ${JSON.stringify(error)}</p>`;
                reject(error);
            }
        });
    }

    saveFileWithParams(fileName: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const url = this.url;
            const response = await fetch(url);
            if (!response.ok) {
                reject(`HTTP error! Status: ${response.status}`);
                return;
            }
            let arrayBuffer: ArrayBuffer;
            try {
                // Đọc dữ liệu nhị phân
                arrayBuffer = await response.arrayBuffer();
            } catch (err) {
                reject(err);
                return;
            }

            // Phân tích dữ liệu Excel bằng SheetJS
            const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
            Object.keys(this.getParams() as any).forEach((key) => {
                const value = (this.getParams() as any)[key];
                const placeholder = `${this.#setting.delimiters.start}${key}${this.#setting.delimiters.end}`;
                // Chuyển đổi sheet sang JSON để xử lý
                // Thay thế placeholder trong bảng
                for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
                    for (let colIndex = 0; colIndex < (data as any[])[rowIndex].length; colIndex++) {
                        if (typeof (data as any[])[rowIndex][colIndex] === "string" && (data as any[])[rowIndex][colIndex].includes(placeholder)) {
                            (data as any[])[rowIndex][colIndex] = (data as any[])[rowIndex][colIndex].replace(placeholder, value);
                        }
                    }
                }
            })

            // Chuyển dữ liệu đã xử lý ngược lại thành worksheet
            const newWorksheet = xlsx.utils.aoa_to_sheet(data as [][]);

            // Ghi worksheet vào workbook mới
            const newWorkbook = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, sheetName);

            // Xuất file Excel mới
            const wbout = xlsx.write(newWorkbook, { bookType: "xlsx", type: "array" });
            const blob = new Blob([wbout], { type: "application/octet-stream" });
            saveAs(blob, `${fileName}.xlsx`); // Sử dụng FileSaver.js để lưu file
            resolve();
        });
    }
}