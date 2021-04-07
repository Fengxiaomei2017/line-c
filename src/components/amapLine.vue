<template>
  <div class="mapPosition">
    <div class="amap-page-container">
      <el-amap
        vid="amapDemo"
        :zoom="zoom"
        :center="center">
          <el-amap-marker
            v-for="(marker,index1) in markers"
            v-if="index1 === 0 || index1 === markers.length-1"
            :position="marker.position"
            :events="marker.events"></el-amap-marker>
          <el-amap-marker
            v-for="(marker,index2) in markers"
            v-if="index2 > 0 && index2 < markers.length-1"
            :icon="marker.icon"
            :position="marker.position"
            :events="marker.events"></el-amap-marker>
          <!-- <el-amap-marker
            v-for="circle in circles"
            :position="circle.position"
            icon="static/img/1.jpg"
            :events="circle.events"></el-amap-marker> -->
          <el-amap-polyline
            :strokeColor='polyline.strColor'
            :editable="false"
            :path="polyline.path"
            :events="polyline.events"></el-amap-polyline>
          <!-- <el-amap-circle
            v-for="circle in circles"
            :center="circle.center"
            :radius="circle.radius"
            :fillColor="circle.fillColor"
            :fillOpacity='circle.fillOpacity'
            :strokeColor='polyline.strColor'
            :events="circle.events"
            :zIndex='51'></el-amap-circle> -->
          <el-amap-info-window
            v-for="window in windows"
            :position="window.position"
            :visible="window.visible"
            :content="window.content"></el-amap-info-window>
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zoom: 16,
      center: [],
      markers: [],
      windows: [],
      polyline: {
        strColor: '#0066ff',
        path: []
      },
      circles: []
    }
  },
  mounted () {
    let markers = []
    let windows = []
    let circles = []
    let num = 7
    let centernum = Math.floor(num / 2)
    let self = this
    for (let i = 0; i < num; i++) {
      this.polyline.path.push([103.8691 + i * 0.002, 30.68215 + i * 0.001])
      this.center = [103.8691 + centernum * 0.001, 30.68215]
      if (i === 0 || i === num - 1) {
        markers[i] = {
          position: [103.8691 + i * 0.002, 30.68215 + i * 0.001],
          events: {
            click: () => {
              self.windows.forEach(window => {
                window.visible = false
              })
              self.$nextTick(() => {
                self.windows[i].visible = true
              })
            }
          }
        }
        // markers.push({
        //   position: [103.8691 + i * 0.002, 30.68215 + i * 0.001],
        //   events: {
        //     click: () => {
        //       self.windows.forEach(window => {
        //         window.visible = false
        //       })
        //       self.$nextTick(() => {
        //         self.windows[i].visible = true
        //       })
        //     }
        //   }
        // })
      } else {
        markers[i] = {
          icon: 'static/img/1.jpg',
          position: [103.8691 + i * 0.002, 30.68215 + i * 0.001],
          // center: [103.8691 + i * 0.002, 30.68215 + i * 0.001],
          // radius: 20,
          // fillOpacity: 1,
          // fillColor: 'rgba(0,0,255,1)',
          events: {
            click: () => {
              self.windows.forEach(window => {
                window.visible = false
                for (let j = 1; j < num - 1; j++) {
                  markers[j].icon = 'static/img/1.jpg'
                }
                markers[i].icon = 'static/img/2.jpg'
                // if (i > 1 && i < num - 2) {
                //   self.circles[i - 2].fillColor = '#fff'
                //   self.circles[i].fillColor = '#fff'
                // }
                // self.circles[i - 1].fillColor = '#0066ff'
              })
              self.$nextTick(() => {
                self.windows[i].visible = true
              })
            }
          }
        }
        // markers.push({
        //   icon: 'static/img/1.jpg',
        //   center: [103.8691 + i * 0.002, 30.68215 + i * 0.001],
        //   // radius: 20,
        //   // fillOpacity: 1,
        //   // fillColor: 'rgba(0,0,255,1)',
        //   events: {
        //     click: () => {
        //       self.windows.forEach(window => {
        //         window.visible = false
        //         // if (i > 1 && i < num - 2) {
        //         //   self.circles[i - 2].fillColor = '#fff'
        //         //   self.circles[i].fillColor = '#fff'
        //         // }
        //         // self.circles[i - 1].fillColor = '#0066ff'
        //       })
        //       self.$nextTick(() => {
        //         self.windows[i].visible = true
        //       })
        //     }
        //   }
        // })
      }
      windows.push({
        position: [103.8691 + i * 0.002, 30.68215 + i * 0.001],
        content: `<div class="prompt">
                    <img src="static/img/1.jpg" style="width: 80px;height: 70px;" calss="cityImg"/>
                    <div class="cityInfo">
                      <div class="cityTitle">${i}</div>
                      <span class="citySubtitle">弦子舞、泡温泉、茶马古道</span>
                    </div>
                    <a href='https://www.baidu.com' class="cityDetail">详情&gt;</a>`,
        visible: false
      })
    }
    this.markers = markers
    this.windows = windows
    this.circles = circles
  }
}
</script>

<style>
  .mapPosition .amap-page-container {
    width: 100vw;
    height: 300px;
    margin: 10px 0;
  }
  .mapPosition .amap-page-container .amap-info-content {
    overflow: hidden;
    /*background-color: #fff;*/
    border-radius: 4px;
  }
</style>
