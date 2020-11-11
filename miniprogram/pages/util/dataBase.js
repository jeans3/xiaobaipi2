const dateFormate = require("./dateFormate")

//return的是res原始数据
const db = wx.cloud.database()
function onQuery(databaseName, selectName, selectShuxing, selectName1, selectShuxing1) {
  console.log("查询", db.collection(databaseName).where({
    [selectName]: selectShuxing,
    [selectName1]: selectShuxing1,
  }).get())
  return db.collection(databaseName).where({
    [selectName]: selectShuxing,
    [selectName1]: selectShuxing1,
  }).get()
}

function player_id(){
  var index = 0
  onQuery("playid","_id",play_id).then(res=>{
    if(res.data.length==0){
      this.test = that.db.collection('playid')
        this.test.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            _id:index
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
    }
  })
}

function onRemove(databaseName, selectId) {
  // console.log("语句",db.collection(databaseName).doc(selectId).remove())
  db.collection(databaseName).doc(selectId).remove()
}

function insertLog(log) {
  var datetime = dateFormate.formatTime(new Date(Date.now()), "Y-M-D h:m:s")
  try {
    db.collection('log').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        log: datetime + "  " + log,
        datetime: datetime,
      },
      //  数据插入成功，调用该函数
      success: function (res) {

      }
    })
  }
  catch (e) {
    wx.showModal({
      title: '错误',
      content: e.message,
      showCancel: false
    })

  }
}

module.exports = {
  onQuery: onQuery,
  onRemove: onRemove,
  insertLog: insertLog,
}