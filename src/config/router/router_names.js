const btn = function(resolve) {
	require(['../../page/btn.vue'], resolve)
}

const alert = function(resolve) {
	require(['../../page/notice/alert.vue'], resolve)
}

const msg = function(resolve) {
	require(['../../page/notice/message.vue'], resolve)
}

const table = function(resolve) {
	require(['../../page/data/table.vue'], resolve)
}

const pagination = function(resolve) {
	require(['../../page/data/pagination.vue'], resolve)
}

const radio = function(resolve) {
	require(['../../page/form/radio.vue'], resolve)
}

const checkbox = function(resolve) {
	require(['../../page/form/checkbox.vue'], resolve)
}

const input = function(resolve) {
	require(['../../page/form/input.vue'], resolve)
}

const number = function(resolve) {
	require(['../../page/form/number.vue'], resolve)
}

const demo_prolist = function(resolve) {
	require(['../../page/demo/prolist.vue'], resolve)
}

const demo_valiform = function(resolve) {
	require(['../../page/demo/valiform.vue'], resolve)
}

const upload = function(resolve) {
	require(['../../page/form/upload.vue'], resolve)
}

const editInfo = function(resolve) {
	require(['../../page/demo/editInfo.vue'], resolve)
}

const chart = function(resolve) {
	require(['../../page/demo/chart.vue'], resolve)
}

const apiList = function(resolve) {
	require(['../../page/demo/api_list.vue'], resolve)
}

const userManage = function(resolve) {
	require(['../../page/demo/user_manage.vue'], resolve)
}

const apiManage = function(resolve) {
	require(['../../page/demo/api_manage.vue'], resolve)
}

export {btn, alert, msg, table, pagination, radio, checkbox, input, number, demo_prolist, demo_valiform, upload, editInfo, chart, apiList, userManage, apiManage};