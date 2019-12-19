import utils from '../utils/utils'
import './notice.less'
// import userInfo from "../utils/userInfo"
// var doc = document
// 心跳包
var Bulletin = {
  arrSign: 'noticeArr',
  constructor: function () {
    var _ts = this
    var _data = {}
    var heartUrl = '/im/customer_service/customer_heartbeat.do'
    /* end */
    _data.noticeArr = {
      sign: 'noticeArr',
      save: function (obj) {
        utils.sessionUtil.save(_data.noticeArr.sign, obj)
        return JSON.stringify(obj)
      },
      get: function () {
        var g = utils.sessionUtil.get(_data.noticeArr.sign)
        if (g) {
          return g
        } else {
          return null
        }
      }
    }
    _data.notices = function (data, type) {
      var _the = data
      _the.type = type
      var _type = {
        maintain: 0,
        normal: 1,
        warn: 2
      }
      var noticeCss = function (t) {
        var zinx = 0
        if (t === _type.maintain) {
          zinx = 109
        } else if (t === _type.normal) {
          zinx = 101
        } else {
          zinx = 99
        }
        console.log(zinx)
        // $('.prompt-notice').css({
        //   'position': 'fixed',
        //   'width': '100%',
        //   'height': '100%',
        //   'top': '0',
        //   'left': '0',
        //   'background-color': 'rgba(0, 0, 0, 0.3)',
        //   'z-index': zinx
        // })
        // $('.prompt-dialog').css({
        //   'width': '68%',
        //   'margin-left': '16%',
        //   'top': '50%',
        //   'background-color': 'rgba(255, 255, 255, 0.9)',
        //   '-moz-border-radius': '15px',
        //   '-webkit-border-radius': '15px',
        //   'border-radius': '15px',
        //   '-moz-appearance': 'none',
        //   '-webkit-appearance': 'none',
        //   'position': 'relative'
        //   // "margin-top": ( $(".prompt-dialog").height() / 2 * -1)
        // })
        // $('.prompt-dialog .prompt-content').css({
        //   'position': 'relative',
        //   'padding': '22px 20px',
        //   'font-size': '0',
        //   'text-align': 'center'
        // })
        // $('.prompt-dialog .prompt-footer').css({
        //   'display': 'block',
        //   'text-align': 'center',
        //   'line-height': '32px',
        //   'height': '32px',
        //   'color': '#40a0e9',
        //   'font-size': '15px',
        //   'border-top': '1px solid #ccc'
        // })
        // $('.prompt-content .content-image').css({
        //   // "width": "38%",
        //   'height': '86px',
        //   'width': '86px'
        // })
        // $('.prompt-content .content-msg').css({
        //   'text-align': 'left',
        //   'font-size': '14px',
        //   'line-height': '1.5',
        //   'word-wrap': 'break-word',
        //   'height': 'auto',
        //   'max-height': '90%',
        //   'color': '#111',
        //   'overflow': 'auto'
        // })
        // $('.prompt-content .content-title').css({
        //   'font-size': '16px',
        //   'line-height': '1.5',
        //   'color': '#000'
        // })
        // // 弹出框居中
        // $('.prompt-dialog').css({
        //   'margin-top': ($('.prompt-dialog').height() / 2 * -1)
        // })
        // //文本高度限制
        // $('.prompt-content .content-msg').css({
        //   'max-height': ($(window).height() * 0.8 - 22 * 2 - 33 - 24)
        // })
      }
      var buildNotice = function (obj) {
        // console.log(obj);
        var str = ''
        var content = ''
        var foot = ''
        if (obj.type === _type.maintain) {
          // TODO 维护公告
          content = '<img src="/mobile/images/maintain.png" class="content-image" />' +
            '<p class="content-msg">' + obj.msg + '</p>'
          foot = ''
          // if (obj.isLock == 0) {
          // }
        } else if (obj.type === _type.normal) {
          // TODO 普通公告
          content = '<h3 class="content-title">通知</h3>' +
            '<p class="content-msg">' + obj.msg + '</p>'
          foot = '<a class="prompt-footer" href="javascript:void(0)">确定</a>'
        } else if (obj.type === _type.warn) {
          content = '<h3 class="content-title">个人通知</h3>' +
            '<p class="content-msg">' + obj.msg + '</p>'
          foot = '<a class="prompt-footer" href="javascript:void(0)">确定</a>'
        } else {
          return
        }
        str += '<div class="prompt-notice" data-id="' + obj.afficheId + '" data-type="' + obj.type + '" isLock="' + obj.isLock + '">' +
          '<div class="prompt-dialog">' +
          '<div class="prompt-content">' +
          content +
          '</div>' +
          foot +
          '</div>' +
          '</div>'
        return str
      }
      var noticeControl = function (obj) {
        // TODO 维护公告最优先
        // $('.prompt-notice').on('click', '.prompt-footer', function (e) {
        //   $(this).parent().parent().fadeOut()
        //   // $(".prompt-notice[data-type="+_type.normal+"]").fadeOut();
        //   e.stopPropagation()
        // })
      }
      var createNotice = function (dd, t) {
        if (dd.activeTime - new Date().getTime() <= 0) {
          // if (t === _type.normal) {
          //   $('.prompt-notice[data-type=' + _type.normal + ']').fadeOut()
          // } else if (t === _type.maintain) {
          //   $('.prompt-notice[data-type=' + _type.maintain + ']').fadeOut()
          // } else if (t === _type.warn) {
          //   $('.prompt-notice[data-type=' + _type.warn + ']').fadeOut()
          // }
          return false
        }
        // if (t == _type.maintain) {
        // }
        // console.log(dd);
        console.log(buildNotice())
        // $('body').append(buildNotice({
        //   type: t,
        //   msg: dd.content,
        //   afficheId: dd.afficheId,
        //   isLock: dd.isLoca + ''
        // }))
        noticeCss(t)
        noticeControl(dd)
      }

      // TODO 不重复创建
      var nArr = _data.noticeArr.get() // 获取已存的公告信息
      // console.log(nArr);
      if (type === _type.maintain) {
        if (data.code === 102) {
          // var maintainModal = $('.prompt-notice[data-type=' + _type.maintain + ']')
          // if (maintainModal.length > 0) {
          //   maintainModal.hide()
          // }
          return
        }
        if (data.isLoca === 0) { // 如果返回 isLoca == 0 则添加按钮，可关闭维护公告
          // $('.prompt-notice[data-type=' + _type.maintain + ']').fadeOut()
          return
        }
      }
      if (nArr && nArr.length > 0) {
        var aSign = false
        var alive = null
        var _fc = 9
        var inx = 0
        for (var i = 0; i < nArr.length; i++) {
          var c = nArr[i]
          if (c.code === 103) {
            _fc = _type.maintain
          } else if (c.code === 105) {
            _fc = _type.normal
          } else if (c.code === 107) {
            _fc = _type.warn
          } else {

          }
          if (c.afficheId === _the.afficheId && _the.type === _fc) {
            inx = i
            aSign = true
            alive = nArr[i]
            break
          }
        }
        console.log(inx + alive)

        if (aSign) {
          if (_the.type === _type.maintain) {
            // 已存维护公告，如果 已经显示过，而且是不锁定的，则不重复出现，如果是锁定的，就再次出现
            // var _maintain = $('.prompt-notice[data-type=' + _type.maintain + ']')
            // if (_maintain.length > 0) {
            //   if (_the.isLoca === 1) {
            //     _maintain.fadeIn()
            //     // _maintain.find('.prompt-footer').remove();
            //     if (_the.isLoca !== alive.isLoca) {
            //       nArr[inx].isLoca = _the.isLoca
            //     }
            //   } else {
            //     // _maintain.fadeOut();
            //     if (_the.isLoca !== alive.isLoca) {
            //       nArr[inx].isLoca = _the.isLoca
            //     }
            //   }
            // } else {
            //   createNotice(alive, _the.type)
            // }

            // nArr.splice(inx, 1);
            // nArr.push(_the);
            // _data.noticeArr.save(nArr);
            // createNotice(_the, _the.type);
          }
          return false
        } else {
          nArr.push(_the)
          _data.noticeArr.save(nArr)
          createNotice(_the, _the.type)
        }
      } else {
        nArr = []
        nArr.push(_the)
        _data.noticeArr.save(nArr)
        createNotice(_the, _the.type)
      }
    }
    _data.init = function () {
      var heartRun = function () {
        utils.request(heartUrl, {}, function (res) {
          // 公告类型
          var _affiche = res['affiche']
          var type = 0
          // var _m = {}
          if (_affiche) {
            // 一般公告
            if (_affiche.common && _affiche.common.code === 105) {
              type = 1
              _data.notices(_affiche.common, type)
            }
            // 维护公告
            if (_affiche.maintenance && (_affiche.maintenance.code === 103 || _affiche.maintenance.code === 102)) {
              type = 0
              _data.notices(_affiche.maintenance, type)
            } else {
              // _m = $('.prompt-notice[data-type=0]')
              // if (_m.length > 0) {
              //   _m.remove()
              // }
            }
            // 其他公告？
            if (_affiche.warn && _affiche.warn.code === 107) {
              type = 2
              _data.notices(_affiche.warn, type)
            }
            // 领奖开奖 且 未读
            if (_affiche.notify && _affiche.notify.isRead === 0) {
              _ts.afficheNotify(_affiche.notify, 'notify')
            }
          }
        })
      }

      setTimeout(function () {
        heartRun()
      }, 50)
      setInterval(function () {
        heartRun()
      }, 10000)
    }
    // TODO 弹框,从外部进来的时候不要弹
    if (utils.getUserAgentType() === 'pc' || utils.getUserAgentType() === false || utils.getQueryString('app') || utils.getQueryString('X-Requested-With') || utils.sessionUtil.get('fromApp')) {
      return
    }
    _data.init()
    return _data
  },
  afficheNotify: function (notify, type) {
    let _ts = this
    let _afficheArr = utils.sessionUtil.get(_ts.arrSign)

    // 页面模版
    // var _noticeHtml = function (data) {
    //   return `
    //   <div class="card card-notice" id="Notice">
    //   <div class="card-head">
    //     <h3>每日嘉奖${data.title ? `<span>(${data.title})</span>` : ''}</h3>
    //     <a class="close"><i class="fa fa-close fa-fw"></i></a>
    //   </div>
    //   <div class="card-content">
    //     ${data.content}
    //   </div>
    //   </div>`
    // }
    var showNotify = function (data) {
      // 链接检查且替换
      console.log(data.content)
      let _linkRule = /href=['|"]([^'" \f\n\r\t\v]+)['|"]/
      let _replace = data.content.match(_linkRule) || ''
      let _real = ''
      if (_replace && _replace[1]) {
        _real = _replace[1]
        if (_real.indexOf('url=') > -1) {
          _real = _real.split('url=')[1]
        }
        data.content = data.content.replace(_replace[1], _real)
      }

      // let _inx = layer.open({
      //   content: _noticeHtml(notify)
      // })
      // if (_inx) {
      //   $('#Notice .close').off('click').on('click', function (e) {
      //     layer.close(_inx)
      //     e.stopPropagation()
      //   })
      // }
    }
    if (_afficheArr && _afficheArr.length > 0) {
      // 检验是否已经显示
      let alive = false
      for (let _nos of _afficheArr) {
        // console.log(_nos.notify && _nos.notify.notifyId === notify.notifyId);
        if (_nos.notify && _nos.notify.notifyId === notify.notifyId) {
          // 已经显示
          alive = true
          break
        }
      }
      if (!alive) {
        _afficheArr.push({
          'notify': notify
        })
        utils.sessionUtil.save(_ts.arrSign, _afficheArr)
        showNotify(notify)
      }
    } else {
      _afficheArr = []
      _afficheArr.push({
        'notify': notify
      })
      utils.sessionUtil.save(_ts.arrSign, _afficheArr)
      showNotify(notify)
    }
  }

}

export default Bulletin
