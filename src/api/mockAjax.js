// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条      start:进度条开始  done：进度条结束
import nprogress from 'nprogress'
// 引入进度条样式  如果要修改样式或者颜色可以在这个文件里面的 .bar的background修改颜色
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create  去创建一个axios实例
// 2.request就是axios  只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径当中会额外带有 /mock
    baseURL:"/mock",
    // 请求超时的时间 5s
    timeout:5000,
})

// 请求拦截器：在发请求之前  请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // 进度条开始动
    nprogress.start()
    // config:配置对象，对象里面有一个属性，headers请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条开始结束
    nprogress.done()
    // 成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
},(error)=>{
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('faile'))
})


// 对外暴露
export default requests