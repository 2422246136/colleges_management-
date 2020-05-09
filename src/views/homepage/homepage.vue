<template>
    <div class="homepage">
        <vue-particles
        color="#999"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
        <Row class="title">
            <Col span="24">
                <h1>高校教学管理系统</h1>
            </Col>
        </Row>
        <div class="lunbo">
            <div class="lunbo2">
                <Carousel autoplay v-model="value2" loop>
                    <CarouselItem class="lamp">
                        <div class="demo-carousel">
                            <div class="picture">
                            <img src="~/images/index/实验楼.jpg" alt="" height="400px" width="800px">
                            </div>
                        </div>
                    </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <div class="picture">
                        <img src="~/images/index/操场.jpg" alt="" height="400px" width="800px" >
                    </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <div class="picture">
                        <img src="~/images/index/小草.jpg" alt="" height="400px" width="800px">
                    </div>
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <div class="picture">
                        <img src="~/images/index/宿舍区.jpg" alt="" height="400px" width="800px">
                    </div>
                    </div>
                </CarouselItem>
             </Carousel>
            </div>
        </div>
        <Row class="Below">
            <Col span="24">
                <h5>教学管理系统是一个随高校管理模式改进而不断改进的系统。它应该能够为用户提供充足的信息和快捷的查询手段</h5>
            </Col>
        </Row>
        <Row class="Below2">
            <Col span="24">
                <h5>本系统具备学生管理，教师管理，课程管理，成绩管理等功能。</h5>
            </Col>
        </Row>
    </div>
    
</template>
<script>
import {Button,Table,Page,Split,Carousel,CarouselItem,Collapse,Panel} from 'view-design'
import store from '@/store/store'
export default {
    name: 'homepage',
    components: {Button,Table,Page,Split,Carousel,CarouselItem,Collapse,Panel},
    data(){
        return {
            split3: 0.5,
            split4: 0.5,
            showModal:false,
             value2: 0,
            value3: '1',
            value4: '1-1',
           id:store.state.id,
           
        }
    },
    created(){
        
    },
    methods: {
       
       
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
    .homepage{
        background: url(~images/index/背景图蓝色.png) no-repeat;
        background-size: cover;
        height: 100%;
        .lunbo{
            width: 100%;
            text-align: center;
            .lunbo2{
                width: 100%;
            }
        }
        .title{
            padding-top: 30px;
            h1{
                color: #000;
                font-size: 35px;
                margin: 0;
                text-align: center;
            }
        }
        .Below{
            padding-left: 14%;
             h5{
                color: #000;
                font-size: 20px;
                // margin: 0;
                text-align: center;
            }
        }
        .Below2{
            padding-left: 17%;
            h5{
                color: #000;
                font-size: 20px;
                // margin: 0;
            }
        }
        #particles-js{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        .ivu-carousel{
            width: 60%;
            margin: 0 auto;
        }
        .demo-carousel{
            margin-top: 20px;
            margin: 0 atuo;
            .picture{
                img{
                    width: 100%;
                }
            }
            }
    }
</style>