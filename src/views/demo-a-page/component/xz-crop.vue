<template>
  <div class="component-container" ref="container">
    <canvas class="canvas-img-preview" ref="sourceImg"></canvas>
    <div
      class="crop-container"
      ref="cropContainer"
      @dragstart="stopDrag"
      @mousedown.stop="initMove"
    >
      <span
        class="zoom-button"
        ref="zoomButton"
        @dragstart="stopDrag"
        @mousedown.stop="initZoom"
      >口</span>
      <canvas class="crop-canvas" ref="cropCanvas" @dragstart="stopDrag"></canvas>
    </div>
  </div>
</template>

<script>

export default {
  name: 'xz-crop',
  props: {
    imageUrl: String, // 传入文件url
    getCropImgBlob: Function // 返回裁剪后的文件(blob)
  },
  data() {
    return {
      sourceImgWidth: null, // 被剪切照片容器宽度
      sourceImgHeight: null, // 被剪切照片容器高度
      cropCanvasWidth: null, // 裁剪框的宽度
      cropCanvasHeight: null, // 裁剪框的高度
      cropOffsetImgLeft: null, // 裁剪框距离sourceImg的left
      cropOffsetImgTop: null, // 裁剪框距离sourceImg的top
      targetImg: null, // 裁剪后的目标图片
      targetImgWidth: null, // 目标宽度
      targetImgHeigth: null, // 目标高度
      targetImgLeft: null, // 目标左位移
      targetImgTop: null, // 目标上位移
      cropContext: null, // 2D上下文对象
      imageObj: null, // 照片对象
      blankHeight: null, // 组件上下空白高度
      blankWidth: null, // 组件左右空白高度
      lock: false, // 是否锁定裁剪框大小
      crop: {}, // 移动剪切框必要数据
      zoom: {} // 缩放剪切框必要数据
    }
  },

  components: {},

  computed: {},

  watch: {
    // 监听图片URL以进行更新
    imageUrl(newValue) {
      this.imageObj.src = newValue
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      // toBlob()方法的Polyfill
      if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value(callback, type, quality) {
            const binStr = atob(this.toDataURL(type, quality).split(',')[1])
            const len = binStr.length
            const arr = new Uint8Array(len)

            for (let i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i)
            }

            callback(new Blob([arr], { type: type || 'image/png' }))
          }
        })
      }

      this.imageObj = new Image()
      if (this.imageUrl !== null) {
        this.targetImg = document.createElement('canvas') // 创建导出图片所用canvas
        this.imageObj.src = this.imageUrl
        this.imageObj.onload = () => {
          const {
            cropCanvas, container, sourceImg, cropContainer
          } = this.$refs
          const { width, height } = this.imageObj
          const sourceWidth = width / (height / container.offsetHeight)
          const sourceHeight = height / (width / container.offsetWidth)
          this.sourceImgWidth = width > height ? container.offsetWidth : sourceWidth
          this.sourceImgHeight = height > width ? container.offsetHeight : sourceHeight

          // 设置源图像的宽高
          sourceImg.width = this.sourceImgWidth // 通过vue的响应系统太慢，不如直接写入,类似皆是相同原理
          sourceImg.height = this.sourceImgHeight

          const { sourceImgWidth, sourceImgHeight } = this

          // 计算左右、上下空白的高度(单个纯黑色区域)
          this.blankWidth = (container.offsetWidth - sourceImgWidth) / 2
          this.blankHeight = (container.offsetHeight - sourceImgHeight) / 2

          // 记录并设置裁剪框大小
          const { blankHeight, blankWidth } = this
          if (width > height) {
          // 当宽大于高时，以高为边作正方形裁剪框
            sourceImg.style.top = `${blankHeight}px`
            this.cropCanvasWidth = sourceImgHeight - 2
            this.cropCanvasHeight = sourceImgHeight - 2
          } else {
          // 当高大于宽时，以宽为边作正方形裁剪框
            sourceImg.style.left = `${blankWidth}px`
            this.cropCanvasWidth = sourceImgWidth - 2
            this.cropCanvasHeight = sourceImgWidth - 2
          }

          // 设置裁剪框的宽高
          cropCanvas.width = this.cropCanvasWidth
          cropCanvas.height = this.cropCanvasHeight

          // 获取裁剪框二维上下文对象
          this.cropContext = cropCanvas.getContext('2d')

          // canvasImg设定高度完成后
          this.$nextTick(() => {
          // 展示源image的缩放图作为底图
            sourceImg
              .getContext('2d')
              .drawImage(this.imageObj, 0, 0, sourceImgWidth, sourceImgHeight)

            const { cropCanvasHeight, cropCanvasWidth } = this

            // 计算并设置裁剪框容器的偏移位置
            this.cropOffsetImgTop = (sourceImgHeight - cropCanvasHeight) / 2
            this.cropOffsetImgLeft = (sourceImgWidth - cropCanvasWidth) / 2
            cropContainer.style.top = `${blankHeight + this.cropOffsetImgTop}px`
            cropContainer.style.left = `${blankWidth + this.cropOffsetImgLeft}px`

            // 渲染裁剪框图片
            this.renderCanvasCrop(sourceImg)
            // 渲染裁剪目标框图片(实际想要的裁剪图片)
            this.renderTargetImg()
            // 获取裁剪后的图片
            this.getCropImg()
          })
        }
      }
      window.addEventListener('mouseup', this.clearAndGet) // 松开鼠标清空部分数据以及获取裁剪后的图片
      window.addEventListener('mousemove', this.moveZoomCrop) // (在当前sourceImg内点击时)移动鼠标时移动或缩放剪切框
    },
    /**
     * @msg: 移动缩放框
     */
    moveZoomCrop(e) {
      const {
        container, sourceImg, cropContainer, cropCanvas
      } = this.$refs

      const {
        zoom, crop, blankHeight, blankWidth
      } = this

      const { sourceImgWidth, sourceImgHeight } = this
      // 移动
      if (Object.keys(crop).length !== 0) {
        // 计算鼠标按下后的移动X\Y距离
        const moveX = e.clientX - crop.mouseDownX
        const moveY = e.clientY - crop.mouseDownY

        let cropConLeft = crop.cropConOffsetLeft + moveX
        let cropConTop = crop.cropConOffsetTop + moveY

        // 不允许移出框外
        // 当宽大于高时
        if (sourceImgWidth > sourceImgHeight) {
          if (cropConLeft < 0) cropConLeft = 0 // 左边界
          if (cropConTop < sourceImg.offsetTop) {
          // 上边界
            cropConTop = sourceImg.offsetTop
          }
        } else {
          // 当高大于宽时
          if (cropConTop < 0) cropConTop = 0 // 上边界
          if (cropConLeft < sourceImg.offsetLeft) {
            // 左边界
            cropConLeft = sourceImg.offsetLeft
          }
        }
        const maxTop = container.offsetHeight - cropCanvas.offsetHeight - blankHeight
        if (cropConTop > maxTop) {
          cropConTop = maxTop
        }
        const maxLeft = container.offsetWidth - cropCanvas.offsetWidth - blankWidth
        if (cropConLeft > maxLeft) {
          cropConLeft = maxLeft
        }

        // 设置裁剪框容器的位置并记录备用
        cropContainer.style.left = `${cropConLeft}px`
        cropContainer.style.top = `${cropConTop}px`
        this.cropOffsetImgTop = cropConTop - blankHeight
        this.cropOffsetImgLeft = cropConLeft - blankWidth

        // 渲染裁剪框内图像
        this.renderCanvasCrop(sourceImg)
        // 渲染目标图像
        this.renderTargetImg()
      }

      // 缩放
      if (Object.keys(zoom).length !== 0) {
        const moveX2 = e.clientX - zoom.mouseDownX
        const moveY2 = e.clientY - zoom.mouseDownY
        const bigger = moveX2 >= moveY2 ? moveX2 : moveY2 // 取X或Y中的最大
        const resultHeight = zoom.cropCanOffsetHeight + bigger // 移动后的结果高度
        const resultWidth = zoom.cropCanOffsetWidth + bigger // 移动后的结果宽度

        // 不允许超大
        const temp1 = resultHeight + cropContainer.offsetTop // 分开写的原因: 无法通过提交时自动eslint检查
        const tempHeight = temp1 - blankHeight
        const temp2 = resultWidth + cropContainer.offsetLeft
        const tempWidth = temp2 - blankWidth
        if (
          tempHeight < this.sourceImgHeight
          && tempWidth < this.sourceImgWidth
          && resultHeight > 0
          && resultWidth > 0
        ) {
          console.log('当鼠标在源图像范围内时')
          // 直接根据鼠标偏移量获得裁剪框的实际宽高
          this.lock = false
          cropCanvas.width = resultHeight
          cropCanvas.height = resultWidth
          // 记录裁剪框的宽高备用，下同
          this.cropCanvasWidth = cropCanvas.width
          this.cropCanvasHeight = cropCanvas.height
        } else if (resultHeight < 0 || resultWidth < 0) {
          this.lock = false
          cropCanvas.width = 0
          cropCanvas.height = 0
        } else {
          console.log('当鼠标划过右边缘或下边缘时')
          console.log(cropContainer.offsetLeft + resultWidth)
          console.log(cropContainer.offsetTop + resultHeight)
          const maxWidth = cropContainer.offsetLeft + resultWidth < this.sourceImgWidth
          const maxHeight = cropContainer.offsetTop + resultHeight < this.sourceImgHeight
          if ((maxWidth || maxHeight) && !this.lock) {
            console.log('1')
            this.lock = true
            if (sourceImgWidth > sourceImgHeight) {
              console.log('1: 宽>高')
              cropCanvas.width = sourceImgHeight - (cropContainer.offsetTop - blankHeight)
              cropCanvas.height = sourceImgHeight - (cropContainer.offsetTop - blankHeight)
            } else {
              console.log('1: 宽<高')
              cropCanvas.height = sourceImgWidth - (cropContainer.offsetLeft - blankWidth)
              cropCanvas.width = sourceImgWidth - (cropContainer.offsetLeft - blankWidth)
            }
          } else if (!(maxWidth || maxHeight) && !this.lock) {
            console.log('2')
            this.lock = true
            if (sourceImgWidth > sourceImgHeight) {
              console.log('2:宽>高')
              cropCanvas.width = sourceImgWidth - cropContainer.offsetLeft
              cropCanvas.height = sourceImgWidth - cropContainer.offsetLeft
            } else {
              console.log('2: 宽<高')
              cropCanvas.width = sourceImgHeight - cropContainer.offsetTop
              cropCanvas.height = sourceImgHeight - cropContainer.offsetTop
            }
          }
          //  else
          // if (cropContainer.offsetLeft + resultWidth === this.sourceImgWidth && !this.lock) {
          //   console.log(cropContainer.offsetLeft + resultWidth)
          // }

          this.cropCanvasWidth = cropCanvas.width
          this.cropCanvasHeight = cropCanvas.height
        }

        this.renderCanvasCrop(sourceImg)
        this.renderTargetImg()
      }
    },

    /**
     * @msg: 处理鼠标事件
     */
    initMove(e) {
      this.crop.cropConOffsetLeft = this.$refs.cropContainer.offsetLeft // 记录点击时剪切框容器的左位移
      this.crop.cropConOffsetTop = this.$refs.cropContainer.offsetTop // 记录点击时剪切框容器的上位移
      this.crop.mouseDownX = e.clientX // 记录点击时鼠标X
      this.crop.mouseDownY = e.clientY // 记录点击时鼠标Y
      this.zoom = {} // 防止触发缩放
    },

    /**
     * @msg: 清除和获取blob
     */
    clearAndGet() {
      this.zoom = {}
      this.crop = {}
      this.getCropImg()
    },

    initZoom(e) {
      this.zoom.cropCanOffsetHeight = this.$refs.cropCanvas.offsetHeight // 记录点击时剪切框本体的高度
      this.zoom.cropCanOffsetWidth = this.$refs.cropCanvas.offsetWidth // 记录点击时剪切框本体的宽度
      this.zoom.mouseDownX = e.clientX // 记录点击时鼠标X
      this.zoom.mouseDownY = e.clientY // 记录点击时鼠标Y
      this.crop = {} // 防止触发移动
    },

    /**
     * @msg: 阻止拖拽事件
     * @return: false
     */
    stopDrag() {
      return false
    },

    /**
     * @msg: 渲染裁剪框
     */
    renderCanvasCrop(source) {
      this.cropContext.drawImage(
        source,
        this.cropOffsetImgLeft,
        this.cropOffsetImgTop,
        this.cropCanvasWidth,
        this.cropCanvasHeight,
        0,
        0,
        this.cropCanvasWidth,
        this.cropCanvasHeight
      )
    },

    /**
     * @msg: 渲染裁剪后的图像
     */
    renderTargetImg() {
      // 计算实际要裁剪的数据
      const left = (this.cropOffsetImgLeft / this.sourceImgWidth) * this.imageObj.width
      this.targetImgLeft = Math.floor(left)
      const top = (this.cropOffsetImgTop / this.sourceImgHeight) * this.imageObj.height
      this.targetImgTop = Math.floor(top)
      const height = (this.cropCanvasHeight / this.sourceImgHeight) * this.imageObj.height
      this.targetImgHeigth = Math.floor(height)
      this.targetImgWidth = this.targetImgHeigth // 1:1比例

      this.targetImg.width = this.targetImgWidth // 设置目标canvas的宽
      this.targetImg.height = this.targetImgHeigth // 设置目标canvas的高
      // 写入图像
      this.targetImg
        .getContext('2d')
        .drawImage(
          this.imageObj,
          this.targetImgLeft,
          this.targetImgTop,
          this.targetImgWidth,
          this.targetImgHeigth,
          0,
          0,
          this.targetImgWidth,
          this.targetImgHeigth
        )
    },

    /**
     * @msg: 转换image数据为blob并导出
     */
    getCropImg() {
      this.targetImg.toBlob(
        blob => {
          this.getCropImgBlob(blob)
        },
        'image/jpeg',
        0.5
      )
    }
  },
  beforeDestroy() {
    // 清楚监听器
    window.removeEventListener('mouseup', this.clearAndGet)
    window.removeEventListener('mousemove', this.moveZoomCrop)
  }
}
</script>
<style scoped lang="scss">
.component-container {
  position: relative;
  width: 100%;
  height: 100%;
  // display: flex;
  // flex: 1;
  // align-items: center;
  background-color: #000000;
  .canvas-img-preview {
    position: absolute;
    opacity: 0.5;
    left: 0;
    top: 0;
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
</style>
