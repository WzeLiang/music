const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:14791286530,
    password:"np920629"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit:function(e){
    console.log(e)
    var formdata = e.detail.value
    var that=this
    wx.request({
      url: app.globalData.baseUrl + '/login/cellphone',
      method: 'GET',
      xhrFields: { withCredentials: true },
      data: formdata,
      success: function (res) {
      //  console.log(res)
        //console.log(res.header["set-cookie"]);
       // wx.setStorageSync("sessionid", res.header["Set-Cookie"])
        var str1 =""
        if (res.header["Set-Cookie"]){
          str1=res.header["Set-Cookie"];
        } else if (res.header["set-cookie"]){
          str1=res.header["set-cookie"];
        }
        console.log(str1)
       
 
        var reg = new RegExp("Path=/,", "g");
        var str2 = str1.replace(reg, "");
        console.log(str2)

        var reg = new RegExp("Path=/;", "g");
        var str3 = str2.replace(reg, "");
        console.log(str3)

        var reg = new RegExp("Domain=,", "g");
        var str4 = str3.replace(reg, "");
        console.log(str4)

        var reg = new RegExp("Domain=;", "g");
        var str5 = str4.replace(reg, "");
        console.log(str5);

        var reg = new RegExp("Expires=Mon,", "g");
        var str6 = str5.replace(reg, "");
        console.log(str6);

        var reg = new RegExp("Expires=Thu,", "g");
        var str7 = str6.replace(reg, "");
        console.log(str7);

        var reg = new RegExp("Path=/", "g");
        var str8 = str7.replace(reg, "");
        console.log(str8);

        var reg = new RegExp("HttpOnly;", "g");
        var str9 = str8.replace(reg, "");
        console.log(str9);
        var strtest = str9.replace(/\s*/g, "");
        var arr = strtest.split(";")
        for(let i =0;i<arr.length;i++){
          if (arr[i].indexOf("GMT") != -1){
            arr.splice(i, 1);
          }
          if(arr[i]==""){
            arr.splice(i, 1);
          }
        }
        console.log(arr);
        var cookiestr=""
        for (let i = 0; i < arr.length; i++) {
          cookiestr= cookiestr+arr[i]+";"
        }
        console.log(cookiestr)
        wx.setStorageSync("sessionid", cookiestr)
        return false;
        setTimeout(function () {
         wx.switchTab({
           url: "/pages/my/my"
         })
        }, 1000)
        app.afterSuccess(res, '登录成功！', function () {
         
         
        }, function (err) {
          console.log(err)
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})