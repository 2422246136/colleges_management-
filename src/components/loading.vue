<template>
    <div id="loadingPage" v-if="loadingPage != 0"></div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "loading",
        data() {
            return {
                loadingPage1: true
            }
        },
        computed: {
             ...mapGetters(['loadingPage']),
        }
    }
</script>

<style scoped>
    #loadingPage {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: rgba(0, 0, 0, 0.3) url("../assets/images/loading/loading.gif") center center no-repeat;
        background-size: 40px auto;
        z-index: 1000000;
    }
</style>