export default interface BaseOffice {
    generateIdElement(key: string): string;
    getParams(): any;
    updateParams(key: string, value: any): void;
    onChangeValueInput(callback: (key: string, value: any) => void): void;
}