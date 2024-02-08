<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派|事件代理     套一个div当鼠标离开三级联动 但是还在全部商品分类的时候-->
            <!-- 对应背景颜色不会消失   再移出全部商品分类的时候背景颜色才消失 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画   name 命名之后名字变为 sort-enter-to -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <!-- 方法三：@click="goSearch" 编程式导航 + 事件委派 -->
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 从 categoryList 中根据 categoryId 来遍历数据-->
                            <!-- :class="{cur:currentIndex==index}" 当相等的时候动态添加一个类cur -->
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                                :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <!-- 方法一a标签换成 router-link 路由式导航 -->
                                    <!-- <router-link to="search">{{c1.categoryName}}</router-link> 但是会卡顿-->
                                    <!-- 方法2：绑定 @click="goSearch" -->
                                    <!-- 设置自定义属性:data-categoryName   data-只是在命名的时候添加  使用的时候下后面的即可 -->
                                    <!--   :data-category1Id(其中的1用于区分一二三级分类)-->
                                    <a :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二级，三级分类 -->
                                <!-- 通过js完成css的hover样式效果 -->
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <!-- 换成 router-link -->
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>

                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">百货购物</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    // lodash 可以实现防抖和节流  用_是全引入   throttle(节流)和debounce(防抖)按需加载就好 
    import { throttle } from 'lodash'
    export default {
        // 组件名称
        name: 'TypeNav',
        data() {
            return {
                // 存储用户鼠标移到哪一个一级分类    index 为0到15
                currentIndex: -1,
                show: true
            }
        },
        // 组件挂载完毕  可以向服务器发请求
        mounted() {
            
            // 当组件挂载完毕，让show属性变为false   如果是不是Home路由组件，将typeNav隐藏
            if (this.$route.path != '/home') {
                this.show = false
            }
        },
        // TypeNav 拿到数据
        computed: {
            ...mapState({
                // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次 
                // 注入参数state,其实即为大仓库中的数据
                categoryList: (state) => state.home.categoryList
            })
        },
        // 防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，如果连续快速的触发,只会执行最后一次
        // 节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
        methods: {
            // 鼠标进入修改响应式数据currentIndex属性
            changeIndex: throttle(function (index) {
                // index:鼠标移到某一个一级分类的元素的索引值
                this.currentIndex = index
                // 正常情况(用于慢慢的操作)：鼠标进入，每一个一级分类都应该触发鼠标进入事件，
                // 非正常情况(用户操作很快)：本身全部的一级分类都应该触发鼠标进入事件，但是只有部分触发了
                // 就是由于用于行为过快，导致浏览器反应不过来。如果当前回调有大量业务，就可能出现卡顿

            }),
            // 一级分类鼠标移除的事件回调  因为只用到一次因此 currentIndex = -1 直接写在事件里面
            // leaveIndex(){
            //     this.currentIndex = -1
            // },
            goSearch(event) {
                // this.$router.push('/search')
                // 最好的解决办法：编程式导航 + 事件委派[h3、dt、dl、em]的事件委派给父亲节点

                // 点击a标签的时候。才会进行路由跳转[怎么确定点击的一定是a标签]，怎么确定点击的是一级还是二级a标签
                // 获取当前事件的节点，额外定义一个自定义节点[一定是a标签上]
                // 节点有一个属性dataset属性，可以获取节点自定义属性与属性值
                let element = event.target
                // 浏览器解析 categoryName,category1Id 字母全变为小写
                // categoryname 区分是不是a标签   category1id 里的数字是代表在几级目录
                let { categoryname, category1id, category2id, category3id } = element.dataset
                // 如果标签身上拥有 categoryName 则一定在a标签   点击其他地方不返回结果
                if (categoryname) {
                    // 整理路由跳转的参数
                    let location = { name: 'search' }
                    let query = { categoryName: categoryname }
                    // 判断是一二三级分类的哪个
                    if (category1id) {
                        query.category1Id = category1id
                        // alert(123)
                    } else if (category2id) {
                        query.category2Id = category2id
                    } else {
                        query.category3Id = category3id
                    }
                    // 判断：如果路由跳转的时候，带有params参数，捎带着传递过去
                    location.query = query
                    location.params = this.$route.params
                    // 路由跳转并且传参
                    this.$router.push(location)
                    // 自己想的：可以通过这种方法让网页从home跳转到search的时候三级路由会消失
                    this.$router.go()

                }

            },
            // 当鼠标移入的时候，然后商品分类列表进行展示
            enterShow() {
                // 不需要判断 /Home   判断/search效果即可
                if (this.$route.path!='/home') {
                    this.show = true
                }
            },
            // 当鼠标离开的时候，让商品分类列表进行隐藏
            leaveShow() {
                this.currentIndex = -1
                // 判断如果是Search路由组件的时候才会执行
                if (this.$route.path!='/home') {
                    this.show = false
                }

            }
        },
    }
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {

                    // 可以直接在item下面增加 .item:hover{background:skyblue} 变背景颜色
                    .item {
                        h3 {
                            cursor: pointer;
                            line-height: 27px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }
                        .item:hover{background:skyblue}

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            cursor: pointer;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // 控制二三级面板出现
                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }

                    .cur {
                        background-color: skyblue;
                    }
                }
            }
            // 过渡动画的样式   sort- 是在上面用name命名   默认是 v-
                // 过渡动画开始状态(进入)
                .sort-enter{
                    height: 0px;
                    
                }
                // 定义动画事件、速率
                .sort-enter-active{
                    transition: all .3s linear;
                }
                // 过渡动画的结束状态
                .sort-enter-to{
                    height: 461px;
                    
                }
                
        }
    }
</style>