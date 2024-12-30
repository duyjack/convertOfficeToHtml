import * as xlsx from 'xlsx';
import { saveAs } from 'file-saver';
import BaseOffice, { BaseSetting } from './base/office';

export class SettingXlsx extends BaseSetting {

}

export default class Xlsx<T> extends BaseOffice<T> {

    #setting: SettingXlsx;
    jsonData?: unknown[];
    numberRowsExtra: number = 0;

    constructor(
        url: string,
        options: { params?: any, setting: SettingXlsx }
    ) {
        super(url, (options.params ?? {}) as any)
        this.#setting = options.setting;
        Object.keys(this.getParams() as any).forEach(key => {
            const length = (this.getParams() as any)[key].length;
            if (length > 0 && this.numberRowsExtra < length - 1) {
                this.numberRowsExtra = length - 1;
            }
        });
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
                // console.log('rows', firstSheet['!rows']);

                this.jsonData = xlsx.utils.sheet_to_json(firstSheet, { header: 1 });
                this.renderTable(container, this.jsonData);
                resolve();
            } catch (error) {
                console.error('Error fetching or processing the file:', error);
                container.innerHTML = `<p style="color:red;">Error: ${JSON.stringify(error)}</p>`;
                reject(error);
            }
        });
    }

    addNewRow(container: HTMLElement) {
        this.numberRowsExtra++;
        const observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList' || (mutation.type as string) === 'subtree') {
                    console.log('Render completed or updated');
                    if (this.callbackOnInput) {
                        this.listenInputChangeValue();
                    }
                    observer.disconnect();
                    // Lắng nghe sau khi render xong
                }
            }
        });
        observer.observe(container, { childList: true, subtree: true });
        this.renderTable(container, this.jsonData);
    }

    removeRow(container: HTMLElement) {
        if (this.numberRowsExtra > 0) {
            this.numberRowsExtra--;
            this.renderTable(container, this.jsonData);
            // console.log('params 1', JSON.stringify(this.getParams()));
            Object.keys(this.getParams() as any).forEach(key => {
                const position = ((this.getParams() as any)[key] as []).length - 1;
                // console.log(`remove key ${key} - position ${position}`);
                this.removeDataFromKey(key, position);
            });
            // console.log('params 2', JSON.stringify(this.getParams()));
        }
    }

    private renderTable(container: HTMLElement, data: any) {
        let tableHTML = '<table>';
        let positionsWithInputs = []; // Lưu vị trí cột của các ô chứa `{{ }}`
        let keyForPostions: Map<number, string> = new Map<number, string>();
        let lastRow: number = 0;
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
                if (typeof cell === 'string' && cell.includes(this.#setting.delimiters.start) && cell.includes(this.#setting.delimiters.end)) {
                    const key = String(cell).replace('{{', '').replace('}}', '');
                    this.initKeyWhenNoValue(key, true, 0);
                    const idElement = this.generateIdElement(key, 0);
                    positionsWithInputs.push(j); // Lưu vị trí cột
                    keyForPostions.set(j, key);
                    const value = this.getDataFromKey(key!, 0);
                    tableHTML += `<td><input id=${idElement} type="text" value='${value}'></td>`;
                    // tableHTML += `<td><input type="text" class="input-cell" placeholder="Nhập giá trị đầu tiên..."></td>`;
                } else {
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
                    const idElement = this.generateIdElement(key!, (this.getParams() as any)[key!].length);
                    this.initKeyWhenNoValue(key!, true, i + 1);
                    const value = this.getDataFromKey(key!, i + 1);
                    tableHTML += `<td><input id=${idElement} type="text" value='${value}'></td>`;
                } else {
                    tableHTML += '<td></td>';
                }
            }
            tableHTML += '</tr>';
        }

        tableHTML += '</table>';
        const finalHTML = tableHTML.replace('colspan="n"', `colspan="${maxCol}"`);
        container.innerHTML = finalHTML;
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
            const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
            let maxCol = 1;
            let positionsWithInputs = []; // Lưu vị trí cột của các ô chứa `{{ }}`
            let keyForPostions: Map<number, string> = new Map<number, string>();
            let lastRow: number = 0;
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
                    if (typeof cell === 'string' && cell.includes(this.#setting.delimiters.start) && cell.includes(this.#setting.delimiters.end)) {
                        const key = String(cell).replace('{{', '').replace('}}', '');
                        positionsWithInputs.push(j); // Lưu vị trí cột
                        keyForPostions.set(j, key);
                        const value = this.getDataFromKey(key!, 0) as string;
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
                        const value = this.getDataFromKey(key!, i + 1);
                        data[row][j] = value;
                    }
                }
            }
            // console.log('data 3', data);

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

    private getDataFromKey(key: string, position: number): any {
        return (this.getParams() as any)[key][position];
    }

    private removeDataFromKey(key: string, position: number) {
        delete (this.getParams() as any)[key][position];
    }
}