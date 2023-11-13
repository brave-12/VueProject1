<template>
  <div>
    <!-- 三级联动全局组件：因为已经在main.js注册为全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- 遍历两个floor  而且在自己组件内部是没有发请求   数据是父组件给的 -->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <!-- 同样的组件再复用一次 -->
    <!-- <Floor/> -->
    <Brand/>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  // 组件名称  写 TypeNav 会报错
  name: '',
  // 局部注册的组件
  components: {ListContainer,Recommend,Rank,Like,Floor,Brand},
  // 组件状态值
  data () {
    return {}
  },
  mounted() {
    // 派发action  获取floor组件的数据   因为有两个 floor 组件需要遍历   直接写在floor内轮播图不能展示不同的
    this.$store.dispatch('getFloorList')
    // 在首页获取用户信息
    this.$store.dispatch('getUserInfo')
  },
  computed: {
    ...mapState({
      floorList:state=>state.home.floorList
    })
  
  },
  
  
}
</script> 

<style scoped>

</style>
