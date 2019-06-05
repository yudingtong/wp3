//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code:''
  },
  //事件处理函数
  bindViewTap: function() {
    if (app.globalData.loginflag){
      wx.navigateTo({
        url: '../logs/logs'
      })
    }else{
      this.setData({
        userInfo: {},
        hasUserInfo: false
      })

    }
    
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        
      })
    }
  },




  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }) 
    wx.login({
      success: function (e1) {
        console.log(e1) 
        //发送请求
            wx.request({
              url: 'http://127.0.0.1:9000/getId2', // 仅为示例，并非真实的接口地址
              data: {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                code: e1.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res.data.oid)
                app.globalData.wxid = res.data.oid
                app.globalData.sessionid = res.data.sessionid
                app.globalData.loginflag = true
                 
              },  
              fail(res){
                // this.setData({
                //   hasUserInfo: false
                //   //canIUse: false,
                // }) ,
                
                wx.showToast({
                  title: '登录失败，请重登',
                  
                  // image: '../Image/suess.png',
                  duration: 2000
                })

              }
              
            })
        
      }
    })
    


     
  },

  getPhoneNumber: function (e) {
    console.log(e);
    wx.request({
      url: 'https://zhaozichuan.top/getId2',//此处Ip就不暴露咯
      data: {
        "tel": e.detail,//微信小程序服务器返回的信息
        "openId": app.globalData.wxid //openId  注意此处的openId 是我们通过 code(用户登录凭证) 去后台获取到的 openId
      },
      method: "GET",
      dataType: "json",
      success: function (result) {
        //无区号的手机号
        console.log(result.data + "-------手机号");
      }
    })
  }


  
})
