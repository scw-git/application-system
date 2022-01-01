/**
 * @description 下载blob二进制表格文件
 * @param {String} data 二进制文件流
 * @param {String} fileName 含后缀文件名
 * @param {String} suffix 文件后缀 默认xls类型
 */
function downloadFile(data, fileName, type) {
    let blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=UTF-8' });
    type = type ? type : '.xls';
    fileName = fileName ? fileName + type : new Date().getTime() + type;
    if (typeof window.chrome !== 'undefined') {
        // Chrome version
        let link = document.createElement('a');
        let URL = window.URL || window.webkitURL;
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE version
        blob = new Blob([data], { type: 'application/force-download' });
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        // Firefox version
        let file = new File([data], fileName, { type: 'application/force-download' });
        window.open(URL.createObjectURL(file));
    }
}
export { downloadFile }