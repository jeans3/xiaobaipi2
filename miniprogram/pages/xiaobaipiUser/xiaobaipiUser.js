// miniprogram/pages/xiaobaipiUser/xiaobaipiUser.js
var app = getApp()
var getOpenid = require("../util/util")
var onQuery = require("../util/dateBase")
const dateBase = require("../util/dateBase")
var dateFormate = require("../util/dateFormate")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../index/user-unlogin.png',
    name: "",
    nickName: "点击头像登陆",
    openid: "",
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    openid: getOpenid.getOpenid()

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                nickName: res.userInfo.nickName, // 微信昵称
              })
            }
          })
        }
      }
    })
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

  },

  bindKeyInputname: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },

  bindKeyInputnickName: function (e) {
    this.setData({
      nickName: e.detail.value,
    })
  },

  // 单击“插入数据”按钮调用该函数
  addUser: function () {
    var that = this
    // if (that.data.name == "") {
    //   wx.showModal({
    //     title: '错误',
    //     content: "姓名不能为空",
    //     showCancel: false
    //   })
    //   return
    // }
    try {
      console.log("openid" + app.globalData.openid)
      onQuery.onQuery("user", "_openid", app.globalData.openid).then(res => {
        console.log(res.data.length)
        if (res.data.length != 0) {
          wx.showModal({
            title: '错误',
            content: "用户已存在",
            showCancel: false
          })
          return
        }
        this.db = wx.cloud.database()
        this.test = that.db.collection('user')
        this.test.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            // name: that.data.name,
            nickName: that.data.nickName,
            avatarUrl: that.data.avatarUrl,
          },
          //  数据插入成功，调用该函数
          success: function (res) {
            wx.showToast({
              title: '新增用户成功',
            })
            //增加新增用户日志
            var log = "[新增用户]nickName:" + that.data.nickName
            dateBase.insertLog(log)
          }
        })
      })

    } catch (e) {
      wx.showModal({
        title: '错误',
        content: e.message,
        showCancel: false
      })

    }
  }
})