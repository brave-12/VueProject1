import { reqGetSearchInfo } from "@/api/index";
// search模块的小仓库   state 存储数据的地方
const state = {
    searchList:{}
}
// mutiations:修改state的唯一手段
const mutations = {
    GETSEARCHLIST (state, searchList) {
        state.searchList = searchList
    }
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步  但是不能修改state
const actions = {
    async getSearchList ({ commit }, params = {}) {
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数(至少是空对象)
        // params形参：是当用户派发action的时候，第二个参数传递过来的
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            // CATEGORYLIST 的提交到mutations内的地方 result.data 是返回的数组数据
            commit('GETSEARCHLIST', result.data)
        }
    },
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
// 可以吧我们将来在组件中需要用到的数据简化一下
const getters = {
    // 当前state  当前仓库的state  不是大仓库的state  不需要state.search
    goodsList(state){
        // 防止 state.searchList.goodsList 没读取到或者没网站  ||(或)一个空数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}