<template>
    <div class="notFound">
        <img src="../assets/images/error.png" alt="">
        <p>抱歉，您访问的页面不存在......</p>
        <a href="/dashboard/">点击返回首页</a>
    </div>
</template>

<script>
export default {
    name: 'notFound'
}
</script>

<style lang="scss" scoped>
    .notFound{
        width: 100%;
        height: 100%;
        padding-top: 10%;
        text-align: center;
        img{
            display: block;
            width: 800px;
            margin: 0 auto 0 auto;
        }
        p{
            font-size: 12px;
            line-height: 72px;
            color: #7286a5;
        }
        a{
            display: block;
            width: 140px;
            height: 40px;
            margin: 0 auto;
            text-align: center;
            line-height: 40px;
            color: #4988e8;
            background: #fff;
            border-radius: 3px;
        }
    }
</style>


