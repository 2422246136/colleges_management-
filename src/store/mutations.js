import * as types from './types'

export default {
    [types.TOKEN]: (state, data) => {
        state.token = data.token;
    },
    [types.loginOut]: (state, data) => {
        // localStorage.removeItem('ziyunBackstageInfo');
        // localStorage.removeItem('ziyunUserAuthority');
        // localStorage.removeItem('ziyunAuthority');
        // state.userInfo = data;
        // state.userAuthority = false;
        // state.userAuthorityObj = data;
        localStorage.removeItem('ziyuninventoryManagementMsg');
        localStorage.removeItem('ziyuninventoryManagementToken');
    },
    [types.loadingPage]: (state, bl) => {
        if (bl) {
            state[types.loadingPage]++
        }else{
            if (state[types.loadingPage] > 0) {
                state[types.loadingPage]--
            }
        }

    },
    [types.oneClickImportSelectedDevices]: (state, arr) => {
        state[types.oneClickImportSelectedDevices] = arr;
    },
    [types.role]: (state, data) => {
        state.role = data;
        
    },
    [types.userName]: (state, data) => {
        state.userName = data;
    },
    [types.system]: (state, data) => {
        state.system = data;
    },
    [types.no]: (state, data) => {
        state.no = data;
    },
    [types.id]: (state, data) => {
        state.id = data;
    },
    [types.message]: (state, data) => {
        state.message = data;
    },

    
}
