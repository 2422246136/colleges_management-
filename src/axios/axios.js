import axios from 'axios'
import store from '../store/store'
import {Message} from 'view-design'

import $store from '../store/store'

let loadingPageStatus;

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    }
    // withCredentials: true,
    // // crossDomain: true,
    // timeout: 2500
});

// 自定义配置公共headers
axiosInstance.interceptors.request.use(
    config => {
        //全局LOADINNG ,通过参数loading = false ，可手动关闭当前LOADING
        const params = config.data || config.params
        loadingPageStatus = (!params || (params && params.loading !== false))
        if (loadingPageStatus) {
            $store.dispatch('loadingPage', true)
        }
        if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.common['token'] = store.state.token
        }
        return config
    },
    err => {
        if (loadingPageStatus) {
            $store.dispatch('loadingPage', false);
        }

        return Promise.reject(err)
    });

// http response 拦截器
axiosInstance.interceptors.response.use(
    response => {
        if (loadingPageStatus) {
            $store.dispatch('loadingPage', false);
        }
        if (response.data) {
            let msg = response.data.message;
            switch (response.data.code) {
                case 2003:
                    Message.warning('身份认证过期');
                    localStorage.clear();
                    setTimeout(()=> {
                        window.location.href = '/inventoryManagement/';
                    }, 2000);
                    break;
                case 3000:  //没有传token
                    if (msg.indexOf('token') > -1) {
                        Message.warning('身份认证过期');
                        localStorage.clear();
                        setTimeout(()=> {
                            window.location.href = '/inventoryManagement/';
                        }, 2000);
                    }
                    break;
                case 400:   //  没有传token
                    if (msg.indexOf('token') > -1) {
                        Message.warning('身份认证过期');
                        localStorage.clear();
                        setTimeout(()=> {
                            window.location.href = '/inventoryManagement/';
                        }, 2000);
                    }
                    break;
                case 401:
                    if (response.data.subCode === 'C401_1') {
                        Message.warning('权限认证失败!');
                    } else if (response.data.subCode === 'C401_3') {
                        Message.warning('身份认证过期');
                        localStorage.clear();
                        setTimeout(()=> {
                            window.location.href = '/inventoryManagement/';
                        }, 2000);
                    }
                    break;
                case 2001:
                    // 没有权限
                    response.data.message = '没有权限！';
                    Message.warning(response.data.message);
                    break;
                default:
                    break;
            }
        }
        return response.data
    },
    error => {
        if (loadingPageStatus) {
            $store.dispatch('loadingPage', false);
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    });

export default axiosInstance
