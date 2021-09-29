import { createRouter, createWebHistory } from 'vue-router'
import {store} from '../store'

const routes = [
  {
    path: '/',
    name: 'home-main',
    meta: { title: 'Oozy / Oozy'},
    component: () => import('../views/HomeMain.vue'),
    children: [
      {
        path: 'i/login',
        name: 'login',
        meta: { title: 'Đăng nhập Oozy / Oozy'},
        component: () => import('../views/Login.vue'),
      },
      {
        path: 'i/signup',
        name: 'signup',
        meta: { title: 'Đăng ký Oozy / Oozy'},
        component: () => import('../views/SignUp.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: 'Trang chủ / Oozy'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/explore',
    name: 'explore',
    meta: { title: 'Khám phá / Oozy'},
    component: () => import('../views/Explore.vue')
  },
  {
    path: '/notifications',
    name: 'notifications',
    meta: { title: 'Thông báo / Oozy'},
    component: () => import('../views/Notifications.vue'),
    children: [
      {
        path: '',
        name: 'noti_default',
        component: () => import('../views/notifications/NotiDefault.vue')
      },
      {
        path: 'mentions',
        name: 'noti_mentions',
        component: () => import('../views/notifications/Mentions.vue')
      },
    ]
  },
  {
    path: '/messages',
    name: 'messages',
    meta: { title: 'Tin nhắn / Oozy'},
    component: () => import('../views/Messages.vue'),
    children: [
      {
        path: '',
        name: 'message_default',
        component: () => import('../views/MessagesDefault.vue'),
      },
      {
        path: ':idMessages',
        name: 'message_textbar',
        component: () => import('../views/MessagesTextBar.vue'),
      }
    ]
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    meta: { title: 'Dấu trang / Oozy'},
    component: () => import('../views/Bookmarks.vue')
  },
  {
    path: '/:username/lists',
    name: 'profile_list',
    meta: { title: 'Danh sách / Oozy'},
    component: () => import('../components/profile/Lists.vue')
  },
  {
    path: '/:username',
    name: 'profile',
    meta: { title: 'Hồ sơ / Oozy'},
    component: () => import('../views/Profile.vue'),
    children: [
      {
        path: '',
        name: 'profile_default',
        component: () => import('../components/profile/ProfileDefault.vue')
      },
      {
        path: 'photo',
        name: 'profile_photo',
        components: {
          default: () => import('../components/profile/ProfileDefault.vue'),
          photo: () => import('../views/Photo.vue')
        }
      },
      {
        path: 'with_replies',
        name: 'with_replies',
        component: () => import('../components/profile/WithReplies.vue')
      },
      {
        path: 'media',
        name: 'profile_media',
        component: () => import('../components/profile/Media.vue')
      },
      {
        path: 'like',
        name: 'profile_like',
        component: () => import('../components/profile/Like.vue')
      },
    ]
  },
  {
    path: '/compose/wit',
    name: 'post_wit',
    meta: { title: 'Soạn Wit mới / Oozy' },
    components: {
      default: () => import('../views/Home.vue'),
      post: () => import('../views/PostWit.vue')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: { title: 'Page Not Found / Oozy'},
    component: () => import('../views/PageNotFound.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { 
      el: '#app',
      top: 0 
    }
  },
})

export default router