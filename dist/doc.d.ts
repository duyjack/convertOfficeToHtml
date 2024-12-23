import BaseOffice, { BaseSetting } from './base/office';
export declare class SettingDoc extends BaseSetting {
}
export default class OfficeDoc<T> extends BaseOffice<T> {
    #private;
    constructor(url: string, setting: SettingDoc);
    loadToHtml(container: HTMLElement): Promise<void>;
    generateDocument(fileName: string): void;
}
