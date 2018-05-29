import Cookies from 'js-cookie'
// import { getSessionKey } from '@/common/utils'
import { getMenuList } from '@/api/side_menu'
import { getCurrentMenu, getSessionKey } from '@/utils/tools'
import testData from '@/api/test_data'

const app = {
  state: {
    menuList: {},
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      collapsed: getSessionKey('state.sidebar.collapsed', 'false') === 'true',
      show: getSessionKey('state.sidebar.show', 'true') === 'true',
      withoutAnimation: true
    },
    device: 'desktop',
    currentMenus: []
  },
  mutations: {
    // TOGGLE_SIDEBAR: state => {
    //   if (state.sidebar.opened) {
    //     Cookies.set('sidebarStatus', 1)
    //   } else {
    //     Cookies.set('sidebarStatus', 0)
    //   }
    //   state.sidebar.opened = !state.sidebar.opened
    //   state.sidebar.withoutAnimation = false
    // },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    LOAD_MENU: (state, menu) => {
      state.menuList = menu
      console.log('################  设置menulist     ##########################')
      console.log(state.menuList)
    },
    LOAD_CURRENT_MENU: (state, menu) => {
      state.currentMenus = menu
    },
    TOGGLE_SIDEBAR: (state, collapsed) => {
      if (collapsed == null) collapsed = !state.sidebar.collapsed
      state.sidebar.collapsed = collapsed
      state.sidebar.opened = !collapsed

      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 0)
      } else {
        Cookies.set('sidebarStatus', 1)
      }

      window.sessionStorage.setItem('state.sidebar.collapsed', collapsed)
    },
    TOGGLE_SIDEBAR_SHOW: (state, show) => {
      if (show == null) state.sidebar.show = !state.sidebar.show
      else {
        state.sidebar.show = show
      }
      window.sessionStorage.setItem('state.sidebar.show', state.sidebar.show)
    }
  },
  actions: {
    // ToggleSideBar: ({ commit }) => {
    //   commit('TOGGLE_SIDEBAR')
    // },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    LoadMenuList({ commit }) {
      return new Promise((resolve, reject) => {
        getMenuList(1).then(response => {
          const data = response.data
          commit('LOAD_MENU', data)
          resolve()
        }).catch(error => {
          console.log('##################### get MenuList #########################3')
          console.log(testData.menuList)
          commit('LOAD_MENU', testData.menuList)
          // reject(error) // 抛出错误，测试时注掉以便js继续执行
          console.log(error)
        })
      })
    },
    // loadMenuList: ({ commit }) => {
    //   console.log('*********************获取菜单列表************************')
    //   Vue.axios.get(api.SYS_MENU_LIST).then(res => {
    //     commit(types.LOAD_MENU, res.data);
    //   }).catch(exp => commit(types.LOAD_MENU, defaultValue.menuList));
    // },
    changeCurrentMenu: ({ state, commit }, { path, matched, fullPath }) => {
      const a = getCurrentMenu(fullPath, state.menuList)
      commit('LOAD_CURRENT_MENU', a.reverse())
    }

  }
}

export default app
