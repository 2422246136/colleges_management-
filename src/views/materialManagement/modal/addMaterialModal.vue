<template>
    <div class="addMaterialModal">
        <Modal v-model="showModal" title="修改信息" width='700px'>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>姓名:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入姓名" maxlength="10" v-model="formItem.name" class="inputWidth inputBorder"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>年龄:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入年龄" maxlength="20" v-model="formItem.age" class="inputWidth inputBorder"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>性别:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入性别" maxlength="20" v-model="formItem.gender" class="inputWidth inputBorder"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>民族:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入民族" maxlength="20" v-model="formItem.nation" class="inputWidth inputBorder"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>联系电话:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入联系电话(账号)" maxlength="20" v-model="formItem.phone" class="inputWidth inputBorder"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName"> 
                        <label>密码:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入密码" maxlength="20" v-model="formItem.password" class="inputWidth inputBorder"/>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <label>系:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入系" maxlength="20" v-model="formItem.college" class="inputWidth inputBorder"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName"> 
                        <label>备注:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入备注" maxlength="20" v-model="formItem.content" class="inputWidth inputBorder"/>
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
export default {
    components:{Modal,Button,Input,Select,Message},
    data(){
        return {
            showModal:this.showModalState,
            data:this.currentRowData,
            formItem:{
                 name:'',  
                 age:'', 
                 gender:'', 
                 nation:'', 
                 phone:'', 
                 password:'', 
                 college:'', 
                 content:'', 
            }
            
        }
    },
    props:[
        'showModalState','currentRowData'
    ],
    methods:{
        exhibition(){
          this.formItem = this.data  
        },
        onOkHandle(){
            this.axios({
                url:'',
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
        }
    },
    created() {
        this.exhibition()
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
            height: 30px;
            line-height: 30px;
        }
        .itemForm{
            .inputBorder{
                border:1px solid #C5D2E4;
                border-radius: 5px;
            }
            .inputWidth{
                width: 240px;
            }
        }
    }
    .itemStyle{
        margin-left: -17px;
    }
</style>