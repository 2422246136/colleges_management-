<template>
    <div class="teacher">
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
        <div class="tableData">
            <!-- <Table border :columns="columns" :data="materialData"></Table> -->
      
             <div class="teacherTitle">
                <h1>
                教师信息
                 </h1>
            </div>
            <Row class="teInfo" v-if="materialData.length>0">
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        姓名：
                    </span>
                    <span class="value">
                        {{materialData[0].name}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        年龄：
                    </span>
                    <span class="value">
                        {{materialData[0].age}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        性别：
                    </span>
                    <span class="value">
                        {{materialData[0].gender}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        民族：
                    </span>
                    <span class="value">
                        {{materialData[0].nation}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        联系电话：
                    </span>
                    <span class="value">
                        {{materialData[0].phone}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        工号：
                    </span>
                    <span class="value">
                        {{materialData[0].no}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem" >
                    <span class="name">
                        密码：
                    </span>
                    <span class="value">
                        *******
                        <!-- {{materialData[0].password}} -->
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        系：
                    </span>
                    <span class="value">
                        {{materialData[0].college}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        备注：
                    </span>
                    <span class="value">
                        {{materialData[0].content}}
                    </span>
               </div>
            </Col>
        </Row>
        <Row>
            <div class="btn">
                <Button @click="editTe" type="primary">修改信息</Button>
            </div>
        </Row>
        </div>
        
        <addTeacher v-if="showModal" :showModalState='showModal' @changeState='changeState' :currentRowData='currentRowData'/>
    </div>
</template>

<script>
import {Button,Table,Page,Input, Message} from 'view-design'
import addTeacher from './modal/addTeacher'
import store from '@/store/store' 
export default {
    name: 'teacher',
    components: {Button,Table,addTeacher,Page,Input},
    data(){
        return {
            showModal:false,
            no:store.state.no,
            formItem:{

            },
            formPage:{
                pageNum:1,
                pageSize:10,
            },
            currentRowData:'',
            total:1,  
            materialData:[
            
            ]
        }
    },
    created() {
        //  this.list();
        this.selectTeacher();
    },
    mounted() {},
    methods: {
        editTe(){
            this.addMaterial(this.materialData);
            this.showModal = true;
        },
        addMaterial(item){
            this.currentRowData = item
        },
        changeState(val){
            this.showModal = val;
            // this.list();
        },
       

        selectTeacher(){
            this.axios({
                 url:'/colleges_management/colleges_management/teacher/all?no='+this.no.no,
                method:'get',
            }).then(res =>{
                if(res.code ===200){
                    this.materialData.push(res.data)
                    console.log(res.data)
                     Message.success('教师个人信息');
                     store.commit('id',{id:res.data.id});
                }
                else if(res.message){
                    Message.error(res.message);
                }
            })
        },

       
    },
    computed: {

    },
    watch: {}
}
</script>

<style lang="scss" scoped>
    .teacher{
         background: url(~images/index/背景图蓝色.png) no-repeat;
        background-size: cover;
        height: 100%;
         #particles-js{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
        }
        .teacherTitle{
          width: 100%;
        padding-top: 45px;
        h1{
            font-size: 30px;
            text-align: center;
            color: #000;
        }  
        }
        .header{
            background-color: #fff;
            width: 100%;
            padding: 20px 0 20px 10px;
            margin-bottom: 50px;
            .formWidth{
                width: 70%;
            }
            .inputBorder{
                border:1px solid #C5D2E4;
                border-radius: 5px;
            }
        }
        .paging{
            text-align:center;
            margin-top: 10px;
        }
        .teInfo{
            width: 50%;
            margin: 0 auto;
            padding-top: 50px;
            .item{
                // text-align: center;
                margin-top: 10px;
                .lineItem{
                    width: 90%;
                    margin: 0 auto;
                    border: 1px solid #999;
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    color:black;
                    .name{
                        display: inline-block;
                        margin-right: 20px;
                        width: 120px;
                        text-align: right;
                    }
                }
            }
        }
        .btn{
            width: 100%;
            text-align: center;
            margin-top: 30px;
            button{
                height: 40px;
                width: 160px;
                 position: relative;
                z-index: 100;
            }
        }
       
    }
</style>