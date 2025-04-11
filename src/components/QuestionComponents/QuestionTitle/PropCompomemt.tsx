import { FC, useEffect } from 'react'
import { QuestionTitlePropsType } from './interface'
import { Form, Input, Select, Checkbox } from 'antd'

const PropComponent: FC = (props: QuestionTitlePropsType) => {
  const { text, isCenter, level, onChange } = props

  const [form] = Form.useForm()

  useEffect(() => {
    // console.log(text, isCenter, level)
    form.setFieldsValue({ text, isCenter, level })
  }, [text, isCenter, level])

  const handelValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
    console.log('change', form.getFieldsValue())
  }

  return (
    <div>
      <Form
        layout='vertical'
        initialValues={{ text, isCenter, level }}
        form={form}
        onValuesChange={handelValuesChange}
      >
        <Form.Item label='标题内容' name='text' rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='层级' name='level'>
          <Select
            options={[
              { label: '一级标题', value: 1 },
              { label: '二级标题', value: 2 },
              { label: '三级标题', value: 3 },
              { label: '四级标题', value: 4 },
              { label: '五级标题', value: 5 }
            ]}
          />
        </Form.Item>
        <Form.Item name='isCenter' valuePropName='checked'>
          <Checkbox>是否居中</Checkbox>
        </Form.Item>
      </Form>
    </div>
  )
}
export default PropComponent
