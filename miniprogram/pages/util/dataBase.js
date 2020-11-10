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