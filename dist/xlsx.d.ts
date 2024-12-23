import BaseOffice, { BaseSetting } from './base/office';
export declare class SettingXlsx extends BaseSetting {
}
export default class Xlsx<T> extends BaseOffice<T> {
    #private;
    constructor(url: string, setting: SettingXlsx);
    loadToHtml(container: HTMLElement): Promise<void>;
    saveFileWithParams(fileName: string): Promise<void>;
}
