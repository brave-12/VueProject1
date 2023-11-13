import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件   引入的地址放在components
import TypeNav from '@/components/TypeNav'
// 定义全局组件
import Carousel from "@/components/Carousel";
import Pagination from '@/components/Pagination';
// 按需引入 element(饿了么) 组件
import { Button,MessageBox } from 'element-ui';


// 第一个参数：全局组件名字  第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
// 注册button全局组件
Vue.component(Button.name,Button);
// ElementUI注册组件的时候  还有一种写法  挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServer.js---mock数据   至少让这个文件执行一次
import '@/mock/mockServe' 
// 引入 swiper 样式(因为轮播图用到好几次)
import 'swiper/css/swiper.css'
import 'swiper/js/swiper.min.js'
import { reqGetSearchInfo } from "@/api";
// console.log(reqGetSearchInfo({}));

// 同意接收api文件夹里面全部请求函数(不使用仓库而是在组件中请求的时候 需要在全局获取一次方法)
// 统一引入文件内所有的请求 API
import * as API from "@/api/index";
import monv from "@/assets/monv.gif";
// 引入 图片懒加载(lazyload) 插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading: monv,
})

// 引入自定义插件(为了更好地理解其他插件)
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
})

// 可以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// 引入表单校验插件
import "@/plugins/Validate"
new Vue({
  // 全局事件总线$bus配置
  beforeCreate() {
    // this 就是 vm
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  
  // 注册路由   简写 router:router
  // 注册路由信息  当这里书写 router 的时候  组件身上都拥有 $route,$router 属性
  // $route：一般获取路由信息(路径、query、params等等)
  // $router：一般进行编程式导航路由跳转(push|replace)
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store,
  render: h => h(App),
}).$mount('#app')
