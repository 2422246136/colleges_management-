<template>
    <div class="student">
       <Modal v-model='showModal' title="修改学生信息" width='800'>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>姓名:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.name" maxlength="4" disabled/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span></span><label>年龄:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.age" maxlength="2" placeholder="请输入年龄"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>性别:</label>
                    
                    </Col>
                    <Col span="19" class="itemForm">
                    <Select style="width:90%"  v-model="formItem.gender" class="inputStyle" >
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                    </Select>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>政治面貌:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.politics" maxlength="20" placeholder="请输入政治面貌"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>民族:</label>
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
                        <Input class="inputStyle" v-model="formItem.phone" maxlength="11" placeholder="请输入联系电话"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>密码:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input type="password" password class="inputStyle" v-model="formItem.password" maxlength="20" placeholder="请输入密码"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                       <label>籍贯:</label>
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
                        <Input class="inputStyle" v-model="formItem.classes" maxlength="8" placeholder="请输入班级"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.no" maxlength="10" disabled/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                       <label>专业:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input class="inputStyle" v-model="formItem.major" maxlength="20" placeholder="请输入专业"/>
                    </Col>
                </Col>
              
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>入学时间:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                    <DatePicker @on-change="handleChange" type="date" placeholder="入学时间" v-model="formItem.entrance_time" style="width: 270px"></DatePicker>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                
                <Col span="12">
                    <Col span="5" class="itemName">
                      <label>备注:</label>
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
import {Modal,Button,Input,Message,DatePicker,DropdownItem,Select,Option} from 'view-design'
export default {
    name:'student',
    components:{Modal,Button,Input,Message,DatePicker,DropdownItem,Select,Option},
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
                classes:'',
                no:'',
                major:'',
                // course:'',
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
                url:'/colleges_management/colleges_management/student/update',
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
            handleChange (date) {
                this.value3 = date;
                console.log(date)
                var a = new Date(date)
                console.log(a)
                this.formItem.entrance_time = a
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