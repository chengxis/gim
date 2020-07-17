// pages/view/view.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
        msg:{},
        loadingHidden: true
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id);
    
    var that = this;
    var WxParse = require('../../wxParse/wxParse.js');
    that.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'https://wx.sc-edu.com/jim/wxmini_xc/article.php',
      data: {
        "id": options.id,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log('---------')
        console.log(e.data)
        that.setData({
          msg: WxParse.wxParse('msg', 'html', e.data.data[0].content, that, 5),
          loadingHidden: true
        })

      }
    })  
    
    // msg: WxParse.wxParse('msg', 'html', article, that, 5)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '东大吉姆的工场精彩有趣的活动',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
        onsole.log("转发失败")
      }
    }
  }
})