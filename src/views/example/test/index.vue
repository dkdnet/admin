<template>
  <div class="content-wrapper">
    <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">hover 激活</el-button>
    </el-popover>

    <el-popover
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">click 激活</el-button>
    </el-popover>

    <el-popover
      ref="popover"
      placement="right"
      title="标题"
      width="200"
      trigger="focus"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    </el-popover>
    <el-button v-popover:popover>focus 激活</el-button>
    <dic-row>
      <h4>基于element的el-row组件打造我们自己的dic-row组件</h4>
      <span>测试文字 颜色会改为dic-row组件里样式的颜色红色</span>
      <el-button type="text">测试文字按钮 还是element的默认颜色</el-button>
    </dic-row>

  </div>
</template>

<script>
  import DicRow from '@/components/Row/'
  export default {
    name: 'index',
    components: {
      DicRow
    }
  }
</script>

<style lang="scss" scoped>

</style>
