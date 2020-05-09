<template>
    <div class="addCustomerModal">
        <Modal v-model="showModal" title="新建客户" width='700px'>
            <Row class="formGroup" type='flex'>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>客户编号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入客户编号" maxlength="10" v-model="formItem.clientId" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>客户名称:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入客户名称" maxlength="20" v-model="formItem.clientName" class="inputStyle"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <div data-toggle="distpicker"  class="selectStyle">
                    <Col span="3" class="itemName">
                        <span>*</span><label>所属地区:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <v-distpicker :province="formItem.province" :city="formItem.city" :area="formItem.area" @selected="onSelected"></v-distpicker>
                    </Col>
                </div>
            </Row>
            <Row class="formGroup selectStyle1">
                <Col span="24">
                    <Col span="3" class="itemName">
                        <span>*</span><label>备注:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input type="textarea" placeholder="" maxlength="100" v-model="formItem.remarks"/>
                    </Col>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="default" @click="onCancelHandle">取消</Button>
                <Button type="primary" @click="onOkHandle">确认</Button>
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
            formItem:{
                clientId:'',
                clientName:'',
                remarks:'',
                province:'',
                city:'',
                area:'',
            }
        }
    },
    props:[
        'showModalState'
    ],
    methods:{
        onOkHandle(){
            this.axios({
                url:'/lh/client/add',
                method:'post',
                data:JSON.stringify(this.formItem)
            }).then((res)=>{
                if(res.code === 200){
                    Message.success(res.data)
                    this.showModal=false;
                }else{
                    Message.error(res.message)
                }
            })
        },
        onCancelHandle(){
            this.showModal=false;
        },
        onSelected(data) {
            this.formItem.province = data.province.value
            this.formItem.city = data.city.value
            this.formItem.area = data.area.value
        },
    },
    created() {},
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
            margin-left: -17px;
        }
    }
    .selectStyle1{
        margin-left: -18px;
    }
</style>

<style lang="scss">
    .distpicker-address-wrapper select {
        height: 37px;
    }
</style>