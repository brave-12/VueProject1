import { reqGoodsInfo,reqAddOrUpdateShopCart } from '@/api/index'
// 封装游客临时身份uuid--生成一个随机字符串(生成之后不能再变化)
import { getUUID } from "@/utils/uuid_token";

// home模块的小仓库   state 存储数据的地方
const state = {
    // 服务器返回类型为对象   所以初始化定义为空对象
    goodInfo: {},
    // 游客临时身份使用 uuid 模块
    uuid_token:getUUID()
    
}
// mutiations:修改state的唯一手段
const mutations = {
    GETGOODINFO (state, goodInfo) {
        state.goodInfo = goodInfo
    },
    
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取产品信息action   await reqGoodsInfo(skuId) 等待获取 skuId    skuId 是对应产品的id
    async getGoodInfo({ commit },skuId){
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    //  async函数执行返回的结果一定是一个 Promise
    async addOrUpdateShopCart({ commit },{skuId,skuNum}){
        // 计入购物车返回的解构
        // 加入购物车以后（发请求） 前台将参数带给服务器 服务器写入数据成功 并没有返回其他数据 不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // 代表服务器加入购物车成功
        if (result.code == 200) {
            return "ok"
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    },

}



// 简化数据
const getters = {
    // 路径导航简化数据
    categoryView(state){
        // || {} 是为了防止初始值为空传过去的时候会报错
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrValueList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}