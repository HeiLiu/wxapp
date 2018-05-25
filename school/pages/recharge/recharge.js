// pages/recharge/recharge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
        {name: '￥50', value: '￥50'},
        {name: '￥150', value: '￥150', checked: 'true'},
        {name: '￥100', value: '￥100'},
        {name: '￥200', value: '￥200'},
        {name: '￥250', value: '￥250'}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  radioChange(e){
    console.log(e)
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