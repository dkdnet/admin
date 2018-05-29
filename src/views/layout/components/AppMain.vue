<template>
  <section class="app-main">
    <el-scrollbar tag="div" wrapClass="content-scrollbar">
      <breadcrumb class="breadcrumb"></breadcrumb>
      <transition name="fade" mode="out-in">
        <!-- <router-view :key="key"></router-view> -->
        <router-view></router-view>
      </transition>
    </el-scrollbar>

  </section>
</template>

<script>
  import Breadcrumb from '@/components/breadcrumb'

  export default {
    name: 'AppMain',
    computed: {
      // key() {
      //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      // }
    },
    components: {
      Breadcrumb
    }
  }
</script>
<style>
  .content-scrollbar::-webkit-scrollbar {
    display: none
  }
  .content-scrollbar{
    /*padding: 20px;*/
    box-sizing: border-box;
  }

  .breadcrumb{
    padding: 0 10px 0;
  }

  .content-scrollbar {
    height: calc(100vh - 50px);
  }
  .content-wrapper{
    margin: 0 35px 0 20px;
  }
</style>
