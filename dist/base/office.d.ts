export interface Delimiters {
    start: string;
    end: string;
}
export declare class BaseSetting {
    #private;
    get delimiters(): Delimiters;
    get smallInputSize(): number;
    get mediumInputSize(): number;
    get largeInputSize(): number;
    get containsSmallTextInput(): string[];
    get containsMediumTextInput(): string[];
    get containsLargeTextInput(): string[];
    get styleSmallTextInput(): string | undefined;
    get styleMediumTextInput(): string | undefined;
    get styleLargeTextInput(): string | undefined;
    constructor(delimiters: Delimiters);
    config(options: {
        smallInputSize?: number;
        mediumInputSize?: number;
        largeInputSize?: number;
        containsTextSmallInput?: string[];
        containsTextMediumInput?: string[];
        containsTextLargeInput?: string[];
        styleSmallTextInput?: any;
        styleMediumTextInput?: any;
        styleLargeTextInput?: any;
    }): void;
}
export default class BaseOffice<T> {
    #private;
    callbackOnInput?: (key: string, value: any) => void;
    constructor(url: string, params: T);
    protected get url(): string;
    protected initKeyWhenNoValue(key: string, isArray?: boolean, position?: number): void;
    loadToHtml(container: HTMLElement): Promise<void>;
    resetParams(): void;
    protected generateIdElement(key: string, position?: number): string;
    getParams(): T;
    updateParams(key: string, value: any, position?: number): void;
    onChangeValueInput(callback?: (key: string, value: any) => void): void;
    protected listenInputChangeValue(): void;
    saveFileWithParams(fileName: string): Promise<void>;
    protected getValueFromKey(key: string, options?: {
        position: number;
    }): any;
}
