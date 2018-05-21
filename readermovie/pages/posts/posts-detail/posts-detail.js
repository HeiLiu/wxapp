// pages/posts/posts-detail/posts-detail.js
// 引入外部js的两种方式
// var postData = require('../../../data/posts-data');
import postsData from '../../../data/posts-data';
// console.log(postData);
var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  //  * 生命周期函数--监听页面加载
  onLoad: function (options) {

    var postid = options.id;
    this.data.currentPostId = postid;
    // 如果在onload方法中，不是异步的去执行一个数据绑定，则不需要使用this.setData方法
    // 只需要对this.data赋值
    var postData = postsData.postList[postid]
    console.log(postData);
    this.setData({
      postData
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
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicId === postid) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor() {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      // this的绑定改变
      // console.log(this);
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      // app.globalData.g_currentMusicId = postid;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicId = null;
    })
  },
  // 收藏按钮 每次点击都是进行状态的切换 做取反操作
  onCollectionTap(event) {
    this.getPostsColloectedASy();
    // this.getPostsCollectedSyc();
  },
  // 关于收藏的状态的异步的方法 不会阻塞代码 但是容易出错 小程序中尽量少用异步
  getPostsColloectedASy(event) {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function () {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[that.data.currentPostId];
        // // 收藏状态切换
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        // 两种不同的交互反馈，业务逻辑也有不同 用户进行文章的收藏不需要使用modal这么大的东西 而且影响体验 杀鸡焉用牛刀？
        // that.showModal(postsCollected, postCollected);
        that.showToast(postsCollected, postCollected);
      }
    })
  },
  // 同步
  getPostsCollectedSyc(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentPostId];
    // // 收藏状态切换
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },
  onShareTap(event) {
    let itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分线到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel
        });
        console.log(res.tapIndex);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showModal(postsCollected, postCollected) {
    // 通过弹出模态框 等待用户的进一步操作再执行下一步数据的切换
    var that = this;
    wx.showModal({
      title: '提示',
      content: postCollected ? '收藏该文章?' : '取消收藏该文章',
      showCnacel: '取消',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          // 更新了文章是否收藏的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            // 在success方法中 this的上下文环境发生了改变 this不再指向page 所以不具有setData方法
            collected: postCollected
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showToast(postsCollected, postCollected) {
    // 通过数据的改变再弹出消息提示框
    // 更新了文章是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      // 通过数据来判断操作的界面提示
      title: postCollected ? "收藏成功" : "取消成功",
      icon: "success",
      duration: 1000
    });
  },
  onMusicTap: function () {
    let currentPostId = this.data.currentPostId;
    // bug
    let postData = postsData.postList[currentPostId];
    let isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImg: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '今晚打老虎',
      path: `/pages/index/index`,
      success: function (res) {

      },
      fail: function (res) {

      }
    }
  }
})