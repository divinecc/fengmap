<template>
  <div id="app">
    <div id="fengmap"></div>
  </div>
</template>



<script>
import fengmap from "fengmap/build/fengmap.map.min"; //核心包
import "fengmap/build/fengmap.analyser.min"; //分析器
import "fengmap/build/fengmap.plugin.min"; //插件包
import "fengmap/build/fengmap.effect.min"; //特效包
var map = null;

export default {
  name: "Fmap",
  data() {
    return {
      initCoords: {},
      mapCoordinate: {},
      sendData: {
        deviceCode: "a",
        x: "1.1",
        y: "2.2",
      }, //发送初始坐标数据
      potColor: [
        "0,255,127",
        "30,144,255",
        "255,106,106",
        "255,255,0",
        "186,85,211",
        "28,28,28",
        "0,0,128",
        "255,0,0",
      ], //打点颜色
    };
  },
  mounted() {
    let that = this;
    var mapOptions = {
      //地图参数
      appName: "test1004jsver",
      key: "95590b7a41a2126d068555740facc109",
      mapID: "1430055959122333698",
      defaultThemeName: "2002",
      container: document.getElementById("fengmap"),
    };

    map = new fengmap.FMMap(mapOptions);

    map.on("loaded", function () {
      console.log("loaded");
      var toolbar = new fengmap.FMToolbar();
      toolbar.addTo(map);
      that.getLngLat();
    });

    map.on("click", function (event) {
      console.log("Map click!", event);
      // that.initCoords = event.coords; //采集到的坐标赋值给
      // console.log(initCoords);
      var mapCoordinate = fengmap.FMCalculator.mapCoordinateToLatlng(
        event.coords
      ); //地图坐标转经纬度
      // console.log(this.initCoords);
      that.sendData.x = mapCoordinate.x;
      that.sendData.y = mapCoordinate.y; //转换后的经纬度坐标加入发送数据对象
      console.log(that.sendData);
      that.sendInfo(that.sendData); //发送数据
    });
  },

  methods: {
    sendInfo(sendData) {
      this.$http
        .post("/saveLocation", sendData)
        .then((res) => {
          console.log("发送成功");
        })
        .catch((err) => {
          console.log("发送失败！");
          console.log(err);
        });
    },

    getLngLat() {
      setTimeout(() => {
        setInterval(() => {
          this.$http
            .get("/getData?userId=ab")
            .then((res) => {
              console.log(res.data, "###");
              for (let i = 0; i < res.data.length; i++) {
                var color;
                var getcoords = {
                  x: 0.0,
                  y: 0.0,
                };
                var rescoords = {
                  x: 0.0,
                  y: 0.0,
                };
                getcoords.x = res.data[i].longitude; //获取经度
                getcoords.y = res.data[i].latitude; //获取纬度
                if (res.data[i].type == "a") {
                  color = this.potColor[0];
                } else if (res.data[i].type == "b") {
                  color = this.potColor[1];
                } else if (res.data[i].type == "c") {
                  color = this.potColor[2];
                } else if (res.data[i].type == "d") {
                  color = this.potColor[3];
                } else if (res.data[i].type == "e") {
                  color = this.potColor[4];
                } else if (res.data[i].type == "f") {
                  color = this.potColor[5];
                } else if (res.data[i].type == "g") {
                  color = this.potColor[6];
                } else {
                  color = this.potColor[7];
                }
                var latlngToMap =
                  fengmap.FMCalculator.latlngToMapCoordinate(getcoords); //经纬度坐标转地图坐标
                console.log(latlngToMap, "@@@");
                rescoords.x = latlngToMap.x;
                rescoords.y = latlngToMap.y;
                var textMarker = new fengmap.FMTextMarker({
                  text: ".",
                  x: rescoords.x,
                  y: rescoords.y,
                  fontsize: 50,
                  height: 0.05,
                  fillColor: color,
                });
                var level = map.getLevel();
                var floor = map.getFloor(level);
                textMarker.addTo(floor);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 2000);
      }, 3000);
    },
  },
};
</script>

<style scoped>
#fengmap {
  width: 100%;
  height: 100%;
}
</style>