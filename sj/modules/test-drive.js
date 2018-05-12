// es6 模块化语法module
// js 变量或常量，的类型由值决定
const testDrive = () =>{
    // 调用来自微信的内置API
    // 原生的API， 大部分的小程序是html5
    //  webView 区分于nativeView android ios
    // wx.
    // 性能上比原生的慢一些
    wx.showToast({
        title:'完成',
        icon:'fail',
        duration:1000
    })
}
export default testDrive