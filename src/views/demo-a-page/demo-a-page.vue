<template>
  <div class="a-page-container">
    a Page
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
    </div>
    <div class="div-container">
      <!-- <img src="./images/width.png" alt /> -->
      <!-- <div class="component-container" ref="container">
        <canvas class="canvas-img-preview" ref="sourceCanvas"></canvas>
        <div class="crop-container" ref="cropContainer">
          <span class="zoom-button" ref="zoomButton">口</span>
          <canvas class="crop-canvas" ref="cropCanvas"></canvas>
        </div>
      </div>-->
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
    <!-- <el-form :model="formData">
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
    <el-tree
      draggable
      :data="tree"
      :props="defaultProps"
      :default-expand-all="true"
      @node-click="handleNodeClick"
    ></el-tree>-->
    <!-- <div>
      <el-button @click="generateList">生成大数据</el-button>
    </div>
    <div>
      <el-input v-model="keyWord" style="width: 50%" @change="handleSearch"></el-input>
      <el-button @click="handleSearch">搜索</el-button>
    </div>
    <div class="list-container" @scroll="handleScroll" ref="listContainer">
      <div v-for="item in LargeList" :key="item.tid" class="list-item">
        <div>{{item.name}}</div>
        <span>{{item.text}}</span>
        <span>{{item.title}}</span>
      </div>
    </div>
    <div ref="poll"></div>
    <main>
      <p>请输入:</p>
      <input type="text" id="input" />
      <p id="p"></p>
    </main>-->
    <!-- <div class="slider-container">
      <el-button
        type="primary"
        round
        class="slider-button next"
        @click="handleNext"
      >》</el-button>
      <el-button
        type="primary"
        round
        class="slider-button prev"
        @click="handlePrev"
      >《</el-button>
      <div class="slider-list-box" ref="sliderBox">
        <div class="slider-list__item" v-for="img in imgList" :key="img.id">
          <img :src="img.url" />
        </div>
      </div>
    </div>-->
    <div
      class="list-container"
      v-debounce.scroll="handleScroll"
      ref="listContainer"
      @click="handleClickListContainer"
      @mousemove="handleMove"
    >
      <div class="inner-box" @click.stop="handleClickInnerBox"></div>
      <!-- <div v-for="item in LargeList" :key="item.tid" class="list-item">
        <div>{{item.name}}</div>
        <span>{{item.text}}</span>
        <span>{{item.title}}</span>
      </div>-->
    </div>
    <ul>
      <li
        :class="['slider-list__item', {'slider-list__item': currentIndex === img.id}]"
        v-for="img in imgList"
        :key="img.id"
      >
        <img :src="img.url" />
      </li>
    </ul>
  </div>
</template>

<script>
// import XzCrop from './component/xz-crop'
import getTimeTypes from '../../utils/getTimeByType'
import MyCol from './component/my-col'
import MyRow from './component/my-row'
// import ElTree from "./component/tree"

