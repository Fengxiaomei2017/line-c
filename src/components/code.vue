<template>
  <button
    class="code-btn"
    :class="{'code-btn-disabled': isDisabled}"
    @click.stop="_identifyCode"
    :disabled="isDisabled">
    {{isDisabled ? '' : codeText}}{{isDisabled ? '(' + countDown + ')s后重试' : ''}}
  </button>
</template>

<script>
import {identifyCode, sendLoginCode, sendUpdatePasswordCode} from '@/api/getData'
import {Toast} from 'mint-ui'
export default {
  props: {
    phoneNum: {
      type: String,
      required: true
    },
    isCodeRegister: {
      type: Boolean,
      default: false
    },
    isCodeDeynamicLogin: {
      type: Boolean,
      default: false
    },
    isCodeRepassword: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      codeText: '获取验证码',
      isDisabled: false,
      countDown: 60
    }
  },
  methods: {
    _setTime () {
      let $this = this
      let time = setInterval(function () {
        if ($this.countDown > 0) {
          $this.countDown--
        } else {
          $this.isDisabled = false
          $this.countDown = 60
          clearInterval(time)
        }
      }, 1000)
    },
    _identifyCode () {
      this.$emit('errorMsg', {text: ''})
      if (!this.phoneNum) {
        Toast({
          message: '手机号不能为空',
          type: 'warn',
          position: 'middle'
        })
      } else if (isNaN(this.phoneNum)) {
        Toast({
          message: '请输入正确的手机号',
          type: 'warn',
          position: 'middle'
        })
      } else if (this.phoneNum.toString().length !== 11) {
        Toast({
          message: '请输入11位手机号',
          type: 'warn',
          position: 'middle'
        })
      } else {
        // let $this = this
        if (this.isCodeRegister) {
          identifyCode(this.phoneNum).then(res => {
            if (res.data.state === 0) {
              this.$emit('errorMsg', {text: res.data.message})
              return
            }
            if (res.data.state === 1) {
              this.isDisabled = true
              this._setTime()
              // let time = setInterval(function () {
              //   if ($this.countDown > 0) {
              //     $this.countDown--
              //   } else {
              //     $this.isDisabled = false
              //     $this.countDown = 60
              //     clearInterval(time)
              //   }
              // }, 1000)
            }
          })
        } else if (this.isCodeDeynamicLogin) {
          sendLoginCode(this.phoneNum).then(res => {
            if (res.data.state === 0) {
              this.$emit('errorMsg', {text: res.data.message})
              return
            }
            if (res.data.state === 1) {
              this.isDisabled = true
              this._setTime()
              // let time = setInterval(function () {
              //   if ($this.countDown > 0) {
              //     $this.countDown--
              //   } else {
              //     $this.isDisabled = false
              //     $this.countDown = 60
              //     clearInterval(time)
              //   }
              // }, 1000)
            }
          })
        } else if (this.isCodeRepassword) {
          sendUpdatePasswordCode(this.phoneNum).then(res => {
            if (res.data.state === 0) {
              this.$emit('errorMsg', {text: res.data.message})
              return
            }
            if (res.data.state === 1) {
              this.isDisabled = true
              this._setTime()
              // let time = setInterval(function () {
              //   if ($this.countDown > 0) {
              //     $this.countDown--
              //   } else {
              //     $this.isDisabled = false
              //     $this.countDown = 60
              //     clearInterval(time)
              //   }
              // }, 1000)
            }
          })
        } else {
          throw new Error('未指定方式')
        }
      }
    }
  }
}
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../style/main.less";

  .code-btn {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
    height: 2rem;
    /*width: 4rem;*/
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    background-color: #1aa4ff;
    border: 1px solid #1aa4ff;
    border-radius: 5px;
  }

  .code-btn-disabled {
    background-color: #e5e5e5 !important;
    border: 1px solid #e5e5e5 !important;
  }
</style>
