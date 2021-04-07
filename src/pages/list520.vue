<template>
<div>
  <header class="mint-header is-fixed">
    <a class="mint-header-button is-left" @click="goBack">
      <i class="mintui mintui-back"></i>
    </a>
    <span class="mint-header">精品线路</span>
    <div class="mint-header-button is-right">
      <a @click="toOrder" class="my-icon"></a>
    </div>
  </header>
  <div class="list-container">
    <div class="list-lines">
      <router-link
          class="item-line"
          v-for="(item,index) in imgList"
          :key="index"
          :to="{name:'Details',params:{id:item.id}}">
        <div class="img-box">
          <img class="lazy-imgs line-img"
               v-lazy="item.imgUrl">
          <span class="day font-12">{{item.day}}</span>
        </div>
        <h5 class="line-title font-18">{{item.title}}</h5>
        <p class="line-text font-14">{{item.subTitle}}</p>
        <div class="icon-detail"></div>
      </router-link>
    </div>
  </div>
</div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      imgList: []
    }
  },
  created () {
    this.imgList = [{
      title: '【赏花之旅】凉山火把圣地',
      id: '1230a1b7088b4a6a9dd35c58163625fe',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9QGACYCSAADabhPYq5U709.jpg',
      day: '四天',
      subTitle: `日都迪萨的索玛花开满了山坡。从布拖到普格，一路上，原始的索玛花在高原竞相绽放。`
    }, {
      title: '【红色之旅】川青藏环线之旅',
      id: 'a3870b4c330d465593424a7920e3154e',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD97iACoMDAAFGfyqczIY940.jpg',
      day: '十四天',
      subTitle: `川青藏环线14天，一次体验完整畅快的川藏旅行。`
    }, {
      title: '【红色之旅】川（樟）青藏大环线之旅',
      id: 'c7375232e06b4434930b2e1df0699b3c',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9PCAYALiAAD161h3SrQ247.jpg',
      day: '十七天',
      subTitle: `川青藏大环线，满满17天，在川藏线上留下你的脚印。`
    }, {
      title: '【爱心之旅】扶贫、助学之旅（木里县）',
      id: '0bd37d6e7a9d4e0aacbec0db394252ea',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9G2AXfbeAAEwYPy8yh8729.jpg',
      day: '六天',
      subTitle: `从峡谷到古镇、从古镇到平原，不一样的景色，不一样的美。`
    }, {
      title: '【赏花之旅】川藏线春季赏花',
      id: 'd05de1dcfa424ddb8b457f4c57594a89',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9RGAcrIYAAEzXYh93wE157.jpg',
      day: '十一天',
      subTitle: `又到了赏花季节，快一起来感受花海童话的线路。`
    }, {
      title: '【红色之旅】川藏线风光之旅',
      id: '79c6bd4a7e5e45bd939bdf32ad9788b9',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9H-ACgUyAAEDAOgbVUU067.jpg',
      day: '七天',
      subTitle: `川藏公路，原称康藏公路，最初起点位于雅安，后延长至四川成都，终点为西藏拉萨，全长2100多公里，是318国道的一部分。`
    }, {
      title: '【探秘之旅】神秘措普沟',
      id: '0e4368e9239a4e1b96e760034121596f',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9I-AX1c5AAEOPpl_DK0579.jpg',
      day: '四天',
      subTitle: `巍峨的华山、清澈见底的湖泊、茂密的森林、连绵的湿地、奔跑的溪流，随处可见的地热温泉、四处奔跑的野生动物。`
    }, {
      title: '【摄影之旅】花开莲花湖',
      id: '2be3bb42550b4d63ae997269d0dc9ec2',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9JmANjBvAAFKABARALM255.jpg',
      day: '四天',
      subTitle: `莲花湖又名合合海子，有大小两个。其得名缘于海子边有一种繁盛的高山植物，当地藏民称为“合合”草，其叶阔如蒲扇，有香气，用来包酥油不易变质。`
    }, {
      title: '【佛系之旅】天边佛国色达',
      id: '24deacdbd122459885077a61f1fcee61',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9KeAWISDAAEF-aybWHE597.jpg',
      day: '五天',
      subTitle: `如果有人说，要去什么地方净化自己，我觉得色达是最适合的。`
    }, {
      title: '【文化之旅】玛卿岗日六日精品文化之旅',
      id: '77d68f8f4e5642399105e2a13e852e11',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9LOACwhCAADRHIpS08g023.jpg',
      day: '六天',
      subTitle: `年保玉则，又名果洛山、年宝叶什则，位于青海省久治县索呼日麻乡、白玉乡境内。`
    }, {
      title: '【探秘之旅】石渠',
      id: 'cd06dab22d5449308174037ae43d80f9',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9MKAFs1KAADsQztFbgI668.jpg',
      day: '六天',
      subTitle: `松格玛尼石经城位于石渠县城70公里左右的阿日扎乡内，它始建于格萨尔王时期，距今已有一千多年。`
    }, {
      title: '【文化之旅】德格',
      id: '0f197881cfbb41229acb2c535453f149',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9MuAWDylAAFIjdz4vtE163.jpg',
      day: '六天',
      subTitle: `一个属于草原，属于候鸟，属于花海，属于游牧的季节。`
    }, {
      title: '【文化之旅】重走文成走过的唐蕃古道',
      id: '3ebfb279385f483bb61d489ba609ce15',
      imgUrl: 'http://119.23.242.151:8080/group2/M00/00/32/oYYBAFsD9NeABEcAAADTeHy_fdA628.jpg',
      day: '十天',
      subTitle: `千百年来，唐蕃古道作为祖国内地通往西南边陲的大道，象是一条情谊缠绵的纽带，联结着藏汉人民友好团结的感情。`
    }]
    // this.checkImg()
    if (this.user) {
      this.loginMsg = '退出登陆'
    } else {
      this.loginMsg = ''
    }
  },
  methods: {
    ...mapMutations([
      'ORDER_BACK'
    ]),
    toOrder () {
      var orderBack = window.location.href
      this.ORDER_BACK(orderBack)
      this.$router.push('/my-orders')
    },
    goBack () {
      this.$router.push('/home')
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import "../style/main.less";
  a:hover, a:active {
    text-decoration: none;
  }
  .list-container {
    width: 95vw;
    .px2rem(max-width, 500);
    margin: 0 auto;
    .px2rem(margin-top, 50);
    h4 {
      .px2rem(margin-bottom, 10);
    }
    .item-line {
      display: block;
      .px2rem(height, 260);
      .px2rem(margin-bottom, 20);
      border-radius: 10px;
      box-shadow: 0 0 20px #B6B6B6;
      .img-box {
        position: relative;
        .line-img {
          display: block;
          width: 100%;
          .px2rem(height, 130);
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          /*background-color: #8E82F7;*/
        }
        .day {
          position: absolute;
          .px2rem(left, 10);
          .px2rem(top, 10);
          .px2rem(height, 20);
          .px2rem(padding-left, 10);
          .px2rem(padding-right, 10);
          color: #fff;
          text-align: center;
          border: 1px solid #fff;
          border-radius: 15px;
        }
      }
      .line-title, .line-text {
        .px2rem(margin-left, 10);
        .px2rem(margin-right, 8);
      }
      .line-title {
        .px2rem(height, 35);
        .px2rem(line-height, 40);
        margin-bottom: 0;
        color: #454444;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .line-text {
        .px2rem(line-height, 20);
        .px2rem(min-height, 60);
        margin-bottom: 0;
        color: #C0BDBD;
        overflow: hidden;
      }
      .icon-detail {
        float: right;
        .px2rem(width, 15);
        .px2rem(height, 15);
        .bg-image('../../static/img/jiantou');
        .px2rem(margin-bottom, 10);
        .px2rem(margin-right, 20);
        font-size: 20px;
        color: #DD4230;
      }
    }
  }
  /*.line-img[lazy=loading] {
    background-image: url('../../static/img/lording.gif');
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }*/
</style>
