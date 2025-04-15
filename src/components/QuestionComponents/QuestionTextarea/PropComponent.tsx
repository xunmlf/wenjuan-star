import { FC, useEffect } from 'react'
import { QuestionTextareaPropsType } from './interface'
import { Form, Input } from 'antd'

const { TextArea } = Input
// 组件的属性配置
const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()
  //   console.log(title, placeholder)
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  const handelValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }

    // console.log(form.getFieldsValue())
    // if (onChange) {
    //   onChange(form.getFieldsValue())
    // }
  }

  return (
    <Form
      layout='vertical'
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handelValuesChange}
      disabled={disabled}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Placeholder' name='placeholder'>
        <TextArea />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
