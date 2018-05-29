<template>
  <div class="conent-wrapper">
    <h1>模板</h1>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {}
    },

    computed: {

    },

    watch: {

    },

    methods: {

    },

    beforeCreate() {
      console.group('beforeCreate 创建前状态===============》')
    },
    created() {
      console.group('created 创建完毕状态===============》')
    },
    beforeMount() {
      console.group('beforeMount 挂载前状态===============》')
    },
    mounted() {
      console.group('mounted 挂载结束状态===============》')
    },
    beforeUpdate() {
      console.group('beforeUpdate 更新前状态===============》')
    },
    updated() {
      console.group('updated 更新完成状态===============》')
    },
    beforeDestroy() {
      console.group('beforeDestroy 销毁前状态===============》')
    },
    destroyed() {
      console.group('destroyed 销毁完成状态===============》')
    }

  }
</script>

<style lang="scss" scoped>
  .content-wrapper {

  }
</style>
