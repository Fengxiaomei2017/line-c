<template>
  <div style="overflow-x:hidden">
    <header class="mint-header is-fixed">
      <a class="mint-header-button is-left" @click="goBack">
        <i class="mintui mintui-back"></i>
      </a>
      <span class="mint-header">选择日期出行方案</span>
      <div class="mint-header-button is-right">
      </div>
    </header>
    <div class="content">
      <div class="content-cell mt-0 pt-0">
        <div class="cell-title">出行方案</div>
        <div>
          <button type="button" class="btn btn-sm mr-1" :class="selectedSkuId===skuList[index].skuId?'btn-yellow':''"
                  v-for="(item, index) in skuList"
                  @click="selectSkuName(index)">{{item.skuName}}
          </button>
        </div>
      </div>
      <div class="content-cell pt-0">
        <div class="cell-title">出行日期</div>
        <div class="d-none">
          <button type="button" class="btn btn-light btn-sm">1月</button>
          <button type="button" class="btn btn-yellow btn-sm">2月</button>
          <button type="button" class="btn btn-light btn-sm">3月</button>
          <button type="button" class="btn btn-light btn-sm">4月</button>
          <button type="button" class="btn btn-light btn-sm">5月</button>
        </div>
        <!--<Calendar4Order :selected-sku="selectedSku.dateKeyinfo"></Calendar4Order>-->
        <Calendar4Order :selected-sku="selectedSku" class="myCalendar" v-on:selectedDay="selectedDay"></Calendar4Order>
      </div>
      <div class="content-cell pt-0">
        <div class="cell-title">出行人数</div>
        <div class="row people-num">
          <div class="col-7">
            成人(12岁以上)
            <div v-if="selectedDayDate&&selectedSku.dateKeyInfo[selectedDayDate]" class="font-12">
              <span>余:{{adultTopLine>0?adultTopLine:0}}</span>
              <span>￥{{selectedSku.dateKeyInfo[selectedDayDate].adultSellPrice}}/人</span>
            </div>
          </div>
          <div class="col-5">
            <input-num
              @change="changeAdultCount"
              :min="1"
              :value="adultCount"
              :max="adultMax"></input-num>
          </div>
        </div>
        <div class="row people-num">
          <div class="col-7">
            儿童(2-12岁)
            <div v-if="selectedDayDate&&selectedSku.dateKeyInfo[selectedDayDate]" class="font-12">
              <span>余:{{childTopLine>0?childTopLine:0}}</span>
              <span>￥{{selectedSku.dateKeyInfo[selectedDayDate].childSellPrice}}/人</span>
            </div>
          </div>

          <div class="col-5">
            <input-num
              @change="changeChildCount"
              :value="childCount"
              :min="0"
              :max="childMax"></input-num>
          </div>
        </div>
        <div class="disableLayer" :class="selectedDayDate?'d-none':''"></div>
      </div>
      <div class="black-bottom"></div>
    </div>
    <div class="fixed-bottom">
      <div class="bg-white total ask">合计:{{total}}</div>
      <div class="next-step" :to="{name:'OrderConfirmation'}" @click="goOrderConfirm">下一步</div>
    </div>
  </div>


</template>

<script>
//  import { Navbar, TabItem } from 'mint-ui';
import avatar from '@/assets/timg.jpg'
//  Vue.component(Navbar.name, Navbar);
import {getProductDateById} from '@/api/getData';
import Calendar4Order from '@/components/calendar-order'
import InputNum from '@/components/input-num'
import {MessageBox} from 'mint-ui'
import {accMul, accAdd} from '@/config/mUtils.js'
import Vue from 'vue'

Vue.component(InputNum.name, InputNum)
Vue.component(Calendar4Order.name, Calendar4Order)

