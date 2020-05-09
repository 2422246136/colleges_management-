<template>
    <div class="supplierOrder">
        <div class="header">
            <Row>
                <Col span="6">
                    <label>班级:</label>
                    <Input v-model="formItem.classes" maxlength="20" class="formWidth inputBorder" />
                </Col>
                <Col span="6">
                    <label>姓名:</label>
                    <Input v-model="formItem.name" maxlength="20" class="formWidth inputBorder" />
                </Col>
                <Col span="6">
                    <label>学号:</label>
                    <Input v-model="formItem.no" maxlength="20" class="formWidth inputBorder" />
                </Col>
                <Col span="2">
                    <Button type="primary" @click="query(1)">搜索</Button>
                </Col>
            </Row>
        </div>
        <div class="article">
             <Table border :columns="columns" :data="supplierOrerData"></Table>
        </div>
        <div class="paging">
            <Page :total='total' show-sizer @on-change="onChange" @on-page-size-change="onPageSizeChange" :current="formItem.pageNum"
            :page-size="formItem.pageSize"/>
        </div>
        <deliverGoodsModal :showDeliverGoodsModal='showDeliverGoodsModal' v-if="showDeliverGoodsModal" @deliverModalState='deliverModalState' :currentRowData='currentRowData'/>
    </div>
</template>

<script>
import {Input,DatePicker,Button,Table,Page} from 'view-design'
import deliverGoodsModal from './modal/deliverGoodsModal'
import store from '@/store/store'
import moment from 'moment'
export default {
    name: 'supplierOrder',
    components: {Input,DatePicker,Button,Table,deliverGoodsModal,Page},
    data(){
        return {
            // 发货模态框显示与隐藏
            showDeliverGoodsModal:false,
            // 发货详情模态框显示与隐藏
            total:1,
            currentRowData:'',//当前行数据
            name:store.state.userName,
            no:store.state.role,
            formItem:{
                classes:'',
                name:'',
                no:'',
                pageNum:1,
                pageSize:10,
            },
            columns: [
                {
                    title: '姓名',
                    key: 'name',
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
                    title: '政治面貌',
                    key: 'politics'
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
                    title: '密码',
                    key: 'password'
                },
                {
                    title: '籍贯',
                    key: 'local'
                },
                {
                    title: '班级',
                    key: 'classes',
                },
                {
                    title: '学号',
                    key: 'no'
                },
                {
                    title: '专业',
                    key: 'major'
                },
                {
                    title: '课程',
                    key: 'course'
                },
                {
                    title: '入学时间',
                    key: 'entrance_time'
                },
                {
                    title: '备注',
                    key: 'content'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 240,
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
                                        this.deliverGoods(params.row)
                                    }
                                }
                            }, '修改信息'),
                        ]);
                    }
                }
            ],
            supplierOrerData: [
                {                
                name:'1',
                age:'1',
                gender:'1',
                politics:'1',
                nation:'',
                phone:'',
                password:'',
                local:'',
                no:'',
                major:'',
                course:'',
                entrance_time:'',
                content:'',}
            ]
        }
    },
    created() {
        // this.query()
        console.log(this.name,this.no)
    },
    mounted() {},
    methods: {
        // 点击发货按钮
        deliverGoods (item) {
            this.showDeliverGoodsModal = true;
            this.currentRowData = item;
        },
        deliverModalState(val){
            this.showDeliverGoodsModal = val;
            this.query();
        },
        //分页
        onChange (val) {
            this.formItem.pageNum = val;
            this.query();
        },
        //分页大小
        onPageSizeChange (val) {
            this.formItem.pageSize = val;
            this.query();
        },
        //查询按钮
        query(a){
            if(a === 1){
                this.formItem.pageNum = 1;
            }
            this.formItem.startTime = this.formItem.startTime?moment(this.formItem.startTime).format("YYYY-MM-DD HH:mm:ss"):''
            this.formItem.endTime = this.formItem.endTime?moment(this.formItem.endTime).format("YYYY-MM-DD HH:mm:ss"):''
            if(this.formItem.startTime!=''&&this.formItem.endTime!=''&&moment(this.formItem.startTime).valueOf()>=moment(this.formItem.endTime).valueOf()){
                this.$Message.warning('开始截止时间不能等于或在结束截止时间之后');
            }else{
                this.axios({
                    url:'/dcf/supplierorder/select',
                    method:'post',
                    data:JSON.stringify(this.formItem)
                }).then((res)=>{
                    if(res.code === 200){
                        this.total = res.data.total
                        this.supplierOrerData = res.data.list
                    }
                })
            }

        }

    },
    computed: {

    },
    watch: {}
}
</script>

<style lang="scss" scoped>
    .supplierOrder{
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
    }
</style>
