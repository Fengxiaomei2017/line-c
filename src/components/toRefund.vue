<template>
  <div class="refund">
      <header class="mint-header is-fixed">
        <div class="mint-header-button is-left">
          <div class="">
            <button class="mint-button mint-button--default mint-button--normal" @click="cancelRefund">
              <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
              <label class="mint-button-text"></label>
            </button>
          </div>
        </div>
        <h1 class="mint-header-title">退款申请</h1>
        <div class="mint-header-button is-right">
        </div>
      </header>
      <h5 class="refund-title">退款原因：</h5>
      <textarea rows="8" v-model="reason"></textarea>
      <div style="text-align: center;">
        <button class="btnnew btn-default"
                @click="cancelRefund">取消</button>
        <button class="btnnew btn-primary"
                @click="_refundFn">确认</button>
      </div>
  </div>
</template>
<script>
import {refundOrder} from '@/api/getData'
import {MessageBox} from 'mint-ui'
export default {
  props: ['orderNo'],
  data () {
    return {
      id: '',
      reason: ''
    }
  },
  created () {
    this.id = this.$store.state.lineUser.id
  },
  methods: {
    cancelRefund () {
      this.$emit('watchRefund')
    },
    _refundFn () {
      refundOrder(this.$store.state.lineUser.id, this.orderNo, this.reason).then(res => {
        if (res && res.data.state === 1) {
          MessageBox('提示', res.data.message)
          this.$emit('watchRefund')
        }
      })
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" type="text/less" scoped>
  @import "../style/main.less";
  .refund {
    position: fixed;
    .px2rem(top, 40);
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background-color: #fff;
    .refund-title, textarea {
      margin: 0 5%;
      .px2rem(margin-top, 10);
    }
    textarea {
      width: 90%;
      border: 1px solid #ccc;
    }
    .btnnew {
      .px2rem(width, 100);
      .px2rem(height, 40);
      .px2rem(margin-top, 10);
      .px2rem(border-radius, 4);
      &.btn-default {
        .px2rem(margin-right, 8);
        color: #fff;
        background-color: #ccc;
        border: 1px solid #ccc;
      }
      &.btn-primary {
        .px2rem(margin-left, 8);
        border: 1px solid #007bff;
      }
    }
  }
</style>
