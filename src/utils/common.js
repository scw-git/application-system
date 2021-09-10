function getFullYear() {
    let year = new Date().getFullYear()
    let yearArr = []
    for (let i = 2019; i < year; i++) {
        yearArr.push(i + ' 年')
    }
    return yearArr

}
export { getFullYear }