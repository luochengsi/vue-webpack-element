<template>
	<div>
		<el-button type="primary" @click="addAPI">新增接口</el-button>
		<el-table
	      :data="tableAPIList"
	      style="width: 99%"
	      :row-class-name="$store.state.global.tableRowClassName"  
	      v-loading.body="$store.state.global.ajax_loading"
	      :row-style='getRowStyle'>      
	      	<el-table-column
		        prop="api"
		        label="接口名"
		        width="150px">
	      	</el-table-column>
	      	<el-table-column
		        prop="params"
		        label="参数">
	      	</el-table-column>
	      	<el-table-column
		        prop="help"
		        label="说明" width="300px">
	      	</el-table-column>
	      	<el-table-column label="操作" width="150px">
			      <template scope="scope">
			        <el-button
			          size="small"
			          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			      </template>
	    	</el-table-column>
	    	</el-table>

	    <div class="block flex-x-end">
	      <el-pagination
	        @size-change="handleSizeChange"
	        @current-change="handleCurrentChange"
	        :current-page="currentPage"
	        :page-sizes="[10, 20, 30, 40]"
	        :page-size="eRow"
	        layout="total, sizes, prev, pager, next, jumper"
	        :total="totle">
	      </el-pagination>
	    </div>

	    <el-dialog :title="dialogTitle" v-model="visible">
		  <el-form :model="row">
		    <el-form-item label="接口名称" :label-width="formLabelWidth">
		      <el-input v-model="form.apiName" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="sql" :label-width="formLabelWidth">
		      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="form.sql" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="说明" :label-width="formLabelWidth">
		      <el-input v-model="form.desc" auto-complete="off"></el-input>
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
import dataAPI from '../../util/api.js'
	export default {
		data() {
			return {
				tableAPIList: [],
				currentPage: 1,
				totle: 0,
				sRow: 0,
				rowSize: 10,
				visible: false,
				form: {
		          apiName: '',
		          sql: '',
		          desc: '',
		          id: 0,
		          chk: ''
		        },
		        formLabelWidth: '120px',
		        dialogTitle: '',
		        formInline: {
		          apiName: ''
		        },
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				var vm = this
				return new Promise(function(resolve, reject){
					vm.countAPIList()
					vm.getAPIList()
					resolve()
				})				
			},
			countAPIList() {
				var vm = this
				dataAPI.getDataList.call(vm, COUNT_API_LIST, {}).catch(function(error) {
		          console.log('oh no', error);
		        }).then(function(d){
		          	vm.totle = d.aaData[0].total		          	
		        })
			},
			addDomain() {
				this.dynamicValidateForm.domains.push({
		          value: '',
		          key: Date.now()
		        });
			},
			getAPIList() {
				var vm = this
				dataAPI.getDataList.call(vm, GET_API_LIST, {
					sRow: vm.sRow * vm.rowSize,
					eRow: vm.rowSize
				}).catch(function(error) {
		          console.log('oh no', error);
		        }).then(function(d){
		          vm.tableAPIList = d.aaData
		        })
			},
			handleSizeChange(val) {
				var vm = this
		        vm.rowSize = val
		        vm.init()
			},
			handleCurrentChange(val) {
				var vm = this
		        vm.currentPage = val
		        vm.sRow = val-1
		        vm.init()
			},
			handleEdit(index, row) {
				this.form.apiName = row.api
				this.form.sql = row.ssql
				this.form.desc = row.help
				this.form.id = row.Id
				this.form.chk = row.chk
				this.dialogTitle = '编辑'
				this.visible = true
			},
			getRowStyle() {
				return {
					'height': '50px'
				}
			},
			cancelForm() {
				this.form.apiName = ''
				this.form.sql = ''
				this.form.desc = ''
				this.form.id = 0
				this.form.chk = ''
				this.visible = false
			},
			submitForm() {
				var vm = this
				var o = {
					Sys_Cmds: {
						api: vm.form.apiName,
						ssql: vm.form.sql,
						chk: vm.form.chk,
						help: vm.form.desc
					}
				}
				if(vm.dialogTitle === '编辑'){
					o.Sys_Cmds.did = vm.form.id
				}
				var str = JSON.stringify(o)
				vm.updateOraddAPI(str)
				setTimeout(function(){
					vm.cancelForm()
				}, 0)
			},
			addAPI() {
				this.dialogTitle = '新增'
				this.visible = true
			},
			updateOraddAPI(str) {
				var vm = this
				var cmd = vm.dialogTitle === '新增' ? ADD_API_LIST : UPDATE_API_LIST
				dataAPI.getDataList.call(vm, cmd, {
					sp: str
				}).catch(function(error) {
		          	vm.$message.error(error);
		        }).then(function(){
		          	vm.init().then(function(){
		          		vm.$message({
				          message: vm.dialogTitle === '新增' ? '添加成功' : '修改成功',
				          type: 'success'
				        })
		          	})		          	
		        })
			},
			search() {

			}
		}
	}
</script>