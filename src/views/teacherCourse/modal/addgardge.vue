<template>
    <div class="addgardge">
        <Modal v-model="showModal" title="修改学生成绩" width='800px'>
            <Row class="formGroup" type='flex'>
                 <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学生编号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入学生编号" maxlength="10" v-model="formItem.student_id" class="inputStyle" disabled/>
                    </Col>
                </Col>
                
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学生姓名:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入学生姓名" maxlength="5" v-model="formItem.name" class="inputStyle" disabled/>
                    </Col>
                </Col>
               
            </Row>
            <Row class="formGroup">
                 <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学生学号:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入学生学号" maxlength="20" v-model="formItem.no" class="inputStyle" disabled/>
                    </Col>
                </Col>
                 <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>班级:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入班级" maxlength="20" v-model="formItem.classes" class="inputStyle" disabled/>
                    </Col>
                </Col>
                 </Row>
            
                 <Row class="formGroup">
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>分数:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Input placeholder="请输入分数" maxlength="3" v-model="formItem.fraction" class="inputStyle"/>
                    </Col>
                </Col>
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学年:</label>
                    </Col>
                    <Col span="19" class="itemForm"> 
                        <!-- <Input placeholder="请输入学年" maxlength="20" v-model="formItem.school_year" class="inputStyle"/> -->
                         <Select v-model="formItem.school_year" style="width:241px">
                            <Option v-for="item in cityLists" :value="item.value":key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Col>
            </Row>
            <Row class="formGroup">
                
                <Col span="12">
                    <Col span="5" class="itemName">
                        <span>*</span><label>学期:</label>
                    </Col>
                    <Col span="19" class="itemForm">
                        <Select v-model="formItem.term" style="width:241px">
                            <Option v-for="item in cityList" :value="item.value":key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="default" @click="onCancelHandle">取消</Button>
                <Button type="primary" @click="onOkHandle">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {Modal,Button,Input,Select,Message,Option} from 'view-design'
import VDistpicker from 'v-distpicker'
export default {
    components:{Modal,Button,Input,Select,VDistpicker,Message,Option},
    data(){
        return {
            showModal:this.showModalState,
            true:false,
            formItem:{
                
            },
            data:this.IdentiFication,//展示的数据
                        cityList: [
                    {
                        value: '第一学期',
                        label: '第一学期'
                    },
                    {
                        value: '第二学期',
                        label: '第二学期'
                    },
                   
                    
                ],
                  cityLists: [
                    {
                        value: '2016-2017',
                        label: '2016-2017'
                    },
                    {
                        value: '2017-2018',
                        label: '2017-2018'
                    },
                     {
                        value: '2018-2019',
                        label: '2018-2019'
                    },
                    {
                        value: '2019-2020',
                        label: '2019-2020'
                    },
                   
                    
                ],
        }
    },
    props:[
        'showModalState','currentRowData','IdentiFication'
    ],
    methods:{
        exhibition(){
          this.formItem = this.data
          this.formItem.student_id=this.data.id;
        },
        onOkHandle(){
            // if(this.identifier === 'B'){
                this.axios({
                    url:'/colleges_management/colleges_management/teacher/gardge',
                    method:'post',
                    data:JSON.stringify(this.formItem)
                }).then((res)=>{
                    if(res.code === 200){
                        console.log(res.data);
                         Message.success(res.data);
                        this.showModal=false;
                    }else{
                        Message.error(res.message);
                    }
                })
            // }else{
            //     this.axios({
            //         url:'/dcf/supplier/newsupplier',
            //         method:'post',
            //         data:JSON.stringify(this.formItem)
            //     }).then((res)=>{
            //         if(res.code === 200){
            //             Message.success(res.data);
            //             this.showModal=false;
            //         }else{
            //             Message.error(res.message);
            //         }
            //     })
            // }

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
    created() {
        this.exhibition()
        // console.log(this.data)
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