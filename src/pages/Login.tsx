import { UserAddOutlined } from '@ant-design/icons'
import { Typography, Space, Button, Form, Input, Checkbox, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { FC, useEffect } from 'react'
import style from './Login.module.scss'

import { REGISTER_PATHNAME, MANAGE_LIST_PATHNAME } from '../router'
import { useRequest } from 'ahooks'
import { loginService } from '../services/user'

import { setToken } from '../utils/user-token'

const { Title } = Typography

// 配置项
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}
function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}
function getUserInfoFromLocalStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}
const Login: FC = () => {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const { run: loginRun } = useRequest(
    async (values: any) => {
      const { username, password } = values
      const res = await loginService(username, password)
      return res
    },
    {
      manual: true,
      onSuccess: res => {
        const { token } = res
        setToken(token)
        message.success('登录成功')
        navigate(MANAGE_LIST_PATHNAME)
      }
    }
  )
  useEffect(() => {
    const { username, password } = getUserInfoFromLocalStorage()

    form.setFieldsValue({ username, password })
  }, [])
  const onFinish = (values: any) => {
    loginRun(values)
    // console.log(values)
    const { username, password, remember } = values
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }
  return (
    <div className={style.container}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>用户登录</Title>
      </Space>

      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 4,
                max: 16,
                message: '用户名长度为4-16位 且只能包含字母、数字和下划线'
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: '用户名只能包含字母、数字和下划线'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name='remember' valuePropName='checked' label={null}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                登陆
              </Button>
              <Link to={REGISTER_PATHNAME}>新用户注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
