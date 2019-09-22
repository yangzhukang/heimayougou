/* 
首页
1 获取接口数据  轮播图
 */
Page({

  data: {
    //   轮播图数组
    swiperList: [],
    // 导航数组
    catitemList: [],
    // 楼层数组
    floorList: []
  },

  onLoad() {
    this.getSwiperData();
    this.getCatitems();
    this.getfloorList();
  },
  // 获取轮播图 数据
  getSwiperData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (result) => {
        // console.table(result.data.message);
        this.setData({
          swiperList: result.data.message
        })
      }
    });
  },
  // 获取导航数据
  getCatitems() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success: (result) => {
        this.setData({
          catitemList: result.data.message
        })
      }
    });
  },
  // 获取楼层数据
  getfloorList() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success: (result) => {
        this.setData({
          floorList: result.data.message
        })
      }
    });
  }


})

// wx2dae2a0d5b21ea67
// wxfb52f2d7b2f6123a