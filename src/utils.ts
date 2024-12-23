export const generateDynamicRegex = (startDelim: string, endDelim: string): RegExp => {

    // Escape các ký tự đặc biệt để đảm bảo chúng hoạt động trong regex
    const escapedStartDelim = startDelim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedEndDelim = endDelim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Tạo regex động
    const dynamicRegex = new RegExp(`${escapedStartDelim}\\s*[\\w.]+\\s*${escapedEndDelim}`, 'g');
    return dynamicRegex;
}