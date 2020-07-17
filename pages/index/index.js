//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    a1src:'http://www.5ijim.com/images/c1_on.png',
    a2src: 'http://www.5ijim.com/images/c2_on.png',
    a3src: 'http://www.5ijim.com/images/c3_on.png',
    a4src: 'http://www.5ijim.com/images/c4_on.png',
    imgUrls: [],
    indicatorDots: true,//是否显示面板指示点
    autoplay: true,//是否自动切换
    interval: 5000,//自动切换时间间隔
    duration: 1000,//滑动动画时长
    circular:true//是否采用衔接滑动
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
     if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        // content: '未授权',
        success: function (res) { }
      })
    } else {
      wx.showModal({
        title: '提示',
        // showCancel: false,
        content: '同意授权',
        success: function (res) { }
      })
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '东大吉姆的工场',
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
  },
  onLoad:function(){
    console.log('页面加载')
    var that = this
    wx.request({
      url: 'https://wx.sc-edu.com/jim/wxmini_xc/banner.php',
      success(res){
        console.log("res.data",res.data)
        that.setData({
          imgUrls:res.data.data

        })
      }
    })

  }
  ,
  getBannerPicture:function(){
    var that = this
   

  }
})