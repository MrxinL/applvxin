import layoutHeader from './home/layout-header'
import layoutAside from './home/layout-aside'


//处理子组件的挂载





export default{
  install:function(Vue){
    Vue.component('layout-header',layoutHeader)
    Vue.component('layout-aside',layoutAside)
    
  }
}