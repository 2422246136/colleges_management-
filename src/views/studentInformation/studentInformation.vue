<template>
    <div class="studentInformation">
        <Row class="searchItem">
            <Col span='8' class="item">
                <Col span="4" class="name">
                    班级：
                </Col>
                <!-- <Col span="20">
                    <Input v-model="classes" placeholder="请输入班级" class="inputClass" />
                </Col> -->
                 <Col span="20">
                    <Select style="width:75%" v-model="classes" filterable >
                       <Option value="全部">全部</Option>
                        <Option v-for="(item,index) in classesList" :value="item" :key="index">{{item}}</Option>
                    </Select>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    姓名：
                </Col>
                <Col span="20">
                    <Input v-model="name" placeholder="请输入姓名" class="inputClass"/>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    学号：
                </Col>
                <Col span="20">
                    <Input v-model="no" placeholder="请输入学号" class="inputClass"/>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    学年：
                </Col>
                <Col span="20">
                    <Select style="width:75%" v-model="school_year">
                        <Option value="">全部</Option>
                        <Option value="2016-2017">2016-2017</Option>
                        <Option value="2017-2018">2017-2018</Option>
                        <Option value="2017-2018">2018-2019</Option>
                        <Option value="2017-2018">2019-2020</Option>
                    </Select>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Col span="4" class="name">
                    学期：
                </Col>
                <Col span="20">
                    <Select style="width:75%" v-model="term">
                         <Option value="">全部</Option>
                        <Option value="第一学期">第一学期</Option>
                        <Option value="第二学期">第二学期</Option>
                    </Select>
                </Col>
            </Col>
            <Col span='8' class="item">
                <Button type="primary" @click="search">查询</Button>
            </Col>
        </Row>
        <div class="exportGrade">
            <button @click="exportGrade">导出成绩</button>
        </div>
        <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="pageNum"
            :page-size="pageSize"/>
        </div>
        <addSupplierModal v-if="showModal" :showModalState='showModal' @changeState='changeState' :currentRowData='currentRowData' />
    </div>
</template>
<script>
import {Button,Table,Page,Input,Select,Option, Message} from 'view-design'
import addSupplierModal from './modal/addSupplierModal'
export default {
    name: 'studentInformation',
    components: {Button,Table,addSupplierModal,Page,Input,Select,Option},
    data(){
        return {
            showModal:false,
            formPage:{
            },
            currentRowData:'',//当前行数据
            columns:[
                {
                    title: '学生姓名',
                    key: 'name'
                },
                {
                    title: '学生学号',
                    key: 'no'
                },
                 {
                    title: '班级',
                    key: 'classes'
                },
                {
                    title: '分数',
                    key: 'fraction'
                },
                {
                    title: '学分',
                    key: 'credit'
                },
                {
                    title: '学年',
                    key: 'school_year'
                },
                {
                    title: '学期',
                    key: 'term'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('span', {
                                props: {},
                                style: {
                                    marginRight: '5px',
                                    display:'inline-block',
                                    width:'70px',
                                    height:'30px',
                                    background:'#2d8cf0',
                                    color:'#fff',
                                    lineHeight:'30px',
                                    borderRadius:'4px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.addSupplier(params.row)
                                    }
                                }
                            }, '删除成绩'),
                        ]);
                    }
                }
            ],
            supplierData:[{}],
             classesList:[],
            classes:"全部",
            no:"",
            name:'',
            school_year:'',
            term:'',
            pageNum:1,
            pageSize:10,
            total:0,
            
        }
    },
    created(){
        this.list();
        this.getAllClasses();
    },
    methods: {
        search(){
            this.list();
        },
        show(val){
            console.log(val)
            this.showModal = true;
            this.currentRowData = val.row;
        },
        addSupplier(item){
            this.showModal = true;
            this.currentRowData = item
        },
        changeState(val){
            this.showModal = val;
            this.list();
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
                url:'/colleges_management/colleges_management/teacher/selectgardge',
                method:'post',
                data:JSON.stringify(
                    {
                        classes:this.classes,
                        no:this.no,
                        name:this.name,
                        school_year:this.school_year,
                        term:this.term,
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                    }
                )
                // params:this.formPage
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    this.supplierData=res.data.reportCards
                    this.total = res.data.total
                }else{
                    Message.error(res.message);
                    
                }
            })
        },
        getAllClasses(){
            this.axios({
                url:'/colleges_management/colleges_management/administration/studentclasses',
                method:'get',
            }).then(res=>{
                if(res.code==200){
                    console.log(res);
                    this.classesList = res.data;
                }else{
                    this.$Message.warning(res.message);
                }
            })
        },
        exportGrade(){
            this.axios({
                method:"post",
                url:'/colleges_management/colleges_management/exportexcle',
                data:JSON.stringify(
                    {
                        classes:this.classes,
                        no:this.no,
                        name:this.name,
                        school_year:this.school_year,
                        term:this.term,
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                    }
                ),
                headers: {
                    "Content-Type": "application/json; application/octet-stream"
                },
                responseType: "blob" // 服务器返回的数据类型
            }).then(res=>{
                    console.log(res);
                    this.$Message.success('导出成绩成功！')
                    const content = res;
                    console.log(content)
                    const blob = new Blob([content], { type: "application/excel" }); // 构造一个blob对象来处理数据
                    const fileName = "学生成绩表.xlsx"; // 导出文件名
                    
                 if ("download" in document.createElement("a")) {
                    // 支持a标签download的浏览器
                    const link = document.createElement("a"); // 创建a标签
                    link.download = fileName; // a标签添加属性
                    link.style.display = "none";
                    link.href = URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.click(); // 执行下载
                    URL.revokeObjectURL(link.href); // 释放url
                    document.body.removeChild(link); // 释放标签
                } else {
                        // 其他浏览器
                        navigator.msSaveBlob(blob, fileName);
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
        .exportGrade{
            background: #fff;
            width: 100%;
            margin: 10px 0 10px 0;
            padding-left: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            button{
                width: 110px;
                height: 40px;
                border-radius: 30px;
                border: none;
                background: #2d8cf0;
                color: #fff;
                font-size: 14px;
                cursor: pointer;
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
        overflow-y: scroll;
        input{
            border: 1px solid #C5D2E4;
            border-radius: 5px;
        }
    }
</style>