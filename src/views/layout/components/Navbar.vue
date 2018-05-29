<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="navbar-wrapper">
      <hamburger class="hamburger-container" :toggleClick="toggleMenu" :isActive="sidebar.opened"></hamburger>
      <!--<breadcrumb></breadcrumb>-->
      <template v-for="center in centers">
        <el-button type="text">{{center}}</el-button>
      </template>

      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </el-menu>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import Hamburger from '@/components/hamburger'

  export default {
    data() {
      return {
        centers: [
          '中心1',
          '中心2',
          '中心3',
          '中心4',
          '中心5',
          '中心6',
          '中心7'
        ]
      }
    },
    components: {
      // Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },

    methods: {
      toggleMenu() {
        // this.$store.dispatch('ToggleSideBar')
        // toggleMenu(!sidebar.collapsed,device.isMobile)
        console.log(this.toggleSidebar)
        this.toggleSidebar()
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      },
      ...mapMutations({
        toggleSidebar: 'TOGGLE_SIDEBAR',
        toggleSidebarShow: 'TOGGLE_SIDEBAR_SHOW'
      })
      // ...mapMutations(['TOGGLE_SIDEBAR'])

    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    background-color: #373d41;
    color: #fff !important;
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
      margin-right: 10px;
    }
    .el-button {
      margin-left: 20px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 10px;
        position: relative;
        .user-avatar {
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>

