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
    constructor(url: string, params: T);
    protected get url(): string;
    protected initKeyWhenNoValue(key: string): void;
    loadToHtml(container: HTMLElement): Promise<void>;
    resetParams(): void;
    protected generateIdElement(key: string): string;
    getParams(): T;
    updateParams(key: string, value: any): void;
    onChangeValueInput(callback?: (key: string, value: any) => void): void;
    saveFileWithParams(fileName: string): Promise<void>;
}
