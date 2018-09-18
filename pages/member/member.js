// pages/member/member.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userinfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.uid)
    this.setData({
      uid: app.globalData.uid
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
  getMemberinfo: function () {
    var that = this
    app.httpGet('/user/detail?uid=' + this.data.uid, {}, function (res) {
      wx.hideLoading();
      console.log(res);
      that.setData({
        userinfo: res.data.profile
      })


    });
  },
  onShow: function () {
    this.getMemberinfo()
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