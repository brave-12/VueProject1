// 对外暴露一个数据
// 存储token
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}

// 获取token
export const getToken = ()=>{
    // 需要写一个 return 返回数据
    return localStorage.getItem('TOKEN')
}

// 清除本地存储的token
export const removeToken = ()=>{
    return localStorage.removeItem('TOKEN')
}