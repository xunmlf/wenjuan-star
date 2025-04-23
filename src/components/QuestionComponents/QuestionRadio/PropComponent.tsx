import { FC, useEffect } from 'react'
import { QuestionRadioPropsType } from './interface'

import { Form, Input, Checkbox, Select, Button, Space } from 'antd'

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

import { nanoid } from 'nanoid'

import { OptionType } from './interface'

const PropsComponent: FC = (props: QuestionRadioPropsType) => {
  const { title, value, isVertical, options = [], disabled, onChange } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, options, value })
  }, [title, isVertical, options, value])

  function handleValueChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionRadioPropsType
      // 过滤掉空选项
      if (newValues.options) {
        newValues.options = newValues.options
          .filter(opt => !(opt.text === null))
          .map(opt => ({
            text: opt.text,
            value: opt.value || nanoid(5)
          }))
      }
      onChange(newValues)
    }
  }
  return (
    <div>
      <Form
        form={form}
        layout='vertical'
        disabled={disabled}
        onValuesChange={handleValueChange}
        initialValues={{ title, isVertical, options, value }}
      >
        <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='选项' name='options'>
          <Form.List name='options'>
            {(fields, { add, remove }) => {
              return (
                <div>
                  {/* 添加选项 */}
                  {fields.map(({ key, name }) => (
                    <Space key={key} align='baseline'>
                      <Form.Item
                        name={[name, 'text']}
                        rules={[
                          { required: true, message: '请输入用户名' },
                          {
                            validator: (_, text) => {
                              const { options = [] } = form.getFieldsValue()
                              let num = 0
                              options.forEach((opt: OptionType) => {
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
                      {fields.length > 2 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Space>
                  ))}

                  {/* 添加按钮 */}
                  <Form.Item>
                    <Button
                      type='link'
                      icon={<PlusOutlined />}
                      block
                      onClick={() => add({ text: '', value: nanoid(5) })}
                    >
                      添加选项
                    </Button>
                  </Form.Item>
                </div>
              )
            }}
          </Form.List>
        </Form.Item>

        <Form.Item label='默认选中' name='value'>
          <Select
            value={value}
            options={options.map(opt => {
              return {
                label: opt.text,
                value: opt.value
              }
            })}
          ></Select>
        </Form.Item>

        <Form.Item name='isVertical' valuePropName='checked'>
          <Checkbox>是否竖向排列</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
export default PropsComponent
