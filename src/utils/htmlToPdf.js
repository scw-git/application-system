import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
function getPdf(id, name) {
    // var title = this.htmlTitle
    var title = name || '个人信息表格'
    html2Canvas(document.querySelector(id), {
        allowTaint: false, //要设置成false或者不写。允许污染 'HTMLCanvasElement': Tainted canvases may not be exported.
        useCORS: true //允许跨域
    }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
            while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                    PDF.addPage()
                }
            }
        }
        PDF.save(title + '.pdf')
    }
    )

}
export { getPdf }