<template>
    <div class="teacherCouse">
        <div class="tableData">
            <Table border :columns="columns" :data="supplierData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formPage.pageNum"
            :page-size="formPage.pageSize"/>
        </div>
        <addgardge v-if="showModal" :showModalState='showModal' @changeState='changeState' :currentRowData='currentRowData' :IdentiFication='IdentiFication'/>
    </div>
</template>
<script>
import {Button,Table,Page, Message} from 'view-design'
import addgardge from './modal/addgardge'
import store from '@/store/store'
export default {
    name: 'teacherCouse',
    components: {Button,Table,addgardge,Page},
    data(){
        return {
            showModal:false,
             formItem:{

            },
            formPage:{
                no:'',
                course:'',
                name:'',
                college:'',
            },
           id:store.state.id,
            no:store.state.no,
            total:1,  
            currentRowData:'',//当前行数据
            IdentiFication:'',//修改用户标识符
            columns:[
                {
                    title: '学生编号',
                    key: 'id'
                },
                {
                    title: '学生姓名',
                    key: 'name'
                },
                 {
                    title: '性别',
                    key: 'gender'
                },
                 {
                    title: '班级',
                    key: 'classes'
                },

                 {
                    title: '学生学号',
                    key: 'no'
                },
                 {
                    title: '课程',
                    key: 'course'
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
                            }, '录入成绩'),
                        ]);
                    }
                }
               
            ],
            supplierData:[{
                // name:'1',
                //     no:'1',
                //     fraction:'1',
                    
            }]
        }
    },
    created(){
        this.list();
       
    },
    methods: {
        show(val,B){
            console.log(val)
            this.showModal = true;
            this.currentRowData = val.row;
            this.IdentiFication = B;
        },
        addSupplier(A){
            this.showModal = true;
            this.IdentiFication = A;

        },
        changeState(val){
            this.showModal = val;
            this.list();
        },
        //分页
        onChange (val) {
            this.formPage.pageNum = val;
            this.list();
        },
        //分页大小
        onPageSizeChange (val) {
            this.formPage.pageSize = val;
            this.list();
        },
        //查询列表
        list(){
            this.axios({
                url:'/colleges_management/colleges_management/teacher/course?id='+this.id.id,
                method:'get',
                // params:this.formPage
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data);
                   this.supplierData=res.data.students;
                    //  this.supplierData.push({no:res.data.no,course:res.data.course,teacher:res.data.teacher[0].name,college:res.data.teacher[0].college});
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
    .teacherCouse{
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