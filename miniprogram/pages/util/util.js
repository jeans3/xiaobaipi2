/* 
list:json集合
name:集合内的属性
function add:遍历数组 合计 
*/
function sum(list, name) {
  var a = 0
  list.forEach(function (item, index) {
    if(item[name]!=null){
      a = a + Number(item[name])
    }
  })
  return a
}

function aaa(list, name,id) {
  var a = id
  // console.log("..........",list[0].name)
  list.forEach(function (item, index) {
    if(item[name]){
      a =  item[name]
    }
  })
  console.log("aaaaaaaa是",a)
  return a
}

function bijiao(name) {
  var msg = "请重新输入"
  if (isNaN(Number(name))) {
    
  }else{
    return Number(name)
  }
  return msg
}

/* 
  判断管理员
  appOpenid:当前使用小程序的openid
 */
function adminUser(appOpenid) {
  var adminOpenid = "o8fz-0MJC7CWA3cpiMI5b2rrgf6s"
  if (appOpenid == adminOpenid) {
    return true
  } else {
    wx.showModal({
      title: '失败',
      content: '没有管理员权限',
      showCancel: false
    })
    return false
  }
}

// 获取openid的方法
function getOpenid() {
  var app = getApp()
  wx.cloud.callFunction({
    name: 'login',
    data: {},
    success: res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      app.globalData.openid = res.result.openid
      wx.cloud.init({ env: 'mah-jong-4gcseyqm77ff364f' })
    },
    fail: err => {
      console.error('[云函数] [login] 调用失败', err)
      wx.navigateTo({
        url: '../deployFunctions/deployFunctions',
      })
    }
  })
}


module.exports = {
  sum: sum,
  getOpenid: getOpenid,
  adminUser: adminUser,
  bijiao: bijiao,
  aaa: aaa,
}