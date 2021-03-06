const app = getApp();
Component({
  properties: {


    // 这里定义了innerText属性，属性值可以在组件使用时指定
    data: {
      type: JSON,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    display:"block"
  },
  ready:function(){
    console.log("popimage数据", this.data.data.jsonData.imageUrl)
    let that=this;
    try {
      var imageUrl = wx.getStorageSync('popimage')
      // 当缓存的图片地址存在以及他的图片不变的时候不需要弹窗
      if (imageUrl && imageUrl == that.data.data.jsonData.imageUrl) {
        console.log("imageUrl", imageUrl)
        that.setData({
          display: "none"
        })
      }
      // 其余的时候显示弹窗
      else{
        setTimeout(function () {
        that.setData({
          display: "block"
        })
        }, 1000)
      }
    } catch (e) {
     
    }
  },
  methods: {
    // 这里是一个自定义方法

    tolinkUrl: function (event) {
      console.log(event.currentTarget.dataset.link)
      console.log("===========e==========", event.currentTarget.dataset.url)
      // 缓存
      try {
        wx.setStorageSync('popimage', event.currentTarget.dataset.url)
      } catch (e) {
      }
      this.setData({
        display: 'none'
      })
      app.linkEvent(event.currentTarget.dataset.link);

    },
    closeFun:function(e){
      console.log("===========e==========", e.currentTarget.dataset.url)
      // 缓存
      try {
        wx.setStorageSync('popimage',e.currentTarget.dataset.url)
      } catch (e) {
      }
      this.setData({
        display:'none'
      })
    }
  },
})