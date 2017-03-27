<template>
	<div>
		<el-button type="primary" @click="addAPI">新增接口</el-button>
		<el-table
	      :data="tableAPIList"
	      style="width: 99%"
	      :row-class-name="$store.state.global.tableRowClassName"  
	      v-loading.body="$store.state.global.ajax_loading"
	      :row-style='getRowStyle' @cell-dblclick="celldbClick">      
	      	<el-table-column
		        prop="apiname"
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
	        :page-sizes="[5, 20, 30, 40]"
	        :page-size="pageSize"
	        layout="total, sizes, prev, pager, next, jumper"
	        :total="total">
	      </el-pagination>
	    </div>
	    <el-dialog :title="dialogTitle" v-model="visible">

		  <el-form :model="apiModel">
		    <el-form-item label="接口名称" :label-width="formLabelWidth">
		      <el-input v-model="apiModel.apiName" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="说明" :label-width="formLabelWidth">
		      <el-input v-model="apiModel.desc" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>

		  <el-form v-for="(param, index) in apiParams">
		    <el-form-item :label="'参数'+ index" :label-width="formLabelWidth">
		      <el-input v-model="param.name" class="inline-input" placeholder="参数名"></el-input>
		      <el-input v-model="param.type" class="inline-input" placeholder="类型"></el-input>
		      <el-button @click.prevent="removeDomain(param)">删除</el-button>
		    </el-form-item>
		  </el-form>


		  <div slot="footer" class="dialog-footer">
		  	<el-button @click="addDomain">新增参数</el-button>
		    <el-button @click="cancelForm">取 消</el-button>
		    <el-button type="primary" @click="submitForm">确 定</el-button>
		  </div>
		</el-dialog>


		<el-popover
		  ref="popover5"
		  placement="top"
		  width="160"
		  v-model="visible2">
		  <p>这是一段内容这是一段内容确定删除吗？</p>
		  <div style="text-align: right; margin: 0">
		    <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
		    <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
		  </div>
		</el-popover>
	</div>
</template>

<script>
import dataAPI from '../../util/api.js'
	export default {
		data() {
			return {
				tableAPIList: [],
				visible: false,
		        formLabelWidth: '120px',
		        dialogTitle: '',
		        apiModel: {
		        	apiName: '',
		          	desc: ''
		        },
		        visible2: false,
		        apiParams: [
		        	{
		        		name: '',
		        		type: ''
		        	}
		        ],
		        currentPage: 1,
		        pageIndex: 0,
		        pageSize: 5,
		        total: 0
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				return this.getAPIList()			
			},
			addDomain() {
		        this.apiParams.push({
	        		name: '',
	        		type: ''
		        });
	      	},
	      	celldbClick(ow, column, cell, event) {
	      		log(ow)
	      		log(column)
	      		log($(cell).find('div').html())
	      	},
			countAPIList() {
				var vm = this
				dataAPI.getDataList.call(vm, COUNT_API_LIST, {}).catch(function(error) {
		          console.log('oh no', error);
		        }).then(function(d){
		          	vm.totle = d.aaData[0].total		          	
		        })
			},
			getAPIList() {
				var vm = this
				$.get(testAPI.countAPIList)
				.then(function(d){
					if(d && d.data && d.data[0].total > 0) {
						vm.total = d.data[0].total
						return $.post(testAPI.getAPIList, {
							PageIndex: vm.pageIndex,
							PageSize: vm.pageSize
						})
					}else{
						return {data: []}
					}
				})
				.then(function(d){
					vm.tableAPIList = d.data
				})
				.fail(() => {
			        serverError.call(vm)
		      	});
			},
			handleEdit(index, row) {
				// this.dialogTitle = '编辑'
				// this.visible = true
			},
			handleSizeChange(val) {
		        this.pageSize = val
		        this.getAPIList()
			},
			handleCurrentChange(val) {
		        this.currentPage = val
		        this.pageIndex = (val-1) * this.pageSize
		        this.getAPIList()
			},
			getRowStyle() {
				return {
					'height': '50px'
				}
			},
			cancelForm() {
				this.apiModel.apiName = ''
				this.apiModel.desc = ''
				this.apiParams = [{
					name: '',
	        		type: ''
				}]
				this.visible = false
			},
			submitForm() {
				var vm = this				
				var params = _.map(vm.apiParams, function(o){
					// return o.name + '+' + o.type
					return JSON.stringify(o);
				})
				var o = {
					apiname: vm.apiModel.apiName,
					help: vm.apiModel.desc,
					params: params.join()
				}
				if(vm.dialogTitle === '编辑'){
					o.Sys_Cmds.did = vm.form.id
				}
				$.post(testAPI.addAPI, o)
				.then(function(d){
					if(d && d.code === 200) {
						vm.getAPIList()
					}					
				})
				.fail(() => {
			        serverError.call(vm)
		      	});
				setTimeout(function(){
					vm.cancelForm()
				}, 0)
			},
			removeDomain(item) {
		        var index = this.apiParams.indexOf(item)
		        if (index !== -1) {
		          this.apiParams.splice(index, 1)
		        }
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

<style type="text/css" scoped>
.inline-input.el-input{
	width: 25%;float: left;margin-right: 10px;
}
</style>