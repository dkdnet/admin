<template>
  <div>
    <a class="side-bar-title" href="#">
      <span class="logo-lg">
        <i class="el-icon-star-on"></i>&nbsp;
        <b>基础框架</b>
      </span>
    </a>
    <el-scrollbar wrapClass="scrollbar-wrapper">
      <side-menu></side-menu>
    </el-scrollbar>
  </div>

</template>

<script>
  import SideMenu from '@/components/side_menu'

  export default {
    components: { SideMenu },
    computed: {}
  }
</script>
<style scoped>

  .side-bar-title {
    color: #fff !important;
    display: block;
    background-color: #373d41;
    /*-webkit-transition: width 0.3s ease-in-out;*/
    /*transition: width 0.3s ease-in-out;*/
    /*float: left;*/
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    width: 230px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0 15px;
    font-weight: 300;
    overflow: hidden;
    text-decoration: none;
  }

  .el-scrollbar {
    height: calc(100vh - 50px);
  }

  .el-menu {
    margin-bottom: 100px;
    box-sizing: border-box;
  }

  .app-wrapper.hideSidebar .side-bar-title {
    padding-left: 15px;
  }

</style>

<style>
  .scrollbar-wrapper.el-scrollbar__wrap {
    background-color: #333744;;
  }

  .el-menu-item, .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }

  .el-icon-star-on {
    color: #F56C6C;
  }
</style>
