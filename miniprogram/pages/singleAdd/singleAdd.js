// miniprogram/pages/singleAdd/singleAdd.js
var database = require("../util/dateBase")
var dateFormate = require("../util/dateFormate")
const util = require("../util/util")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuiavatarUrl: '../index/user-unlogin.png',
    list: [
      {
        play1_name:"",play2_name:"",play3_name:"",play4_name:"",
        play1_score:"",play2_score:"",play3_score:"",play4_score:"",
      }
    ],
    date: dateFormate.formatDate(new Date()),
    changci: "第" + 1 + "场",
    userPlay1: 0,
    userPlay2: 1,
    userPlay3: 2,
    userPlay4: 3,
    play1: "",
    play2: "",
    play3: "",
    play4: "",
    shui: "",
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

  onInsert: function () {
    var that = this
    try {
      var play1_score = util.bijiao(that.data.play1)
      var play2_score = util.bijiao(that.data.play2)
      var play3_score = util.bijiao(that.data.play3)
      var play4_score = util.bijiao(that.data.play4)
      var shui = util.bijiao(that.data.shui)
      var date = dateFormate.formatTime(new Date(that.data.date), "M-D")
      var changci = that.data.changci
      if (play1_score == "错误" || play2_score == "错误" || play3_score == "错误" || play4_score == "错误" || shui == "错误") {
        wx.showModal({
          title: '错误',
          content: '只能输入数字',
          showCancel: false,
        })
        return
      }
      var heji = play1_score + play2_score + play3_score + play4_score + shui
      if (heji != 0) {
        //  显示错误对话框
        wx.showModal({
          title: '错误',
          content: "合计不等于0",
          showCancel: false
        })
        return
      }

      var play1name = that.data.userList[that.data.userPlay1].name
      var play2name = that.data.userList[that.data.userPlay2].name
      var play3name = that.data.userList[that.data.userPlay3].name
      var play4name = that.data.userList[that.data.userPlay4].name

      this.db = wx.cloud.database()
      this.test = that.db.collection('single')
      this.test.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          play1_name: play1name,
          play2_name: play2name,
          play3_name: play3name,
          play4_name: play4name,
          play1_score: play1_score,
          play2_score: play2_score,
          play3_score: play3_score,
          play4_score: play4_score,
          shui: shui,
          date: date
        },
        //  数据插入成功，调用该函数
        success: function (res) {
          wx.showToast({
            title: '插入成功',
          })
        }
      })
    } catch (e) {
      wx.showModal({
        title: '错误',
        content: e.message,
        showCancel: false
      })
    }

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

  //获取日期控件的值
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  //获取场次的值
  bindPickerchangci: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      changciIndex: e.detail.value
    })
  },

  //获取输入的play1片数
  bindKeyInputPlay1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play1: e.detail.value
    })
  },

  //获取输入的play2片数
  bindKeyInputPlay2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play2: e.detail.value
    })
  },

  //获取输入的play3片数
  bindKeyInputPlay3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play3: e.detail.value
    })
  },

  //获取输入的play4片数
  bindKeyInputPlay4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play4: e.detail.value
    })
  },

  //获取输入的水片数
  bindKeyInputshui: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      shui: e.detail.value
    })
  },
})