<template>
  <div class="pagination">
    <!-- 上  点击事件给父组件传递 当前第几页减1 的数值 -->
    <!-- getPageNo 是在pages的search里面定义的自定义事件 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <!-- 判断 start 大于 1 才显示这个 1   也就是 start 大于2  下面省略号同理-->
    <button v-if="startNumAndEndNum.start >1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startNumAndEndNum.start >2">···</button>

    <!-- 中间部分 -->
    <!-- v-if="page>=startNumAndEndNum.start" 判断如果页数大于分页的起始页数则不遍历  -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

    <!-- 下 -->
    <!-- totalPage-1 是为了最后两个数之间没有 点点点 -->
    <button v-if="startNumAndEndNum.end < totalPage-1">···</button>
    <!-- end 大于页数(totalPage)才显示  -->
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <!-- 如果点击的是最后一页就不能再点了 -->
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo + 1)" >下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Pagination',
  // 组件参数 接收来自父组件的数据
  props: ["pageNo", 'pageSize', 'total', 'continues'],
  computed: {
    // 总页数
    totalPage () {
      // 向上取整 Math.ceil
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出连续的页码的起始数字与结束数字[连续页码的数字至少是5，也就是至少要5页，需要判断是否有5页]
    startNumAndEndNum () {
      // 解构赋值
      const{continues,pageNo,totalPage} = this
      // 先定义两个变量存储起始数字(start)与结束数字(end)
      let start = 0, end = 0;
      // 如果出现页数不够5页的情况  也就是总页数(totalPage)没有连续的页数(continues,这里设置为5)多
      if (continues > totalPage) {
        start = 1
        end = totalPage
        // 页码数够多的情况
      } else {
        // 也就是当前页码减去连续页码个数的一半取整(也就是5/2取整数2)
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 出现不正常 判断当start计算之后小于1时  也就是页数不超过4的时候 start结果变成负数或者0
        if (start < 1) {
          start = 1
          end = continues
        }
        // 出现不正常  end大于总页码
        if(end > totalPage){
          end = totalPage
          // 因为总的页数是continues(5) 所以end到start之间的为(- continues + 1)即可
          start = totalPage - continues + 1 
        }
      }
      
      // 返回 start 和 end  起始数字与结束数字
      return {start,end}
    }
  }
}
</script> 

<style scoped lang="less">
.pagination {
  // 分页居中
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color: skyblue;
}
</style>
