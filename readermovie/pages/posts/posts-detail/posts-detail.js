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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id;
    this.data.currentPostId = postid;
    // 如果在onload方法中，不是异步的去执行一个数据绑定，则不需要使用this.setData方法
    // 只需要对this.data赋值
    // this.data.postData = postData.postList[postid];
    
    this.setData({
      postData:postData.postList[postid]
    });
    // console.log(this.data.postData);
    // let postCollected = {
    //   1:true,
    //   2:false,
    //   3:true
    // }
    // 在onload的时候读取文章的收藏状态 即初始化收藏图片状态
    var postsCollected = wx.getStorageSync('posts_collected')
    // wx.setStorageSync();
    if (postsCollected) {
      var postCollected = postsCollected[postid]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postid] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  // 收藏按钮 每次点击都是进行状态的切换 做取反操作
  onCollectionTap(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // // 收藏状态切换
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // 更新了文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected); 
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title:postCollected?"收藏成功":"取消成功",
      icon:"success",
      duration:1000
    });
  }
})