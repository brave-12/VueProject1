// 登陆与注册模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout } from "@/api/index";
import { setToken, getToken,removeToken } from "@/utils/token";
// search模块的小仓库   state 存储数据的地方
const state = {
    // 验证码的起始状态是空字符串
    code: '',
    // token 是用户注册特殊生成的字段   用 localStorage 的TOKEN字段代替 ''   为了持久化存储不会一刷新就消失
    token: getToken(),
    // 用户信息
    userInfo: {},
}
// mutiations:修改state的唯一手段
const mutations = {
    GETCODE (state, code) {
        state.code = code
    },
    USERLOGIN (state, token) {
        state.token = token
    },
    GETUSERINFO (state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR (state) {
        // 把仓库中相关用户信息清空
        state.token = ''
        state.userInfo = {}
        // 把本地用户数据清空
        localStorage.removeItem('TOKEN')
    },
}
// action:处理action，可以书写自己的业务逻辑，也可以处理异步  但是不能修改state
const actions = {
    // 获取验证码的接口：把验证码返回，但是正常情况应该是后台把验证码发到用户手机上(为了省短信的钱这样做)
    async getCode ({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            // CATEGORYLIST 的提交到mutations内的地方 result.data 是返回的数组数据
            commit('GETCODE', result.data)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister ({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    // 用户登陆(token)
    async userLogin ({ commit }, data) {
        let result = await reqUserLogin(data)
        // 提交用户和密码  服务器就会下发对应的token，是用户唯一标识符(uuid)   经常通过 token 找服务器要用户信息进行展示
        if (result.code == 200) {
            // 用户登录成功且获取到token
            commit("USERLOGIN", result.data.token)
            // 持久化存储 token   不然刷新页面之后vuex仓库重置token就没了
            setToken(result.data.token)
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    // 不知道为什么这个 Promise 会报错
    async getUserInfo ({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            //  提交用户信息
            commit("GETUSERINFO", result.data)
        } 
    },
    // 退出登陆
    async userLogout ({ commit }) {
        // 只是向服务器发一次请求  通知服务器清除token
        let result = await reqLogout()
        if (result.code == 200) {
            // action 里面不能操作 state  提交到 mutation修改state
            commit("CLEAR")
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
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