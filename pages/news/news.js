//action.js
//获取应用实例
var app = getApp()
Page({
  data: {
    actionpic: 'http://img.weiye.me/zcimgdir/thumb/t_148784468858aeb55087573.jpg',
    actionapic: 'http://img.weiye.me/zcimgdir/thumb/t_148784474358aeb587a167c.jpg',
    actionbpic: 'http://img.weiye.me/zcimgdir/thumb/t_148784476958aeb5a19a2d1.jpg', 
    news:{},
    loadingHidden: true
  },

onLoad: function(){
  console.log("加载中")
  this.data.loadingHidden = false
  var that = this
  wx.request({
    url: 'https://wx.sc-edu.com/jim/wxmini_xc/article_list.php',
    data:{
      "cate_id": "8",
      "limit": "6"

    },
    method: 'POST',  
    header: { 
      'content-type': 'application/x-www-form-urlencoded'  
    },
    success: function(e){
      var data_list=e.data.data
      console.log(e.data.data)
      that.setData({
        news: e.data.data,
        loadingHidden: true
      })
      
    }
  })
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
  }


});