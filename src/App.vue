<template>
    <div id="app">
        <loading/>
        <router-view />
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
    name: 'app',
    data() {
        return {

        }
    },
    components: {
        loading
    },
    mounted() {

    },
    methods: {

    }
}
</script>


<style lang="scss">
    @import './css/common.scss'; /* 公共样式 */
    @import url('//at.alicdn.com/t/font_1460625_yivsd5ghkgd.css');
    body, html, #app {
        height: 100%;
        background-color: #f3f4fa;
        padding: 0;
        margin: 0;
    }
    .ivu-message{
        height: 50px;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
        .ivu-message-notice{
            display: none;
        }
        .ivu-message-notice:last-child{
            display: block;
        }
    }

</style>
