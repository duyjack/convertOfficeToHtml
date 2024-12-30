import BaseOffice, { BaseSetting } from './base/office';
export declare class SettingXlsx extends BaseSetting {
}
export default class Xlsx<T> extends BaseOffice<T> {
    #private;
    jsonData?: unknown[];
    numberRowsExtra: number;
    constructor(url: string, options: {
        params?: any;
        setting: SettingXlsx;
    });
    loadToHtml(container: HTMLElement): Promise<void>;
    addNewRow(container: HTMLElement): void;
    removeRow(container: HTMLElement): void;
    private renderTable;
    saveFileWithParams(fileName: string): Promise<void>;
    private getDataFromKey;
    private removeDataFromKey;
}
