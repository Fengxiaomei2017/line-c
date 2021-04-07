<template>
  <div class="comment">
    <div class="score">
      <label>卫生:</label>
      <rater v-model="healthScore" :font-size="28"></rater>
    </div>
    <div class="score">
      <label>服务:</label>
      <rater v-model="serviceScore" :font-size="28"></rater>
    </div>
    <div class="score">
      <label>安全:</label>
      <rater v-model="securityScore" :font-size="28"></rater>
    </div>
    <div class="score">
      <label>特色:</label>
      <rater v-model="featuresScore" :font-size="28"></rater>
    </div>
    <div class="comment-input">
      <label>填写评论</label>
      <x-textarea v-model="content" placeholder="评论" :height="150" :show-counter="true" :max="200"></x-textarea>
    </div>
    <div class="pic-upload">
      <label>上传图片</label>
      <upload v-on:fileList="computeImgs"></upload>
    </div>
    <button v-on:click="_addComment">发表评论</button>
  </div>
</template>

<script>
import {Rater, XTextarea} from 'vux'
import upload from '@/components/upload'
import {addComment} from '@/api/getData'
import {MessageBox} from 'mint-ui'
export default {
  data () {
    return {
      healthScore: 4,
      featuresScore: 4,
      serviceScore: 4,
      securityScore: 4,
      content: '',
      orderId: '',
      shopId: '',
      goodsId: '',
      images: ''
    }
  },
  components: {
    Rater,
    XTextarea,
    upload
  },
  methods: {
    _addComment () {
      // let createrId = this.$store.state.user.id
      let evaluate = {
        orderNo: this.orderNo,
        userId: this.userId,
        featuresScore: this.featuresScore,
        serviceScore: this.serviceScore,
        securityScore: this.securityScore,
        healthScore: this.healthScore,
        content: this.content,
        images: this.images
      }
      addComment(evaluate).then(res => {
        if (res.data.state === 1) {
          MessageBox('提示', '发表评论成功')
          this.$router.push('/my-orders')
        }
      })
    },
    computeImgs (arr) {
      this.images = arr.join(',')
    }
  },
  created () {
    this.orderNo = this.$route.query.orderNo
    this.userId = this.$store.state.lineUser.id
    // this.userId = this.$store.state.lineUser.merchatId
    // if (this.$route.query.orderId) {
    //   this.orderId = this.$route.query.orderId
    // }
    // if (this.$route.query.shopId) {
    //   this.shopId = this.$route.query.shopId
    // }
    // if (this.$route.query.goodsId) {
    //   this.goodsId = this.$route.query.goodsId
    // }
  }
}
</script>

<style lang="less" scoped>
  @import "../style/main.less";
  .comment {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #f2f2f2;
    .score {
      width: 100%;
      .px2rem(height, 50);
      .px2rem(line-height, 50);
      .px2rem(padding-left, 20);
      font-size: @font-14;
      text-align: left;
      color: #4c4c4c;
      background-color: #fff;
      label {
        .px2rem(margin-right, 10);
      }
    }
    .comment-input, .pic-upload {
      width: 100%;
      .px2rem(margin-top, 10);
      background-color: #fff;
      font-size: @font-12;
      label {
        display: block;
        width: 100%;
        .px2rem(padding-left, 20);
        font-size: @font-14;
        color: #4c4c4c;
        .px2rem(height, 40);
        .px2rem(line-height, 40);
        margin-bottom: 0;
        border-bottom: 0.5px solid #dcdcdc;
      }
      textarea {
        text-indent: 1em;
        font-size: @font-14;
      }
    }
    .pic-upload {
      label {
        border-bottom: 1px solid #dcdcdc;
      }
    }
    button {
      display: block;
      .px2rem(width, 300);
      .px2rem(height, 40);
      .px2rem(line-height, 40);
      margin: 0 auto;
      .px2rem(margin-top, 20);
      .px2rem(margin-bottom, 60);
      font-size: @font-16;
      color: #fff;
      text-align: center;
      border: none;
      background-color: #3797db;
      border-radius: 5px;
      &:active {
        background-color: #338bc8;
      }
    }
  }

</style>
