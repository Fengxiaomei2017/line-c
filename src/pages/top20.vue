<template>
  <div>
    <mt-header fixed title="线路列表">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/my-orders" slot="right">
        <i class="iconfont icon-dingdan"></i>
      </router-link>
    </mt-header>
    <Tab :tab-list="tablist" :selected="selected"></Tab>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" style="top:90px;">
      <mt-tab-container-item id="theme">
        <div class="filter">
          <button type="button" class="btn btn-primary btn-sm">全部</button>
          <button type="button" class="btn btn-secondary btn-sm">温泉之旅</button>
          <button type="button" class="btn btn-secondary btn-sm">主题2</button>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="days">
        <div class="filter">
          <button type="button" class="btn btn-primary btn-sm">全部</button>
          <button type="button" class="btn btn-secondary btn-sm">1天</button>
          <button type="button" class="btn btn-secondary btn-sm">2-3天</button>
          <button type="button" class="btn btn-secondary btn-sm">4-5天</button>
          <button type="button" class="btn btn-secondary btn-sm">5-10天</button>
          <button type="button" class="btn btn-secondary btn-sm">10-15天</button>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="way">
        <div class="filter">
          <button type="button" class="btn btn-primary btn-sm">全部</button>
          <button type="button" class="btn btn-secondary btn-sm">包车</button>
          <button type="button" class="btn btn-secondary btn-sm">拼车</button>

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="sort">
        <div class="filter">
          <button type="button" class="btn btn-primary btn-sm">综合排序</button>
          <button type="button" class="btn btn-secondary btn-sm">受欢迎程度</button>
          <button type="button" class="btn btn-secondary btn-sm">价格最高</button>
          <button type="button" class="btn btn-secondary btn-sm">价格最低</button>
          <button type="button" class="btn btn-secondary btn-sm">评论最多</button>
          <button type="button" class="btn btn-secondary btn-sm">评分最高</button>
          <button type="button" class="btn btn-secondary btn-sm">销量最多</button>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div>
      <a class="card img-fluid" v-for="road in roadList" href="#/details">
        <img class="card-img-top" v-lazy="road.pic">
        <div class="card-title font-18">
          <i class="iconfont icon-shuqianbookmark11"></i>
          <div class="white font-16 day-num">{{road.days}}天</div>
        </div>
        <div class="card-img-overlay">
          <div class="black-overlay">
            <p class="card-text">{{road.describe}}</p>
            <div href="#" class="startingPoint small strong">[{{road.startingPoint}}出发]</div>
            <div class="price yellow"><span>￥</span>
              <b class="price-num">{{road.price}}</b><span> 起</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>

  import avatar from '@/assets/timg.jpg'
  import Tab from '@/components/tab';
  import Vue from 'vue'

  Vue.component(Tab.name, Tab);

  export default {
    name: 'List',
    data() {
      return {
        selected: 'theme',
        tablist: [{
          tabID: 'theme',
          tabText: '线路主题',

        }, {
          tabID: 'days',
          tabText: '游玩天数',

        }, {
          tabID: 'way',
          tabText: '出行方式',

        }, {
          tabID: 'sort',
          tabText: '排序'
        }
        ],
        roadList: [
          {
            days: 14,
            describe: '看色达盛景，观礼天葬，拍摄雪景下的色达全景',
            startingPoint: '成都',
            pic: avatar,
            price: 400
          }, {
            days: 12,
            describe: '听法闻法，拍摄雪景下的色达全景看色达盛景，拍摄雪景下的色达全景',
            startingPoint: '成都',
            pic: avatar,
            price: 400
          }, {
            days: 14,
            describe: '听法闻法，拍摄雪景下的色达全景看色达盛景，观礼天葬，转绕坛城',
            startingPoint: '成都',
            pic: avatar,
            price: 400
          }, {
            days: 13,
            describe: '听法闻法，拍摄雪景下的色达全景看色达盛景，观礼天葬，转绕坛城',
            startingPoint: '都江堰',
            pic: avatar,
            price: 400
          }
        ]
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less" scoped>

  @import "../style/main.less";

  .filter {
    min-height: 130px;
  }

  .card {
    .px2rem(padding, 8);
    border: 0;
    background: #eee;
    border-radius: 0;
    color: #fff;

    .card-img-top {
      .px2rem(border-radius, 5);
      .px2rem(height, 188);
    }

    .card-text {
      .px2rem(line-height, 20);
    }

    .card-title {
      position: absolute;
      .px2rem(left, 8);
      .px2rem(top, 15);
      /*border:1px solid red;*/
      /*background: @orange;*/
      /*padding: 5px;*/

      .iconfont:before {
        color: #eb4710;
        /*.px2rem(font-size, 80);*/
        font-size: 5.4rem;
        margin-left: -1rem;
        transform: rotate(-90deg);
        margin-top: -2rem;
        display: inline-block;
      }

      .day-num {
        z-index: 1;
        position: absolute;
        top: 1.3rem;
      }
    }

    .black-overlay {
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      /*top: 65%;*/
      right: 0.5rem;
      bottom: 0.5rem;
      left: 0.5rem;
      .px2rem(padding, 10);
      .px2rem(height, 75);
      .px2rem(border-bottom-right-radius, 5);
      .px2rem(border-bottom-left-radius, 5);

      .price {
        position: absolute;
        right: 1rem;
        bottom: 0rem;
        .price-num {
          .px2rem(font-size, 25);
        }
      }
    }

    .startingPoint {
      position: absolute;
      bottom: 0.25rem;
    }

  }


</style>


