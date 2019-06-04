//logs.js
const util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    logs: [],
    wxid:'',
    sessionid:'',
    isSubmit: false,
    warn: "",
    isPub: false,
    
  },

  onLoad: function () {
    //this.setData({
      // logs: (wx.getStorageSync('logs') || []).map(log => {
      //   return util.formatTime(new Date(log))
      // })
     // wxid: wx.getStorageSync('wxid') 
    this.setData({
      wxid: app.globalData.wxid,
      sessionid: app.globalData.sessionid
      })
    //console.logs(app.globalData.wxid)
        // wx.getStorage({//获取本地缓存
        //   key: "wxid",
        //   success: function (res) {
        //     that.setData({
        //       wxid: res.data
              
        //     });
        //     console.logs(res.data)
        //   }
        // })
 }, 
  
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { tel, name, com } = e.detail.value;
    if (!tel || !name || !com) {
      this.setData({
        warn: "填写项不能为空！",
        isSubmit: true
      })
      return;
    }
   
    var that = this;
    // var tokend = wx.getStorageSync('tokend')
    // var name = e.detail.value.name;         //获取input初始值
    // var tel = e.detail.value.tel;    //获取input初始值
    // var com = e.detail.value.com;    //获取input初始值
    wx.request({
      method: 'get',
      url: 'http://127.0.0.1:9000/register?', //接口地址q
      data: {
        'wxid': app.globalData.wxid,
        'name': e.detail.value.name,
        'tel': e.detail.value.tel,
        'com': e.detail.value.com,
        'userInfo': app.globalData.userInfo
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
            console.log(res.data.errCode);
            if (res.data.errCode==0){
              wx.showToast({
                title: '注册成功',
                // image: '../Image/suess.png',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateTo({
                 
                  url: '../index/index',
                })
              }, 2000) 
            }else{
              wx.navigateTo({
                  url: '../index/index',

              })
            }
       },
      fail: function (res) {
        wx.showToast({
          title: '注册失败',
          // image: '../Image/suess.png',
          duration: 2000
        })
        setTimeout(function () {
          wx.switchTab({
            url: '../index/index',
          })
        }, 2000)

      }
    })



  },
 
    
    // this.setData({
    //   warn: "",
    //   isSubmit: true,
    //   phone,
    //   pwd,
    //   isPub,
    //   sex
    // })
  


  formReset: function () {
    console.log('form发生了reset事件')
  }
  
})
