//index.js
//获取应用实例
const app = getApp()

Page({
  // MVVM
  // 数据 对应着界面状态
  // data的数据可以直接通过this获取
  data: {
    // 默认的数据
    // status是1默认显示全部数据
    status: 1,
    addForm: false,
    lists: [],
    addText: ''
  },
  // 获取已完成的list 即status = 1 的
  curLists:[],
  //事件处理函数
  showStatus: function (e) {
    //
    const status = e.currentTarget.dataset.status;
    // 不再是dom编程 针对界面状态的编程
    this.setData({
      status: status
    })
    console.log(e, status);

  },
  addItem: function (e) {
    this.setData({
      addForm: true
    })
    // console.log(e.a);
  },
  // 如何添加新的todo？
  // 添加成功以后页面会新增一条任务
  // 显示多少条 由lists决定 lists.push
  // 数据驱动界面***数据变 界面会自动更新
  // MVVM
  //   M：model(数据模型data) View(视图模型层)
  // 看到界面我们就知道要的数据，看到交互了解对数据的操作
  addTodo: function (e) {

    const task = {
      title: this.data.addText,
      date: '刚刚',
      status: '0'
    }
    const temp = [...this.data.lists, task];
    this.setData({
      lists: temp,
      addForm: false
    })
  },
  addTodoHide: function (e) {
    this.setData({
      addForm: false
    })
  },
  setInput: function (e) {
    // console.log(e.detail.value); 获取表单输入的数据项
    this.setData({
      addText: e.detail.value
    })
  },
  changeStatus: function (e) {
    // 点击的当前条目 status 变成success
    // 数据lists 跟当前条目相关的这一条数据  将status的值更新1
    const index = e.currentTarget.dataset.index;
    const temp = this.data.lists;
    temp.forEach((item, i) => {
      // console.log(index,i);
      if (i == index) {
        if (item.status == '0') {
          item.status = '1';
          wx.showToast({
            title: '已完成任务',
            icon: 'success',
            duration: 1000
          })
          console.log(item.status);
        }else{
          item.status = '0';
          wx.showToast({
            title: '任务仍然未完成',
            icon: 'success',
            duration: 1000
          })
        }
      }
    })
    this.setData({
      lists:temp
    })
  }
})