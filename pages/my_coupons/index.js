 
const app = getApp()
Page({ 

  /**
   * 页面的初始数据
   */ 

  data: {
    List: {
      tab: [],
      listData: []
    },
    showTabIndex: 0,
    sysWidth: 320,//图片大小
    sysHeight:500,
  },

  arr1: [],

  gotoGet:function(){
    wx.navigateTo({
      url: '../available_coupons/index',
    })
  },
  /* 回首页 */
  toproduct:function(){
    wx.navigateTo({
      url: '/pages/search_product/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  /* 去掉日期的时间 */
  spliceData: function(e) {
    for(let i = 0;i<e.length;i++){
      e[i].couponStartDate = e[i].couponStartDate.substring(0,10)
      e[i].couponEndDate = e[i].couponEndDate.substring(0, 10)
    }
    return e;
  },
  // 点击Tab切换
  bindTab: function (e) {
    var index = e.currentTarget.dataset.id

    this.setData({
      showTabIndex: index
    })
  },
  loadTab: function () {
    //加载tab项
    let tab = [
      {
        title: '未使用',
        linkUrl: '',
        page: 1,
        pageSize: 0,
        curPage: 0,
        totalSize: 0,
      },
      {
        title: '已过期',
        linkUrl: '',
        page: 1,
        pageSize: 0,
        curPage: 0,
        totalSize: 0,
      },
      {
        title: '已使用',
        linkUrl: '',
        page: 1,
        pageSize: 0,
        curPage: 0,
        totalSize: 0,
      }
    ]
    let List = this.data.List
    List.tab = tab
    for (let i = 0; i < tab.length; i++) {
      List.listData.push([])
    }
    this.setData({
      List: List
    })

    let listData = this.loadListData() //加载tab项对应列表数据
  },
  loadListData: function () {
    //加载tab项对应列表数据
    this.getData(0)
    this.getData(1)
    this.getData(2)
    let listData = []
    return listData
  },
  // 加载全部数据并且暴露渲染
  loadList: function (e) {
    let tab = this.loadTab() //加载tab项

  },

  getData: function (tabi) {
    let that = this
    let getParam = {}
    getParam.couponState = tabi
    getParam.page = that.data.List.tab[tabi].page
    let customIndex = app.AddClientUrl("/get_my_coupons_list.html", getParam, 'get')
    wx.request({
      url: customIndex.url,
      header: app.header,
      success: function (res) {
        console.log(res.data)
        wx.hideLoading()
        let List = that.data.List

        //tab数据变化
        List.tab[tabi].pageSize = res.data.pageSize;
        List.tab[tabi].curPage = res.data.curPage;
        List.tab[tabi].totalSize = res.data.totalSize;


        let result = that.spliceData(res.data.result) 

        List.listData[tabi] = List.listData[tabi].concat(result)
        that.setData({ List: List })
      },
      fail: function (res) {
        wx.hideLoading()
        app.loadFail()
      }
    })
  },


  /* 组件事件集合 */
  tolinkUrl: function (e) {
    let linkUrl = e.currentTarget.dataset.link
    app.linkEvent(linkUrl)
  },

  optParam: {}, // option数据 用来转发和刷新
  onLoad: function (options) {
    this.optParam = options
    // this.getData(0)
    this.loadList()
  },

  onReady: function () {
    this.setData({
      setting: app.setting,
      loginUser: app.loginUser,
      sysWidth: app.globalData.sysWidth,
      sysHeight: app.globalData.sysHeight,
    });
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

    this.data.List = {
      tab: [],
      listData: []
    }
    this.onLoad()

    wx.stopPullDownRefresh()
  },

  scrollTopToReflesh: function () {

  },
  scrollBottomToLoadMore: function () {
    console.log(this.data.List)
    let List = this.data.List
    let tabIndex = this.data.showTabIndex
    console.log(List.tab[tabIndex].page)


    if (List.tab[tabIndex].totalSize > List.tab[tabIndex].curPage * List.tab[tabIndex].pageSize) {
      ++List.tab[tabIndex].page;
      this.getData(tabIndex);
    }
  },

  
})