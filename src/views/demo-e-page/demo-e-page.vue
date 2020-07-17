<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-11 22:27:08
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-06-24 17:27:19
 -->
<template>
  <div>
    <!-- e Page
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
    </div>-->
    <div id="map" class="map"></div>
    <div id="info">&nbsp;</div>
    <form class="form-inline">
      <label>Action type &nbsp;</label>
      <select id="type" class="form-control">
        <option value="singleselect" selected>Single Select</option>
        <option value="multiselect">Multi Select</option>
        <option value="singleselect-hover">Single Select on hover</option>
      </select>
    </form>
    <form>
      <label>radius size</label>
      <input id="radius" type="range" min="1" max="50" step="1" value="5" />
      <label>blur size</label>
      <input id="blur" type="range" min="1" max="50" step="1" value="15" />
    </form>
    <select id="layer-select">
      <option value="Aerial">Aerial</option>
      <option value="AerialWithLabelsOnDemand" selected>Aerial with labels</option>
      <option value="RoadOnDemand">Road</option>
      <option value="CanvasDark">Road dark</option>
      <option value="OrdnanceSurvey">Ordnance Survey</option>
    </select>
  </div>
</template>

<script>
// import TileLayer from 'ol/layer/Tile'
// import Graticule from 'ol/layer/Graticule'
// import Stroke from 'ol/style/Stroke'
// import Fill from 'ol/style/Fill'
// import Text from 'ol/style/Text'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
// import KML from 'ol/format/KML'
import { Heatmap as HeatmapLayer, Tile as TileLayer } from 'ol/layer'
// import Stamen from 'ol/source/Stamen'
import VectorSource from 'ol/source/Vector'
import { transform } from 'ol/proj'
import GeoJSON from 'ol/format/GeoJSON'
// import TileLayer from 'ol/layer/Tile'
// import BingMaps from 'ol/source/BingMaps'
import VectorImageLayer from 'ol/layer/VectorImage'
import VectorLayer from 'ol/layer/Vector'
import {
  Fill, Stroke, Style, Text
} from 'ol/style'
import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import countriesJson from './json/countries.json'

