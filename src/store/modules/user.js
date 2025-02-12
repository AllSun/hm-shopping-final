import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  // 这种生命方式是实例专属的，提供数据字段
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  // 提供修改数据字段的方法
  mutations: {
    // 所有mutations的第一个参数，都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  // 提供异步操作
  actions: {
    logout (context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})

      // 购物车信息要重置 (跨模块调用 mutation)  cart/setCartList
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  // 基于state派生出来的属性
  getters: {}
}
