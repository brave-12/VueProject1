<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>百货购物商城欢迎您！</p>
          <!-- 没有用户名 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航  务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登陆</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="">商城会员</router-link>
          <router-link to="">商家后台</router-link>
          <router-link to="">企业采购</router-link>
          <router-link to="">网站导航</router-link>
          <router-link to="">合作招商</router-link>
          <router-link to="">网站无障碍</router-link>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- 声明式导航 a标签换成 router-link  点击后跳到首页 -->
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <!-- 编程式导航 -->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      // 设置搜索栏内为空
      keyword: '',
    }
  },
  methods: {
    // 搜索按钮的回调函数  需要向search路由进行跳转
    goSearch () {
      // 路由传参
      // 第一种：字符串形式
      // this.$router.push('/search/' + this.keyword+"?k="+this.keyword.toUpperCase())

      // 判断如果地址还是当前地址的话不进行网页的跳转
      //  if(this.$route.path !== item.path){

      // 第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}/?k=${this.keyword.toUpperCase()}`)

      // 第三种：对象写法  在路由的地方需要写name
      // 合并 query 和 params 参数  也就是点击search之后  本身的params数据和搜索框的query参数合并
      if (this.$route.query) {
        let location = ({
          name: "search",
          params: { keyword: this.keyword || undefined },
          // query:{k:this.keyword.toUpperCase()}
        })
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    // 退出登陆:需要发请求 通知服务器退出登陆 清除项目中的数据
    async logout () {
      try {
        // 派发action
        await this.$store.dispatch('userLogout')
        // 退出后跳转到首页
        this.$router.push('./home')
      } catch (error) {
        alert(message.error)
      }
    }
  },
  mounted () {
    // 通过全局事件总线清除关键字   方法为 clear 在 Search 内调用 this.$bus.$emit('clear')
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
    // 在首页获取用户信息
    // this.$store.dispatch('getUserInfo')
  },
  computed: {
    // 用户名信息
    userName () {
      return this.$store.state.user.userInfo.name
    },

  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>