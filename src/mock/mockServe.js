// 先引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入(JSON数据格式没有对外暴露 但是可以引入)
// webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数请求地址   第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner})  // 模拟首页大的轮播图
Mock.mock("/mock/floor",{code:200,data:floor})  // 






// mock（模拟数据）数据需要使用到mockjs模块，可以帮助我们模拟数据。
// 注意：mockjs【并非mock.js mock-js】  http://mockjs.com/  官方地址
// 第一步:安装依赖包mockjs
// 第二部：在src文件夹下创建一个文件夹，文件夹mock文件夹。
// 第三步:准备模拟的数据
// 把mock数据需要的图片放置于public文件夹中！  比如:listContainer中的轮播图的数据
// [
//    {id:1,imgUrl:'xxxxxxxxx'}, 
//    {id:2,imgUrl:'xxxxxxxxx'}, 
//    {id:3,imgUrl:'xxxxxxxxx'}, 
// ]

// 第四步：在mock文件夹中创建一个server.js文件
// 注意：在server.js文件当中对于banner.json||floor.json的数据没有暴露，但是可以在server模块中使用。
// 对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。

// 第五步:通过mock模块模拟出数据
// 通过Mock.mock方法进行模拟数据

// 第六步:回到入口文件，引入serve.js
// mock需要的数据|相关mock代码页书写完毕，关于mock当中serve.js需要执行一次，
// 如果不执行，和你没有书写一样的。

// 第七步:在API文件夹中创建mockRequest【axios实例：baseURL:'/mock'】
// 专门获取模拟数据用的axios实例。
// 在开发项目的时候：切记，单元测试，某一个功能完毕，一定要测试是否OK