import { PrefixId } from "../enum";

export class BaseSetting {
    #smallInputSize: number = 20;
    #mediumInputSize: number = 30;
    #largeInputSize: number = 75;

    #containsSmallTextInput: string[] = [];
    #containsMediumTextInput: string[] = [];
    #containsLargeTextInput: string[] = [];

    #styleSmallTextInput: any;
    #styleMediumTextInput: any;
    #styleLargeTextInput: any;

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
    get styleSmallTextInput(): any {
        return this.#styleSmallTextInput;
    }

    get styleMediumTextInput(): any {
        return this.#styleMediumTextInput;
    }

    get styleLargeTextInput(): any {
        return this.#styleLargeTextInput;
    }

    config(options: {
        smallInputSize?: number,
        mediumInputSize?: number,
        largeInputSize?: number,

        containsTextSmallInput?: string[],
        containsTextMediumInput?: string[],
        containsTextLargeInput?: string[],

        styleSmallTextInput: any,
        styleMediumTextInput: any,
        styleLargeTextInput: any,
    }) {
        this.#smallInputSize = options.smallInputSize ?? 20;
        this.#mediumInputSize = options.mediumInputSize ?? 30;
        this.#largeInputSize = options.largeInputSize ?? 30;

        this.#containsSmallTextInput = options?.containsTextSmallInput ?? [];
        this.#containsMediumTextInput = options?.containsTextMediumInput ?? [];
        this.#containsLargeTextInput = options?.containsTextLargeInput ?? [];

        this.#styleSmallTextInput = options?.styleSmallTextInput;
        this.#styleMediumTextInput = options?.styleMediumTextInput,
        this.#styleLargeTextInput = options?.styleLargeTextInput,
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

    resetParams() {
        this.#params = {};
    }

    generateIdElement(key: string) {
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

    onChangeValueInput(callback: (key: string, value: any) => void): void {
        Object.keys(this.#params).forEach(key => {
            const idElement = this.generateIdElement(key);
            const element = document.getElementById(idElement) as HTMLInputElement;
            element?.addEventListener('change', (e) => {
                callback(key, (e.target as HTMLInputElement).value);
            });
        })
    }

}