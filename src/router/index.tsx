import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layout/MainLayout'
import ManageLayout from '../layout/ManageLayout'

import QuestionLayout from '../layout/QuestionLayout'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'

import Star from '../pages/manage/Star'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'

import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/manage',
          element: <ManageLayout />,
          children: [
            {
              path: 'star',
              element: <Star />
            },
            {
              path: 'list',
              element: <List />
            },
            {
              path: 'trash',
              element: <Trash />
            }
          ]
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },
    {
      path: '/question',
      element: <QuestionLayout />,
      children: [
        {
          path: 'edit/:questionId',
          element: <Edit />
        },
        {
          path: 'stat/:questionId',
          element: <Stat />
        }
      ]
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true // 🚀 提前开启 v7 的新规则
    }
  }
)

export default router

export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_LIST_PATHNAME = '/manage/list'

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true
  }
  return false
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) {
    return true
  }
  return false
}
