import { PrefixId } from "../enum";

export interface Delimiters {
    start: string;
    end: string;
}
export class BaseSetting {
    #delimiters: Delimiters;

    #smallInputSize: number = 20;
    #mediumInputSize: number = 30;
    #largeInputSize: number = 75;

    #containsSmallTextInput: string[] = [];
    #containsMediumTextInput: string[] = [];
    #containsLargeTextInput: string[] = [];

    #styleSmallTextInput?: string;
    #styleMediumTextInput?: string;
    #styleLargeTextInput?: string;

    get delimiters(): Delimiters {
        return this.#delimiters;
    }

    get smallInputSize(): number {
        return this.#smallInputSize;
    }

    get mediumInputSize(): number {
        return this.#mediumInputSize;
    }

    get largeInputSize(): number {
        return this.#largeInputSize;
    }

    /// contains text
    get containsSmallTextInput(): string[] {
        return this.#containsSmallTextInput;
    }

    get containsMediumTextInput(): string[] {
        return this.#containsMediumTextInput;
    }

    get containsLargeTextInput(): string[] {
        return this.#containsLargeTextInput;
    }

    /// style
    get styleSmallTextInput(): string | undefined {
        return this.#styleSmallTextInput;
    }

    get styleMediumTextInput(): string | undefined {
        return this.#styleMediumTextInput;
    }

    get styleLargeTextInput(): string | undefined {
        return this.#styleLargeTextInput;
    }

    constructor(delimiters: Delimiters){
        this.#delimiters = delimiters;
    }

    config(options: {
        smallInputSize?: number,
        mediumInputSize?: number,
        largeInputSize?: number,

        containsTextSmallInput?: string[],
        containsTextMediumInput?: string[],
        containsTextLargeInput?: string[],

        styleSmallTextInput?: any,
        styleMediumTextInput?: any,
        styleLargeTextInput?: any,
    }) {
        this.#smallInputSize = options.smallInputSize ?? 20;
        this.#mediumInputSize = options.mediumInputSize ?? 30;
        this.#largeInputSize = options.largeInputSize ?? 30;

        this.#containsSmallTextInput = options?.containsTextSmallInput ?? [];
        this.#containsMediumTextInput = options?.containsTextMediumInput ?? [];
        this.#containsLargeTextInput = options?.containsTextLargeInput ?? [];

        this.#styleSmallTextInput = options?.styleSmallTextInput;
        this.#styleMediumTextInput = options?.styleMediumTextInput;
        this.#styleLargeTextInput = options?.styleLargeTextInput;
    }
}

export default class BaseOffice<T> {

    #url: string;
    #params: any; // key: value of doc

    constructor(url: string, params: T) {
        this.#url = url;
        this.#params = params;
    }

    protected get url(): string {
        return this.#url;
    }

    protected initKeyWhenNoValue(key: string) {
        if (!this.#params[`${key}`]) {
            this.#params[`${key}`] = '';
        }
    }

    loadToHtml(container: HTMLElement): Promise<void> {
        throw new Error ('no implement');
    }

    resetParams() {
        this.#params = {};
    }

    protected generateIdElement(key: string) {
        return `${PrefixId.input}_${key}`;
    }

    getParams() {
        return this.#params as T;
    }

    updateParams(key: string, value: any): void {
        this.#params[key] = value;
        const elementId = this.generateIdElement(key);
        const element = document.getElementById(elementId) as HTMLInputElement | undefined;
        if (element) {
            element!.value = value;
        }
    }

    onChangeValueInput(callback?: (key: string, value: any) => void): void {
        Object.keys(this.#params).forEach(key => {
            const idElement = this.generateIdElement(key);
            const element = document.getElementById(idElement) as HTMLInputElement | HTMLTextAreaElement;
            element?.addEventListener('input', (e) => {
                const value = (e.target as HTMLInputElement).value;
                if (callback) {
                    callback(key, value);
                }
                this.updateParams(key, value);
            });
        })
    }

    saveFileWithParams(fileName: string): Promise<void> {
        throw new Error ('no implement');
    }

}