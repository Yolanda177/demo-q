<template>
  <div class="a-page-container">
    a Page
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
    </div>
    <div class="div-container">
      <!-- <img src="./images/width.png" alt /> -->
      <div class="component-container" ref="container">
        <canvas class="canvas-img-preview" ref="sourceCanvas"></canvas>
        <div class="crop-container" ref="cropContainer">
          <span class="zoom-button" ref="zoomButton">口</span>
          <canvas class="crop-canvas" ref="cropCanvas"></canvas>
        </div>
      </div>
    </div>
    <!-- <div class="canvas-container">
      <canvas
        id="drawing"
        width="250"
        height="250"
        ref="drawing"
      >A drawing of something</canvas>
      <el-button @click="handleGetContext">获取</el-button>
    </div>
    <div class="div-container">
      <xz-crop :imageUrl="imageUrl" :getCropImgBlob="getCropImgBlob"></xz-crop>
    </div>-->
    <my-row tag="div" :gutter="20">
      <my-col :span="8" tag="div">123</my-col>
      <my-col :span="16" tag="div">456</my-col>
    </my-row>
    <el-form :model="formData">
      <el-form-item label="时间">
        <el-cascader
          v-model="formData.startTime"
          size="small"
          :props="timeProps"
          :options="timeOptions"
          :transfer="true"
          :clearable="false"
          :disabled="!timeOptions.length"
          style="display:inline-block; width: 10rem"
        ></el-cascader>
        <span style="margin: 0 1rem;">~</span>
        <el-cascader
          v-model="formData.endTime"
          size="small"
          :props="timeProps"
          :options="timeOptions"
          :transfer="true"
          :clearable="false"
          :disabled="!timeOptions.length"
          style="display:inline-block; width: 10rem"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
// import XzCrop from './component/xz-crop'
import getTimeTypes from "../../utils/getTimeByType"
import MyCol from "./component/my-col"
import MyRow from "./component/my-row"
import ElTree from "./component/tree"

