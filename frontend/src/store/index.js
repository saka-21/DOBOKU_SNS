import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/services/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 認証情報
const authModule = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    username: '',
    isLoggedIn: false,
    id: '',
  },
  getters: {
    username: state => state.username,
    isLoggedIn: state => state.isLoggedIn,
    id: state => state.id,

  },
  mutations: {
    set(state, payload) {
      state.username = payload.user.username
      state.id = payload.user.id
      state.isLoggedIn = true
    },
    clear(state) {
      state.username = ''
      state.isLoggedIn = false
      state.id = false
    }
  },
  actions: {
    /**
     * ログイン
     */
    login(context, payload) {
      return api.post('/auth/jwt/create/', {
        'username': payload.username,
        'password': payload.password
      })
      .then(response => {
        // 認証用トークンをlocalStorageに保存
        localStorage.setItem('access', response.data.access)
        // ユーザー情報を取得してstoreのユーザー情報を更新
        return context.dispatch('reload')
          .then(user => user)
      })
      .catch(error => {
        console.log(error)
      })
    },
    /**
     * ログアウト
     */
    logout(context) {
      // 認証用トークンをlocalStorageから削除
      localStorage.removeItem('access')
      // storeのユーザー情報をクリア
      context.commit('clear')
    },
    /**
     * ユーザー情報更新
     */
    reload(context) {
      return api.get('/auth/users/me/')
      .then(response => {
        const user = response.data
        // storeのユーザー情報を更新
        context.commit('set', {
            user: user
          })
          return user
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

// グローバルメッセージ
const messageModule = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    error: '',
    warnings: [],
    info: ''
  },
  getters: {
    error: state => state.error,
    warnings: state => state.warnings,
    info: state => state.info
  },
  mutations: {
    set(state, payload) {
      if (payload.error) {
        state.error = payload.error
      }
      if (payload.warnings) {
        state.warnings = payload.warnings
      }
      if (payload.info) {
        state.info = payload.info
      }
    },
    clear(state) {
      state.error = ''
      state.warnings = []
      state.info = ''
    }
  },
  actions: {
    /**
     * エラーメッセージ表示
     */
    setErrorMessage(context, payload) {
      context.commit('clear')
      context.commit('set', {
        'error': payload.message
      })
    },
    /**
     * 警告メッセージ（複数）表示
     */
    setWarningMessages(context, payload) {
      context.commit('clear')
      context.commit('set', {
        'warnings': payload.messages
      })
    },
    /**
     * インフォメーションメッセージ表示
     */
    setInfoMessage(context, payload) {
      context.commit('clear')
      context.commit('set', {
        'info': payload.message
      })
    },
    /**
     * 全メッセージ削除
     */
    clearMessages(context) {
      context.commit('clear')
    }
  }
}

// ユーザー情報
const userModule = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    id: '',
    name: '',
    introduction: '',
    icon_image: '',
    home_image: '',
  },
  getters: {
    id: state => state.id,
    name: state => state.name,
    introduction: state => state.introduction,
    icon_image: state => state.icon_image,
    home_image: state => state.home_image,
    getUser: state => {
      return {
        id: state.id,
        name: state.name,
        introduction: state.introduction,
        icon_image: state.icon_image,
        home_image: state.home_image,
      }
    }
  },
  mutations: {
    set(state, payload) {
      state.id = payload.user.id
      state.name = payload.user.name
      state.introduction = payload.user.introduction
      state.icon_image = payload.user.icon_image
      state.home_image = payload.user.home_image
    },
    clear(state) {
      state.id = ''
      state.name = ''
      state.introduction = ''
      state.icon_image = ''
      state.home_image = ''
    }
  },
  actions: {
    load(context, payload) {
      return api.get('api/v1/users/' + payload.id + '/')
        .catch(error => {
          console.log(error)
        })
        .then(response => {
          console.log('あいうえお')
          console.log(response.data)
          alert('user/load : ' + payload.user_id)
          const user = response.data
          // storeのユーザー情報を更新
          context.commit('set', {
            user: user
          })
          return user
        })
    },
    logout(context) {
      // storeのユーザー情報をクリア
      context.commit('clear')
    }
  }
}


const store = new Vuex.Store({
  modules: {
    auth: authModule,
    message: messageModule,
    user: userModule
  },
  plugins: [createPersistedState({
    key: 'example',
    storage: window.sessionStorage
  })]
})

export default store
