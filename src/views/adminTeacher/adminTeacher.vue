<template>
    <div class="studentInformation">
        <Row class="searchItem">
            <Col span='8' class="item">
                <Col span="4" class="name">
                    所属系：
                </Col>
                <Col span="20">
                    <Select style="width:75%" v-model="college" filterable>
                        <Option value="全部">全部</Option>
                        <Option v-for="(item,index) in teacherCollegeList" :value="item" :key="index">{{item}}</Option>
                    </Select>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    教师姓名：
                </Col>
                <Col span="20">
                    <Select style="width:75%" v-model="name" filterable>
                        <Option value="全部">全部</Option>
                        <Option v-for="(item,index) in teacherNameList" :value="item" :key="index">{{item}}</Option>
                    </Select>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    工号：
                </Col>
                <Col span="20">
                    <Input style="width:75%" v-model="no"/>
                </Col>
            </Col>
            <Col span='24' class="item" style="text-align:center">
                <Button type="primary" @click="search">查询</Button>
            </Col>
        </Row>
        <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="pageNum"
            :page-size="pageSize"/>
        </div>
        <!-- 修改信息 -->
        <Drawer title="修改信息" v-model="showDrawer" class="editStudentInfo">
            <div class="item">
                <span class="name">姓名:</span>
                <Input v-model="formItem.name" disabled/>
            </div>
            <div class="item">
                <span class="name">年龄:</span>
                <Input v-model="formItem.age" maxlength="2" />
            </div>
            <div class="item">
                <span class="name">性别:</span>
                <!-- <Input v-model="formItem.gender" /> -->
                 <Select style="width:100%" v-model="formItem.gender">
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
            </div>
             <div class="item">
                <span class="name">民族:</span>
                <Input v-model="formItem.nation" maxlength="8" />
            </div>
             <div class="item">
                <span class="name">工号:</span>
                <Input v-model="formItem.no" disabled/>
            </div>
             <div class="item">
                <span class="name">所属系:</span>
                <Input v-model="formItem.college" maxlength="10" />
            </div>
            <div class="item">
                <span class="name">联系电话:</span>
                <Input v-model="formItem.phone" maxlength="11" />
            </div>
            <div class="item">
                <span class="name">备注:</span>
                <Input v-model="formItem.content" />
            </div>
            <div class="btns">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="editInfo2">确认</Button>
            </div>
        </Drawer>
        <!-- 删除 -->
        <Modal v-model="deleteShow" title="删除" @on-ok="deleteOk" @on-cancel="cancel3">
            <p>是否删除该条信息？</p>
        </Modal>
    </div>
