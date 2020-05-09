<template>
    <div class="customerManagement">
        <div class="tableData">
            <Table border :columns="columns" :data="customerData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formPage.pageNum"
            :page-size="formPage.pageSize"/>
        </div>
        <addCustomerModal v-if="showModal" :showModalState='showModal' @changeState='changeState'/>
    </div>
</template>

<script>
import {Button,Table,Page} from 'view-design'
import addCustomerModal from './modal/addCustomerModal'
import store from '@/store/store'
export default {
    name: 'customerManagement',
    components: {Button,Table,addCustomerModal,Page},
    data(){
        return {
            showModal:false,
            formPage:{
                pageNum:1,
                pageSize:10,
            },
            id:store.state.id,
            total:1,   
            columns:[
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '学号',
                    key: 'no'
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
            ],
            customerData:[
                // {
                // fraction:'1',
                // name:'1',
                // no:'1',
                // credit:'1',
                // school_year:'1',
                // term:'1',
                // }
            ]
        }
    },
    created() {
        // console.log(this.id.id);
        this.list();
    },
    mounted() {},
    methods: {
        addCustomer(){
            this.showModal = true;
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
                url:'/colleges_management/colleges_management/student/gardge?id='+this.id.id,
                method:'get',
                // params:JSON.stringify(this.formPage)
            }).then((res)=>{
                if(res.code === 200){
                    console.log(res.data)
                    this.customerData = res.data;
                }
            })
        }
    },
    computed: {

    },
    watch: {}
}
</script>

<style lang="scss" scoped>
    .customerManagement{
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