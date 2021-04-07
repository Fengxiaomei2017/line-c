<template>
  <div class="timeline">
    <div class="timeline-line">
      <div class="timeline-post turqoise-post" v-for="item in itemList">
        <div class="timeline-icon icon-dot-full">
          <div>D{{item.day}}</div>
          <!-- <div class="icon-placeholder text-center">D{{item.day}}</div> -->
        </div>
        <div class="timeline-content">
          <div class="timeline-addr">
            <span v-for="adds in item.destination"> {{adds.address}} </span>
          </div>
          <div
            class="yellow font-12 timeline-light">
            <span v-if="item.brightSpot">亮点:{{item.brightSpot}}</span>
            <span v-if="item.mileage">里程:{{item.mileage}}</span></div>
          <div class="font-gray" v-html="item.introduce"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimeLineRoad',
  props: {
    itemList: {
      type: Array
    }
//    methods: {
//      cancel () {
//        this.$emit('dialog', {flag: false})
//      },
//      sure () {
//        this.$emit('dialog', {flag: true})
//      }
//    }
  }
}
</script>

<style lang="less"  type="text/less" scoped>
  @import "../style/main.less";
.font-gray{
  .px2rem(font-size,15);
}
.timeline {
  /*background: #fff;*/
  .timeline-line {
    .px2rem(margin-top, 13);
    .px2rem(margin-bottom, 20);
    margin-left: 2.5rem;
    padding-bottom: 0.2rem;
    border-left: 2px solid #e5e5e5;
    display: block;
  }

  .timeline-icon {
    position: absolute;
    left: 0;
    /*border-radius:50%;*/
    .px2rem(height, 40);
    .px2rem(width, 40);
    .px2rem(line-height, 40);
    .px2rem(margin-left, 20);
    .px2rem(font-size, 33);
    color: #999;
    background-color: #fff;
  }

  .timeline-post {
    margin: 0;
    width: 100%;
    /*border: 0 none;*/
    box-sizing: border-box;
    .timeline-content {
      /*background: #fff;*/
      position: relative;

      /*-webkit-transition: all .4s;*/
      /*-moz-transition: all .4s;*/
      /*transition: all .4s;*/
      .px2rem(margin-left, 40);
      .px2rem(margin-right, 20);
      .px2rem(margin-bottom, 20);
      .timeline-addr {
        .px2rem(font-size, 15);
        .px2rem(margin-bottom, 9);
      }
      .timeline-light {
        .px2rem(margin-bottom, 16);
      }
    }
  }
}
</style>
