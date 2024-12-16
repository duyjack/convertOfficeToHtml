import BaseOffice from './base/office';
export declare class SettingXlsx {
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
export default class Xlsx<T> extends BaseOffice<T> {
    #private;
    constructor(url: string, setting: SettingXlsx);
    convertXlsx2Html(container: HTMLElement): Promise<void>;
}
