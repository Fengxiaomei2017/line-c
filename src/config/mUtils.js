/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  if (!window.memoryData) window.memoryData = {};
  window.memoryData[name] = content;
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  if (window.memoryData && window.memoryData[name]) return window.memoryData[name];
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  if (window.memoryData && window.memoryData[name]) delete window.memoryData[name];
  window.localStorage.removeItem(name)
}

/**
 * 异步加载百度API
 **/
export const loadBaiduMap = () => {
  var script = document.createElement('script')
  script.src = 'http://api.map.baidu.com/api?v=2.0&ak=GlCoPQS5YK419UZKOaxVlGTweqUTDDI9&callback=initialize'
  document.body.appendChild(script)
}

/**
 * 将省市县行政区API得到的数据转化成固定格式
 **/
export const formatOptions = ads => {
  if (!ads) return
  let options = []
  ads.forEach((item, index) => {
    const obj = {
      label: item.name,
      value: item.id
    }
    options.push(obj)
  })
  return options
}

/**
 * 借助JSON进行对象深拷贝
 * */
export const jsonClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 从YYYY-MM-DD的日期中获取月份和日
 * params: {date: YYYY-MM-DD格式的日期}
 * return: Object:{month,day}
 * */

export const getMonthDay = (date) => {
  if (date) {
    let month = date.slice(5, 7)
    let day = date.slice(8)
    return {month, day}
  } else {
    return false
  }
}
/**
 * 将后台的时间戳转化为
 * params: timeStamp(ms)后台返回的时间戳
 * */
export const formatDate = (timeStamp, format) => {
  let date = new Date(timeStamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  month = month < 10 ? ('0' + month) : month
  day = day < 10 ? ('0' + day) : day
  hour = hour < 10 ? ('0' + hour) : hour
  minutes = minutes < 10 ? ('0' + minutes) : minutes
  seconds = seconds < 10 ? ('0' + seconds) : seconds
  switch (format) {
    case 'YYYY-MM-DD HH:MM:SS':
      return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`
    case 'MM月DD日 HH:MM':
      return `${month}月${day}日 ${hour}:${minutes}`
    case 'HH:MM':
      return `${hour}:${minutes}`
    default:
      return {
        year,
        month,
        day,
        hour,
        minutes,
        seconds
      }
  }
}
/**
 * 数组快排
 * params: arr 这里是由YYYY-MM-DD元素组成的数组
 * return: arr
 * */
export const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr
  } else {
    let pivotIndex = Math.floor(arr.length / 2)
    let pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
      if (parseInt(arr[i].replace(/-/g, '')) < parseInt(pivot.replace(/-/g, ''))) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return quickSort(left).concat([pivot], quickSort(right))
  }
}

/**
 * 兼容性事件绑定
 * */

export const addEventHandler = (target, type, fn) => {
  if (target.addEventListener) {
    target.addEventListener(type, fn)
  } else if (target.attachEvent) {
    target.attachEvent('on' + type, fn)
  } else {
    target.onclick = fn
  }
}

/**
 * 获取URL里的参数
 * */
export const getParams = (url) => {
  if (url) {
    if (url.indexOf('?') !== -1) {
      let search = url.substr(url.indexOf('?') + 1)
      let strs = search.split('&')
      let theRequest = {}
      if (strs.length > 0) {
        strs.forEach(item => {
          let name = item.split('=')[0]
          let value = encodeURIComponent(item.split('=')[1])
          theRequest[name] = value
        })
      }
      return theRequest
    }
  }
}

// 乘法
export const accMul = (arg1, arg2) => {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

// 除法
// export const accDiv = (arg1, arg2) => {
//   var t1 = 0, t2 = 0, r1, r2
//   try {
//     t1 = arg1.toString().split('.')[1].length
//   } catch (e) {}
//   try {
//     t2 = arg2.toString().split('.')[1].length
//   } catch (e) {
//   } with (Math) {
//     r1 = Number(arg1.toString().replace('.', ''))
//     r2 = Number(arg2.toString().replace('.', ''))
//     return (r1 / r2) * pow(10, t2 - t1)
//   }
// }

// 加法
export const accAdd = (arg1, arg2) => {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}