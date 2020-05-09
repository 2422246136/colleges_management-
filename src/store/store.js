import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);
    
let state = {
    userName:'',
    role:'',
    no:'',
    id:'',
    message:'',
    system:'',
    token: '',
    loadingPage: 0,
    oneClickImportSelectedDevices:[]
};

state.token = localStorage.getItem("ziyuninventoryManagementToken") || 'token';

//在页面加载时读取localStorage里的状态信息
let equipmentMsg = localStorage.getItem("ziyuninventoryManagementMsg");
if(equipmentMsg){
    let data = JSON.parse(equipmentMsg);
    data.token = localStorage.getItem("ziyuninventoryManagementToken") || 'token';
    state = Object.assign(state,data)
}


//在页面刷新时将vuex里的信息保存到localStorage里
window.addEventListener("beforeunload",()=>{
    state.loadingPage = 0;  // 保持默认值
    state.token = localStorage.getItem("ziyuninventoryManagementToken") || 'token';
    localStorage.setItem("ziyuninventoryManagementMsg",JSON.stringify(state))
});

export const $store =  new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})


export  default $store