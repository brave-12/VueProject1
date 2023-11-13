<template>
<div>
  <Header/>
  <!-- 路由组件出口的地方 -->
  <router-view></router-view>
  <!-- 在Home或者Search下的时候显示  在登录、注册的时候隐藏 -->
  <!-- v-show="$route.path=='/home'||$route.path=='/search'" 只能解决个别  解决多个麻烦 -->
  <!-- 根据 router 下的 index 文件中的 meta 值确定是否展示 -->
  <Footer v-show="$route.meta.show"  />
</div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  // 组件名称
  name: '',
  // 局部注册的组件
  components: {Header,Footer},
  mounted() {
    // 将 TypeNav 内的内容放到这边  因为 APP.vue 只执行一次  因此只会请求一次数据
    // 派发action  获取商品分类的三级列表的数据   通知Vuex发请求  
    this.$store.dispatch('categoryList')
    
  },
  
  
}
</script> 

<style scoped>

</style>
