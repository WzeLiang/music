//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    this.globalData.Cookie = wx.getStorageSync("sessionid");
    this.globalData.uid = wx.getStorageSync("uid");
    console.log(this.globalData.Cookie)
    console.log(this.globalData.uid)
    // 登录
    this.login();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    var that = this;
   
  },
  login: function () {
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // var that = this;
        this.globalData.code = res.code
        // this.httpPost("/api/account/wecharLogin", { code: res.code, invite_code: that.globalData.invite_code, invite_type: that.globalData.invite_type, userInfo: that.globalData.userInfo}, function (res) {
        //   console.log("app.globalData.invite_code===>>>" + that.globalData.invite_code);

        //   console.info("logining...................................");
        //   console.info(res.data);
        //   that.globalData.uid = res.data.uid;
        //   that.globalData.mobilePhone = res.data.mobile_code
        //   if (res.data.mobile_code != null && res.data.mobile_code != '') {
        //     that.globalData.mobile_code = 1;
        //   }
        //   console.log(res)
        //   if (that.loginCallBack) {
        //     console.info("loginCallBack.......");
        //     that.showInfo("等待登录！");
        //     that.loginCallBack(res.data);
        //   }
        //   wx.hideLoading();
        // });
        // wx.navigateTo({
        //   url: '/pages/login/login/login',
        // })

      }
    })
  },
  globalData: {
    userInfo: null,
    uid:"",
    Cookie:'',
    baseUrl: "http://localhost:3000", //测试


    // baseImgUrl: "http://ps.rterp1.shikefood.com/erp/images",    //正式商品图片路径
    // baseImgUrl: "http://ps.rterp.shikefood.com/erp/images",    //正式商品图片路径
    // baseImgUrl: "http://114.215.176.131:9091/365dianjia_images",
    uid: null,
    //uid: "a775057bd1274706a42e4d1218cc3a04",
    code: null,
  
  },
  showInfo: function (str) {
    wx.showToast({
      title: str,
      icon: 'success'
    })
  },
  showErr: function (str) {
    wx.showToast({
      title: str,
      icon: 'none'
    })
  },
  
  PGET: function (url, params, callback) {
    console.info("进入promise");

    params.shopId = this.globalData.shopId;
    params.userToken = this.globalData.uid;
    params.branchId = this.globalData.branchId;
    console.info(params);
    if (!url) {
      console.error("缺少请求链接后缀参数");
      return;
    }
    wx.showLoading({
      title: '加载中'
    });

    var that = this;
    let promise = new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.baseUrl + url,
        data: params,
        method: "POST",
        success: function (res) {
          resolve();
          if (res.statusCode == 200) {
            if (res.data.state == "fail") {
              if (res.data.code && res.data.code == '300') {
                that.login();
                setTimeout(function () {
                  wx.showToast({
                    title: '已重新登录，请刷新页面！',
                    icon: 'none'
                  })
                }, 2000)
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            } else {
              callback && callback(res.data)
            }
          } else {
            wx.showToast({
              title: "系统繁忙！",
              icon: 'none'
            })
          }
          // callback && callback(res.data);
        }, fail: function () {
          wx.showToast({
            title: '请求失败！' + e.errMsg,
            icon: 'none'
          })
        }
      })
    });
    return promise
  },
  httpGet: function (url, params, callback) {
    var aaa = wx.getStorageSync("sessionid")//读取cookie
    console.log(aaa);
    console.info(params);
    if (!url) {
      console.error("缺少请求链接后缀参数");
      return;
    }
    wx.showLoading({
      title: '加载中'
    });
    var that = this;
    wx.request({
      url: this.globalData.baseUrl + url,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      header: {
         "Cookie": this.globalData.Cookie
      },//传在请求的header里
      method: "GET",
      success: function (res) {
        console.info(res);
        if (res.statusCode == 200) {
          if (res.data.code == 300) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/login/login/login',
              })
            }, 1000)

          } else {
            callback && callback(res)
          }
        } else {
          wx.showToast({
            title: "系统繁忙！",
            icon: 'none'
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败！' + e.errMsg,
          icon: 'none'
        })
      }
    })
  },
  httpPost: function (url, params, callback) {
    console.info(params);
    // if (params.userToken==null){
    //   console.log("aaaaaa")
    //   wx.navigateTo({
    //     url: '../login/login/login',
    //   })
    // }
    if (!url) {
      console.error("缺少请求链接后缀参数");
      return;
    }
    wx.showLoading({
      title: '处理中'
    });
    wx.request({
      url: this.globalData.baseUrl + url,
      method: "POST",
      xhrFields: {
        withCredentials: true
      },
      header: {
        'content-type': 'application/json' ,// 默认值
        "Cookie":this.globalData.Cookie
      },
      success: function (res) {
        console.info(res);
        if (res.statusCode == 200) {
          if (res.data.code == 300) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            })
            setTimeout(function () {
              wx.navigateTo({
                url: '/pages/login/login/login',
              })
            }, 1000)

          } else {
            callback && callback(res)
          }
        } else {
          wx.showToast({
            title: "系统繁忙！",
            icon: 'none'
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败！' + e.errMsg,
          icon: 'none'
        })
      }
    })
  },
  afterSuccess: function (data, msg, successCallBack, errorCallBack, beforeCallBack, afterCallBack) {
    beforeCallBack && beforeCallBack();
    var b = data.data.errData;
    if (b) {
      errorCallBack && errorCallBack();
    } else {
      if (msg != 'no') {
        wx.showToast({
          title: msg,
          icon: 'none'
        })
      }
      successCallBack && successCallBack();
    }
    afterCallBack && afterCallBack();
  }
  ,
  arrayCopy: function (newobj, obj) {
    var newobj = newobj || {};
    for (var attr in obj) {
      newobj[attr] = obj[attr];
    }
    return newobj;
  }
})