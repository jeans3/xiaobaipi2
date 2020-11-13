const {
  onQuery
} = require("../util/dataBase")
// miniprogram/pages/singleAdd/singleAdd.js
const dataBase = require("../util/dataBase")
var dateFormate = require("../util/dateFormate")
const util = require("../util/util")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuiavatarUrl: "'https://thirdwx.qlogo.cn/mmopen/vi_32/4lxZEwLUBZkHKp4d013libuJQ5DYqgAUdEatq4xGQWkSqnCf5WDG9CIibp4CamRI79lllZlUY3j1S0ga2suHLeGQ/132'",
    list: [{}],
    userList: [{}],
    user_color: "",
    userInfo: {},
    requestResult: '',
    date: dateFormate.formatDate(new Date()),
    changci: ["一", "二", "三", "四", "五", "六", "七", "八", "九"],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getOpenid()
    if(options.date!=null&&options.changciIndex!=null){
      this.setData({
        date: options.date,
        changciIndex: options.changciIndex
      })
    }
    console.log(this.data.date)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    dataBase.onQuery("user").then(res =>
      this.setData({
        userList: res.data
      })
    )
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

  upload: function () {
    var that = this
    // if (user.adminUser(app.globalData.openid) == false) {
    //   return
    // }
    var play1_id = that.data.userList[that.data.play1_id].player_id
    var play2_id = that.data.userList[that.data.play2_id].player_id
    var play3_id = that.data.userList[that.data.play3_id].player_id
    var play4_id = that.data.userList[that.data.play4_id].player_id
    that.db = wx.cloud.database()
    that.season = that.db.collection('series')
    that.season.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        ["player_id_" + play1_id]: that.data.play1Sum,
        ["player_id_" + play2_id]: that.data.play2Sum,
        ["player_id_" + play3_id]: that.data.play3Sum,
        ["player_id_" + play4_id]: that.data.play4Sum,
        changciIndex: that.data.changciIndex,
        shuiSum: that.data.shuiSum,
        date: that.data.date,
      },
      //  数据插入成功，调用该函数
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '上传成功',
        })
        that.setData({

        })
      }
    })
  },

  delete: function (res) {
    var id = res.currentTarget.dataset.id
    var that = this
    if (util.adminUser(app.globalData.openid)) {
      if (id) {
        dataBase.onRemove("single", id)
        that.onQuery()
      } else {
        wx.showToast({
          title: '无记录可删，请先创建一个记录',
        })
      }
    }
  },

  onQuery: function () {
    var date = this.data.date
    var changciIndex = Number(this.data.changciIndex)
    try {
      dataBase.onQuery("battlelist", "date", date, "changciIndex", changciIndex).then(res => {
        console.log("长度", res.data.length)
        if (res.data.length != 0) {
          this.setData({
            play1_id: res.data[0].play1_id,
            play2_id: res.data[0].play2_id,
            play3_id: res.data[0].play3_id,
            play4_id: res.data[0].play4_id,
            user_color: "yellow",
            changciIndex: res.data[0].changciIndex
          })
          dataBase.onQuery("single", "date", date, "changciIndex", changciIndex)
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
        } else {
          this.setData({
            play1_id: 0,
            play2_id: 1,
            play3_id: 2,
            play4_id: 3,
            play1Sum: 0,
            play2Sum: 0,
            play3Sum: 0,
            play4Sum: 0,
            shuiSum: 0,
            user_color: "",
            list: [{}]
          })
          wx.showToast({
            title: '无记录',
          })
          return
        }
      })
    } catch {}
    console.log("集合:", this.data.list)
  },

  insertBattleList: function () {
    var that = this
    var date = that.data.date
    var play1_id = Number(that.data.play1_id)
    var play2_id = Number(that.data.play2_id)
    var play3_id = Number(that.data.play3_id)
    var play4_id = Number(that.data.play4_id)
    var changciIndex = Number(that.data.changciIndex)
    try {
      dataBase.onQuery("battlelist", "date", date, "changciIndex", changciIndex).then(res => {
        console.log("长度", res.data.length)
        if (res.data.length != 0) {
          wx.showToast({
            title: '对阵已锁定',
          })
          return
        } else {
          this.db = wx.cloud.database()
          this.test = that.db.collection('battlelist')
          this.test.add({
            // data 字段表示需新增的 JSON 数据
            data: {
              play1_id: play1_id,
              play2_id: play2_id,
              play3_id: play3_id,
              play4_id: play4_id,
              changciIndex: changciIndex,
              date: date
            },
            //  数据插入成功，调用该函数
            success: function (res) {
              wx.showToast({
                title: '锁定成功',
              })
            }
          })
        }
        this.onQuery()
      })

    } catch (e) {
      wx.showModal({
        title: '错误',
        content: e.message,
        showCancel: false
      })
    }
  },

  qingchu: function () {
    this.setData({
      play1_score: "",
      play2_score: "",
      play3_score: "",
      play4_score: "",
      shui: "",
    })
  },

  onInsert: function () {
    var that = this
    var play1_score = util.bijiao(that.data.play1_score)
    var play2_score = util.bijiao(that.data.play2_score)
    var play3_score = util.bijiao(that.data.play3_score)
    var play4_score = util.bijiao(that.data.play4_score)
    var play1_nickName = that.data.userList[that.data.play1_id].nickName
    var play2_nickName = that.data.userList[that.data.play2_id].nickName
    var play3_nickName = that.data.userList[that.data.play3_id].nickName
    var play4_nickName = that.data.userList[that.data.play4_id].nickName
    var play1_id = that.data.play1_id
    var play2_id = that.data.play2_id
    var play3_id = that.data.play3_id
    var play4_id = that.data.play4_id
    var shui = util.bijiao(that.data.shui)
    var date = that.data.date
    var changciIndex = Number(that.data.changciIndex)
    try {
      dataBase.onQuery("battlelist", "date", this.data.date, "changciIndex", Number(this.data.changciIndex)).then(res => {
        console.log("长度", res.data.length)
        if (res.data.length == 0) {
          this.setData({
            // [play_id]: res.data[0].play_id,
          })
          wx.showToast({
            title: '请先锁定对阵',
          })
        } else {
          if (play1_score == "请重新输入" || play2_score == "请重新输入" || play3_score == "请重新输入" || play4_score == "请重新输入" || shui == "请重新输入") {
            wx.showModal({
              title: '错误',
              content: '只能输入数字',
              showCancel: false,
            })
            this.setData({
              play1_score: "",
              play2_score: "",
              play3_score: "",
              play4_score: "",
              shui: "",
            })
            return
          }
          var heji = play1_score + play2_score + play3_score + play4_score + shui
          if (heji != 0) {
            //  显示错误对话框
            wx.showModal({
              title: '错误',
              content: "合计不等于0,已自动计算",
              showCancel: false
            })

            if (play1_score == "" || play2_score == "" || play3_score == "" || play4_score == "" || shui == "") {
              if (play1_score == "") {
                play1_score = 0 - (play2_score + play3_score + play4_score)
                this.setData({
                  play1_score: play1_score
                })
              }
              if (play2_score == "") {
                play2_score = 0 - (play1_score + play3_score + play4_score)
                this.setData({
                  play2_score: play2_score
                })
              }
              if (play3_score == "") {
                play3_score = 0 - (play1_score + play2_score + play4_score)
                this.setData({
                  play3_score: play3_score
                })
              }
              if (play4_score == "") {
                play4_score = 0 - (play1_score + play2_score + play3_score)

                this.setData({
                  play4_score: play4_score
                })
              }
              if (shui == "") {
                shui = 0 - (play1_score + play2_score + play3_score + play4_score)
                this.setData({
                  shui: shui
                })
              }
            }

            return
          }
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
              changciIndex: changciIndex,
              shui: shui,
              date: date
            },
            //  数据插入成功，调用该函数
            success: function (res) {
              wx.showToast({
                title: '插入成功',
              })
              that.setData({
                play1_score: "",
                play2_score: "",
                play3_score: "",
                play4_score: "",
                shui: ""
              })
              that.onQuery()
            }
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


  //判断对阵是否锁定
  bindPickerPlay: function (play_id, e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    dataBase.onQuery("battlelist", "date", this.data.date, "changciIndex", Number(this.data.changciIndex)).then(res => {
      console.log("长度", res.data.length)
      if (res.data.length != 0) {
        this.setData({
          // [play_id]: res.data[0].play_id,
        })
        wx.showToast({
          title: '已锁定对阵',
        })
      } else {
        this.setData({
          [play_id]: e.detail.value
        })
      }
    })
  },

  bindPickerPlay1: function (e) {
    this.bindPickerPlay("play1_id", e)
  },

  bindPickerPlay2: function (e) {
    this.bindPickerPlay("play2_id", e)
  },
  bindPickerPlay3: function (e) {
    this.bindPickerPlay("play3_id", e)
  },

  bindPickerPlay4: function (e) {
    this.bindPickerPlay("play4_id", e)
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
    this.onQuery()
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