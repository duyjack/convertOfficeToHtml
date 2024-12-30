import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import expressionParser from 'docxtemplater/expressions';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';
import BaseOffice, { BaseSetting } from './base/office';
import { PrefixId } from './enum';
import { generateDynamicRegex } from './utils';

export class SettingDoc extends BaseSetting {
    
}

function loadFile(url: string, callback: (err: Error, content: string) => void) {
    PizZipUtils.getBinaryContent(url, callback);
}

export default class OfficeDoc<T> extends BaseOffice<T> {

    #setting: SettingDoc;

    constructor(url: string, options: { params?: any, setting: SettingDoc }) {
        super(url, (options.params ?? {}) as any);
        this.#setting = options.setting;
    }

    async loadToHtml(container: HTMLElement): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const url = this.url;
            let arrayBuffer;
            try {
                const response = await fetch(url);
                arrayBuffer = await response.arrayBuffer();
                this.resetParams();
            } catch (err) {
                throw err;
            }
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then((result) => {
                    var html = result.value; // The generated HTML
                    const pdfContainer = container;
                    // const textReplaces = html.match(/{{\s*[\w.]+\s*}}/g);
                    const regex = generateDynamicRegex(this.#setting.delimiters.start, this.#setting.delimiters.end);
                    const textReplaces = html.match(regex);
                    // console.log('textReplaces', textReplaces);
                    for (let text of textReplaces as Array<string>) {
                        let width = '10px';
                        let style: string | undefined;
                        let componentName = 'input';
                        const key = `${text.replace('{{', '').replace('}}', '')}`;
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
                        const styleComponent = style ? style + `,width: ${width}` : `width: ${width}`;
                        const idElement = this.generateIdElement(key);
                        const value = (this.getParams() as any)[key];
                        const component = ` <${componentName} id=${idElement} value='${value}' type='text' style='${styleComponent}'></${componentName}>`;
                        html = html.replace(text, component);
                    }
                    // console.log('html', html);
                    pdfContainer!.innerHTML = html;
                    resolve();
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }

    saveFileWithParams(fileName: string): Promise<void> {
        return new Promise((resolve, reject) => {
            loadFile(
                this.url,
                async (error, content) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                        parser: expressionParser,
                        delimiters: {
                            start: this.#setting.delimiters.start,
                            end: this.#setting.delimiters.end,
                        }
                    });
                    doc.render({
                        ...this.getParams() as any
                    });
                    const out = doc.getZip().generate({
                        type: 'blob',
                        mimeType:
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    }); //Output the document using Data-URI
    
                    saveAs(out, `${fileName}.docx`);
                    resolve();
                }
            );
        });
    }
}
