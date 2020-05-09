<template>
    <div class="student">
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
        <students :showDeliverGoodsModal='showDeliverGoodsModal' v-if="showDeliverGoodsModal" @deliverModalState='deliverModalState' :currentRowData='currentRowData'/>
            <div class="studentTitle">
                <h1>
                学生信息
                 </h1>
            </div>
        <Row class="studentInfo" v-if="supplierOrerData.length>0">
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        姓名：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].name}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        年龄：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].age}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        性别：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].gender}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        政治面貌：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].politics}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        民族：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].nation}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        联系电话：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].phone}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        籍贯：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].local}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        密码：
                    </span>
                    <span class="value">
                        <!-- {{supplierOrerData[0].password}} -->
                    ******
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        班级：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].classes}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        学号：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].no}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        专业：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].major}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        课程：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].course}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        入学时间：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].entrance_time | dateFormat}}
                    </span>
               </div>
            </Col>
            <Col span="12" class="item">
               <div class="lineItem">
                    <span class="name">
                        备注：
                    </span>
                    <span class="value">
                        {{supplierOrerData[0].content}}
                    </span>
               </div>
            </Col>
        </Row>
        <Row>
            <div class="btn">
                <Button @click="deliverGoods()" type="primary">修改学生信息</Button>
            </div>
        </Row>
    </div>
</template>

<script>
import {Input,DatePicker,Button,Table,Page, Message} from 'view-design'
import students from './modal/student'
import store from '@/store/store'
import moment from 'moment'
export default {
    name: 'student',
    components: {Input,DatePicker,Button,Table,students,Page},
    data(){
        return {
            // 发货模态框显示与隐藏
            showDeliverGoodsModal:false,
            // 发货详情模态框显示与隐藏
            total:1,
            currentRowData:[],//当前行数据
            name:store.state.userName,
            no:store.state.no,
            formItem:{
                classes:'',
                name:'',
                no:'',
                pageNum:1,
                pageSize:10,
            },
            supplierOrerData: []
        }
    },
    created() { 
        console.log(this.no.no);
       this.selectstudent();
    },
    mounted() {},
    methods: {
        selectstudent(){
             this.axios({
                url:'/colleges_management/colleges_management/student/all?no='+this.no.no,
                method:'get',
            }).then(res =>{
                if(res.code === 200){
                    this.supplierOrerData.push(JSON.parse(JSON.stringify(res.data)));
                    console.log(res.data)
                    Message.success('学生个人信息');
                    store.commit('id',{id:res.data.id});
                    console.log(res.data.id);
                }else if(res.message){
                    Message.error(res.message);
                }
            })
        },


        // 点击发货按钮
        deliverGoods () {
            this.showDeliverGoodsModal = true;
            this.currentRowData = this.supplierOrerData[0];
        },
        deliverModalState(val){
            this.showDeliverGoodsModal = val;
        },
       

    },
    computed: {

    },
    watch: {},
    filters:{
        dateFormat(val){
            return moment(val).format('YYYY-MM-DD')
        }
    }
}
</script>

<style lang="scss" scoped>
    .student{
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
        .studentTitle{
          width: 100%;
        padding-top: 45px;
        h1{
            font-size: 30px;
            text-align: center;
            color: #000;
        }  
        }
        .paging{
            width: 100%;
            text-align:center;
            margin-top: 10px;
        }
        .studentInfo{
            width: 50%;
            margin: 0 auto;
            padding-top: 30px;
            color: #000;
            .item{
                // text-align: center;
                margin-top: 10px;
                .lineItem{
                    width: 90%;
                    margin: 0 auto;
                    border: 1px solid #999;
                    height: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    .name{
                        display: inline-block;
                        margin-right: 10px;
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