</template>
<script>
import {Button,Table,Page,Input,Select,Option,Drawer,Modal} from 'view-design'
export default {
    name: 'adminStudent',
    components: {Button,Table,Page,Input,Select,Option,Drawer,Modal},
    data(){
        return {
            showModal:false,
            formPage:{
            },
             formItem:{
                id:'',
                name:'',
                age:'',
                gender:'',
                nation:'',
                phone:'',
                no:'',
                college:'',
                content:''
             },
            teacherNameList:[],
            teacherCollegeList:[],
            currentRowData:'',//当前行数据
            columns:[
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                 {
                    title: '性别',
                    key: 'gender'
                },
                {
                    title: '民族',
                    key: 'nation'
                },
                {
                    title: '联系电话',
                    key: 'phone'
                },
                {
                    title: '工号',
                    key: 'no'
                },
                {
                    title: '系',
                    key: 'college'
                },
                {
                    title: '备注',
                    key: 'content'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width:'240',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                props: {},
                                style: {
                                    marginRight: '5px',
                                    display:'inline-block',
                                    width:'60px',
                                    height:'30px',
                                    background:'#2d8cf0',
                                    color:'#fff',
                                    lineHeight:'30px',
                                    borderRadius:'4px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.row)
                                    }
                                }
                            }, '修改信息'),
                            h('span', {
                                props: {},
                                style: {
                                    marginRight: '5px',
                                    display:'inline-block',
                                    width:'40px',
                                    height:'30px',
                                    background:'#2d8cf0',
                                    color:'#fff',
                                    lineHeight:'30px',
                                    borderRadius:'4px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.delete(params.row)
                                    }
                                }
                            }, '删除'),
                        ]);
                    }
                }
            ],
            supplierData:[{}],
           college:"全部",
            no:"",
            name:'全部',
            school_year:'2016-2017',
            term:'第一学期',
            pageNum:1,
            pageSize:10,
            total:100,
            showDrawer:false,
            deleteShow:false
        }
    },
    created(){
        // this.list();
        this.getTeacherName();
        this.getTeacherCollege();
        this.list();
    },
    methods: {
        edit(val){ // 修改信息 打开弹框
            this.showDrawer = true;
            this.formItem = val
        },
        editInfo2(){ // 确认修改
        this.axios({
                url:'/colleges_management/colleges_management/teacher/update',
                method:'post',
                data:JSON.stringify(this.formItem)
            }).then((res)=>{
                if(res.code === 200){
                   this.$Message.success(res.data);
                    this.showDrawer = false;
                }else{
                   this.$Message.error(res.message)
                }
            })
        },
        cancel(){ // 取消修改
            this.showDrawer = false
        },
        delete(val){ // 删除信息 弹框
            this.deleteShow = true;
            this.id=val.id;
        },
        deleteOk(){ // 确认删除
         this.axios({
                url:'/colleges_management/colleges_management/administration/deleteteacher?id='+this.id,
                method:'get',
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    this.$Message.success(res.data);
                    this.showDrawer = false;
                }else{
                    this.$Message.error(res.message)
                }
            })
        this.deleteShow = false;
        },
        cancel3(){ // 取消删除

        },
        //分页
        onChange (val) {
            this.pageNum = val;
            this.list();
        },
        //分页大小
        onPageSizeChange (val) {
            this.pageSize = val;
            this.list();
        },
        //查询列表
        list(){
             this.axios({
                url:'/colleges_management/colleges_management/administration/addteacher',
                method:'post',
                data:JSON.stringify(
                    {
                        college:this.college,
                        no:this.no,
                        name:this.name,
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                    }
                )
                // params:this.formPage
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    this.supplierData = res.data.teachers;
                    this.total = res.data.total
                }else{
                     this.$Message.error(res.message)
                }
            })
        },
        search(){
            this.list();
        },
        getTeacherName(){
            this.axios({
                url:'/colleges_management/colleges_management/administration/teachername',
                method:'get',
            }).then(res=>{
                if(res.code==200){
                    console.log(res);
                    this.teacherNameList = res.data;
                }else{
                    this.$Message.warning(res.message);
                }
            })
        },
        getTeacherCollege(){
             this.axios({
                url:'/colleges_management/colleges_management/administration/teachercollege',
                method:'get',
            }).then(res=>{
                if(res.code==200){
                    console.log(res);
                    this.teacherCollegeList = res.data;
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
    .studentInformation{
        .searchItem{
            background: #fff;
            padding-top: 20px;
            padding-left: 20px;
            .item{
                margin-bottom: 30px;
                .name{
                    vertical-align: bottom;
                    text-align: center;
                    margin-top: 7px;
                }
                .inputClass{
                    width: 75%;
                    vertical-align: top;
                }
            }
        }
        .btn{
            button{
                border-radius: 15px;
            }
        }
        .tableData{
            margin-top: 20px;
        }
        .paging{
            text-align:center;
            margin-top: 10px;
        }
    }
</style>
<style lang='scss'>
    .studentInformation{
        input{
            border: 1px solid #C5D2E4;
            border-radius: 5px;
        }
    }
    .editStudentInfo{
        .item{
            margin-top: 5px;
            .name{
                font-size: 14px;
            }
        }
        input{
            margin-top: 5px;
            border: 1px solid #C5D2E4;
            border-radius: 5px;
        }
        .btns{
            width: 100%;
            text-align: center;
            margin-top: 20px;
            button{
                margin-right: 20px;
                margin-left: 20px;
            }
        }
    }
</style>