// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:"",
    playlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    console.log(app.globalData.uid)
    this.setData({
      uid:app.globalData.uid
    })
    //this.getmusicList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getmusicList:function(){
    var that = this
    app.httpGet('/user/playlist?uid=' + this.data.uid , {}, function (res) {
      wx.hideLoading();
      console.log(res);
      that.setData({
       playlist:res.data.playlist
      })


    });
  },
  GoToPlaylistdetail:function(e){
    console.log(e)
      wx.navigateTo({
        url: '/pages/playlistdetail/playlistdetail?id=' + e.currentTarget.dataset.id,
      })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmusicList()
    
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