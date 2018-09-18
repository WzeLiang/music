// pages/playlistdetail/playlistdetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playlistid:"",
    songlist:[],
    songimgurl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      playlistid: options.id
    })
    this.getlistinfo()
  },
  getlistinfo: function () {
    var that = this
    app.httpGet('/playlist/detail?id=' + this.data.playlistid, {}, function (res) {
      wx.hideLoading();
      console.log(res);
      that.setData({
        songlist: res.data.playlist.tracks
      })


    });
  },
  topalyer:function(e){
    console.log(e)
    app.globalData.playimgurl = e.currentTarget.dataset.imgurl
    wx.navigateTo({
      url: '/pages/player/player?id=' + e.currentTarget.dataset.id 
    })
    wx.setStorageSync("id", e.currentTarget.dataset.id);
    wx.setStorageSync("playimgurl", e.currentTarget.dataset.imgurl)
    app.globalData.id = e.currentTarget.dataset.id
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