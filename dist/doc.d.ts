export declare class SettingDoc {
    #private;
    get smallInputSize(): number;
    get mediumInputSize(): number;
    get largeInputSize(): number;
    get containsTextSmallInput(): string[];
    get containsTextMediumInput(): string[];
    get containsTextLargeInput(): string[];
    config(options: {
        smallInputSize?: number;
        mediumInputSize?: number;
        largeInputSize?: number;
        containsTextSmallInput?: string[];
        containsTextMediumInput?: string[];
        containsTextLargeInput?: string[];
    }): void;
}
export default class OfficeDoc<T> {
    #private;
    constructor(url: string, setting: SettingDoc);
    loadToHtml(): Promise<void>;
    generateDocument(fileName: string): void;
    getResult(): T;
}
