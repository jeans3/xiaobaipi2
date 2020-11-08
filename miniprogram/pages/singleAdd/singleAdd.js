// miniprogram/pages/singleAdd/singleAdd.js
var database = require("../util/dateBase")
var dateFormate = require("../util/dateFormate")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuiavatarUrl: '../index/user-unlogin.png',
    list: [
      {
      }
    ],
    date: dateFormate.formatDate(new Date()),
    changci: 1,
    userPlay1: 0,
    userPlay2: 1,
    userPlay3: 2,
    userPlay4: 3,
    userList: [{}],
    userInfo: {},
    requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    database.onQuery("user").then(res =>
      this.setData({
        userList: res.data
      })
    ).catch(err => console.log(err))
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

  },

  onQuery: function () {
    // console.log("play1",this.data.userList[this.data.userPlay1].name)
    // console.log("play2",this.data.userList[this.data.userPlay2].name)
    // console.log("play3",this.data.userList[this.data.userPlay3].name)
    // console.log("play4",this.data.userList[this.data.userPlay4].name)

  },

  bindPickerPlay1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      userPlay1: e.detail.value
    })
  },
  bindPickerPlay2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      userPlay2: e.detail.value
    })
  },
  bindPickerPlay3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      userPlay3: e.detail.value
    })
  },
  bindPickerPlay4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      userPlay4: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindPickerchangci: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      changciIndex: e.detail.value
    })
  },
})