export default {
  name: 'demo-a-page',
  components: {
    MyCol,
    MyRow
    // ElTree
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
      imageUrl: 'http://localhost:8080/img/width.2f94a160.png',
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
          id: '4',
          name: '月/周',
          count: 3
        },
        {
          id: '1',
          name: '年',
          count: 1
        },
        {
          id: '5',
          name: '日',
          count: 3
        },
        {
          id: '2',
          name: '季度',
          count: 2
        },
        {
          id: '3',
          name: '月',
          count: 2
        },
        {
          id: '6',
          name: '年/周',
          count: 2
        }
      ],
      // 时间
      Times: this.getTimes(),
      // 时间类型
      TimeTypes: this.getTimeTypes(),
      timeOptions: [],
      timeProps: {
        label: 'label',
        value: 'value',
        lazy: true,
        lazyLoad: this.loadTimeOption
      },
      jsonData: {
        system: '省级国土空间开发保护现状评估指标体系',
        version: '',
        indicator: '户籍人口0',
        attrs: [{
          id: 'jcz', key: '', require: true, value: ''
        }],
        dims: [],
        region: [],
        time: '',
        type: 'jcl'
      },
      status: '',
      value: '',
      tree: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }, {
            label: '三级 1-1-2'
          }]
        }, {
          label: '二级 2-1'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      LargeList: [],
      keyWord: '',
      i: 0,
      refreshTimer: null,
      imgList: [],
      auto: 0,
      currentIndex: 1
    }
  },
  created() {
    // this.refreshTimer = setInterval(() => {
    //   const time = new Date()
    //   console.log(time)
    // }, 1 * 1000)
    // debugger
    // window.addEventListener('visibilitychange', this.handleVisibilityChange)
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
    this.imgList = [
      {
        // eslint-disable-next-line global-require
        url: require('./images/1.jpg'),
        id: 1
      },
      {
        // eslint-disable-next-line global-require
        url: require('./images/2.jpg'),
        id: 2
      },
      {
        // eslint-disable-next-line global-require
        url: require('./images/3.jpg'),
        id: 3
      },
      {
        // eslint-disable-next-line global-require
        url: require('./images/4.jpg'),
        id: 4
      },
      {
        // eslint-disable-next-line global-require
        url: require('./images/5.jpg'),
        id: 5
      }
    ]
  },
  mounted() {
    window.addEventListener('onscroll', this.throttle(this.showTop, 10000))
    // window.onscroll = this.showTop
    this.generateList()
    // this.$nextTick(() => {
    //   this.autoPlay()
    //   // console.log(this.$refs)
    // })
    // this.handleLearnProxy()
    // this.handleLearnObjDefineProperty()
    // const getData = this.debounce(this.scrollAndLoading, 300)
    // window.addEventListener('scroll', getData, false)
    // console.log(1)
    // setTimeout(() => {
    //   console.log(2)
    // })
    // const p = new Promise(resolve => {
    //   console.log(3)
    //   resolve()
    // })
    // p.then(() => {
    //   console.log(4) // 微任务
    // })
    // console.log(process)

    // process.nextTick(() => {
    //   console.log(5) // 宏任务
    // })
    // console.log(6)
    // // eslint-disable-next-line
    // var i = 0
    // console.log(new Date(), i)
    // const tasks = []
    // const output = j => new Promise(resolve => {
    //   setTimeout(() => {
    //     console.log(new Date(), j)
    //     resolve()
    //   }, 1000 * j)
    // })
    // // const output = j => {
    // //   setTimeout(() => {
    // //     console.log(new Date(), j)
    // //   }, 1000)
    // // }
    // for (i; i < 5; i++) {
    //   // output(i)
    //   tasks.push(output(i))
    //   // console.log(i)
    //   // eslint-disable-next-line no-loop-func
    //   // setTimeout(j => {
    //   //   console.log(new Date(), j)
    //   // }, 1000, i)
    // }
    // // console.log(new Date(), i)
    // Promise.all(tasks).then(() => {
    //   setTimeout(() => {
    //     console.log(new Date(), i)
    //   }, 1000)
    // })
  },

  pageVisible() {
    console.log('页面显示出来了')
  },
  pageHidden() {
    console.log('页面隐藏了')
  },
  methods: {
    handleMove(e) {
      // console.log(e.offsetX)
      console.log(e.clientX)
    },
    handleClickListContainer(e) {
      console.log(e.offsetX)
    },
    handleClickInnerBox(e) {
      console.log(e.offsetX)
    },
    showTop() {
      debugger
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      console.log(`滚动条位置：${scrollTop}`)
    },
    debounce(fn, delay, data) {
      let timer = null // 借助闭包
      return function test() {
        const context = this
        // eslint-disable-next-line prefer-rest-params
        // const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn.apply(context, data)
        }, delay) // 简化写法
      }
    },
    throttle(fn, delay) {
      let valid = true
      // eslint-disable-next-line consistent-return
      return function test() {
        if (!valid) {
          // 休息时间 暂不接客
          return false
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
          fn()
          valid = true
        }, delay)
      }
    },
    handleNext() {
      // debugger
      clearTimeout(this.refreshTimer)

      this.auto++
      if (this.auto === 5) {
        this.auto = 0
      }
      const length = this.auto * 440

      this.$refs.sliderBox.style.marginLeft = `-${length}px`


      this.autoPlay()
    },
    handlePrev() {
      // debugger
      this.auto--
      if (this.auto === -1) {
        this.auto = 4
      }
      const length = this.auto * 440
      this.$refs.sliderBox.style.marginLeft = `-${length}px`
      clearTimeout(this.refreshTimer)
      this.autoPlay()
    },
    autoPlay() {
      this.refreshTimer = setTimeout(() => {
        const length = this.auto * 440
        this.auto++
        this.$refs.sliderBox.style.marginLeft = `-${length}px`
        if (this.auto === 5) {
          this.auto = 0
        }
        this.autoPlay()
      }, 3000)
    },
    handleLearnProxy() {
      const input = document.getElementById('input')
      const p = document.getElementById('p')
      const obj = {}

      const newObj = new Proxy(obj, {
        get(target, key, receiver) {
          console.log(`getting ${key}!`)
          return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
          console.log(target, key, value, receiver)
          if (key === 'text') {
            input.value = value
            p.innerHTML = value
          }
          return Reflect.set(target, key, value, receiver)
        }
      })

      input.addEventListener('keyup', e => {
        newObj.text = e.target.value
      })
    },
    handleVisibilityChange() {
      // console.log(document.visibilityState)
      if (document.visibilityState === 'hidden') {
        console.log('hidden')
        clearInterval(this.refreshTimer)
        this.refreshTimer = null
      } else if (document.visibilityState === 'visible') {
        console.log('visible')
        if (!this.refreshTimer) {
          this.refreshTimer = setInterval(() => {
            const time = new Date()
            console.log(time)
          }, 1 * 1000)
        }
      }
    },
    scrollAndLoading() {
      let curPage = 1
      const pageSize = 16
      let prevY = 0
      const poll = this.refs
      if (window.scrollY > prevY) { // 判断用户是否向下滚动
        prevY = window.scrollY
        if (poll.current.getBoundingClientRect().top <= window.innerHeight) {
          curPage++
          this.LargeList = this.LargeList.slice(0, pageSize * curPage)
        }
      }
    },
    newFunc(e) {
      this.debounce(this.handleScroll, 1000, e)
    },
    handleScroll(e) {
      console.log(e.target.scrollTop)
      const obj = this.$refs.listContainer.getBoundingClientRect()
      console.log(obj)
      if (e.target.scrollTop === this.i * 300) {
        console.log(e.target.scrollTop)
        this.i++
      }
    },
    // 生成指定个数的随机字符串
    generateRandomWords(n) {
      const words = 'abcdefghijklmnopqrstuvwxyz你是好的嗯气短前端后端设计产品网但考虑到付款啦分手快乐的分类开发商的李开复封疆大吏师德师风吉林省附近'
      const len = words.length
      let ret = ''
      for (let i = 0; i < n; i++) {
        ret += words[Math.floor(Math.random() * len)]
      }
      return ret
    },
    generateList() {
      this.LargeList = []
      // 生成10万条数据的list
      for (let i = 0; i < 1500; i++) {
        this.LargeList.push({
          name: `xu_0${i}`,
          title: this.generateRandomWords(12),
          text: `我是第${i}项目, 赶快🌀吧~~`,
          tid: `xx_${i}`
        })
      }
      console.log(this.LargeList)
    },

    handleSearch() {
      if (this.keyWord === '') {
        this.generateList()
        return
      }
      this.LargeList = this.LargeList.filter(item => item.title.indexOf(this.keyWord) > -1)
      console.log(this.LargeList)
    },

    permutate(str) {
      const array = str.split(' ')
      function loop(arr, pre = []) {
        if (arr.length === 1) {
          return [pre.concat(arr).join('')]
        }
        let res = []
        for (let index = 0; index < arr.length; index++) {
          const first = arr.pop()
          res = res.concat(loop(arr, [...pre, first]))
          arr.unshift(first)
        }
        return res
      }
      return Array.from(new Set(loop(array)))
    },


    testNewMap() {
      const mapObject = new Map()
      const catalog = {
        sysCode: '123abc',
        name: '默认'
      }
      mapObject.set('123abc', catalog)
      const catalogObject = mapObject.get('123abc')
      console.log(catalogObject)
    },

    testMyPromise() {
      class MyPromise {
        constructor(executor) {
          this.status = 'pending'
          this.value = 'undefined'
          const resolve = result => {
            if (this.status !== 'pending') return
            this.status = 'resolved'
            this.value = result
          }
          const reject = reason => {
            if (this.status !== 'pending') return
            this.status = 'rejected'
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

    handleNodeClick(data) {
      console.log(data)
    },

    getStringLength(str) {
      {
        const strArray = str.split(' ')
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
        YEAR: '1',
        SEASON: '2',
        MONTH: '3',
        MONTH_WEEK: '4',
        DAY: '5',
        YEAR_WEEK: '6',
        HOUR: '7',
        MINUTE: '8',
        SECONDS: '9'
      }
    },

    getTimeTypes() {
      const Times = this.getTimes()
      return {
        [Times.YEAR]: {
          name: '年',
          length: 4,
          format: '$年',
          chain: [Times.YEAR]
        },
        [Times.SEASON]: {
          name: '季度',
          length: 1,
          maxValue: 4,
          format: '第$季度',
          chain: [Times.YEAR, Times.SEASON]
        },
        [Times.MONTH]: {
          name: '月',
          length: 2,
          maxValue: 12,
          format: '$月',
          chain: [Times.YEAR, Times.MONTH]
        },
        [Times.MONTH_WEEK]: {
          name: '月/周',
          length: 1,
          maxValue: 4,
          format: '第$周',
          chain: [Times.YEAR, Times.MONTH, Times.MONTH_WEEK]
        },
        [Times.DAY]: {
          name: '日',
          length: 2,
          maxValue: 30,
          format: '$日',
          chain: [Times.YEAR, Times.MONTH, Times.DAY]
        },
        [Times.YEAR_WEEK]: {
          name: '年/周',
          length: 2,
          maxValue: 53,
          format: '第$周',
          chain: [Times.YEAR, Times.YEAR_WEEK]
        },
        [Times.HOUR]: {
          name: '时',
          length: 2,
          maxValue: 24,
          format: '$时',
          chain: [Times.YEAR, Times.MONTH, Times.DAY, Times.HOUR]
        },
        [Times.MINUTE]: {
          name: '分',
          length: 2,
          maxValue: 60,
          format: '$分',
          chain: [Times.YEAR, Times.MONTH, Times.DAY, Times.HOUR, Times.MINUTE]
        },
        [Times.SECONDS]: {
          name: '秒',
          length: 2,
          maxValue: 60,
          format: '$秒',
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
      function observer(obj) {
        if (typeof obj === 'object') {
          // eslint-disable-next-line no-restricted-syntax
          for (const key in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(key)) {
              // eslint-disable-next-line no-use-before-define
              defineReactive(obj, key, obj[key])
            }
          }
        }
      }
      function defineReactive(obj, key, value) {
        // 针对value是对象，递归检测
        observer(value)
        // 劫持对象的key
        Object.defineProperty(obj, key, {
          get() {
            console.log(`获取：${key}`)
            return value
          },
          set(val) {
            // 针对所设置的val是对象
            observer(val)
            console.log(`${key}-数据改变了`)
            // value = val
          }
        })
      }
      const test = {
        name: '守候',
        flag: {
          book: {
            name: 'js',
            page: 325
          },
          interest: ['火锅', '旅游']
        }
      }
      observer(test)
      // const obj = {}
      // let song = '七里香'
      // obj.singer = '周杰伦'
      // Object.defineProperty(obj, 'music', {
      //   // 1. value 七里香
      //   configurable: true, // 2. 可以配置对象，删除属性
      //   // writable: true, // 3. 可以修改对象
      //   enumerable: true, // 4. 可以枚举
      //   // get,set 设置时不能设置 writable和value，它们代替了二者且是互斥的
      //   get() { // 5. 获取 obj.music 时会调用 get 方法
      //     return song
      //   },
      //   set(val) { // 6. 将修改的值重新赋给song
      //     song = val
      //   }
      // })
      // // console.log(obj) // { singer: "周杰伦", music: "七里香"}
      // delete obj.music
      // // console.log(obj) // { singer: "周杰伦"}
      // obj.music = '听妈妈的话'
      // console.log(obj.music) // 听妈妈的话
      // // obj.music = '听妈妈的话'
      // // console.log(obj) // { singer: "周杰伦", music: "听妈妈的话"}
      // // // 默认情况下通过 defineProperty定义的属性是不能被枚举（遍历）
      // // // 需要设置 enumerable为 true 才可以
      // // Object.keys(obj).forEach(key => console.log(key))
      // // console.log(obj.music) // 听妈妈的话
    },
    handleGetContext() {
      const { drawing, sourceImg } = this.$refs
      const imgObject = new Image()
      console.log(sourceImg.src)
      imgObject.src = sourceImg.src
      if (drawing.getContext) {
        const context = drawing.getContext('2d')
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
          console.log('m1')
          console.log(count)
        }
        const m2 = () => {
          console.log('m2')
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
  // width: 600px;
  overflow: scroll;
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
  .list-container {
    width: 100%;
    padding: 1rem;
    height: 300px;
    overflow-y: auto;
    border: 1px solid;
    position: relative;
    .inner-box {
      position: absolute;
      width: 100px;
      height: 100px;
      right: 0px;
      top: 10px;
      border: 1px solid red;
    }
    .list-item {
      font-size: 1rem;
    }
  }
  .slider-container {
    overflow: hidden;
    width: 440px;
    position: relative;
    .slider-list-box {
      // margin-left: -440px;
      display: flex;
      // width: 440px;
      // overflow: hidden;
    }
    .slider-button {
      position: absolute;
      // background: red;
      margin-left: 0;
      top: 43%;
      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }
    }
  }
}
</style>
