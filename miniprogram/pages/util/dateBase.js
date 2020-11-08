//return的是res原始数据
const db = wx.cloud.database()
function onQuery(databaseName, selectName, selectShuxing) {
  console.log(db.collection(databaseName).where({
    [selectName]: selectShuxing
  }).get())
  return db.collection(databaseName).where({
    [selectName]: selectShuxing
  }).get()
}

function onRemove(databaseName, selectId) {
  db.collection(databaseName).doc(selectId).remove({
    success: res => {
      console.log("删除成功", res)
      wx.showToast({
        title: '删除成功',
      })
    },
    fail: err => {
      wx.showModal({
        content: "删除失败",
        showCancel: false
      })
      console.error('[数据库] [删除记录] 失败：', err)
    }
  })
}

module.exports = {
  onQuery: onQuery,
  onRemove: onRemove,
}