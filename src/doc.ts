import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import expressionParser from 'docxtemplater/expressions';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';
import BaseOffice, { BaseSetting } from './base/office';
import { PrefixId } from './enum';

export class SettingDoc extends BaseSetting {
    
}

function loadFile(url: string, callback: (err: Error, content: string) => void) {
    PizZipUtils.getBinaryContent(url, callback);
}

export default class OfficeDoc<T> extends BaseOffice<T> {

    #setting: SettingDoc;

    constructor(url: string, setting: SettingDoc) {
        super(url, {} as any);
        this.#setting = setting;
    }

    async loadToHtml(container: HTMLElement) {
        // const url = 'https://gomeetv3.vnptit.vn/storage/test/TT18_3.docx';
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
                const textReplaces = html.match(/{{\s*[\w.]+\s*}}/g);
                console.log('textReplaces', textReplaces);
                for (let text of textReplaces as Array<string>) {
                    let width = '10px';
                    let style: string | undefined;
                    const key = `${text}`;
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
                    } else {
                        width = `${this.#setting.mediumInputSize}px`;
                    }
                    const styleComponent = style ? style + `,width: ${width}` : `width: ${width}`;
                    const idElement = this.generateIdElement(key);
                    const component = ` <input id=${idElement} type='text' style=${styleComponent}/>`;
                    html = html.replace(text, component);
                }
                // console.log('html', html);
                pdfContainer!.innerHTML = html;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    generateDocument(fileName: string) {
        loadFile(
            this.url,
            async (error, content) => {
                if (error) {
                    throw error;
                }
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                    parser: expressionParser,
                    delimiters: {
                        start: '{{',
                        end: '}}'
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
            }
        );
    }
}
