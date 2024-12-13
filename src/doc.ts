import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import expressionParser from 'docxtemplater/expressions';
import mammoth from 'mammoth';
import { saveAs } from 'file-saver';
import BaseOffice from './base/office';
import { PrefixId } from './enum';

export class SettingDoc {
    #smallInputSize: number = 20;
    #mediumInputSize: number = 30;
    #largeInputSize: number = 75;

    #containsTextSmallInput: string[] = [];
    #containsTextMediumInput: string[] = [];
    #containsTextLargeInput: string[] = [];

    get smallInputSize(): number {
        return this.#smallInputSize;
    }

    get mediumInputSize(): number {
        return this.#mediumInputSize;
    }

    get largeInputSize(): number {
        return this.#largeInputSize;
    }


    ///
    get containsTextSmallInput(): string[] {
        return this.#containsTextSmallInput;
    }

    get containsTextMediumInput(): string[] {
        return this.#containsTextMediumInput;
    }

    get containsTextLargeInput(): string[] {
        return this.#containsTextLargeInput;
    }


    config(options: {
        smallInputSize?: number,
        mediumInputSize?: number,
        largeInputSize?: number,

        containsTextSmallInput?: string[],
        containsTextMediumInput?: string[],
        containsTextLargeInput?: string[],
    }) {
        this.#smallInputSize = options.smallInputSize ?? 20;
        this.#mediumInputSize = options.mediumInputSize ?? 30;
        this.#largeInputSize = options.largeInputSize ?? 30;

        this.#containsTextSmallInput = options?.containsTextSmallInput ?? [];
        this.#containsTextMediumInput = options?.containsTextMediumInput ?? [];
        this.#containsTextLargeInput = options?.containsTextLargeInput ?? [];
    }
}

function loadFile(url: string, callback: (err: Error, content: string) => void) {
    PizZipUtils.getBinaryContent(url, callback);
}

export default class OfficeDoc<T> implements BaseOffice {

    #url: string;
    #params: any; // key: value of doc
    #setting: SettingDoc;

    constructor(url: string, setting: SettingDoc) {
        this.#url = url;
        this.#params = {};
        this.#setting = setting;
    }

    async loadToHtml(container: HTMLElement) {
        // const url = 'https://gomeetv3.vnptit.vn/storage/test/TT18_3.docx';
        const url = this.#url;
        let arrayBuffer;
        try {
            const response = await fetch(url);
            arrayBuffer = await response.arrayBuffer();
            this.#params = {};
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
                    const key = `${text}`;
                    this.#params[key] = '';

                    if (this.#setting.containsTextSmallInput.some(txt => text.includes(txt))) {
                        width = `${this.#setting.smallInputSize}px`;
                    } else if (this.#setting.containsTextMediumInput.some(txt => text.includes(txt))) {
                        width = `${this.#setting.mediumInputSize}px`;
                    } else if (this.#setting.containsTextLargeInput.some(txt => text.includes(txt))) {
                        width = `${this.#setting.largeInputSize}px`;
                    } else {
                        width = `${this.#setting.mediumInputSize}px`;
                    }
                    const idElement = this.generateIdElement(key);
                    const component = ` <input id=${idElement} type='text' style='width: ${width}'/>`;
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
            this.#url,
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
                    ...this.#params
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

    generateIdElement(key: string) {
        return `${PrefixId.input}_${key}`;
    }

    getParams() {
        return this.#params as T;
    }

    updateParams(key: string, value: any): void {
        this.#params[key] = value;
    }
}
