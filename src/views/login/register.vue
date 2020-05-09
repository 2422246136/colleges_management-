<template>
    <div class='loginWrapper'>
         <vue-particles
        color="#999"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
        <div class="info">
            <div class="title">用户注册</div>
            
            <ul>
                <li>
                    <span class="name">姓名</span>
                    <div class="inputWrapper">
                        <Input type="text" placeholder="请输入姓名" :maxlength='20' autocomplete="off" v-model="name"/>
                    </div>
                </li><hr>
                <li>
                    <span class="name">账号</span>
                    <div class="inputWrapper">
                        <Input type="text" placeholder="请输入账号" :maxlength='10' autocomplete="off" v-model="no"/>
                    </div>
                </li><hr>
                <li>
                    <span class="name">密码 &nbsp;</span>
                    <div class="inputWrapper">
                        <Input type="password" :maxlength='20' placeholder="请输入密码" v-model="password" autocomplete="off" />
                    </div>
                </li><hr>
                <li>
                    <RadioGroup v-model="message">
                        <Radio label="学生" class="radioStyle"></Radio>
                        <Radio label="老师"></Radio>
                    </RadioGroup>
                </li>
            </ul>
           <Button type="primary" class="loginBtn" @click="login">注册</Button>
        </div>
    </div>
</template>

<script>
import {Input,Message,RadioGroup,Radio} from 'view-design'
import store from '@/store/store'
    export default {
        name: 'login',
        components: {Input,Message,RadioGroup,Radio},
        data(){
            return {
                name:'',
                password:'',
                message:'学生',
                no:'',
            }
        },
        created() {},
        mounted() {},
        methods: {
            login(){
                if(!this.name){
                    Message.error('请输入姓名');
                    return false;
                }
                if(!this.no){
                    Message.error('请输入账号');
                    return false;
                }
                if(!this.password){
                    Message.error('请输入密码');
                    return false;
                }
                
                let params = {
                    name:this.name,
                    no:this.no,
                    password:this.password,
                    message:this.message
                };
                // if(this.message === '库存管理'){
                    store.commit('system',this.message);
                    this.axios({
                        url:'/colleges_management/colleges_management/role/register',
                        method:'post',
                        data:JSON.stringify(params)
                    }).then(res => {
                        if(res.code === 200){
                            // // 保存token至store
                            // console.log(res.data)
                            // store.commit('TOKEN',{token:res.data.token});
                            // //保存用户角色至store
                            // store.commit('role',{role:res.data.role});
                            // store.commit('userName',{userName:res.data.userName});
                            // let userStr = JSON.stringify(res.data);
                            // 保存用户信息及至 localstorage
                            // window.localStorage.setItem('ziyuninventoryManagementMsg', userStr);
                            // // 用户token
                            // window.localStorage.setItem('ziyuninventoryManagementToken', res.data.token);
                            Message.success(res.data);
                            let redirect;
                                redirect = decodeURIComponent(this.$route.query.redirect || '/');
                            this.$router.push({path:redirect})
                        }else if(res.message){
                            Message.error(res.message);
                        }
                    })
                // }else{
                //     store.commit('system',this.message);
                // }

            }
        },
        computed: {},
        watch: {}
    }
</script>

<style lang="scss" scoped>
    .loginWrapper{
 background: url(~images/loading/loginbg.jpg) no-repeat;
        background-size: cover;
        height: 100%;
        width: 100%;
        padding-top: 80px;
         #particles-js{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;

        }
        // margin: 0;
        // padding: 0;
        // position: relative;
        .bg{
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
        z-index: 0;
        }
        .name{
            width: 100px;
            display: block;
            font-size: 14px;
        }
        .logo{
            position: absolute;
            display: inline-block;
            margin: 30px;
            width: 200px;
            z-index: 1;
        }
        .title{
            margin-top: 45px;
            width: 100%;
            text-align: center;
            color: #555;
            font-size: 24px;
            margin-bottom: 63px;
        }
        .info{
            border:1px solid #ccc;
            background-color: #fff;
            margin:0 auto;
            width: 490px;
            // height: 700px;
            padding: 0 50px;
            border-radius: 5px;
            position: relative;
            z-index: 100;
            li{
                margin-top: 60px;
                width: 390px;
                border-radius: 40px;
                height: 50px;
                color: #777;
                display: block;
                position: relative;
                left: 10px;
            }
            .name{
                .iconfont{
                    font-size: 18px;
                    margin-right: 10px;
                }
            }
            .loginBtn{
                width: 390px;
                height: 60px;
                border-radius: 30px;
                background: #2cb1fb;
                font-size: 20px;
                color: #fff;
                line-height: 45px;
                text-align: center;
                margin: 50px auto 0 auto;
                display: block;
                cursor: pointer;
            }
            .inputWrapper{
                display: inline-block;
                position: relative;
                left: 100px;
                top: -40px;
                // width: 260px;
            }
            .iconfont{
                position: relative;
                top: 2px;
                margin-right: 7px;
                font-size: 22px;
            }
            .problemTracking-suo{
                position: relative;
                left: -1px;
                font-size: 25px;
            }
            .radioStyle{
                margin-right: 50px;
            }
        }
    }
</style>

<!--这里不使用scoped 来修改 覆盖UI库的样式 -->
<style lang="scss">
    .loginWrapper{
        .info{
            .inputWrapper{
                .ivu-input{
                    height: 60px;
                }
                .ivu-input:focus{
                    box-shadow:none;
                }
            }
        }
    }
</style>
