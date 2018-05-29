<template>
  <aside class='main-sidebar'
         :class='{ showSlide: sidebar.show, hideSlide: !sidebar.show, expandSide:(!sidebar.collapsed)}'>
    <div v-if='(!sidebar.collapsed)'>
      <div class='sidebar'>
        <el-menu :default-active='onRoutes'
                 :default-openeds='onRouteKeys'
                 class='el-menu-style'
                 theme='dark'
                 :textColor='textColor'
                 :backgroundColor='backgroundColor'
                 router :collapse='sidebar.collapsed' @select='handleSelect'>
          <template v-for='item in menuList'>
            <sub-menu :param='item'></sub-menu>
          </template>
        </el-menu>
      </div>
    </div>
    <div class='sidebar' v-else>
      <el-menu :default-active='onRoutes'
               class='el-menu-style'
               theme='dark'
               :textColor='textColor'
               :backgroundColor='backgroundColor'
               router :collapse='sidebar.collapsed' @select='handleSelect'>
        <template v-for='item in menuList'>
          <sub-menu :param='item'></sub-menu>
        </template>
      </el-menu>
    </div>
  </aside>
</template>
<script>
  import SubMenu from '../sub_menu'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  // import types from '../store/mutation-types'
  // import { store } from '@/store'
  import ElMenu from '@/components/menu'

  export default {
    props: {
      show: Boolean
    },
    data() {
      return {
        // menuList: {}
        backgroundColor: 'rgb(48, 65, 86)',
        textColor: '#ffffff'
      }
    },
    components: {
      SubMenu,
      ElMenu
    },
    computed: {
      ...mapGetters({
        sidebar: 'sidebar',
        menuList: 'menuList',
        device: 'device'
      }),
      onRoutes() {
        return this.$route.path
      },
      onRouteKeys() {
        const getParentArray = (path, ms, kas = []) => {
          if (ms && ms.length > 0) {
            for (let k = 0, length = ms.length; k < length; k++) {
              if (path === ms[k].href) {
                kas.push(ms[k].href)
                break
              }
              const i = kas.length
              if (ms[k].children && ms[k].children.length > 0) {
                getParentArray(path, ms[k].children, kas)
              }
              if (i < kas.length) {
                kas.push(ms[k].href)
              }
            }
          }
          return kas.reverse()
        }
        return getParentArray(this.$route.path, this.menuList)
      },
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'menuList'
      ])
    },
    mounted() {
      // let route = this.$route
      // console.log(route)
      // if (route.name) {
      //   this.shouldExpandMatchItem(route)
      // }
    },
    created() {
      this.load()
    },
    methods: {
      handleSelect() {
        // if (this.device.isMobile) {
        //   this.toggleSidebarShow(false)
        // }
      },
      ...mapMutations({
        // toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW
      }),
      ...mapActions({
        load: 'LoadMenuList' // 映射 this.load() 为 this.$store.dispatch('loadMenuList')
      })
    }
  }
</script>
<style scoped>

  .showSlide {
    /*animation-duration: .2s;*/
    /*animation-name: slideInLeft;*/
  }

  .hideSlide {
    /*animation-duration: .2s;*/
    /*animation-name: slideOutLeft;*/
  }

  /*已把动画注掉提高效率*/
  .main-sidebar {
    background-color: #ffffff;
    /*position: fixed;*/
    top: 50px;
    left: 0;
    bottom: 0;
    height: calc(100vh - 50px);
    width: 44px;
    z-index: 810;
    /*-webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;*/
    /*-moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;*/
    /*-o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;*/
    /*transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;*/
  }

  .expandSide {
    width: 230px;
    background-color: #333744;

  }

  .el-menu-style,
  .el-menu-style .el-menu {
    background-color: #333744;
  }

  .el-menu-style .el-menu-item:hover,
  .el-menu-style .el-submenu__title:hover {
    background-color: #eeeeee !important;
  }

  .el-menu-style .el-submenu .el-menu-item {
    height: 45px;
    line-height: 45px;
  }

  .el-menu-style .el-menu-item,
  .el-menu-style .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  .main-sidebar .el-menu--collapse {
    width: 44px;
  }

  .main-sidebar .el-menu--collapse > .el-menu-item,
  .main-sidebar .el-menu--collapse > .el-submenu > .el-submenu__title {
    padding-left: 15px !important;
  }

  .vue-scrollbar {
    background-color: #333744 !important;
    height: calc(100vh - 50px)
  }

  .main-sidebar .el-scrollbar__bar.is-vertical {
    display: none;
  }

  .main-sidebar {
    background-color: #333744;
  }

  .sidebar {
    min-height: 450px;
  }

  .el-submenu__title {
    color: #bfcbd9;
  }

  .el-menu-item {
    color: #bfcbd9;
    border: 0;
  }

  .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
    color: #20a0ff !important;
  }

  .el-menu-style .el-menu-item:hover, .el-menu-style .el-submenu__title:hover {
    background-color: #1e282c !important;
  }


</style>
