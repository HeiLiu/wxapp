// pages/posts/posts-detail/posts-detail.js
// 引入外部js的两种方式
// var postData = require('../../../data/posts-data');
import postData from '../../../data/posts-data';
// console.log(postData);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id;
    // console.log(postid);
    // this.setData({
    //   postData : postData
    // });
    this.data.postData = postData;
    console.log(postData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})