import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
// search模块的小仓库   state 存储数据的地方
const state = {
    cartList: []
}
// mutiations:修改state的唯一手段
const mutations = {
    GETCARTLIST (state, cartList) {
        state.cartList = cartList
    }
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步  但是不能修改state
const actions = {
    // 获取购物车列表数据
    async getCartList ({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            // CATEGORYLIST 的提交到mutations内的地方 result.data 是返回的数组数据
            commit('GETCARTLIST', result.data)
        }

    },
    // 删除购物车某一个产品   不需要再返回信息
    async deleteCartListBySkuId ({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById ({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品   context:小仓库   相当于可以使用仓库的多个参数
    deleteAllCheckedCart ({ dispatch, getters }) {
        // commit(提交mutataions修改state)  getters(计算属性)  dispatch(派发action) state(当前仓库数据)
        // 获取购物车中全部产品   getters 也可以通过state写
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            // 将每一次返回地Promise添加到数组当中
            PromiseAll.push(promise)
        })
        // Promise.all() 是一个内置的辅助函数，接受一组 promise（或者一个可迭代的对象），并返回一个promise
        // 只要全部的p1|p2都成功  返回即为成功  如果有一个失败 返回即为失败
        return Promise.all(PromiseAll)
    },
    // 修改全部产品状态   使用 state 和 getters 都可以   根据vuex插件内查看
    updateAllCartIsChecked ({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        });
        // 最终返回结果
        return Promise.all(promiseAll)

    }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
// 可以吧我们将来在组件中需要用到的数据简化一下
const getters = {
    cartList () {
        // cartList[0] 是根据state仓库内调用
        // 需要或一个空数组  不然初次访问的时候会报错
        return state.cartList[0] || []
    },
    // 计算出来购物车数据
    // cartInfoList(state){
    //     return state.
    // }
}

export default {
    state,
    mutations,
    actions,
    getters
}