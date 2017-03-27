<template>
	<div style="width: 100%;">
		<title2 title="表单校验"></title2>
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名长度为5~8个字符"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码长度为5~8"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码长度为5~8"></el-input>
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input v-model.number="ruleForm2.age" placeholder="请输入年龄"></el-input>
			</el-form-item>
			<el-form-item prop="email" label="邮箱">
		    	<el-input v-model="ruleForm2.email" placeholder="请输入邮箱"></el-input>
  			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
				<el-button @click="resetForm('ruleForm2')">重置</el-button>
			</el-form-item>			
		</el-form>
	</div>
</template>

<script>
import title2 from '../../component/public/title2.vue'
	export default {
		components: { title2 },
		data() {
			var vm = this
			var checkUserName = (rule, value, callback) => {
				if (value.length < 5 || value.length > 8) {
					callback(new Error('用户名长度为5~8个字符'));
				}else{
					callback();
				}
			};			
			var validatePass = (rule, value, callback) => {
				if (value.length < 5 || value.length > 8) {
					callback(new Error('密码长度为5~8'));
				}else if (value !== '' && this.ruleForm2.checkPass !== '') {
					this.$refs.ruleForm2.validateField('checkPass');
				}
				callback();
			};
			var validatePass2 = (rule, value, callback) => {
				if (value.length < 5 || value.length > 8) {
					callback(new Error('密码长度为5~8'));
				}else if (value !== '' && value !== this.ruleForm2.pass ) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};	
			var checkAge = (rule, value, callback) => {
				setTimeout(() => {
					if(value !== '' && value !== 0 && !Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					}else{
						callback();	
					}
				}, 1000);
			};	
			var checkEmail = (rule, value, callback) => {
				callback();
			}	
			return {
				ruleForm2: {
					pass: '',
					checkPass: '',
					age: '',
					username: '',
					email: '',
				},
				rules2: {
					username: [
					{ required: true, message: '请输入用户名'},
					{validator: checkUserName, trigger: 'blur'}
					],
					pass: [
					{ required: true, message: '请输入密码'},
					{ validator: validatePass, trigger: 'blur'}
					],
					checkPass: [
					{ required: true, message: '请再次输入密码'},
					{ validator: validatePass2, trigger: 'blur'}
					],
					age: [
					{ validator: checkAge, trigger: 'blur'}
					],					
					email: [
					{ validator: checkEmail, trigger: 'blur'}
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		}
	}
</script>