//dateFormate.js
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
* 时间戳转化为年 月 日 时 分 秒 
* number: 传入时间戳 
* format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function formatTime(date, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

//获取当前日期
const formatDate = date =>{
  const year = date.getFullYear()
  const month = date.getMonth()+1
  const day = date.getDate()
  return[year,month,day].map(formatNumber).join("-")
}

function bijiao(name) {
  var msg = "错误"
  if (isNaN(Number(name))) {
    
  }else{
    return Number(name)
  }
  return msg
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  bijiao: bijiao,
}