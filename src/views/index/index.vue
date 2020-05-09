<template>
    <div class="layout index">
        <Layout>
            <Sider class="layout1" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="userIcon">
                    <div :class="isShow">
                        <img src="~/images/index/logo.png" alt="">
                    </div>
                </div>  
                <Menu :active-name="activeItem" theme="dark" width="auto" :class="menuitemClasses" class="menu">
                     <div class="pictureBox">
                     <div class="picture">
                     <img src="~/images/index/user.png" alt="" height="70" width="70" >
                     <div class="pictureName">
                       {{userName}}{{message}}
                     </div>
                   </div>
                   </div>
                    <MenuItem name="1-1" to="/index/homepage">
                        <Icon type="md-home" />
                          首页
                    </MenuItem>
                    <Submenu v-if="this.role.role==1" name="1">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            学生管理
                        </template>
                        <MenuItem name="1-2" to="/index/student">
                            <i class="iconfont problemTracking-gongyingshangguanli-"></i>
                            个人信息
                        </MenuItem>
                        <MenuItem name="1-3" to="/index/course">
                            <i class="iconfont problemTracking-wuliaoguanli-"></i>
                            查看课程
                        </MenuItem>
                        <MenuItem name="1-4" to="/index/gradge">
                            <i class="iconfont problemTracking-kehuguanli"></i>
                            <span>查看成绩</span>
                        </MenuItem>
                    </Submenu>
                    <Submenu v-if="this.role.role==2" name="2">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            教师管理
                        </template>
                        <MenuItem name="2-1" to="/index/teacher">
                            <i class="iconfont problemTracking-gongyingshangguanli-"></i>
                            <span>个人信息</span>
                        </MenuItem>
                        <MenuItem name="2-2" to="/index/teacherCourse">
                            <i class="iconfont problemTracking-wuliaoguanli-"></i>
                            查看所属学生
                        </MenuItem>
                        <MenuItem name="2-3" to="/index/studentInformation">
                            <i class="iconfont problemTracking-yonghuguanli"></i>
                            <span>查看成绩</span>
                        </MenuItem>
                    </Submenu>
                    <!-- 管理员模块 -->
                    <Submenu v-if="this.role.role==0" name="3">
                        <template slot="title">
                            <Icon type="ios-analytics" />
                            管理员管理
                        </template>
                        <MenuItem name="3-1" to="/index/adminInfo">
                            <i class="iconfont problemTracking-gongyingshangguanli-"></i>
                            <span>个人信息</span>
                        </MenuItem>
                        <MenuItem name="3-2" to="/index/adminStudent">
                            <i class="iconfont problemTracking-wuliaoguanli-"></i>
                            查看学生
                        </MenuItem>
                        <MenuItem name="3-3" to="/index/adminTeacher">
                            <i class="iconfont problemTracking-yonghuguanli"></i>
                            <span>查看教师</span>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
           
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    <span class="userNameWidth" :title="userName">{{userName}}{{message}}</span>
                    <i class="iconfont problemTracking-tuichudenglu tuichu" @click='loginOut' title="退出登录"></i>
                </Header>
                <Content  class="layout1" :style="{margin: '20px', background: '#f5f7f9', minHeight: '260px'}">
                <router-view />
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import {Layout,Sider,Menu,MenuItem,Icon,Modal,Submenu,MenuGroup} from 'view-design'
import store from '@/store/store'
    export default {
        name: 'index',
        components: {Layout,Sider,Menu,MenuItem,Icon,Submenu,MenuGroup},
        data(){
            return {
                isCollapsed: false,
                activeItem:'1',
                activeName:'1',
                userType:store.state.role.role,
                userName:store.state.userName.userName,
                message:store.state.message.message,
                role:store.state.role,
                system:store.state.system,
            }
        },
        created() {
            let currentroute = this.$route.name;
            if(currentroute == 'supplierOrder'){
                this.activeItem = '1';
            }else if(currentroute == 'supplierManagement'){
                this.activeItem = '2';
            }else if(currentroute == 'customerManagement'){
                this.activeItem = '3';
            }else if(currentroute == 'materialManagement'){
                this.activeItem = '4';
            }else if(currentroute == 'studentInformation'){
                this.activeItem = '5';
            }
        },
        mounted() {},
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },        
            loginOut(){
                Modal.confirm({
                    title: '退出登录',
                    content: '是否退出登录?',
                    onOk: () => {
                            this.$router.push({name:'login'})
                            localStorage.removeItem('ziyuninventoryManagementMsg')
                            localStorage.removeItem('ziyuninventoryManagementToken')
                    },
                });
            },
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            isShow(){
                return [
                    this.isCollapsed ? 'isShow' : 'logo'
                ]
            }
        },
        watch: {}
    }
</script>

<style lang="scss" scoped>
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;    
        height: 100%;
       
        .layout1{
            height: 100%;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        // overflow: hidden;
         overflow-y: auto;
            .menu{
                height: 90%;
            .pictureBox{
                // text-align: center;
                margin-top :-50px;
                
            }
            .picture{
                text-align: center;
                height: 150px;
                width: 200px;
                border: #515A6E;
                border-radius: 10%;
            }
            .pictureName{
                text-align: center;
                // height: 80px;
                // width: 200px;
                font-size: 15px;
                color: #fefefe;
                margin-top: 15px;
            }
            }
          
            .userIcon{
                height: 25%;
                width: 100%;
                background-color: #515A6E;
                overflow: hidden;
                .logo{
                    text-align: center;
                    padding-top: 20px;
                    border-bottom: 1px solid gray;
                    img{
                        width:210px;
                        height: 45px;
                    }
                }
                .isShow{
                    display: none;
                }

            }
        }
        .layout-header-bar{
            background: #fff;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
            height: 60px;
            .userNameWidth{
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
                margin-left: 84%;
                width: 50px;
                margin-top: 7px;
            }
            .tuichu{
                display: inline-block;
                font-size: 25px;
                color:gray;
                margin-left: 30px;
                margin-top: 7px;
                cursor: pointer;
            }

        }
        
        .menu-icon{
            transition: all .3s;
        }
        .rotate-icon{
            transform: rotate(-90deg);
        }
        .menu-item span{
            display: inline-block;
            overflow: hidden;
            width: 70px;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: bottom;
            transition: width .2s ease .2s;
            margin-left: 2px;
        }
        .menu-item i{
            transform: translateX(0px);
            transition: font-size .2s ease, transform .2s ease;
            vertical-align: middle;
            font-size: 16px;
        }
        .collapsed-menu span{
            width: 0px;
            transition: width .2s ease;
        }
        .collapsed-menu i{
            transform: translateX(5px);
            transition: font-size .2s ease .2s, transform .2s ease .2s;
            vertical-align: middle;
            font-size: 22px;
        }
        
    }
</style>

<style lang="scss">
    .ivu-layout{
        height: 100%;
    }
    
</style>
