//index.js
//获取应用实例
import util from '../../utils/index';
import config from '../../utils/config';
const app = getApp()

Page({
  data: {
    hiddenLoading: false,
    articleList: [],
    hasMore: true,
    page: 1,
    days: 3,
    pageSize: 4
  },
  //事件处理函数
  onLoad(e) {
    this.requestArticle();
   
  },
  requestArticle() {
    util.request({
      url: 'list',
      // web url,mock是否请求本地数据
      mock: true,
      data: {
        tag: '微信热门',
        start: this.data.page || 1,
        days: this.data.days,
        pageSize: this.data.pageSize,
        langs: 'en'
      }
    }).then(res=>{
      console.log(res);
      this.setData({
        hiddenLoading:true,
        articleList:res.data
      })
    })
  },
  onShareAppMessage(){
    let title = config.defaultShareText || '';
    return {
      title,
      path:`/pages/index/index`,
      success:function(res){

      },
      fail:function(res){

      }
    }
  },
  onReachBottom(){
    if(this.data.hasMore){
      let nextPage = this.data.page+1;
      this.setData({
        page:nextPage
      })
      this.requestArticle();
    }
  },
  onPullDownRefresh(){
    this.setData({
      hiddenLoading:false
    })
    this.requestArticle();
  },
  showDetail(e){
    let dataset = e.currentTarget.dataset;
    console.log(e);
    let item = dataset && dataset.item;
    let contentId = item.contentId || 0;
    wx.navigateTo({
      url:`../detail/detail?contentId=${contentId}`
    })
  }
})