import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Register from './views/register'
import Home from './views/home'
import Main from './views/home/main'
import NotFound from './views/404'
Vue.use(Router)


export default new Router({
    routes: [
        {
            path:'*',
            component: NotFound
        },
        {
            path: '/login',
            component: Login
        },
        {
            path:'/register',
            component: Register
        },
        {
            path: '/',
            redirect:'/home'
        },
        {
            path:'/home',
            component : Home,
            children:[{
                path:'',
                component:Main
            },
            {
                path:'comment',
                component:()=> import('./views/comment')
            }
            ,{
                path:'material',
                component:()=>import('./views/material')
            },{
                path:'account',
                component:()=>import('./views/account')
            },{
                path:'fansdate',
                component:()=>import('./views/fans')
            }
            

        
        ]
        }
        
        
    ]


})
