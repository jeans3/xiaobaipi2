// miniprogram/pages/series/series.js
const dataBase = require("../util/dataBase")
const util = require("../util/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "日期",
    userList: [{}],
    list: [{}],
    sumList: {},
    shuiSum: 0, p0: 0, p1: 0, p2: 0, p3: 0, p4: 0, p5: 0,
    shuiavatarUrl: "'https://thirdwx.qlogo.cn/mmopen/vi_32/4lxZEwLUBZkHKp4d013libuJQ5DYqgAUdEatq4xGQWkSqnCf5WDG9CIibp4CamRI79lllZlUY3j1S0ga2suHLeGQ/132'",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    dataBase.onQuery("user").then(res =>
      this.setData({
        userList: res.data
      })
    )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onQuery()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onQuery()
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
    dataBase.onQuery("series").then(res => {
      this.setData({
        p0: util.sum(res.data, "player_id_0"),
        p1: util.sum(res.data, "player_id_1"),
        p2: util.sum(res.data, "player_id_2"),
        p3: util.sum(res.data, "player_id_3"),
        p4: util.sum(res.data, "player_id_4"),
        p5: util.sum(res.data, "player_id_5"),
        shuiSum:util.sum(res.data, "shuiSum"),
        list: res.data,
      })
    })
    wx.showToast({
      title: '刷新成功',
    })
  }
})