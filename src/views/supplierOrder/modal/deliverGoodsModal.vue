<template>
    <div class="deliverGoodsModal">
       <Modal v-model='showModal' title="修改学生信息" width='800'>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>姓名:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.name" maxlength="10" placeholder="请输入姓名"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>年龄:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.age" maxlength="11" placeholder="请输入年龄"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>性别:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.gender" maxlength="20" placeholder="请输入性别"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>政治面貌:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.politics" maxlength="20" placeholder="请输入政治面貌"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>民族:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.nation" maxlength="20" placeholder="请输入民族"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>联系电话:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.phone" maxlength="20" placeholder="请输入联系电话"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>密码:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.password" maxlength="20" placeholder="请输入密码"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>籍贯:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.local" maxlength="20" placeholder="请输入籍贯"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>班级:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.classes" maxlength="20" placeholder="请输入班级"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.no" maxlength="20" disabled/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>专业:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.major" maxlength="20" placeholder="请输入专业"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>课程:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.course" maxlength="20" placeholder="请输入课程"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>入学时间:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.entrance_time" maxlength="20" placeholder="请输入入学时间"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>备注:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.content" maxlength="20" placeholder="请输入备注"/>
                    </Col>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="cancelHandle">取消</Button>
                <Button type="primary" @click="okHandle">确认修改</Button>
            </div>
       </Modal>
    </div>
</template>

<script>
import {Modal,Button,Input,Message} from 'view-design'
export default {
    name:'deliverGoodsModal',
    components:{Modal,Button,Input,Message},
    props:['showDeliverGoodsModal','currentRowData'],
    data(){
        return {
            showModal:this.showDeliverGoodsModal,
            data:this.currentRowData,//展示的数据
            formItem:{
                name:'',
                age:'',
                gender:'',
                politics:'',
                nation:'',
                phone:'',
                password:'',
                local:'',
                no:'',
                major:'',
                course:'',
                entrance_time:'',
                content:'',
            },
        }
    },
    methods:{
        exhibition(){
          this.formItem = this.data  
        },
        cancelHandle(){
            this.showModal = false
        },
        okHandle(){
            this.axios({
                url:'/dcf/invoice/shipped',
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
        },

    },
    created(){
        this.exhibition()
    },
    watch:{
        showModal(){
            this.$emit('deliverModalState',false)
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
            height: 30px;
            line-height: 30px;
        }
        .itemForm{
            .inputStyle{
                border:1px solid #C5D2E4;
                border-radius: 5px;
                width: 90%;
            }
            .inputStyle1{
                width: 90%;
            }
        }
    }
</style>