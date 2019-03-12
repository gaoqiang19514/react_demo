const refreshTokenIsValid = (refreshToken) => {
  return true;
}

const accessTokenIsValid = (accessToken) => {
  return true;
}

const creteNumSeriesString = (start, end) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(String(i))
  }
  return result
}

const randomRangeNum = (min, max) => {
  var range = max - min;
  var rand = Math.random();
  return min + Math.round(range * rand);
}

const closest = function (el, selector) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  const old = el
  while (el) {
    if (matchesSelector.call(el, selector)) {
      break;
    }
    el = el.parentElement;
  }
  return el !== old;
}

const getURL = function(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = decodeURI(window.location.search).substr(1).match(reg);
  if(r!=null) return  r[2]; return null;
}


const parseUrl = function(url, name) {
  var result = [];
  var query = url.split("?")[1];
  var queryArr = query.split("&");
  queryArr.forEach(function(item){
    var obj = {};
    var key = item.split("=")[0];
    var value = item.split("=")[1];
    obj[key] = value;
    if(key === name)
    result = obj;
  });
  return result;
}


export default {
  accessTokenIsValid,
  refreshTokenIsValid,
  creteNumSeriesString,
  randomRangeNum,
  closest,
  parseUrl
};