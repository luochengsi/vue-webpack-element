<template>
  <div style="width: 100%;">
  	<h2>个人头像</h2>
    <el-upload
      class="upload-box"
      action="//jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :file-list="fileList"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> 
    <el-button size="small" type="success" @click="save">保存头像</el-button>    
  </div>
</template>

<script>
import dataAPI from '../../util/api.js'
  export default {
    data() {
      return {
        fileList: [{url: ''}]
      };
    },
    methods: {
      beforeUpload(file) {
        var token = this.$store.state.user.token, vm = this
        var flag = false 
        if(token) {
          $.ajax({url: testAPI.authToken, async: false, type: 'POST', data: {token: token}})
            .done(function(d){
              if(d && d.success) {
                flag = true
              }else {
                vm.$msgbox({
                  title: '提示',
                  message: 'token已过期,请重新登陆',
                  type: 'error'
                })
              }
            })
            .fail(function(){
              serverError.call(vm)
            }); 
        }
        return flag
      },
      handleRemove(file, fileList) {
        this.fileList = [{url: PIC_API + DEFAULT_HEAD_PIC}]
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList) {
        this.fileList = [{url: file.url}]
      },
      save() {
        var vm = this
        vm.$confirm('确认保存?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.$store.dispatch('update_headPic', {url: vm.fileList[0].url}).then(function(){
            vm.$message({
              type: 'success',
              message: '保存成功!'
            });
          })          
        }).catch(() => {});        
      }
    },
    mounted() {
      var vm = this
      vm.fileList[0].url = vm.$store.state.user.headPic
    }
  }
</script>