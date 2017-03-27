<template>
  <div style="width: 100%;">
    <!-- <title2 title="搜索条件"></title2> -->
<!--     <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.proName" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form> -->
    <el-button type="primary" @click="exportCsv">导出EXCEL</el-button>
    <el-button type="primary" @click="addUser">新增用户</el-button>

    <title2 title="用户列表"></title2>
    <el-button type="primary" @click="print">打印</el-button>
    
    <el-table
      :data="tableList"
      style="width: 99%"
      :row-class-name="$store.state.global.tableRowClassName"  v-loading.body="$store.state.global.ajax_loading" id="proTable"
      :row-style="{height: '50px', 'line-height': '50px', 'text-align': 'center'}"> 
      <el-table-column
        prop="userId"
        label="编号"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        :formatter="sexFormatter"
        align="center">
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="昵称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="生日"
        align="center">
      </el-table-column>
      <el-table-column
        prop="qq"
        label="qq"
        align="center">
      </el-table-column>
      <el-table-column
        prop="email"
        label="email"
        align="center">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        align="center">
      </el-table-column>
      <el-table-column
        prop="regTime"
        label="注册时间"
        align="center">
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block flex-x-end">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="param.endNum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totle">
      </el-pagination>
    </div>


    <el-dialog :title="dialogTitle" v-model="visible">
      <el-form :model="row">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import title2 from '../../component/public/title2.vue'
import dataAPI from '../../util/api.js'
import csvExport from '../../util/CsvExport.js'

  export default {
    components: { title2 },
    data() {
      return {
        totle: 0,
        currentPage: 1,
        tableList: [],
        formInline: {
          proName: '',
          cateID: ''
        },
        param: {
          pageNum: 0,
          pageSize: 10,
          orderField: 'userId'
        },
        proCates: [],
        dialogTitle: '',
        visible: false,
        formLabelWidth: '120px',
        form: {
          userName: '',
          userId: 0
        },
      }
    },    
    mounted() {
      this.getTableList(this.param)
    },
    methods: {
      exportCsv(){
        var fields = ['userId', 'userName', 'nickName', 'sex', 'birthday', 'qq', 'email', 'mobile', 'regTime'];
        var filedsName = ['编号', '用户名', '昵称', '性别', '生日', 'qq', 'email', '电话', '注册时间']
        csvExport(this.tableList, fields, filedsName, '123')
      },
      addUser() {
        this.dialogTitle = '新增用户' 
        this.visible = true       
      },
      handleEdit(index, row) {
        this.dialogTitle = '编辑用户' 
        this.form.userName = row.userName
        this.form.userId = row.userId
        this.visible = true 
      },
      cancelForm() {
        this.form.userName = ''
        this.form.userId = 0
        this.visible = false
      },
      handleDel(index, row) {
        var vm = this
        vm.form.userId = row.userId
        vm.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $.post(testAPI.deleteUser, {
            userId: vm.form.userId
          }) 
          .then(() => {
            vm.getTableList()
            scsMsg.call(vm, '删除成功!')
          })
          .fail(() => {
            serverError.call(vm)
          })                 
        })        
        .catch(() => {
          infoMsg.call(vm, '已取消删除')    
        });
      },
      submitForm() {
        var vm = this
        vm.form.userName = $.trim(vm.form.userName)
        if(!vm.form.userName) {
          errorMsg.call(vm, '用户名不能为空')
          return
        }
        if(vm.dialogTitle === '新增用户') {
          $.post(testAPI.creatUser, {userName: vm.form.userName})
          .then(vm.getTableList)
          .fail(function() {serverError.call(vm)})
        }else {
          $.post(testAPI.updateUser, {
            userId: vm.form.userId,
            userName: vm.form.userName
          })
          .then(vm.getTableList)
          .fail(function() {serverError.call(vm)})
        }
        setTimeout(vm.cancelForm, 0)
      },
      handleSizeChange(val) {
        var vm = this
        vm.param.pageSize = val
        vm.getTableList(vm.param)
      },
      handleCurrentChange(val) {
        var vm = this
        vm.currentPage = val
        vm.param.pageNum = val
        vm.getTableList(vm.param)
      },
      onSubmit() {
        var vm = this
        if(vm.formInline.cateID != '') {
          vm.param.CategoryId = "AND a.CategoryId=" + vm.formInline.cateID
        }
        vm.param.ProductName = vm.formInline.proName
      },
      getTableList(param) {
        var vm = this
        loading.call(vm)     
        $.post(testAPI.userList, param)
        .always(function() {
          closeLoading.call(vm)   
        })
        .then(function(d) {
          if(d && d.state === 0) {
            vm.tableList = d.aaData
            vm.totle = d.dataCount
          }          
        })
        .fail(function() {
          serverError.call(vm)
        })
      },
      print() {
        $("#proTable").printArea({
          mode: "popup",
          popTitle: "123",
          extraHead: '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>'
        })
      },
      sexFormatter(row, column) {
        return row.sex === true ? '男' : '女'
      },
      beforeDestroy() {
        console.log(11111111111111)
        console.log(this)
        closeLoading.call(this)   
      }
    },
  }
</script>

<style type="text/css">
.el-table__body tbody tr { height: 130px; }
</style>