Page({
  /**
   * 初始化数据
   */
  data: {
    name: '',
    phone: '',
    mail: '',
    city: '',
    massage:''
  },
  listenerNameInput: function (e) {
    this.data.name = e.detail.value;
  },
  listenerPhoneInput: function (e) {
    this.data.phone = e.detail.value;
  },
  listenerMailInput: function (e) {
    this.data.mail = e.detail.value;
  },
  listenerMailInput: function (e) {
    this.data.mail = e.detail.value;
  },
  listenerAreaInput: function (e) {
    this.data.city = e.detail.value;
  },
  listenerMessageInput: function (e) {
    this.data.massage = e.detail.value;
  },
  listenerLogin: function () {

    console.log('姓名: ', this.data.name);
    console.log('手机: ', this.data.phone);
    console.log('邮箱: ', this.data.mail);
    console.log('城市: ', this.data.city);
    console.log('留言: ', this.data.massage);

    wx.request({
      url: 'https://wx.sc-edu.com/jim/wxmini_xc/join.php',
      data: {
        "join_name": this.data.name,
        "join_tel": this.data.phone,
        "join_email": "163@163.com",
        "join_city": this.data.city,
        "join_note": this.data.massage,
        "join_promo": "3"
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e)
        if(e.data.status!=0){
          wx.showModal({
            title: '注意',
            content: e.data.message+"是否重新填写？",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../Join/Join'
                })
              } else if (res.cancel) {
                wx.navigateBack({

                })
              }
            }
          })
        }
        else{
          wx.showModal({
            showCancel: false,
            content: "申请成功！！",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../inedx/index'
                })
              }
            }
          })
        }
      }
    })
    wx.navigateBack({

    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '立即加盟东大吉姆的工场',
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