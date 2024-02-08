// 引入路由组件
import Home from '@/pages/Home'
// 路由懒加载 写法导入    更加高效
// const home = () => { return import('@/pages/home')}
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

// 路由配置信息
export default [
    {
        path: "/center",
        component: Center,
        // 路由懒加载直接写在这边的话   上面就不用import了  直接在这把 import 
        // component: ()=>import('@/pages/home'),
        meta: { show: true },
        // 二级路由组件  不用写 /
        children: [
            {
                path: "myOrder",
                component: MyOrder,
            },
            {
                path: "groupOrder",
                component: GroupOrder,
            },
            {
                // 访问 /center 的时候默认redirect(重定)向到 /center/myOrder
                path: "/center",
                redirect:'/center/myOrder',
            }
        ]
    },
    {
        path: "/paySuccess",
        component: PaySuccess,
        meta: { show: true },
        // 也可以用 路由独享守卫  但是这把在组件内用组件内的守卫
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter:(to, from, next) => {
            // 去交易页面  从 shopcart(购物车)来才放行
            if(from.path=='/trade'){
                next()
            } else {
                // 其他路由过来 中断当前路由导航  跳回原来路由地址(也就是from的地址)
                next(false)
            }
        }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter:(to, from, next) => {
            // 去交易页面  从 shopcart(购物车)来才放行
            if(from.path=='/shopcart'){
                next()
            } else {
                // 其他路由过来 中断当前路由导航  跳回原来路由地址(也就是from的地址)
                next(false)
            }
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        // 命名路由名字
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/home",
        component: Home,
        // meta 设置 路由源信息   show 用于设置是否显示的布尔值
        // 在 App.vue 文件下可以读取到这个值   方便展示不同的情况  比如登陆页面不展示footer
        meta: { show: true }
    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        // 对象写法需要添加这个参数
        name: "search",
        // 路由组件传递peops数据  
        // 布尔值写法:params
        // props:true
        // 对象写法：二外给路由组件传递一些props
        // props:{a:1,b:2}
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    // 重定向  在项目跑起来的时候  访问/之后立马定向到首页
    {
        path: '*',
        redirect: '/home'
    },

]