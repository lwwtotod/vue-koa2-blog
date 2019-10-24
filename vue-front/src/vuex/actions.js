import Vue from 'vue'
import api from '../api'
import router from '../router'
import MsgAlert from './MsgAlert'
export default {
    // 后台注册
    UserReg({ commit }, data) {
        api.localReg(data)
            .then(res => {
                if (res.data.success) {
                    commit('USER_REG', res.data.token)
                    router.replace({ path: '/login' })
                } else {
                    //  上一个catch处理了MongoError
                    MsgAlert(res.data.info)
                }
            })
            .catch((error) => {
                MsgAlert(error.toString())
            })
    },
    //  后台登录
    UserLogin({ commit }, data) {
        api.localLogin(data)
            .then(res => {
                if (res.data.success) {
                    // 找到用户
                    // sessionStorage.setItem('jwt', res.data.token);
                    commit('USER_SIGNIN', res.data.token)
                    router.replace({ path: '/admin/articleList' })
                } else {
                    // 没找到用户或者密码不对
                    MsgAlert(res.data.info)
                }
            })
            .catch(error => {
                // 一般服务器连接不上这里就会报网络错误
                MsgAlert(error.toString())
            })
    },
    UserLogout({ commit }) {
        commit('USER_SIGNOUT');
        router.push({ path: '/login' });
    },
    showProgress({ commit }, number) {
        commit('SHOW_PROGRESS', number)
    },
    changeHeadLine({ commit }, headline) {
        commit('HEAD_LINE', headline)
    }
}
