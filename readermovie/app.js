//app.js
// 应用启动执行onLaunch 生命周期从App->page
// 负责全局的，应用级别的一些行为，可以添加全局的数据
App({
  onLaunch:function(){
    // Object.assign(this.globalData,db);
    // 微信封装的ajax
    // wx.request({
    //   url:'https://easy-mock.com/mock/5af9814aa4aadf5d95c7f819/',
    //   success:(response) =>{
    //     // console.log(response);
    //     // 给对象赋值
    //     Object.assign(this.globalData,response.data);
    //     console.log(this.globalData);
    //   },
    //   fail:(error)=>{
    //     console.log(error);
    //   }
    // })
  },
  globalData:{}
})