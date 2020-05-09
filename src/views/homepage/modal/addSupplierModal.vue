<template>
    <div class="addSupplierModal">
        <Modal v-model="showModal" :title="title" width='800px'>
            <Row class="formGroup" type='flex'>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>供应商编号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入供应商编号" :disabled="identifier==='B'?true:false" maxlength="10" v-model="formItem.supplierId" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>供应商名称:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入供应商编号" :disabled="identifier==='B'?true:false" maxlength="20" v-model="formItem.supplierName" class="inputStyle"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <div data-toggle="distpicker" class="selectStyle">
                    <Col span="2" class="itemName">
                        <span>*</span><label>所属地区:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <v-distpicker :province="formItem.province" :city="formItem.city" :area="formItem.area" @selected="onSelected"></v-distpicker>
                    </Col>
                </div>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>负责人姓名:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入负责人姓名" maxlength="10" v-model="formItem.chargeName" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>手机号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入手机号"  @keyup.native="number" maxlength="11" v-model="formItem.chargePhone" class="inputStyle"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>登录名:</label>
                    </Col>
                    <Col span="19" class="itemForm"> 
                        <Input placeholder="请输入登录名" maxlength="20" v-model="formItem.userName" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>密码:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入密码" type="password" maxlength="20" v-model="formItem.password" class="inputStyle"/>
                    </Col>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="default" @click="onCancelHandle">取消</Button>
                <Button type="primary" @click="onOkHandle">{{title1}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {Modal,Button,Input,Select,Message} from 'view-design'
import VDistpicker from 'v-distpicker'
export default {
    components:{Modal,Button,Input,Select,VDistpicker,Message},
    data(){
        return {
            showModal:this.showModalState,
            true:false,
            formItem:{
                id:'',
                supplierId:'',
                supplierName:'',
                chargeName:'',
                chargePhone:'',
                userName:'',
                password:'',
                province: '',
                city: '',
                area: '',
            },
            data:this.currentRowData,//展示的数据
            identifier:this.IdentiFication,//标识
            title:'',//标题
            title1:'',//确定按钮
        }
    },
    props:[
        'showModalState','currentRowData','IdentiFication'
    ],
    methods:{
        onOkHandle(){
            if(this.identifier === 'B'){
                this.axios({
                    url:'/dcf/supplier/updatesupplier',
                    method:'post',
                    data:JSON.stringify(this.formItem)
                }).then((res)=>{
                    if(res.code === 200){
                        Message.success(res.data);
                        this.showModal=false;
                    }else{
                        Message.error(res.message);
                    }
                })
            }else{
                this.axios({
                    url:'/dcf/supplier/newsupplier',
                    method:'post',
                    data:JSON.stringify(this.formItem)
                }).then((res)=>{
                    if(res.code === 200){
                        Message.success(res.data);
                        this.showModal=false;
                    }else{
                        Message.error(res.message);
                    }
                })
            }

        },
        onCancelHandle(){
            this.showModal=false;
        },
        onSelected(data) {
            this.formItem.province = data.province.value
            this.formItem.city = data.city.value
            this.formItem.area = data.area.value
        },
        //展示数据
        exhibition(){
            if(this.identifier === 'B'){
                this.formItem = this.data;
                this.title = '修改用户';
                this.title1 = '确定修改';
            }else{
                this.title = '创建用户';
                this.title1 = '确定创建';
            }
        },
        number(){　　
            this.formItem.chargePhone=this.formItem.chargePhone.replace(/[^\.\d]/g,'');
            this.formItem.chargePhone=this.formItem.chargePhone.replace('.','');
　　    },
    },
    created() {
        // this.exhibition()
    },
    mounted() {},
    watch:{
        showModal(){
            this.$emit('changeState',false)
        } 
    }
}
</script>

<style lang="scss" scoped>
    .formGroup{
        margin-bottom: 15px;
        span{
            color: red;
        }
        .itemName{
            text-align: right;
            height: 34px;
            line-height: 34px;
        }
        .itemForm{
            .inputStyle{
                border:1px solid #C5D2E4;
                width: 80%;
                border-radius: 5px;
            }
        }
        .selectStyle{
            margin-left: 17px;
        }
    }
</style>

<style lang="scss">
    .distpicker-address-wrapper select {
        height: 37px;
    }
</style>