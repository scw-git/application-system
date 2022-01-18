import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
function getPdf(id, name) {
    // var title = this.htmlTitle
    var title = name || '个人信息表格'
    html2Canvas(document.querySelector(id), {
        allowTaint: false, //要设置成false或者不写。允许污染 'HTMLCanvasElement': Tainted canvases may not be exported.
        useCORS: true, //允许跨域
        scale: 3,//为放大倍数,越高理论上越清晰
    }).then(function (canvas) {
        // 这段代码去除锯齿，会使图片变得清晰，结合scale放大处理
        var context = canvas.getContext('2d');
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        //获取canvas画布的宽高
        let contentWidth = canvas.width
        let contentHeight = canvas.height

        //一页pdf显示html页面生成的canvas高度
        let pageHeight = contentWidth / 592.28 * 841.89

        //未生成pdf的html页面高度
        let leftHeight = contentHeight

        //页面偏移
        let position = 0

        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
            while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                //避免添加空白页
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