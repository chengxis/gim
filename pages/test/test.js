Page({
  /**
   * 初始化数据
   */
  data: {
    name: '',
    phone: '',
    // age:'00',
    // age:'0',
    city:'',
    cityid: "8",
    ageList: ['3-4岁', '4-5岁', '5-6岁', '6-10岁'],
    activeText: '南京东大中心',
    slideDown: 'none',
    centerList: [['中国'], ['南京', '杭州', '北京', '丹阳', '西安', '苏州', '济南', '泰州', '宜兴', '长春', '常州', '泰兴', '无锡', '盐城', '扬州', '合肥', '日照','焦作'], ['东大中心', '城东中心', '龙江中心', '江宁中心','雨花中心','桥北中心','仙林中心','奥体中心']],
    index:'',
    multiIndex:[0,0,0], 
    isShowCenter:false,//初始不显示预约中心
  },

  listenerNameInput: function (e) {
    this.data.name = e.detail.value;
  },

  bindPickerAgeChange: function (e) {
    this.setData({
    index: e.detail.value,
    })
  },

  listenerPhoneInput: function (e) {
    console.log("phone",e.detail.value)
    this.data.phone = e.detail.value;
  },
  bindMultiPickerCenterChange:function(e){
    console.log('预约中心发生改变',e.detail.value)
    this.setData({
      multiIndex:e.detail.value,
      isShowCenter:true
    })
  },

  bindMultiPickerColumnChange:function(e){
    console.log('修改的列为',e.detail.column,'值为',e.detail.value)
    var data = {
      centerList:this.data.centerList,
      multiIndex:this.data.multiIndex
    }
    console.log('data的值',data)
    data.multiIndex[e.detail.column] = e.detail.value
    //看第几列发生改变
    switch(e.detail.column){
      case 1:
        //由于第0列只有中国一个选项，后面的switch(data.multiIndex[1])只有这一个就行了
        switch(data.multiIndex[1]){ 
          case 0:
            data.centerList[2] = ['东大中心','城东中心','龙江中心','江宁中心','雨花中心','桥北中心']
            break
          case 1:
            data.centerList[2] = ['杭州中心']
            break
          case 2:
            data.centerList[2] = ['北京中心']
            break
          case 3:
            data.centerList[2] = ['丹阳中心']
            break
          case 4:
            data.centerList[2] = ['西安中心']
            break
          case 5:
            data.centerList[2] = ['沧浪区中心','工业园区中心','繁花中心']
            break
          case 6:
            data.centerList[2] = ['济南中心']
            break
          case 7:
            data.centerList[2] = ['泰州中心']
            break
          case 8:
            data.centerList[2] = ['宜兴中心']
            break
          case 9:
            data.centerList[2] = ['长春中心']
            break
          case 10:
            data.centerList[2] = ['常州中心']
            break
          case 11:
            data.centerList[2] = ['泰兴中心']
            break
          case 12:
            data.centerList[2] = ['无锡中心']
            break
          case 13:
            data.centerList[2] = ['盐城中心','海安中心']
            break
          case 14:
            data.centerList[2] = ['扬州中心']
            break
          case 15:
            data.centerList[2] = ['合肥中心']
            break
          case 16:
            data.centerList[2] = ['日照中心']
            break
          case 17:
            data.centerList[2] = ['焦作中心']
            break
        }
        //用来设置第三列默认显示数组的第0个
        data.multiIndex[2] = 0
        break
    }
    this.setData(data)
  },

  listenerLogin: function () {
    console.log('宝宝姓名: ', this.data.name);
    console.log('宝宝年龄: ', this.data.ageList[this.data.index]);
    console.log('家长手机: ', this.data.phone);
    console.log('城市: ', this.data.centerList[1][this.data.multiIndex[1]]);
    wx.request({
      url: 'https://wx.sc-edu.com/jim/wxmini_xc/order.php',
      data: {
        "order_city": this.data.centerList[1][this.data.multiIndex[1]],
        "order_name": this.data.name,
        "order_tel": this.data.phone,
        "order_age":  this.data.ageList[this.data.index],
        "order_from": "wxmini"
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e.data)
        if (e.data.status != "0") {
          wx.showModal({
            title: '注意',
            content: e.data.message + "是否重新填写？",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../test/test'
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
            showCancel:false,
            content: "预约成功！！",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../index/index'
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

  slideDownTap: function (e) {
    this.setData({
      slideDown: 'block',

    })
  },

  selectTap: function (e) {
    var target = e.currentTarget.dataset.txt;
    console.log(e.currentTarget.dataset.txt);
    this.setData({
      activeText: target,
      slideDown: 'none'
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来免费预约东大吉姆的工场',
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

   //objectMultiArray和objectArray暂时未用到
   // objectMultiArray: [
    //   [
    //     {
    //       id: 0,
    //       name: '中国'
    //     }

    //   ], [
    //     {
    //       id: 0,
    //       name: '南京'
    //     },
    //     {
    //       id: 1,
    //       name: '杭州'
    //     },
    //     {
    //       id: 2,
    //       name: '北京'
    //     },
    //     {
    //       id: 3,
    //       name: '丹阳'
    //     },
    //     {
    //       id: 4,
    //       name: '西安'
    //     },
    //     {
    //       id: 5,
    //       name: '苏州'
    //     },
    //     {
    //       id: 6,
    //       name: '济南'
    //     },
    //     {
    //       id: 7,
    //       name: '泰州'
    //     },
    //     {
    //       id: 8,
    //       name: '宜兴'
    //     },
    //     {
    //       id: 9,
    //       name: '长春'
    //     },
    //     {
    //       id: 10,
    //       name: '常州'
    //     },
    //     {
    //       id: 11,
    //       name: '泰兴'
    //     },
    //     {
    //       id: 12,
    //       name: '无锡'
    //     },
    //     {
    //       id: 13,
    //       name: '盐城'
    //     },
    //     {
    //       id: 14,
    //       name: '扬州'
    //     },
    //     {
    //       id: 15,
    //       name: '合肥'
    //     },
    //     {
    //       id: 16,
    //       name: '日照'
    //     },
    //      {
    //       id: 16,
    //       name: '焦作'
    //     }
    //   ], [
    //     {
    //       id: 0,
    //       name: '泰州'
    //     },
    //     {
    //       id: 1,
    //       name: '无锡'
    //     }
    //   ]
    // ],
    
    
    // objectArray: [
    //   {
    //     id: "00",
    //     name: '3-4岁'
    //   },
    //   {
    //     id: "01",
    //     name: '4-5岁'
    //   },
    //   {
    //     id: "02",
    //     name: '5-6岁'
    //   },
    //   {
    //     id: "03",
    //     name: '6-10岁'
    //   }
    // ],