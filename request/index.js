
// 1 同时发送异步请求的次数
let requestTimes=0;

export const request = (params) => {
  // 2 发送了几次 被递增几个 
  requestTimes++;
  
  wx.showLoading({
    title: "加载中",
    // 遮罩层  true-> 用户无法再次点击 屏幕 
    mask: true
  });

  // 1 公共的url
  const baseUrl = "https://api.zbztb.cn/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        // console.log(requestTimes);
        requestTimes--;
        requestTimes===0&& wx.hideLoading();
        // if(requestTimes===0){
        //   console.log(requestTimes);
        //   wx.hideLoading();
        // }
       
      }
    });
  })
}

// require  export default exports module.export  
// 回到单纯的 node 的环境中去测试 
// export default {
//   request
// }