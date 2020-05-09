import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import { TOKEN } from '@/store/types'
Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'login',
        meta: {
            isNotFound: true
        },
        component: () => import('../views/login/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
          isNotFound: true
      },
      component: () => import('../views/login/register.vue')
  },
    {
        path: '*',
        name: 'notFound',
        meta: {
            isNotFound: true
        },
        component: () => import('../components/notFound.vue')
    },
    // {
    //   path: '/index',
    //   name: 'index',
    //   redirect:'/index/supplierOrder',
    //   meta: {
    //     isNotFound: true,
    //     requireAuth: true//是否需要登录
    //   },
    //   component: () => import('../views/index/index'),
    {
      path: '/index',
      name: 'index',
      redirect:'/homepage',
      meta: {
        isNotFound: true,
        requireAuth: true//是否需要登录
      },
      component: () => import('../views/index'),
      children:[
        {
          path:'customerManagement',
          name:'customerManagement',
          component:() => import('../views/customerManagement/customerManagement')
        },
        {
          path:'materialManagement',
          name:'materialManagement',
          component:() => import('../views/materialManagement/materialManagement')
        },
        {
          path:'studentInformation',
          name:'studentInformation',
          component:() => import('../views/studentInformation/studentInformation')
        },
        {
          path:'course',
          name:'course',
          component:() => import('../views/course/course')
        },
        {
          path:'supplierOrder',
          name:'supplierOrder',
          component:() => import('../views/supplierOrder/supplierOrder')
        },
        {
          path:'student',
          name:'student',
          component:() => import('../views/student/student')
        },
        {
          path:'teacher',
          name:'teacher',
          component:() => import('../views/teacher/teacher')
        },
        {
          path:'teacherCourse',
          name:'teacherCourse',
          component:() => import('../views/teacherCourse/teacherCourse')
        },
        {
          path:'homepage',
          name:'homepage',
          component:() => import('../views/homepage/homepage')
        },
        {
            path:'adminInfo',
            name:'adminInfo',
            component:() => import('../views/adminInfo/adminInfo')
        },
        {
            path:'adminStudent',
            name:'adminStudent',
            component:() => import('../views/adminStudent/adminStudent')
        },
        {
          path:'gradge',
          name:'gradge',
          component:() => import('../views/gradge/gradge')
      },
        {
            path:'adminTeacher',
            name:'adminTeacher',
            component:() => import('../views/adminTeacher/adminTeacher')
        },
      ]
    }
];

const router = new Router({
    mode: 'history',
    base: '/collegesManagement',
    routes,
    scrollBehavior () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ x: 0, y: 0 })
            }, 500)
        })
    }
});



router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
      if (store.state.token) {
      next()
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
});
export default router
