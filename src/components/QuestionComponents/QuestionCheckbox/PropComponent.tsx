import { FC, useEffect } from 'react'
import { QuestionCheckboxPropsType } from './interface'

import { Form, Input, Checkbox, Button, Space } from 'antd'

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import { OptionType } from './interface'

import { nanoid } from 'nanoid'

const PropsComponent: FC = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [], disabled, onChange } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  function handleValuesChange() {
    if (onChange == null) return

    const newValues = form.getFieldsValue() as QuestionCheckboxPropsType

    if (newValues.list) {
      newValues.list = newValues.list.filter(opt => !(opt.text == null))
    }

    const { list = [] } = newValues
    list.forEach(opt => {
      if (opt.value) return
      opt.value = nanoid(5)
    })

    onChange(newValues)
  }
  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        disabled={disabled}
        onValuesChange={handleValuesChange}
        initialValues={{ title, isVertical, list }}
      >
        <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='选项' name='list'>
          <Form.List name='list'>
            {(fields, { add, remove }) => {
              return (
                <div>
                  {/* 添加选项 */}
                  {fields.map(({ key, name }) => (
                    <Space key={key} align='baseline'>
                      {/* 选项是否选中 */}
                      <Form.Item name={[name, 'checked']} valuePropName='checked'>
                        <Checkbox />
                      </Form.Item>

                      {/* 选项输入 */}
                      <Form.Item
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '请输入用户名' },
                          {
                            validator: (_, text) => {
                              const { list = [] } = form.getFieldsValue()
                              let num = 0
                              list.forEach((opt: OptionType) => {
                                if (opt.text === text) num++ // 记录text 相同的个数，预期只有一个
                              })
                              return num === 1
                                ? Promise.resolve()
                                : Promise.reject('和其他选项重复')
                            }
                          }
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      {fields.length > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Space>
                  ))}

                  {/* 添加按钮 */}
                  <Form.Item>
                    <Button
                      type='link'
                      icon={<PlusOutlined />}
                      block
                      onClick={() => add({ text: '', value: '', checked: false })}
                    >
                      添加选项
                    </Button>
                  </Form.Item>
                </div>
              )
            }}
          </Form.List>
        </Form.Item>

        <Form.Item name='isVertical' valuePropName='checked'>
          <Checkbox>是否竖向排列</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
export default PropsComponent