export default {
  name: "demo-a-page",
  components: {
    MyCol,
    MyRow,
    ElTree
  },
  data() {
    return {
      formData: {
        startTime: [],
        endTime: []
      },
      num: 0,
      // imageUrl: 'http://localhost:8080/img/avatar.480802a3.jpg',
      // imageUrl: 'http://localhost:8080/img/height.d933214f.jpg',
      imageUrl: "http://localhost:8080/img/width.2f94a160.png",
      imageObj: null,
      targetImg: null,
      sourceImgWidth: null,
      sourceImgHeight: null,
      cropCanvasWidth: null,
      cropCanvasHeight: null,
      cropContext: null,
      cropOffsetImgTop: null,
      cropOffsetImgLeft: null,
      blackWidth: null,
      blackHeight: null,
      options: [
        {
          id: "4",
          name: "月/周",
          count: 3
        },
        {
          id: "1",
          name: "年",
          count: 1
        },
        {
          id: "5",
          name: "日",
          count: 3
        },
        {
          id: "2",
          name: "季度",
          count: 2
        },
        {
          id: "3",
          name: "月",
          count: 2
        },
        {
          id: "6",
          name: "年/周",
          count: 2
        }
      ],
      // 时间
      Times: this.getTimes(),
      // 时间类型
      TimeTypes: this.getTimeTypes(),
      timeOptions: [],
      timeProps: {
        label: "label",
        value: "value",
        lazy: true,
        lazyLoad: this.loadTimeOption
      },
      jsonData: {
        system: "省级国土空间开发保护现状评估指标体系",
        version: "",
        indicator: "户籍人口0",
        attrs: [{
          id: "jcz", key: "", require: true, value: ""
        }],
        dims: [],
        region: [],
        time: "",
        type: "jcl"
      },
      status: "",
      value: "",
      tree: [{
        label: "一级 1",
        children: [{
          label: "二级 1-1",
          children: [{
            label: "三级 1-1-1"
          }]
        }]
      }],
      defaultProps: {
        children: "children",
        label: "label"
      }
    }
  },
  created() {
    this.timeOptions = this.options.map(item => {
      const { id, name, count } = item
      return {
        value: id,
        label: name,
        typeId: id,
        level: this.Times.YEAR,
        count,
        leaf: false
      }
    })
  },
  mounted() {
    class MyPromise {
      constructor(executor) {
        this.status = "pending"
        this.value = "undefined"
        const resolve = result => {
          if (this.status !== "pending") return
          this.status = "resolved"
          this.value = result
        }
        const reject = reason => {
          if (this.status !== "pending") return
          this.status = "rejected"
          this.value = reason
        }
        try {
          executor(resolve, reject)
        } catch (e) {
          reject(e)
        }
      }
    }
    const p1 = new MyPromise(resolve => {
      resolve(1)
    })
    console.log(p1)
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    getStringLength(str) {
      {
        const strArray = str.split(" ")
        const lengthArray = strArray.map(val => val.length)
        debugger
        return lengthArray.reduce((p, c) => Math.max(p, c))
      }
    },
    loadTimeOption(node, resolve) {
      const { data, level } = node
      if (level) {
        const res = getTimeTypes(data, this.Times, this.TimeTypes, level)
        resolve(res)
      }
    },
    getTimes() {
      return {
        YEAR: "1",
        SEASON: "2",
        MONTH: "3",
        MONTH_WEEK: "4",
        DAY: "5",
        YEAR_WEEK: "6",
        HOUR: "7",
        MINUTE: "8",
        SECONDS: "9"
      }
    },

    getTimeTypes() {
      const Times = this.getTimes()
      return {
        [Times.YEAR]: {
          name: "年",
          length: 4,
          format: "$年",
          chain: [Times.YEAR]
        },
        [Times.SEASON]: {
          name: "季度",
          length: 1,
          maxValue: 4,
          format: "第$季度",
          chain: [Times.YEAR, Times.SEASON]
        },
        [Times.MONTH]: {
          name: "月",
          length: 2,
          maxValue: 12,
          format: "$月",
          chain: [Times.YEAR, Times.MONTH]
        },
        [Times.MONTH_WEEK]: {
          name: "月/周",
          length: 1,
          maxValue: 4,
          format: "第$周",
          chain: [Times.YEAR, Times.MONTH, Times.MONTH_WEEK]
        },
        [Times.DAY]: {
          name: "日",
          length: 2,
          maxValue: 30,
          format: "$日",
          chain: [Times.YEAR, Times.MONTH, Times.DAY]
        },
        [Times.YEAR_WEEK]: {
          name: "年/周",
          length: 2,
          maxValue: 53,
          format: "第$周",
          chain: [Times.YEAR, Times.YEAR_WEEK]
        },
        [Times.HOUR]: {
          name: "时",
          length: 2,
          maxValue: 24,
          format: "$时",
          chain: [Times.YEAR, Times.MONTH, Times.DAY, Times.HOUR]
        },
        [Times.MINUTE]: {
          name: "分",
          length: 2,
          maxValue: 60,
          format: "$分",
          chain: [Times.YEAR, Times.MONTH, Times.DAY, Times.HOUR, Times.MINUTE]
        },
        [Times.SECONDS]: {
          name: "秒",
          length: 2,
          maxValue: 60,
          format: "$秒",
          chain: [
            Times.YEAR,
            Times.MONTH,
            Times.DAY,
            Times.HOUR,
            Times.MINUTE,
            Times.SECONDS
          ]
        }
      }
    },
    handleClickAdd() {
      this.num += 1
    },
    handleLearnObjDefineProperty() {
      const obj = {}
      let song = "七里香"
      obj.singer = "周杰伦"
      Object.defineProperty(obj, "music", {
        // 1. value 七里香
        configurable: true, // 2. 可以配置对象，删除属性
        // writable: true, // 3. 可以修改对象
        enumerable: true, // 4. 可以枚举
        // get,set 设置时不能设置 writable和value，它们代替了二者且是互斥的
        get() { // 5. 获取 obj.music 时会调用 get 方法
          return song
        },
        set(val) { // 6. 将修改的值重新赋给song
          song = val
        }
      })
      console.log(obj) // { singer: "周杰伦", music: "发如雪"}
      delete obj.music
      obj.music = "听妈妈的话"
      console.log(obj.music) // 发如雪
      obj.music = "听妈妈的话"
      console.log(obj) // { singer: "周杰伦", music: "听妈妈的话"}
      // 默认情况下通过 defineProperty定义的属性是不能被枚举（遍历）
      // 需要设置 enumerable为 true 才可以
      Object.keys(obj).forEach(key => console.log(key))
      console.log(obj.music) // 听妈妈的话
    },
    handleGetContext() {
      const { drawing, sourceImg } = this.$refs
      const imgObject = new Image()
      console.log(sourceImg.src)
      imgObject.src = sourceImg.src
      if (drawing.getContext) {
        const context = drawing.getContext("2d")
        context.drawImage(imgObject, 0, 0, 250, 250)
        // console.log(context)
        // context.beginPath()
        // // 绘制外圆
        // context.arc(100, 100, 99, 0, 2 * Math.PI, false)
        // // 绘制内圆
        // context.moveTo(194, 100)
        // context.arc(100, 100, 94, 0, 2 * Math.PI, false)
        // // 绘制分针
        // context.moveTo(100, 100)
        // context.lineTo(100, 15)
        // // 绘制时针
        // context.moveTo(100, 100)
        // context.lineTo(35, 100)
        // // 描边路径
        // context.stroke()
        // context.font = 'bold 14px Arial'
        // context.textAlign = 'center'
        // context.testBaseline = 'middle'
        // context.fillText('12', 100, 20)
        // context.fillStyle = '#ff0000'
        // context.fillRect(10, 10, 50, 50)
        // context.fillStyle = 'rgba(0,0,255,0.5)'
        // context.fillRect(30, 30, 50, 50)
        // context.clearRect(40, 40, 10, 10)
      }
    },
    getCropImgBlob(blob) {
      console.log(blob)
    },
    autoRunFun() {
      const module1 = (() => {
        const count = 0
        const m1 = () => {
          console.log("m1")
          console.log(count)
        }
        const m2 = () => {
          console.log("m2")
        }
        return {
          m1,
          m2
        }
      })()
      console.log(module1.m1())
    }
  }
}
</script>

<style scoped lang="scss">
.a-page-container {
  .div-container {
    width: 250px;
    height: 250px;
    .component-container {
      position: relative;
      width: 100%;
      height: 100%;
      // display: flex;
      // flex: 1;
      // align-items: center;
      // justify-content: space-between;
      background-color: #000000;
      .canvas-img-preview {
        position: absolute;
        opacity: 0.5;
      }
      .crop-container {
        position: absolute;
        top: 0;
        left: 0;
        .zoom-button {
          position: absolute;
          display: inline-block;
          right: 0;
          bottom: 3px;
          font-size: 12px;
          cursor: nw-resize;
          color: #ffffff;
        }
        .crop-canvas {
          cursor: move;
        }
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
