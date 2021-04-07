<template>
  <div>
    <header class="mint-header is-fixed">
      <a class="mint-header-button is-left" @click="goBack">
        <i class="mintui mintui-back"></i>
      </a>
      <span class="product-name">我的订单</span>
    </header>
    <Tab :tab-list="tabList" :selected="selected" v-on:selectedTab="setFilter"></Tab>
    <div
      class="content"
      v-infinite-scroll="getMoreBypage"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <div class="content-cell" v-for="order in orderList">
        <div class="row cell-title">
          <div class="col-7 sellerName">
            <span v-if="order.orderType === 1">{{order.sellerName}}</span>
            <span v-else>{{order.hotel.name}}</span>
          </div>
          <div class="col-5 text-right yellow">{{orderStateCfg[order.orderState].name}}</div>
        </div>
        <router-link :to="{name:'OrderDetails',query:{id:order.orderNo}}" class="cell-body">
        <div v-if="order.orderType === 1">
          <div class="w-40">
            <div
              class="hotelImg"
              :style="{backgroundImage: 'url('+order.orderDetailInfoVo.image+')'}"></div>
          </div>
          <div class="w-60">
            <div class="noWrap name font-15">{{order.orderDetailInfoVo.productName}}</div>
            <div class="font-12 font-gray">
              出行时间：{{order.tripTime}}
            </div>
            <div class="font-12 font-gray">
              {{order.orderDetailInfoVo.adultNumber}}成人 <span v-if="order.orderDetailInfoVo.childNumber > 0">{{order.orderDetailInfoVo.childNumber}}儿童</span>
            </div>
            <div class="price">
              <span class="font-15">订单金额:</span>
              <span class="font-16 yellow">￥</span>
              <b class="price-num font-18">{{order.orderMoney}}</b>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="w-40">
            <div
            class="hotelImg"
            :style="{backgroundImage: 'url('+order.hotel.coverImg+')'}"></div>
          </div>
          <div class="w-60">
            <div class="noWrap name font-15">{{order.orderName}}</div>
            <div class="font-12 font-gray">
              出行时间：{{order.tripTime}}
            </div>
            <div class="font-12 font-gray">
              {{order.goodsNum}}间房
              住{{order.night}}晚
            </div>
            <div class="price">
              <span class="font-15">订单金额:</span>
              <span class="font-16 yellow">￥</span>
              <b class="price-num font-18">{{order.orderMoney}}</b>
            </div>
          </div>
        </div>
        </router-link>
        <div class="text-right btn-wrapper">
 <!--          <button @click="cancel(order.orderNo)">取消订单</button> -->
          <button class="btn btn-sm mr-2 btn-default"
                  v-for="btn in orderStateCfg[order.orderState].options"
                  :class="btn.btnStyle"
                  @click="btn.fun(order.orderNo,order.orderMoney,order.orderDetailInfoVo.productId,order.orderType,order.shopId)">{{btn.btn}}
          </button>
          <!-- <button @click="comment(order.orderNo)">评论</button> -->
        </div>
      </div>
      <div class="content-cell" :class="orderList.length==0?'':'d-none'">没有{{selectedName}}订单</div>
    </div>
    <!--<div class="fixed-bottom">-->
    <!--<div class="row">-->
    <!--<div class="col-8 bg-white total">合计:100</div>-->
    <!--<div class="col-4 next-step">下一步-->
    <!--</div>-->
    <mt-popup
      v-model="popupVisiblePayWays"
      position="bottom"
      class="popup-pay">
      <PayCom :orderNo="orderNo" :orderMoney="orderMoney" v-on:watchClose="_closeOrder" v-on:watchOrder="getData(false)"></PayCom>
    </mt-popup>
    <mt-popup
      v-model="popupVisibleAsk"
      position="bottom"
      class="popup-ask">
      <div>
        电话
        <a href="tel:18602822925">18602822925</a>
      </div>
      <div @click="popupVisibleAsk = false">
        取消
      </div>
    </mt-popup>
    <ToRefund v-if="isRefund" :orderNo="orderNo" v-on:watchRefund="_refundGetdata"></ToRefund>
  </div>
</template>

