import { reqCategoryList, reqCateBannerList , reqFloorList } from '@/api/index'

// home模块的小仓库   state 存储数据的地方
const state = {
    // 设置 state 中数据默认初始值为空数组  根据服务器返回的数据类型设置 如果返回的是对象就设置对象
    categoryList: [],
    // 轮播图数据
    bannerList: [],
    // floor组件数据
    floorList: []
}
// mutiations:修改state的唯一手段
const mutations = {
    GETCATEGORYLIST (state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST (state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST (state, floorList) {
        state.floorList = floorList
    }
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过api里面的接口函数调用   向服务器发请求获取数据
    async categoryList ({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            // CATEGORYLIST 的提交到mutations内的地方 result.data 是返回的数组数据
            commit('GETCATEGORYLIST', result.data)
        }
    },

    // 获取首页轮播图的数据
    // 使用了 await 的话 async 也需要
    async getBannerList ({ commit }) {
        let result = await reqCateBannerList()
        if (result.code == 200) {
            
            commit('GETBANNERLIST', result.data)
        }
        
    },

    // 获取floor数据
    async getFloorList ({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            // 提交 mutation
            commit('GETFLOORLIST', result.data)
        }
        
    }
}



// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}