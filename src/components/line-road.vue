<template>
  <div class="line-list">
    <div v-for="line in lineList" class="line-one">
      <div class="line">
        <div class="circle"></div>
      </div>
      <div class="road-text">{{line}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['lineList']
  // data () {
  //   return {
  //     lineList: ['色达', '色达', '色达', '色达', '色达', '色达']
  //   }
  // }
}
</script>
<style lang="less">
  @import "../style/main.less";
  .line-list {
    width: 80%;
    .px2rem(margin-bottom, 15);
    .line-one {
      position: relative;
      display: inline-block;
      border-top: 2px solid #E6E6E6;
      .px2rem(height, 30);
      .px2rem(margin-top, 10);
      .line {
        .px2rem(width, 50);
        .px2rem(height, 15);
        .circle {
          position: absolute;
          .px2rem(top, -7.5);
          left: 50%;
          transform: translateX(-50%);
          .px2rem(width, 15);
          .px2rem(height, 15);
          border: 2px solid #E6E6E6;
          border-radius: 50%;
          background-color: #fff;
        }
      }
      .road-text {
        .px2rem(line-height, 15);
        text-align: center;
      }
    }
  }
</style>
