//index.js
//获取应用实例
const app = getApp()
const musicUrl = app.globalData.musicBasic;
// 引入util模块，require 是COMMONJS规范
// import util from '../../utils/util';
const util = require('../../utils/util');
Page({
  data: {
    musicList: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getList('down');
    // util.$get('http://data.ratp.fr/api/datasets/1.0/search/?q=paris', {})
    //   .then(res => console.log(res))
    // const url = `${musicUrl}/api/channel/music/more`;
    // util.$get(url, {
    //     id: 0
    //   }).then(res =>{
    //     console.log(res);
    //   })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onPullDownRefresh(event) {
    this.getList('down');
  },
  getList(type) {
    // type 开关
    // 下拉刷新，id是关键，加载新的一页时，上一页最后的id 是去服务器请求数据的依据
    type === 'down' ? this.setData({
      id: 0
    }) : null;
    // id ：0 获取最新的一页  
    util.$get(`${musicUrl}/api/channel/music/more`, {
      id: this.data.id
    }).then(res => {
      // console.log(res);
      this.processData(type, res.data.data);
    })
  },
  processData(type, list) {
    if (type === 'up') {
      this.setData({
        // 上拉在原始数据后加
        musicList: [
          ...this.data.musicList,
          ...list
        ],
        id: list[list.length - 1].id
      })
    } else if (type === 'down') {
      this.setData({
        musicList: list
      })
      wx.stopPullDownRefresh();
    }
  },
  onReachBottom() {
    this.getList('up');
  }
})