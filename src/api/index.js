// 当前这个模块：API进行统一管理
import requests from './request'
import mockRequest from './mockAjax'

// 三级联动的完整接口路径
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList   get   无参数
// /product/getBaseCategoryList 接口的url

// 发请求  axios发请求返回结果Promise对象   只需要写在后面添加的路径即可  /api 已经加在 request 中
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})

// 获取banner(Home首页轮播图)
export const reqCateBannerList = ()=> mockRequest.get('/banner')

// 获取floor数据
export const reqFloorList = ()=> mockRequest.get('/floor')

// 获取搜索模块数据  地址:/api/list   请求方式:post
/* 参数
{
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  }
*/
// 当前这个接口(获取搜索模块的数据)，给服务器传递一个默认参数(至少是一个空对象)
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})

// 获取产品详情信息接口  URL:/api/item/{skuId}  请求方式：get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:"get"})

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

// 获取购物车列表数据接口
// URL /api/cart/cartList  请求方式：get
export const reqCartList= ()=>requests({url:"/cart/cartList",method:"get"})

// 删除购物车产品接口
// URL：/api/cart/deleteCart/{skuId}  method:DELETE
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})

// 切换商品选中地址
// URL：/api/cart/checkCart/{skuID}/{isChecked}   method：GET
export const reqUpdateCheckedById= (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:"get"})

// 获取验证码
// URL:/api/user/passport/sendCode/{phone}   method:get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone} `,method:"get"})

// 注册
// URL:/api/user/passport/register   method:post
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:"post"})


// 登陆
// URL:/api/user/passport/login   method:post
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:"post"})

// 获取用户信息(需要带着用户的token向服务器要用户信息)
// URL:/api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:"get"})

// 退出登陆
// URL:/api/user/passport/logout  method:get
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:"get"})

// 获取用户地址信息
// URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"})

// 获取商品清单
// URL:/api/order/auth/trade  method:get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade ',method:"get"})

// 提交订单(不使用vuex存储 直接在组件内写)
// URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:POST
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"POST"})

// 获取订单支付信息
// URL:/api/payment/weixin/createNative/{orderId}  method:get
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})

// 获取支付订单状态
// URL:/api/payment/weixin/queryPayStatus/{orderId}  method:get
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})

// 获取我的订单列表  page 页码   limit 每页显示数量
// URL:/api/order/auth/{page}/{limit}  method:get
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:"get"})