<template>
    <div class="adminInfo">
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
        <div class="adminInfoTitle">
            <h1>
                管理员信息
            </h1>
        </div>
        <div class="adminInfoContent">
            <Row class="item">
                <Col span="4">
                    <span class="name">姓名:</span>
                </Col>
                <Col span="20">
                    <Input v-model="showData.name" readonly/>
                </Col>
            </Row>
            <Row class="item">
                <Col span="4">
                    <span class="name">账号:</span>
                </Col>
                <Col span="20">
                    <Input v-model="showData.no" readonly />
                </Col>
            </Row>
            <Row class="item">
                <Col span="4">
                    <span class="name" >密码:</span>
                </Col>
                <Col span="20">
                    <Input type="password" password placeholder="密码" v-model="showData.password" readonly/>
                </Col>
            </Row>
            <Row class="item">
                <Col span="4">
                    <span class="name">角色:</span>
                </Col>
                <Col span="20">
                    <Input v-model="showData.message" readonly />
                </Col>
            </Row>
            <Row class="item">
                <Col span="20" offset='4' class="btn">
                   <Button type="primary" @click="editInfo">
                       修改信息
                       </Button>
                </Col>
            </Row>
        </div>
        <!-- 修改信息框 -->
        <Drawer title="修改个人信息" v-model="showDrawer" class="editInfo">
            <div class="item">
                <span class="name">姓名:</span>
                <Input v-model="item.name" />
            </div>
            <div class="item">
                <span class="name">账号:</span>
                <Input v-model="item.no" disabled/>
            </div>
            <div class="item">
                <span class="name">新密码:</span>
                <Input v-model="item.password" />
            </div>
            <div class="item">
                <span class="name">确认新密码:</span>
                <Input v-model="item.repassword" />
            </div>
            <div class="btns">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="editInfo2">确认</Button>
            </div>
        </Drawer>
    </div>
</template>
<script>
import {Input,Button,Drawer, Message} from 'view-design'
import store from '@/store/store'
export default {
    name:'adminInfo',
    components:{Input,Button,Drawer},
    data(){
        return {
            showData:{
                name:'',
                no:'',
                password:'',
                message:'',
            },
            no:store.state.no,
            item:{
                name:'',
                no:'',
                password:'',
                repassword:'',
            },
            showDrawer:false
        }
    },
    created(){
        this.start();
    },
    methods:{
        start(){
            this.axios({
                url:"/colleges_management/colleges_management/administration/all?no="+this.no.no,
                method:"get", 
              
            }).then(res =>{
                if(res.code ===200){
                    this.showData=res.data;
                    this.item = {
                        name:res.data.name,
                        no:res.data.no,
                        password:'',
                        repassword:'',
                    }
                }else{
                    Message.error(res.message);
                }
            })
        },
        
        editInfo(){ // 点击修改事件 弹框
            this.showDrawer = true;
        },
        editInfo2(){ // 点击确认修改
            this.axios({
                url:"/colleges_management/colleges_management/administration/update",
                method:"post", 
                data:JSON.stringify({
                    name:this.item.name,
                    no:this.item.no,
                    password:this.item.password,
                    repassword:this.item.repassword
                })
            }).then(res =>{
                if(res.code ===200){
                    console.log(this.item);
                    Message.success(res.data);
                    this.showDrawer=false;
                }else{
                    Message.error(res.message);
                }
            })
        },
        cancel(){
            this.showDrawer = false;
        }
    }
}
</script>
<style lang='scss' scoped>
.adminInfo{
    // width: 100%;
    height: 100%;
    background: #fff;
     background: url(~images/index/背景图蓝色.png) no-repeat;
        background-size: cover;
        width: 100%;
         #particles-js{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
        }
    .adminInfoTitle{
        width: 100%;
        padding-top: 45px;
        h1{
            font-size: 30px;
            text-align: center;
            color: #000;
        }
    }
    .adminInfoContent{
        width: 100%;
        padding-bottom: 50px;
        color: #000;
        .item{
            width: 30%;
            margin: 0 auto;
            margin-top: 60px;
            
            .name{
                display:inline-block;
                margin-top: 10px;
                font-size: 18px;
                color: #000;
            }
            .btn{
                text-align: center;
                button{
                    width: 200px;
                    height: 40px;
                     position: relative;
                z-index: 100;
                }
            }
        }
    }
}
</style>
<style lang='scss'>
.adminInfo,.editInfo{
    input{
        border: 1px solid #C5D2E4;
        border-radius: 5px;
        height: 40px;
    }
}
.editInfo{
    .item{
        margin-top: 30px;
        .name{
            font-size: 16px;
        }
    }
    input{
        margin-top: 5px;
    }
    .btns{
        width: 100%;
        text-align: center;
        margin-top: 60px;
        button{
            margin-right: 20px;
            margin-left: 20px;
        }
    }
}
</style>