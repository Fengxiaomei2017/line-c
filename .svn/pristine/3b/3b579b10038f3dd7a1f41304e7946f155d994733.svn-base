<template>
  <div class="register">
    <div class="register-body">
      <input type="tel" placeholder="手机号" v-model="phoneNum"/>
      <div class="code-item">
        <input class="code" type="number" placeholder="验证码" v-model="validateCode"/>
        <code-item :phoneNum="phoneNum" v-on:errorMsg="errorMsg" :isCodeRegister="true"></code-item>
      </div>
      <input type="text" class="pwd" placeholder="请输入密码" v-model="password"/>
    </div>
    <p class="msg">{{msg}}</p>
    <a href="javascript:void(0)" v-on:click="backLogin">返回登录<i></i></a>
    <button class="btn register-btn" @click.stop="_register">注册</button>
  </div>
</template>

<script>
import {register} from '@/api/getData'
import code from '@/components/code'
import {mapMutations} from 'vuex'
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      phoneNum: '',
      password: '',
      validateCode: '',
      msg: ''
    }
  },
  components: {
    codeItem: code
  },
  watch: {
    password () {
      this.msg = ''
    }
  },
  methods: {
    ...mapMutations([
      'SET_USER',
      'SET_TOKEN'
    ]),
    _register() {
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
        register(this.phoneNum, this.password, this.validateCode).then((res) => {
          let r = {
            'state': 1,
            'msg': 'success',
            'message': '注册成功',
            'data': {
              'id': '629e72bd007c4268a5eb922bb958cf40',
              'honor': null,
              'password': '6c1d98657f036c949079d62baaad87f1',
              'headImg': null,
              'account': '13882149136',
              'nickname': '13882149136',
              'phoneNum': '13882149136',
              'email': null,
              'level': null,
              'userType': 1,
              'gender': 0,
              'integral': 0,
              'spaceMaxLimit': 0,
              'active': null,
              'personalLabel': null,
              'isTalent': false,
              'isSilent': false,
              'honorPoint': 0,
              'freezeThaw': 0,
              'freezingCause': null,
              'freezingDays': 0,
              'remarks': null,
              'longitude': null,
              'latitude': null,
              'countyId': null,
              'regSource': 2,
              'merchatId': null,
              'regTime': null,
              'lastLoginTime': null,
              'signature': null,
              'status': 1,
              'updateTime': null,
              'createTime': null,
              'pname': null,
              'isNavy': 0,
              'birthday': null,
              'freezingDate': null,
              'releases': 0,
              'profile': null,
              'age': null,
              'height': 0.0,
              'homeTown': null,
              'userSingature': null,
              'province': null,
              'city': null,
              'county': null,
              'pcc': null,
              'openId': null,
              'qq': null,
              'payPassword': null,
              'isTopicCall': 0,
              'loginState': null,
              'idCard': null,
              'idCardImg': null,
              'isAuth': 101,
              'isRookie': 0
            }
          }
          if (res.state === 1) {
            this.SET_USER(res.data.data)
            this.$router.push('/')
          } else {
            this.msg = res.data.message
            // setTimeout(() => {
            //   this.msg = ''
            // }, 60000)
          }
          /* if (res.data.userInfo) {
              this.SET_USER(res.data.userInfo)
              this.$router.push('/')
            } else {
              this.msg = res.data.message
              setTimeout(() => {
                this.msg = ''
              }, 1000)
            }*/
        }).catch(e => console.log(e))
      }
    },
    backLogin() {
      this.$router.push('login')
    },
    errorMsg(msg) {
      this.msg = msg.text
      // setTimeout(() => {
      //   this.msg = ''
      // }, 60000)
    }
  },
  created() {
    document.querySelector('title').innerText = '注册'
  }
}
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  @import "../style/main.less";

  .register {
    /*height: 100%;*/
    /*width: 100%;*/
    .px2rem(padding-top, 15);
    background-color: @white;
    .register-body {
      width: 100%;
      .px2rem(height, 120);
      background-color: #ffffff;
      input {
        display: block;
        height: 2rem;
        width: 18.6rem;
        /* font-size: 2rem; */
        margin: 0 auto;
        border: none;
      }
      .code-item {
        position: relative;
        height: 2.5rem;
        width: 18.75rem;
        margin: 0 auto;
        border-bottom: 1px solid #d2d2d2;
        border-top: 1px solid #d2d2d2;
        input {
          position: absolute;
          width: 18.6rem;
          left: 0;
          right: 0;
          margin: 0;
        }
      }
      .pwd {
        border-bottom: 1px solid #d2d2d2;
        height: 2.5rem;
      }
    }
    .register-btn {
      display: block;
      .px2rem(width, 300);
      .px2rem(height, 40);
      background-color: @yellow;
      /* .px2rem(font-size, 20);*/
      margin: 0 auto;
      .px2rem(margin-top, 50);
      border-radius: 5px;
      text-align: center;
      color: #fff;
      &:active {
        background-color: #338bc8;
      }
    }
    .msg {
      position: absolute;
      .px2rem(margin-top, 10);
      .px2rem(margin-left, 35);
      /*.px2rem(font-size, 30);*/
      color: red;
    }
    a {
      float: right;
      position: relative;
      .px2rem(height, 50);
      .px2rem(line-height, 50);
      .px2rem(margin-right, 45);
      /*.px2rem(font-size, 30);*/
      color: @yellow;
      & > i {
        display: inline-block;

        .px2rem(width, 7);
        .px2rem(height, 6);
        /* .bg-image('../page/register/img/dayu');*/
      }
    }
  }

</style>
