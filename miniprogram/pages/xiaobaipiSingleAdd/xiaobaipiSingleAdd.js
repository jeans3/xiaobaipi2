const dateBase = require("../util/dateBase")
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
    list: [{

    }],
    date: dateFormate.formatDate(new Date()),
    changci: ["一", "二", "三", "四", ],
    changciIndex: 0,
    play1_id: 0,
    play2_id: 1,
    play3_id: 2,
    play4_id: 3,
    play1_score: "",
    play2_score: "",
    play3_score: "",
    play4_score: "",
    shui: "",
    play1Sum: 0,
    play2Sum: 0,
    play3Sum: 0,
    play4Sum: 0,
    shuiSum: 0,
    userList: [{}],
    userInfo: {},
    requestResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  queryBattlelist: function () {

  },

  onQuery: function () {
    database.onQuery("user").then(res =>
      this.setData({
        userList: res.data
      })
    )
    dateBase.onQuery("battlelist", "date", dateFormate.formatTime(new Date(this.data.date), "M-D")).then(res => {
      console.log("长度", res.data.length)
      if (res.data.length != 0) {
        this.setData({
          play1_id: res.data[0].play1_id,
          play2_id: res.data[0].play2_id,
          play3_id: res.data[0].play3_id,
          play4_id: res.data[0].play4_id,
        })
      } else {
        this.setData({
          play1_id: 0,
          play2_id: 1,
          play3_id: 2,
          play4_id: 3,
        })
      }
      var date = dateFormate.formatTime(new Date(this.data.date), "M-D")
      database.onQuery("single", "date", date)
        .then(res =>
          this.setData({
            play1Sum: util.sum(res.data, "play1_score"),
            play2Sum: util.sum(res.data, "play2_score"),
            play3Sum: util.sum(res.data, "play3_score"),
            play4Sum: util.sum(res.data, "play4_score"),
            shuiSum: util.sum(res.data, "shui"),
            list: res.data
          }),
          console.log('[数据库] [查询记录] 成功: '),
          wx.showToast({
            title: '刷新成功',
          })
        )
    })
    console.log("集合:", this.data.list)
  },

  insertBattleList: function () {
    var that = this
    try {
      var date = dateFormate.formatTime(new Date(that.data.date), "M-D")
      var play1_id = that.data.play1_id
      var play2_id = that.data.play2_id
      var play3_id = that.data.play3_id
      var play4_id = that.data.play4_id
      this.db = wx.cloud.database()
      this.test = that.db.collection('battlelist')
      this.test.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          play1_id: play1_id,
          play2_id: play2_id,
          play3_id: play3_id,
          play4_id: play4_id,
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

  onInsert: function () {
    var that = this
    try {
      dateBase.onQuery("battlelist", "date", dateFormate.formatTime(new Date(this.data.date), "M-D")).then(res => {
        console.log("长度", res.data.length)
        if (res.data.length == 0) {
          that.insertBattleList()
        }
      })
      var play1_score = util.bijiao(that.data.play1_score)
      var play2_score = util.bijiao(that.data.play2_score)
      var play3_score = util.bijiao(that.data.play3_score)
      var play4_score = util.bijiao(that.data.play4_score)
      var play1_id = that.data.play1_id
      var play2_id = that.data.play2_id
      var play3_id = that.data.play3_id
      var play4_id = that.data.play4_id
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

      var play1_nickName = that.data.userList[that.data.play1_id].nickName
      var play2_nickName = that.data.userList[that.data.play2_id].nickName
      var play3_nickName = that.data.userList[that.data.play3_id].nickName
      var play4_nickName = that.data.userList[that.data.play4_id].nickName

      this.db = wx.cloud.database()
      this.test = that.db.collection('single')
      this.test.add({
        // data 字段表示需新增的 JSON 数据
        data: {
          play1_id: play1_id,
          play2_id: play2_id,
          play3_id: play3_id,
          play4_id: play4_id,
          play1_nickName: play1_nickName,
          play2_nickName: play2_nickName,
          play3_nickName: play3_nickName,
          play4_nickName: play4_nickName,
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
          that.setData({
            play1: "",
            play2: "",
            play3: "",
            play4: "",
            shui: "",
          })
          that.onQuery()
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
      play1_id: e.detail.value
    })
  },

  bindPickerPlay2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play2_id: e.detail.value
    })
  },
  bindPickerPlay3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play3_id: e.detail.value
    })
  },

  bindPickerPlay4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play4_id: e.detail.value
    })
  },

  //获取日期控件的值
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    this.onQuery()
  },

  //获取场次的值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      changciIndex: e.detail.value
    })
  },

  //获取输入的play1片数
  bindKeyInputPlay1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play1_score: e.detail.value
    })
  },

  //获取输入的play2片数
  bindKeyInputPlay2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play2_score: e.detail.value
    })
  },

  //获取输入的play3片数
  bindKeyInputPlay3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play3_score: e.detail.value
    })
  },

  //获取输入的play4片数
  bindKeyInputPlay4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      play4_score: e.detail.value
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