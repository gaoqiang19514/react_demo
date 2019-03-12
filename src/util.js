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

const getURL = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURI(window.location.search).substr(1).match(reg);
  if (r != null) return r[2];
  return null;
}

const parseUrl = function (url, name) {
  var result = [];
  var query = url.split("?")[1];
  var queryArr = query.split("&");
  queryArr.forEach(function (item) {
    var obj = {};
    var key = item.split("=")[0];
    var value = item.split("=")[1];
    obj[key] = value;
    if (key === name)
      result = obj;
  });
  return result;
}

function hasClass(elem, cls) {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false;
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, cls) {
  if (!hasClass(elem, cls)) {
    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
  }
}

function removeClass(elem, cls) {
  if (hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}

const paymentConfirm = function (options) {
  options = {
    title: '确认',
    subtitle: '',
    useable: 0,
    amount: 0,
    callback: function () {},
    ...options
  }

  var tpl =
    `
    <div>
      <div class="modal">
        <div class="modal__dialog">
          <div class="modal__content">
            <div class="modal__head">
              <div class="modal__close">×</div>
              <div class="modal__title">${options.title}</div>
            </div>
            <div class="modal__body">
              <div class="modal__info">
                <div class="modal__subtitle">${options.subtitle}</div>
                <div class="modal__amount">${options.amount}</div>
              </div>
              <div class="modal__items">
                <div class="modal__item">
                  <div class="modal__label">可用积分</div>
                  <div class="modal__useable">${options.useable}</div>
                </div>
                <div class="modal__item">
                  <div class="modal__label">交易密码</div>
                  <div><input class="modal__input" type="password" autocomplete="off" placeholder="请输入交易密码"></div>
                </div>
              </div>
            </div>
            <div class="modal__foot">
              <button class="modal__button modal__submit">确认兑换</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__backdrop"></div>
    </div>`

  const modal = document.createElement('div');
  modal.innerHTML = tpl
  document.body.appendChild(modal)
  var $backdrop = document.querySelector('.modal__backdrop')
  var $dialog = document.querySelector('.modal__dialog')
  var $closeBtn = document.querySelector('.modal__close')
  var $submitBtn = document.querySelector('.modal__submit')
  var $input = document.querySelector('.modal__input')

  var hide = function (callback) {
    addClass($backdrop, 'weui-animate-fade-out')
    addClass($dialog, 'weui-animate-fade-slideUp')
    $dialog.addEventListener('animationend', function () {
      modal.remove()
    })
    $dialog.addEventListener('webkitAnimationEnd', function () {
      modal.remove()
    })
  }

  $input.addEventListener('input', function (e) {
    if (e.target.value) {
      addClass($submitBtn, 'modal__button--enable')
    } else {
      removeClass($submitBtn, 'modal__button--enable')
    }
  })

  $closeBtn.addEventListener('click', function (e) {
    hide()
  })

  $submitBtn.addEventListener('click', function (e) {
    if (options.callback) {
      if (options.callback.call(this, e, $input) !== false) {
        hide()
      }
    } else {
      hide()
    }
  })
  addClass($backdrop, 'weui-animate-fade-in')
  addClass($dialog, 'weui-animate-fade-slideDown')
}

export default {
  accessTokenIsValid,
  refreshTokenIsValid,
  creteNumSeriesString,
  randomRangeNum,
  closest,
  parseUrl,
  paymentConfirm
};