export default {
  name: 'ChooseDate',
  data() {
    return {
      selectedSkuId: '',
      selectedGroupId:'',
      selectedSkuName: '',
      sellerName: '',
      selectedSku: {dateKeyInfo: {}},
      selectedDayDate: false,
      adultMax: 0,
      childMax: 0,
      adultCount: 1,
      childCount: 0,
      // curAdultPrice: 0,//选中日期的成人价格
      // curChildPrice: 0,//选中日期的儿童价格
      skuList: []
    }
  },
  computed: {
    total () {
      if (this.selectedSku.dateKeyInfo[this.selectedDayDate]) {
        let skuInfo = this.selectedSku.dateKeyInfo[this.selectedDayDate]
        // return Math.floor(this.adultCount * skuInfo.adultSellPrice + this.childCount * skuInfo.childSellPrice)
        return accAdd(accMul(this.adultCount, skuInfo.adultSellPrice), accMul(this.childCount, skuInfo.childSellPrice))
      } else {
        return 0
      }
    },
    adultTopLine () {
      if (this.selectedDayDate&&this.selectedSku.dateKeyInfo[this.selectedDayDate]) {
        return this.selectedSku.dateKeyInfo[this.selectedDayDate].adultNumber-this.adultCount
      }
    },
    childTopLine () {
      if (this.selectedDayDate&&this.selectedSku.dateKeyInfo[this.selectedDayDate]) {
        return this.selectedSku.dateKeyInfo[this.selectedDayDate].childNumber-this.childCount
      }
    }
  },
  methods: {
    // total() {
    //   if (this.selectedSku.dateKeyInfo[this.selectedDayDate]) {
    //     let skuInfo = this.selectedSku.dateKeyInfo[this.selectedDayDate];
    //     return this.adultCount * skuInfo.adultSellPrice + this.childCount * skuInfo.childSellPrice;
    //   } else {
    //     return 0
    //   }
    // },
    goBack () {
      this.$router.push({
        name: 'Details', params: {
          id: this.productId
        }
      })
    },
    changeAdultCount (value) {
      this.adultCount = value
      // console.log(value)
      // console.log(this.adultMax)
    },
    changeChildCount (value) {
      this.childCount = value
    },
    selectSkuName (index) {
      this.selectedSku = this.skuList[index]
      this.selectedSkuId = this.skuList[index].skuId
      this.selectedSkuName = this.skuList[index].skuName
    },
    selectedDay (day,groupId) {
      this.selectedDayDate = day
      this.selectedGroupId = groupId
      // console.log(this.selectedSku.dateKeyInfo)
      this.adultMax = this.selectedSku.dateKeyInfo[day].adultNumber
      this.childMax = this.selectedSku.dateKeyInfo[day].childNumber
      // for (var i = 0; i < ) {}
    },
    goOrderConfirm () {
      // debugger;
      if (!this.selectedDayDate) {
        MessageBox.alert('无法提交', '您未选择出行日期！')
        return
      }
      if (this.adultCount > this.adultMax) {
        MessageBox.alert('无法提交', '您所填写的成人数量超过库存！')
        return
      }
      if (this.childCount > this.childMax) {
        MessageBox.alert('无法提交', '您所填写的儿童数量超过库存！')
        return
      }
      if (this.adultCount < 1) {
        MessageBox.alert('无法提交', '成人数量不能小于1！')
        return
      }
      if (this.childCount < 0) {
        MessageBox.alert('无法提交', '儿童人数不能为负数！')
        return
      }
      this.$router.push({name: 'OrderConfirmation', query: {
        stockGoodsId: this.selectedGroupId,
        stockGoodsName: this.selectedSkuName,
        adult: this.adultCount,
        child: this.childCount,
        orderMoney: this.total,
        day:this.selectedDayDate
      }})
    },
    getData() {
      getProductDateById(this.$route.params.id).then(res => {
        if (res && res.data.state === 1 && res.data.data && res.data.data.length > 0) {
          let list = res.data.data
          list.map(item => {
            let dateKeyInfo = {}
            item.calendarInfo.map(cellItem => {
              dateKeyInfo[cellItem.groupTime.split(' ')[0]] = cellItem
            })
            item.dateKeyInfo = dateKeyInfo
          })
          this.skuList = list
          this.selectedSku = this.skuList[0]
          this.selectedSkuId = this.skuList[0].skuId
          this.selectedSkuName = this.skuList[0].skuName
        }
      })
    }
  },
  // mounted(){
  //   console.log(this.selectedSku.toLocaleString())
  //   debugger;
  // },
  created () {
    if (this.$route.params.id) {
      this.productId = this.$route.params.id
      this.sellerName = this.$route.params.sellerName
      // var thisData = this
      this.getData()
      // getProductDateById(this.$route.params.id).then(res => {
      //   if (res && res.data.state === 1 && res.data.data && res.data.data.length > 0) {
      //     let list = res.data.data;
      //     list.map(item=>{
      //       let dateKeyInfo = {};
      //       item.calendarInfo.map(cellitem=>{
      //         dateKeyInfo[cellitem.groupTime] = cellitem;
      //       })
      //       item.dateKeyInfo = dateKeyInfo;
      //     })
      //
      //     thisData.skuList = list;
      //     thisData.selectedSku = thisData.skuList[0];
      //     thisData.selectedSkuId = thisData.skuList[0].skuId;
      //   }
      // })
    }
  }
}
</script>

<style lang="less" type="text/less" rel="stylesheet/less" scoped>
  @import "../style/main.less";



  .cell-title {
    border-bottom: 0 !important;
  }

  .black-bottom {
    .px2rem(height, 60);
  }

  .people-num {
    .px2rem(height, 50);
    width:100%;
  }

  /*.content {*/
  /*position: absolute;*/
  /*top: 2.5rem;*/
  /*bottom: 0;*/
  /*width: 100%;*/
  /*left: 0rem;*/
  /*overflow: auto;*/
  /*background-color: #eee;*/

  /*.content-cell {*/
  /*background-color: #fff;*/
  /*min-height: 2rem;*/
  /*margin-top: 0.5rem;*/
  /*padding: 0.5rem;*/

  /*.row + .row {*/
  /*margin-top: 0.5rem;*/
  /*}*/

  /*}*/

  /*}*/
  .myCalendar {
    overflow: hidden;
  }

  .disableLayer {
    background: rgba(255, 255, 255, 0.5);
    position: relative;
    z-index: 100;
    .px2rem(height, 120);
    .px2rem(margin-top, -120)
  }

  .fixed-bottom {
    display: flex;
    text-align: center;
    .total {
      width: 50%;
      /*flex: 0 0 20%;*/
      display: inline-block;
      .px2rem(height, 50);
      .px2rem(line-height, 50);
      border-top: 1px solid #e5e5e5;
      .px2rem(border-top-width, 0.5);
    }
    .next-step {
      width: 50%;
      display: inline-block;
      background: @orange;
      color: white;
      .px2rem(height, 50);
      .px2rem(line-height, 50);
    }
  }
</style>
