<template>
    <div class="course">
        <!-- <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div> -->
        <!-- <addSupplierModal v-if="showModal" :showModalState='showModal' @changeState='changeState' :currentRowData='currentRowData' :IdentiFication='IdentiFication'/> -->
   <!-- v-if="supplierOrerData.length>0" -->
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
     <div class="courseTitle">
                <h1>
                学生课程
                 </h1>
            </div>
     <Row class="studentInfo"  v-if="supplierData.length>0" >
         <Col span="12" class="item">
             <div class="lineItem">
                 <span class="name">
                        学号：
                    </span>
                     <span class="value">
                       {{supplierData[0].no}} 
                    </span>
             </div>
         </Col>
     </Row>
     <Row class="studentInfo" v-if="supplierData.length>0">
          <Col span="12" class="item">
             <div class="lineItem">
                 <span class="name">
                        课程：
                    </span>
                     <span class="value">
                       {{supplierData[0].course}} 
                    </span>
             </div>
         </Col>
         </Row>
         <Row class="studentInfo" v-if="supplierData.length>0">
         <Col span="12" class="item">
             <div class="lineItem">
                 <span class="name">
                        教师名字：
                    </span>
                     <span class="value">
                       {{supplierData[0].teacher[0].name}} 
                    </span>
             </div>
         </Col>
         </Row>
         <Row class="studentInfo" v-if="supplierData.length>0" >
         <Col span="12" class="item">
             <div class="lineItem">
                 <span class="name">
                      所属系：
                    </span>
                     <span class="value">
                       {{supplierData[0].teacher[0].college}} 
                    </span>
             </div>
         </Col>
    </Row>
 <Row class="studentInfo" v-if="supplierData.length==0" >
         <Col span="24" class="item" style="text-align:center;font-size:30px">
         暂无数据
         </Col>
    </Row>
    </div>


</template>
<script>
import {Button,Table,Page} from 'view-design'
import store from '@/store/store'
export default {
    name: 'course',
    components: {Button,Table,Page},
    data(){
        return {
           id:store.state.id,
            supplierData:[]
            
        }
    },
    created(){
        this.list();
    },
    methods: {
        //查询列表
        list(){
            this.axios({
                url:'/colleges_management/colleges_management/student/course?id='+this.id.id,
                method:'get',
                // params:this.formPage
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                     this.supplierData.push(JSON.parse(JSON.stringify(res.data)));
                    // this.supplierData.push({no:res.data.no,course:res.data.course,teacher:res.data.teacher[0].name,college:res.data.teacher[0].college});

               }else{
                    this.$Message.warning(res.message);
               }
            })
        }
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
    .course{
         background: url(~images/index/背景图蓝色.png) no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
         #particles-js{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
        }
        .courseTitle{
          width: 100%;
        padding-top: 50px;
        h1{
            font-size: 30px;
            text-align: center;
            color: #000;
        }  
        }
        .btn{
            button{
                border-radius: 15px;
            }
        }
        .tableData{
           
            color: #000;
            margin-top: 10px;
        }
        .paging{
            text-align:center;
            margin-top: 20px;
        }
        .studentInfo{
            width: 50%;
            margin: 0 auto;
            padding-top: 40px;
            color: #000;
            .item{
                // text-align: center;
                margin-top: 10px;
                .lineItem{
                    width: 90%;
                    margin-left: 180px;
                    border: 1px solid #999;
                    height: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    .name{
                        display: inline-block;
                        margin-right: 20px;
                        width: 120px;
                        text-align: right;
                        color: #000;
                    }
                }
            }
        }
       
        
        
        
    }
</style>