// 登陆与注册模块
import { reqAddressInfo,reqOrderInfo } from "@/api/index";
// search模块的小仓库   state 存储数据的地方
const state = {
    address:[],
    orderInfo:{}
}
// mutiations:修改state的唯一手段
const mutations = {
    GETUSERADDRESS (state, address) {
        state.address = address
    },
    GETORDERINFO (state, orderInfo) {
        state.orderInfo = orderInfo
    },
    
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步  但是不能修改state
const actions = {
    // 获取用户地址信息(需要用户登录)  { commit } 站位
    async getUserAddress ({ commit }) {
        // 只是向服务器发一次请求  通知服务器清除token
        let result = await reqAddressInfo()
        if (result.code == 200) {
            // action 里面不能操作 state  提交到 mutation修改state
            commit("GETUSERADDRESS",result.data)
        } 
    },
    // 获取商品清单数据
    async getOrderInfo ({ commit }) {
        // 只是向服务器发一次请求  通知服务器清除token
        let result = await reqOrderInfo()
        if (result.code == 200) {
            // action 里面不能操作 state  提交到 mutation修改state
            commit("GETORDERINFO",result.data)
        } 
    },
}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}