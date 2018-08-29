import api from '@/api'
import router from '@/router'

export default {
  // 后台注册
  UserSignUp: async ({
    dispatch
  }, data) => {
    return await api.localReg(data)
  },
  //  admin登录
  UserLogin: async ({
    dispatch
  }, data) => {
    return await api.localLogin(data)
  },

  UserLogout({
    commit
  }) {
    commit('USER_SIGNOUT');
    router.push({
      path: '/login'
    });
  },
  showProgress({
    commit
  }, number) {
    commit('SHOW_PROGRESS', number)
  },
  changeHeadLine({
    commit
  }, headline) {
    commit('HEAD_LINE', headline)
  }
}
