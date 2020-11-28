import router from './rouder'


router.beforeEach(function(to,from,next){
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

export default  router