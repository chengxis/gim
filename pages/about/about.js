//about.js
//获取应用实例
const app = getApp()
Page({
  data: {
    cityName: '',
    loadingHidden: true,
    center: '',
    logosrc:'../../image/logo.png',
    addrimg:'../../image/icon-address.png',
    clockimg: '../../image/icon-clock.png',
    phoneimg: '../../image/icon-phone.png',
    jtimg: '../../image/icon-jt.png',
    picimg: '../../image/icon-pic.png',
    imgUrls: [
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495626232647&di=c7c53f96e0f48681471e4626eebe0181&imgtype=0&src=http%3A%2F%2Fwww.sanchiseo.com%2Fuploadfile%2F2015821%2F2015821115728937045.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495626316444&di=ff20f74da6031541a12e0eeadaf156b9&imgtype=0&src=http%3A%2F%2Fsem.g3img.com%2Fsite%2F34016275%2F20160216162430_82108.png',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495626359075&di=3297d75c3742024d15f553547495f3db&imgtype=0&src=http%3A%2F%2Fwww.17emarketing.com%2Fuploads%2Fallimg%2F160627%2F1-16062G54154.png',
    ],
    cityList:['南京','苏州','无锡','扬州','常州','杭州','宜兴','泰兴','西安','北京','合肥','南通'],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    cityid:'1'
  },

  setdata:function(e){
    this.setData({
      cityid: (this.data.cityList.indexOf(e.currentTarget.id)+1).toString(),
    }) 
    console.log("cityid",this.data.cityid);
    this.onLoad();
  },

  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("页面初始化");
    var that = this;
    var cityid = this.data.cityid;
    that.setData({
      loadingHidden: false
    })
    wx.request({
      url: 'https://wx.sc-edu.com/jim/wxmini_xc/jim_contact.php',
      data:{
        city_id: cityid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e){     
        console.log("e",e);
        that.setData({
          cityName: e.data.data.city,
          center: e.data.data.center,
          loadingHidden: true
        }) 
      }
    })
  },
  //转发操作
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
})
