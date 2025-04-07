import { FC } from 'react'

import { UserAddOutlined } from '@ant-design/icons'
import { Typography, Space, Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { LOGIN_PATHNAME } from '../router'

import style from './Register.module.scss'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'

const { Title } = Typography
const Register: FC = () => {
  const navigator = useNavigate()

  const { run: registerRun } = useRequest(
    async values => {
      const { username, password, nikename } = values
      const res = await registerService(username, password, nikename)
      return res
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功')
        navigator(LOGIN_PATHNAME)
      }
    }
  )
  const onFinish = (values: any) => {
    registerRun(values)
  }
  return (
    <div className={style.container}>
      <Space>
        <Title level={2}>
          <UserAddOutlined />
        </Title>
        <Title level={2}>新用户注册</Title>
      </Space>

      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
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

          <Form.Item label='昵称' name='nikename'>
            <Input />
          </Form.Item>

          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='确认密码'
            name='confirm'
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账号，去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register
