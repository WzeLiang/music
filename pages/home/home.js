// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isplay:false
  },
  //监听搜索框输入
  searchinput:function(e){
    console.log(e)
  },
  toplayer:function(){
      wx.navigateTo({
        url: '/pages/player/player?id=' + app.globalData.id
      })
  },
  //获取播放状态
  getPlaystatus: function () {
    var isplay=this.data.isplay
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log(res)
        if (res.status==1){
          console.log("正在播放")
        }else{
          console.log("没有播放")
        }
      },
      fail: function (res) {//接口调用失败的回调函数
        console.log(res)
      },
      complete: function (res) {//接口调用结束的回调函数（调用成功、失败都会执行）
        console.log(res)
      }
    })
    console.log(isplay)
    this.setData({
      isplay:app.globalData.isplay
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getPlaystatus()
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