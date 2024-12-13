export default class Xlsx {
    #private;
    constructor(url: string);
    convertXlsx2Html(container: HTMLElement): Promise<void>;
}
