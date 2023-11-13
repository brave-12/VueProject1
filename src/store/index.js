import Vue from 'vue'
import Vuex from 'vuex'
// 是要使用插件
Vue.use(Vuex)
// 引入小仓库
import home from './home'
import search from './search'
import datail from './datail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 对外暴露Store类的一个实例
export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据   不同的小仓库储存不同的数据
    modules:{
        home,
        search,
        datail,
        shopcart,
        user,
        trade,
    }
})
