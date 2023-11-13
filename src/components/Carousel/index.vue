<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
                <!-- 轮播图 -->
                <img :src="carousel.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    // 引入swiper
    import Swiper from 'swiper'
    export default {
        // 组件名称
        name: 'Carousel',
        // 组件参数 接收来自父组件的数据
        props: ['list'],

        // 侦听器
        watch: {
            // 因为想让Floor和listContainer的写法风格一样，所以放在watch里面
            list: {
                // 不管数据有没有变化 立即监听一次
                immediate: true,
                handler() {
                    // 无法监听到数据变化，因为list是通过父组件传过来的，并不是自己变化
                    this.$nextTick(() => {
                        // 当执行这个回调之后，服务器的数据一定回来了
                        var mySwiper = new Swiper(
                            this.$refs.cur,
                            {
                                loop: true, // 循环模式选项，true滑动图片可以循环
                                autoplay: true, // 自动切换，默认等3s
                                // 如果需要分页器
                                pagination: {
                                    el: '.swiper-pagination',
                                    // 点击小球的时候可以切换图片
                                    clickable: true
                                },
                                // 如果需要前进后退按钮
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                },
                            })
                    });
                }
            },
        },

    }
</script>

<style scoped>

</style>