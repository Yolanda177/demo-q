function observe(data) {
  // 如果不是对象的话就直接return掉
  // 防止递归溢出
  if (!data || typeof data !== 'object') return
  // eslint-disable-next-line
  return new Observe(data)
}

// 发布订阅模式  订阅和发布 如[fn1, fn2, fn3]
function Dep() {
  // 一个数组(存放函数的事件池)
  this.subs = []
}
function Observe(data) {
  const dep = new Dep()
  // eslint-disable-next-line
  for (const key in data) {
    let val = data[key]
    observe(val)
    Object.defineProperties(data, key, {
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        dep.notify()
        observe(newVal)
      }
    })
  }
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  notify() {
    // 绑定的方法，都有一个update方法
    this.subs.forEach(sub => sub.update())
  }
}
// 监听函数
// 通过Watcher这个类创建的实例，都拥有update方法
function Watcher(vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp
  // 添加一个事件
  // 这里我们先定义一个属性
  Dep.target = this
  const arr = exp.split('.')
  let val = vm
  arr.forEach(key => { // 取值
    val = val[key] // 获取到this.a.b，默认就会调用get方法
  })
  Dep.target = null
}

// eslint-disable-next-line
Watcher.prototype.update = function () {
  const arr = this.exp.split('.')
  let val = this.vm
  arr.forEach(key => {
    val = val[key] // 通过get获取到新的值
  })
  this.fn()
}

const watcher = new Watcher(() => console.log(111)) //
const dep = new Dep()
dep.addSub(watcher) // 将watcher放到数组中,watcher自带update方法， => [watcher]
dep.addSub(watcher)
dep.notify() //  111, 111
function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  const fragment = document.createDocumentFragment()
  // eslint-disable-next-line
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }
  function replace(frag) {
    Array.from(frag.childNodes).forEach(node => {
      const txt = node.textContent
      const reg = /\{\{(.*?)\}\}/g
      if (node.nodeType === 3 && reg.test(txt)) {
        // eslint-disable-next-line
        function replaceTxt() {
          node.textContent = txt.replace(reg, (matched, placeholder) => {
            console.log(placeholder) // 匹配到的分组 如：song, album.name, singer...
            // eslint-disable-next-line
            new Watcher(vm, placeholder, replaceTxt) // 监听变化，进行匹配替换内容

            return placeholder.split('.').reduce((val, key) => val[key], vm)
          })
        }
        // 替换
        replaceTxt()
      }
      if (node.nodeType === 1) { // 元素节点
        const nodeAttr = node.attributes // 获取dom上的所有属性,是个类数组
        Array.from(nodeAttr).forEach(attr => {
          const { name } = attr // v-model  type
          const exp = attr.value // c        text
          if (name.includes('v-')) {
            node.value = vm[exp] // this.c 为 2
          }
          // 监听变化
          // eslint-disable-next-line
          new Watcher(vm, exp, (newVal => {
            node.value = newVal // 当watcher触发时会自动将内容放进输入框中
          }))

          node.addEventListener('input', e => {
            const newVal = e.target.value
            // 相当于给this.c赋了一个新值
            // 而值的改变会调用set，set中又会调用notify，notify中调用watcher的update方法实现了更新
            vm[exp] = newVal
          })
        })
      }
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }
  replace(fragment)
  vm.$el.appendChild(fragment)
}

// eslint-disable-next-line
function Mvvm(options = {}) {
  this.$options = options
  // eslint-disable-next-line
  const data = this._data = this.$options.data
  observe(data)
  // eslint-disable-next-line
  for (let key in data) {
    Object.defineProperties(this, key, {
      configurable: true,
      get() {
        // eslint-disable-next-line
        return this._data[key]
      },
      set(newVal) {
        // eslint-disable-next-line
        this._data[key] = newVal
      }
    })
  }
  // eslint-disable-next-line
  new Compile(options.el, this)
}
