// pages/posts/post.js
const postData = require('../../data/posts-data');
console.log(postData);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    posts_content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 为页面跳转所带来的参数
   
    this.setData({
      posts_content: postData.postList
    });

  }
})