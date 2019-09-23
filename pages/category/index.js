// pages/category/index.js
import { request } from "../../request/index.js";

Page({
  data: {
    scrollTop: 0,
    currentIndex: 0,
    menuList: [
      //大家电显示内容
    ],
    goodsList: [
      //   右边展示内容
    ]
  },
  //   返回值
  Cates: [],
  onLoad() {
    this.loadData();
  },

  // 获取缓存中的数据获取接口中的数据 
  loadData() {
    //  1 获取本地存储中的数据  值空 字符串
    const localCate = wx.getStorageSync("cates");
    // 2 判断该数据是否存在
    if (localCate) {
      // 2.1 存在 判断该数据是否过期 1分钟 60s
      if (Date.now() - localCate.time > 1000 * 60) {
        // 过期了
        this.getCates();
      } else {
        // 未过期 要使用缓存的数据 
        this.Cates = localCate.data;
        const menuList = this.Cates.map(v => v.cat_name);
        const goodsList = this.Cates[0].children;
        this.setData({
          menuList,
          goodsList
        })
      }
    } else {
      // 数据不存在
      this.getCates();
    }
  },
  // 获取分类数据
  getCates() {
    request({
      url: "/categories"
    }).then(res => {
      //  Console.log(res)
      this.Cates = res.data.message;
      wx.setStorageSync("cates", {
        data: this.Cates,
        time: Date.now()
      });
      //  左侧返回的数组内容
      const menuList = this.Cates.map(v => v.cat_name);
      //  右侧返回的数组内容
      const goodsList = this.Cates[0].children;
      // console.log(goodsList);
      this.setData({
        menuList,
        goodsList
      })
    })
  },
  // 左侧菜单点击事件
  handleMenuTap(e) {
    const { index } = e.target.dataset;
    const goodsList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      goodsList,
      scrollTop: 0
    })
  }

})