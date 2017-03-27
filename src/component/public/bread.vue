<template>
	<div class='bread flex-y-center flex-x-between'>
        <strong>{{$route.matched.length ? $route.matched[$route.matched.length-1].name : '首页'}}</strong>
        <el-breadcrumb>
        	<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for='(item,index) in $route.matched' v-if="index > 0">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
import Bus from '../../bus.js';
	export default {
		created() {
			Bus.$on('id-selected', function (id) {
			  alert(11111111111111)
			})
		}
	}
</script>
