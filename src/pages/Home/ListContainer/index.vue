<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播  因为和Floor的轮播图样式相同所以写一个公共组件传值调用-->
        <Carousel :list="bannerList"/>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">商城快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[公告]</span>备战开学季 全民半价购数码
            </li>
            <li>
              <span class="bold">[特惠]</span>备战开学季 全民半价购数码
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Swiper from 'swiper'
export default {
  // 组件名称
  name: '',
  mounted () {
    // 派发action：通过vuex发起ajax请求，将数据仓储在仓库当中
    this.$store.dispatch('getBannerList')
    // Swiper 不能放在这，mouned一般在初始化页面完成后，再对dom操作，而结构和数据都还没获取，Swiper会没有效果
    // 笨方法通过定时器实现 Swiper 延时
    // setTimeout(() => {
    //   var mySwiper = new Swiper('.swiper-container', {
    //     disableOnInteraction:true,
    //     loop: true, // 循环模式选项，true滑动图片可以循环
    //     autoplay:true, // 自动切换，默认等3s
    //     // 如果需要分页器
    //     pagination: {
    //       el: '.swiper-pagination',
    //       // 点击小球的时候可以切换图片
    //       clickable:true
    //     },
    //     // 如果需要前进后退按钮

    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev',
    //     },
    //   })
    // }, 200);

  },
  watch: {
    // 监听 bannerList 数据的变化：因为这条数据发生过变化---由空数组变为数组里面有四个元素
    // v-for执行完毕，才有结构
    // nextTick 在下次DOM更新也就是 循环结束之后 执行延迟回调。在 修改这个数据之后 立即执行这个方法获取更新 DOM

    // bannerList: {
    //   immediate:true,
    //   handler (newValue, oldValue) {
    //     // 通过watch监听bannerList属性的属性值的变化
    //     this.$nextTick(() => {
    //       // 当执行这个回调之后，服务器的数据一定回来了
    //       var mySwiper = new Swiper(
    //         this.$refs.mySwiper,
    //         {
    //         loop: true, // 循环模式选项，true滑动图片可以循环
    //         autoplay: true, // 自动切换，默认等3s
    //         // 如果需要分页器
    //         pagination: {
    //           el: '.swiper-pagination',
    //           // 点击小球的时候可以切换图片
    //           clickable: true
    //         },
    //         // 如果需要前进后退按钮
    //         navigation: {
    //           nextEl: '.swiper-button-next',
    //           prevEl: '.swiper-button-prev',
    //         },
    //       })
    //     });
    //   },
    // }

  },
  computed:{
    ...mapState({
      bannerList: state => state.home.bannerList
    })
  }

}
</script>

<style scoped lang="less">

.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
      
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>