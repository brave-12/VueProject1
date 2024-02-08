// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";
// 使用插件
Vue.use(VueRouter)

// 引入 store 
import store from "@/store";

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来的push方法
// 第二个参数：成功回调    第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call||apply区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数，call用逗号隔开，apply传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // call||apply区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数，call用逗号隔开，apply传递数组
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由  routes: routes  key和value一致省略value  所以可以省略一个routes
    routes,
    // scrollBehavior  设置滚动行为
    // 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
    // vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
    scrollBehavior (to, from, savedPosition) {
        // y: 0 表示滚动条显示在最上方   如果 y: 100 则表示距离上方 100
        return { y: 0 }
    }
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取你要跳到哪个路由的信息  from:可以获取你从哪个路由而来的信息  next:放行函数
    // 为了测试先全都放行
    next()
    // 用户登录了  才会有 token
    let token = store.state.user.token
    // 用户信息
    // 因为这个name的值不能及时获取  所以额外添加一个定时器
    setTimeout(() => {
        let name = store.state.user.userName
        // console.log(name);
    }, 1000);
    
    
    if (token) {
        // 如果用户已经登录  不能去 /login 登录页面    跳回首页
        if (to.path == "/login") {
            // next()
            // 不知道为什么有token但是没登陆  先跳过
            next('/home')
        } else {
            // 登录了  但是去的不是 login
            // 如果用户名已有(也就是有用户信息的情况下点击其他地方跳转)
            if (name) {          
                next()
            } else {
                // 没有用户信息
                try {
                    // 获取用户信息(也就是点击刷新按钮之后生效)   原本是在home和header路由组件内获取
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了获取不到用户信息
                    // 清除过期 token  然后跳到登录页面
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录  不能去交易相关、不能去支付相关(pay,paysuccess)、不能去个人中心
        // 未登录去上面这些路由--跳去登陆页面
        let toPath = to.path;
        // 路由包含 /trade 相关和 /pay 相关的路径 且没有登陆则跳转去 /login
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 ){
            // ?redirect='+toPath  会携带重定向参数  跳回 /login   通过 decodeURICompoent 解析参数
            // 把未登录的时候想去没有去成的信息  存储于地址栏中(路由)
            next('/login?redirect='+toPath) 
        } else {
            next()
        }
        // 去的不是上面这些路由--跳去登陆页面
    }
});

export default router