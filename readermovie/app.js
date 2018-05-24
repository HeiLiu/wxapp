//app.js
// 应用启动执行onLaunch 生命周期从App->page
// 负责全局的，应用级别的一些行为，可以添加全局的数据
App({
  onLaunch: function () {
    // 配置一个全局的音乐播放的状态，保存每次音乐的开关状态及图片切换的状态
    
  },
  globalData: {
    g_isPlayingMusic: false,
    g_currentMusicId: null
  }
})