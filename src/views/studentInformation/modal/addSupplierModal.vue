<template>
    <div class="addSupplierModal">
        <Modal v-model="showModal" title="删除学生成绩">
            <p style="text-align:center">是否删除该学生成绩？</p>
            <div slot="footer">
                <Button type="default" @click="onCancelHandle">取消</Button>
                <Button type="primary" @click="onOkHandle">确定删除</Button>
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
            id:this.currentRowData.id
        }
    },
    props:[
        'showModalState','currentRowData',
    ],
    methods:{
        onOkHandle(){ // 确认删除
            console.log(this.id)
            this.axios({
                url:'/colleges_management/colleges_management/teacher/deletegardge',
                method:'get',
                params:{id:this.id}
            }).then((res)=>{
                console.log(res)
                if(res.code === 200){
                    Message.success(res.data);
                    this.showModal=false;
                }else{
                    Message.error(res.message);
                }
            })
        },
        onCancelHandle(){ // 取消删除
            this.showModal=false;
        },
        onSelected(data) {
            this.formItem.province = data.province.value
            this.formItem.city = data.city.value
            this.formItem.area = data.area.value
        },
    },
    created() {
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