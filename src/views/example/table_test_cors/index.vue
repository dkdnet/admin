<template id="template-home">
  <div id="root">
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>


    <el-row>
      <el-button round>圆角按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </el-row>

    <ul class="clearfix">
      <li v-if="imgs.length>0" v-for='(item ,index ) in imgs'>
        <img :src="item">
      </li>
      <li style="position:relative" v-if="imgs.length>=6 ? false : true">
        <img :src="imgUrl"><input class="upload" @change='add_img' type="file">
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'app',
    components: {},
    computed: {
      // ...mapGetters({
      //
      // }),

    },
    data: function() {
      return {
        imgUrl: '',
        imgs: [],
        imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg'
        },
        url1: 'http://localhost:3333/api/user',
        url2: 'http://localhost:3333/api/users',
        url3: 'http://localhost:3333/profile/?a=1&b=2'
      }
    },
    methods: {
      // ...mapMutations({
      //     // toggleDevice: types.TOGGLE_DEVICE,
      //     // toggleSidebar: types.TOGGLE_SIDEBAR,
      //     // toggleSidebarShow: types.TOGGLE_SIDEBAR_SHOW,
      // }),
      // ...mapActions({
      //     // changeCurrentMenu: 'changeCurrentMenu' // 映射 this.changeCurrentMenu() 为 this.$store.dispatch('changeCurrentMenu')
      // })

      getList() {
        axios.get(this.url2, {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
          .then(function(response) {
            console.log(response)
          })
          .catch(function(response) {
            console.log(response)
          })
      },
      newUser() {
        axios.post(this.url1, {
          name: '记者',
          user_name: 'reporter'
        })
          .then(function(response) {
            console.log(response)
          })
          .catch(function(response) {
            console.log(response)
          })
      },
      add_img(event) {
        // const reader = new FileReader()
        const img1 = event.target.files[0]
        const type = img1.type // 文件的类型，判断是否是图片
        const size = img1.size // 文件的大小，判断图片的大小
        if (this.imgData.accept.indexOf(type) === -1) {
          alert('请选择我们支持的图片格式！')
          return false
        }
        if (size > 3145728) {
          alert('请选择3M以内的图片！')
          return false
        }
        const form = new FormData()
        form.append('avatar', img1, img1.name)
        axios.post(this.url3, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
          console.log(response.data)
          this.imgUrl = 'http://localhost:3000/' + response.data.filePath
          // uri = response.data.url
          // reader.readAsDataURL(img1);
          // var that=this;
          // reader.onloadend=function(){
          //     that.imgs.push(uri);
          // }
        }).catch(error => {
          console.log(error)
          alert('上传图片出错！')
        })
      }

    },
    watch: {},
    beforeMount() {

    },
    mounted() {
      this.newUser()
      this.getList()
    },
    created() {

    }
  }
</script>

<style lang="scss">

  body {

    background: #fff;
    p {
      color: blue;
    }
  }
</style>
