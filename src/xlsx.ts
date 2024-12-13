import * as xlsx from 'xlsx';

export default class Xlsx {
    #url: string;
    #params: any; // key: value of doc
    // #setting: SettingDoc;

    constructor(
        url: string, 
        // setting: SettingDoc,
    ) {
        this.#url = url;
        this.#params = {};
        // this.#setting = setting;
    }

    async convertXlsx2Html(container: HTMLElement) {
        const url = this.#url;
        try {
            // Fetch tệp Excel từ URL
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            // Đọc dữ liệu nhị phân
            const arrayBuffer = await response.arrayBuffer();

            // Phân tích dữ liệu Excel bằng SheetJS
            const workbook = xlsx.read(new Uint8Array(arrayBuffer), { type: 'array' });

            // Lấy sheet đầu tiên
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

            // Chuyển đổi sheet thành HTML
            const html = xlsx.utils.sheet_to_html(firstSheet);

            // Hiển thị HTML
            container.innerHTML = html;
        } catch (error) {
            console.error('Error fetching or processing the file:', error);
            container.innerHTML = `<p style="color:red;">Error: ${JSON.stringify(error)}</p>`;
        }
    }

}