import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'

const { TextArea } = Input
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])
  const handelValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <div>
      <Form
        layout='vertical'
        form={form}
        initialValues={{ title, desc }}
        onValuesChange={handelValuesChange}
        disabled={disabled}
      >
        <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='描述' name='desc'>
          <TextArea />
        </Form.Item>
      </Form>
    </div>
  )
}
export default PropComponent
