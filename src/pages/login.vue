<template>
  <div class="login-page">
    <h5 class="yellow text-center">线  路</h5>
    <div class="tab">
      <a class="static"
         @click="tab(true)"
         :class="{hover:flag}">账号登录</a>
      <a class="dynamics"
         @click="tab(false)"
        :class="{hover:!flag}">动态密码登录</a>
    </div>
    <div class="login-body">
      <input type="tel" name="name" class="form-control" v-model="phoneNum" placeholder="手机号"/>
      <div class="code-item">
        <input v-model="code" v-show="this.flag" type="password" class="form-control" placeholder="密码"/>
        <input v-model="validateCode" v-show="!this.flag" type="text" class="form-control" placeholder="验证码"/>
        <code-item
          v-show="!this.flag"
          :phoneNum="phoneNum"
          :isCodeDeynamicLogin="true"
          v-on:errorMsg="errorMsg"></code-item>
      </div>
      <a @click.stop="rePassword">忘记密码 ?</a>
    </div>
    <p class="msg">{{msg}}</p>
    <div class="login-btn">
      <button class="btn" @click.stop="_login">登录</button>
      <button class="btn" @click.stop="register">注册</button>
    </div>
  </div>
</template>

<script>
import code from '@/components/code'
import {login, loginByCode, wxLogin} from '@/api/getData'
import {getParams} from '@/config/mUtils'
import {mapMutations} from 'vuex'
import {Toast} from 'mint-ui'

export default {
  data () {
    return {
      flag: true,
      phoneNum: '',
      code: '',
      validateCode: '',
      msg: '',
      path: ''
    }
  },
  components: {
    codeItem: code
  },
  watch: {
    phoneNum () {
      this.msg = ''
    },
    code () {
      this.msg = ''
    }
  },
  methods: {
    ...mapMutations([
      'SET_USER',
      'SET_TOKEN'
    ]),
    tab (flag) {
      this.flag = flag
      this.msg = ''
    },
    errorMsg (msg) {
      this.msg = msg.text
    },
    _login () {
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
        if (this.flag) {
          login(this.phoneNum, this.code).then(res => {
            if (res.data.state === 1) {
              let data = res.data.data
              if (data) {
                this.SET_USER(data)
              }
              if (res.data.token) {
                this.SET_TOKEN(res.data.token)
              }
              if (this.path) {
                this.$router.push(this.path)
              } else {
                this.$router.push('/home')
              }
            } else {
              this.msg = res.data.message
            }
          })
        } else {
          if (!this.validateCode) {
            Toast({
              message: '请输入验证码',
              type: 'warn',
              position: 'middle'
            })
          } else {
            loginByCode(this.phoneNum, this.validateCode).then(res => {
              // let data = res.data.data
              if (res.data.state === 1) {
                // if (data.info) {
                //   let lineUser = JSON.parse(data.info.replace('\\', ''))
                //   this.SET_USER(lineUser)
                // }
                // if (data.token) {
                //   this.SET_TOKEN(data.token)
                // }
                let data = res.data.data
                if (data) {
                  this.SET_USER(data)
                }
                if (res.data.token) {
                  this.SET_TOKEN(res.data.token)
                }
                if (this.path) {
                  this.$router.push(this.path)
                } else {
                  this.$router.push('/home')
                }
              } else {
                this.msg = res.data.message
              }
            })
          }
        }
      }
    },
    register () {
      this.$router.push('/register')
    },
    rePassword () {
      this.$router.push('/rePassword')
    },
    _wxLogin () {
      let params = getParams(window.location.href)
      if (params) {
        let code = params.code || ''
        if (code) {
          wxLogin(code).then(res => {
            let data = res.data.data
            if (res.data.state === 1) {
              if (data.info) {
                let lineUser = data.info
                this.SET_USER(lineUser)
              }
              if (data.token) {
                this.SET_TOKEN(data.token)
              }
              if (this.path) {
                this.$router.push(this.path)
              } else {
                this.$router.push('/')
              }
            } else {
              this.$router.push('/login')
            }
          })
        }
      }
    }
  },
  created () {
    if (this.$route.query.path) {
      this.path = this.$route.query.path
    }
    document.querySelector('title').innerText = '登录'
    this._wxLogin()
  }
}
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../style/main.less";

  .login-page {
    /*width: 100%;*/
    /*height: 100%;*/
    .px2rem(padding-top, 30);
    background-color: @level;
    .msg {
      position: absolute;
      width: 100%;
      .px2rem(margin-left, 50);
      .px2rem(margin-top, 10);
      .px2rem(font-size, 12);
      color: red;
    }
    .tab {
      width: 13rem;
      margin: 0 auto;
      a {
        display: inline-block;
        width: 6.25rem;
        height: 2.5rem;
        font-size: 0.75rem;
        line-height: 2.5rem;
        text-align: center;
        color: #4c4c4c;
        background-color: #ffffff;
        &.static {
          .px2rem(border-top-left-radius, 16);
          .px2rem(border-bottom-left-radius, 16);
        }
        &.dynamics {
          .px2rem(border-top-right-radius, 16);
          .px2rem(border-bottom-right-radius, 16);
        }
        &.hover {
          color: #ffffff;
          background-color: @yellow;
        }
      }
    }
    .login-body {
      width: 100%;
      padding-bottom: 0.1rem;
      .px2rem(margin-top, 30);
      background-color: #ffffff;
      border-top: solid #dcdcdc 1px;
      border-bottom: solid #dcdcdc 1px;
      input {
        display: block;
        .px2rem(height, 40);
        .px2rem(width, 310);
        .px2rem(font-size, 15);
        margin: 0 auto;
        border: none;
        color: #b0b0b0;
        list-style: none;
        font-style: normal;
        text-decoration: none;
        border: none;
        font-family: Microsoft Yahei,sans-serif;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        &:focus{
          outline: none;
        }
      }
      .code-item {
        position: relative;
        .px2rem(height, 40);
        .px2rem(width, 310);
        margin: 0 auto;
        .px2rem(margin-top, 3);
        border-top: 1px solid #d2d2d2;
        input {
          position: absolute;
         /* .px2rem(width, 200);*/
          left: 0;
          right: 0;
          margin: 0;
        }
      }
      a {
        float: right;
        text-align: right;
        margin: 0 auto;
        .px2rem(margin-top, 15);
        .px2rem(margin-right, 40);
        .px2rem(font-size, 12);
        color: #b0b0b0;
      }
    }
    .login-btn {
      .px2rem(margin-top, 54);
      padding: 1rem;
      button {
        display: block;
        .px2rem(width, 300);
        .px2rem(height, 40);
        background-color: @yellow;
        .px2rem(font-size, 20);
        margin: 0 auto;
        border-radius: 5px;
        text-align: center;
        color: #fff;
        &:active {
          background-color: #338bc8;
        }
        &:last-child {
          .px2rem(margin-top, 10);
          background-color: #ffffff;
          color: #4c4c4c;
          &:active {
            background-color: #e5e5e5;
          }
        }
      }
    }
  }
</style>