export default {
  name: 'demo-e-page',
  components: {},
  data() {
    return {
      num: 0,
      map: null,
      center: [121.05212688446045, 30.600614547729492],
      heatData: {
        type: 'FeatureCollection',
        features: [
          { type: 'Point', coordinates: [104.40, 31.19], count: 100 },
          { type: 'Point', coordinates: [113.30, 30.60], count: 19 },
          { type: 'Point', coordinates: [123.30, 30.60], count: 419 },
          { type: 'Point', coordinates: [105.30, 30.60], count: 319 },
          { type: 'Point', coordinates: [106.30, 30.60], count: 719 },
          { type: 'Point', coordinates: [109.30, 31.60], count: 519 },
          { type: 'Point', coordinates: [109.30, 30.60], count: 319 },
          { type: 'Point', coordinates: [108.30, 32.60], count: 139 },
          { type: 'Point', coordinates: [118.30, 31.60], count: 129 },
          { type: 'Point', coordinates: [108.30, 33.60], count: 190 },
          { type: 'Point', coordinates: [108.30, 32.60], count: 189 },
          { type: 'Point', coordinates: [100.30, 30.60], count: 1 },
          { type: 'Point', coordinates: [109.30, 30.60], count: 119 },
          { type: 'Point', coordinates: [108.30, 31.60], count: 200 },
          { type: 'Point', coordinates: [118.30, 30.60], count: 300 }
        ]
      }
    }
  },
  created() {},
  mounted() {
    // this.init()
    // this.initVectorImageLayer()
    this.initVectorTileLayer()
  },
  methods: {
    /**
     * 初始化一个 openlayers 地图
     */
    init() {
      const blur = document.getElementById('blur')
      const radius = document.getElementById('radius')
      const tile = new TileLayer({
        source: new OSM({
          wrapX: false
        })
      })
      const vector = new HeatmapLayer({
        // 矢量数据源
        source: new VectorSource({
          features: (new GeoJSON()).readFeatures(this.heatData, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
          })
        }),
        blur: 8, // 模糊尺寸
        radius: 10 // 热点半径
      })

      const target = 'map'
      // const tileLayer = [
      //   new TileLayer({
      //     source: new OSM({
      //       // wrapX: false
      //     })
      //   }),
      //   new Graticule({
      //     // the style to use for the lines, optional.
      //     strokeStyle: new Stroke({ // 用于绘制刻度线的笔触样式。如果未提供，将使用不完全不透明的黑色
      //       color: '#333',
      //       width: 2,
      //       lineDash: [0.5, 4]
      //     }),
      //     wrapX: false, // 是否水平重复刻度
      //     showLabels: true, // 展示经纬度
      //     lonLabelStyle: new Text({ // 经度标签样式
      //       font: '16px Calibri,sans-serif',
      //       textBaseline: 'bottom',
      //       fill: new Fill({
      //         color: 'red'
      //       }),
      //       stroke: new Stroke({
      //         color: 'blue',
      //         width: 3
      //       })
      //     }),
      //     latLabelStyle: new Text({ // 纬度标签样式
      //       font: '16px Calibri,sans-serif',
      //       textBaseline: 'bottom',
      //       fill: new Fill({
      //         color: 'orange'
      //       }),
      //       stroke: new Stroke({
      //         color: 'yellow',
      //         width: 3
      //       })
      //     })
      //   })
      // ]
      const view = new View({
        center: transform(this.center, 'EPSG:4326', 'EPSG:3857'),
        zoom: 5
        // projection: 'EPSG:4326', // 使用这个坐标系
        // center: [113.336555, 23.101258], // 地图中心坐标 广州
        // zoom: 15 // 缩放级别
      })
      this.map = new Map({
        target, // 绑定 dom 元素进行渲染
        layers: [tile, vector],
        // layers: tileLayer, // 配置地图数据源
        view // 设置地图显示的相关配置(坐标系、中心、缩放等等)
      })
      const map = document.getElementById('map')
      map.addEventListener('click', e => {
        const t = this.map.getEventCoordinate(e)
        console.log(t)
      })
      const blurHandler = () => {
        vector.setBlur(parseInt(blur.value, 10))
      }
      blur.addEventListener('input', blurHandler)
      blur.addEventListener('change', blurHandler)

      const radiusHandler = () => {
        vector.setRadius(parseInt(radius.value, 10))
      }
      radius.addEventListener('input', radiusHandler)
      radius.addEventListener('change', radiusHandler)

      // const styles = [
      //   'RoadOnDemand',
      //   'Aerial',
      //   'AerialWithLabelsOnDemand',
      //   'CanvasDark',
      //   'OrdnanceSurvey'
      // ]
      // const layers = []
      // let i
      // let ii
      // for (i = 0, ii = styles.length; i < ii; ++i) {
      //   layers.push(new TileLayer({
      //     visible: false,
      //     preload: Infinity,
      //     source: new BingMaps({
      //       key: 'Your Bing Maps Key from http://www.bingmapsportal.com/ here ',
      //       imagerySet: styles[i]
      //     })
      //   }))
      // }

      // this.map = new Map({
      //   layers,
      //   target: 'map',
      //   view: new View({
      //     center: [-6655.5402445057125, 6709968.258934638],
      //     zoom: 13
      //   })
      // })

      // const select = document.getElementById('layer-select')
      // function onChange() {
      //   const style = select.value
      //   for (i = 0, ii = layers.length; i < ii; ++i) {
      //     layers[i].setVisible(styles[i] === style)
      //   }
      // }
      // select.addEventListener('change', onChange)
      // onChange()
    },
    initVectorImageLayer() {
      const style = new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.6)'
        }),
        stroke: new Stroke({
          color: '#319FD3',
          width: 1
        }),
        text: new Text()
      })

      this.map = new Map({
        layers: [
          // 矢量切片图层
          new VectorImageLayer({
            imageRatio: 2,
            source: new VectorSource({
              features: (new GeoJSON()).readFeatures(countriesJson, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
              })
            }),
            style(feature) {
              style.getText().setText(feature.get('name'))
              return style
            }
          })
        ],
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 1
        })
      })
      // 矢量图层
      const featureOverlay = new VectorLayer({
        source: new VectorSource(),
        map: this.map,
        style: new Style({
          stroke: new Stroke({
            color: '#f00',
            width: 1
          }),
          fill: new Fill({
            color: 'rgba(255,0,0,0.1)'
          })
        })
      })
      let highlight
      const displayFeatureInfo = pixel => {
        this.map.getLayers().item(0).getFeatures(pixel).then(features => {
          const feature = features.length > 0 ? features[0] : undefined

          const info = document.getElementById('info')
          if (feature) {
            info.innerHTML = `${feature.getId()}: ${feature.get('name')}`
          } else {
            info.innerHTML = '&nbsp;'
          }

          if (feature !== highlight) {
            if (highlight) {
              featureOverlay.getSource().removeFeature(highlight)
            }
            if (feature) {
              featureOverlay.getSource().addFeature(feature)
            }
            highlight = feature
          }
        })
      }

      this.map.on('pointermove', evt => {
        if (!evt.dragging) {
          displayFeatureInfo(evt.pixel)
        }
      })

      this.map.on('click', evt => {
        displayFeatureInfo(evt.pixel)
      })
    },
    initVectorTileLayer() {
      let selection = {}

      const country = new Style({
        stroke: new Stroke({
          color: 'gray',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(20,20,20,0.5)'
        })
      })
      const selectedCountry = new Style({
        stroke: new Stroke({
          color: 'rgba(200,20,20,0.8)',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(200,20,20,0.4)'
        })
      })

      const vtLayer = new VectorTileLayer({
        declutter: true, // 整理图像和文字 将已设置为的所有Vector和VectorTile图层的所有图像和文本样式都应用去毛刺true
        source: new VectorTileSource({
          maxZoom: 15,
          format: new MVT({
            idProperty: 'iso_a3'
          }),
          url: 'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/'
      + 'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf'
        }),
        style: country
      })

      const map = new Map({
        layers: [
          vtLayer
        ],
        target: 'map',
        view: new View({
          center: [0, 0],
          zoom: 2,
          multiWorld: true
        })
      })

      // Selection
      const selectionLayer = new VectorTileLayer({
        map,
        renderMode: 'vector',
        source: vtLayer.getSource(),
        // eslint-disable-next-line consistent-return
        style(feature) {
          if (feature.getId() in selection) {
            return selectedCountry
          }
        }
      })

      const selectElement = document.getElementById('type')

      map.on(['click', 'pointermove'], event => {
        if (selectElement.value === 'singleselect-hover' && event.type !== 'pointermove'
      || selectElement.value !== 'singleselect-hover' && event.type === 'pointermove') {
          return
        }
        vtLayer.getFeatures(event.pixel).then(features => {
          if (!features.length) {
            selection = {}
            selectionLayer.changed()
            return
          }
          const feature = features[0]
          if (!feature) {
            return
          }
          const fid = feature.getId()

          if (selectElement.value.startsWith('singleselect')) {
            selection = {}
          }
          // add selected feature to lookup
          selection[fid] = feature

          selectionLayer.changed()
        })
      })
    },
    handleClickAdd() {
      this.num += 1
    }
  }
}
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 400px;
  color: #f00;
}
</style>