<script>
import Tab from '@/components/tab'
import PayCom from '@/components/pay'
import ToRefund from '@/components/toRefund'
import {Popup, InfiniteScroll, MessageBox} from 'mint-ui'
import {mapMutations} from 'vuex'

import Vue from 'vue'
import {getOrderList, cancelOrder, refundOrder, sentUrgeOrder} from '@/api/getData'

Vue.component(Tab.name, Tab)
Vue.component(PayCom.name, PayCom)
Vue.component(Popup.name, Popup)

export default {
  name: 'ChooseDate',
  data() {
    return {
      popupVisiblePayWays: false,
      popupVisibleAsk: false,
      selected: 'state-0',
      selectedName: '',
      orderNo: '',
      orderMoney: '',
      pageNum: 1,
      pageSize: 5,
      total: 0,
      loading: false,
      isRefund: false,
      tabList: [{
        tabID: 'state-0',
        tabText: '全部'
      }, {
        tabID: 'state-1',
        tabText: '待支付'
      }, {
        tabID: 'state-2',
        tabText: '待消费'
      }, {
        tabID: 'state-3',
        tabText: '已完成'
      }, {
        tabID: 'state-4',
        tabText: '退款'
      }],
      orderStateCfg: {
        1: {
          name: "待支付",
          state: 1,
          options: [{btn: '取消订单', fun: this.cancel, btnStyle: ''}, {
            btn: '去支付',
            fun: this.payOrder,
            btnStyle: 'btn-yellow'
          }]
        },
        2: {
          name: "待确认",
          state: 2,
          options: [{btn: '取消订单', fun: this.cancel}, {btn: '催Ta', fun: this.urgeOrder, btnStyle: 'btn-yellow'}]
        },
        3: {
          name: "待消费",
          state: 3,
          options: [{btn: '申请退款', fun: this.refund}]
        },
        4: {
          name: "待评价",
          state: 4,
          options: [{btn: '联系客服', fun: this.showPhoneNum}, {btn: '再次购买', fun: this.anginBuy}, {
            btn: '去评论',
            fun: this.comment,
            btnStyle: 'btn-yellow'
          }]
        },
        5: {
          name: "已完成",
          state: 5,
          options: [{btn: '联系客服', fun: this.showPhoneNum}, {btn: '再次购买', fun: this.anginBuy}]
        },
        6: {
          name: "退款申请",
          state: 6,
          options: [{btn: '联系客服', fun: this.showPhoneNum}, {btn: '再次购买', fun: this.anginBuy}]
        },
        7: {
          name: "退款中",
          state: 7,
          options: [{btn: '联系客服', fun: this.showPhoneNum}, {btn: '再次购买', fun: this.anginBuy}]
        },
        8: {
          name: "退款成功",
          state: 8,
          options: [{btn: '联系客服', fun: this.showPhoneNum}, {btn: '再次购买', fun: this.anginBuy}]
        },
        9: {
          name: "已取消（商家）",
          state: 9,
          options: [{btn: '再次购买', fun: this.anginBuy}]
        },
        10: {
          name: "已取消（用户）",
          state: 10,
          options: [{btn: '再次购买', fun: this.anginBuy}]
        },
        11: {
          name: "已取消（系统）",
          state: 11,
          options: [{btn: '再次购买', fun: this.anginBuy}]
        },
        12: {
          name: '已评论',
          state: 12,
          options: [{btn: '联系客服', fun: this.showPhoneNum}, {btn: '再次购买', fun: this.anginBuy}]
        },
        13: {
          name: "待消费",
          state: 13
        }
      },
      orderList: []
    }
  },
  components: {
    ToRefund
  },
  methods: {
    ...mapMutations([
      'ORDER_BACK'
    ]),
    goBack () {
      let back = this.$store.state.orderBack
      if (back) {
        this.ORDER_BACK()
        window.location.href = back
      } else {
        this.$router.push('/home')
      }

    },
    getMoreBypage () {
      if (this.total !== 0 && this.orderList.length < this.total) {
        this.loading = true
        this.pageNum = this.pageNum + 1
        this.getData(true)
      }
    },
    setFilter (flilter, tabText) {
      this.selected = flilter
      this.selectedName = flilter === 'state-0' ? '' : tabText
      this.pageNum = 1
      this.getData(false)
    },
    closePopup() {
      this.popupVisiblePayWays = false
    },
    payOrder(orderNo, orderMoney) {
      this.orderNo = orderNo;
      this.orderMoney = orderMoney + ''
      this.popupVisiblePayWays = true
    },
    _closeOrder () {
      this.popupVisiblePayWays = false
      this.getData(false)
    },
    anginBuy (e1, e2, e3, e4, e5) {
      if (e4 === 2) {
        window.location.href = 'http://www.daxi51.com/hotel/#/hotelMainDetail?hotelId=' + e5
        // window.opener('http://www.daxi51.com/hotel/#/hotelMainDetail?hotelId=' + e5)
      } else {
        this.$router.push({name: 'Details', params:{id: e3}})
      }
    },
    showPhoneNum () {
      this.popupVisibleAsk = true
    },
    refund (orderNo) {
      this.isRefund = true
      this.orderNo = orderNo
    },
    _refundGetdata () {
      this.isRefund = false
      this.getData(false)
    },
    cancel (orderNo) {
      //userId,orderNo
      MessageBox.confirm('确定取消订单?').then(action => {
        cancelOrder(this.$store.state.lineUser.id, orderNo).then(res => {
          if (res && res.data.state === 1) {
            MessageBox('提示', res.data.message)
            setTimeout(() => {
              this.pageNum = 1
              this.getData(false)
            }, 2000)
          }
        })
      })
    },
    urgeOrder (orderNo) {
      if (orderNo) {
        sentUrgeOrder(orderNo).then(res => {
          if (res && res.data.state === 1) {
            MessageBox('提示', res.data.message)
            this.pageNum = 1
            this.getData(false)
          }
        })
      }
    },
    comment (orderNo) {
      this.$router.push('/comment')
      this.$router.push({'path': '/comment', query: {orderNo: orderNo}})
    },
    getData (isPush) {
      //userId, orderState,pageNumber,pageSize
      let userId = this.$store.state.lineUser.id
      let orderState = this.selected.split('-')[1]
      if (userId) {
        getOrderList(userId, orderState, this.pageNum, this.pageSize).then(res => {
            // debugger;
          if (res && res.data.state === 1 && res.data.data.list) {
            let orderList = res.data.data.list
            if (!isPush) {
              this.total = res.data.data.total
            }
            this.orderList = isPush ? this.orderList.concat(orderList) : orderList
            // console.log(this.orderList)
            this.loading = false
          }
        })
      }
    }
  },
  created () {
    this.getData(false)
  }
}
</script>


