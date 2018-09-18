// pages/player/player.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songid:"",
    playinfo:{},
    songinfo:{},
    isplay:false,
    songimgurl:"",
    hotComments:[],
    comments:[],
    total:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    this.setData({
      songid:options.id,
      songimgurl: app.globalData.playimgurl
    })
    console.log(this.data.songinfo)
    this.getplayinfo()
    this.getsonginfo()
    this.getComment()
    
  },
  //获取歌曲播放地址
  getplayinfo: function () {
    var that = this
    app.httpGet('/music/url?id=' + this.data.songid, {}, function (res) {
      wx.hideLoading();
      console.log(res);
      that.setData({
        playinfo: res.data.data[0],
      })
      


    });
  },

  //获取歌曲详情
  getsonginfo: function () {
    var that = this
    app.httpGet('/song/detail?ids=' + this.data.songid, {}, function (res) {
      wx.hideLoading();
       console.log(res);
      var songinfo = res.data.songs[0]
      //songinfo.al.pic = "http://p1.music.126.net/OVHar05vedbWFEWHuArbGA==/" + res.data.songs[0].al.pic + ".jpg"
      that.setData({
        songinfo: songinfo
      })


    });
  },
  //获取歌曲评论/comment/music
  getComment:function(){
    var that = this
    app.httpGet('/comment/music?id=' + this.data.songid, {}, function (res) {
      wx.hideLoading();
      console.log(res);
      var total = res.data.total;
      if (total >= 1000) {
        total = 999
      }
      that.setData({
        hotComments: res.data.hotComments,
        comments: res.data.comments,
        total: total
      })




    });
  },
  audioPlay: function () {
    this.audioCtx.play()
    this.setData({
      isplay: true
    })
  },
  audioPause: function () {
    this.audioCtx.pause()
     this.setData({
      isplay: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  handleTouchStart:function(e){
    console.log(e)
  },
  handleTouchEnd: function (e) {
    console.log(e)
  },
  handleTouchMove:function (e) {
    console.log(e)
  },
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
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