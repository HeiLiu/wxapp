# 一、项目架构   
 ## 项目静态文件
    - assets/  
            iocns/  
            images/  
            *.js  
            *.json 
          
 - 模块文件夹  
    模块文件 开发功能分模块开发 多人协作  
    提升项目的可维护、管理  
    - modules/    

小程序的本质是`web H5`开发，但是依赖于微信的高性能界面组件（`view..`） `wx.api `来自微信的原生体验。   
让快速跨平台开发，又得到性能上的保证。  

webview ios，android显示html5页面的容器  

### es6 模块化语法  
  - 一个模块最后的输出

        export default ModuleName    
  - 引入一个模块  
  
        import ModuleName from ModulePath

### Css文件引入

    @import 'filePath';

### 页面间的跳转   
- wx.navigateTo(OBJECT)   
    需要跳转的应用内非` tabBar `的页面的路径，路径后可以带参数。参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔；如 'path?key=value&key2=value2'  
 代码示例：  
    ```js
    readMore(e) {
    const id = e.target.dataset.id;
    wx.navigateTo({
      url:`/pages/vehicles/show?id=${id}`
    })
  }
    ```  
    ```js  
    show.js
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      /*options 监听页面加载时候传入的参数*/
    const id = options.id;
    console.log(id);
  }
    ```  
### wx:for wx:key  
循环输出模板，为了性能问题，我们要添加wx:key用一个唯一的key来标识一行
```html
    <swiper class="section hero white" indicator-dots="{{true}}"></swiper>
```   

因为在等下如果`slides`里面有值变化的时候，并不是重新生成整个循环的html，而是可以 ** 根据变化相应的`key`的`item`进行替换 **，从而提高了性能和效率。因为`for`在页面上非常多、因此这种做法很重要。