<style lang="less" type="text/less" rel="stylesheet/less" scoped>
  @import "../style/main.less";
  .popup-pay {
    width: 100%;
    /*.px2rem(height, 120);
    .px2rem(line-height, 60);
    font-size: @font-18;
    text-align: center; */
  }

  .content {
    /*margin-top: 0.3125rem;*/
    width: 100vw;
    .px2rem(margin-top, 40);
    overflow-x: hidden;

    .content-cell {
      padding-top: 0;
      &:first-child {
        margin-top: 0;
      }
      .cell-title {
        font-size: @font-16;
        .px2rem(margin-bottom, 15);
      }
      .cell-body {
        color: @font-dark;
        .w-40 {
          display: inline-block;
          .px2rem(width, 130);
          .px2rem(padding-left, 10);
          .hotelImg {
            .px2rem(height, 90);
            background-size: 100% 100%;
          }
        }
        .w-60 {
          display: inline-block;
          .px2rem(width, 200);
          .px2rem(margin-left, 12);
          .name {
            .px2rem(margin-bottom, 7);
          }
          .price {}
        }
      }
      .btn-wrapper {
        .px2rem(padding-top, 6);
        button {
          .px2rem(border-radius, 3);
        }
      }
      .price {
        .px2rem(margin-top, 5);
        font-size: @font-15;
        .price-num {
          color: @yellow;
        }
      }

      .sellerName {
        color: @font-dark;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .row + .row {
        margin-top: 0.5rem;
      }

      .btn-default {
        background: @white;
        border-color: @font-gray;
        color: @font-dark;
      }
      .btn-yellow {
        background: @yellow;
        border-color: @yellow;
        color: @white;
      }

    }
  }

  .total {
    line-height: 3rem;
    text-align: center;
  }
  /*.refund {
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
  }*/
</style>
