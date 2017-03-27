<template>
  <div style="width: 100%;">
    <title2 title="搜索条件"></title2>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.proName" placeholder="商品名"></el-input>
      </el-form-item><el-form-item>
        <el-select v-model="formInline.cateID" filterable placeholder="分类">
          <el-option
            v-for="item in proCates"
            :label="item.CateName"
            :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item><el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="exportCsv">导出EXCEL</el-button>

    <title2 title="商品列表"></title2>
    <el-button type="primary" @click="print">打印</el-button>
    
    <el-table
      :data="tableProList"
      style="width: 99%"
      :row-class-name="$store.state.global.tableRowClassName"  v-loading.body="$store.state.global.ajax_loading" id="proTable"
      :row-style="{height: '50px', 'line-height': '50px', 'text-align': 'center'}">  
      <el-table-column v-for="d in colList"
        :prop="d.prop"
        :label="d.label"
        align="center">
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
        colList: [
          {prop: 'Code', label: '编号'},
          {prop: 'ProductName', label: '商品名'},
          {prop: 'pricecount', label: '价格'},
          {prop: 'StoreName', label: '店铺'},
          {prop: 'CateName', label: '分类'},
          {prop: 'datastatus', label: '上架状态'},
          {prop: 'udframe', label: '运费模板'},
          {prop: 'proNum', label: '规格数量'}
        ],
        totle: 0,
        currentPage: 1,
        tableProList: [],
        formInline: {
          proName: '',
          cateID: ''
        },
        param: {
          udframe: '',
          CategoryId: '',
          storeNameKey: '',
          storeNameValue: '',
          storedian: '',
          statrNum:0,
          endNum:10,
          ProductName: ''
        },
        proCates: []
      }
    },
    methods: {
      exportCsv(){
        var fields = ['Code', 'ProductName', 'pricecount', 'StoreName', 'CateName', 'datastatus', 'udframe', 'proNum'];
        var filedsName = ['编号', '商品名', '价格', '店铺', '分类', '上架状态', '运费模板', '规格数量']
        csvExport(this.tableProList, fields, filedsName, '123')
      },
      handleSizeChange(val) {
        var vm = this
        vm.param.endNum = val
        vm.getProCount(vm.param)
        vm.getProList(vm.param)
      },
      handleCurrentChange(val) {
        var vm = this
        vm.currentPage = val
        vm.param.statrNum = val-1
        vm.getProList(vm.param)
      },
      onSubmit() {
        var vm = this
        if(vm.formInline.cateID != '') {
          vm.param.CategoryId = "AND a.CategoryId=" + vm.formInline.cateID
        }
        vm.param.ProductName = vm.formInline.proName
        vm.getProCount(vm.param)
        vm.getProList(vm.param)
      },
      getProList(param) {
        var vm = this
        dataAPI.getDataList.call(vm, PRO_LIST, param).catch(function(error) {
          console.log('oh no', error);
        }).then(function(d){
          vm.tableProList = d.aaData
        })
      },
      getProCount(param) {
        var vm = this
        dataAPI.getDataList.call(vm, PRO_COUNT, param).catch(function(error) {
          console.log('oh no', error);
        }).then(function(d){
          vm.totle = d.aaData[0].COUNT
        })
      },
      getProCateList(param) {
        var vm = this
        dataAPI.getDataList.call(vm, GET_PRO_CATE_LIST, param).catch(function(error) {
          console.log('oh no', error);
        }).then(function(d){
          vm.proCates = d.aaData
        })
      },
      print() {
        $("#proTable").printArea({
          mode: "popup",
          popTitle: "123",
          extraHead: '<meta charset="utf-8" />,<meta http-equiv="X-UA-Compatible" content="IE=edge"/>'
        })
      }
    },
    mounted() {
      var vm = this
      vm.getProCount(vm.param)
      vm.getProList(vm.param)
      vm.getProCateList(vm.param)
    }
  }
</script>

<style type="text/css">
.el-table__body tbody tr { height: 130px; }
</style>