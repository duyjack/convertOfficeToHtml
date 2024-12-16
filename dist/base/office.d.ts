export default class BaseOffice<T> {
    #private;
    constructor(url: string, params: T);
    protected get url(): string;
    protected initKeyWhenNoValue(key: string): void;
    resetParams(): void;
    generateIdElement(key: string): string;
    getParams(): T;
    updateParams(key: string, value: any): void;
    onChangeValueInput(callback: (key: string, value: any) => void): void;
}
