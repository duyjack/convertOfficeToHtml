import * as xlsx from 'xlsx';
import { PrefixId } from './enum';
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

    async convertXlsx2Html(container: HTMLElement) {
        const url = this.url;
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
            console.log('cols', firstSheet['!cols']);
            console.log('rows', firstSheet['!cols']);
            // Chuyển đổi sheet thành HTML
            let html = xlsx.utils.sheet_to_html(firstSheet);
            console.log('html', html);

            const textReplaces = html.match(/>{{\s*[\w.]+\s*}}</g);
            console.log('textReplaces', textReplaces);
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
        } catch (error) {
            console.error('Error fetching or processing the file:', error);
            container.innerHTML = `<p style="color:red;">Error: ${JSON.stringify(error)}</p>`;
        }
    }
}