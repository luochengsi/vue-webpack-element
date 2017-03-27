import local from '../../util/local.js'
import * as types from './mutations_types'
import dataAPI from '../../util/api.js'

module.exports = {
	state: {
		userinfo: local.get('userinfo') || {},
		headPic: dataAPI.getData(GET_USER_PIC, {}) ? PIC_API + dataAPI.getData(GET_USER_PIC, {})[0].Picurl : PIC_API + DEFAULT_HEAD_PIC,
		token: local.get('token') || '',
	},
	mutations: {
    	[types.UPDATE_USERINFO](state, user_db) {
	        state.token = user_db.token || '';
	        local.set('token', state.token);
	    },

	    [types.REMOVE_USERINFO](state) {
	        local.remove('userinfo');
	        state.userinfo = {};
	    },

	    [types.GET_USERINFO](state) {
	        state.userinfo = local.get('userinfo') || {}
	    },

	    [types.UPDATE_HEADPIC](state, url_db) {
	        state.headPic = url_db.url
	    },

	    [types.REMOVE_TOKEN](state) {
	        local.remove('token');
	        state.token = '';
	    },
    },
    getters: {
    	getUserinfo(state) {
			return state.userinfo;
		},

		getToken(state) {
			return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
		}
    },
    actions: {
    	update_userinfo: ({
			commit
		}, {
			token
		}) => {
			return new Promise((resolve, reject) => {
				commit(types.UPDATE_USERINFO, {
					token
				});
				resolve()
			});
		},

		remove_userinfo: ({
			commit
		}) => {
			return new Promise((resolve, reject) => {
				commit(types.REMOVE_USERINFO);
				resolve()
			});
		},

		get_userinfo: ({
			commit
		}) => {
			return new Promise((resolve, reject) => {
				commit(types.GET_USERINFO);
				resolve()
			});
		},

		update_headPic: ({
			commit
		}, {
			url
		}) => {
			return new Promise((resolve, reject) => {
				commit(types.UPDATE_HEADPIC, {
					url
				});
				resolve()
			});
		},

		remove_token: ({
			commit
		}) => {
			return new Promise((resolve, reject) => {
				commit(types.REMOVE_TOKEN);
				resolve()
			});
		}
    }
}