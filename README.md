```javascript
常见js方法总结：
list.reduce((sum,item) => sum += item.num,0)
arr.filter(item => item.id !== id)
slice()
+Date.now()可作为新增id值
toFixed(2)  保留2位小数
list.map((item) => {name:item.name,value:item.price})
join('、')
this.$router.push(`/search?key=${this.inputValue}`)

axios.get/set/delete
vscode-配置-设置-trigger on tab

业务逻辑，CRUD之后都要重新渲染
以下代码为防抖优化，反复记忆写一遍
        watch: {
          // 该方法会在数据变化时调用执行
          // newValue新值, oldValue老值（一般不用）
          // words (newValue) {
          //   console.log('变化了', newValue)
          // }

          'obj.words' (newValue) {
            // console.log('变化了', newValue)
            // 防抖: 延迟执行 → 干啥事先等一等，延迟一会，一段时间内没有再次触发，才执行
            clearTimeout(this.timer)
            this.timer = setTimeout(async () => {
              const res = await axios({
                url: 'https://applet-base-api-t.itheima.net/api/translate',
                params: {
                  words: newValue
                }
              })
              this.result = res.data.data
              console.log(res.data.data)
            }, 300)
          }
        }
--------------------------------------------------

v-if  删除dom结构
v-show  仅针对css，display:none 做控制
v-for中的 ：key属性  对删除的影响，所谓的原地删除
:src=''
:class="{pink:true,red:false}"
:class="[pink,red]"
:style="{color:'red',backgroundColor:'green'}"
v-model原理，value属性和input事件的合写  :value="msg"  @input="msg = $event.target.value"  获取事件对象的形参



computed 和method的区别，computed可以缓存结果，如果依赖项值变化了，会自动重新计算
完整写法，默认只提供 get() ，需自定义 set(value),提供了set方法，methods中函数调用才能够修改computed中的属性值
理解data属性和计算属性，计算属性是基于data属性加工而来
computed 属性是基于 data 属性或者 props 来计算值的，但它也可以基于其他计算得到的值，或者基于外部的数据
例如
computed: {
    // 获取地址栏的搜索关键字，直接变为一个属性，在后面的方法中可以使用this调用
    querySearch () {
      return this.$route.query.search
    }
  }

watch 简单写法
完整写法
deep:true,
immediate:true,//一进页面立刻执行一次
handler(){

}

components组件注册

指令修饰符
v-model.trim
v-model.number
@click.stop
@click.prevent  阻止默认行为

vue的生命周期（共8个钩子函数）
created 初始化渲染---应用场景，一打开界面初始化渲染数据  常用
mounted 操作dom---应用场景，一进界面，获取焦点     常用
beforeDestroy 释放vue以外的资源（清除定时器、延时器）  常用
beforeUpdate 数据修改，视图未更新
Updated 数据修改，视图已更新

模板当中可以省略this，在created函数当中需使用  this.$route.query.参数名


vue的生命周期仅针对挂载的dom节点，vue实例优先创建于被挂载的dom，其余dom优先加载

vue的工程化，源代码->自动化编译压缩组合->运行的代码
自动化编译环节设计到不同的配置项，去将less、ts代码转化为浏览器运行的代码
'@/' 等价于 ‘src/’从根目录开始寻找
babel 语法降级
jsconfig.json 配置js语法提示
vetur vscode语法高亮插件
less css的语法糖
less-loader
VueRouter vue2 vuerouter3 vuex3 /344
eslint 代码规范 无分号规范

组件的概念，main.js是入口，导入vue、APP.vue根组件，渲染加载然后挂载到dom节点
结构 App.vue中template只能有一个div根元素
样式 scoped,作用于当前组件，原理，所有dom结构都加上了 ‘data-v-哈希值’，css选择默认添加
逻辑  data必需是函数，保证每个组件实例创建的数据都是独立的


普通组件：
局部注册,只能在注册内的组件内使用 components:{组件名:组件对象}
全局注册，所有组件内都能使用，在main.js中注册  Vue.component(组件名，组件对象)

异步组件

组件通信
父子关系 父组件通过props传递数据、子组件通过$emit更新、props校验（type、require、default、validator()）、单向数据流
非父子关系  provide & inject,eventbus
非父子关系  event bus 1.创建一个空的eventbus vue实例；2.A监听event bus 实例的事件 Bus.$on(eventName,回调函数)；3.B组件触发 Bus.$emit(eventName,'')
跨层级（孙子）：爷爷provide，将data中的属性共享  孙子inject   简单类型 非响应式，复杂类型  响应式
兜底方案  vuex

表单类组件封装和 v-model拆解绑定数据，子组件和父组件的双向绑定
v-model无法使用props父传子的属性进行绑定，因此要使用$emit进行更新，需要将v-model拆解使用  父组件  @input="selectId = $event"  子组件 props属性名应为value $emit事件名应为 input ,父组件才能直接使用v-model

.sync修饰符  实现父子组件的数据双向绑定，可自定义属性名 :visible.sync="isShow"  等于  :visible="isShow" @update:visible="isShow = $event" / 子组件 this.emit('update:visible',false)

querySelector()  查找的是整个页面
ref=属性名 ，渲染完成之后 使用this.$ref.ref属性名 查找的是当前组件，除了获取dom 也可以获取 组件实例，调用组件的方法  this.$ref.baseForm.resetValue()

vue是异步dom更新队列，使用$nextTick，等dom更新完，才会触发才此方法里的函数体

自定义指令：封装一些dom操作,指令的值通过binding.value传递
全局注册 
Vue.directive('指令名'，{
  "inserted"(el){
    //el指令所绑定的元素
    el.focus()
  }
})
局部注册
directives:{
  "指令名":{
    inserted(el){
      el.focus()
    }
    //更新时触发
    update(el,binding){
      el.style.color = binding.value
    }
  }
}
调用  <input v-指令名 type>  当前元素被插入到页面中时，调用函数
应用场景：v-loading  页面加载的时候显示加载图标，使用伪类添加蒙层

插槽：组件内部结构的自定义；后备内容（默认值）
<slot>这句话是默认内容</slot>  占位封装
默认插槽：只能定制一个位置
具名插槽：多个slot ,使用name属性区分
<slot name='head'>
<slot name="content">
使用
<template v-slot:head>或者<template #head>
大标题
</template>
作用域插槽（传参）,添加属性传值,本质上给插槽绑定数据，供组件使用
<slot :row="item" msg="测试文本"></slot>
调用传参
<template #default="obj">
  <button @click="del(obj.row.id)"></button>  
</template>

单页应用程序（SPA）点击导航不重新加载跳转  SEO差，页面按需更新
多页：点击导航会重新加载跳转              SEO优

路由：访问路径和组件的对应关系，步骤5+2  router-view
router-link 提供高亮类名： router-link-extra-active/router-link-active(模糊匹配，用的多)，可以给这两个类名配置别名

路由404、重定向
const route = new VueRouter({
  routes:[
    { path: '/',redirect: '/home'}
    { name:'路由名', path: '/home',component: Home}
    { path: '*',component: NotFound}
  ],
  mode:"history"
})

<router-link to='/my'>

声明式导航 跳转传参
1、查询参数传参
路径传递  'to=/path?参数名1=值&参数名2=值'    接收  $route.query.参数名  适合多个参数
2.动态路由传参  参数可选符'?',表示该参数非必填
配置路由 path:'/search/:words'  配置导航 to='/path/参数值'  接收 $route.params.参数名  适合传单个参数
编程式导航（js跳转）
1.path路径跳转 路由传参
this.$router.push('/路径/参数名1=参数值1？参数名2=参数值2')
this.$router.push({
  path:'路径'，
  query: {
    参数名: '参数值'
  }
})
this.$router.push('/路径/参数值')
this.$router.push({
  path:'路径/参数值'
})

2.name命名路由跳转（适合path路径长的场景）
this.$router.push({
  name: '路由名',
  query: {
    参数名:'参数值'
  }
})
this.$router.push({
  name: '路由名',
  params: {
    参数名:'参数值'
  }
})

路由模式
hash（默认，地址带'#'号）
history(常用，需服务器端支持,后台配置访问规则)


vuex:管理vue多组件共享的数据，多个组件共同维护一份数据，响应式变化，单向数据流，组件中不能直接修改
store/index.js专门存放vuex
Vue.use(Vuex)
new Vuex.Store()
挂载到main.js中，和router挂载类似
this.$store
const store = new Vuex.Store({
  strict: true, //严格模式，单向数据流
  state:{
    '共享变量名': 变量值
    list:[1,2,3,4,5,6,7,8,9,10]
  }
  mutations:{
    //第一个参数固定为state,n称作为payload载荷
    addCount(state，n){
      state.count += 1
    }
  }
})
访问
<template>{{$store.state.xxx}}</template>
在vue文件中，export default里<组件逻辑里>this.$store.state.xxx</组件>
在js文件中，<script>store.state.xxx</script>
mapState 将state数据自动映射到组件的计算属性中（computed）
compute:{
  ...mapState(['count'])
}
修改  只有mutations修改state的值。单向数据流,必需是同步的，便于监测数据变化，记录调试

在组件中调用 this.$store.commit('addCount',参数)，参数只能为1个，如有多个参数，考虑传对象或数组
mapMutations将mutations方法自动映射到组件的methods中
methods:{
  //页面中可直接使用addCount
  ...mapMutations(['addCount'，'subCount'])   
}

actions 支持异步，不能直接操作state，操作state,还是需要commit mutations
actions:{
  //此处没分模块，context可以理解为store
  setAsyncCount(context,num){
    setTimeout(() => {
      //changeCount就是mutations里的方法
      context.commit('changeCount',num)
    },1000)
  }
}
组件methods中调用
this.$store.dispatch('setAsyncCount',200)
mapActions,将actions中的方法映射到组件的methods中
methods:{
  //页面中可直接使用addCount
  ...mapActions(['setAsyncCount'])   
}
this.setAsyncCount(666)

getters，类似computed属性，基于state做的各种运算，依赖state的变化
getters:{
  //第一个形参是state,必须有返回值,第二个参数可以是getters，访问内部的getters
  filterList(state){
    return state.list.filter(item => item > 5)
  }
}

{{$store.getters.filterList}}
computed:{
  ...mapGetters(['filterList'])
}
映射完，直接直接使用{{filterList}}

module模块，vuex使用单一状态树，每个模块都有自己的state,mutations,actions,getters
user.js
const state = {
  userInfo:{
    name: 'sun',
    age: 32
  },
  score: 99
}
const mutations = {}
const actions = {}
const getters = {}
export default{
  namespaced: true,  ---命名空间
  state,
  mutations,
  actions,
  getters
}
--------------
const store = new Vuex.Store({
  modules:{
    user
  }
})
访问
$store.state.模块名.xxx
mapSate('模块名',['xxx'])  --需要开启命名空间,不加的话默认挂载到全局，加的话挂载到子模块
$store.getters['模块名/xxx']
mapGetters('模块名',['xxx'])
$store.commit('模块名/xxx'，额外参数)
mapMutations('模块名',['xxx'])
$store.dispatch('模块名/xxx'，额外参数)
mapActions('模块名',['xxx'])


----------------------------
工程
查看已安装的包 npm list
组件库 按需导入（推荐）/全部导入
pc端  element-ui  ant-design-vue
移动端 vant-ui 更新快/Mint UI/ Cube UI

npm install -D  记录到devDependencies ,开发环境

1. 安装vant2，结果npm ERR! While resolving: @vue/eslint-config-standard@6.1.0
   npm ERR! Found: eslint-plugin-vue@8.7.1
   **解决方案：npm uninstall @vue/eslint-config-standard**

   npm install @vue/eslint-config-standard@6.1.0

2. 学会解决路径依赖，package-lock.json文件开发中锁定依赖

   npm -D 开发依赖，可以记录到package.json文件中

3. 按需加载控件   npm i babel-plugin-import -D

4. 学会看eslint的报错进行格式整理

5. npm i postcss-px-to-viewport@1.1.1 -D

先配置路由，再做页面，单个页面独立展示的都为一级路由，

安装 axios   npm install axios

验证码base64格式，解析到页面中，使用v-binding
vuex刷新后会丢失
防抖，执行一个动作后一段时间才能再执行
节流，一段时间内只能执行一次动作
谷歌浏览器 调试工具 network-no throttling -slow 3G 网速慢的情况

请求拦截器中，添加loading
响应拦截器中，关闭loading

全局前置守卫，需要登录才可以访问的界面，提示跳转到登录界面

开发一般步骤：静态结构、假数据、接口、接口数据请求打印看结构、渲染

route.replace和push的区别，push会叠加历史记录

动态类 :class={disabled: selecout === 0}

<!-- 既希望保留原本的形参，又需要通过调用函数传参 => 箭头函数包装一层 -->
<CountBox @input="(value) => changeCount(value, item.goods_id, item.goods_sku_id)" :value="item.goods_num"></CountBox>

mixins混入概念，对组件公用方法的抽象，可以应用到任何组件中

路由懒加载，被访问才加载组件
```
