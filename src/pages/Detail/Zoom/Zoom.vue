<template>
  <div class="spec-preview">
    <!-- 显示图片 -->
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 放大镜的大图样式 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <!-- 绿色遮罩样式 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex: 0,
      };
    },
    computed:{
      // 与父组件同理如果父组件是空对象会报错   通过计算属性重新赋值防止报错
      imgObj(){
        return this.skuImageList[this.currentIndex]||{}
      }
    },
    mounted() {
      // 全局事件总线：获取兄弟组件传递过来的索引值
      this.$bus.$on('getIndex',(index)=>{
        // 修改当前响应式数据
        this.currentIndex = index
      })
    },
    methods: {
      handler(event) {
        let mask = this.$refs.mask
        let big = this.$refs.big
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        // 约束范围
        if(left <= 0) left = 0
        // 因为蒙版mask的宽为图片的一半  所以当left的距离大于mask的自身长度的时候就锁定在这个值
        if(left >= mask.offsetWidth) left = mask.offsetWidth
        if(top <= 0) top = 0
        // 因为蒙版mask的宽为图片的一半  所以当left的距离大于mask的自身长度的时候就锁定在这个值
        if(top >= mask.offsetHeight) top = mask.offsetHeight
        // 修改元素的left|top值
        mask.style.left = left+'px'
        mask.style.top = top+'px'
        big.style.left = - 2 * left + 'px'
        big.style.top = - 2 * top + 'px'
      },
    },
    
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>