import { PrefixId } from "../enum";

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