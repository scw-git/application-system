const path = require('path')
function resolve(dir) {
    // 拼接绝对路径
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '', //空字符串('')，或者相对路径(./)可以部署在任意位置
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,


    devServer: {
        port: 8099, //自定义端口（把8080改成了8099）
        proxy: {
            '/api': {
                target: 'http://192.168.137.1:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。 如果只想显示编译器错误：
        overlay: {
            warnings: false,
            errors: true
        },


    },
    configureWebpack: {
        name: '考试报名系统',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    }
}