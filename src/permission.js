import router from './rouder'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 导航守卫
// 路由发生改变之前  打开

router.beforeEach(function(to,from,next){
  nprogress.start()  //开启进度条
  if(to.path.startsWith('/home')){
    const token = window.localStorage.getItem('user-token')
    console.log(token);
    if(token){
      next()
    }else{
      next('/login')
    }
  }
  else{
    next()
  }
})

//路由完成后关闭进度条
router.afterEach(function(){
  nprogress.done() // 关闭进度条
})
export default  router