<template>
<div>
  <div class="timeline">
    <div class="timeline-line"
         :class="{'hidden-line': ishidden}">
      <div class="timeline-post turqoise-post"
           v-if="itemList.length > 0"
           v-for="item in itemList">
        <div class="timeline-icon icon-dot-full">
          <div class="icon-placeholder white text-center">{{item.icon}}</div>
        </div>
        <div class="timeline-content">
          <div class="yellow">{{item.content}}</div>
          <div class="font-12">{{item.theTime}}</div>
        </div>
      </div>
    </div>
    <div :class="{'mask': ismask}"></div>
  </div>
  <a href="javascript:"
     class="bottom-button"
     @click="_show">{{showOrhide}}</a>
</div>
</template>

<script>

  export default {
    name: 'TimeLine',
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
    },
    data () {
      return {
        ismask: true,
        showOrhide: '展开',
        ishidden: true
      }
    },
    methods: {
      _show () {
        if (this.ishidden) {
          this.ishidden = false
          this.ismask = false
          this.showOrhide = '收起'
        } else {
          this.ishidden = true
          this.ismask = true
          this.showOrhide = '展开'
        }
      }
    }
  }


</script>

<style lang="less" type="text/less" scoped>
@import "../style/main.less";
a:link {
  text-decoration: none;
}
.timeline {
  position: relative;
  background-color: #fff;
  /*border: 1px solid red;*/
  /*box-shadow: inset 0 -10px 60px 5px #F2EAEA;*/
  overflow-y: hidden;
  .timeline-line {
    border-left: 2px solid @yellow;
    display: block;
    margin-left: 2.5rem;
    /*padding-top: 0.5rem;*/
    padding-bottom: 0.5rem;
  }

  .hidden-line {
    .px2rem(height, 140);
  }

  .timeline-post {
    position: relative;
    margin: 0;
    width: 100%;
    /*border: 0 none;*/
    box-sizing: border-box;
    .timeline-icon {
      position: absolute;
      /*left: 0;*/
      .px2rem(left, -22);
      border-radius: 50%;
      .px2rem(height, 40);
      .px2rem(width, 40);
      .px2rem(line-height, 40);
      /*.px2rem(margin-right, 22);*/
      background-color: @yellow;
    }
    .timeline-content {
      /*background: #fff;*/
      position: relative;
      /*-webkit-transition: all .4s;*/
      /*-moz-transition: all .4s;*/
      /*transition: all .4s;*/
      .px2rem(margin-left, 30);
      .px2rem(margin-right, 20);
      .px2rem(margin-top, 20);
    }
  }

  .mask {
    position: absolute;
    width: 100%;
    .px2rem(bottom, 0);
    z-index: 999;
    .px2rem(height, 20);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 8px 8px 50px 20px #fff;
  }
}
.bottom-button {
  display: block;
  .px2rem(padding-bottom, 10);
  text-align: center;
}
</style>


