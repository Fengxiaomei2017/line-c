<template>
  <div>
    <ul>
      <li v-for="(item,index) in imgList">
        <div class="img-box">
          <img :src="item.url">
          <button v-on:click.stop="_deleteImg(item.url,index)"></button>
        </div>
      </li>
      <div class="upload" @click="uploadImg">
        <div class="plus">+</div>
        <input type="file" ref="uploadInput" placeholder="+" hidden @change="upload" name="headImgUp"/>
      </div>
    </ul>
  </div>
</template>

<script>
  import {deleteImg} from '@/api/getData'
  export default {
    props: {
      actions: {
        type: String,
        default: 'http://www.daxi51.com/hotel-web/upload/saveImg'
      },
      name: {
        type: String,
        default: 'headImgUp'
      },
      imgList: {
        type: Array,
        default: function () {
          return []
        }
      },
      imgUrl: String
    },
    computed: {
      url () {
        return this.imgUrl
      }
    },
    methods: {
      uploadImg () {
        this.$refs['uploadInput'].click()
      },
      upload (e) {
        let formData = new FormData()
        let file = e.target.files[0]
        let filename = this.name
        formData.append(filename, file)
        this.httpRequest({
          type: 'post',
          url: this.actions,
          async: true,
          data: formData
        }).then((res) => {
          if (typeof res === 'string') {
            res = JSON.parse(res)
          }
          if (res.imgUrl) {
            this.imgList.push({url: res.imgUrl})
          }
        })
      },
      _deleteImg (url, index) {
        if (url) {
          deleteImg(url).then(res => {
            if (res.data.state === 1) {
              this.imgList.splice(index, 1)
            }
          })
        }
      },
      httpRequest (params) {
        return new Promise((resolve, rejecte) => {
          let request
          if (XMLHttpRequest) {
            request = new XMLHttpRequest()
          } else {
            request = new ActiveXObject()
          }
          request.onreadystatechange = () => {
            if (request.readyState === 4) {
              if (request.status === 200) {
                resolve(request.responseText)
              } else if (parseInt(request.status) / 100 === 4) {
                rejecte(request.responseText)
              }
            }
          }
          request.open(params.type, params.url, params.async)
          try {
            request.send(params.data || null)
          } catch (e) {
            rejecte(request.responseText)
          }
        })
      }
    },
    watch: {
      imgList () {
        let list = this.imgList.map((item, index) => {
          return item.url
        })
        this.$emit('fileList', list)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/main.less";
  ul {
    .fj('flex-start');
    flex-wrap: wrap;
    .px2rem(padding-top, 20);
    /*.px2rem(margin-right, 65);*/
    font-size: 0;
    li {
      /*position: relative;*/
      display: inline-block;
      .px2rem(width, 80);
      .px2rem(height, 80);
      .px2rem(margin-right, 10);
      font-size: 0;
    }
    .upload {
      position: relative;
      .px2rem(width, 80);
      .px2rem(height, 80);
      .px2rem(margin-left, -20);
      .px2rem(margin-bottom, 20);
      .px2rem(line-height, 60);
      text-align: center;
      border: solid 1px #d2d2d2;
      div.plus {
        position: absolute;
        .px2rem(font-size, 50);
        color: #d2d2d2;
        .ctt;
      }
      input {
        width: 100%;
        height: 100%;
      }
    }
  }

  div.img-box {
    position: absolute;
    .px2rem(width, 80);
    .px2rem(height, 80);
    .px2rem(margin-left, -20);
    & > button {
      position: absolute;
      .px2rem(top, -6);
      .px2rem(right, -6);
      .px2rem(width, 15);
      .px2rem(height, 15);
      border-radius: 50%;
      background-color: red;
      &:after {
        content: '';
        .px2rem(width, 15);
        .px2rem(height, 2);
        border-radius: 1.5px;
        .ctt;
        background-color: #fff;
      }
    }
    img {
      z-index: 200;
      width: 100%;
      height: 100%;
      /*.px2rem(width, 80);
      .px2rem(height, 100);*/
    }
  }
</style>
